// negotiations.mjs - 6-Stage Interactive Bilateral Trade Negotiation Engine for 통상교섭본부장 | TRADE CZAR

export const NEGOTIATION_SCENARIOS = {
  US: {
    partnerId: "US",
    partnerName: "미국 무역대표부 (USTR)",
    representative: "캐서린 무역대표 (Ambassador Katherine)",
    flag: "🇺🇸",
    roomBackground: "negotiation-us.jpg",
    title: "한·미 특별 통상 협상 (Washington D.C.)",
    coreIssue: "미국의 보편관세(10%) 및 한국산 자동차 25% 품목 관세 철회 협상",
    intelReport: "대사관 첩보: 미 행정부의 최대 관심사는 600억 달러에 달하는 대미 무역적자 축소와 러스트벨트 일자리입니다. 미국산 LNG 수입 확대와 미 해군 조선 MRO 협력 카드를 결합하면 관세를 2.5%~5%로 낮출 수 있습니다. 단, 농산물(사과/쇠고기) 개방 요구를 전면 거부하면 결렬 위험이 높아집니다.",
    initialDemands: [
      "한국산 자동차 및 부품에 대해 기본 25% 품목관세 부과 방침",
      "한국의 대미 무역흑자 감축을 위한 미국산 에너지(LNG/원유) 연간 120억 달러 장기 구매",
      "미국산 사과·과일 검역 간소화 및 30개월령 이상 쇠고기 시장 전면 개방"
    ],
    initialTension: 65,
    minAcceptableScore: 50,
    counterDemands: {
      agri_push: "미 농무부와 상원 농업위의 압박이 거셉니다. 농산물 검역 완화 일정표가 포함되지 않으면 자동차 관세 면제는 어렵습니다.",
      energy_push: "LNG 구매 의무 조항의 최소 물량을 연간 100억 달러 이상으로 확정해 주십시오."
    },
    stakeholderOpinions: {
      auto: "현대차·기아: '25% 관세를 맞으면 대미 수출은 끝장납니다. 반드시 5% 이하로 막아주십시오!'",
      farmers: "전국농민총연맹: '자동차 수출을 위해 농민을 제물로 바치는 굴욕 협상은 결사항전으로 저지할 것입니다!'",
      finance: "재정경제부: '미국산 에너지 장기 구매는 대미 흑자를 줄여 환율 관찰대상국 압박을 완화하는 유용한 지렛대입니다.'"
    },
    cards: [
      {
        id: "us_lng",
        name: "🇺🇸 미국산 LNG 10년 장기 수입 계약 ($10B/년)",
        text: "카타르·호주산 비중을 줄이고 미국산 셰일 가스를 대규모로 직수입하여 대미 무역흑자를 줄여주겠다고 제안합니다.",
        cost: "국내 에너지 수입선 편중 위험",
        tensionDelta: -18,
        acceptanceScore: 28,
        stakeholderImpact: { businessTrust: 2, diplomaticTrust: 10, publicApproval: 0 },
        consequence: "대미 에너지 수입액 증가 ($1.0B/월) 및 무역흑자 축소. 미 행정부 무역적자 완화 만족."
      },
      {
        id: "us_investment",
        name: "🏭 현대차·삼성의 대미 150억 달러 추가 투자 및 일자리 공약",
        text: "조지아주 전기차 공장 확장 및 텍사스 반도체 패키징 라인 증설을 통한 현지 미국인 1만 명 직접 고용을 약속합니다.",
        cost: "국내 설비투자 일부 외유 우려",
        tensionDelta: -22,
        acceptanceScore: 32,
        stakeholderImpact: { businessTrust: 4, diplomaticTrust: 12, publicApproval: -2 },
        consequence: "미국 정치권의 강력한 지지 확보. 자동차 25% 관세 면제 명분 형성."
      },
      {
        id: "us_shipbuilding_mro",
        name: "⚓ 미 해군 군함 MRO 및 K-조선 안보 공급망 동맹",
        text: "미 해군 7함대 전투함 및 보급선의 유지보수·수리를 한국 조선소에 전담시키는 방산·조선 안보 패키지를 제안합니다.",
        cost: "미 존스법(Jones Act) 로비 필요",
        tensionDelta: -15,
        acceptanceScore: 24,
        stakeholderImpact: { businessTrust: 5, diplomaticTrust: 8, publicApproval: 4 },
        consequence: "K-조선의 대미 신규 시장 개척. 미 국방부의 전폭적인 통상 지원 사격 유도."
      },
      {
        id: "us_agri_concession",
        name: "🍎 미국산 농축산물 검역 절차의 단계적 간소화 수용",
        text: "미국산 사과·과일 및 축산물 검역 절차를 국제 기준에 맞춰 점진적으로 합리화하는 일정표를 제시합니다.",
        cost: "국내 농민 단체 대규모 상경 투쟁, 국민 지지율 -8%",
        tensionDelta: -25,
        acceptanceScore: 35,
        stakeholderImpact: { businessTrust: 0, diplomaticTrust: 15, publicApproval: -10 },
        consequence: "미국 의회 농업 벨트 지지 획득. 대미 관세 압박 전면 완화."
      },
      {
        id: "us_wto_warning",
        name: "⚖️ 한미 FTA 협정 위반 지적 및 WTO 공동 제소 불사 경고",
        text: "미국의 일방적 관세 부과는 한미 FTA 및 WTO 규범 위반임을 엄중히 경고하고 보복관세 조치를 검토하겠다고 압박합니다.",
        cost: "협상 파국 위험, 외교적 긴장 극대화",
        tensionDelta: 28,
        acceptanceScore: -12,
        stakeholderImpact: { businessTrust: -5, diplomaticTrust: -15, publicApproval: 6 },
        consequence: "미국 측의 격렬한 반발. 국민적 자주 통상 지지율 상승."
      }
    ]
  },
  CN: {
    partnerId: "CN",
    partnerName: "중국 상무부 (MOFCOM)",
    representative: "왕 부부장 (Vice Minister Wang)",
    flag: "🇨🇳",
    roomBackground: "negotiation-cn.jpg",
    title: "한·중 고위급 경제통상협상 (Beijing)",
    coreIssue: "중국발 철강·석유화학 저가 덤핑 완화 및 핵심 광물(희토류) 수출통제 해제",
    intelReport: "대사관 첩보: 중국은 미국의 대중 반도체 통제에 한국이 동참하는 것을 극도로 경계하고 있습니다. 순수 민간 차량용 반도체 정상 교역과 상호 투자 보장을 확인해 주면, 흑연·갈륨 쿼터를 우선 배정하고 철강 밀어내기 수출을 자율 규제할 여지가 있습니다.",
    initialDemands: [
      "한국의 미국의 대중 반도체·AI 수출 통제 동참 철회 및 첨단 메모리 무차별 공급",
      "중국산 배터리 소재 및 전기차에 대한 차별적 규제 금지",
      "한중 FTA 2단계(서비스·투자) 연내 조속 타결"
    ],
    initialTension: 60,
    minAcceptableScore: 45,
    counterDemands: {
      export_control_push: "미국의 일방적 대중 통제에 한국이 동참하지 않는다는 명시적 합의문 서명을 요구합니다.",
      market_access: "중국산 친환경 버스 및 재생에너지 설비에 대한 한국 정부의 보조금 차별을 철폐하십시오."
    },
    stakeholderOpinions: {
      semicon: "삼성·SK하이닉스: '중국 공장 가동을 위한 장비 반입과 민간 칩 판매선 유지가 절실합니다.'",
      steel: "포스코·석화협회: '중국발 저가 덤핑을 막지 못하면 여수와 포항 공장 문을 닫아야 합니다.'",
      us_embassy: "주한미국대사관: '한국이 대중 반도체 통제의 우회로가 되어서는 안 됩니다.'"
    },
    cards: [
      {
        id: "cn_rare_earth_hotline",
        name: "⛏️ 한·중 핵심 광물·희토류 공급망 직통 핫라인 구축",
        text: "갈륨·게르마늄·흑연 등 한국 배터리·반도체 기업용 광물의 통관 지연을 즉각 면제하는 보증 협정을 요구합니다.",
        cost: "중국산 소재 의존도 고착 우려",
        tensionDelta: -16,
        acceptanceScore: 26,
        stakeholderImpact: { businessTrust: 4, diplomaticTrust: 8, publicApproval: 2 },
        consequence: "국내 배터리·반도체 공장 원자재 공급 불안 해소."
      },
      {
        id: "cn_antidumping_bargain",
        name: "🛡️ 철강·석유화학 자율 수출 규제(VRA) 및 덤핑 조사 유예",
        text: "중국이 저가 밀어내기 물량을 자율 통제하는 조건으로, 한국 정부의 정식 반덤핑 관세 제소를 유예하겠다고 제안합니다.",
        cost: "국내 철강·석화 업계의 불만 일부 잔존",
        tensionDelta: -12,
        acceptanceScore: 25,
        stakeholderImpact: { businessTrust: 3, diplomaticTrust: 6, publicApproval: 1 },
        consequence: "국내 시장의 급격한 가격 붕괴 방어."
      },
      {
        id: "cn_neutral_tech",
        name: "🌐 한·중 기술 표준 및 민간 상업용 반도체 정상 교역 보장",
        text: "미국의 규제 범위 외 순수 민간 가전·차량용 반도체는 중국 시장에 안정적으로 공급하겠다는 원칙을 재확인합니다.",
        cost: "미국의 시선 경계 필요",
        tensionDelta: -22,
        acceptanceScore: 32,
        stakeholderImpact: { businessTrust: 5, diplomaticTrust: 10, publicApproval: -1 },
        consequence: "대중 반도체 수출 급감세 차단. 중국 측의 성의 있는 양보 유도."
      },
      {
        id: "cn_retaliation_threat",
        name: "⚠️ 중국산 핵심 부품 관세 인상 및 다자 공급망 연대 압박",
        text: "일방적 희토류 통제가 계속될 경우 IPEF(인도태평양 경제프레임워크) 국가들과 연대해 제재하겠다고 경고합니다.",
        cost: "한중 관계 냉각, 대중 수출 전반 보복 위험",
        tensionDelta: 25,
        acceptanceScore: -10,
        stakeholderImpact: { businessTrust: -6, diplomaticTrust: -14, publicApproval: 4 },
        consequence: "중국 측 강경 태도 고수. 협상 긴장도 폭증."
      }
    ]
  },
  EU: {
    partnerId: "EU",
    partnerName: "EU 통상집행위원회 (DG Trade)",
    representative: "헬레나 통상집행위원 (Commissioner Helena)",
    flag: "🇪🇺",
    roomBackground: "negotiation-multi.jpg",
    title: "한·EU 통상장관회담 (Brussels)",
    coreIssue: "EU CBAM(탄소국경조정제도) 한국산 철강·배터리 인정 및 자동차 규제 대응",
    intelReport: "대사관 첩보: EU는 기후 규범에서 절대적인 도덕적 우위를 고수하지만, 유럽 방위비 증강으로 K-방산(탱크, 자주포) 도입이 절실한 상황입니다. 방산 수출 및 친환경 수소 기술 협력을 지렛대로 삼으면 CBAM 검증 유예를 이끌어낼 수 있습니다.",
    initialDemands: [
      "한국 철강 기업의 탄소 배출 데이터 EU 기준 완전 공개 및 배출권 가격 차액 지불",
      "EU 공급망 실사 지침(CSDDD)의 엄격한 준수",
      "한국 시장 내 유럽산 프리미엄 자동차·풍력 터빈에 대한 비관세 장벽 철폐"
    ],
    initialTension: 50,
    minAcceptableScore: 45,
    counterDemands: {
      climate_mandate: "한국의 2030 온실가스 감축목표(NDC) 상향 계획을 공식 발표할 것을 요구합니다.",
      esg_audit: "한국 공급망 기업들의 노동·인권 실사 보고서 제출을 의무화하십시오."
    },
    stakeholderOpinions: {
      defense: "한화에어로·현대로템: 'K-방산 유럽 현지 합작 법인 설립을 지지해 주십시오.'",
      steel: "철강협회: 'EU 탄소 관세를 그대로 맞으면 대유럽 철강 수출 40%가 날아갑니다!'",
      green: "환경시민단체: '유럽의 선진 기후 기준을 수용하여 국내 산업 탈탄소를 가속화해야 합니다.'"
    },
    cards: [
      {
        id: "eu_defense_package",
        name: "🛡️ K-방산 유럽 거점 현지 생산 및 NATO 안보 공급망 제휴",
        text: "폴란드·루마니아 등 유럽 내 K-방산 현지 조립 라인을 구축하고 유럽 방위력 재건에 긴밀히 협력하겠다고 제안합니다.",
        cost: "국내 기술 이전 일부 수반",
        tensionDelta: -22,
        acceptanceScore: 32,
        stakeholderImpact: { businessTrust: 4, diplomaticTrust: 10, publicApproval: 3 },
        consequence: "K-방산의 유럽 진출 확대 및 EU 집행위의 유화적 태도 전환."
      },
      {
        id: "eu_cbam_equivalency",
        name: "🌿 한국 배출권거래제(K-ETS)와 EU-ETS 상호 동등성 인정 협약",
        text: "한국 철강·화학 기업이 이미 납부한 국내 탄소배출권 비용을 100% 공제해 달라고 공식 요구합니다.",
        cost: "국내 탄소배출권 유상할당 비율 확대 압박",
        tensionDelta: -16,
        acceptanceScore: 28,
        stakeholderImpact: { businessTrust: 5, diplomaticTrust: 8, publicApproval: 2 },
        consequence: "대EU 철강·배터리 탄소 관세 폭탄 면제."
      },
      {
        id: "eu_renewables_partner",
        name: "💨 유럽산 해상풍력 터빈 및 수소 기술 국내 프로젝트 구매",
        text: "국내 서남해 해상풍력 발전단지에 유럽산 터빈 도입을 확대하겠다고 제안합니다.",
        cost: "국내 발전 부품 업계 반발",
        tensionDelta: -14,
        acceptanceScore: 22,
        stakeholderImpact: { businessTrust: -2, diplomaticTrust: 8, publicApproval: 1 },
        consequence: "EU 산업계 로비 환호. 한·EU 친환경 무역동맹 체결."
      }
    ]
  }
};

