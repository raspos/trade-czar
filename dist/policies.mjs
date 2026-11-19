// policies.mjs - Monthly Policy Actions & Interventions (3 Action Points per month)

export const POLICY_ACTIONS = [
  // === CATEGORY A: 기업 관리 (Corporate Management) ===
  {
    id: "corp_meeting_emergency",
    category: "corporate",
    categoryName: "기업 관리",
    title: "10대 그룹 총수 긴급 수출전략 간담회 소집",
    description: "삼성, 현대차, SK, 포스코, 한화 등 주요 수출 대기업 총수들을 직접 불러 상반기 수출 목표 조기 달성과 공급망 비상 대책을 협의합니다.",
    costText: "기업계 신뢰 +5, 정책 추진력 +10 (단, 실질 재정 지원 약속 요구받음)",
    impact: { presidentTrust: 5, businessTrust: 5, publicApproval: 5, policyMomentum: 10, competitiveness: 5 },
    executeImmediate(engine) {
      engine.industryStates.semiconductor.supportLevel += 1;
      engine.industryStates.automobile.supportLevel += 1;
      engine.industryStates.machinery.supportLevel += 1;
    }
  },
  {
    id: "corp_push_hard",
    category: "corporate",
    categoryName: "기업 관리",
    title: "수출 실적 부진 기업에 대한 고강도 비상 생산 압박",
    description: "공장 가동률이 저조한 일부 대기업 경영진을 압박하여 재고 소진과 해외 덤핑 방어, 24시간 특별 교대 근무 확대를 강하게 독려합니다.",
    costText: "단기 수출 촉진, 가동률 상승 / 기업계 신뢰 대폭 하락 (반복 시 신뢰 폭락 및 한계 수렴)",
    impact: { presidentTrust: 5, businessTrust: -15, publicApproval: -5, policyMomentum: 5, competitiveness: 2 },
    executeImmediate(engine) {
      for (const ind of Object.values(engine.industryStates)) {
        ind.repeatedActionCount = (ind.repeatedActionCount || 0) + 1;
        // Diminishing returns: 6 -> 3 -> 1 -> 0
        const boost = Math.max(0, 7 - ind.repeatedActionCount * 2);
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
    costText: "소비재·부품 수출 경쟁력 +10%, 국민 지지율 +10, 기업계 신뢰 +5",
    impact: { presidentTrust: 5, businessTrust: 5, publicApproval: 10, policyMomentum: 5, competitiveness: 8 },
    executeImmediate(engine) {
      engine.industryStates.consumer.supportLevel += 2;
      engine.industryStates.machinery.supportLevel += 1;
    }
  },
  {
    id: "corp_capex_matching",
    category: "corporate",
    categoryName: "기업 관리",
    title: "국내 첨단 전략산업 생산설비 신·증설 보조금 매칭",
    description: "반도체, 배터리, 바이오 기업의 국내 최첨단 생산 라인 증설에 대해 정부 보조금과 세제 인센티브를 일대일로 매칭합니다.",
    costText: "3개월 뒤 생산능력(Capacity) +10% 지연 반영, 재정 부담",
    delayMonths: 3,
    impact: { presidentTrust: 5, businessTrust: 15, publicApproval: 5, policyMomentum: 10, competitiveness: 12 },
    executeDelayed(engine) {
      engine.industryStates.semiconductor.capacityIndex += 8;
      engine.industryStates.battery.capacityIndex += 8;
      engine.industryStates.bio.capacityIndex += 8;
    }
  },

  // === CATEGORY B: 정부 정책 (Government Policies) ===
  {
    id: "gov_trade_financing_50t",
    category: "government",
    categoryName: "정부 정책",
    title: "무역금융 50조 원 긴급 공급 및 환변동 보험 확대",
    description: "무역보험공사, 수출입은행을 통해 중소·중견 수출기업에 특별 저금리 제작금융 및 환차손 100% 보장 보험을 즉각 투입합니다.",
    costText: "전 산업 수출 즉각 탄력 (+2.5%), 중소기업 부도 위험 차단",
    impact: { presidentTrust: 5, businessTrust: 10, publicApproval: 8, policyMomentum: 8, competitiveness: 10 },
    executeImmediate(engine) {
      for (const ind of Object.values(engine.industryStates)) {
        ind.supportLevel += 1.5;
      }
    }
  },
  {
    id: "gov_logistics_subsidy",
    category: "government",
    categoryName: "정부 정책",
    title: "수출 물류비 특별 바우처 및 국적선사 전용선 긴급 배정",
    description: "해상운임 급등에 고통받는 자동차, 가전, 석화, 소비재 기업들을 위해 국적 HMM 임시 선박 투입 및 해상운임 차액 50%를 직접 지원합니다.",
    costText: "수출 기업 물류비 부담 즉시 경감, 단기 무역수지 방어",
    impact: { presidentTrust: 5, businessTrust: 10, publicApproval: 5, policyMomentum: 5, competitiveness: 6 },
    executeImmediate(engine) {
      engine.industryStates.automobile.supportLevel += 2;
      engine.industryStates.consumer.supportLevel += 2;
      engine.industryStates.petrochemical.supportLevel += 1;
    }
  },
  {
    id: "gov_rnd_tax_credit",
    category: "government",
    categoryName: "정부 정책",
    title: "국가전략기술 초격차 R&D 세액공제율 상향 (재정경제부·기획예산처 협의)",
    description: "재정경제부 및 기획예산처와 협의하여 AI 반도체, 전고체 배터리, 친환경 암모니아 선박 분야 R&D 세액공제율을 40%로 대폭 상향하고 예산을 긴급 배정합니다.",
    costText: "4개월 뒤 장기 산업 기술 경쟁력 +15% 지연 반영, 예산당국 협의 난이도",
    delayMonths: 4,
    impact: { presidentTrust: 8, businessTrust: 12, publicApproval: 5, policyMomentum: 10, competitiveness: 15 },
    executeDelayed(engine) {
      engine.industryStates.semiconductor.longTermCompetitiveness += 15;
      engine.industryStates.battery.longTermCompetitiveness += 15;
      engine.industryStates.shipbuilding.longTermCompetitiveness += 15;
    }
  },
  {
    id: "gov_antidumping_action",
    category: "government",
    categoryName: "정부 정책",
    title: "외국산 저가 덤핑 품목에 대한 무역위원회 정식 반덤핑 조사 개시",
    description: "중국산 후판·열연강판 및 합성수지 저가 밀어내기 수출에 대해 무역위원회 반덤핑 조사를 전격 개시하고 잠정 덤핑방지관세를 부과합니다.",
    costText: "국내 철강·석화 공장 가동률 수호, 대중국 통상 마찰 격화 위험",
    impact: { presidentTrust: 5, businessTrust: 10, publicApproval: 5, diplomaticTrust: -10, policyMomentum: 10, competitiveness: 5 },
    executeImmediate(engine) {
      engine.industryStates.steel.tradeBarrierIndex = Math.max(70, engine.industryStates.steel.tradeBarrierIndex - 15);
      engine.industryStates.petrochemical.priceCompetitiveness += 10;
    }
  },
  {
    id: "gov_k_expo_global",
    category: "government",
    categoryName: "정부 정책",
    title: "동남아·중동·중남미 K-수출 엑스포 및 정상 세일즈 외교 연계",
    description: "대통령 순방 및 장관급 통상 사절단을 조직하여 아세안, 사우디, UAE, 인도에 K-Food, 화장품, 방산, 스마트 인프라 대규모 수주전을 전개합니다.",
    costText: "2개월 뒤 신흥시장 소비재 및 방산 수출 대폭 증가",
    delayMonths: 2,
    impact: { presidentTrust: 10, businessTrust: 8, publicApproval: 12, diplomaticTrust: 10, policyMomentum: 12, competitiveness: 10 },
    executeDelayed(engine) {
      engine.industryStates.consumer.supportLevel += 3;
      engine.industryStates.defense.pendingDeliveries += 1.5;
    }
  },

  // === CATEGORY C: 통상 협상 (Trade Negotiations) ===
  {
    id: "nego_us_bilateral",
    category: "negotiation",
    categoryName: "통상 협상",
    title: "🇺🇸 한·미 고위급 통상 담판 (Washington D.C. 급파)",
    description: "미국 무역대표부(USTR) 캐서린 대표와 마주 앉아 25% 자동차 관세 및 보편관세 철회를 위한 끝장 협상을 벌입니다.",
    costText: "별도 양자 협상 테이블 인터랙티브 플레이로 직행",
    partnerId: "US",
    isNegotiationLaunch: true
  },
  {
    id: "nego_cn_bilateral",
    category: "negotiation",
    categoryName: "통상 협상",
    title: "🇨🇳 한·중 경제통상 공동위원회 (Beijing 회담)",
    description: "중국 상무부 왕 부부장과 회담을 열고 핵심 희토류·광물 공급망 핫라인 구축과 석화·철강 과잉 공급 억제를 담판 짓습니다.",
    costText: "별도 양자 협상 테이블 인터랙티브 플레이로 직행",
    partnerId: "CN",
    isNegotiationLaunch: true
  },
  {
    id: "nego_eu_bilateral",
    category: "negotiation",
    categoryName: "통상 협상",
    title: "🇪🇺 한·EU 통상장관 각료회담 (Brussels 회동)",
    description: "EU 통상집행위원 헬레나와 만나 탄소국경조정제도(CBAM) 한국산 철강 차별 철폐와 K-방산 유럽 안보 협력 패키지를 협상합니다.",
    costText: "별도 양자 협상 테이블 인터랙티브 플레이로 직행",
    partnerId: "EU",
    isNegotiationLaunch: true
  }
];

export function getPolicy(policyId) {
  return POLICY_ACTIONS.find(p => p.id === policyId);
}
