// economy.mjs - Common Ledger Matrix Trade Simulation Engine for 통상교섭본부장 | TRADE CZAR

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
    const fxNoise = this.prng.range(-6, 6);
    const oilNoise = this.prng.range(-1.2, 1.2);
    const demandNoise = this.prng.range(-0.3, 0.3);

    const fxRate = Math.round((baseMonthData.macro.fxRate + (scMacro.fxRateDelta || 0) + fxNoise) * 10) / 10;
    const brentOil = Math.round((baseMonthData.macro.brentOil + (scMacro.oilDelta || 0) + oilNoise) * 10) / 10;
    const globalDemandIndex = Math.round((baseMonthData.macro.globalDemandIndex + (scMacro.globalDemandDelta || 0) + demandNoise) * 10) / 10;
    const scfiFreight = Math.max(1000, Math.round(baseMonthData.macro.scfiFreight + (scMacro.scfiDelta || 0) + this.prng.range(-40, 40)));

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
        const tariffPenalty = Math.max(0, (specificTariff - 0.03) * ind.priceElasticity * 1.8);

        // FX boost / drag
        const fxBoost = (fxRatio - 1.0) * ind.fxSensitivity;

        // Demand shock
        const demandBoost = (demandRatio - 1.0) * 1.2 + (scShock.demandMod || 0.0);

        // Trade barrier index
        const barrierPenalty = ((indState.tradeBarrierIndex / 100.0) - 1.0) * ind.priceElasticity;

        // Policy support boost (with diminishing returns!)
        const effectiveSupport = indState.supportLevel / (1.0 + indState.supportLevel * 0.12);
        const supportBoost = effectiveSupport * 0.035;

        // Total multiplier for cell E[c, i]
        let cellExpMultiplier = Math.max(0.2, 1.0 + fxBoost + demandBoost - tariffPenalty - barrierPenalty + supportBoost);

        // Calculate intermediate cell export
        cell.export = Math.round((cell.export * cellExpMultiplier) * 100) / 100;

        // 2. Import calculation for cell M[c, i]
        let cellImpMultiplier = 1.0;

        // Oil price scales energy / petrochemical imports directly
        if (ind.id === 'others' || ind.id === 'petrochemical') {
          cellImpMultiplier += (oilRatio - 1.0) * 0.75;
          if (p.id === 'ME') {
            cellImpMultiplier += (oilRatio - 1.0) * 0.40; // Heavy Middle East crude loading
          }
        }

        // Special bilateral energy agreements (e.g. US LNG purchase deal)
        if (p.id === 'US' && ind.id === 'others' && pState.energyQuotaMod > 0) {
          cell.import = Math.round((cell.import + pState.energyQuotaMod) * 100) / 100;
        }

        // Chinese dumping shock
        if (p.id === 'CN' && (ind.id === 'steel' || ind.id === 'petrochemical')) {
          if (scShock.priceCompMod && scShock.priceCompMod < 0) {
            cellImpMultiplier += Math.abs(scShock.priceCompMod) * 1.5; // Inflow of dumped imports!
          }
        }

        // FX dampen on imports (higher KRW makes imports expensive)
        const fxImpDampen = (fxRatio - 1.0) * 0.22;
        cellImpMultiplier = Math.max(0.4, cellImpMultiplier - fxImpDampen);

        cell.import = Math.round((cell.import * cellImpMultiplier) * 100) / 100;
      }
    }

    // Apply Shipbuilding & Defense contract lag milestone delivery directly into ledger
    if (this.industryStates.shipbuilding.pendingDeliveries > 0) {
      const release = Math.min(this.industryStates.shipbuilding.pendingDeliveries, 0.8);
      ledger.EU.shipbuilding.export = Math.round((ledger.EU.shipbuilding.export + release * 0.6) * 100) / 100;
      ledger.ROW.shipbuilding.export = Math.round((ledger.ROW.shipbuilding.export + release * 0.4) * 100) / 100;
      this.industryStates.shipbuilding.pendingDeliveries -= release;
    }
    if (this.industryStates.defense.pendingDeliveries > 0) {
      const release = Math.min(this.industryStates.defense.pendingDeliveries, 0.6);
      ledger.EU.defense.export = Math.round((ledger.EU.defense.export + release * 0.7) * 100) / 100;
      ledger.ME.defense.export = Math.round((ledger.ME.defense.export + release * 0.3) * 100) / 100;
      this.industryStates.defense.pendingDeliveries -= release;
    }

    // Enforce Physical Plant Capacity Caps per Industry!
    // Sum across countries for each industry, cap at physical capacity, scale back if exceeded
    for (const ind of HS_MAPPING.industries) {
      const indState = this.industryStates[ind.id];
      const baseIndExp = baseMonthData.industries[ind.id].export;
      
      // Calculate current unconstrained export sum
      let currentIndExp = 0;
      for (const p of PARTNERS) {
        currentIndExp += ledger[p.id][ind.id].export;
      }

      // Physical capacity ceiling
      const maxPhysicalCap = (baseIndExp * 1.35) * (indState.capacityIndex / 100.0);
      if (currentIndExp > maxPhysicalCap) {
        const scaleDown = maxPhysicalCap / currentIndExp;
        for (const p of PARTNERS) {
          ledger[p.id][ind.id].export = Math.round((ledger[p.id][ind.id].export * scaleDown) * 100) / 100;
        }
      }

      // Update utilization rate
      indState.utilizationRate = Math.min(100, Math.max(45, Math.round(85.0 * (currentIndExp / baseIndExp))));
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
      eSum = Math.round(eSum * 100) / 100;
      iSum = Math.round(iSum * 100) / 100;
      const bSum = Math.round((eSum - iSum) * 100) / 100;
      const baseInd = baseMonthData.industries[ind.id];
      const yoy = Math.round(((eSum - baseInd.export) / baseInd.export) * 1000) / 10;

      computedIndustries[ind.id] = {
        id: ind.id,
        name: ind.name,
        export: eSum,
        import: iSum,
        balance: bSum,
        yoyGrowth: yoy,
        baseExport2026: baseInd.export,
        baseImport2026: baseInd.import,
        capacityIndex: this.industryStates[ind.id].capacityIndex,
        utilizationRate: this.industryStates[ind.id].utilizationRate,
        tradeBarrierIndex: this.industryStates[ind.id].tradeBarrierIndex
      };

      totalExport += eSum;
      totalImport += iSum;
    }

    totalExport = Math.round(totalExport * 100) / 100;
    totalImport = Math.round(totalImport * 100) / 100;
    const tradeBalance = Math.round((totalExport - totalImport) * 100) / 100;

    // Aggregate by Country
    for (const p of PARTNERS) {
      let eSum = 0;
      let iSum = 0;
      for (const ind of HS_MAPPING.industries) {
        eSum += ledger[p.id][ind.id].export;
        iSum += ledger[p.id][ind.id].import;
      }
      eSum = Math.round(eSum * 100) / 100;
      iSum = Math.round(iSum * 100) / 100;
      const bSum = Math.round((eSum - iSum) * 100) / 100;
      const basePart = baseMonthData.partners[p.id];

      computedPartners[p.id] = {
        id: p.id,
        name: p.name,
        flag: p.flag,
        export: eSum,
        import: iSum,
        balance: bSum,
        baseExport2026: basePart.export,
        baseImport2026: basePart.import
      };
    }

    // Cumulative stats
    const prevCumBal = this.monthlyResults.length > 0 ? this.monthlyResults[this.monthlyResults.length - 1].cumulativeBalance : 0;
    const cumulativeBalance = Math.round((prevCumBal + tradeBalance) * 100) / 100;

    const prevCumExp = this.monthlyResults.length > 0 ? this.monthlyResults[this.monthlyResults.length - 1].cumulativeExport : 0;
    const cumulativeExport = Math.round((prevCumExp + totalExport) * 100) / 100;

    const prevCumImp = this.monthlyResults.length > 0 ? this.monthlyResults[this.monthlyResults.length - 1].cumulativeImport : 0;
    const cumulativeImport = Math.round((prevCumImp + totalImport) * 100) / 100;

    const totalYoY = Math.round(((totalExport - baseMonthData.export) / baseMonthData.export) * 1000) / 10;
    const importYoY = Math.round(((totalImport - baseMonthData.import) / baseMonthData.import) * 1000) / 10;

    const result = {
      year: 2027,
      month,
      monthName: `${month}월`,
      status: baseMonthData.status,
      export: totalExport,
      import: totalImport,
      balance: tradeBalance,
      yoyExportGrowth: totalYoY,
      yoyImportGrowth: importYoY,
      cumulativeExport,
      cumulativeImport,
      cumulativeBalance,
      baseMonthExport: baseMonthData.export,
      baseMonthImport: baseMonthData.import,
      baseMonthBalance: baseMonthData.balance,
      macro: currentMacro,
      industries: computedIndustries,
      partners: computedPartners,
      ledger // Exact Matrix ground truth preserved
    };

    this.monthlyResults.push(result);
    return result;
  }
}
