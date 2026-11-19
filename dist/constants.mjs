// constants.mjs - Core constants and enumerations for 통상교섭본부장 | TRADE CZAR

export const GAME_TITLE = "통상교섭본부장";
export const GAME_SUBTITLE = "TRADE CZAR";
export const GAME_SLOGAN = "12번의 무역 성적표, 대한민국 산업의 운명이 결정된다.";

export const START_YEAR = 2027;
export const TOTAL_MONTHS = 12;
export const ACTIONS_PER_MONTH = 3;

export const INDUSTRIES = [
  { id: "semiconductor", name: "반도체", eng: "Semiconductors", icon: "💾", hs: "HS 8542" },
  { id: "automobile", name: "자동차·부품", eng: "Automobiles", icon: "🚗", hs: "HS 8703/8708" },
  { id: "shipbuilding", name: "조선", eng: "Shipbuilding", icon: "🚢", hs: "HS 8901" },
  { id: "steel", name: "철강", eng: "Steel", icon: "🏗️", hs: "HS 72/73" },
  { id: "petrochemical", name: "석유화학", eng: "Petrochemicals", icon: "🧪", hs: "HS 29/39" },
  { id: "battery", name: "이차전지", eng: "Batteries", icon: "🔋", hs: "HS 8507" },
  { id: "bio", name: "바이오·의약품", eng: "Bio & Pharma", icon: "🧬", hs: "HS 3004" },
  { id: "machinery", name: "기계·설비", eng: "Machinery", icon: "⚙️", hs: "HS 8429/8479" },
  { id: "defense", name: "방산", eng: "Defense", icon: "🛡️", hs: "HS 9301/8802" },
  { id: "consumer", name: "소비재", eng: "Consumer Goods", icon: "🍜", hs: "HS 33/19" },
  { id: "others", name: "기타 산업", eng: "Other Goods", icon: "📦", hs: "HS 기타" }
];

export const PARTNERS = [
  { id: "US", name: "미국", flag: "🇺🇸", leader: "USTR 대표 캐서린", color: "#2563eb" },
  { id: "CN", name: "중국", flag: "🇨🇳", leader: "상무부 부부장 왕", color: "#dc2626" },
  { id: "ASEAN", name: "아세안(베트남 등)", flag: "🇻🇳", leader: "아세안 경제각료회의", color: "#059669" },
  { id: "EU", name: "EU(유럽연합)", flag: "🇪🇺", leader: "통상집행위원 헬레나", color: "#4f46e5" },
  { id: "JP", name: "일본", flag: "🇯🇵", leader: "경산성 심의관 사토", color: "#d97706" },
  { id: "ME", name: "중동", flag: "🇸🇦", leader: "에너지특사 알 만수르", color: "#b45309" },
  { id: "ROW", name: "기타 국가", flag: "🌐", leader: "다자교역 협의체", color: "#6b7280" }
];

export const ORIGINS = {
  bureaucrat: {
    id: "bureaucrat",
    title: "정통 통상 관료",
    englishTitle: "Career Trade Bureaucrat",
    description: "외교통상부·산업부에서 평생 다자협상과 FTA를 이끌어온 노련한 전략가.",
    pros: "국제협상 타결 성공률 +20%, 부처 협의 및 통상법 방어력 탁월, 조약 문안 정밀도 극대화",
    cons: "정치적 기반 취약, 대중 인지도 낮음, 기업계의 과감한 투자 결단을 압박하기 어려움",
    initialStats: {
      presidentTrust: 55,
      businessTrust: 50,
      diplomaticTrust: 70,
      publicApproval: 45,
      policyMomentum: 50,
      competitiveness: 55
    },
    negotiationBonus: 0.15,
    businessBonus: -0.05,
    portraitPos: "left 38%"
  },
  industry_expert: {
    id: "industry_expert",
    title: "산업·기업 전문가",
    englishTitle: "Industrial & Business Expert",
    description: "글로벌 대기업 CEO 및 산업연구원장을 역임한 현장 공급망과 기술의 대가.",
    pros: "기업계 신뢰 +25, 수출금융 및 설비투자 민간 호응 극대화, 글로벌 기술 트렌드 즉각 포착",
    cons: "복잡한 다자 외교 의전과 조약 문안 협상 난이도 상승, 관료 사회 통제에 마찰 발생",
    initialStats: {
      presidentTrust: 50,
      businessTrust: 75,
      diplomaticTrust: 45,
      publicApproval: 50,
      policyMomentum: 55,
      competitiveness: 60
    },
    negotiationBonus: -0.05,
    businessBonus: 0.20,
    portraitPos: "center 38%"
  },
  politician: {
    id: "politician",
    title: "정치인 출신",
    englishTitle: "Economic Policy Politician",
    description: "국회 산자위 간사를 거친 중진 정치인. 대통령의 절대적 신임과 국민 소통력 보유.",
    pros: "대통령 신임도 +15, 국민 지지율 보너스 +20%, 국회 청문회 및 예산 확보에서 강력한 추진력",
    cons: "상대국 전문 협상가들의 노련한 수 싸움에 밀릴 위험, 재계의 선심성 정책 의구심",
    initialStats: {
      presidentTrust: 70,
      businessTrust: 45,
      diplomaticTrust: 45,
      publicApproval: 65,
      policyMomentum: 65,
      competitiveness: 50
    },
    negotiationBonus: 0.0,
    businessBonus: -0.05,
    portraitPos: "right 38%"
  }
};

export const MONTH_NAMES = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월"
];
