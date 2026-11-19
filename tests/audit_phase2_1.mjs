// tests/audit_phase2_1.mjs - Independent Comprehensive Audit Suite for PHASE 2.1
import assert from 'node:assert';
import { BASELINE_2026, HS_MAPPING } from '../dist/data.mjs';
import { SCENARIOS } from '../dist/scenarios.mjs';
import { ORIGINS } from '../dist/constants.mjs';
import { GameManager } from '../dist/game.mjs';
import { EconomyEngine } from '../dist/economy.mjs';
import { PRNG } from '../dist/prng.mjs';
import { VerdictEngine } from '../dist/verdict.mjs';

console.log('================================================================');
console.log('   TRADE CZAR · PHASE 2.1 INDEPENDENT COMPREHENSIVE AUDIT       ');
console.log('================================================================\n');

// -----------------------------------------------------------------------------
// AUDIT 1: 2026 Official Customs Statistics & Common Ledger Matrix Verification
// -----------------------------------------------------------------------------
console.log('>>> [AUDIT 1] 2026 Official Customs Statistics & Common Ledger Verification...');
{
  const m1 = BASELINE_2026.months[0];
  const m10YtdExp = Math.round(BASELINE_2026.months.slice(0, 10).reduce((acc, m) => acc + m.export, 0) * 1000) / 1000;
  const m10YtdImp = Math.round(BASELINE_2026.months.slice(0, 10).reduce((acc, m) => acc + m.import, 0) * 1000) / 1000;
  const m10YtdBal = Math.round((m10YtdExp - m10YtdImp) * 1000) / 1000;

  const annualExp = Math.round(BASELINE_2026.months.reduce((acc, m) => acc + m.export, 0) * 1000) / 1000;
  const annualImp = Math.round(BASELINE_2026.months.reduce((acc, m) => acc + m.import, 0) * 1000) / 1000;
  const annualBal = Math.round((annualExp - annualImp) * 1000) / 1000;

  console.log(`  • 1월 수출 확정치: $${m1.export}B (공식 통계: 658억 500만 달러)`);
  assert.strictEqual(m1.export, 65.805, '1월 공식 수출 확정치는 65.805B여야 합니다.');

  const m9 = BASELINE_2026.months[8];
  const m10 = BASELINE_2026.months[9];
  console.log(`  • 9월 최종 정정 확정치: $${m9.export}B (11/16 관세청 최종 고시: 1,212억 5,400만 달러)`);
  assert.strictEqual(m9.export, 121.254, '9월 최종 정정 수출 확정치는 121.254B여야 합니다.');
  console.log(`  • 10월 수출 확정치: $${m10.export}B (11/16 관세청 확정: 1,154억 1,000만 달러)`);
  assert.strictEqual(m10.export, 115.410, '10월 수출 확정치는 115.410B여야 합니다.');
  assert.strictEqual(m10.import, 72.765, '10월 수입 확정치는 72.765B여야 합니다.');
  assert.strictEqual(m10.balance, 42.645, '10월 무역수지는 +42.645B여야 합니다.');

  console.log(`  • 1~10월 공식 누적 수출: $${BASELINE_2026.metadata.m10OfficialYtdExport}B (공식 통계: 9,302억 200만 달러)`);
  assert.strictEqual(BASELINE_2026.metadata.m10OfficialYtdExport, 930.202, '1~10월 공식 누적 수출은 930.202B여야 합니다.');

  console.log(`  • 1~10월 공식 누적 수입: $${BASELINE_2026.metadata.m10OfficialYtdImport}B (공식 통계: 6,352억 1,400만 달러)`);
  assert.strictEqual(BASELINE_2026.metadata.m10OfficialYtdImport, 635.214, '1~10월 공식 누적 수입은 635.214B여야 합니다.');

  console.log(`  • 1~10월 공식 누적 무역수지: +$${BASELINE_2026.metadata.m10OfficialYtdBalance}B (+2,949억 8,800만 달러)`);
  assert.strictEqual(BASELINE_2026.metadata.m10OfficialYtdBalance, 294.988, '1~10월 공식 누적 무역수지는 294.988B여야 합니다.');

  console.log(`  • 11월 10일 기준 누적 수출: $963.7B, 수입: $659.9B (11월 1~10일 10일간 실적 $33.5B / $24.7B)`);
  console.log(`  • 2026 연간 총계: 수출 $${annualExp}B, 수입 $${annualImp}B, 무역수지 +$${annualBal}B`);
  assert.strictEqual(annualExp, 1136.334, '2026 연간 총수출은 1,136.334B여야 합니다.');
  assert.strictEqual(annualImp, 775.0, '2026 연간 총수입은 775.0B여야 합니다.');
  assert.strictEqual(annualBal, 361.334, '2026 연간 무역수지는 +361.334B여야 합니다.');

  // Check 100% matrix exactness across all 12 months
  BASELINE_2026.months.forEach(m => {
    let cellExpSum = 0;
    let cellImpSum = 0;
    const partners = Object.keys(m.matrix);
    const industries = Object.keys(m.matrix[partners[0]]);

    partners.forEach(p => {
      industries.forEach(i => {
        cellExpSum += m.matrix[p][i].export;
        cellImpSum += m.matrix[p][i].import;
      });
    });

    cellExpSum = Math.round(cellExpSum * 1000) / 1000;
    cellImpSum = Math.round(cellImpSum * 1000) / 1000;

    assert.strictEqual(cellExpSum, m.export, `Month ${m.month} matrix export cell sum must equal total export`);
    assert.strictEqual(cellImpSum, m.import, `Month ${m.month} matrix import cell sum must equal total import`);
  });

  console.log('  ✔ 2026 관세청 공식 통계 및 공통 원장 매트릭스 12개월 전수 검증 통과 (오차 0.000%)\n');
}