export class NegotiationEngine {
  constructor(partnerId, origin, prng) {
    this.scenario = NEGOTIATION_SCENARIOS[partnerId] || NEGOTIATION_SCENARIOS.US;
    this.origin = origin;
    this.prng = prng;

    this.stage = 1; // 1: Initial Demands, 2: Condition Review, 3: Play Card, 4: Partner Reaction, 5: Stakeholder Feedback, 6: Concluded
    this.tension = this.scenario.initialTension;
    this.totalScore = 0;
    this.history = [];
    this.usedCards = new Set();
    this.status = "in_progress"; // in_progress, agreed, partial, deferred, broken, suspended
    this.finalAgreement = null;
    this.currentCounterDemand = null;
    this.consecutiveAggressiveCount = 0;

    // Two-Level Game (국내 이해관계자 재협의 체계)
    this.domesticState = {
      agriConsensus: false,
      parliamentConsensus: false,
      chaebolBurdenShare: false
    };

    // Origin bonus
    if (origin === 'bureaucrat') {
      this.totalScore += 12; // Career diplomat bonus
    } else if (origin === 'industry_expert') {
      this.totalScore += 5;
    } else if (origin === 'politician') {
      this.tension += 4;
    }
  }

  // Play a negotiation card
  playCard(cardId) {
    if (this.usedCards.has(cardId) || this.status !== 'in_progress') return null;

    const card = this.scenario.cards.find(c => c.id === cardId);
    if (!card) return null;

    this.usedCards.add(cardId);

    // Roll PRNG variation
    const roll = this.prng.range(-3, 3);
    let cardScore = card.acceptanceScore + roll;
    let cardTension = card.tensionDelta;

    if (this.origin === 'bureaucrat') {
      cardScore += 4;
      if (cardTension < 0) cardTension -= 4;
    } else if (this.origin === 'industry_expert' && (cardId.includes('investment') || cardId.includes('mro') || cardId.includes('defense'))) {
      cardScore += 6; // Corporate expert has real credibility with capital cards
    }

    // Dynamic counterplay logic (반복 강경 카드 응징 및 상대국 역제안 수용 보상)
    const isAggressive = (card.tensionDelta > 0 || card.acceptanceScore < 0);
    if (isAggressive) {
      this.consecutiveAggressiveCount = (this.consecutiveAggressiveCount || 0) + 1;
      if (this.consecutiveAggressiveCount >= 2) {
        cardTension += 8;
        cardScore -= 6;
      }
    } else {
      this.consecutiveAggressiveCount = 0;
    }

    let answeredCounterDemand = false;
    if (this.currentCounterDemand) {
      if ((cardId === 'us_lng' || cardId === 'us_agri_concession') && this.scenario.partnerId === 'US') {
        answeredCounterDemand = true;
        cardScore += 8;
        cardTension -= 6;
        this.currentCounterDemand = null;
      } else if ((cardId === 'cn_neutral_tech' || cardId === 'cn_antidumping_bargain') && this.scenario.partnerId === 'CN') {
        answeredCounterDemand = true;
        cardScore += 8;
        cardTension -= 6;
        this.currentCounterDemand = null;
      } else if ((cardId === 'eu_defense_package' || cardId === 'eu_cbam_equivalency') && this.scenario.partnerId === 'EU') {
        answeredCounterDemand = true;
        cardScore += 8;
        cardTension -= 6;
        this.currentCounterDemand = null;
      }
    }

    this.totalScore += cardScore;
    this.tension = Math.max(0, Math.min(100, this.tension + cardTension));

    // Two-Level Game adjustments for sensitive cards
    let domesticNote = "";
    if (cardId === 'us_agri_concession') {
      if (this.domesticState.agriConsensus) {
        // Protected by 1조원 relief fund
        card.stakeholderImpact = { businessTrust: 2, diplomaticTrust: 15, publicApproval: -2 };
        domesticNote = "[국내 당정 합의] 1조 원 피해 보완 직불금 및 상생기금 합의에 따라 전국농민총연맹이 대승적으로 검역 합리화를 양해했습니다.";
      } else {
        // Severe domestic blowback
        card.stakeholderImpact = { businessTrust: -2, diplomaticTrust: 15, publicApproval: -14 };
        domesticNote = "[국내 여론 폭발] 사전 협의 없는 일방적 농산물 양보에 전국 농민 5만 명이 트랙터를 몰고 광화문 상경 투쟁에 돌입했습니다!";
      }
    }

    // Dynamic partner reaction text
    let partnerReaction = "";
    if (this.consecutiveAggressiveCount >= 2) {
      partnerReaction = `[${this.scenario.representative} 강경 경고] "일방적인 압박과 강경 카드가 거듭되고 있습니다. 이런 방식은 협상 결렬만을 재촉할 뿐입니다!"`;
    } else if (answeredCounterDemand) {
      partnerReaction = `[${this.scenario.representative} 적극 환영] "우리 측의 핵심 요구사항을 진지하게 고려해 주신 대승적 결단에 감사드립니다. 양국 타결의 결정적 돌파구가 마련되었습니다!"`;
    } else if (cardScore >= 28) {
      partnerReaction = `[${this.scenario.representative}] "매우 인상적이고 건설적인 제안입니다. 우리 측 핵심 이해관계를 충족시켜 주는 진지한 결단에 경의를 표합니다."`;
    } else if (cardScore >= 15) {
      partnerReaction = `[${this.scenario.representative}] "한 걸음 진전된 카드이나, 여전히 우리 의회와 산업계의 눈높이에는 다소 부족합니다. 추가적인 성의를 기대합니다."`;
      if (this.scenario.counterDemands && !this.currentCounterDemand) {
        const keys = Object.keys(this.scenario.counterDemands);
        this.currentCounterDemand = this.scenario.counterDemands[keys[0]];
      }
    } else if (cardScore >= 0) {
      partnerReaction = `[${this.scenario.representative}] "기술적인 설명은 잘 들었으나 실질적인 양보가 부족합니다. 이대로는 본국을 설득하기 어렵습니다."`;
    } else {
      partnerReaction = `[${this.scenario.representative}] "유감스럽군요. 이런 식의 강경 대응과 압박은 양국 통상 관계를 파국으로 몰고 갈 뿐입니다!"`;
    }

    const stepResult = {
      card,
      cardScore,
      cardTension,
      currentTension: this.tension,
      currentScore: this.totalScore,
      partnerReaction,
      counterDemand: this.currentCounterDemand,
      domesticNote
    };

    this.history.push(stepResult);

    if (this.tension >= 92) {
      this.resolveBreakdown();
    }

    return stepResult;
  }

