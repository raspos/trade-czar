// dist/game.mjs - Master Game State and Turn Orchestration for TRADE CZAR 2.0
// Pure Event-Driven Non-Linear Strategic Simulation Engine

import { SCENARIOS } from './scenarios.mjs';
import { ORIGINS } from './constants.mjs';
import { PRNG } from './prng.mjs';
import { EconomyEngine } from './economy.mjs';
import { PoliticsManager } from './politics.mjs';
import { NewspaperEngine } from './newspaper.mjs';
import { StorageManager } from './storage.mjs';
import { selectEventForMonth } from './events-czar.mjs';

export class GameManager {
  constructor() {
    this.screen = "title"; // title, game, newspaper, verdict
    this.seed = 123456789;
    this.prng = null;

    this.currentMonth = 1;
    this.currentEvent = null;
    this.chosenChoice = null;
    this.flags = {};
    this.pastEventIds = [];
    this.decisionHistory = [];

    this.economy = null;
    this.politics = null;
    this.newspaperEngine = new NewspaperEngine();

    this.latestMonthlyResult = null;
    this.latestNewspaper = null;
    this.isDismissed = false;
    this.dismissalReason = null;
    this.finalVerdict = null;

    // Check if save exists
    this.hasSave = StorageManager.hasSave();
  }

  // Start new game immediately (< 15 seconds to first decision)
  newGame(customSeed = null) {
    this.seed = customSeed !== null && !isNaN(customSeed)
      ? Number(customSeed)
      : Math.floor(Math.random() * 900000000) + 100000000;
    this.prng = new PRNG(this.seed);

    const scenario = SCENARIOS.find(s => s.id === 'baseline') || SCENARIOS[0];
    const origin = ORIGINS.bureaucrat || Object.values(ORIGINS)[0];

    this.currentMonth = 1;
    this.flags = {};
    this.pastEventIds = [];
    this.decisionHistory = [];
    this.chosenChoice = null;
    this.isDismissed = false;
    this.dismissalReason = null;
    this.finalVerdict = null;

    this.economy = new EconomyEngine(scenario, origin, this.prng);
    this.politics = new PoliticsManager(origin);

    // Initial baseline monthly result for Month 1 display
    this.latestMonthlyResult = this.economy.simulateMonth(1, []);

    // Select Month 1 opening event
    this.currentEvent = selectEventForMonth(this);
    this.pastEventIds.push(this.currentEvent.id);

    this.screen = "game";
    StorageManager.save(this.serializeState());
  }

  // Choose an action choice for current event
  chooseOption(choiceId) {
    if (!this.currentEvent || this.chosenChoice) return;

    const choice = this.currentEvent.choices.find(c => c.id === choiceId);
    if (!choice) return;

    // Apply effects to economy, politics, and flags
    if (typeof choice.effect === 'function') {
      choice.effect(this);
    }

    this.chosenChoice = choice;
    this.decisionHistory.push({
      month: this.currentMonth,
      eventId: this.currentEvent.id,
      eventTitle: this.currentEvent.title,
      choiceId: choice.id,
      choiceText: choice.text,
      feedback: choice.feedback
    });

    // Run economy simulation for the month
    this.latestMonthlyResult = this.economy.simulateMonth(this.currentMonth, []);

    // Check for early dismissal (Crisis failure)
    const pTrust = this.politics.stats.presidentTrust;
    const pApproval = this.politics.stats.publicApproval;

    if (pTrust <= 10 || pApproval <= 15) {
      this.isDismissed = true;
      this.dismissalReason = pTrust <= 10
        ? "대통령실과의 회복할 수 없는 정무적 신뢰 상실로 인한 전격 경질"
        : "통상 위기 대처 실패와 민생 파탄에 따른 범국민적 여론 악화로 인한 해임";
    }

    StorageManager.save(this.serializeState());
  }

  // Advance to JoongAng Ilbo front-page newspaper
  advanceToNewspaper() {
    if (!this.chosenChoice) return;

    // Custom newspaper headline & article from event if present
    const extraContext = {
      corporateAction: null,
      doctrine: null,
      campaignDecision: null
    };

    let newspaper = this.newspaperEngine.generateFrontPage(
      this.latestMonthlyResult,
      this.politics.stats,
      null,
      null,
      extraContext
    );

    // Override with event-specific narrative headline & story if defined
    if (this.chosenChoice.newsHeadline) {
      newspaper.headline = this.chosenChoice.newsHeadline;
    }
    if (this.chosenChoice.newsBody) {
      newspaper.body = [this.chosenChoice.newsBody];
    }
    if (this.currentEvent.image) {
      newspaper.leadImage = this.currentEvent.image;
    }

    this.latestNewspaper = newspaper;
    this.screen = "newspaper";
    StorageManager.save(this.serializeState());
  }

  // Advance to next month or final verdict
  advanceMonth() {
    if (this.isDismissed) {
      this.evaluateVerdict();
      this.screen = "verdict";
      StorageManager.save(this.serializeState());
      return;
    }

    if (this.currentMonth >= 12) {
      this.evaluateVerdict();
      this.screen = "verdict";
      StorageManager.save(this.serializeState());
      return;
    }

    this.currentMonth += 1;
    this.chosenChoice = null;
    this.currentEvent = selectEventForMonth(this);
    if (this.currentEvent) {
      this.pastEventIds.push(this.currentEvent.id);
    }

    this.screen = "game";
    StorageManager.save(this.serializeState());
  }