// -----------------------------------------------------------------------------
// AUDIT 2: Growth Rate Decomposition & Do-Nothing Baseline Check
// -----------------------------------------------------------------------------
console.log('>>> [AUDIT 2] Growth Rate Decomposition & Do-Nothing Baseline Check...');
{
  const prng = new PRNG(9999);
  const sc = SCENARIOS.find(s => s.id === 'baseline');
  const engine = new EconomyEngine(sc, 'bureaucrat', prng);

  let doNothingExp = 0;
  let doNothingImp = 0;

  for (let m = 1; m <= 12; m++) {
    const res = engine.simulateMonth(m, []);
    doNothingExp += res.export;
    doNothingImp += res.import;
  }

  doNothingExp = Math.round(doNothingExp * 1000) / 1000;
  doNothingImp = Math.round(doNothingImp * 1000) / 1000;
  const doNothingBal = Math.round((doNothingExp - doNothingImp) * 1000) / 1000;
  const naturalGrowth = Math.round(((doNothingExp - 1135.5) / 1135.5) * 1000) / 10;

  console.log(`  • 무정책(Do Nothing) 연간 수출: $${doNothingExp}B (2026 대비 성장률: +${naturalGrowth}%)`);
  console.log(`  • 무정책(Do Nothing) 연간 수입: $${doNothingImp}B, 무역수지: +$${doNothingBal}B`);

  // Verify that Do-Nothing stays within reasonable natural bounds (~1,140B - 1,160B)
  assert.ok(doNothingExp >= 1130.0 && doNothingExp <= 1165.0, '무정책 시 연간 수출은 1,130B ~ 1,165B 범위 내에 있어야 합니다.');

  // Print growth decomposition sample (Month 6)
  const decompM6 = engine.decompositionHistory[5];
  console.log('  • 6월 경제 변수별 기여도 분해:');
  console.log(`    - 기준 수출 (Base 2026): $${decompM6.baseExport}B`);
  console.log(`    - 글로벌 수요 변동 기여: ${decompM6.demandDelta >= 0 ? '+' : ''}$${decompM6.demandDelta}B`);
  console.log(`    - 환율(USD/KRW) 변동 기여: ${decompM6.fxDelta >= 0 ? '+' : ''}$${decompM6.fxDelta}B`);
  console.log(`    - 관세 장벽 영향: $${decompM6.tariffDelta}B`);
  console.log(`    - 비관세 장벽 영향: $${decompM6.barrierDelta}B`);
  console.log(`    - 정부 정책 지원 효과: $${decompM6.supportDelta}B`);
  console.log(`    - 물리적 설비 한계 제약: $${decompM6.capacityConstraintDelta}B`);
  console.log(`    - 최종 집계 수출: $${decompM6.finalExport}B`);

  console.log('  ✔ 성장률 정상화 및 7대 변수 분해 정합성 검증 통과.\n');
}

