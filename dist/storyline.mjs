// storyline.mjs - 12-Month Connected Storyline & Episodic Narrative Drama for 통상교섭본부장 | TRADE CZAR

export const MONTHLY_CHAPTERS = {
  1: {
    month: 1,
    act: "제1막",
    title: "선전포고와 100일의 유예",
    subtitle: "백악관의 25% 보편관세 기습 선언",
    briefing: "트럼프 행정부 출범 직후 백악관이 상호주의 보편관세(25%) 부과를 전격 선언했습니다. '한국은 머니 머신이다. 100일 내 대미 흑자를 절반으로 줄이지 않으면 한국산 자동차와 반도체에 즉각 관세 폭탄을 터뜨리겠다'는 최후통첩이 통상교섭본부로 날아들었습니다.",
    urgentCrisis: {
      id: "crisis_m1",
      title: "백악관의 100일 최후통첩에 대한 긴급 대응",
      desc: "워싱턴의 초강경 압박에 대해 당장 어떤 외교적 기조로 첫 포문을 열겠습니까?",
      choices: [
        {
          text: "워싱턴에 고위급 특사단을 급파하여 '100일 관세 유예'를 우선 공식 확보한다.",
          impact: { diplomaticTrust: 6, presidentTrust: 3, businessTrust: 4 },
          summary: "대미 관세 유예 협상 개시 및 민관 원팀 대응"
        },
        {
          text: "일방적 보호무역에 유감을 표명하고 WTO 다자 규범을 준수하라는 원칙적 성명을 발표한다.",
          impact: { publicApproval: 6, diplomaticTrust: -6, businessTrust: -3 },
          summary: "원칙적 유감 표명 및 다자 공조 탐색"
        }
      ]
    },
    negotiationPartnerId: "US",
    negotiationTitle: "워싱턴 1차 긴급 탐색 담판",
    negotiationDesc: "미 USTR 대표부와의 첫 대면. 100일 유예 획득 및 상호 타협 가능성을 모색합니다.",
    negotiationButtonText: "🇺🇸 워싱턴 1차 탐색 담판 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m1",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[1월 특별 결재] 워싱턴 고위급 통상 사절단 급파 및 100일 관세 유예 협정",
      costText: "미국 관세 발효 공식 3개월 유예 및 한미 채널 복원 / 대외 교섭 부담",
      impact: { diplomaticTrust: 10, presidentTrust: 4, policyMomentum: -2 },
      executeImmediate(engine) {
        if (engine.industryStates.automobile) {
          engine.industryStates.automobile.tradeBarrierIndex = Math.max(0, engine.industryStates.automobile.tradeBarrierIndex - 5);
        }
      }
    },
    featuredCorpId: "hyundai",
    featuredCorpTitle: "🚗 현대자동차 긴급 현안",
    featuredCorpGreeting: "본부장님! 미국의 25% 관세가 현실화되면 울산 공장 물량을 조지아 공장으로 급히 돌릴 수밖에 없습니다. 국내 부품 협력업체 300곳의 연쇄 부도가 우려됩니다!",
    featuredCorpOptions: [
      {
        text: "대미 협상에서 자동차 관세를 반드시 5% 이하로 막겠다. 울산 공장 고용을 유지해달라.",
        response: "[정의선 회장] '본부장님의 협상력을 믿겠습니다! 관세만 막아주신다면 국내 생산 라인을 풀가동하겠습니다.'",
        impact: { businessTrust: 6, presidentTrust: 3, publicApproval: 3 }
      },
      {
        text: "협상이 어려울 수 있으니 조지아 메타플랜트 현지 가동률을 높여 관세를 자체 우회하라.",
        response: "[정의선 회장] '정부의 관세 방어가 어렵다면 미국 현지 생산 비중을 대폭 확대할 수밖에 없습니다.'",
        impact: { businessTrust: -2, competitiveness: 4, publicApproval: -4 }
      }
    ]
  },

  2: {
    month: 2,
    act: "제2막",
    title: "실리콘 카르텔과 AI 칩 분열",
    subtitle: "엔비디아의 독점 요구와 미 상무부의 대중 수출 통제",
    briefing: "엔비디아가 차세대 AI 가속기용 HBM 전량 독점 공급을 압박하는 한편, 미 상무부는 한국산 반도체 장비의 대중국 반출을 전면 봉쇄하겠다는 통제안을 발표했습니다. 삼성전자와 SK하이닉스가 샌드위치 위기에 직면했습니다.",
    urgentCrisis: {
      id: "crisis_m2",
      title: "HBM 독점 요구와 대중국 장비 통제 딜레마",
      desc: "엔비디아의 공급 압박과 미 상무부의 대중국 장비 반출 통제 중 어디에 우선 대응하시겠습니까?",
      choices: [
        {
          text: "용인·평택 메가 클러스터 송전망을 전폭 승인해 차세대 HBM 국내 생산능력을 극대화한다.",
          impact: { businessTrust: 8, competitiveness: 6, policyMomentum: -2 },
          summary: "국내 팹 긴급 패스트트랙 및 인허가 즉시 완화"
        },
        {
          text: "미 상무부에 '검증된 최종 사용자(VEU)' 유예를 강력히 요구해 중국 공장 가동을 사수한다.",
          impact: { diplomaticTrust: -4, businessTrust: 5, competitiveness: 3 },
          summary: "워싱턴 통상팀 급파 및 대미 관세 유예 조항 개정 교섭"
        }
      ]
    },
    negotiationPartnerId: "US",
    negotiationTitle: "미 상무부 반도체 장비 수출 통제 담판",
    negotiationDesc: "워싱턴 상무부와 평택·시안 공장 반도체 장비 반입 유예를 협상합니다.",
    negotiationButtonText: "💾 미 상무부 반도체 통제 담판 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m2",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[2월 특별 결재] 용인 반도체 메가 클러스터 국가 송전망 직권 패스트트랙 인허가",
      costText: "반도체 생산능력(Capacity) 대폭 확충 / 기획예산처 및 지자체 마찰",
      impact: { businessTrust: 8, competitiveness: 6, policyMomentum: -3 },
      executeImmediate(engine) {
        if (engine.industryStates.semiconductor) {
          engine.industryStates.semiconductor.capacityIndex += 6;
          engine.industryStates.semiconductor.supportLevel += 1.0;
        }
      }
    },
    featuredCorpId: "samsung",
    featuredCorpTitle: "💾 삼성전자 & SK하이닉스 현안",
    featuredCorpGreeting: "본부장님, 평택 4공장과 용인 클러스터의 전력망 인허가가 시급합니다. HBM 라인은 24시간 풀가동 중이라 단기 증산 압박은 물리적 한계에 부딪혔습니다!",
    featuredCorpOptions: [
      {
        text: "정부 차원에서 용인 클러스터 송전망 인허가를 전폭 패스트트랙으로 직권 통과시키겠다.",
        response: "[이재용 회장] '감사합니다! 팹 착공 일정이 6개월 단축될 것입니다. 최첨단 패키징 투자를 국내에 우선 배정하겠습니다.'",
        impact: { businessTrust: 6, competitiveness: 5, policyMomentum: -2 }
      },
      {
        text: "단기 수출 성적표가 급하다. 기존 D램 라인을 HBM으로 즉각 전환해 수출 물량을 당겨달라.",
        response: "[DS부문장] '무리한 라인 전환은 수율 쇼크와 장비 다운타임을 유발해 다음 달 생산량이 오히려 감소할 수 있습니다.'",
        impact: { businessTrust: -6, policyMomentum: 2 }
      }
    ]
  },

  3: {
    month: 3,
    act: "제3막",
    title: "공급망 균열과 베이징의 역습",
    subtitle: "중국 상무부의 흑연·갈륨·희토류 수출 통제 전격 발효",
    briefing: "한국의 대미 통상 밀착에 반발한 중국 상무부가 2차전지 핵심 소재인 천연 흑연과 갈륨 등 12개 광물 수출 허가제를 전격 발동했습니다. 국내 배터리 3사의 흑연 재고는 단 45일분밖에 남지 않았습니다.",
    urgentCrisis: {
      id: "crisis_m3",
      title: "중국발 희토류·흑연 차단 비상사태",
      desc: "배터리 생산 라인 셧다운을 막기 위해 어떤 비상 조치를 취하시겠습니까?",
      choices: [
        {
          text: "국가 비축 흑연을 즉시 방출하고 호주·인도네시아 대체 공급선 긴급 바우처를 투입한다.",
          impact: { businessTrust: 7, competitiveness: 5, policyMomentum: -3 },
          summary: "국가 비축 원자재 긴급 방출 및 수입선 다변화"
        },
        {
          text: "베이징과 고위급 핫라인을 열어 한국 기업에 대한 특별 통관 승인을 교섭한다.",
          impact: { diplomaticTrust: 6, businessTrust: 4, publicApproval: -2 },
          summary: "베이징 고위급 핫라인 가동 및 특별 통관 교섭"
        }
      ]
    },
    negotiationPartnerId: "CN",
    negotiationTitle: "베이징 한·중 고위급 공급망 담판",
    negotiationDesc: "중국 상무부와 흑연·갈륨 통관 지연 면제 및 공급망 핫라인을 협상합니다.",
    negotiationButtonText: "🇨🇳 베이징 공급망 긴급 담판 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m3",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[3월 특별 결재] 국가 비축 핵심광물 60일분 비상 방출 및 대체 공급선 관세 면제",
      costText: "배터리 셧다운 위기 차단, 공장 가동률 정상화 / 정부 비축 자원 소모",
      impact: { businessTrust: 7, competitiveness: 5, policyMomentum: -3 },
      executeImmediate(engine) {
        if (engine.industryStates.battery) {
          engine.industryStates.battery.capacityIndex += 4;
          engine.industryStates.battery.tradeBarrierIndex = Math.max(0, engine.industryStates.battery.tradeBarrierIndex - 8);
        }
      }
    },
    featuredCorpId: "battery",
    featuredCorpTitle: "🔋 LG에너지솔루션 & SK온 비상",
    featuredCorpGreeting: "중국 세관에서 흑연 수출 통관을 전면 보류했습니다. 재고가 30일분 미만으로 떨어지면 충북 오창과 서산 배터리 공장을 멈춰야 합니다!",
    featuredCorpOptions: [
      {
        text: "정부 비축 흑연 60일분을 즉시 무상 대여하고 호주 광산 직수입 관세를 전액 면제하겠다.",
        response: "[배터리협회장] '숨통이 트입니다! 즉시 미국 제너럴모터스(GM) 공급 라인을 정상 가동하겠습니다.'",
        impact: { businessTrust: 6, competitiveness: 5, publicApproval: 2 }
      },
      {
        text: "중국 상무부와 긴급 담판을 벌여 민간 상업용 물량은 통관 예외를 받아내겠다.",
        response: "[LG엔솔 사장] '외교적 해법이 가장 확실합니다. 베이징과의 협상 결과를 기다리겠습니다.'",
        impact: { diplomaticTrust: 4, businessTrust: 3 }
      }
    ]
  },

  4: {
    month: 4,
    act: "제4막",
    title: "100일 유예 종료와 벼랑 끝 빅딜",
    subtitle: "워싱턴 본회담: 자동차 관세 저지 vs 100억 달러 LNG 구매",
    briefing: "1월에 합의했던 미국의 100일 관세 유예 시한이 종료되었습니다. USTR 캐서린 대표는 '한국산 자동차 25% 관세를 철회시키는 대가로 미국산 알래스카 LNG 100억 달러를 장기 구매하라'는 벼랑 끝 빅딜을 통보했습니다.",
    urgentCrisis: {
      id: "crisis_m4",
      title: "워싱턴 본회담의 자동차 관세 vs 에너지 빅딜",
      desc: "대한민국 제조업의 운명이 걸린 워싱턴 빅딜에서 어떤 결단을 내리시겠습니까?",
      choices: [
        {
          text: "미국산 LNG 100억 달러 장기구매를 확약하고 자동차 관세를 2.5%로 최종 방어한다.",
          impact: { diplomaticTrust: 10, businessTrust: 7, publicApproval: -3, policyMomentum: -2 },
          summary: "대미 에너지 구매 확대 및 자동차 관세 방어"
        },
        {
          text: "무리한 에너지 강매 요구를 단호히 거부하고 자동차 관세 분쟁 WTO 맞제소를 불사한다.",
          impact: { publicApproval: 8, diplomaticTrust: -10, businessTrust: -8 },
          summary: "강경 원칙 고수 및 다자 제소 절차 착수"
        }
      ]
    },
    negotiationPartnerId: "US",
    negotiationTitle: "한·미 통상 본회담 벼랑 끝 담판",
    negotiationDesc: "자동차 관세 면제와 미국산 에너지 쿼터, 투자 패키지를 일괄 결판짓습니다.",
    negotiationButtonText: "🇺🇸 워싱턴 벼랑 끝 본회담 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m4",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[4월 특별 결재] 미국산 알래스카 LNG 연간 100억 달러 장기구매 계약 체결",
      costText: "대미 자동차 관세 2.5%로 철회 방어 / 대규모 수입 확약으로 재정 부담",
      impact: { diplomaticTrust: 12, businessTrust: 6, publicApproval: -3 },
      executeImmediate(engine) {
        if (engine.industryStates.automobile) {
          engine.industryStates.automobile.tradeBarrierIndex = Math.max(0, engine.industryStates.automobile.tradeBarrierIndex - 15);
          engine.industryStates.automobile.supportLevel += 1.2;
        }
      }
    },
    featuredCorpId: "hyundai",
    featuredCorpTitle: "🚗 현대자동차 & 부품사 연석회의",
    featuredCorpGreeting: "본부장님! 이번 담판에서 관세가 25%로 올라가면 대미 수출은 끝장납니다. 반드시 5% 이하로 사수해 주십시오!",
    featuredCorpOptions: [
      {
        text: "미국산 에너지 패키지를 카드로 삼아 자동차 관세를 반드시 최저 수준으로 묶어두겠다.",
        response: "[정의선 회장] '본부장님의 결단에 감사드립니다! 미국 내 하이브리드 판매망을 총동원해 수출 흑자로 보답하겠습니다.'",
        impact: { businessTrust: 8, presidentTrust: 3, publicApproval: 3 }
      },
      {
        text: "조지아 공장 조립 라인을 3교대로 늘리고 미국 현지 투자 확대를 공약해 의회를 달래라.",
        response: "[현대차 사장] '노조 반발이 거세겠지만 살기 위해 미국 현지화 카드를 검토하겠습니다.'",
        impact: { businessTrust: 2, competitiveness: 3, publicApproval: -4 }
      }
    ]
  },

  5: {
    month: 5,
    act: "제5막",
    title: "트랙터 상경과 광화문 총궐기",
    subtitle: "대미 협상 농산물 양보 소식에 전국 5만 농민 상경 포위",
    briefing: "워싱턴 협상에서 미국산 사과·과일 검역 간소화가 논의되었다는 사실이 알려지자, 전국 농민 5만 명이 트랙터를 몰고 서울 세종대로와 광화문 정부서울청사를 포위했습니다. 국회에서는 본부장 탄핵안이 발의되었습니다.",
    urgentCrisis: {
      id: "crisis_m5",
      title: "광화문 트랙터 시위와 농심(農心) 폭발",
      desc: "정부서울청사 앞을 가득 메운 트랙터 시위대와 국회의 탄핵 압박을 어떻게 돌파하시겠습니까?",
      choices: [
        {
          text: "농어촌 상생 특별 피해 보전 기금 3조 원을 즉시 편성해 농가 피해를 전액 보전한다.",
          impact: { publicApproval: 8, presidentTrust: 4, policyMomentum: -5 },
          summary: "국회 통상 비상대책위 수용 및 소통 강화"
        },
        {
          text: "'국민 경제 전체를 위한 불가피한 결단'임을 호소하며 대국민 담화로 정면 돌파한다.",
          impact: { policyMomentum: 5, publicApproval: -6, presidentTrust: -3 },
          summary: "행정부 전권 추진 및 국정 흔들림 차단"
        }
      ]
    },
    negotiationPartnerId: "US",
    negotiationTitle: "미 농무부 검역 일정표 유예 실무 협의",
    negotiationDesc: "국내 반발을 이유로 농산물 검역 완화 이행 시기를 3년간 유예 협상합니다.",
    negotiationButtonText: "🌾 미 농무부 검역 유예 협의 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m5",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[5월 특별 결재] 농어촌 상생 발전 특별 피해 보전 기금 3조 원 긴급 편성",
      costText: "광화문 시위 해산 및 국회 탄핵안 철회 / 대규모 긴급 예산 소모",
      impact: { publicApproval: 9, presidentTrust: 5, policyMomentum: -4 },
      executeImmediate(engine) {
        if (engine.industryStates.consumer) {
          engine.industryStates.consumer.supportLevel += 1.0;
        }
      }
    },
    featuredCorpId: "sme",
    featuredCorpTitle: "🍱 K-푸드 & 중소 농식품 수출업계",
    featuredCorpGreeting: "농민들의 도로 봉쇄로 K-푸드 가공 공장 원자재 반입이 막혔습니다. 우리 농가도 살리고 K-푸드 수출도 이어갈 지혜로운 해법이 필요합니다!",
    featuredCorpOptions: [
      {
        text: "국내 농산물 전량을 K-푸드 수출 가공용 원료로 정부가 전량 수매하겠다.",
        response: "[식품수출협회] '최고의 상생안입니다! 농가는 판로를 얻고 기업은 원료를 확보해 수출을 폭발시키겠습니다!'",
        impact: { publicApproval: 7, businessTrust: 5, competitiveness: 4 }
      },
      {
        text: "피해 농가에 직접 현금 직불금을 지급해 생계를 보장하겠다.",
        response: "[농식품 유통업계] '임시방편이지만 당장의 농가 분노를 가라앉히는 데는 도움이 될 것입니다.'",
        impact: { publicApproval: 5, presidentTrust: 3, policyMomentum: -2 }
      }
    ]
  },

  6: {
    month: 6,
    act: "제6막",
    title: "철강의 한파와 브뤼셀 탄소 장벽",
    subtitle: "중국산 덤핑 후판 폭격과 유럽연합(EU) CBAM 탄소국경세",
    briefing: "중국 부동산 침체로 쏟아져 나온 저가 덤핑 후판이 국내 조선·건설 시장을 30% 밑도는 가격에 잠식했습니다. 설상가상으로 유럽연합(EU)의 CBAM 탄소국경세가 발효를 앞두고 있어 포스코는 40년 만에 용광로 휴풍을 검토 중입니다.",
    urgentCrisis: {
      id: "crisis_m6",
      title: "중국 덤핑 철강과 EU 탄소국경세의 이중 폭격",
      desc: "제조업의 쌀인 철강 산업이 붕괴할 위기입니다. 어떤 무역구제 카드를 쓰시겠습니까?",
      choices: [
        {
          text: "중국산 덤핑 철강에 즉각 28% 잠정 반덤핑 관세를 때려 국내 고로를 방어한다.",
          impact: { businessTrust: 7, competitiveness: 5, diplomaticTrust: -4 },
          summary: "대미 파운드리 초격차 협력 체계 공고화"
        },
        {
          text: "브뤼셀로 날아가 한국의 K-ETS 배출권 비용을 100% 공제받는 탄소 동등성 협약을 맺는다.",
          impact: { diplomaticTrust: 8, businessTrust: 6, competitiveness: 4 },
          summary: "대중 공급망 실무 채널 가동 및 균형 외교"
        }
      ]
    },
    negotiationPartnerId: "EU",
    negotiationTitle: "브뤼셀 한·EU 탄소통상 담판",
    negotiationDesc: "EU 집행위와 CBAM 탄소국경세 철강 감면 및 K-방산 수출 패키지를 협상합니다.",
    negotiationButtonText: "🇪🇺 브뤼셀 탄소세 담판 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m6",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[6월 특별 결재] 중국산 덤핑 철강재 잠정 반덤핑 관세 28% 전격 발동",
      costText: "포항 1고로 휴풍 위기 차단, 국내 철강 유통가 정상화 / 중국 상무부 마찰",
      impact: { businessTrust: 8, competitiveness: 5, diplomaticTrust: -4 },
      executeImmediate(engine) {
        if (engine.industryStates.steel) {
          engine.industryStates.steel.tradeBarrierIndex = Math.max(0, engine.industryStates.steel.tradeBarrierIndex - 12);
          engine.industryStates.steel.supportLevel += 1.2;
        }
      }
    },
    featuredCorpId: "posco",
    featuredCorpTitle: "🏗️ 포스코 & 현대제철 비상",
    featuredCorpGreeting: "중국산 후판이 포스코 제조원가보다 쌉니다. 여기에 유럽 탄소세까지 맞으면 포항 1선재공장과 당진 전기로를 멈출 수밖에 없습니다!",
    featuredCorpOptions: [
      {
        text: "무역위원회를 통해 중국산 철강에 즉각 잠정 반덤핑 관세를 부과하겠다.",
        response: "[포스코 회장] '결단에 감사드립니다! 내수 가격을 정상화하고 탄소중립 수소환원제철 전환에 속도를 내겠습니다.'",
        impact: { businessTrust: 7, competitiveness: 5, diplomaticTrust: -3 }
      },
      {
        text: "EU와 담판하여 K-배출권 비용 공제를 이끌어내고 수소환원제철 세제를 지원하겠다.",
        response: "[철강협회장] '유럽 탄소 장벽만 걷어내 주신다면 글로벌 프리미엄 강재 시장에서 승부를 걸겠습니다.'",
        impact: { diplomaticTrust: 6, businessTrust: 6, competitiveness: 4 }
      }
    ]
  },

  7: {
    month: 7,
    act: "제7막",
    title: "홍해의 불길과 물류 대란",
    subtitle: "수에즈 운하 봉쇄로 해운 운임 3배 폭등…중소기업 수출길 마비",
    briefing: "중동 분쟁 격화로 수에즈 운하 통행이 차단되며 희망봉 우회 항로로 해운 운임(SCFI)이 3배로 치솟았습니다. 대기업들이 선복을 싹쓸이하면서 중소기업들의 K-푸드와 뷰티, 기계 부품이 부산항에 묶여 계약 파기 위기에 놓였습니다.",
    urgentCrisis: {
      id: "crisis_m7",
      title: "해운 운임 폭등과 중소기업 수출길 마비",
      desc: "부산항에 쌓여가는 중소기업 컨테이너를 구출하기 위해 어떤 비상 결단을 내리시겠습니까?",
      choices: [
        {
          text: "HMM 국적 컨테이너선 선복 25%를 중소기업에 강제 배정하고 물류 바우처를 투입한다.",
          impact: { publicApproval: 8, businessTrust: 5, policyMomentum: -2 },
          summary: "대중 수출입 통제 검토 및 경제안보 강화"
        },
        {
          text: "항공 화물 전세기를 즉시 띄워 유통기한이 임박한 K-푸드와 긴급 부품을 공수한다.",
          impact: { competitiveness: 6, businessTrust: 4, policyMomentum: -3 },
          summary: "국내 소부장 자립화 긴급 예산 투입"
        }
      ]
    },
    negotiationPartnerId: "EU",
    negotiationTitle: "유럽·중동 해운물류 안전보장 협력",
    negotiationDesc: "해운협회 및 유럽 항만청과 항로 다변화 및 선복 안정 협약을 추진합니다.",
    negotiationButtonText: "🚢 유럽 물류안전 협의 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m7",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[7월 특별 결재] HMM 국적선사 선복 25% 중기 의무 배정 및 물류 바우처 지급",
      costText: "부산항 컨테이너 적체 즉각 해소, 중소 소비재 수출 급반등 / 물류 지원금 소모",
      impact: { publicApproval: 8, businessTrust: 6, policyMomentum: -2 },
      executeImmediate(engine) {
        if (engine.industryStates.consumer) {
          engine.industryStates.consumer.capacityIndex += 5;
          engine.industryStates.consumer.supportLevel += 1.5;
        }
      }
    },
    featuredCorpId: "sme",
    featuredCorpTitle: "📦 중소기업 & K-소비재 연합회",
    featuredCorpGreeting: "냉동김밥과 화장품 주문이 미국과 유럽에서 쏟아지는데 선박을 못 구해 항구에 썩고 있습니다! 대기업만 살리지 말고 중소기업 선복을 배정해 주십시오!",
    featuredCorpOptions: [
      {
        text: "HMM 국적 컨테이너선 선복 25%를 중기 전용으로 전격 배정하고 물류비를 50% 보조하겠다.",
        response: "[중기연합회장] '눈물이 납니다! 바로 내일부터 롱비치항과 로테르담항으로 컨테이너를 띄우겠습니다!'",
        impact: { businessTrust: 6, publicApproval: 8, policyMomentum: -2 }
      },
      {
        text: "항공 화물기 전세 편을 즉각 편성해 긴급 납기 주문을 우선 해결하겠다.",
        response: "[K-뷰티 협회장] '급한 불은 끄겠지만 근본적인 해운 선복 대책도 계속 챙겨주십시오!'",
        impact: { competitiveness: 5, businessTrust: 4 }
      }
    ]
  },

  8: {
    month: 8,
    act: "제8막",
    title: "외환의 덫과 환율조작국 경고",
    subtitle: "원·달러 환율 1,480원 돌파…미 재무부의 개입 중단 경고장",
    briefing: "무역수지 적자 압박과 글로벌 강달러로 원·달러 환율이 1,480원을 돌파했습니다. 미 재무부는 '한국이 고환율을 유도해 수출 채산성을 부양한다면 환율조작국으로 전격 지정하겠다'는 공식 경고장을 전달해 왔습니다.",
    urgentCrisis: {
      id: "crisis_m8",
      title: "환율 1,480원 돌파와 환율조작국 지정 위기",
      desc: "수입 물가 폭등과 미 재무부의 압박이라는 외환 딜레마를 어떻게 돌파하시겠습니까?",
      choices: [
        {
          text: "필수 원자재 무관세 할당관세를 전면 확대해 수입 물가를 잡고 수지 방어선을 친다.",
          impact: { presidentTrust: 6, publicApproval: 5, businessTrust: 3 },
          summary: "청와대·내각 긴급 경제안보회의 소집"
        },
        {
          text: "고환율 가격경쟁력을 지렛대 삼아 수출 드라이브를 걸고 시장 점유율 확대로 맞선다.",
          impact: { businessTrust: 6, diplomaticTrust: -6, policyMomentum: 3 },
          summary: "민관 긴급 점검회의 및 현장 대책 마련"
        }
      ]
    },
    negotiationPartnerId: "US",
    negotiationTitle: "미 재무부 거시금융·외환 협의",
    negotiationDesc: "미 재무부와 외환시장 건전성 및 환율관찰국 지정 면제를 협상합니다.",
    negotiationButtonText: "💵 미 재무부 외환협의 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m8",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[8월 특별 결재] 필수 원자재 무관세 할당관세 확대 및 수입 수지 비상 방어",
      costText: "원자재 수입 물가 안정, 무역수지 적자폭 축소 / 관세 세수 일부 감소",
      impact: { presidentTrust: 6, publicApproval: 5, businessTrust: 4 },
      executeImmediate(engine) {
        for (const ind of Object.values(engine.industryStates)) {
          ind.supportLevel += 0.5;
        }
      }
    },
    featuredCorpId: "hyundai",
    featuredCorpTitle: "🏭 10대 그룹 재무총괄(CFO) 연석회의",
    featuredCorpGreeting: "환율 급등으로 수출 단가는 올랐으나, 해외 수입 원자재와 에너지 대금 부담으로 영업이익이 훼손되고 있습니다. 외환 당국의 예측 가능한 관리가 절실합니다!",
    featuredCorpOptions: [
      {
        text: "원자재 관세를 0%로 낮추고 환변동 위험 보험 한도를 2배로 확대 공급하겠다.",
        response: "[CFO 대표단] '수입 비용 부담이 크게 덜어집니다. 안정적인 생산을 유지하겠습니다.'",
        impact: { businessTrust: 6, presidentTrust: 4 }
      },
      {
        text: "수출 대금 조기 영수를 유도하여 국내 외환시장에 달러 유동성을 즉각 공급해달라.",
        response: "[수출입은행장] '기업들과 협조해 달러 수급 안정을 위해 최선을 다하겠습니다.'",
        impact: { presidentTrust: 5, policyMomentum: 3 }
      }
    ]
  },

  9: {
    month: 9,
    act: "제9막",
    title: "조선의 반격과 안보 동맹 승부수",
    subtitle: "미 7함대 군함 MRO 수주 돌풍…'서비스 무역'의 신기원",
    briefing: "미국의 조선소 부족 사태를 파고들어 한화오션과 HD현대중공업이 미 해군 7함대 함정 MRO(유지·보수·정비) 사업 수주에 성공했습니다. 통관 상품수출을 넘어 연간 수십억 달러의 서비스 무역 신기원이 열리고 있습니다.",
    urgentCrisis: {
      id: "crisis_m9",
      title: "미 해군 함정 MRO 수주와 안보 통상 기회",
      desc: "대한민국 조선업의 영토를 미 군함 유지보수 시장으로 넓히기 위해 무엇을 지원하시겠습니까?",
      choices: [
        {
          text: "선수금환급보증(RG) 5조 원 특례를 즉시 승인하고 특수선 전용 도크 보안을 직권 허가한다.",
          impact: { businessTrust: 8, diplomaticTrust: 7, competitiveness: 6 },
          summary: "동남아·인도 신흥 거점 진출 총력 지원"
        },
        {
          text: "미 해군과의 장기 파트너십을 지렛대 삼아 철강·자동차 관세 추가 인하를 압박한다.",
          impact: { diplomaticTrust: 5, businessTrust: 6, policyMomentum: 4 },
          summary: "유럽·중동 시장 집중 및 수출선 다변화"
        }
      ]
    },
    negotiationPartnerId: "US",
    negotiationTitle: "미 국방부·해군성 안보 통상 협의",
    negotiationDesc: "미 국방부와 군함 MRO 장기 계약 및 한미 안보 통상 상생 패키지를 협상합니다.",
    negotiationButtonText: "⚓ 미 해군 MRO 안보 협의 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m9",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[9월 특별 결재] 방산·함정 MRO 선수금환급보증(RG) 5조 원 공급 및 서비스 무역 특례",
      costText: "조선 3사 미 해군 MRO 사업 수주 확정, 월 10억 달러 서비스 무역 창출",
      impact: { businessTrust: 8, diplomaticTrust: 7, competitiveness: 6 },
      executeImmediate(engine) {
        if (engine.industryStates.shipbuilding) {
          engine.industryStates.shipbuilding.pendingDeliveries += 3.0;
          engine.industryStates.shipbuilding.supportLevel += 1.5;
        }
      }
    },
    featuredCorpId: "shipbuilding",
    featuredCorpTitle: "⚓ 한화오션 & HD현대 조선 대표단",
    featuredCorpGreeting: "미 해군 군수지원함 정비 첫 프로젝트 수주에 성공했습니다! 정부가 RG 보증과 함정 정비 부두 보안만 뒷받침해 주시면 거제와 울산이 아시아 최대의 미 해군 정비창이 됩니다!",
    featuredCorpOptions: [
      {
        text: "선수금환급보증 5조 원을 즉각 전액 공급하고 안보 동맹의 핵심 지렛대로 삼겠다.",
        response: "[한화오션 사장] '감사합니다! 미 해군 함정 MRO를 연간 수십억 달러의 흑자 엔진으로 키워내겠습니다!'",
        impact: { businessTrust: 8, diplomaticTrust: 7, competitiveness: 6 }
      },
      {
        text: "군사 보안 규정과 도크 안전 관리를 완벽히 갖춘 후 단계적으로 수주를 확대하라.",
        response: "[HD현대 부회장] '안전을 최우선으로 하여 차질 없이 프로젝트를 인도하겠습니다.'",
        impact: { competitiveness: 4, presidentTrust: 3 }
      }
    ]
  },

  10: {
    month: 10,
    act: "제10막",
    title: "영토 확장과 글로벌 사우스 총공세",
    subtitle: "미·중 쏠림 벗어나 인도·아세안·중동으로 수출 다변화 대전환",
    briefing: "미·중 갈등의 파고를 극복하기 위해, 인도, 아세안, 중동을 하나로 묶는 '글로벌 사우스(Global South)' 수출 다변화 총공세가 선언되었습니다. 첸나이 현대차 공장과 인도네시아 배터리 팹, 사우디 네옴시티 인프라 진출이 본격화됩니다.",
    urgentCrisis: {
      id: "crisis_m10",
      title: "글로벌 사우스 신시장 CEPA 비준과 영토 확장",
      desc: "수출 영토를 신흥 시장으로 전방위 넓히기 위해 어떤 전략적 승부수를 던지시겠습니까?",
      choices: [
        {
          text: "한·인도 CEPA 개정 및 한·아세안 FTA 업그레이드를 즉시 패스트트랙 비준한다.",
          impact: { competitiveness: 8, businessTrust: 7, diplomaticTrust: 6 },
          summary: "차세대 반도체 R&D 세제 혜택 총동원"
        },
        {
          text: "원전·방산·K-소비재 패키지 수주 사절단을 직접 이끌고 중동·동남아를 순방한다.",
          impact: { publicApproval: 7, presidentTrust: 6, policyMomentum: 4 },
          summary: "대국민 통상 성과 설명회 및 상생 강화"
        }
      ]
    },
    negotiationPartnerId: "EU",
    negotiationTitle: "아세안·인도 글로벌 사우스 CEPA 다자 담판",
    negotiationDesc: "인도·아세안 통상장관들과 완성차·반도체·소비재 관세 철폐를 협상합니다.",
    negotiationButtonText: "🌐 글로벌 사우스 CEPA 담판 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m10",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[10월 특별 결재] 글로벌 사우스(인도·아세안·중동) CEPA 패스트트랙 비준",
      costText: "신흥 시장 수출 장벽 -10pt, 미·중 수출 의존도 완화 및 신규 수출길 확보",
      impact: { competitiveness: 8, businessTrust: 7, diplomaticTrust: 6 },
      executeImmediate(engine) {
        if (engine.industryStates.machinery) engine.industryStates.machinery.tradeBarrierIndex = Math.max(0, engine.industryStates.machinery.tradeBarrierIndex - 8);
        if (engine.industryStates.consumer) engine.industryStates.consumer.tradeBarrierIndex = Math.max(0, engine.industryStates.consumer.tradeBarrierIndex - 8);
        if (engine.industryStates.automobile) engine.industryStates.automobile.supportLevel += 1.0;
      }
    },
    featuredCorpId: "hyundai",
    featuredCorpTitle: "🚗 현대차 인도 & 기계·방산 대표단",
    featuredCorpGreeting: "인도 첸나이 100만 대 생산 체제가 완성되었고 중동 인프라 발주가 쏟아집니다! 미·중 틈바구니에서 벗어날 신흥 시장 관세 장벽을 뚫어주십시오!",
    featuredCorpOptions: [
      {
        text: "글로벌 사우스 CEPA 비준으로 완성차·부품·방산 관세를 전면 철폐하겠다.",
        response: "[현대차 사장] '인도와 아세안이 새로운 제1의 수출 기지로 우뚝 설 것입니다!'",
        impact: { businessTrust: 7, competitiveness: 6, diplomaticTrust: 5 }
      },
      {
        text: "원화 결제망과 현지 부품 공급망을 구축해 환율 리스크를 원천 차단하라.",
        response: "[기계산업협회장] '신흥국 금융 불안에도 흔들리지 않는 튼튼한 교두보를 다지겠습니다.'",
        impact: { competitiveness: 5, businessTrust: 5 }
      }
    ]
  },

  11: {
    month: 11,
    act: "제11막",
    title: "최종 결전과 워싱턴 정상회담",
    subtitle: "10대 그룹 총수 총집결…1년 통상 전쟁을 매듭지을 최후 담판",
    briefing: "1년간의 치열했던 통상 혈투를 결판낼 한·미 정상회담이 워싱턴 백악관에서 소집되었습니다. 10대 그룹 총수 전원이 경제사절단으로 워싱턴에 모인 가운데, 보편관세 영구 면제 합의서 서명을 앞두고 있습니다.",
    urgentCrisis: {
      id: "crisis_m11",
      title: "워싱턴 정상회담 통상 빅딜 최종 조율",
      desc: "1년간 쌓아 올린 모든 외교·산업 지렛대를 총동원할 최종 결단의 순간입니다.",
      choices: [
        {
          text: "1년간의 에너지 구매와 50조 대미 투자를 묶어 '보편관세 영구 면제'에 당당히 서명한다.",
          impact: { diplomaticTrust: 15, businessTrust: 12, presidentTrust: 10, publicApproval: 6 },
          summary: "연간 목표 달성을 위한 막판 수출 밀어내기 총력전"
        },
        {
          text: "미국의 일방적 기술 안보 독소조항을 끝까지 거부하고 주권적 타협안을 고수한다.",
          impact: { publicApproval: 10, policyMomentum: 6, diplomaticTrust: -8 },
          summary: "질적 체질 개선 및 무역 구조 개혁 선언"
        }
      ]
    },
    negotiationPartnerId: "US",
    negotiationTitle: "워싱턴 정상급 통상 빅딜 최종 담판",
    negotiationDesc: "보편관세 완전 면제 합의서 최종 서명 및 1년 통상 패키지를 완결합니다.",
    negotiationButtonText: "🇺🇸 워싱턴 최종 정상 담판 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m11",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[11월 특별 결재] 한·미 정상회담 통상 빅딜 최종 비준안 국무회의 긴급 의결",
      costText: "대한민국 통상 주권 사수, 주요 수출품 관세 면제 및 수출 흑자 모멘텀 확정",
      impact: { presidentTrust: 10, diplomaticTrust: 12, businessTrust: 10 },
      executeImmediate(engine) {
        for (const ind of Object.values(engine.industryStates)) {
          ind.tradeBarrierIndex = Math.max(0, ind.tradeBarrierIndex - 15);
          ind.supportLevel += 1.5;
        }
      }
    },
    featuredCorpId: "samsung",
    featuredCorpTitle: "🏛️ 10대 그룹 총수 경제사절단",
    featuredCorpGreeting: "본부장님! 삼성, 현대차, SK, LG, 포스코, 한화 총수들이 워싱턴 현지에 모두 모였습니다. 1년간 본부장님이 버텨주신 덕분에 여기까지 왔습니다. 마지막 승리의 도장을 찍어주십시오!",
    featuredCorpOptions: [
      {
        text: "대한민국 제조업과 미래 세대를 지켜낸 승리의 합의서에 당당히 서명하겠다!",
        response: "[총수 일동] '본부장님의 영도력에 깊이 감사드립니다! 내년도 공격적인 국내 시설 투자로 화답하겠습니다!'",
        impact: { businessTrust: 10, presidentTrust: 8, publicApproval: 8 }
      },
      {
        text: "독소조항 없는 완벽한 조약 문구를 위해 마지막 토씨 하나까지 집요하게 파고들겠다.",
        response: "[대한상의 회장] '끝까지 치밀한 통상 사령탑의 면모에 든든합니다!'",
        impact: { diplomaticTrust: 8, competitiveness: 6 }
      }
    ]
  },

  12: {
    month: 12,
    act: "제12막",
    title: "역사의 심판과 1년의 결산",
    subtitle: "12번의 무역 성적표 완주…중앙일보 결산 특별판과 역사적 판정",
    briefing: "2027년 12개월간의 험난했던 통상 대장정이 대단원의 막을 내렸습니다. 12번의 월간 무역 성적표가 모두 확정되었고, 중앙일보 1면 종합 결산 특별판과 대통령실의 최종 인사 평가가 눈앞에 다가왔습니다.",
    urgentCrisis: {
      id: "crisis_m12",
      title: "1년 임기 완주와 역사의 최종 평가",
      desc: "격랑의 통상 전쟁 1년을 완주한 통상교섭본부장으로서 어떤 마지막 메시지를 남기시겠습니까?",
      choices: [
        {
          text: "대국민 담화문을 발표하고 지난 1년간 피땀 흘려 경제를 지켜낸 기업과 국민에게 감사한다.",
          impact: { publicApproval: 8, presidentTrust: 8, businessTrust: 8 },
          summary: "초격차 수출 강국 청사진 발표 및 대국민 보고"
        },
        {
          text: "차기 정권을 위해 10년 대계의 '국가 신통상 안보 백서'를 국무회의에 헌정한다.",
          impact: { policyMomentum: 10, competitiveness: 8, presidentTrust: 6 },
          summary: "차기 연도 무역 드라이브 로드맵 공식 확정"
        }
      ]
    },
    negotiationPartnerId: "US",
    negotiationTitle: "1년 통상 외교 총결산 회고",
    negotiationDesc: "1년간의 대외 통상 협상 성과를 결산하고 차년도 프레임워크를 정립합니다.",
    negotiationButtonText: "📜 1년 통상 결산 보고 (1 AP) ➔",
    specialPolicy: {
      id: "special_policy_m12",
      category: "government",
      categoryName: "이달의 긴급 특별 결재",
      title: "[12월 특별 결재] 1년 임기 총결산 및 국가 통상 안보 10년 백서 국무회의 헌정",
      costText: "12개월 무역 성적표 역사적 확정, 국정 공헌도 및 명예 최고치 달성",
      impact: { presidentTrust: 10, publicApproval: 10, policyMomentum: 10 },
      executeImmediate(engine) {
        for (const ind of Object.values(engine.industryStates)) {
          ind.supportLevel += 2.0;
        }
      }
    },
    featuredCorpId: "samsung",
    featuredCorpTitle: "🇰🇷 대한민국 산업계 총결산",
    featuredCorpGreeting: "본부장님, 지난 1년 동안 미국 관세와 중국 보복, 환율 쇼크의 풍파 속에서 우리 제조업의 가장 든든한 방파제가 되어주셔서 진심으로 머리 숙여 감사드립니다.",
    featuredCorpOptions: [
      {
        text: "대한민국 경제의 엔진은 현장에서 땀 흘린 기업과 노동자 여러분이었습니다.",
        response: "[전국 경제계 대표단] '본부장님이 열어주신 수출길 위에서 대한민국 제조업은 다시 세계로 뜁니다!'",
        impact: { businessTrust: 10, publicApproval: 10, presidentTrust: 8 }
      },
      {
        text: "통상 전쟁은 끝이 없습니다. 기술 초격차 혁신을 절대 멈추지 마십시오.",
        response: "[산업계 연구원 일동] '초격차 기술로 통상 주권을 지켜내겠습니다!'",
        impact: { competitiveness: 10, policyMomentum: 8 }
      }
    ]
  }
};

export function getMonthlyChapter(month) {
  const m = Math.max(1, Math.min(12, month || 1));
  return MONTHLY_CHAPTERS[m];
}
