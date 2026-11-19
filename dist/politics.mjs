// politics.mjs - Political Stakeholders & Player Evaluation Metrics

export class PoliticsManager {
  constructor(originConfig) {
    this.stats = {
      presidentTrust: originConfig.initialStats.presidentTrust,
      businessTrust: originConfig.initialStats.businessTrust,
      diplomaticTrust: originConfig.initialStats.diplomaticTrust,
      publicApproval: originConfig.initialStats.publicApproval,
      policyMomentum: originConfig.initialStats.policyMomentum,
      competitiveness: originConfig.initialStats.competitiveness
    };

    this.consecutiveDeficits = 0;
    this.dismissalWarning = false;
    this.isDismissed = false;
    this.history = [];
  }

  applyDeltas(deltas) {
    if (!deltas) return;
    for (const [key, val] of Object.entries(deltas)) {
      if (this.stats[key] !== undefined) {
        this.stats[key] = Math.max(0, Math.min(100, this.stats[key] + val));
      }
    }
  }

  evaluateMonth(monthlyResult) {
    const bal = monthlyResult.balance;
    const yoy = monthlyResult.yoyExportGrowth;

    // President reaction to trade balance
    let pDelta = 0;
    let pubDelta = 0;
    let bDelta = 0;
    let compDelta = 0;

    if (bal >= 6.0) {
      pDelta += 4;
      pubDelta += 3;
      compDelta += 2;
      this.consecutiveDeficits = 0;
    } else if (bal >= 2.0) {
      pDelta += 1;
      pubDelta += 1;
      this.consecutiveDeficits = 0;
    } else if (bal >= 0) {
      pDelta -= 1;
      this.consecutiveDeficits = 0;
    } else {
      // Deficit!
      this.consecutiveDeficits += 1;
      pDelta -= (4 + this.consecutiveDeficits * 3);
      pubDelta -= 4;
      bDelta -= 3;
      compDelta -= 2;
    }

    // YoY growth reaction
    if (yoy >= 5.0) {
      bDelta += 3;
      compDelta += 3;
      pDelta += 2;
    } else if (yoy < -5.0) {
      bDelta -= 4;
      compDelta -= 3;
      pDelta -= 2;
    }

    this.applyDeltas({
      presidentTrust: pDelta,
      publicApproval: pubDelta,
      businessTrust: bDelta,
      competitiveness: compDelta
    });

    // Check early dismissal condition
    if (this.stats.presidentTrust <= 25 && this.consecutiveDeficits >= 2) {
      this.dismissalWarning = true;
    } else {
      this.dismissalWarning = false;
    }

    if (this.stats.presidentTrust <= 12 && this.consecutiveDeficits >= 3) {
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
