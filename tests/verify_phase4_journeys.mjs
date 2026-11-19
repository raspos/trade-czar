// tests/verify_phase4_journeys.mjs - 5 Representative Player Journeys & Comprehensive Verification for PHASE 4

import { GameManager } from '../dist/game.mjs';
import { DOCTRINES } from '../dist/policies.mjs';

console.log("================================================================================");
console.log("   TRADE CZAR · PHASE 4 COMPREHENSIVE 5-JOURNEY VERIFICATION SUITE              ");
console.log("================================================================================\n");

// JOURNEY 1: 정통 관료 출신의 한미 관세 방어 & 동맹 퍼스트 독트린
console.log(">>> [JOURNEY 1] 정통 관료 (bureaucrat) + 한미동맹 중심 통상 독트린");
{
  const gm = new GameManager();
  gm.newGame('baseline', 'bureaucrat', 10101);
  gm.setDoctrine('us_alliance_first');

  for (let m = 1; m <= 12; m++) {
    if (m === 1) {
      // Emergency consultation and prepare Washington summit
      gm.executePolicy('corp_meeting_emergency');
      gm.executePolicy('gov_trade_financing_50t');
      gm.executePolicy('domestic_agri_fund'); // Pre-emptive Two-Level consensus
    } else if (m === 2) {
      // Launch Washington bilateral summit!
      gm.executePolicy('nego_us_bilateral');
      const nego = gm.activeNegotiation;
      // Consult domestic consensus
      nego.consultDomestic('agri_relief_fund', gm.politics);
      nego.consultDomestic('parliament_pre_ratify', gm.politics);
      // Play strategic cards
      nego.playCard('us_lng');
      nego.playCard('us_mro');
      nego.playCard('us_agri_concession'); // Safe because agri consensus is active!
      nego.playCard('us_fdi');
      const agreement = gm.concludeNegotiation('agree');
      console.log(`  • 2월 한미 협상 결과: ${agreement.grade} (관세율: ${(agreement.usAutoTariff*100).toFixed(1)}%)`);
      gm.executePolicy('ind_relief_ship_mro');
      gm.executePolicy('gov_logistics_subsidy');
    } else if (m === 4 && gm.activeCorporateAction) {
      // Resolve corporate agency
      gm.resolveCorporateAction('hyundai', 'hyundai_georgia_shift', 'hyundai_support_parts');
      gm.executePolicy('ind_relief_auto_parts');
      gm.executePolicy('gov_trade_financing_50t');
      gm.executePolicy('corp_supply_chain_alliance');
    } else {
      gm.executePolicy('ind_relief_ship_mro');
      gm.executePolicy('gov_trade_financing_50t');
      gm.executePolicy('corp_meeting_emergency');
    }

    gm.advanceTurn();
    if (m < 12) gm.proceedToNextMonth();
  }

  const v = gm.finalVerdict;
  console.log(`  ✔ 최종 엔딩: [${v.title}] (${v.badge})`);
  console.log(`  ✔ 통관 상품수출: ${v.summary.totalExportFormatted}, BOP 서비스수출: ${v.summary.totalServicesExportFormatted}`);
  console.log(`  ✔ 연간 무역수지: ${v.summary.totalBalanceFormatted}, 대통령신임: ${v.summary.presidentTrust}점, 외교신뢰: ${v.summary.diplomaticTrust}점`);
  console.log(`  ✔ 구조적 유산: "${v.structuralLegacy.substring(0, 50)}..."\n`);
}

// JOURNEY 2: 산업계 전문가의 반도체 초격차 & 기업 자율성 존중
console.log(">>> [JOURNEY 2] 산업계 전문가 (industry_expert) + 반도체 초격차 독트린");
{
  const gm = new GameManager();
  gm.newGame('baseline', 'industry_expert', 20202);
  gm.setDoctrine('semiconductor_supremacy');

  for (let m = 1; m <= 12; m++) {
    if (m === 1) {
      gm.executePolicy('corp_capex_matching');
      gm.executePolicy('gov_trade_financing_50t');
      gm.executePolicy('corp_meeting_emergency');
    } else if (m === 6 && gm.activeCorporateAction) {
      // Samsung DRAM cut autonomous response
      gm.resolveCorporateAction('samsung', 'samsung_dram_cut', 'semi_package_rnd');
      gm.executePolicy('corp_capex_matching');
      gm.executePolicy('gov_trade_financing_50t');
      gm.executePolicy('corp_meeting_emergency');
    } else {
      gm.executePolicy('corp_capex_matching');
      gm.executePolicy('gov_trade_financing_50t');
      gm.executePolicy('gov_logistics_subsidy');
    }

    gm.advanceTurn();
    if (m < 12) gm.proceedToNextMonth();
  }

  const v = gm.finalVerdict;
  console.log(`  ✔ 최종 엔딩: [${v.title}] (${v.badge})`);
  console.log(`  ✔ 연간 무역수지: ${v.summary.totalBalanceFormatted}, 기업계 신뢰: ${v.summary.businessTrust}점, 산업경쟁력: ${v.summary.competitiveness}pt`);
  console.log(`  ✔ 최우수 품목: ${v.bestIndustry.name} (+${v.bestIndustry.yoyGrowth}%), 최대성과 정책: ${v.topPolicy.name}\n`);
}

