// tests/verify_phase5_enhancements.mjs - Phase 5 Systemic Verification Suite
import assert from 'node:assert/strict';
import { PRNG } from '../dist/prng.mjs';
import { GameManager } from '../dist/game.mjs';
import { NegotiationEngine } from '../dist/negotiations.mjs';
import { VerdictEngine } from '../dist/verdict.mjs';
import { BASELINE_2026 } from '../dist/data.mjs';

console.log('================================================================================');
console.log('   TRADE CZAR · PHASE 5 UX, DATA & DYNAMIC NEGOTIATION VERIFICATION             ');
console.log('================================================================================\n');

// 1. Data Verification: 9월 $121.254B, 10월 $114.576B, 1~10월 $930.202B, Nov 19 1조 달러
console.log('>>> [TEST 1] Official Data & Nov 16 Revisions Verification...');
const m9 = BASELINE_2026.months[8];
const m10 = BASELINE_2026.months[9];
assert.equal(m9.export, 121.254, 'Month 9 official export must be exactly $121.254B (11/16 revision)');
assert.equal(m10.export, 114.576, 'Month 10 official export must be exactly $114.576B');

let sum1to10 = 0;
for (let i = 0; i < 10; i++) sum1to10 += BASELINE_2026.months[i].export;
assert.equal(Math.round(sum1to10 * 1000) / 1000, 930.202, '1~10 cumulative export must be exactly $930.202B');
assert.ok(BASELINE_2026.metadata.nov19Milestone, 'Nov 19 $1,000B milestone metadata exists');
console.log('  ✔ 2026 Official Statistics, Revisions & Nov 19 $1,000B milestone verified!\n');

// 2. Dynamic Negotiation: Counterplay against repeated aggressive cards & Counter-Demand Bonus
console.log('>>> [TEST 2] Dynamic Counterplay & Counter-Demand Response Verification...');
const prng = new PRNG(12345);
const negoUS = new NegotiationEngine('US', 'bureaucrat', prng);

// Start with corporate investment card to build score and lower tension
const step1 = negoUS.playCard('us_investment');
assert.ok(step1.currentScore > 0, 'Investment card increases score');
assert.ok(step1.currentTension < negoUS.scenario.initialTension, 'Investment card reduces tension');

// Partner raises counter-demand (energy_push)
negoUS.currentCounterDemand = negoUS.scenario.counterDemands.energy_push;

// Playing LNG concession fulfills energy_push counter-demand!
const step2 = negoUS.playCard('us_lng');
assert.ok(step2.cardScore > 30, 'Answering counter-demand awards large bonus score');
assert.ok(step2.cardTension < -20, 'Answering counter-demand drops tension significantly');
assert.equal(negoUS.currentCounterDemand, null, 'Counter-demand was successfully fulfilled');
assert.ok(step2.partnerReaction.includes('환영') || step2.partnerReaction.includes('경의'), 'Partner warmly welcomes fulfilling demand');
console.log('  ✔ Dynamic counterplay and counter-demand reward mechanics verified!\n');

// 3. Trade-off Summary generation in conclude()
console.log('>>> [TEST 3] Trade-off Summary (Gains vs Concessions) Verification...');
const agreement = negoUS.conclude('agree');
assert.ok(agreement.tradeOffSummary, 'tradeOffSummary must be generated');
assert.ok(Array.isArray(agreement.tradeOffSummary.gains), 'gains array exists');
assert.ok(Array.isArray(agreement.tradeOffSummary.concessions), 'concessions array exists');
assert.ok(typeof agreement.tradeOffSummary.diplomaticSpillover === 'string', 'diplomaticSpillover is a string');
assert.ok(agreement.tradeOffSummary.gains.length > 0, 'At least 1 gain recorded');
assert.ok(agreement.tradeOffSummary.concessions.length > 0, 'At least 1 concession recorded');
console.log('  • 획득 성과:', agreement.tradeOffSummary.gains[0]);
console.log('  • 양보 사항:', agreement.tradeOffSummary.concessions[0]);
console.log('  • 외교 파급:', agreement.tradeOffSummary.diplomaticSpillover);
console.log('  ✔ Trade-off summary structure fully verified!\n');

