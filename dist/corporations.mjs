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

// Autonomous Corporate Decision Engine (PHASE 4: 기업의 독립적 의사결정 시스템)
export class CorporateAgencyManager {
  constructor() {
    this.actionHistory = [];
    this.triggeredActions = new Set();
  }

  evaluateCorporateAutonomousActions(month, engine, politicsManager, activeAgreements = []) {
    const actions = [];
    if (!engine) return actions;
    const usAgreed = activeAgreements.some(a => a.partnerId === 'US' && a.type === 'agreed');
    const autoTariff = engine.partnerStates?.US?.tariffs?.automobile ?? 0.25;

    // 1. Hyundai Georgia Shift (대미 관세 장기화 시 현대차 조지아 공장 확대 및 울산 특근 중단)
    if (month >= 4 && autoTariff >= 0.15 && !this.triggeredActions.has('hyundai_georgia_shift')) {
      this.triggeredActions.add('hyundai_georgia_shift');
      actions.push({
        corpId: 'hyundai',
        actionKey: 'hyundai_georgia_shift',
        corpName: '현대자동차그룹',
        title: '현대차 이사회, "조지아 메타플랜트 3교대 전격 확대 및 울산 5공장 주말 특근 중단" 의결!',
        description: '미국의 25% 자동차 고율 관세가 장기화 조짐을 보이자, 현대차 경영진이 국내 생산분의 관세 비용을 감내할 수 없다고 판단하고 미국 현지 조립 비중을 대폭 늘리기로 결정했습니다. 울산 및 아산 부품 협력사들의 연쇄 가동 중단 우려가 커집니다.',
        economicPenalty: {
          domesticCapacity: -4,
          autoPartsGrowth: -0.06
        },
        options: [
          {
            id: 'hyundai_support_parts',
            text: '국내 1·2차 협력사 북미 동반진출 긴급 금융지원 및 미래차 바우처 지급',
            cost: '정치자산 -8, 예산 추진력 -1',
            stakeholderImpact: { businessTrust: 6, publicApproval: 2, diplomaticTrust: 2 },
            resolveText: '정부의 신속한 협력사 지원책에 재계가 안도하며, 국내 부품사들의 북미 납품 공급망이 유지됩니다.'
          },
          {
            id: 'hyundai_press_employment',
            text: '국내 고용 유지 협약 위반을 경고하며 해외 유보금 세무조사 검토 압박',
            cost: '재계 신뢰 -12, 언론 리스크',
            stakeholderImpact: { businessTrust: -14, publicApproval: -4, presidentTrust: 2 },
            resolveText: '재계가 "통상 실패를 민간 기업에 전가한다"며 강력 반발, 기업가치와 투자 심리가 급랭합니다.'
          },
          {
            id: 'hyundai_accept_shift',
            text: '불가피한 글로벌 공급망 재배치로 인정하고 관세 외교 협상 타결에 총력 집중',
            cost: '여론 지지율 -5 (국내 일자리 유출 비판)',
            stakeholderImpact: { businessTrust: 1, publicApproval: -6, diplomaticTrust: 5 },
            resolveText: '국내 노동계와 지역사회의 비판이 고조되었으나, 현대차는 대미 수출 마진을 방어했습니다.'
          }
        ]
      });
    }

    // 2. Posco Blast Furnace Shutdown (중국 철강 덤핑 지속 시 포항 1선재공장 휴풍)
    if (month >= 5 && engine.partnerStates?.CN?.tariffs?.steel > 0.04 && !this.triggeredActions.has('posco_furnace_shutdown')) {
      this.triggeredActions.add('posco_furnace_shutdown');
      actions.push({
        corpId: 'posco',
        actionKey: 'posco_furnace_shutdown',
        corpName: '포스코·현대제철',
        title: '포스코 경영회의, "포항 1선재공장 및 당진 전기로 가동 잠정 중단" 비상 결의!',
        description: '중국산 저가 덤핑 후판의 국내 침투와 유럽 CBAM 압박으로 적자가 누적되자, 철강업계가 노후 고로와 전기로 가동을 중단하고 감산에 돌입했습니다. 조선·건설업계 공급망 불안이 고조됩니다.',
        economicPenalty: {
          domesticCapacity: -5,
          steelExportGrowth: -0.05
        },
        options: [
          {
            id: 'posco_antidumping_suit',
            text: '무역위원회 통해 중국산 덤핑 후판에 35% 잠정 상계관세 긴급 부과',
            cost: '중국 반발 (외교신뢰 -5), 산업통상부 추진력 -1',
            stakeholderImpact: { businessTrust: 7, publicApproval: 4, diplomaticTrust: -6 },
            resolveText: '국내 유통 가격이 빠르게 정상화되며 포항 제철소 공장 가동이 재개되었습니다.'
          },
          {
            id: 'posco_green_conversion',
            text: '수소환원제철 및 고망간강 특수재 R&D 특별 국고보조금 3,000억 원 교부',
            cost: '정치자산 -10',
            stakeholderImpact: { businessTrust: 5, competitiveness: 6, diplomaticTrust: 3 },
            resolveText: '유럽 CBAM 기준을 충족하는 저탄소 고급강 생산 체제로의 전환이 가속화됩니다.'
          },
          {
            id: 'posco_market_standby',
            text: '시장 원리에 맡기고 업계 자체 한계설비 구조조정 촉구',
            cost: '재계 신뢰 -8, 철강 노동조합 상경투쟁',
            stakeholderImpact: { businessTrust: -9, publicApproval: -5 },
            resolveText: '포항 및 당진 지역 경제가 위축되고 국내 철강 자급률이 하락했습니다.'
          }
        ]
      });
    }

    // 3. Samsung Legacy DRAM cut & HBM focus (반도체 다운사이클 방어)
    const semiDownturn = (engine.scenario?.industryShocks?.semiconductor?.demandMod || 0) < 0 || engine.scenario?.id === 'china_supply_chain';
    if (month >= 6 && semiDownturn && !this.triggeredActions.has('samsung_dram_cut')) {
      this.triggeredActions.add('samsung_dram_cut');
      actions.push({
        corpId: 'samsung',
        actionKey: 'samsung_dram_cut',
        corpName: '삼성전자·SK하이닉스',
        title: '삼성·SK 반도체 경영진, "레거시 D램 15% 감산 및 AI HBM3E 설비 집중" 발표',
        description: '글로벌 IT 수요 둔화와 재고 누적으로 가격이 하락하자, 메모리 2사가 수익성 방어를 위해 구형 라인을 대대적으로 감산하고 HBM 라인으로 전환했습니다. 단기 통관 수출 물량은 감소하지만 단가는 방어됩니다.',
        economicPenalty: {
          shortTermExportVol: -0.04
        },
        options: [
          {
            id: 'semi_package_rnd',
            text: '차세대 첨단 패키징 및 용인 클러스터 기반시설 국비 조기 집행 지원',
            cost: '정치자산 -5',
            stakeholderImpact: { businessTrust: 8, competitiveness: 7 },
            resolveText: '메모리 대기업들이 기술 초격차를 공고히 하며 글로벌 빅테크 주문을 선점했습니다.'
          },
          {
            id: 'semi_push_volume',
            text: '무역수지 방어를 위해 구형 D램 재고 헐값 밀어내기 수출 종용',
            cost: '재계 신뢰 -10, D램 시장가 폭락 유발',
            stakeholderImpact: { businessTrust: -12, competitiveness: -5 },
            resolveText: '반도체 재고 평가손실이 천문학적으로 불어나며 2분기 영업이익이 급감했습니다.'
          }
        ]
      });
    }

    return actions;
  }