  consultDomestic(actionId, politicsManager) {
    if (actionId === 'agri_relief_fund') {
      if (politicsManager && politicsManager.stats.politicalCapital < 15) {
        return { success: false, reason: "국회 및 당정 설득을 위한 정치적 자산(최소 15pt)이 부족합니다." };
      }
      if (politicsManager) politicsManager.stats.politicalCapital -= 15;
      this.domesticState.agriConsensus = true;
      return {
        success: true,
        actionId,
        title: "당정 협의: 1조 원 농축산 피해보완 직불금 및 상생기금 조성",
        description: "기획예산처 및 농림축산식품부와 긴급 당정협의회를 열어 1조 원 규모의 검역 개방 피해보완 기금을 확정했습니다. 농민단체의 극단적 반발을 완화하고 통상 협상 카드를 확보했습니다."
      };
    } else if (actionId === 'parliament_pre_ratify') {
      if (politicsManager && politicsManager.stats.politicalCapital < 10) {
        return { success: false, reason: "국회 상임위 조율을 위한 정치적 자산(최소 10pt)이 부족합니다." };
      }
      if (politicsManager) politicsManager.stats.politicalCapital -= 10;
      this.domesticState.parliamentConsensus = true;
      return {
        success: true,
        actionId,
        title: "국회 여야 통상소위 사전설명 및 비준 공감대 확보",
        description: "산업통상자원중소벤처기업위원회 비공개 간담회를 통해 여야 원내대표단에 불가피한 통상 양보의 필요성을 설명하고 초당적 비준 협력을 약속받았습니다."
      };
    } else if (actionId === 'chaebol_burden_share') {
      this.domesticState.chaebolBurdenShare = true;
      if (politicsManager) politicsManager.stats.businessTrust = Math.max(0, politicsManager.stats.businessTrust - 5);
      return {
        success: true,
        actionId,
        title: "4대 그룹 총수 간담회: 대미 투자 펀드 매칭 및 협력사 상생 협약",
        description: "재계 총수들과 긴급 조찬 회동을 갖고 미국 현지 투자 집행 일정 공개와 2·3차 부품 협력사 동반진출 지원 펀드 5,000억 원 조성을 합의했습니다."
      };
    }
    return { success: false, reason: "유효하지 않은 국내 협의 항목입니다." };
  }

