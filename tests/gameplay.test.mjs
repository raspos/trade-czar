// tests/gameplay.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';

import { GameManager } from '../dist/game.mjs';
import { SCENARIOS } from '../dist/scenarios.mjs';

test('Test A: 기본 시나리오로 12개월 완주 및 엔딩 도달', () => {
  const gm = new GameManager();
  gm.newGame('baseline', 'bureaucrat', 123456);

  for (let m = 1; m <= 12; m++) {
    assert.equal(gm.currentMonth, m);

    // Spend 3 action points
    gm.executePolicy('corp_meeting_emergency');
    gm.executePolicy('gov_trade_financing_50t');
    gm.executePolicy('gov_logistics_subsidy');

    // Advance monthly turn
    gm.advanceTurn();
    assert.ok(gm.latestMonthlyResult, `Month ${m} result generated`);
    assert.ok(gm.latestNewspaper, `Month ${m} JoongAng Ilbo front page generated`);

    if (m < 12) {
      gm.proceedToNextMonth();
    }
  }

  assert.equal(gm.economy.monthlyResults.length, 12);
  assert.ok(gm.finalVerdict, 'Final 2028 Jan evaluation generated');
  assert.ok(gm.finalVerdict.title, 'Ending has title');
});

test('Test B: 미국 관세전쟁 시나리오에서 협상 타결 vs 결렬 비교', () => {
  // Case 1: 타결 (Agreement)
  const gmAgree = new GameManager();
  gmAgree.newGame('tariff_war', 'bureaucrat', 55555);
  gmAgree.executePolicy('nego_us_bilateral'); // launches negotiation
  gmAgree.activeNegotiation.playCard('us_investment');
  gmAgree.activeNegotiation.playCard('us_shipbuilding_mro');
  gmAgree.activeNegotiation.playCard('us_lng');
  const resAgree = gmAgree.concludeNegotiation('agree');
  assert.equal(resAgree.type, 'agreed', 'Negotiation should reach agreement');
  gmAgree.advanceTurn();
  const autoExportAgree = gmAgree.latestMonthlyResult.industries.automobile.export;

  // Case 2: 결렬 (Breakdown)
  const gmBreak = new GameManager();
  gmBreak.newGame('tariff_war', 'bureaucrat', 55555);
  gmBreak.executePolicy('nego_us_bilateral');
  gmBreak.activeNegotiation.playCard('us_wto_warning');
  const resBreak = gmBreak.concludeNegotiation('breakdown');
  assert.equal(resBreak.type, 'broken', 'Negotiation is broken');
  gmBreak.advanceTurn();
  const autoExportBreak = gmBreak.latestMonthlyResult.industries.automobile.export;

  // Automobile exports must be higher under agreement than breakdown!
  assert.ok(autoExportAgree > autoExportBreak, `Auto export under agreement ($${autoExportAgree}B) must be higher than under breakdown ($${autoExportBreak}B)`);
});

test('Test C: 반도체 집중 투자 vs 산업 다변화 정책 비교', () => {
  // Path 1: Concentrated capex & financing
  const gm1 = new GameManager();
  gm1.newGame('chip_paradox', 'industry_expert', 77777);
  gm1.executePolicy('corp_capex_matching');
  gm1.executePolicy('gov_rnd_tax_credit');
  gm1.executePolicy('corp_meeting_emergency');
  gm1.advanceTurn();
  gm1.proceedToNextMonth();
  gm1.advanceTurn(); // month 2

  // Path 2: Broad consumer & logistics support
  const gm2 = new GameManager();
  gm2.newGame('chip_paradox', 'industry_expert', 77777);
  gm2.executePolicy('corp_supply_chain_alliance');
  gm2.executePolicy('gov_k_expo_global');
  gm2.executePolicy('gov_logistics_subsidy');
  gm2.advanceTurn();
  gm2.proceedToNextMonth();
  gm2.advanceTurn();

  // Consumer goods export should be higher in gm2
  const consumer1 = gm1.latestMonthlyResult.industries.consumer.export;
  const consumer2 = gm2.latestMonthlyResult.industries.consumer.export;
  assert.ok(consumer2 > consumer1, 'Targeted consumer support should lead to higher consumer exports');
});

test('Test D: 강경한 기업 압박 시 기업계 신뢰 하락 검증', () => {
  const gm = new GameManager();
  gm.newGame('baseline', 'bureaucrat', 10101);
  const initialBusinessTrust = gm.politics.stats.businessTrust;

  gm.executePolicy('corp_push_hard');
  assert.ok(gm.politics.stats.businessTrust < initialBusinessTrust, 'Corporate pressure must decrease business trust');
});

test('Test E: 경제위기 누적 및 조기 경질 판정 검증', () => {
  const gm = new GameManager();
  gm.newGame('oil_shock', 'politician', 20202);

  // Artificially simulate 3 consecutive severe deficits and plummeting trust
  gm.politics.stats.presidentTrust = 8;
  gm.politics.consecutiveDeficits = 3;
  gm.politics.isDismissed = true;

  const verdict = gm.verdictEngine.evaluateFinal(
    [{ cumulativeExport: 500, cumulativeImport: 550, cumulativeBalance: -50 }],
    gm.politics,
    'politician'
  );

  assert.equal(verdict.endingId, 'dismissed', 'Plummeting trust and consecutive deficits must trigger dismissal ending');
});

test('Test F: 동일 시드와 동일 선택 시 100% 결과 일치 (결정론적 재현성)', () => {
  function runPlaythrough(seed) {
    const gm = new GameManager();
    gm.newGame('baseline', 'bureaucrat', seed);
    const months = [];
    for (let m = 1; m <= 6; m++) {
      gm.executePolicy('corp_meeting_emergency');
      gm.executePolicy('gov_trade_financing_50t');
      gm.advanceTurn();
      months.push({
        export: gm.latestMonthlyResult.export,
        import: gm.latestMonthlyResult.import,
        balance: gm.latestMonthlyResult.balance
      });
      if (m < 6) gm.proceedToNextMonth();
    }
    return months;
  }

  const run1 = runPlaythrough(444444);
  const run2 = runPlaythrough(444444);
  assert.deepEqual(run1, run2, 'Identical seeds and choices must yield identical monthly economic results');
});

test('Test G: 직렬화/역직렬화 (Save/Load) 정합성 검증', () => {
  const gm = new GameManager();
  gm.newGame('tariff_war', 'industry_expert', 88888);
  gm.executePolicy('corp_meeting_emergency');
  gm.advanceTurn();

  const serialized = gm.serialize();

  const gmRestored = new GameManager();
  const success = gmRestored.deserialize(serialized);
  assert.ok(success, 'Deserialization must succeed');
  assert.equal(gmRestored.currentMonth, gm.currentMonth);
  assert.equal(gmRestored.economy.monthlyResults[0].export, gm.economy.monthlyResults[0].export);
  assert.equal(gmRestored.politics.stats.businessTrust, gm.politics.stats.businessTrust);
});