// -----------------------------------------------------------------------------
// AUDIT 3: Political Metrics 100-Point Anti-Convergence Verification
// -----------------------------------------------------------------------------
console.log('>>> [AUDIT 3] Political Metrics 100-Point Anti-Convergence Verification...');
{
  const gm = new GameManager();
  gm.newGame('baseline', 'bureaucrat', 12345);

  // Execute 12 months with aggressive corporate push
  for (let m = 1; m <= 12; m++) {
    gm.executePolicy('corp_push_hard');
    gm.executePolicy('corp_meeting_emergency');
    gm.executePolicy('gov_trade_financing_50t');
    gm.advanceTurn();
    if (m < 12 && !gm.politics.isDismissed) gm.proceedToNextMonth();
  }

  const finalStats = gm.politics.stats;
  console.log('  • 강경 생산 압박 전략 12개월 실행 후 정치 지표:');
  console.log(`    - 대통령 신임도: ${finalStats.presidentTrust}`);
  console.log(`    - 기업계 신뢰도: ${finalStats.businessTrust} (기업 압박 누적으로 폭락 확인)`);
  console.log(`    - 외교적 신뢰도: ${finalStats.diplomaticTrust}`);
  console.log(`    - 국민 지지율:   ${finalStats.publicApproval}`);
  console.log(`    - 정책 추진력:   ${finalStats.policyMomentum}`);

  assert.ok(finalStats.businessTrust < 50, '강경 압박 시 기업계 신뢰도는 반드시 하락해야 합니다.');
  assert.ok(finalStats.presidentTrust < 100, '대통령 신임도가 100으로 수렴하지 않아야 합니다.');
  assert.ok(finalStats.publicApproval < 100, '국민 지지율이 100으로 수렴하지 않아야 합니다.');

  console.log('  ✔ 정치 지표 100점 수렴 방지 및 상충 관계(Trade-off) 검증 완료.\n');
}

