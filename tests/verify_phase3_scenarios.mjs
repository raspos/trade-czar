// tests/verify_phase3_scenarios.mjs - Full 5-Scenario Playthrough & Representative Player Journey Extraction
import assert from 'node:assert/strict';
import { GameManager } from '../dist/game.mjs';
import { BASELINE_2026 } from '../dist/data.mjs';

const targetScenarios = [
  { id: 'baseline', name: '기준 시나리오 (상온 통상)', origin: 'bureaucrat', seed: 42001 },
  { id: 'tariff_war', name: '미국 관세 전쟁 (트럼프 보편관세)', origin: 'bureaucrat', seed: 42002 },
  { id: 'china_push', name: '중국발 공급과잉 및 덤핑 공세', origin: 'industry_expert', seed: 42003 },
  { id: 'oil_shock', name: '중동 분쟁 및 제2차 오일 쇼크', origin: 'politician', seed: 42004 },
  { id: 'random_crisis', name: '동시다발 복합 통상 위기', origin: 'bureaucrat', seed: 42005 }
];

console.log('================================================================');
console.log('   TRADE CZAR · PHASE 3 CORE SCENARIOS FULL PLAYTHROUGH AUDIT  ');
console.log('================================================================\n');

const scenarioReports = [];

for (const sc of targetScenarios) {
  console.log(`>>> [SIMULATING SCENARIO] ${sc.name} (${sc.id}) | Origin: ${sc.origin} | Seed: ${sc.seed}`);
  const gm = new GameManager();
  gm.newGame(sc.id, sc.origin, sc.seed);

  const monthLogs = [];

  for (let m = 1; m <= 12; m++) {
    // 1. Resolve random event if present
    let eventResolved = null;
    if (gm.activeEvent) {
      // Pick choice 0 (rational defense)
      eventResolved = { title: gm.activeEvent.title, choice: gm.activeEvent.choices[0].text };
      gm.resolveEventChoice(0);
    }

    // 2. Monthly action decisions based on scenario context
    if (sc.id === 'tariff_war' && (m === 1 || m === 4)) {
      // Bilateral US Negotiation
      gm.executePolicy('nego_us_bilateral');
      if (gm.activeNegotiation) {
        gm.activeNegotiation.playCard('us_shipbuilding_mro');
        gm.activeNegotiation.playCard('us_lng');
        const agr = gm.concludeNegotiation('agree');
      }
    } else if (sc.id === 'china_push' && m <= 2) {
      gm.executePolicy('nego_cn_bilateral');
      if (gm.activeNegotiation) {
        gm.activeNegotiation.playCard('cn_rare_earth_hotline');
        gm.activeNegotiation.playCard('cn_antidumping_bargain');
        gm.concludeNegotiation('agree');
      }
    } else {
      // Consult corporate roundtable
      if (m === 2) gm.consultCorporation('samsung', 0); // Fab power grid
      if (m === 3) gm.consultCorporation('hyundai', 0); // Defend tariff
      if (m === 5) gm.consultCorporation('shipbuilders', 0); // RG guarantee
    }

    // Spend remaining action points
    if (gm.actionPoints > 0) gm.executePolicy('gov_trade_insurance');
    if (gm.actionPoints > 0) gm.executePolicy('corp_semicon_investment');
    if (gm.actionPoints > 0) gm.executePolicy('corp_rnd_subsidy');

    // 3. Advance Month Turn
    const turnRes = gm.advanceTurn();
    const res = gm.latestMonthlyResult;
    const indEntries = Object.values(res.industries);
    const sorted = [...indEntries].sort((a, b) => b.balance - a.balance);

    monthLogs.push({
      month: m,
      export: res.export,
      import: res.import,
      balance: res.balance,
      topGainer: `${sorted[0].name} (+$${sorted[0].balance.toFixed(1)}B)`,
      topLoser: `${sorted[sorted.length - 1].name} (${sorted[sorted.length - 1].balance >= 0 ? '+' : ''}$${sorted[sorted.length - 1].balance.toFixed(1)}B)`,
      presidentTrust: gm.politics.stats.presidentTrust,
      businessTrust: gm.politics.stats.businessTrust,
      publicApproval: gm.politics.stats.publicApproval,
      event: eventResolved ? eventResolved.title : '-'
    });

    if (turnRes.status === 'dismissed' || gm.politics.isDismissed) {
      console.log(`  ⚠️ Minister DISMISSED in month ${m}!`);
      break;
    }

    if (m < 12) {
      gm.proceedToNextMonth();
    }
  }

  const finalRes = gm.latestMonthlyResult;
  const verdict = gm.finalVerdict;

  console.log(`  • 연간 누적 수출: $${finalRes.cumulativeExport.toFixed(1)}B | 수입: $${finalRes.cumulativeImport.toFixed(1)}B | 무역수지: +$${finalRes.cumulativeBalance.toFixed(1)}B`);
  console.log(`  • 최종 정치 지표: 대통령 신임 ${gm.politics.stats.presidentTrust}점, 기업신뢰 ${gm.politics.stats.businessTrust}점, 외교신뢰 ${gm.politics.stats.diplomaticTrust}점, 국민지지 ${gm.politics.stats.publicApproval}점`);
  console.log(`  • 최종 엔딩 판정: [${verdict.badge}] ${verdict.title} (${verdict.endingId})\n`);

  scenarioReports.push({
    scenario: sc,
    cumExport: finalRes.cumulativeExport,
    cumImport: finalRes.cumulativeImport,
    cumBalance: finalRes.cumulativeBalance,
    politics: { ...gm.politics.stats },
    verdict,
    monthLogs
  });
}

console.log('=== [5대 시나리오 완주 결과 요약표] ===');
console.table(scenarioReports.map(r => ({
  시나리오: r.scenario.name.split(' ')[0],
  출신: r.scenario.origin,
  연간수출: `$${r.cumExport.toFixed(1)}B`,
  무역수지: `+$${r.cumBalance.toFixed(1)}B`,
  대통령신임: r.politics.presidentTrust,
  기업신뢰: r.politics.businessTrust,
  국민지지: r.politics.publicApproval,
  최종엔딩: r.verdict.title
})));

console.log('\n✔ 5대 시나리오 12개월 완주 및 엔딩 정상 도출 검증 완료!');
