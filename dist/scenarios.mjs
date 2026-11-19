// scenarios.mjs - 7 Scenarios for 통상교섭본부장 | TRADE CZAR

export const SCENARIOS = [
  {
    id: "baseline",
    title: "시나리오 1. 대한민국의 무역을 책임져라",
    badge: "기본 시나리오 · 권장",
    subtitle: "실제 2026년 무역 구조를 계승한 표준 통상 전략",
    description: "특별한 외생적 재난이 강요되지 않은 균형 상태에서 출발합니다. 수출 확대, 무역흑자 유지, 차세대 10대 전략 산업의 경쟁력 강화를 자유롭게 지휘하십시오.",
    objective: "연간 수출 7,200억 달러 돌파 및 안정적 무역흑자 700억 달러 이상 유지",
    difficulty: "보통",
    initialMacro: {
      fxRateDelta: 0,
      oilDelta: 0,
      globalDemandDelta: 0,
      scfiDelta: 0
    },
    industryShocks: {},
    partnerTariffs: {
      US: { automobile: 0.025, steel: 0.10, general: 0.03 },
      CN: { petrochemical: 0.06, steel: 0.05, general: 0.04 },
      EU: { automobile: 0.10, battery: 0.05, general: 0.03 }
    },
    presidentMandate: "통상교섭본부장, 대한민국 경제의 심장은 수출이오. 관세 장벽은 선제적으로 부수고 우리 기업들이 세계 시장에서 뛸 수 있도록 운동장을 넓혀주시오.",
    firstHeadline: "새 통상사령탑 취임…'수출 7000억불 수성이냐, 질적 도약이냐'",
    corporateDemands: [
      { name: "현대차", text: "북미 전기차·하이브리드 세액공제 불확실성을 통상 협상으로 해소해 주십시오." },
      { name: "삼성전자", text: "미·중 통상 마찰 속에서 반도체 장비 및 소재 조달망 안정이 필수적입니다." },
      { name: "중소기업연합", text: "환율 변동성 완화와 해외 물류비 바우처 지원 확대를 요청합니다." }
    ]
  },
  {
    id: "tariff_war",
    title: "시나리오 2. 관세의 전쟁",
    badge: "미국 관세 위기",
    subtitle: "미 행정부의 보편관세 및 자동차 25% 추가 관세 직격탄",
    description: "미국 새 행정부가 대미 무역흑자국들을 정조준하며 한국산 자동차에 25%, 철강 및 일반 품목에 10~20%의 품목 관세를 예고했습니다. 미국과의 조속한 협상 타결이 무산되면 국가 주력 산업이 마비됩니다.",
    objective: "대미 통상 협상 타결을 통한 자동차 관세 5% 이하 방어 및 수출 타격 최소화",
    difficulty: "어려움",
    initialMacro: {
      fxRateDelta: 30, // 원/달러 상승(원화 약세)
      oilDelta: 0,
      globalDemandDelta: -2.5,
      scfiDelta: 150
    },
    industryShocks: {
      automobile: { demandMod: -0.18, tradeBarrierMod: 0.25 },
      steel: { demandMod: -0.15, tradeBarrierMod: 0.20 },
      machinery: { demandMod: -0.08, tradeBarrierMod: 0.10 }
    },
    partnerTariffs: {
      US: { automobile: 0.25, steel: 0.25, general: 0.10 },
      CN: { petrochemical: 0.06, steel: 0.05, general: 0.04 },
      EU: { automobile: 0.10, battery: 0.05, general: 0.03 }
    },
    presidentMandate: "미국의 25% 관세가 현실화되면 울산과 광주의 완성차 공장이 멈춥니다. 미국산 에너지 구매 확대든 대미 투자 카드든 총동원해 관세 폭탄을 막으시오!",
    firstHeadline: "美, 韓 자동차에 '25% 관세 폭탄' 선전포고…수출 전선에 비상등",
    corporateDemands: [
      { name: "현대차·기아", text: "25% 관세가 적용되면 대미 수출은 반토막 납니다. 미 정부와 담판을 지어주십시오!" },
      { name: "포스코", text: "철강 쿼터 축소 및 관세 부과를 막지 못하면 포항·광양 고로 가동률을 낮춰야 합니다." },
      { name: "전국농민총연맹", text: "자동차 살리자고 미국산 쇠고기·사과 시장을 내주는 굴욕 협상은 결사 반대합니다!" }
    ]
  },
  {
    id: "chip_paradox",
    title: "시나리오 3. 반도체의 역설",
    badge: "산업 양극화",
    subtitle: "AI 반도체 초호황의 착시 vs 전통 제조업 침체의 깊은 골",
    description: "글로벌 빅테크의 HBM 및 서버용 메모리 폭풍 구매로 반도체 수출은 사상 최대를 경신하지만, 철강·석유화학·기계 등 전통 제조업은 수주 절벽에 직면했습니다. 수출 외형은 화려하지만 내수 고용과 제조업 생태계는 붕괴 위기입니다.",
    objective: "전통 제조업의 긴급 구조 전환 지원 및 반도체 외 9대 산업 수출 방어",
    difficulty: "도전",
    initialMacro: {
      fxRateDelta: -25, // 원화 강세 유발
      oilDelta: -3,
      globalDemandDelta: 1.0,
      scfiDelta: 0
    },
    industryShocks: {
      semiconductor: { demandMod: 0.35, tradeBarrierMod: 0.0 },
      steel: { demandMod: -0.16, tradeBarrierMod: 0.05 },
      petrochemical: { demandMod: -0.18, tradeBarrierMod: 0.08 },
      consumer: { demandMod: -0.10, tradeBarrierMod: 0.0 }
    },
    partnerTariffs: {
      US: { automobile: 0.025, steel: 0.10, general: 0.03 },
      CN: { petrochemical: 0.08, steel: 0.06, general: 0.04 },
      EU: { automobile: 0.10, battery: 0.05, general: 0.03 }
    },
    presidentMandate: "반도체 호황에 취해 있을 때가 아닙니다. 여수와 울산의 석유화학, 포항의 철강 공장이 신음하고 있소. 양극화된 산업 구조를 바로잡으시오.",
    firstHeadline: "반도체 홀로 질주하는데…석화·철강 '한파', 통상 지휘봉 시험대",
    corporateDemands: [
      { name: "석유화학협회", text: "나프타 영세율 연장과 중국산 저가 공세에 맞선 반덤핑 관세 조사를 긴급 청원합니다." },
      { name: "SK하이닉스", text: "AI 메모리 공급망 유지를 위해 해외 장비 수입 절차 간소화가 절실합니다." },
      { name: "기계산업진흥회", text: "전통 제조업의 스마트 팩토리 전환 설비투자 세액공제를 건의합니다." }
    ]
  },
  {
    id: "china_push",
    title: "시나리오 4. 중국의 역습",
    badge: "공급과잉 공세",
    subtitle: "중국발 저가 덤핑 공세와 자급률 확대, 샌드위치 위기",
    description: "중국 정부의 보조금을 등에 업은 철강·석유화학·이차전지·범용 반도체 물량이 글로벌 시장으로 쏟아집니다. 한국의 대중 수출선이 막히고 동남아·중동 등 제3국 시장에서도 가격 전쟁에 밀려나고 있습니다.",
    objective: "대체 신흥시장(아세안·인도·중동) 개척 및 첨단 고부가가치 품목으로의 포트폴리오 전환",
    difficulty: "도전",
    initialMacro: {
      fxRateDelta: 15,
      oilDelta: -5,
      globalDemandDelta: -1.0,
      scfiDelta: 80
    },
    industryShocks: {
      petrochemical: { demandMod: -0.22, priceCompMod: -0.20 },
      steel: { demandMod: -0.20, priceCompMod: -0.22 },
      battery: { demandMod: -0.15, priceCompMod: -0.15 },
      consumer: { demandMod: -0.12, priceCompMod: -0.10 }
    },
    partnerTariffs: {
      US: { automobile: 0.025, steel: 0.10, general: 0.03 },
      CN: { petrochemical: 0.10, steel: 0.08, general: 0.06 },
      EU: { automobile: 0.10, battery: 0.05, general: 0.03 }
    },
    presidentMandate: "중국의 저가 밀어내기가 우리 기초 제조업의 숨통을 조이고 있소. 무역구제 조치와 함께 아세안, 인도 등 제3시장으로 수출길을 트시오.",
    firstHeadline: "'차이나 덤핑' 쓰나미…韓 철강·석화 비명, 통상교섭본부 정면대응 선언",
    corporateDemands: [
      { name: "포스코·현대제철", text: "중국산 후판과 열연강판에 대한 반덤핑 제소를 신속히 승인해 주십시오." },
      { name: "LG화학·롯데케미칼", text: "중국 내 자급률 상승으로 대중 수출이 막혔습니다. 인도·동남아 FTA 개선이 시급합니다." },
      { name: "배터리3사", text: "중국산 LFP 배터리의 덤핑을 막을 환경·탄소 규범 방어벽을 세워주십시오." }
    ]
  },
  {
    id: "krw_appreciation",
    title: "시나리오 5. 흔들리는 원화",
    badge: "원화 초강세",
    subtitle: "원/달러 환율 1,220원대 급락…수출기업 채산성 비상",
    description: "미 연준의 급격한 금리 인하와 글로벌 달러 약세로 원/달러 환율이 1,220원 선까지 곤두박질쳤습니다. 환율은 통상교섭본부장이 직접 손댈 수 없지만, 수출 기업들의 가격 경쟁력 급락과 영업이익 적자 전환을 물류·금융 지원으로 방어해야 합니다.",
    objective: "원화 강세 국면에서 비환율 정책(물류, 세제, R&D)을 총동원해 수출 물량 사수",
    difficulty: "어려움",
    initialMacro: {
      fxRateDelta: -180, // 환율 1,220원 수준으로 급락
      oilDelta: -2,
      globalDemandDelta: 0.5,
      scfiDelta: 0
    },
    industryShocks: {
      automobile: { priceCompMod: -0.18 },
      machinery: { priceCompMod: -0.16 },
      consumer: { priceCompMod: -0.22 },
      steel: { priceCompMod: -0.14 }
    },
    partnerTariffs: {
      US: { automobile: 0.025, steel: 0.10, general: 0.03 },
      CN: { petrochemical: 0.06, steel: 0.05, general: 0.04 },
      EU: { automobile: 0.10, battery: 0.05, general: 0.03 }
    },
    presidentMandate: "환율이 1,200원을 위협하니 수출 기업들이 비명을 지르고 있소. 한국은행이나 기재부에만 맡겨둘 수 없으니 통상 차원의 수출 바우처와 금융 지원을 가동하시오.",
    firstHeadline: "원·달러 1220원대 추락…수출전선 '환율 쇼크', 채산성 빨간불",
    corporateDemands: [
      { name: "한국무역협회", text: "환변동 보험 지원 한도를 2배로 늘리고 수출금융 금리를 인하해 주십시오." },
      { name: "중소수출기업연합", text: "수출 대금 환차손으로 줄도산 위기입니다. 긴급 긴급경영안정자금이 절실합니다." },
      { name: "현대차", text: "엔저와 맞물려 일본차와의 가격 경쟁에서 치명타를 입고 있습니다." }
    ]
  },
  {
    id: "oil_shock",
    title: "시나리오 6. 오일 쇼크",
    badge: "에너지 수입 폭등",
    subtitle: "중동 지정학적 충격…국제유가 115달러 돌파와 무역적자 공포",
    description: "중동의 군사 충돌로 호르무즈 해협이 봉쇄 위기에 처하며 브렌트유가 배럴당 115달러로 폭등하고 해상운임(SCFI)이 3,800선을 돌파했습니다. 에너지 수입액이 매월 30억 달러 이상 폭증하며 흑자 기조가 순식간에 눈 녹듯 사라지고 있습니다.",
    objective: "원유·가스 수입선 다변화 협상 및 에너지 절감형 무역수지 방어로 연간 흑자 사수",
    difficulty: "도전",
    initialMacro: {
      fxRateDelta: 70, // 고환율 동반
      oilDelta: 35,   // 유가 폭등 ($115 수준)
      globalDemandDelta: -3.5,
      scfiDelta: 1600 // 해상운임 폭등
    },
    industryShocks: {
      petrochemical: { importCostMod: 0.40, demandMod: -0.12 },
      steel: { importCostMod: 0.25, demandMod: -0.10 },
      consumer: { importCostMod: 0.15, demandMod: -0.08 }
    },
    partnerTariffs: {
      US: { automobile: 0.025, steel: 0.10, general: 0.03 },
      CN: { petrochemical: 0.06, steel: 0.05, general: 0.04 },
      EU: { automobile: 0.10, battery: 0.05, general: 0.03 }
    },
    presidentMandate: "유가가 110달러를 넘으면 우리 무역수지는 버티지 못하오. 중동 주요 산유국과의 긴급 통상 외교와 미국산 LNG 도입으로 에너지 대란을 넘기시오.",
    firstHeadline: "유가 115달러 돌파·운임 폭등…'오일 쇼크'에 무역수지 적자 공포",
    corporateDemands: [
      { name: "정유·석화업계", text: "원유 관세 및 나프타 조정관세를 즉시 0%로 인하해 원가 부담을 덜어주십시오." },
      { name: "해운협회", text: "홍해 및 호르무즈 우회 항로 물류비 지원 긴급 펀드 조성을 요청합니다." },
      { name: "조선업계", text: "친환경 LNG선 수요 급증에 맞춰 특별 건조금융 보증 확대를 건의합니다." }
    ]
  },
  {
    id: "random_2027",
    title: "시나리오 7. 운명의 2027년",
    badge: "무작위 생성 · 시드 재현",
    subtitle: "복합 경제 충격과 변화무쌍한 통상 지형의 시험대",
    description: "반도체 호황과 관세 전쟁, 환율 변동과 에너지 파동 등 다양한 충격이 무작위로 결합되어 매번 완전히 다른 초기 조건에서 시작합니다. 입력한 시드로 언제든 동일한 시나리오를 다시 플레이할 수 있습니다.",
    objective: "예측할 수 없는 거시 충격 속에서 대한민국 무역수지와 산업 경쟁력을 수호하라",
    difficulty: "가변",
    isRandom: true,
    initialMacro: { fxRateDelta: 0, oilDelta: 0, globalDemandDelta: 0, scfiDelta: 0 },
    industryShocks: {},
    partnerTariffs: {
      US: { automobile: 0.05, steel: 0.10, general: 0.04 },
      CN: { petrochemical: 0.06, steel: 0.05, general: 0.04 },
      EU: { automobile: 0.10, battery: 0.05, general: 0.03 }
    },
    presidentMandate: "2027년 세계 경제는 한 치 앞도 내다보기 힘든 격랑에 휩싸여 있소. 본부장의 동물적 감각과 전략적 결단으로 난세를 돌파하시오.",
    firstHeadline: "격랑의 2027년 세계 무역…새 통상교섭본부장의 선택은?",
    corporateDemands: [
      { name: "경제단체연합", text: "글로벌 지정학 리스크에 대응할 종합 통상 비상 컨트롤타워를 가동해 주십시오." }
    ]
  }
];

