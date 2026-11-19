// policies.mjs - Monthly Policy Actions & Interventions (3 Action Points per month)
// Enforces realistic political & economic trade-offs (No costless free boosts!)

export const POLICY_ACTIONS = [
  // === CATEGORY A: 기업 관리 (Corporate Management) ===
  {
    id: "corp_meeting_emergency",
    category: "corporate",
    categoryName: "기업 관리",
    title: "10대 그룹 총수 긴급 수출전략 간담회 소집",
    description: "삼성, 현대차, SK, 포스코, 한화 등 주요 수출 대기업 총수들을 직접 불러 상반기 수출 목표 조기 달성과 공급망 비상 대책을 협의합니다.",
    costText: "기업계 신뢰 +2, 정책 추진력 +3 / 대기업 밀실 회동 비판으로 국민 지지율 -2",
    impact: { presidentTrust: 1, businessTrust: 2, publicApproval: -2, policyMomentum: 3, competitiveness: 2 },
    executeImmediate(engine) {
      const mult = engine.origin === 'industry_expert' ? 1.4 : (engine.origin === 'bureaucrat' ? 0.8 : 1.0);
      engine.industryStates.semiconductor.supportLevel += 0.8 * mult;
      engine.industryStates.automobile.supportLevel += 0.8 * mult;
      engine.industryStates.machinery.supportLevel += 0.6 * mult;
    }
  },
  {
    id: "corp_push_hard",
    category: "corporate",
    categoryName: "기업 관리",
    title: "수출 실적 부진 기업에 대한 고강도 비상 생산 압박",
    description: "공장 가동률이 저조한 일부 대기업 경영진을 압박하여 재고 소진과 해외 덤핑 방어, 24시간 특별 교대 근무 확대를 강하게 독려합니다.",
    costText: "단기 수출 촉진, 가동률 상승 / 기업계 신뢰 대폭 하락 (-14), 반복 시 공장 해외 이전 트리거",
    impact: { presidentTrust: 2, businessTrust: -14, publicApproval: -3, policyMomentum: 2, competitiveness: -1 },
    executeImmediate(engine) {
      for (const ind of Object.values(engine.industryStates)) {
        ind.repeatedActionCount = (ind.repeatedActionCount || 0) + 1;
        // Diminishing returns: 4 -> 2 -> 1 -> 0
        const boost = Math.max(0, 5 - ind.repeatedActionCount * 2);
        ind.utilizationRate = Math.min(100, ind.utilizationRate + boost);
      }
    }
  },
  {
    id: "corp_supply_chain_alliance",
    category: "corporate",
    categoryName: "기업 관리",
    title: "대·중소기업 수출 상생 공급망 공동 전선 구축",
    description: "대기업의 해외 판매망과 글로벌 물류 네트워크를 중소 협력업체 및 K-소비재 기업에 전면 개방하는 상생 협약을 체결합니다.",
    costText: "소비재·부품 수출 경쟁력 +5, 국민 지지율 +4 / 대기업 부담 증가로 기업 신뢰 -2",
    impact: { presidentTrust: 2, businessTrust: -2, publicApproval: 4, policyMomentum: 2, competitiveness: 4 },
    executeImmediate(engine) {
      engine.industryStates.consumer.supportLevel += 1.2;
      engine.industryStates.machinery.supportLevel += 0.8;
    }
  },
  {
    id: "corp_capex_matching",
    category: "corporate",
    categoryName: "기업 관리",
    title: "국내 첨단 전략산업 생산설비 신·증설 보조금 매칭",
    description: "반도체, 배터리, 바이오 기업의 국내 최첨단 생산 라인 증설에 대해 정부 보조금과 세제 인센티브를 일대일로 매칭합니다.",
    costText: "3개월 뒤 생산능력(Capacity) +6% 지연 반영 / 기획예산처 재정 마찰 (추진력 -4), 대기업 특혜 논란 (지지율 -4)",
    delayMonths: 3,
    impact: { presidentTrust: 2, businessTrust: 5, publicApproval: -4, policyMomentum: -4, competitiveness: 6 },
    executeDelayed(engine) {
      engine.industryStates.semiconductor.capacityIndex += 5;
      engine.industryStates.battery.capacityIndex += 5;
      engine.industryStates.bio.capacityIndex += 5;
    }
  },

  // === CATEGORY B: 정부 정책 (Government Policies) ===
  {
    id: "gov_trade_financing_50t",
    category: "government",
    categoryName: "정부 정책",
    title: "무역금융 50조 원 긴급 공급 및 환변동 보험 확대",
    description: "무역보험공사, 수출입은행을 통해 중소·중견 수출기업에 특별 저금리 제작금융 및 환차손 100% 보장 보험을 즉각 투입합니다.",
    costText: "전 산업 수출 탄력 (+1.5%), 기업계 신뢰 +4 / 재정 건전성 우려로 정책 추진력 -4",
    impact: { presidentTrust: 2, businessTrust: 4, publicApproval: 1, policyMomentum: -4, competitiveness: 4 },
    executeImmediate(engine) {
      for (const ind of Object.values(engine.industryStates)) {
        ind.supportLevel += 0.8;
      }
    }
  },
  {
    id: "gov_logistics_subsidy",
    category: "government",
    categoryName: "정부 정책",
    title: "해외 물류비 특별 바우처 및 국적선사 선복 우선 배정",
    description: "홍해 사태 및 해운 운임 급등으로 고통받는 중소 수출기업들을 위해 HMM 등 국적 컨테이너선 선복 20%를 특별 배정하고 운임을 지원합니다.",
    costText: "중소기업·소비재 물류 애로 해소, 기업 신뢰 +3 / 재정 소모로 정책 추진력 -2",
    impact: { presidentTrust: 1, businessTrust: 3, publicApproval: 2, policyMomentum: -2, competitiveness: 2 },
    executeImmediate(engine) {
      engine.industryStates.consumer.supportLevel += 1.0;
      engine.industryStates.machinery.supportLevel += 0.6;
      engine.industryStates.steel.supportLevel += 0.6;
    }
  },
  {
    id: "gov_talent_incentive",
    category: "government",
    categoryName: "정부 정책",
    title: "첨단 전략기술 핵심 연구인력 소득세 50% 감면",
    description: "반도체, 배터리, 바이오 분야 석·박사급 글로벌 인재 유치와 해외 유출 방지를 위해 파격적인 소득세 감면과 정주 여건을 제공합니다.",
    costText: "산업 초격차 경쟁력 +5 / 고소득 연구원 특혜 논란으로 국민 지지율 -3",
    impact: { presidentTrust: 1, businessTrust: 3, publicApproval: -3, policyMomentum: 1, competitiveness: 5 },
    executeImmediate(engine) {
      engine.industryStates.semiconductor.longTermCompetitiveness += 3;
      engine.industryStates.battery.longTermCompetitiveness += 3;
      engine.industryStates.bio.longTermCompetitiveness += 3;
    }
  },
  {
    id: "gov_fx_stability_fund",
    category: "government",
    categoryName: "정부 정책",
    title: "환율 급변동 대응 외환시장 안정화 및 기업 결제 지원",
    description: "재정경제부, 한국은행과 협력하여 환율 변동성 완화 메시지를 발신하고 원자재 수입 결제용 긴급 외화 유동성을 공급합니다.",
    costText: "환율 충격 완화, 기업 신뢰 +2 / 통화 당국과의 조율 비용 (추진력 -3)",
    impact: { presidentTrust: 1, businessTrust: 2, publicApproval: 1, policyMomentum: -3, competitiveness: 1 },
    executeImmediate(engine) {
      // Dampens FX shock volatility
      if (engine.macroHistory.length > 0) {
        const last = engine.macroHistory[engine.macroHistory.length - 1];
        last.fxRate = Math.round((last.fxRate * 0.98) * 10) / 10;
      }
    }
  },
  {
    id: "gov_procurement_quota",
    category: "government",
    categoryName: "정부 정책",
    title: "국내 첨단 신기술(K-Tech) 공공기관 우선구매 의무화",
    description: "중앙부처, 지자체, 공공기관의 정보화 및 설비 구축 사업 시 국내 벤처·혁신기업의 전략물자를 최소 30% 이상 우선 구매하도록 강제합니다.",
    costText: "내수 기반 및 중소기업 혁신 (+3) / 민간 시장 왜곡 비판으로 기업계 신뢰 -2",
    impact: { presidentTrust: 1, businessTrust: -2, publicApproval: 2, policyMomentum: -2, competitiveness: 3 },
    executeImmediate(engine) {
      engine.industryStates.machinery.supportLevel += 0.8;
      engine.industryStates.consumer.supportLevel += 0.6;
    }
  },

  // === CATEGORY C: 국제 통상 협상 (Bilateral Negotiations) ===
  {
    id: "nego_us_bilateral",
    category: "negotiation",
    categoryName: "통상 협상",
    title: "미국 무역대표부(USTR) 고위급 양자 통상 협상",
    description: "워싱턴 D.C.에서 USTR 캐서린 대표와 마주 앉아 자동차 25% 관세 철회, 반도체 보조금 보장, 에너지(LNG) 구매 카드를 테이블에 올립니다.",
    costText: "대미 자동차·철강 수출 사활 / 협상 결과에 따라 외교·대통령 신뢰 극명하게 갈림",
    impact: { policyMomentum: 2 },
    isNegotiation: true,
    partnerId: "US"
  },
  {
    id: "nego_cn_fta_upgrade",
    category: "negotiation",
    categoryName: "통상 협상",
    title: "한·중 경제장관회의 및 원자재 공급망 직통 핫라인",
    description: "베이징에서 중국 상무부와 만나 철강·석유화학 저가 밀어내기 덤핑 자제와 흑연·갈륨 등 핵심 광물 수출통제 해제를 담판 짓습니다.",
    costText: "대중국 원자재 공급망 안정 / 미국 측의 대중 경계 시선으로 외교적 줄타기",
    impact: { policyMomentum: 2 },
    isNegotiation: true,
    partnerId: "CN"
  },
  {
    id: "nego_eu_cbam_exemption",
    category: "negotiation",
    categoryName: "통상 협상",
    title: "한·EU 탄소국경조정제도(CBAM) 특별 면제 고위급 협의",
    description: "브뤼셀 EU 집행위원회를 방문하여 한국 철강·알루미늄 제품의 탄소배출권 거래제(K-ETS) 동등성을 인정받고 탄소세 면제를 요구합니다.",
    costText: "대EU 철강·기계 수출 장벽 철폐 / 유럽 환경 규제 준수 압박",
    impact: { policyMomentum: 2 },
    isNegotiation: true,
    partnerId: "EU"
  }
];

export function getPolicy(id) {
  return POLICY_ACTIONS.find(p => p.id === id);
}