  suspendSession() {
    this.status = "suspended";
    return {
      status: "suspended",
      title: "협상 일시 정회 및 차월 재개 합의",
      description: "양국 수석대표 간 추가 조율과 본국 훈령 갱신을 위해 협상 회기를 다음 달로 공식 이월했습니다. 기존 협상 점수와 긴장도는 동결됩니다."
    };
  }

  resumeSession() {
    if (this.status === "suspended") {
      this.status = "in_progress";
      return { success: true, message: "회담이 속개되었습니다." };
    }
    return { success: false, message: "정회 상태가 아닙니다." };
  }

  conclude(choice = 'agree') {
    if (choice === 'breakdown') {
      return this.resolveBreakdown();
    }
    if (choice === 'defer') {
      return this.resolveDeferral();
    }

    // Attempting agreement
    const minScore = this.scenario.minAcceptableScore || 45;
    if (this.totalScore >= minScore + 10 && this.tension <= 60) {
      // Full historic agreement (대타결)
      this.status = "agreed";
      this.finalAgreement = {
        type: "agreed",
        grade: "대타결 (Historic Agreement)",
        title: `${this.scenario.partnerName} 통상협상 대타결!`,
        tariffRate: this.scenario.partnerId === 'US' ? 0.025 : 0.02,
        usAutoTariff: 0.025,
        energyQuotaMod: this.usedCards.has('us_lng') ? 1.0 : 0.0,
        relationDelta: 20,
        domesticGrowthBoost: 0.05,
        description: `양국 간의 첨예한 통상 마찰을 극적으로 타결시켰습니다. ${this.scenario.partnerId === 'US' ? '한국산 자동차 관세는 2.5%로 대폭 방어되었으며' : '핵심 공급망과 관세 장벽이 전면 정상화되었으며'}, 상호 신뢰가 회복되었습니다.`
      };
    } else if (this.totalScore >= minScore && this.tension <= 75) {
      // Conditional compromise (조건부 절충)
      this.status = "agreed";
      this.finalAgreement = {
        type: "agreed",
        grade: "조건부 절충 (Conditional Compromise)",
        title: `${this.scenario.partnerName} 조건부 절충안 서명`,
        tariffRate: this.scenario.partnerId === 'US' ? 0.08 : 0.05,
        usAutoTariff: 0.08,
        energyQuotaMod: this.usedCards.has('us_lng') ? 0.5 : 0.0,
        relationDelta: 8,
        domesticGrowthBoost: 0.02,
        description: `완벽한 관세 철회에는 미치지 못했으나, 최악의 보복 관세를 피하고 8% 수준의 절충 관세로 연착륙시켰습니다.`
      };
    } else {
      // Failed to meet requirements -> Deferral
      return this.resolveDeferral();
    }

    this.finalAgreement.tradeOffSummary = this.generateTradeOffSummary();
    return this.finalAgreement;
  }

