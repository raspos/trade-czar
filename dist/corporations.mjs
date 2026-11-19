// corporations.mjs - Korean Conglomerates & Corporate Stakeholder Models

export const CORPORATIONS = [
  {
    id: "samsung",
    name: "삼성전자",
    leader: "이재용 회장 / DS부문장",
    industryId: "semiconductor",
    icon: "💎",
    trust: 60,
    annualExportShare: 0.18,
    demands: [
      { text: "대미 반도체 보조금 및 장비 반입 유예 승인 지원", benefit: "반도체 생산능력 +10%", cost: "대미 투자 확대 약속" },
      { text: "용인 반도체 메가 클러스터 전력·용수 인프라 국가 지원", benefit: "가동률 +5%", cost: "정부 재정 부담" }
    ],
    praiseMessage: "통상교섭본부의 신속한 글로벌 공급망 외교 덕분에 글로벌 빅테크와의 HBM 장기 공급 계약을 확정지었습니다.",
    protestMessage: "정부의 무리한 대미 투자 압박과 수출 통제 강요로 해외 팹의 채산성이 심각하게 위협받고 있습니다."
  },
  {
    id: "hyundai",
    name: "현대자동차·기아",
    leader: "정의선 회장",
    industryId: "automobile",
    icon: "🚙",
    trust: 55,
    annualExportShare: 0.12,
    demands: [
      { text: "미국 관세(25%) 위협에 맞선 통상 협상 조기 타결", benefit: "대미 자동차 수출 정상화", cost: "미국산 에너지/농산물 양보 필요" },
      { text: "글로벌 해상 자동차 전용선(PCTC) 운임 보조", benefit: "수출 물류비 -15%", cost: "정부 물류 예산" }
    ],
    praiseMessage: "본부장님의 결단으로 우려했던 관세 장벽을 피해 북미 시장 점유율 1위를 질주하고 있습니다.",
    protestMessage: "미국의 관세 폭탄을 방치해 미국 딜러망 공급이 중단될 위기입니다. 정부는 무얼 하고 있습니까!"
  },
  {
    id: "sk_hynix",
    name: "SK하이닉스",
    leader: "최태원 회장 / 곽노정 사장",
    industryId: "semiconductor",
    icon: "💾",
    trust: 60,
    annualExportShare: 0.08,
    demands: [
      { text: "글로벌 AI 데이터센터용 HBM 해외 특허 및 무역분쟁 방어", benefit: "반도체 수출 단가 +8%", cost: "외교적 마찰 감수" },
      { text: "첨단 패키징 R&D 투자 세액공제율 상향 건의", benefit: "장기 경쟁력 +10%", cost: "기재부 협의" }
    ],
    praiseMessage: "국제 통상 분쟁을 원만히 중재해 준 정부 덕에 차세대 AI 메모리 시장 주도권을 지켰습니다.",
    protestMessage: "첨단 소재 수입 규제에 손 놓고 있어 핵심 생산 라인의 셧다운이 우려됩니다."
  },
  {
    id: "shipbuilders",
    name: "HD현대·한화오션",
    leader: "조선 3사 경영진",
    industryId: "shipbuilding",
    icon: "⚓",
    trust: 65,
    annualExportShare: 0.04,
    demands: [
      { text: "미국 해군 함정 MRO(유지·보수·정비) 및 건조 진출을 위한 한미 방산통상협정", benefit: "대미 조선 수주 +$5B", cost: "미 존스법(Jones Act) 완화 협상 필요" },
      { text: "선수금환급보증(RG) 한도 대폭 확대", benefit: "조선 수주 즉각 증가", cost: "국책은행 리스크" }
    ],
    praiseMessage: "한미 안보·조선 협력 타결로 K-조선 역사상 최초로 미 군함 MRO 시장의 빗장을 열었습니다.",
    protestMessage: "RG 발급 지연과 외국인 기능인력 쿼터 규제로 수주한 선박 납기를 맞추지 못할 판입니다."
  },
  {
    id: "posco",
    name: "포스코·현대제철",
    leader: "철강협회 / 포스코홀딩스 회장",
    industryId: "steel",
    icon: "🏗️",
    trust: 50,
    annualExportShare: 0.05,
    demands: [
      { text: "중국산 저가 덤핑 후판에 대한 긴급 반덤핑 관세 부과", benefit: "국내 철강 가동률 +10%", cost: "대중 외교 갈등 위험" },
      { text: "EU CBAM(탄소국경조정제도) 한국산 철강 인증 예외 인정 협상", benefit: "대EU 철강 수출 방어", cost: "국내 탄소배출권 제도 보완" }
    ],
    praiseMessage: "철강 쿼터 확대와 공정한 무역구제 조치로 쓰러져가던 기간 제조업이 기사회생했습니다.",
    protestMessage: "밀려드는 차이나 덤핑과 유럽의 탄소 관세 폭탄 앞에 우리 제철소는 문을 닫아야 합니다."
  },
  {
    id: "battery_consortium",
    name: "LG엔솔·삼성SDI·SK온",
    leader: "한국배터리산업협회",
    industryId: "battery",
    icon: "🔋",
    trust: 55,
    annualExportShare: 0.02,
    demands: [
      { text: "미국 IRA 해외우려기관(FEOC) 핵심 광물 원산지 규정 완화 로비", benefit: "배터리 수출 +15%", cost: "대미 통상 역량 집중" },
      { text: "국내 차세대 전고체 배터리 파일럿 라인 보조금", benefit: "기술 격차 3년 확보", cost: "정부 보조금 소진" }
    ],
    praiseMessage: "IRA 규정의 전략적 유예를 이끌어내 북미 시장 점유율을 탈환했습니다.",
    protestMessage: "해외 보조금 삭감과 중국 배터리의 덤핑 공세에 배터리 3사의 실적이 곤두박질치고 있습니다."
  },
  {
    id: "sme_union",
    name: "한국중소수출기업연합",
    leader: "중소기업중앙회 수출분과",
    industryId: "consumer",
    icon: "📦",
    trust: 50,
    annualExportShare: 0.05,
    demands: [
      { text: "중소기업 전용 환변동 보험 바우처 지원", benefit: "소비재 수출 안정성 +20%", cost: "예산 투입" },
      { text: "K-Food·K-Beauty 해외 대형 유통망 입점 및 통관 간소화", benefit: "중소 소비재 수출 +12%", cost: "상대국 검역 협의" }
    ],
    praiseMessage: "현장 밀착형 물류·금융 지원으로 중소기업들의 수출 사기가 하늘을 찌르고 있습니다.",
    protestMessage: "대기업 반도체와 자동차만 챙기느라 수만 개 중소 수출기업의 줄도산을 외면하고 있습니다!"
  }
];

export function getCorporation(corpId) {
  return CORPORATIONS.find(c => c.id === corpId);
}
