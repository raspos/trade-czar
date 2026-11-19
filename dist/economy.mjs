// economy.mjs - Common Ledger Matrix Trade Simulation Engine for 통상교섭본부장 | TRADE CZAR
// Incorporates physical capacity limits, diminishing policy returns, origin multipliers, and growth decomposition.

import { BASELINE_2026, HS_MAPPING } from './data.mjs';
import { INDUSTRIES, PARTNERS } from './constants.mjs';

export class EconomyEngine {
  constructor(scenario, origin, prng) {
    this.scenario = scenario;
    this.origin = origin;
    this.prng = prng;

    this.macroHistory = [];
    this.monthlyResults = [];
    this.delayedPipeline = [];
    this.decompositionHistory = [];

    // Industry persistent states (physical capacity, utilization, technology moat)
    this.industryStates = {};
    HS_MAPPING.industries.forEach(ind => {
      this.industryStates[ind.id] = {
        id: ind.id,
        name: ind.name,
        capacityIndex: 100.0, // Physical plant capacity limit (100 base)
        utilizationRate: ind.id === 'semiconductor' ? 95.0 : (ind.id === 'automobile' ? 89.0 : 82.0),
        priceCompetitiveness: 100.0,
        tradeBarrierIndex: 100.0,
        supportLevel: 0.0,
        longTermCompetitiveness: 100.0,
        pendingDeliveries: 0.0, // Order backlog converting to customs shipments after lag
        repeatedActionCount: 0  // Tracks policy execution to enforce diminishing returns
      };
    });

    // Partner persistent states (bilateral tariffs, relations, special import quotas)
    this.partnerStates = {};
    PARTNERS.forEach(p => {
      this.partnerStates[p.id] = {
        id: p.id,
        name: p.name,
        tariffs: { ...(scenario.partnerTariffs?.[p.id] || { general: 0.03 }) },
        relations: 60.0,
        energyQuotaMod: 0.0 // e.g. US LNG purchase commitment ($B/month)
      };
    });

    // Apply scenario-specific industry shocks
    if (scenario.industryShocks) {
      for (const [indId, shock] of Object.entries(scenario.industryShocks)) {
        if (this.industryStates[indId]) {
          if (shock.tradeBarrierMod) {
            this.industryStates[indId].tradeBarrierIndex += shock.tradeBarrierMod * 100;
          }
          if (shock.priceCompMod) {
            this.industryStates[indId].priceCompetitiveness += shock.priceCompMod * 100;
          }
        }
      }
    }
  }

  queueEffect(delayMonths, fn) {
    this.delayedPipeline.push({ delayMonths, fn });
  }

  // Deep clone a 2D matrix
  cloneMatrix(matrix) {
    const cloned = {};
    for (const [cId, indMap] of Object.entries(matrix)) {
      cloned[cId] = {};
      for (const [iId, val] of Object.entries(indMap)) {
        cloned[cId][iId] = { export: val.export, import: val.import };
      }
    }
    return cloned;
  }

