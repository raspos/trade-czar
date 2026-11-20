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
  },

  // === CATEGORY D: 산업별 긴급 현안 구제 및 양면 게임 대응 (Industry Emergency Relief) ===
  {
    id: "ind_relief_auto_parts",
    category: "corporate",
    categoryName: "기업 관리",
    title: "자동차 부품 협력사 긴급 관세 피해 바우처 및 북미 동반진출 지원",
    description: "미국의 자동차 고율 관세 위협에 직면한 국내 1·2차 차부품 협력사를 위해 3,000억 원 규모의 긴급 유동성 및 북미 물류 거점 바우처를 투입합니다.",
    costText: "자동차 수출 체력 보강 (+4), 재계 신뢰 +4 / 재정 소진 (추진력 -2)",
    impact: { presidentTrust: 1, businessTrust: 4, publicApproval: 2, policyMomentum: -2, competitiveness: 4 },
    executeImmediate(engine) {
      engine.industryStates.automobile.supportLevel += 1.2;
    }
  },
  {
    id: "ind_relief_steel_antidumping",
    category: "government",
    categoryName: "정부 정책",
    title: "무역위원회 대중 철강 밀어내기 덤핑 조사 및 잠정 상계관세 발동",
    description: "중국산 저가 열연 및 후판의 무차별적 아시아 시장 덤핑에 맞서 무역위원회를 통해 즉각 덤핑 마진 조사 및 25% 잠정 덤핑방지관세를 부과합니다.",
    costText: "국내 철강 내수가 및 가동률 회복 (+5) / 대중 외교 마찰 (외교신뢰 -4)",
    impact: { presidentTrust: 2, businessTrust: 5, diplomaticTrust: -4, publicApproval: 3, competitiveness: 3 },
    executeImmediate(engine) {
      engine.industryStates.steel.supportLevel += 1.5;
      if (engine.partnerStates.CN) {
        engine.partnerStates.CN.tariffs.steel = Math.max(0, engine.partnerStates.CN.tariffs.steel - 0.02);
      }
    }
  },
  {
    id: "ind_relief_ship_mro",
    category: "corporate",
    categoryName: "기업 관리",
    title: "미 해군 7함대 군수지원 및 함정정비(MRO) 정부합동 지원단 파견",
    description: "거제·울산 조선소의 독보적 건조 능력을 활용하여 미 해군 함정 MRO 정비 계약을 공식 수주하고, 한국은행 BOP 서비스/용역 수출로 계상합니다.",
    costText: "서비스 수출 매월 +$4억 달러 급증, 한미 동맹 신뢰 +8 / 중국 측 반발",
    impact: { presidentTrust: 3, diplomaticTrust: 8, businessTrust: 4, competitiveness: 5 },
    executeImmediate(engine) {
      if (engine.servicesStates) {
        engine.servicesStates.navalMroActive = true;
        engine.servicesStates.navalMroLevel = (engine.servicesStates.navalMroLevel || 0) + 1;
      }
      engine.industryStates.shipbuilding.supportLevel += 1.0;
    }
  },
  {
    id: "ind_relief_sme_vouchers",
    category: "corporate",
    categoryName: "기업 관리",
    title: "중소 수출기업 전용 HMM 국적선사 선복 30% 배정 및 해외 물류비 특례 바우처",
    description: "홍해 사태와 글로벌 해운 운임 급등으로 위기에 처한 K-푸드, K-뷰티 중소 수출기업을 위해 컨테이너 선복을 긴급 우선 배정합니다.",
    costText: "중소 소비재 수출 폭증 (+5), 국민 지지율 +5 / 대기업 선복 조정 마찰",
    impact: { presidentTrust: 2, publicApproval: 5, businessTrust: 1, competitiveness: 4 },
    executeImmediate(engine) {
      if (engine.servicesStates) {
        engine.servicesStates.logisticsBonus = (engine.servicesStates.logisticsBonus || 0) + 0.5;
      }
      engine.industryStates.consumer.supportLevel += 1.5;
    }
  },
  {
    id: "domestic_agri_fund",
    category: "government",
    categoryName: "정부 정책",
    title: "당정 협의: 1조 원 농축산 피해보완 상생기금 및 피해보전 직불금 확정",
    description: "국회 및 기획예산처, 농림축산식품부와 긴급 당정협의회를 열어 1조 원 규모의 검역 개방 피해 지원 기금을 확정, 대미 통상 담판의 배수진을 칩니다.",
    costText: "대미 농산물 카드 완전 해금 및 농민 반발 원천 차단 / 정치자산 -15 소모",
    impact: { presidentTrust: 2, diplomaticTrust: 6, publicApproval: 2, policyMomentum: -2 },
    executeImmediate(engine) {
      if (engine.domesticAgriFundEnacted !== undefined) {
        engine.domesticAgriFundEnacted = true;
      }
    }
  }
];

