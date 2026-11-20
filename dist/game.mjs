// game.mjs - Master Game State and Turn Orchestration for 통상교섭본부장 | TRADE CZAR

import { SCENARIOS, setupRandomScenario } from './scenarios.mjs';
import { ORIGINS } from './constants.mjs';
import { getOrigin } from './origins.mjs';
import { PRNG } from './prng.mjs';
import { BASELINE_2026 } from './data.mjs';
import { EconomyEngine } from './economy.mjs';
import { NegotiationEngine, ForeignPolicyManager } from './negotiations.mjs';
import { POLICY_ACTIONS, getPolicy, DOCTRINES, getDoctrine } from './policies.mjs';
import { CORPORATIONS, getCorporation, CorporateAgencyManager } from './corporations.mjs';
import { EventEngine } from './events.mjs';
import { PoliticsManager } from './politics.mjs';
import { NewspaperEngine } from './newspaper.mjs';
import { VerdictEngine } from './verdict.mjs';
import { StorageManager } from './storage.mjs';

export class GameManager {
  constructor() {
    this.screen = "title"; // title, origin_select, scenario_select, office, war_room, negotiation, result_briefing, newspaper, verdict
    this.scenario = null;
    this.origin = null;
    this.seed = 123456789;
    this.prng = null;

    this.currentMonth = 1;
    this.maxActionPoints = 5;
    this.actionPoints = 5;
    this.usedPoliciesThisMonth = [];
    this.activeEvent = null;
    this.activeNegotiation = null;
    this.lastNegotiationAgreement = null;

    this.doctrine = null;
    this.foreignPolicyEngine = new ForeignPolicyManager();
    this.corporateAgencyManager = new CorporateAgencyManager();
    this.monthlyThreats = [];
    this.pendingCorporateActions = [];
    this.activeCorporateAction = null;

    this.economy = null;
    this.politics = null;
    this.eventEngine = null;
    this.newspaperEngine = new NewspaperEngine();
    this.verdictEngine = new VerdictEngine();

    this.latestMonthlyResult = null;
    this.latestNewspaper = null;
    this.finalVerdict = null;
    this.gameLog = [];
  }

  // Start new game
  newGame(scenarioId = "baseline", originId = "bureaucrat", customSeed = null) {
    this.seed = customSeed !== null && !isNaN(customSeed) ? Number(customSeed) : Math.floor(Math.random() * 900000000) + 100000000;
    this.prng = new PRNG(this.seed);

    let rawScenario = SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0];
    if (rawScenario.isRandom) {
      const randomProps = setupRandomScenario(this.prng);
      this.scenario = { ...rawScenario, ...randomProps };
    } else {
      this.scenario = { ...rawScenario };
    }

    this.origin = originId;
    const originCfg = getOrigin(originId);

    this.economy = new EconomyEngine(this.scenario, this.origin, this.prng);
    this.politics = new PoliticsManager(originCfg);
    this.eventEngine = new EventEngine(this.prng);
    this.foreignPolicyEngine = new ForeignPolicyManager();
    this.corporateAgencyManager = new CorporateAgencyManager();

    // Default Doctrine
    this.doctrine = DOCTRINES[0];

    this.currentMonth = 1;
    this.maxActionPoints = 5;
    this.actionPoints = 5;
    this.usedPoliciesThisMonth = [];
    this.firstTurnBriefingDismissed = false;
    this.lastActionResult = null;
    this.activeEvent = null;
    this.activeNegotiation = null;
    this.lastNegotiationAgreement = null;
    this.monthlyThreats = [];
    this.pendingCorporateActions = [];
    this.activeCorporateAction = null;
    this.latestMonthlyResult = null;
    this.latestNewspaper = null;
    this.finalVerdict = null;
    this.gameLog = [];