  resolveDeferral() {
    this.status = "deferred";
    this.finalAgreement = {
      type: "deferred",
      grade: "협상 유예 (Extension & Grace Period)",
      title: `${this.scenario.partnerName} 추가 협상 3개월 연장 합의`,
      tariffRate: this.scenario.partnerId === 'US' ? 0.25 : 0.05,
      usAutoTariff: 0.25,
      energyQuotaMod: 0.0,
      relationDelta: -5,
      domesticGrowthBoost: 0.0,
      description: `이견을 좁히지 못하고 현행 잠정 관세율을 유지한 채 3개월 뒤 실무 협상을 재개하기로 합의했습니다. 불확실성이 지속됩니다.`
    };
    this.finalAgreement.tradeOffSummary = this.generateTradeOffSummary();
    return this.finalAgreement;
  }

  resolveBreakdown() {
    this.status = "broken";
    this.finalAgreement = {
      type: "broken",
      grade: "협상 결렬 (Negotiation Breakdown)",
      title: `${this.scenario.partnerName} 통상 담판 전격 결렬!`,
      tariffRate: this.scenario.partnerId === 'US' ? 0.25 : 0.15,
      usAutoTariff: 0.25,
      energyQuotaMod: 0.0,
      relationDelta: -25,
      domesticGrowthBoost: -0.08,
      description: `상대국과의 이견이 폭발하며 협상이 결렬되었습니다. ${this.scenario.partnerId === 'US' ? '미국의 25% 보복 관세가 즉각 발효되며 주력 자동차 수출에 치명적 타격이 시작됩니다.' : '상대국의 징벌적 관세와 무역 장벽이 즉각 현실화됩니다.'}`
    };
    this.finalAgreement.tradeOffSummary = this.generateTradeOffSummary();
    return this.finalAgreement;
  }

