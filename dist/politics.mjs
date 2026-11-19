// politics.mjs - Political Stakeholders & Player Evaluation Metrics with Realistic Friction and Diminishing Returns

export class PoliticsManager {
  constructor(originConfig) {
    this.origin = originConfig.id;
    this.stats = {
      presidentTrust: originConfig.initialStats.presidentTrust,
      businessTrust: originConfig.initialStats.businessTrust,
      diplomaticTrust: originConfig.initialStats.diplomaticTrust,
      publicApproval: originConfig.initialStats.publicApproval,
      policyMomentum: originConfig.initialStats.policyMomentum,
      competitiveness: originConfig.initialStats.competitiveness
    };

    this.consecutiveDeficits = 0;
    this.consecutiveUnderperformances = 0;
    this.dismissalWarning = false;
    this.isDismissed = false;
    this.history = [];
  }

  // Apply delta with High-Stat Resistance and Origin Traits
  applyDeltas(deltas) {
    if (!deltas) return;
    for (const [key, rawVal] of Object.entries(deltas)) {
      if (this.stats[key] === undefined) continue;

      let val = rawVal;

      // Origin modifiers on political dynamics
      if (this.origin === 'politician') {
        if (key === 'presidentTrust' && val > 0) val *= 1.35;
        if (key === 'publicApproval' && val > 0) val *= 1.35;
        if (key === 'policyMomentum' && val < 0) val *= 0.50; // Resists momentum loss
      } else if (this.origin === 'industry_expert') {
        if (key === 'businessTrust' && val > 0) val *= 1.35;
        if (key === 'businessTrust' && val < 0) val *= 0.70; // High tolerance from business
        if (key === 'diplomaticTrust' && val > 0) val *= 0.80;
      } else if (this.origin === 'bureaucrat') {
        if (key === 'diplomaticTrust' && val > 0) val *= 1.35;
        if (key === 'diplomaticTrust' && val < 0) val *= 0.60;
        if (key === 'businessTrust' && val < 0) val *= 1.25; // Business reacts harsher to bureaucrat mandates
      }

      // High-Stat Resistance: gains above 65 are progressively compressed!
      // This mathematically prevents unrealistic convergence to 100.
      if (val > 0) {
        const cur = this.stats[key];
        if (cur >= 90) {
          val *= 0.15; // 85% dampening
        } else if (cur >= 80) {
          val *= 0.35; // 65% dampening
        } else if (cur >= 65) {
          val *= 0.65; // 35% dampening
        }
      }

      // Losses are NEVER dampened!
      this.stats[key] = Math.max(0, Math.min(100, Math.round((this.stats[key] + val) * 10) / 10));
    }
  }

  evaluateMonth(monthlyResult, baselineMonth) {
    const bal = monthlyResult.balance;
    const baseBal = baselineMonth ? baselineMonth.balance : 30.0;
    const yoy = monthlyResult.yoyExportGrowth;

    let pDelta = 0;
    let pubDelta = 0;
    let bDelta = 0;
    let compDelta = 0;
    let dipDelta = 0;

    // Monthly Baseline Expectations:
    // Korea in 2027 expects substantial monthly surplus (around $25B~$35B).
    // Surpassing expectations gives modest praise; failing expectations damages trust!
    const surplusGap = bal - baseBal;

    if (surplusGap >= 5.0) {
      // Overperformed significantly
      pDelta += 2.0;
      pubDelta += 1.5;
      compDelta += 1.5;
      this.consecutiveUnderperformances = 0;
      this.consecutiveDeficits = 0;
    } else if (surplusGap >= -2.0) {
      // Met expectations roughly
      pDelta += 0.5;
      pubDelta += 0.2;
      this.consecutiveUnderperformances = 0;
      this.consecutiveDeficits = 0;
    } else if (surplusGap >= -8.0) {
      // Underperformed expectations
      pDelta -= 2.0;
      pubDelta -= 1.8;
      bDelta -= 1.5;
      compDelta -= 1.0;
      this.consecutiveUnderperformances += 1;
    } else if (bal > 0) {
      // Severe surplus contraction
      pDelta -= 4.0;
      pubDelta -= 3.5;
      bDelta -= 3.0;
      compDelta -= 2.0;
      this.consecutiveUnderperformances += 1;
    } else {
      // TRADE DEFICIT (무역 적자 비상사태)
      this.consecutiveDeficits += 1;
      this.consecutiveUnderperformances += 2;
      pDelta -= (6.0 + this.consecutiveDeficits * 4.0);
      pubDelta -= 6.0;
      bDelta -= 5.0;
      compDelta -= 3.0;
    }

    // YoY export growth reaction
    if (yoy >= 8.0) {
      bDelta += 1.5;
      compDelta += 1.5;
      pDelta += 1.0;
    } else if (yoy < -8.0) {
      bDelta -= 3.0;
      compDelta -= 2.0;
      pDelta -= 2.5;
    }

    // Natural Monthly Political Friction & Attrition:
    // Without continuous visible delivery, public approval and political momentum naturally cool off.
    pubDelta -= 0.6;
    let momDelta = -1.2;

    this.applyDeltas({
      presidentTrust: pDelta,
      publicApproval: pubDelta,
      businessTrust: bDelta,
      competitiveness: compDelta,
      policyMomentum: momDelta,
      diplomaticTrust: dipDelta
    });

    // Check early dismissal condition
    if (this.stats.presidentTrust <= 30 || (this.stats.presidentTrust <= 38 && this.consecutiveUnderperformances >= 3)) {
      this.dismissalWarning = true;
    } else {
      this.dismissalWarning = false;
    }

    if (this.stats.presidentTrust <= 18 || (this.stats.presidentTrust <= 28 && this.consecutiveDeficits >= 2)) {
      this.isDismissed = true;
    }

    this.history.push({
      month: monthlyResult.month,
      ...this.stats,
      dismissalWarning: this.dismissalWarning,
      isDismissed: this.isDismissed
    });

    return {
      stats: { ...this.stats },
      dismissalWarning: this.dismissalWarning,
      isDismissed: this.isDismissed
    };
  }
}