    this.prepareMonth();
    this.screen = "office";
    this.autoSave();
    return this;
  }

  setDoctrine(doctrineId) {
    const doc = getDoctrine(doctrineId);
    if (!doc) return;
    this.doctrine = doc;
    if (doc.id === 'semiconductor_supremacy') {
      this.economy.industryStates.semiconductor.competitivenessIndex += 6;
      this.economy.industryStates.semiconductor.capacityIndex += 3;
    } else if (doc.id === 'us_alliance_first') {
      this.politics.stats.diplomaticTrust = Math.min(100, this.politics.stats.diplomaticTrust + 8);
      if (this.economy.partnerStates.US) {
        this.economy.partnerStates.US.allianceBonus = 0.15;
      }
    } else if (doc.id === 'china_derisking') {
      this.politics.stats.diplomaticTrust = Math.min(100, this.politics.stats.diplomaticTrust + 4);
      if (this.economy.partnerStates.ASEAN) this.economy.partnerStates.ASEAN.growthMod = 0.04;
      if (this.economy.partnerStates.INDIA) this.economy.partnerStates.INDIA.growthMod = 0.04;
    } else if (doc.id === 'global_south_frontier') {
      if (this.economy.partnerStates.ASEAN) this.economy.partnerStates.ASEAN.growthMod = 0.06;
      if (this.economy.partnerStates.INDIA) this.economy.partnerStates.INDIA.growthMod = 0.06;
      this.economy.industryStates.consumer.competitivenessIndex += 3;
    } else if (doc.id === 'inclusive_sme_trade') {
      this.politics.stats.publicApproval = Math.min(100, this.politics.stats.publicApproval + 8);
      this.economy.industryStates.consumer.competitivenessIndex += 4;
      this.economy.industryStates.machinery.competitivenessIndex += 3;
    } else if (doc.id === 'energy_green_security') {
      this.politics.stats.diplomaticTrust = Math.min(100, this.politics.stats.diplomaticTrust + 6);
      if (this.economy.partnerStates.EU) this.economy.partnerStates.EU.greenExempt = true;
    }
    this.gameLog.push({
      month: this.currentMonth,
      type: "doctrine_change",
      doctrineName: doc.name
    });
    this.autoSave();
  }

  prepareMonth() {
    this.maxActionPoints = 5;
    this.actionPoints = 5;
    this.usedPoliciesThisMonth = [];
    this.lastNegotiationAgreement = null;

    // Check proactive foreign threats (US universal tariff, China dumping, EU CBAM)
    this.monthlyThreats = this.foreignPolicyEngine.checkMonthlyProactiveThreats(
      this.currentMonth,
      this.economy,
      this.politics,
      this.gameLog.filter(g => g.type === 'negotiation')
    );

    // Check autonomous corporate decisions (Hyundai Georgia shift, Posco furnace shutdown, Samsung cut)
    this.pendingCorporateActions = this.corporateAgencyManager.evaluateCorporateAutonomousActions(
      this.currentMonth,
      this.economy,
      this.politics,
      this.gameLog.filter(g => g.type === 'negotiation')
    );
    this.activeCorporateAction = this.pendingCorporateActions.length > 0 ? this.pendingCorporateActions[0] : null;

    // Check for random event for this month
    const stateForEvent = {
      month: this.currentMonth,
      currentMacro: this.economy.macroHistory.length > 0 ? this.economy.macroHistory[this.economy.macroHistory.length - 1] : { fxRate: 1400 },
      politics: this.politics.stats
    };

    this.activeEvent = this.eventEngine.rollEvent(stateForEvent);
  }

  resolveCorporateAction(corpId, actionKey, optionId) {
    if (!this.activeCorporateAction || this.activeCorporateAction.actionKey !== actionKey) return null;
    const resolvedChoice = this.corporateAgencyManager.resolveActionResponse(
      this.activeCorporateAction,
      optionId,
      this.economy,
      this.politics
    );

    this.gameLog.push({
      month: this.currentMonth,
      type: "corporate_agency_response",
      actionKey,
      corpId,
      chosenOption: resolvedChoice.text
    });

    this.pendingCorporateActions = this.pendingCorporateActions.filter(a => a.actionKey !== actionKey);
    this.activeCorporateAction = this.pendingCorporateActions.length > 0 ? this.pendingCorporateActions[0] : null;
    this.autoSave();
    return resolvedChoice;
  }

  // Handle active event choice
  resolveEventChoice(choiceIndex) {
    if (!this.activeEvent || !this.activeEvent.choices[choiceIndex]) return;
    const choice = this.activeEvent.choices[choiceIndex];

    if (choice.impact) {
      this.politics.applyDeltas(choice.impact);
    }
    if (choice.apply) {
      choice.apply(this.economy);
    }

    this.gameLog.push({
      month: this.currentMonth,
      type: "event",
      eventTitle: this.activeEvent.title,
      chosenText: choice.text
    });

    this.activeEvent = null;
    this.autoSave();
  }

  // Execute a policy action
  executePolicy(policyId) {
    if (this.actionPoints <= 0) return { error: "No action points remaining" };
    if (this.usedPoliciesThisMonth.includes(policyId)) return { error: "Policy already executed this month" };

    const policy = getPolicy(policyId);
    if (!policy) return { error: "Unknown policy" };

    if (policy.isNegotiationLaunch || policy.isNegotiation) {
      // Launch interactive negotiation session!
      this.activeNegotiation = new NegotiationEngine(policy.partnerId, this.origin, this.prng);
      this.screen = "negotiation";
      this.autoSave();
      return { success: true, mode: "negotiation" };
    }

    // Normal policy execution
    this.actionPoints -= 1;
    this.usedPoliciesThisMonth.push(policyId);

    if (policy.executeImmediate) policy.executeImmediate(this.economy);
    if (policy.delayMonths && policy.executeDelayed) {
      this.economy.queueEffect(policy.delayMonths, policy.executeDelayed);
    }
    if (policy.impact) {
      this.politics.applyDeltas(policy.impact);
    }

    this.lastActionResult = {
      success: true,
      policyId: policy.id,
      title: policy.title,
      costText: policy.costText,
      remainingAP: this.actionPoints
    };

    this.gameLog.push({
      month: this.currentMonth,
      type: "policy",
      policyId: policy.id,
      title: policy.title
    });

    this.autoSave();
    return { success: true, actionPoints: this.actionPoints, lastActionResult: this.lastActionResult };
  }

  // Interactive Corporate Dialogue & Strategy Guidance
  consultCorporation(corpId, optionIndex) {
    const corp = getCorporation(corpId);
    if (!corp || !corp.dialogue || !corp.dialogue.options[optionIndex]) return null;
    const option = corp.dialogue.options[optionIndex];

    if (option.impact) {
      this.politics.applyDeltas(option.impact);
    }
    if (option.apply) {
      option.apply(this.economy);
    }

    this.gameLog.push({
      month: this.currentMonth,
      type: "corporate_consultation",
      corpId: corp.id,
      corpName: corp.name,
      chosenOption: option.text,
      response: option.response
    });

    this.autoSave();
    return {
      corp,
      option,
      response: option.response
    };
  }

  // Conclude active negotiation
  concludeNegotiation(choice = 'agree') {
    if (!this.activeNegotiation) return null;

    const agreement = this.activeNegotiation.conclude(choice);
    this.activeNegotiation.applyToEconomy(this.economy);
    this.lastNegotiationAgreement = agreement;

    // Spending 1 action point for negotiation
    this.actionPoints = Math.max(0, this.actionPoints - 1);
    this.usedPoliciesThisMonth.push(this.activeNegotiation.scenario.partnerId);

    if (agreement.relationDelta) {
      this.politics.applyDeltas({
        diplomaticTrust: agreement.relationDelta > 0 ? 15 : -20,
        presidentTrust: agreement.relationDelta > 0 ? 10 : -15,
        publicApproval: agreement.relationDelta > 0 ? 10 : -10
      });
    }

    this.gameLog.push({
      month: this.currentMonth,
      type: "negotiation",
      partner: this.activeNegotiation.scenario.partnerName,
      outcome: agreement.grade,
      title: agreement.title
    });

    this.activeNegotiation = null;
    this.screen = "office";
    this.autoSave();
    return agreement;
  }

  // Simulate and complete the monthly turn
  advanceTurn() {
    // 1. Run economic simulation for current month
    const monthlyResult = this.economy.simulateMonth(this.currentMonth);
    this.latestMonthlyResult = monthlyResult;

    // 2. Politics evaluation against 2026 baseline expectations
    const baselineMonth = BASELINE_2026.months[this.currentMonth - 1];
    const polEval = this.politics.evaluateMonth(monthlyResult, baselineMonth);

    // 3. Generate Virtual JoongAng Ilbo front page
    const lastPol = this.usedPoliciesThisMonth.length > 0 ? getPolicy(this.usedPoliciesThisMonth[this.usedPoliciesThisMonth.length - 1]) : null;
    const extraContext = {
      corporateAction: this.corporateAgencyManager.actionHistory.length > 0 ? this.corporateAgencyManager.actionHistory[this.corporateAgencyManager.actionHistory.length - 1] : null,
      proactiveThreat: this.monthlyThreats.length > 0 ? this.monthlyThreats[this.monthlyThreats.length - 1] : null,
      twoLevelNote: this.activeNegotiation?.history?.slice(-1)[0]?.domesticNote,
      doctrine: this.doctrine
    };
    const newspaper = this.newspaperEngine.generateFrontPage(
      monthlyResult,
      this.politics.stats,
      lastPol,
      this.lastNegotiationAgreement,
      extraContext
    );
    this.latestNewspaper = newspaper;

    // 4. Check for dismissal
    if (polEval.isDismissed) {
      this.finalVerdict = this.verdictEngine.evaluateFinal(this.economy.monthlyResults, this.politics, this.origin, this.gameLog, this.economy);
      this.screen = "verdict";
      this.autoSave();
      return { status: "dismissed" };
    }

    // 5. Check if 12 months finished
    if (this.currentMonth === 12) {
      this.finalVerdict = this.verdictEngine.evaluateFinal(this.economy.monthlyResults, this.politics, this.origin, this.gameLog, this.economy);
      this.screen = "result_briefing";
      this.autoSave();
      return { status: "year_end" };
    }

    // Proceed to briefing
    this.screen = "result_briefing";
    this.autoSave();
    return { status: "next_month" };
  }

  // Go to next month after reviewing results & newspaper
  proceedToNextMonth() {
    if (this.currentMonth < 12 && !this.politics.isDismissed) {
      this.currentMonth += 1;
      this.prepareMonth();
      this.screen = "office";
      this.autoSave();
    } else {
      this.screen = "verdict";
      this.autoSave();
    }
  }

  autoSave() {
    StorageManager.save(this.serialize());
  }

  serialize() {
    return {
      screen: this.screen,
      scenario: this.scenario,
      origin: this.origin,
      seed: this.seed,
      prngState: this.prng ? this.prng.getState() : null,
      currentMonth: this.currentMonth,
      actionPoints: this.actionPoints,
      maxActionPoints: this.maxActionPoints || 5,
      usedPoliciesThisMonth: this.usedPoliciesThisMonth,
      firstTurnBriefingDismissed: this.firstTurnBriefingDismissed || false,
      activeEvent: this.activeEvent,
      activeNegotiation: this.activeNegotiation ? {
        partnerId: this.activeNegotiation.scenario.partnerId,
        tension: this.activeNegotiation.tension,
        totalScore: this.activeNegotiation.totalScore,
        history: this.activeNegotiation.history,
        usedCards: Array.from(this.activeNegotiation.usedCards),
        status: this.activeNegotiation.status,
        domesticState: this.activeNegotiation.domesticState,
        currentCounterDemand: this.activeNegotiation.currentCounterDemand,
        consecutiveAggressiveCount: this.activeNegotiation.consecutiveAggressiveCount || 0
      } : null,
      lastNegotiationAgreement: this.lastNegotiationAgreement,
      macroHistory: this.economy ? this.economy.macroHistory : [],
      monthlyResults: this.economy ? this.economy.monthlyResults : [],
      industryStates: this.economy ? this.economy.industryStates : {},
      partnerStates: this.economy ? this.economy.partnerStates : {},
      delayedPipeline: this.economy ? this.economy.delayedPipeline : [],
      politicsStats: this.politics ? this.politics.stats : null,
      politicsHistory: this.politics ? this.politics.history : [],
      consecutiveDeficits: this.politics ? this.politics.consecutiveDeficits : 0,
      isDismissed: this.politics ? this.politics.isDismissed : false,
      dismissalWarning: this.politics ? this.politics.dismissalWarning : false,
      triggeredEvents: this.eventEngine ? Array.from(this.eventEngine.triggeredEvents) : [],
      latestMonthlyResult: this.latestMonthlyResult,
      latestNewspaper: this.latestNewspaper,
      finalVerdict: this.finalVerdict,
      doctrine: this.doctrine ? this.doctrine.id : null,
      gameLog: this.gameLog
    };
  }

  deserialize(saved) {
    if (!saved) return false;
    this.screen = saved.screen;
    this.scenario = saved.scenario;
    this.origin = saved.origin;
    this.seed = saved.seed;
    this.doctrine = saved.doctrine ? getDoctrine(saved.doctrine) : DOCTRINES[0];
    this.prng = new PRNG(this.seed);
    if (saved.prngState) this.prng.setState(saved.prngState);

    this.currentMonth = saved.currentMonth;
    this.maxActionPoints = saved.maxActionPoints || 5;
    this.actionPoints = saved.actionPoints !== undefined ? saved.actionPoints : this.maxActionPoints;
    this.usedPoliciesThisMonth = saved.usedPoliciesThisMonth || [];
    this.firstTurnBriefingDismissed = saved.firstTurnBriefingDismissed || false;
    this.lastActionResult = null;
    this.activeEvent = saved.activeEvent;
    this.lastNegotiationAgreement = saved.lastNegotiationAgreement;

    const originCfg = getOrigin(this.origin);
    this.politics = new PoliticsManager(originCfg);
    if (saved.politicsStats) this.politics.stats = saved.politicsStats;
    if (saved.politicsHistory) this.politics.history = saved.politicsHistory;
    this.politics.consecutiveDeficits = saved.consecutiveDeficits || 0;
    this.politics.isDismissed = saved.isDismissed || false;
    this.politics.dismissalWarning = saved.dismissalWarning || false;

    this.economy = new EconomyEngine(this.scenario, this.origin, this.prng);
    if (saved.macroHistory) this.economy.macroHistory = saved.macroHistory;
    if (saved.monthlyResults) this.economy.monthlyResults = saved.monthlyResults;
    if (saved.industryStates) this.economy.industryStates = saved.industryStates;
    if (saved.partnerStates) this.economy.partnerStates = saved.partnerStates;
    if (saved.delayedPipeline) this.economy.delayedPipeline = saved.delayedPipeline;

    this.eventEngine = new EventEngine(this.prng);
    if (saved.triggeredEvents) this.eventEngine.triggeredEvents = new Set(saved.triggeredEvents);

    if (saved.activeNegotiation) {
      this.activeNegotiation = new NegotiationEngine(saved.activeNegotiation.partnerId, this.origin, this.prng);
      this.activeNegotiation.tension = saved.activeNegotiation.tension;
      this.activeNegotiation.totalScore = saved.activeNegotiation.totalScore;
      this.activeNegotiation.history = saved.activeNegotiation.history;
      this.activeNegotiation.usedCards = new Set(saved.activeNegotiation.usedCards);
      this.activeNegotiation.status = saved.activeNegotiation.status;
      if (saved.activeNegotiation.domesticState) {
        this.activeNegotiation.domesticState = saved.activeNegotiation.domesticState;
      }
      if (saved.activeNegotiation.currentCounterDemand) {
        this.activeNegotiation.currentCounterDemand = saved.activeNegotiation.currentCounterDemand;
      }
      if (saved.activeNegotiation.consecutiveAggressiveCount) {
        this.activeNegotiation.consecutiveAggressiveCount = saved.activeNegotiation.consecutiveAggressiveCount;
      }
    }

    this.latestMonthlyResult = saved.latestMonthlyResult;
    this.latestNewspaper = saved.latestNewspaper;
    this.finalVerdict = saved.finalVerdict;
    this.gameLog = saved.gameLog || [];
    return true;
  }
}
