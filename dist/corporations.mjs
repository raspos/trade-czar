// corporations.mjs - Korean Corporate Stakeholder Models & Interactive Dilemma Dialogues for 통상교섭본부장 | TRADE CZAR

export const CORPORATIONS = [
  {
    id: "samsung",
    name: "삼성전자",
    leader: "이재용 회장 / DS부문장",
    industryId: "semiconductor",
    icon: "💎",
    trust: 60,
    annualExportShare: 0.22,
    stance: "글로벌 AI 메모리 초격차 및 팹 인프라 확충",
    dialogue: {
      greeting: "본부장님, 평택과 용인 메가 클러스터의 전력망과 냉각수 인프라 완공이 시급합니다. HBM 라인은 24시간 풀가동 중이라 단기 증산 압박은 물리적으로 불가능합니다.",
      options: [
        {
          id: "samsung_opt_infra",
          text: "정부 차원에서 용인 클러스터 송전망 인허가를 전폭 패스트트랙으로 뚫어주겠다.",
          response: "[이재용 회장] '감사합니다! 팹 착공 일정이 6개월 단축될 것입니다. 최첨단 패키징 투자를 국내에 우선 배정하겠습니다.'",
          impact: { businessTrust: 4, competitiveness: 5, policyMomentum: -2 },
          apply(engine) {
            engine.industryStates.semiconductor.capacityIndex += 4;
          }
        },
        {
          id: "samsung_opt_push",
          text: "단기 수출 성적표가 급하다. 기존 레거시 D램 라인을 HBM으로 즉각 전환해 수출 물량을 당겨달라.",
          response: "[DS부문장] '수율 손실과 장비 교체 다운타임 때문에 당장 다음 달 생산량이 오히려 감소할 수 있습니다. 무리한 행정 지도는 곤란합니다.'",
          impact: { businessTrust: -6, presidentTrust: 1, competitiveness: -2 },
          apply(engine) {
            engine.industryStates.semiconductor.supportLevel += 0.4;
          }
        }
      ]
    }
  },
  {
    id: "hyundai",
    name: "현대자동차·기아",
    leader: "정의선 회장",
    industryId: "automobile",
    icon: "🚙",
    trust: 55,
    annualExportShare: 0.14,
    stance: "대미 관세 방어 및 전기차·하이브리드 글로벌 판매망",
    dialogue: {
      greeting: "본부장님, 미국의 25% 관세 위협이 해소되지 않으면, 저희는 울산 공장 물량을 줄이고 조지아 메타플랜트 현지 생산 비중을 급격히 높일 수밖에 없습니다.",
      options: [
        {
          id: "hyundai_opt_tariff",
          text: "대미 통상 협상에서 자동차 관세를 반드시 5% 이하로 사수하겠다. 국내 고용을 지켜달라.",
          response: "[정의선 회장] '본부장님의 협상력을 믿겠습니다. 관세 장벽만 막아주신다면 하이브리드와 프리미엄 SUV 수출 물량을 국내에서 100% 소화하겠습니다.'",
          impact: { businessTrust: 5, presidentTrust: 2, publicApproval: 3 },
          apply(engine) {
            engine.industryStates.automobile.supportLevel += 0.8;
          }
        },
        {
          id: "hyundai_opt_flight",
          text: "협상 여의치 않으니 기업 스스로 해외 생산기지로 리스크를 분산하라.",
          response: "[정의선 회장] '결국 정부가 관세 방어에 실패했다는 뜻이군요. 울산 2공장 특근을 중단하고 미국 현지 조립 라인을 3교대로 전환하겠습니다.'",
          impact: { businessTrust: -4, publicApproval: -6, presidentTrust: -3 },
          apply(engine) {
            engine.industryStates.automobile.capacityIndex -= 3;
          }
        }
      ]
    }
  },
  {
    id: "shipbuilders",
    name: "HD현대·한화오션·삼성중공업",
    leader: "조선 3사 경영진",
    industryId: "shipbuilding",
    icon: "⚓",
    trust: 60,
    annualExportShare: 0.05,
    stance: "수주잔고의 인도 통관 전환 및 미 해군 MRO 진출",
    dialogue: {
      greeting: "본부장님, 카타르 LNG선 등 수주잔고는 4년 치가 꽉 차 있습니다. 하지만 배를 건조해 인도 통관하기까지는 최소 18개월에서 24개월의 시차가 발생합니다. 당장의 통관 수출 수치로 저희를 옥죄지 말아 주십시오.",
      options: [
        {
          id: "ship_opt_rg",
          text: "선수금환급보증(RG) 특례 한도를 늘리고, 미 해군 7함대 MRO 물꼬를 터주겠다.",
          response: "[조선 3사 대표단] '바로 그겁니다! 미 해군 함정 정비 수주가 열리면 즉각 고부가가치 용역 수출로 계상되며 유동성이 돕니다!'",
          impact: { businessTrust: 6, diplomaticTrust: 4, competitiveness: 5 },
          apply(engine) {
            engine.industryStates.shipbuilding.pendingDeliveries += 1.5;
          }
        },
        {
          id: "ship_opt_speed",
          text: "납기를 무리해서라도 3개월 앞당겨 올해 안에 인도 통관 실적으로 잡아달라.",
          response: "[조선소 현장소장] '선박 건조는 안전과 직결됩니다. 무리한 납기 단축은 도크 안전사고와 대규모 클레임으로 이어집니다.'",
          impact: { businessTrust: -5, publicApproval: -2, competitiveness: -1 },
          apply(engine) {
            engine.industryStates.shipbuilding.supportLevel += 0.3;
          }
        }
      ]
    }
  },
  {
    id: "posco",
    name: "포스코·현대제철",
    leader: "철강협회 / 포스코홀딩스",
    industryId: "steel",
    icon: "🏗️",
    trust: 50,
    annualExportShare: 0.04,
    stance: "중국산 저가 덤핑 후판 방어 및 EU CBAM 대응",
    dialogue: {
      greeting: "중국 부동산 침체로 밀려나온 저가 후판과 열연 강판이 국내 유통가를 30% 밑돌고 있습니다. 여기에 유럽의 CBAM 탄소 관세까지 덮쳤습니다. 정부의 무역구제 조치가 없으면 고로 가동을 멈춰야 합니다.",
      options: [
        {
          id: "posco_opt_remedy",
          text: "무역위원회를 통해 즉각 반덤핑 예비조사에 착수하고 잠정 관세를 부과하겠다.",
          response: "[철강협회장] '숨통이 트입니다! 내수 가격을 정상화하고 탄소중립 전기로 전환 투자를 차질 없이 집행하겠습니다.'",
          impact: { businessTrust: 5, competitiveness: 4, diplomaticTrust: -3 },
          apply(engine) {
            engine.industryStates.steel.tradeBarrierIndex -= 10;
            engine.industryStates.steel.supportLevel += 0.6;
          }
        },
        {
          id: "posco_opt_endure",
          text: "중국과의 외교적 마찰을 피해야 한다. 원가 절감으로 자체 극복하라.",
          response: "[포스코 경영진] '제철소 현장을 너무 모릅니다. 포항과 광양의 고로 2기를 휴풍(가동 중단)할 수밖에 없습니다.'",
          impact: { businessTrust: -8, presidentTrust: -2, competitiveness: -4 },
          apply(engine) {
            engine.industryStates.steel.capacityIndex -= 4;
          }
        }
      ]
    }
  },
  {
    id: "sme_union",
    name: "중소수출기업연합 및 K-소비재",
    leader: "중기중앙회 수출분과",
    industryId: "consumer",
    icon: "📦",
    trust: 50,
    annualExportShare: 0.08,
    stance: "해외 물류비 급등 및 대기업 선복 독점 해소",
    dialogue: {
      greeting: "K-푸드와 K-뷰티는 지금 북미·유럽에서 사상 최대 주문이 밀려듭니다. 그런데 대기업들이 컨테이너 선복을 독점하고 해운 운임이 3배로 뛰어 제품을 항구에 쌓아두고 있습니다!",
      options: [
        {
          id: "sme_opt_voucher",
          text: "HMM 국적선사 선복 20%를 중기 전용으로 강제 배정하고 물류 바우처를 즉각 지급하겠다.",
          response: "[중기연합회장] '눈물이 납니다! 바로 내일부터 미국 서안 롱비치항으로 냉동김밥과 화장품 컨테이너를 띄우겠습니다!'",
          impact: { businessTrust: 4, publicApproval: 6, policyMomentum: -2 },
          apply(engine) {
            engine.industryStates.consumer.supportLevel += 1.2;
          }
        },
        {
          id: "sme_opt_market",
          text: "해운 운임은 시장 논리다. 정부가 민간 선박 배정에 일일이 개입할 수 없다.",
          response: "[소비재 수출기업] '수출 기회를 눈앞에 두고 납기 지연으로 바이어와의 계약이 취소되게 생겼습니다!'",
          impact: { businessTrust: -4, publicApproval: -5 },
          apply(engine) {
            engine.industryStates.consumer.supportLevel -= 0.2;
          }
        }
      ]
    }
  }
];

export function getCorporation(id) {
  return CORPORATIONS.find(c => c.id === id);
}