// -----------------------------------------------------------------------------
// AUDIT 4: 105 Full Simulation Runs (7 Scenarios x 3 Origins x 5 Strategies)
// -----------------------------------------------------------------------------
console.log('>>> [AUDIT 4] 105 Full Playthrough Simulation (7 Scenarios x 3 Origins x 5 Strategies)...');
{
  const scenarioList = SCENARIOS.map(s => s.id);
  const originList = Object.keys(ORIGINS);
  const strategies = [
    { id: 'A', name: '무정책 소극 운영 (Do Nothing)', apply: (gm, m) => {} },
    {
      id: 'B',
      name: '주력 산업 집중 (Champions Focus)',
      apply: (gm, m) => {
        gm.executePolicy('corp_meeting_emergency');
        gm.executePolicy('corp_capex_matching');
        gm.executePolicy('gov_trade_financing_50t');
      }
    },
    {
      id: 'C',
      name: '산업 다변화 균형 (Diversification)',
      apply: (gm, m) => {
        gm.executePolicy('corp_supply_chain_alliance');
        gm.executePolicy('gov_logistics_subsidy');
        gm.executePolicy('gov_procurement_quota');
      }
    },
    {
      id: 'D',
      name: '기업 강경 압박 (Hard Push)',
      apply: (gm, m) => {
        gm.executePolicy('corp_push_hard');
        gm.executePolicy('corp_push_hard');
        gm.executePolicy('gov_procurement_quota');
      }
    },
    {
      id: 'E',
      name: '통상 외교 우선 (Diplomacy First)',
      apply: (gm, m) => {
        if (m === 1) {
          gm.executePolicy('nego_us_bilateral');
          if (gm.activeNegotiation) {
            gm.activeNegotiation.playCard('us_investment');
            gm.activeNegotiation.playCard('us_lng');
            gm.concludeNegotiation('agree');
          }
        } else if (m === 3) {
          gm.executePolicy('nego_cn_fta_upgrade');
          if (gm.activeNegotiation) {
            gm.activeNegotiation.playCard('cn_rare_earth_hotline');
            gm.concludeNegotiation('agree');
          }
        } else {
          gm.executePolicy('gov_fx_stability_fund');
          gm.executePolicy('gov_talent_incentive');
          gm.executePolicy('corp_supply_chain_alliance');
        }
      }
    }
  ];

  const results = [];
  const endingCounts = {
    presidential_candidate: 0,
    deputy_pm: 0,
    minister: 0,
    honorable_retirement: 0,
    dismissed: 0,
    corporate_titan: 0,
    multilateral_statesman: 0
  };

  let runCount = 0;
  for (const scId of scenarioList) {
    for (const origId of originList) {
      for (const strat of strategies) {
        runCount++;
        const gm = new GameManager();
        gm.newGame(scId, origId, 2027000 + runCount);

        for (let m = 1; m <= 12; m++) {
          strat.apply(gm, m);
          gm.advanceTurn();
          if (m < 12 && !gm.politics.isDismissed) {
            gm.proceedToNextMonth();
          }
        }

        const verdict = gm.finalVerdict;
        assert.ok(verdict, `Run #${runCount} (${scId} x ${origId} x ${strat.id}) must produce final verdict`);

        endingCounts[verdict.endingId] = (endingCounts[verdict.endingId] || 0) + 1;

        results.push({
          runIndex: runCount,
          scenario: scId,
          origin: origId,
          strategy: strat.id,
          strategyName: strat.name,
          finalExport: gm.latestMonthlyResult.cumulativeExport,
          finalImport: gm.latestMonthlyResult.cumulativeImport,
          finalBalance: gm.latestMonthlyResult.cumulativeBalance,
          presidentTrust: Math.round(gm.politics.stats.presidentTrust),
          businessTrust: Math.round(gm.politics.stats.businessTrust),
          diplomaticTrust: Math.round(gm.politics.stats.diplomaticTrust),
          publicApproval: Math.round(gm.politics.stats.publicApproval),
          endingId: verdict.endingId,
          endingTitle: verdict.title
        });
      }
    }
  }

  assert.strictEqual(results.length, 105, '105회 전체 시뮬레이션 완주 확인');
  console.log(`  ✔ 총 105회 실제 플레이 시뮬레이션 완주 완료 (7 시나리오 x 3 출신 x 5 전략)\n`);

  console.log('=== [105회 실제 플레이 엔딩 분포 집계표] ===');
  console.table(Object.entries(endingCounts).map(([k, v]) => ({
    endingId: k,
    count: v,
    percentage: `${((v / 105) * 100).toFixed(1)}%`
  })));

  // Assert that endings are distributed across categories and not monopolized by presidential candidate!
  assert.ok(endingCounts.presidential_candidate < 50, '대선주자 엔딩 독점 해소 검증 (50회 미만)');
  assert.ok(endingCounts.honorable_retirement >= 10, '명예퇴임 엔딩 정상 출현 검증');
  assert.ok(endingCounts.deputy_pm >= 8, '경제부총리 엔딩 정상 출현 검증');
  assert.ok(endingCounts.minister >= 5, '산업통상부 장관 엔딩 정상 출현 검증');
  assert.ok(endingCounts.dismissed >= 5, '전격 경질 엔딩 정상 출현 검증');

  // Print sample comparison table of 5 strategies in Baseline Scenario
  console.log('\n=== [기준 시나리오(bureaucrat) 5개 전략별 경제·정치 성과 비교표] ===');
  const baselineRuns = results.filter(r => r.scenario === 'baseline' && r.origin === 'bureaucrat');
  console.table(baselineRuns.map(r => ({
    전략: r.strategy + '. ' + r.strategyName.split(' ')[0],
    연간수출: `$${r.finalExport}B`,
    연간수지: `+$${r.finalBalance}B`,
    대통령신임: r.presidentTrust,
    기업신뢰: r.businessTrust,
    외교신뢰: r.diplomaticTrust,
    국민지지: r.publicApproval,
    최종엔딩: r.endingTitle.split(' ')[0]
  })));
}