export function setupRandomScenario(prng) {
  const fxRoll = prng.range(-80, 100);
  const oilRoll = prng.range(-15, 30);
  const demandRoll = prng.range(-3.0, 3.0);
  const scfiRoll = prng.range(-300, 800);
  
  const usAutoTariff = prng.choice([0.025, 0.10, 0.15, 0.25]);
  const chinaDumping = prng.choice([0.0, 0.10, 0.20]);
  const aiChipBoom = prng.choice([0.05, 0.20, 0.40]);

  return {
    fxRateDelta: Math.round(fxRoll),
    oilDelta: Math.round(oilRoll),
    globalDemandDelta: Math.round(demandRoll * 10) / 10,
    scfiDelta: Math.round(scfiRoll),
    industryShocks: {
      semiconductor: { demandMod: aiChipBoom },
      automobile: { tradeBarrierMod: usAutoTariff > 0.05 ? usAutoTariff : 0 },
      petrochemical: { priceCompMod: -chinaDumping },
      steel: { demandMod: -chinaDumping * 0.8 }
    },
    partnerTariffs: {
      US: { automobile: usAutoTariff, steel: 0.15, general: 0.05 },
      CN: { petrochemical: 0.06, steel: 0.06, general: 0.04 },
      EU: { automobile: 0.10, battery: 0.05, general: 0.03 }
    }
  };
}