  simulateMonth(month, policyInterventions = []) {
    const baseMonthData = BASELINE_2026.months[month - 1];

    // Process immediate policies
    policyInterventions.forEach(act => {
      if (act.executeImmediate) act.executeImmediate(this);
      if (act.delayMonths && act.executeDelayed) {
        this.queueEffect(act.delayMonths, act.executeDelayed);
      }
    });

    // Process delayed policies
    const remainingPipeline = [];
    this.delayedPipeline.forEach(item => {
      item.delayMonths -= 1;
      if (item.delayMonths <= 0) {
        item.fn(this);
      } else {
        remainingPipeline.push(item);
      }
    });
    this.delayedPipeline = remainingPipeline;

    // Macro environment computation
    const scMacro = this.scenario.initialMacro || {};
    const fxNoise = this.prng.range(-3, 3);
    const oilNoise = this.prng.range(-0.8, 0.8);
    const demandNoise = this.prng.range(-0.2, 0.2);

    const fxRate = Math.round((baseMonthData.macro.fxRate + (scMacro.fxRateDelta || 0) + fxNoise) * 10) / 10;
    const brentOil = Math.round((baseMonthData.macro.brentOil + (scMacro.oilDelta || 0) + oilNoise) * 10) / 10;
    const globalDemandIndex = Math.round((baseMonthData.macro.globalDemandIndex + (scMacro.globalDemandDelta || 0) + demandNoise) * 10) / 10;
    const scfiFreight = Math.max(1000, Math.round(baseMonthData.macro.scfiFreight + (scMacro.scfiDelta || 0) + this.prng.range(-30, 30)));

    const currentMacro = {
      month,
      fxRate,
      brentOil,
      globalDemandIndex,
      scfiFreight,
      usFedRate: 4.50,
      bokBaseRate: 3.00
    };
    this.macroHistory.push(currentMacro);

    // =========================================================================
    // COMMON LEDGER MATRIX CALCULATION (Country x Industry)
    // =========================================================================
    // Clone baseline 2D matrix
    const ledger = this.cloneMatrix(baseMonthData.matrix);

    const fxRatio = fxRate / 1400.0;
    const oilRatio = brentOil / 78.0;
    const demandRatio = globalDemandIndex / 100.0;

    // Decomposition tracking accumulator
    let sumDemandDelta = 0;
    let sumFxDelta = 0;
    let sumTariffDelta = 0;
    let sumBarrierDelta = 0;
    let sumSupportDelta = 0;

    // First pass: apply macro, bilateral tariffs, and shocks directly to matrix cells E[c, i] and M[c, i]
    for (const p of PARTNERS) {
      const pState = this.partnerStates[p.id];
      const pTariffs = pState.tariffs || {};

      for (const ind of HS_MAPPING.industries) {
        const cell = ledger[p.id][ind.id];
        const indState = this.industryStates[ind.id];
        const scShock = this.scenario.industryShocks?.[ind.id] || {};

        // 1. Export calculation for cell E[c, i]
        const specificTariff = pTariffs[ind.id] ?? pTariffs.general ?? 0.03;
        // Automobile tariff has lag effect (2 months)
        let effTariff = specificTariff;
        if (ind.id === 'automobile' && p.id === 'US' && specificTariff > 0.03) {
          // If in month 1, partially buffered by dealer inventories
          if (month === 1) effTariff = 0.03 + (specificTariff - 0.03) * 0.65;
        }

        const tariffPenalty = Math.max(0, (effTariff - 0.03) * ind.priceElasticity * 1.6);

        // FX boost / drag
        const fxBoost = (fxRatio - 1.0) * ind.fxSensitivity * 0.8;

        // Demand shock
        const demandBoost = (demandRatio - 1.0) * 1.0 + (scShock.demandMod || 0.0);

        // Trade barrier index
        const barrierPenalty = ((indState.tradeBarrierIndex / 100.0) - 1.0) * ind.priceElasticity * 0.8;

        // Policy support boost (with logarithmic diminishing returns and Origin multiplier!)
        let originPolicyMult = 1.0;
        if (this.origin === 'industry_expert') originPolicyMult = 1.30;
        if (this.origin === 'bureaucrat') originPolicyMult = 0.85;

        const effectiveSupport = Math.log1p(indState.supportLevel) * 0.025 * originPolicyMult;
        const supportBoost = effectiveSupport;

        // Track decomposition
        const cellBaseExp = cell.export;
        sumDemandDelta += cellBaseExp * demandBoost;
        sumFxDelta += cellBaseExp * fxBoost;
        sumTariffDelta += cellBaseExp * (-tariffPenalty);
        sumBarrierDelta += cellBaseExp * (-barrierPenalty);
        sumSupportDelta += cellBaseExp * supportBoost;

        // Total multiplier for cell E[c, i]
        let cellExpMultiplier = Math.max(0.15, 1.0 + fxBoost + demandBoost - tariffPenalty - barrierPenalty + supportBoost);

        // Calculate intermediate cell export
        cell.export = Math.round((cell.export * cellExpMultiplier) * 1000) / 1000;

        // 2. Import calculation for cell M[c, i]
        let cellImpMultiplier = 1.0;

        // Oil price scales energy / petrochemical imports directly
        if (ind.id === 'others' || ind.id === 'petrochemical') {
          cellImpMultiplier += (oilRatio - 1.0) * 0.70;
          if (p.id === 'ME') {
            cellImpMultiplier += (oilRatio - 1.0) * 0.35; // Middle East crude loading
          }
        }

        // Special bilateral energy agreements (e.g. US LNG purchase deal)
        if (p.id === 'US' && ind.id === 'others' && pState.energyQuotaMod > 0) {
          cell.import = Math.round((cell.import + pState.energyQuotaMod) * 1000) / 1000;
        }

        // Chinese dumping shock
        if (p.id === 'CN' && (ind.id === 'steel' || ind.id === 'petrochemical')) {
          if (scShock.priceCompMod && scShock.priceCompMod < 0) {
            cellImpMultiplier += Math.abs(scShock.priceCompMod) * 1.3; // Inflow of dumped imports
          }
        }

        // FX dampen on imports (weaker KRW makes foreign imports expensive)
        const fxImpDampen = (fxRatio - 1.0) * 0.20;
        cellImpMultiplier = Math.max(0.4, cellImpMultiplier - fxImpDampen);

        cell.import = Math.round((cell.import * cellImpMultiplier) * 1000) / 1000;
      }
    }

    // Apply Shipbuilding & Defense contract lag milestone delivery directly into ledger
    if (this.industryStates.shipbuilding.pendingDeliveries > 0) {
      const release = Math.min(this.industryStates.shipbuilding.pendingDeliveries, 0.6);
      ledger.EU.shipbuilding.export = Math.round((ledger.EU.shipbuilding.export + release * 0.6) * 1000) / 1000;
      ledger.ROW.shipbuilding.export = Math.round((ledger.ROW.shipbuilding.export + release * 0.4) * 1000) / 1000;
      this.industryStates.shipbuilding.pendingDeliveries -= release;
    }
    if (this.industryStates.defense.pendingDeliveries > 0) {
      const release = Math.min(this.industryStates.defense.pendingDeliveries, 0.4);
      ledger.EU.defense.export = Math.round((ledger.EU.defense.export + release * 0.7) * 1000) / 1000;
      ledger.ME.defense.export = Math.round((ledger.ME.defense.export + release * 0.3) * 1000) / 1000;
      this.industryStates.defense.pendingDeliveries -= release;
    }

    // Enforce Physical Plant Capacity Caps per Industry!
    let sumCapacityCut = 0;
    for (const ind of HS_MAPPING.industries) {
      const indState = this.industryStates[ind.id];
      const baseIndExp = baseMonthData.industries[ind.id].export;

      let currentIndExp = 0;
      for (const p of PARTNERS) {
        currentIndExp += ledger[p.id][ind.id].export;
      }

      // Max physical capacity ceiling: 120% baseline, expandable via capex index
      const maxPhysicalCap = (baseIndExp * 1.20) * (indState.capacityIndex / 100.0);
      if (currentIndExp > maxPhysicalCap) {
        const cut = currentIndExp - maxPhysicalCap;
        sumCapacityCut += cut;
        const scaleDown = maxPhysicalCap / currentIndExp;
        for (const p of PARTNERS) {
          ledger[p.id][ind.id].export = Math.round((ledger[p.id][ind.id].export * scaleDown) * 1000) / 1000;
        }
      }

      // Update utilization rate
      indState.utilizationRate = Math.min(100, Math.max(40, Math.round(85.0 * (currentIndExp / baseIndExp))));
    }

    // Monthly decay of policy support subsidies as fiscal allocations expire
    for (const indState of Object.values(this.industryStates)) {
      indState.supportLevel = Math.max(0, indState.supportLevel * 0.70 - 0.15);
    }

    // =========================================================================
    // AGGREGATION FROM COMMON LEDGER MATRIX (Mathematically Exact)
    // =========================================================================
    const computedIndustries = {};
    const computedPartners = {};
    let totalExport = 0;
    let totalImport = 0;

    // Aggregate by Industry
    for (const ind of HS_MAPPING.industries) {
      let eSum = 0;
      let iSum = 0;
      for (const p of PARTNERS) {
        eSum += ledger[p.id][ind.id].export;
        iSum += ledger[p.id][ind.id].import;
      }
      eSum = Math.round(eSum * 1000) / 1000;
      iSum = Math.round(iSum * 1000) / 1000;
      computedIndustries[ind.id] = {
        id: ind.id,
        name: ind.name,
        export: eSum,
        import: iSum,
        balance: Math.round((eSum - iSum) * 1000) / 1000,
        capacityIndex: this.industryStates[ind.id].capacityIndex,
        utilizationRate: this.industryStates[ind.id].utilizationRate,
        tradeBarrierIndex: this.industryStates[ind.id].tradeBarrierIndex
      };
      totalExport += eSum;
      totalImport += iSum;
    }

    // Aggregate by Partner
    for (const p of PARTNERS) {
      let eSum = 0;
      let iSum = 0;
      for (const ind of HS_MAPPING.industries) {
        eSum += ledger[p.id][ind.id].export;
        iSum += ledger[p.id][ind.id].import;
      }
      eSum = Math.round(eSum * 1000) / 1000;
      iSum = Math.round(iSum * 1000) / 1000;
      computedPartners[p.id] = {
        id: p.id,
        name: p.name,
        export: eSum,
        import: iSum,
        balance: Math.round((eSum - iSum) * 1000) / 1000
      };
    }

    totalExport = Math.round(totalExport * 1000) / 1000;
    totalImport = Math.round(totalImport * 1000) / 1000;
    const balance = Math.round((totalExport - totalImport) * 1000) / 1000;

    // YoY growth against 2026 baseline
    const yoyExportGrowth = Math.round(((totalExport - baseMonthData.export) / baseMonthData.export) * 1000) / 10;
    const yoyImportGrowth = Math.round(((totalImport - baseMonthData.import) / baseMonthData.import) * 1000) / 10;

    // Cumulative stats
    const prevCumulative = this.monthlyResults.length > 0 ? this.monthlyResults[this.monthlyResults.length - 1] : null;
    const cumulativeExport = Math.round(((prevCumulative?.cumulativeExport || 0) + totalExport) * 1000) / 1000;
    const cumulativeImport = Math.round(((prevCumulative?.cumulativeImport || 0) + totalImport) * 1000) / 1000;
    const cumulativeBalance = Math.round((cumulativeExport - cumulativeImport) * 1000) / 1000;

    // Store growth decomposition for audit
    const decomposition = {
      month,
      baseExport: baseMonthData.export,
      demandDelta: Math.round(sumDemandDelta * 1000) / 1000,
      fxDelta: Math.round(sumFxDelta * 1000) / 1000,
      tariffDelta: Math.round(sumTariffDelta * 1000) / 1000,
      barrierDelta: Math.round(sumBarrierDelta * 1000) / 1000,
      supportDelta: Math.round(sumSupportDelta * 1000) / 1000,
      capacityConstraintDelta: Math.round((-sumCapacityCut) * 1000) / 1000,
      finalExport: totalExport
    };
    this.decompositionHistory.push(decomposition);

    const result = {
      month,
      name: baseMonthData.name,
      export: totalExport,
      import: totalImport,
      balance,
      yoyExportGrowth,
      yoyImportGrowth,
      cumulativeExport,
      cumulativeImport,
      cumulativeBalance,
      macro: currentMacro,
      industries: computedIndustries,
      partners: computedPartners,
      matrix: ledger,
      decomposition
    };

    this.monthlyResults.push(result);
    return result;
  }
}