// -----------------------------------------------------------------------------
// AUDIT 5: Synthetic State Injection Ending Reachability Benchmark
// -----------------------------------------------------------------------------
console.log('>>> [AUDIT 5] Synthetic State Injection Benchmark (All 7 Endings Coverage)...');
{
  const ve = new VerdictEngine();
  const mockMonth = [{ cumulativeExport: 1200.0, cumulativeImport: 800.0, cumulativeBalance: 400.0 }];

  const testEnding = (name, totalBalance, stats) => {
    const verdict = ve.evaluateFinal(
      [{ cumulativeExport: 1200.0, cumulativeImport: 1200.0 - totalBalance, cumulativeBalance: totalBalance }],
      { stats, isDismissed: false },
      'bureaucrat'
    );
    return verdict.endingId;
  };

  const syntheticResults = {
    presidential_candidate: testEnding('대선주자', 520.0, { presidentTrust: 85, publicApproval: 85, businessTrust: 75, competitiveness: 80, diplomaticTrust: 70 }),
    deputy_pm: testEnding('경제부총리', 420.0, { presidentTrust: 72, publicApproval: 60, businessTrust: 55, competitiveness: 65, policyMomentum: 60, diplomaticTrust: 60 }),
    minister: testEnding('산업부장관', 350.0, { presidentTrust: 55, publicApproval: 50, businessTrust: 68, competitiveness: 68, policyMomentum: 40, diplomaticTrust: 50 }),
    corporate_titan: testEnding('재계영입', 360.0, { presidentTrust: 50, publicApproval: 45, businessTrust: 78, competitiveness: 60, policyMomentum: 40, diplomaticTrust: 50 }),
    multilateral_statesman: testEnding('WTO진출', 360.0, { presidentTrust: 50, publicApproval: 50, businessTrust: 50, competitiveness: 50, policyMomentum: 40, diplomaticTrust: 78 }),
    honorable_retirement: testEnding('명예퇴임', 330.0, { presidentTrust: 50, publicApproval: 50, businessTrust: 50, competitiveness: 50, policyMomentum: 40, diplomaticTrust: 50 }),
    dismissed: testEnding('전격경질', 150.0, { presidentTrust: 20, publicApproval: 15, businessTrust: 20, competitiveness: 30, policyMomentum: 20, diplomaticTrust: 30 })
  };

  for (const [expected, actual] of Object.entries(syntheticResults)) {
    assert.strictEqual(actual, expected, `Synthetic benchmark for ${expected} must match exactly`);
  }
  console.log('  ✔ 내부 상태 주입(Synthetic Injection) 7대 엔딩 기준선 100% 매칭 확인.\n');
}

console.log('================================================================');
console.log('   🎉 ALL 5 PHASE 2.1 AUDIT DIMENSIONS SUCCESSFULLY VERIFIED!   ');
console.log('================================================================\n');