  generateTradeOffSummary() {
    const pId = this.scenario.partnerId;
    const isAgreed = this.status === 'agreed';
    const isDeferred = this.status === 'deferred';
    const summary = {
      gains: [],
      concessions: [],
      diplomaticSpillover: ""
    };

    if (pId === 'US') {
      if (isAgreed) {
        summary.gains.push("한국산 승용차 및 자동차 부품 보편관세를 2.5% 수준으로 대폭 방어 (연간 약 150억 달러 수출 보호)");
        if (this.usedCards.has('us_shipbuilding_mro')) {
          summary.gains.push("미 해군 7함대 군함 MRO 및 특수선 수주 보증 획득 (매월 수억 달러 서비스 수출 창출)");
        }
        if (this.usedCards.has('us_lng')) {
          summary.concessions.push("미국산 LNG 연간 100억 달러 10년 장기 수입 계약 체결 (에너지 수입선 대미 편중 수용)");
        }
        if (this.usedCards.has('us_investment')) {
          summary.concessions.push("현대차·삼성의 대미 150억 달러 추가 투자 및 조지아·텍사스 현지 고용 공약");
        }
        if (this.usedCards.has('us_agri_concession')) {
          summary.concessions.push("미국산 농축산물 검역 간소화 로드맵 수용 (국내 1조 원 피해보완 직불금 기금 투입)");
        }
        summary.diplomaticSpillover = "대미 안보·통상 결속 강화로 대미 흑자 압박은 해소되었으나, 중국과의 기술 교역 마찰에 대한 정교한 관리 필요";
      } else if (isDeferred) {
        summary.gains.push("즉각적인 25% 보편관세 집행 3개월 일시 유예");
        summary.concessions.push("불확실성 장기화로 현대차·기아 현지 설비 전환 비용 발생");
        summary.diplomaticSpillover = "미 의회 보호무역 강경파의 추가 압박 예고";
      } else {
        summary.gains.push("자주적 통상 주권 천명 및 일방적 농업·에너지 양보 거부");
        summary.concessions.push("미국의 25% 품목관세 전면 부과 직격탄, 자동차 수출선 붕괴 위기");
        summary.diplomaticSpillover = "한미 통상 동맹 전례 없는 냉각 및 WTO 분쟁 격화";
      }
    } else if (pId === 'CN') {
      if (isAgreed) {
        summary.gains.push("갈륨·게르마늄·흑연 등 배터리·반도체 핵심 원자재 통관 지연 해제");
        summary.gains.push("중국산 철강·석유화학 저가 덤핑 자율 수출 규제(VRA) 합의로 국내 시장 안정");
        if (this.usedCards.has('cn_neutral_tech')) {
          summary.concessions.push("순수 상업용 민간 차량·가전 반도체의 안정적 대중 공급 원칙 재확인");
        }
        summary.diplomaticSpillover = "한중 공급망 핫라인 복원으로 공급망 불안 해소, 미국 측의 견제 시선 상시 관리 필요";
      } else if (isDeferred) {
        summary.gains.push("상호 제재 확전 방지 및 실무 협의체 유지");
        summary.concessions.push("핵심 원자재 통관 지연 불확실성 잔존");
        summary.diplomaticSpillover = "동북아 경제 협력 회의 지연";
      } else {
        summary.gains.push("다자간 공급망 연대 규범 수호");
        summary.concessions.push("중국 상무부의 추가 광물 통제 및 한국산 석화제품 반덤핑 조사 직면");
        summary.diplomaticSpillover = "대중 교역 관계 급랭 및 배터리 공급망 비상";
      }
    } else if (pId === 'EU') {
      if (isAgreed) {
        summary.gains.push("한국 배출권거래제(K-ETS)와 EU-ETS 상호 동등성 인정 협약으로 CBAM 탄소세 폭탄 면제");
        if (this.usedCards.has('eu_defense_package')) {
          summary.gains.push("K-방산 유럽 거점 현지 생산 및 NATO 안보 공급망 동맹 강화");
        }
        if (this.usedCards.has('eu_renewables_partner')) {
          summary.concessions.push("국내 해상풍력 프로젝트에 유럽산 터빈 도입 확대");
        }
        summary.diplomaticSpillover = "유럽과의 친환경·방산 공급망 동맹 결속 및 다자 규범 리더십 확보";
      } else if (isDeferred) {
        summary.gains.push("CBAM 본격 과세 유예 기간 확보");
        summary.concessions.push("철강·배터리 기업들의 탄소 배출 실사 비용 부담 지속");
        summary.diplomaticSpillover = "브뤼셀 기후 집행위와의 지속적 마찰";
      } else {
        summary.gains.push("국내 제조업 산업 경쟁력 중심 원칙 고수");
        summary.concessions.push("EU CBAM 탄소 관세 전면 부과로 대유럽 철강·배터리 수출 급감");
        summary.diplomaticSpillover = "한·EU 기후 협력 파트너십 균열";
      }
    }

    return summary;
  }