// 4. Multi-month suspended negotiation persistence (Save/Load)
console.log('>>> [TEST 4] Suspended Negotiation Save/Load Persistence...');
const gm = new GameManager();
gm.newGame('baseline', 'bureaucrat', 99999);
gm.executePolicy('nego_us_bilateral');
assert.ok(gm.activeNegotiation, 'Negotiation active');
gm.activeNegotiation.domesticState.agriConsensus = true;
gm.activeNegotiation.currentCounterDemand = "미국산 사과 즉시 개방";
gm.activeNegotiation.totalScore = 42;
gm.activeNegotiation.tension = 58;
gm.activeNegotiation.suspendSession();

assert.equal(gm.activeNegotiation.status, 'suspended');

// Serialize & deserialize
const savedState = gm.serialize();
const gm2 = new GameManager();
const restored = gm2.deserialize(savedState);
assert.ok(restored, 'Deserialization succeeded');
assert.ok(gm2.activeNegotiation, 'Suspended negotiation restored');
assert.equal(gm2.activeNegotiation.status, 'suspended', 'Status remains suspended');
assert.equal(gm2.activeNegotiation.totalScore, 42, 'Score preserved');
assert.equal(gm2.activeNegotiation.tension, 58, 'Tension preserved');
assert.equal(gm2.activeNegotiation.domesticState.agriConsensus, true, 'Domestic consensus preserved');
assert.equal(gm2.activeNegotiation.currentCounterDemand, "미국산 사과 즉시 개방", 'Counter-demand preserved');

const resumeRes = gm2.activeNegotiation.resumeSession();
assert.ok(resumeRes.success, 'Resume session succeeds');
assert.equal(gm2.activeNegotiation.status, 'in_progress', 'Session is in progress again');
console.log('  ✔ Multi-month suspended negotiation restored 100% cleanly!\n');

// 5. Verdict Engine: 3 Defining Decisions
console.log('>>> [TEST 5] Verdict Engine 3 Defining Decisions Verification...');
const vEngine = new VerdictEngine();
const dummyResults = Array.from({ length: 12 }, (_, i) => ({
  month: i + 1,
  export: 95.0,
  goodsExport: 93.0,
  servicesExport: 2.0,
  import: 65.0,
  balance: 30.0,
  cumulativeExport: (i + 1) * 95.0,
  cumulativeImport: (i + 1) * 65.0,
  cumulativeBalance: (i + 1) * 30.0,
  yoyExportGrowth: 2.5,
  yoyImportGrowth: 1.0,
  macro: { fxRate: 1400, brentOil: 75 },
  industries: {
    semiconductor: { id: 'semiconductor', name: '반도체', export: 20, balance: 10, yoyGrowth: 15.0, utilizationRate: 98, tradeBarrierIndex: 5 },
    petrochemical: { id: 'petrochemical', name: '석유화학', export: 10, balance: -2, yoyGrowth: -5.0, utilizationRate: 70, tradeBarrierIndex: 12 }
  }
}));

const dummyPolitics = {
  stats: {
    presidentTrust: 80,
    businessTrust: 75,
    diplomaticTrust: 85,
    publicApproval: 68,
    policyMomentum: 60,
    competitiveness: 70
  },
  isDismissed: false
};

const dummyLog = [
  { month: 2, type: 'negotiation', outcome: '대타결 (Historic Agreement)', partner: '미국 USTR' },
  { month: 3, type: 'policy', policyId: 'corp_capex_matching', title: '국내 첨단 전략산업 설비 증설 매칭' },
  { month: 5, type: 'corporate_agency_response', chosenOption: '1조 원 농축산 피해보완 직불금 및 상생기금 확정' }
];

const verdict = vEngine.evaluateFinal(dummyResults, dummyPolitics, 'bureaucrat', dummyLog);
assert.ok(verdict.keyDecisions, 'Verdict must include keyDecisions');
assert.equal(verdict.keyDecisions.length, 3, 'Exactly 3 Defining Decisions generated');
console.log('  • 결단 1:', verdict.keyDecisions[0].title, '-', verdict.keyDecisions[0].summary);
console.log('  • 결단 2:', verdict.keyDecisions[1].title, '-', verdict.keyDecisions[1].summary);
console.log('  • 결단 3:', verdict.keyDecisions[2].title, '-', verdict.keyDecisions[2].summary);
assert.ok(verdict.structuralLegacy, 'Structural legacy must be generated');
console.log('  ✔ Verdict Engine 3 Defining Decisions verified!\n');

console.log('================================================================================');
console.log('   🎉 ALL PHASE 5 ENHANCEMENT TESTS PASSED 100%!                                ');
console.log('================================================================================');
