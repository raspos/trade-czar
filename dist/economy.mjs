// economy.mjs - Core Trade Simulation Engine for 통상교섭본부장 | TRADE CZAR

import { BASELINE_2026, HS_MAPPING } from './data.mjs';
import { INDUSTRIES, PARTNERS } from './constants.mjs';

export class EconomyEngine {
  constructor(scenario, origin, prng) {
    this.scenario = scenario;
    this.origin = origin;
    this.prng = prng;

    // Macro variables tracking
    this.macroHistory = [];
    this.monthlyResults = [];
    
    // Delayed policy pipeline: array of { executeMonth, applyFn }
    this.delayedPipeline = [];

    // Industry persistent states
    this.industryStates = {};
    HS_MAPPING.industries.forEach(ind => {
      this.industryStates[ind.id] = {
        id: ind.id,
        name: ind.name,
        capacityIndex: 100.0,
        utilizationRate: ind.id === 'semiconductor' ? 94.0 : (ind.id === 'automobile' ? 88.0 : 80.0),
        priceCompetitiveness: 100.0,
        tradeBarrierIndex: 100.0,
        supportLevel: 0.0,
        longTermCompetitiveness: 100.0,
        pendingDeliveries: 0.0 // For shipbuilding/defense lag contracts
      };
    });

    // Partner persistent states (tariffs, agreements)
    this.partnerStates = {};
    PARTNERS.forEach(p => {
      this.partnerStates[p.id] = {
        id: p.id,
        name: p.name,
        tariffs: { ... (scenario.partnerTariffs?.[p.id] || { general: 0.03 }) },
        relations: 60.0, // 0 - 100
        specialAgreements: []
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

  // Queue a delayed policy effect
  queueEffect(delayMonths, fn) {
    this.delayedPipeline.push({ delayMonths, fn });
  }

  // Simulate month (1 to 12)
  simulateMonth(month, policyInterventions = []) {
    const baseMonthData = BASELINE_2026.months[month - 1];
    
    // Process policy interventions for this turn
    policyInterventions.forEach(act => {
      if (act.executeImmediate) act.executeImmediate(this);
      if (act.delayMonths && act.executeDelayed) {
        this.queueEffect(act.delayMonths, act.executeDelayed);
      }
    });

    // Execute any maturing delayed effects
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

    // Macro computation for 2027
    const scMacro = this.scenario.initialMacro || {};
    // Organic monthly drift + PRNG noise
    const fxNoise = this.prng.range(-8, 8);
    const oilNoise = this.prng.range(-1.5, 1.5);
    const demandNoise = this.prng.range(-0.4, 0.4);

    const fxRate = Math.round((baseMonthData.macro.fxRate + (scMacro.fxRateDelta || 0) + fxNoise) * 10) / 10;
    const brentOil = Math.round((baseMonthData.macro.brentOil + (scMacro.oilDelta || 0) + oilNoise) * 10) / 10;
    const globalDemandIndex = Math.round((baseMonthData.macro.globalDemandIndex + (scMacro.globalDemandDelta || 0) + demandNoise) * 10) / 10;
    const scfiFreight = Math.max(1000, Math.round(baseMonthData.macro.scfiFreight + (scMacro.scfiDelta || 0) + this.prng.range(-50, 50)));

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

    // Compute industry outputs
    const currentIndustries = {};
    let totalExport = 0;
    let totalImport = 0;

    // First pass: compute each industry's export and import
    HS_MAPPING.industries.forEach(ind => {
      const baseInd = baseMonthData.industries[ind.id];
      const state = this.industryStates[ind.id];

      // Demand shock factor from scenario
      const scShock = this.scenario.industryShocks?.[ind.id] || {};
      const scDemandMod = scShock.demandMod || 0.0;

      // Price competitiveness impact (FX effect: higher FX helps exports, lower hurts)
      // J-curve: KRW depreciation (e.g. fxRate > 1400) gives boost to price elasticity
      const fxRatio = fxRate / 1400.0;
      const fxExportBoost = (fxRatio - 1.0) * ind.fxSensitivity;

      // Global demand effect
      const demandRatio = globalDemandIndex / 100.0;

      // Trade barriers effect (higher barrier = lower export)
      const barrierRatio = state.tradeBarrierIndex / 100.0;
      const barrierPenalty = (barrierRatio - 1.0) * ind.priceElasticity;

      // Policy support boost
      const supportBoost = state.supportLevel * 0.04;

      // Delayed deliveries for shipbuilding & defense
      let contractDeliveryBonus = 0;
      if (ind.id === 'shipbuilding' || ind.id === 'defense') {
        if (state.pendingDeliveries > 0) {
          const released = Math.min(state.pendingDeliveries, 0.4); // up to $0.4B per month
          contractDeliveryBonus = released;
          state.pendingDeliveries -= released;
        }
      }

      // Net export multiplier
      const exportMultiplier = Math.max(0.4, 1.0 + scDemandMod + fxExportBoost + (demandRatio - 1.0) - barrierPenalty + supportBoost);
      
      let expValue = Math.round((baseInd.export * exportMultiplier + contractDeliveryBonus) * 100) / 100;
      // Cap at physical production capacity
      const maxCap = (baseInd.export * 1.5) * (state.capacityIndex / 100.0);
      expValue = Math.min(expValue, Math.round(maxCap * 100) / 100);

      // Import calculation
      // Oil price directly scales petrochemical and others import cost
      let importCostMultiplier = 1.0;
      if (ind.id === 'petrochemical' || ind.id === 'others') {
        const oilRatio = brentOil / 78.0;
        importCostMultiplier = 1.0 + (oilRatio - 1.0) * 0.65;
      }
      if (scShock.importCostMod) {
        importCostMultiplier += scShock.importCostMod;
      }

      // FX effect on imports: higher FX rate makes imports more expensive in KRW, slightly dampening volume
      const fxImportDampen = (fxRatio - 1.0) * 0.25;
      const netImportMultiplier = Math.max(0.5, importCostMultiplier - fxImportDampen);

      let impValue = Math.round((baseInd.import * netImportMultiplier) * 100) / 100;

      const balanceValue = Math.round((expValue - impValue) * 100) / 100;
      const yoyGrowth = Math.round(((expValue - baseInd.export) / baseInd.export) * 1000) / 10;

      // Update state profitability
      state.utilizationRate = Math.min(100, Math.max(50, Math.round(state.utilizationRate * (expValue / baseInd.export))));
      state.priceCompetitiveness = Math.round((100.0 + (fxRatio - 1.0) * 20.0) * 10) / 10;

      currentIndustries[ind.id] = {
        id: ind.id,
        name: ind.name,
        export: expValue,
        import: impValue,
        balance: balanceValue,
        yoyGrowth,
        baseExport2026: baseInd.export,
        baseImport2026: baseInd.import,
        capacityIndex: state.capacityIndex,
        utilizationRate: state.utilizationRate,
        tradeBarrierIndex: state.tradeBarrierIndex
      };

      totalExport += expValue;
      totalImport += impValue;
    });

    totalExport = Math.round(totalExport * 100) / 100;
    totalImport = Math.round(totalImport * 100) / 100;
    const tradeBalance = Math.round((totalExport - totalImport) * 100) / 100;

    // Distribute among trading partners proportionally, matching totalExport & totalImport exactly
    const currentPartners = {};
    let pExpSum = 0;
    let pImpSum = 0;

    PARTNERS.forEach((p, idx) => {
      const basePartner = baseMonthData.partners[p.id];
      const pState = this.partnerStates[p.id];

      // Partner tariff impact
      const pTariffRate = pState.tariffs.general || 0.03;
      const tariffDampener = 1.0 - (pTariffRate - 0.03) * 1.5;

      let pExp = Math.round((basePartner.export * (totalExport / baseMonthData.export) * tariffDampener) * 100) / 100;
      
      // Middle East imports scale with oil price
      let oilPartnerScale = 1.0;
      if (p.id === 'ME') {
        oilPartnerScale = brentOil / 78.0;
      }
      let pImp = Math.round((basePartner.import * (totalImport / baseMonthData.import) * oilPartnerScale) * 100) / 100;

      if (idx === PARTNERS.length - 1) {
        pExp = Math.round((totalExport - pExpSum) * 100) / 100;
        pImp = Math.round((totalImport - pImpSum) * 100) / 100;
      } else {
        pExpSum += pExp;
        pImpSum += pImp;
      }

      currentPartners[p.id] = {
        id: p.id,
        name: p.name,
        flag: p.flag,
        export: pExp,
        import: pImp,
        balance: Math.round((pExp - pImp) * 100) / 100,
        baseExport2026: basePartner.export,
        baseImport2026: basePartner.import
      };
    });

    // Total YoY
    const totalYoY = Math.round(((totalExport - baseMonthData.export) / baseMonthData.export) * 1000) / 10;
    const importYoY = Math.round(((totalImport - baseMonthData.import) / baseMonthData.import) * 1000) / 10;

    // Cumulative stats
    const prevCumulativeBalance = this.monthlyResults.length > 0 
      ? this.monthlyResults[this.monthlyResults.length - 1].cumulativeBalance 
      : 0;
    const cumulativeBalance = Math.round((prevCumulativeBalance + tradeBalance) * 100) / 100;

    const prevCumulativeExport = this.monthlyResults.length > 0
      ? this.monthlyResults[this.monthlyResults.length - 1].cumulativeExport
      : 0;
    const cumulativeExport = Math.round((prevCumulativeExport + totalExport) * 100) / 100;

    const prevCumulativeImport = this.monthlyResults.length > 0
      ? this.monthlyResults[this.monthlyResults.length - 1].cumulativeImport
      : 0;
    const cumulativeImport = Math.round((prevCumulativeImport + totalImport) * 100) / 100;

    const result = {
      year: 2027,
      month,
      monthName: `${month}월`,
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
      industries: currentIndustries,
      partners: currentPartners
    };

    this.monthlyResults.push(result);
    return result;
  }
}