  // Evaluate final verdict narrative
  evaluateVerdict() {
    const totalExp = this.latestMonthlyResult ? this.latestMonthlyResult.cumulativeExport : 650;
    const totalBal = this.latestMonthlyResult ? this.latestMonthlyResult.cumulativeBalance : 25;
    const approval = Math.round(this.politics.stats.publicApproval);
    const presTrust = Math.round(this.politics.stats.presidentTrust);

    let title = "";
    let grade = "";
    let epilogue = "";

    if (this.isDismissed) {
      title = "임기 중 전격 경질";
      grade = "낙제 (F)";
      epilogue = `${this.currentMonth}개월간의 험난한 통상 전쟁 끝에 교섭본부장직에서 불명예 퇴진했다. ${this.dismissalReason}. 대한민국 수출은 거대한 보호무역의 소용돌이 속에서 방향을 잃었고, 후임 본부장에게 무거운 부채를 남기게 되었다.`;
    } else if (totalExp >= 700 && totalBal > 30 && approval >= 55) {
      title = "글로벌 통상 강국의 수장";
      grade = "최우수 (S)";
      epilogue = "글로벌 복합 위기 속에서도 사상 최초로 연간 수출 7,000억 달러의 대기록을 돌파했다. 미국과의 안보 동맹을 지키는 동시에 중국과의 실용 교역로를 확보하며 대한민국 통상사에 길이 남을 업적을 남기고 경제부총리로 영전했다.";
    } else if (totalExp >= 650 && totalBal >= 0 && presTrust >= 50) {
      title = "실용주의 통상 관료의 명예로운 완주";
      grade = "우수 (A)";
      epilogue = "보호무역과 자원 무기화의 격랑 속에서 원칙과 실리를 균형 있게 조율하며 12개월의 임기를 성공적으로 마쳤다. 자동차와 반도체의 핵심 수출 전선을 지켜내며 대한민국 경제의 버팀목 역할을 충실히 완수했다.";
    } else if (totalBal < 0 || approval < 40) {
      title = "보호무역 격랑 속의 상처뿐인 방어";
      grade = "보통 (C)";
      epilogue = "미국의 관세 압박과 중국의 자원 보복, 국내 이해관계자들의 반발 사이에서 고군분투했으나 무역수지 악화를 완전히 막아내지는 못했다. 수출 강국의 위상은 지켰으나 산업계와 농가에 적지 않은 상처를 남겼다.";
    } else {
      title = "임무 완수와 험난했던 시험대";
      grade = "양호 (B)";
      epilogue = "1년의 임기 동안 수많은 위기를 넘나들며 대한민국 무역의 마지노선을 지켜냈다. 거센 외풍 속에서도 한국 제조업의 저력을 입증하며 후반기 통상 전략의 기틀을 마련했다.";
    }

    this.finalVerdict = {
      title,
      grade,
      epilogue,
      totalExport: totalExp.toFixed(1),
      totalBalance: totalBal.toFixed(1),
      publicApproval: approval,
      presidentTrust: presTrust,
      monthsServed: this.isDismissed ? this.currentMonth : 12
    };
  }

  // Serialization for Storage
  serializeState() {
    return {
      screen: this.screen,
      currentMonth: this.currentMonth,
      flags: this.flags,
      pastEventIds: this.pastEventIds,
      decisionHistory: this.decisionHistory,
      chosenChoice: this.chosenChoice,
      currentEvent: this.currentEvent,
      politicsStats: this.politics ? this.politics.stats : null,
      isDismissed: this.isDismissed,
      dismissalReason: this.dismissalReason,
      finalVerdict: this.finalVerdict,
      latestMonthlyResult: this.latestMonthlyResult
    };
  }

  // Load game from storage
  loadGame() {
    const raw = StorageManager.load();
    if (!raw || !raw.data) return false;

    const data = raw.data;
    const scenario = SCENARIOS.find(s => s.id === 'baseline') || SCENARIOS[0];
    const origin = ORIGINS.bureaucrat || Object.values(ORIGINS)[0];

    this.prng = new PRNG(this.seed);
    this.economy = new EconomyEngine(scenario, origin, this.prng);
    this.politics = new PoliticsManager(origin);

    if (data.politicsStats) {
      this.politics.stats = { ...data.politicsStats };
    }

    this.screen = data.screen || "game";
    this.currentMonth = data.currentMonth || 1;
    this.flags = data.flags || {};
    this.pastEventIds = data.pastEventIds || [];
    this.decisionHistory = data.decisionHistory || [];
    this.chosenChoice = data.chosenChoice || null;
    this.currentEvent = data.currentEvent || null;
    this.isDismissed = data.isDismissed || false;
    this.dismissalReason = data.dismissalReason || null;
    this.finalVerdict = data.finalVerdict || null;

    this.latestMonthlyResult = this.economy.simulateMonth(this.currentMonth, []);
    return true;
  }
}