export const DOCTRINES = [
  {
    id: "semiconductor_supremacy",
    name: "반도체 초격차 독트린",
    englishName: "Semiconductor Supremacy Doctrine",
    slogan: "메모리 1위 수호와 첨단 AI 패키징 생태계 육성으로 무역수지 흑자를 견인한다.",
    focusIndustries: ["semiconductor"],
    passiveBonusText: "반도체 경쟁력 +8, R&D 지원효과 1.2배",
    riskText: "글로벌 IT 다운사이클 시 공급과잉 및 재고평가손 직격탄"
  },
  {
    id: "us_alliance_first",
    name: "한미동맹 중심 통상 독트린",
    englishName: "US Alliance First Doctrine",
    slogan: "대미 투자 확대와 에너지 수입 다변화로 통상 301조 보편관세를 선제 방어한다.",
    focusPartners: ["US"],
    passiveBonusText: "대미 외교 신뢰 +12, 자동차 관세 충격 완화",
    riskText: "중국의 핵심 원자재 통관 지연 및 보복 위험"
  },
  {
    id: "china_derisking",
    name: "대중 디리스킹 및 공급망 다변화",
    englishName: "China De-risking Doctrine",
    slogan: "대중 의존도를 낮추고 아세안·인도·유럽으로 수출선과 핵심 원자재 수급처를 분산한다.",
    focusPartners: ["ASEAN", "EU", "INDIA"],
    passiveBonusText: "공급망 안정도 +10, 아세안·인도 수출 성장률 +4%",
    riskText: "대중 단기 수출 둔화 및 중국산 덤핑 압박 지속"
  },
  {
    id: "global_south_frontier",
    name: "글로벌 사우스 개척 독트린",
    englishName: "Global South Frontier Doctrine",
    slogan: "인도, 아세안, 중동 등 신흥 거대 시장과의 경제동반자협정(CEPA)을 가속화한다.",
    focusPartners: ["ASEAN", "INDIA", "MIDDLE_EAST"],
    passiveBonusText: "신흥국 수출 성장률 +6%, K-소비재 수출 폭증",
    riskText: "신흥국 환율 변동성 및 인프라 결제 불확실성"
  },
  {
    id: "inclusive_sme_trade",
    name: "중소기업 포용적 수출 혁신 독트린",
    englishName: "Inclusive SME Trade Doctrine",
    slogan: "소비재, 뷰티, 푸드, 부품 강소기업의 글로벌 진출을 전폭 지원하여 수출 양극화를 해소한다.",
    focusIndustries: ["consumer", "machinery"],
    passiveBonusText: "국민 지지율 +8, 중소기업 수출 탄력성 대폭 강화",
    riskText: "소수 주력 대기업의 대규모 물량 드라이브 추진력 분산"
  },
  {
    id: "energy_green_security",
    name: "에너지 안보 및 무탄소 무역 독트린",
    englishName: "Energy & Green Security Doctrine",
    slogan: "원전·청정수소 전력망과 저탄소 제철로 EU CBAM과 글로벌 탄소장벽을 정면 돌파한다.",
    focusIndustries: ["steel", "petrochemical"],
    passiveBonusText: "EU 외교신뢰 +10, CBAM 탄소국경세 충격 80% 흡수",
    riskText: "제조업 에너지 전환 비용 증가에 따른 단기 원가 부담"
  }
];

import { MONTHLY_CHAPTERS } from './storyline.mjs';

export function getDoctrine(id) {
  return DOCTRINES.find(d => d.id === id);
}

export function getPolicy(id, month = null) {
  if (id && id.startsWith('special_policy_')) {
    for (const ch of Object.values(MONTHLY_CHAPTERS)) {
      if (ch.specialPolicy && ch.specialPolicy.id === id) return ch.specialPolicy;
    }
  }
  return POLICY_ACTIONS.find(p => p.id === id);
}

export function getMonthlyPolicies(month) {
  const m = Math.max(1, Math.min(12, month || 1));
  const ch = MONTHLY_CHAPTERS[m];
  if (ch && ch.specialPolicy) {
    return [ch.specialPolicy, ...POLICY_ACTIONS];
  }
  return [...POLICY_ACTIONS];
}