  applyToEconomy(engine) {
    if (!this.finalAgreement) return;
    const pState = engine.partnerStates[this.scenario.partnerId];
    if (!pState) return;

    if (this.scenario.partnerId === 'US') {
      pState.tariffs.automobile = this.finalAgreement.usAutoTariff;
      pState.tariffs.general = this.finalAgreement.tariffRate;
      pState.energyQuotaMod = this.finalAgreement.energyQuotaMod || 0.0;
    } else if (this.scenario.partnerId === 'CN') {
      pState.tariffs.petrochemical = this.finalAgreement.tariffRate;
      pState.tariffs.steel = this.finalAgreement.tariffRate;
    } else if (this.scenario.partnerId === 'EU') {
      pState.tariffs.steel = this.finalAgreement.tariffRate;
      pState.tariffs.battery = this.finalAgreement.tariffRate;
    }
  }
}

export class ForeignPolicyManager {
  constructor() {
    this.proactiveThreatHistory = [];
    this.threatFlags = {
      usUltimatumIssued: false,
      usHbmPressureIssued: false,
      chinaSteelDumpingIssued: false,
      chinaRareEarthRetaliationIssued: false,
      euCbamNoticeIssued: false
    };
  }

  checkMonthlyProactiveThreats(month, economyEngine, politicsManager, activeAgreements = []) {
    const threats = [];

    // 1. Month 3: US Universal Tariff Ultimatum (미국의 능동적 통상 공세)
    if (month === 3 && !this.threatFlags.usUltimatumIssued) {
      const usAgreed = activeAgreements.some(a => a.partnerId === 'US' && a.type === 'agreed');
      if (!usAgreed) {
        this.threatFlags.usUltimatumIssued = true;
        const threat = {
          partnerId: 'US',
          partnerName: '미국 USTR (무역대표부)',
          severity: 'critical',
          headline: '미 USTR, "60일 내 대미 무역흑자 축소 로드맵 미제출 시 보편관세 25% 전면 발효" 공식 최후통첩!',
          description: '워싱턴 통상 당국이 한국의 2026년 대미 무역흑자(약 550억 달러)를 정조준하며 통상법 301조에 근거한 상호주의 보편관세 부과 시한을 5월 1일로 못박았습니다.',
          economicImpactText: '대미 자동차·부품 수출 채산성 붕괴 위험, 환율 변동성 확대',
          actionPrompt: '4월 이전 대미 고위급 협상 개시 또는 에너지 수입 쿼터 다변화 검토 요망'
        };
        threats.push(threat);
        this.proactiveThreatHistory.push({ month, ...threat });
      }
    }

    // 2. Month 2: China Steel & Petrochemical Dumping (중국의 저가 밀어내기 공세)
    if (month === 2 && !this.threatFlags.chinaSteelDumpingIssued) {
      this.threatFlags.chinaSteelDumpingIssued = true;
      // Slight downward pressure on petrochemical/steel margins
      if (economyEngine && economyEngine.partnerStates.CN) {
        const cnTariffs = economyEngine.partnerStates.CN.tariffs;
        cnTariffs.petrochemical = (cnTariffs.petrochemical ?? cnTariffs.general ?? 0.03) + 0.02;
        cnTariffs.steel = (cnTariffs.steel ?? cnTariffs.general ?? 0.03) + 0.02;
      }
      const threat = {
        partnerId: 'CN',
        partnerName: '중국 상무부 및 국유 철강·석화사',
        severity: 'high',
        headline: '중국 내수 침체발 헐값 철강·석화 밀어내기 수출 폭증, 아시아 현물가 20% 폭락',
        description: '중국 부동산 경기 둔화로 남아도는 잉여 철강과 에틸렌이 한국과 동남아 시장에 원가 이하로 쏟아지며 국내 여수·울산 석유화학 콤플렉스와 포항 제철소 가동률이 급락하고 있습니다.',
        economicImpactText: '국내 석화·철강업계 분기 적자 전환 및 가동률 저하',
        actionPrompt: '대중 반덤핑 상계관세 제소 및 고부가가치 특수강 전환 긴급 지원 필요'
      };
      threats.push(threat);
      this.proactiveThreatHistory.push({ month, ...threat });
    }

    // 3. Month 5: EU CBAM Carbon Border Tax Rejection (EU의 선제적 규제 공세)
    if (month === 5 && !this.threatFlags.euCbamNoticeIssued) {
      const euAgreed = activeAgreements.some(a => a.partnerId === 'EU' && a.type === 'agreed');
      if (!euAgreed) {
        this.threatFlags.euCbamNoticeIssued = true;
        if (economyEngine && economyEngine.partnerStates.EU) {
          const euTariffs = economyEngine.partnerStates.EU.tariffs;
          euTariffs.steel = (euTariffs.steel ?? euTariffs.general ?? 0.03) + 0.03;
        }
        const threat = {
          partnerId: 'EU',
          partnerName: 'EU 집행위원회 (탄소총국)',
          severity: 'high',
          headline: 'EU 집행위, "한국 배출권거래제(K-ETS) 탄소단가 불인정... 2027 CBAM 전면 과세 강행" 통보',
          description: '브뤼셀이 한국의 K-ETS 무상할당 비율과 낮은 탄소 시장가격을 문제 삼으며 차액 전액을 CBAM 인증서로 납부할 것을 요구했습니다. 철강 1톤당 약 85유로의 추가 관세가 불가피해집니다.',
          economicImpactText: '대EU 철강 및 알루미늄 수출 가격경쟁력 심각한 훼손',
          actionPrompt: 'EU 양자 실무협상 개시 및 국내 철강 수소환원제철 R&D 전환 바우처 가동'
        };
        threats.push(threat);
        this.proactiveThreatHistory.push({ month, ...threat });
      }
    }

    // 4. Month 7: US HBM Export Control to China (미국의 기술동맹 이행 압박)
    if (month === 7 && !this.threatFlags.usHbmPressureIssued) {
      this.threatFlags.usHbmPressureIssued = true;
      const threat = {
        partnerId: 'US',
        partnerName: '미 상무부 산업안보국(BIS)',
        severity: 'critical',
        headline: '미 BIS, "한국산 최첨단 AI 반도체(HBM3E) 중국 우회 공급 즉각 차단하라" 비공식 통보',
        description: '미 정부가 한국 메모리 반도체 대기업의 중국향 HBM 수출 전수조사 및 미국의 대중 수출통제 품목군 일치화를 요구했습니다. 불응 시 미국 장비 반입 라이선스 취소를 시사했습니다.',
        economicImpactText: '대중 반도체 수출 단기 급감 vs 미국 시장 신뢰 수호의 갈림길',
        actionPrompt: '미국 고위급 통상채널 가동 및 기업 수출허가제 유예 협상 급선무'
      };
      threats.push(threat);
      this.proactiveThreatHistory.push({ month, ...threat });
    }

    // 5. China Rare Earth retaliation if Korea aligns heavily with US
    const usDeal = activeAgreements.find(a => a.partnerId === 'US' && a.type === 'agreed');
    if (month >= 8 && usDeal && !this.threatFlags.chinaRareEarthRetaliationIssued) {
      this.threatFlags.chinaRareEarthRetaliationIssued = true;
      const threat = {
        partnerId: 'CN',
        partnerName: '중국 세관총서 및 상무부',
        severity: 'high',
        headline: '중국 세관총서, "한국행 배터리용 구형흑연·희토류 수출 통관 전수검사" 전격 착수',
        description: '한미 통상 협력 및 대미 투자 확대에 대한 보복 조치로, 중국 세관이 한국 2차전지 및 방산 부품용 핵심 광물에 대해 이중용도 품목 수출 허가 심사를 대폭 지연시키기 시작했습니다.',
        economicImpactText: '국내 배터리·영구자석 원자재 재고 45일치로 위험 수준 근접',
        actionPrompt: '호주·베트남·인니 대체 공급망 바우처 발동 및 한중 통상장관급 대화 타진'
      };
      threats.push(threat);
      this.proactiveThreatHistory.push({ month, ...threat });
    }

    return threats;
  }
}