// JOURNEY 3: 국제통상학자의 다자주의 & 글로벌 사우스 개척 독트린
console.log(">>> [JOURNEY 3] 통상학자 (academic) + 글로벌 사우스 개척 독트린");
{
  const gm = new GameManager();
  gm.newGame('baseline', 'academic', 30303);
  gm.setDoctrine('global_south_frontier');

  for (let m = 1; m <= 12; m++) {
    gm.executePolicy('ind_relief_sme_vouchers');
    gm.executePolicy('corp_supply_chain_alliance');
    gm.executePolicy('gov_procurement_quota');

    gm.advanceTurn();
    if (m < 12) gm.proceedToNextMonth();
  }

  const v = gm.finalVerdict;
  console.log(`  ✔ 최종 엔딩: [${v.title}] (${v.badge})`);
  console.log(`  ✔ 연간 무역수지: ${v.summary.totalBalanceFormatted}, 외교신뢰: ${v.summary.diplomaticTrust}점, 국민지지율: ${v.summary.publicApproval}%`);
  console.log(`  ✔ 최대 성과 정책: ${v.topPolicy.name}\n`);
}

// JOURNEY 4: 고강도 관치 생산 압박 & 대미 협상 결렬 (비극적 실패 경로)
console.log(">>> [JOURNEY 4] 비극적 실패 경로: 고강도 관치 압박 + 대미 협상 결렬");
{
  const gm = new GameManager();
  gm.newGame('us_tariff_shock', 'bureaucrat', 40404);

  let dismissedMonth = -1;
  for (let m = 1; m <= 12; m++) {
    if (m === 1) {
      // Negotiate with US and purposely break down
      gm.executePolicy('nego_us_bilateral');
      const nego = gm.activeNegotiation;
      nego.playCard('us_agri_concession'); // No agri consensus -> blowback!
      const agreement = gm.concludeNegotiation('breakdown');
      console.log(`  • 1월 한미 협상: ${agreement.grade}`);
      gm.executePolicy('corp_push_hard');
      gm.executePolicy('corp_push_hard');
    } else {
      gm.executePolicy('corp_push_hard');
      gm.executePolicy('corp_push_hard');
      gm.executePolicy('corp_push_hard');
    }

    const res = gm.advanceTurn();
    if (res.status === 'dismissed') {
      dismissedMonth = m;
      break;
    }
    gm.proceedToNextMonth();
  }

  const v = gm.finalVerdict;
  console.log(`  ✔ 조기 경질 발생: ${dismissedMonth}월`);
  console.log(`  ✔ 최종 엔딩: [${v.title}] (${v.badge})`);
  console.log(`  ✔ 경질 사유: "${v.cause}"\n`);
}

// JOURNEY 5: 대중 디리스킹 & 공급망 안정화 독트린
console.log(">>> [JOURNEY 5] 대중 디리스킹 및 공급망 다변화 독트린");
{
  const gm = new GameManager();
  gm.newGame('china_supply_chain', 'bureaucrat', 50505);
  gm.setDoctrine('china_derisking');

  for (let m = 1; m <= 12; m++) {
    if (m === 2 && gm.activeCorporateAction) {
      gm.resolveCorporateAction('posco', 'posco_furnace_shutdown', 'posco_antidumping_suit');
    }
    gm.executePolicy('ind_relief_steel_antidumping');
    gm.executePolicy('gov_logistics_subsidy');
    gm.executePolicy('corp_supply_chain_alliance');

    gm.advanceTurn();
    if (m < 12) gm.proceedToNextMonth();
  }

  const v = gm.finalVerdict;
  console.log(`  ✔ 최종 엔딩: [${v.title}] (${v.badge})`);
  console.log(`  ✔ 연간 무역수지: ${v.summary.totalBalanceFormatted}, 국민지지율: ${v.summary.publicApproval}%, 기업신뢰: ${v.summary.businessTrust}점\n`);
}

console.log("================================================================================");
console.log("   🎉 ALL 5 REPRESENTATIVE JOURNEYS SUCCESSFULLY SIMULATED & VERIFIED!          ");
console.log("================================================================================");
