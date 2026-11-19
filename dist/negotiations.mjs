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
    this.status = "in_progress"; // in_progress, agreed, partial, deferred, broken
    this.finalAgreement = null;
    this.currentCounterDemand = null;

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

    this.totalScore += cardScore;
    this.tension = Math.max(0, Math.min(100, this.tension + cardTension));

    // Dynamic partner counter-demand based on score
    let partnerReaction = "";
    if (cardScore >= 28) {
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
      counterDemand: this.currentCounterDemand
    };

    this.history.push(stepResult);

    if (this.tension >= 92) {
      this.resolveBreakdown();
    }

    return stepResult;
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
    return this.finalAgreement;
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