  resolveActionResponse(action, choiceId, engine, politicsManager) {
    const choice = action.options.find(o => o.id === choiceId) || action.options[0];
    if (choice.stakeholderImpact && politicsManager) {
      if (choice.stakeholderImpact.businessTrust) politicsManager.stats.businessTrust = Math.max(0, Math.min(100, politicsManager.stats.businessTrust + choice.stakeholderImpact.businessTrust));
      if (choice.stakeholderImpact.diplomaticTrust) politicsManager.stats.diplomaticTrust = Math.max(0, Math.min(100, politicsManager.stats.diplomaticTrust + choice.stakeholderImpact.diplomaticTrust));
      if (choice.stakeholderImpact.publicApproval) politicsManager.stats.publicApproval = Math.max(0, Math.min(100, politicsManager.stats.publicApproval + choice.stakeholderImpact.publicApproval));
      if (choice.stakeholderImpact.presidentTrust) politicsManager.stats.presidentTrust = Math.max(0, Math.min(100, politicsManager.stats.presidentTrust + choice.stakeholderImpact.presidentTrust));
    }
    this.actionHistory.push({
      actionKey: action.actionKey,
      corpName: action.corpName,
      title: action.title,
      chosenText: choice.text,
      resolveText: choice.resolveText
    });
    return choice;
  }
}
