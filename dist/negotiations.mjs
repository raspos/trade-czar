// negotiations.mjs - Multi-Turn Interactive Bilateral Trade Negotiation Engine

export const NEGOTIATION_SCENARIOS = {
  US: {
    partnerId: "US",
    partnerName: "미국 무역대표부 (USTR)",
    representative: "캐서린 무역대표 (Ambassador Katherine)",
    roomBackground: "negotiation-us.jpg",
    title: "한·미 특별 통상 협상 (Washington D.C.)",
    coreIssue: "미국의 보편관세(10%) 및 한국산 자동차 25% 품목 관세 철회 협상",
    intelReport: "대사관 첩보: 미 행정부의 최대 관심사는 600억 달러에 달하는 대미 무역적자 축소와 러스트벨트 제조업 일자리입니다. 미국산 LNG 수입 확대와 미 해군 조선 MRO 협력 카드를 결합하면 관세를 5% 이하로 낮출 공간이 있습니다. 단, 농산물(사과/쇠고기) 개방 요구는 결코 쉽게 물러서지 않을 것입니다.",
    partnerDemands: [
      "한국산 자동차 및 부품에 대해 기본 25% 수입 관세 부과 방침",
      "한국의 대미 흑자 감축을 위한 미국산 에너지(LNG/원유) 연간 150억 달러 의무 구매",
      "미국산 쇠고기 30개월령 이상 제한 철폐 및 사과·배 농산물 검역 전면 개방"
    ],
    initialTension: 65,
    cards: [
      {
        id: "us_lng",
        name: "🇺🇸 미국산 LNG 10년 장기 수입 계약 ($12B/년)",
        text: "카타르·호주산 비중을 줄이고 미국산 셰일 가스를 대규모로 직수입하여 대미 무역흑자를 줄여주겠다고 제안합니다.",
        cost: "에너지 수입선 다변화, 중동과의 마찰 가능성",
        tensionDelta: -20,
        acceptanceScore: 28,
        consequence: "대미 에너지 수입액 증가 및 무역흑자 축소. 미 행정부 무역적자 완화 만족."
      },
      {
        id: "us_investment",
        name: "🏭 현대차·삼성의 대미 150억 달러 추가 투자 및 일자리 공약",
        text: "조지아주 전기차 공장 확장 및 텍사스 반도체 패키징 라인 증설을 통한 현지 미국인 1만 명 직접 고용을 약속합니다.",
        cost: "국내 설비투자 일부 외유, 국내 노조 반발",
        tensionDelta: -25,
        acceptanceScore: 35,
        consequence: "미국 정치권의 강력한 지지 확보. 자동차 25% 관세 면제 명분 형성."
      },
      {
        id: "us_shipbuilding_mro",
        name: "⚓ 미 해군 군함 MRO 및 K-조선 안보 공급망 동맹",
        text: "미 해군 7함대 전투함 및 보급선의 유지보수·수리를 한국 조선소에 전담시키는 방산·조선 안보 패키지를 제안합니다.",
        cost: "미 존스법(Jones Act) 로비 필요",
        tensionDelta: -15,
        acceptanceScore: 25,
        consequence: "K-조선의 대미 신규 시장 개척. 미 국방부의 전폭적인 통상 지원 사격 유도."
      },
      {
        id: "us_agri_concession",
        name: "🍎 미국산 농축산물 검역 절차의 단계적 간소화 수용",
        text: "미국산 사과·과일 및 축산물 검역 검사를 점진적으로 완화하는 일정표를 제시합니다.",
        cost: "국내 농민 단체 대규모 상경 투쟁, 국민 지지율 -10%",
        tensionDelta: -20,
        acceptanceScore: 30,
        consequence: "미국 의회 농업 벨트 지지 획득. 대미 관세 압박 전면 완화."
      },
      {
        id: "us_wto_warning",
        name: "⚖️ 한미 FTA 협정 위반 지적 및 WTO 공동 제소 불사 경고",
        text: "미국의 일방적 관세 부과는 한미 FTA 및 WTO 규범 위반임을 엄중히 경고하고 보복관세 조치를 검토하겠다고 압박합니다.",
        cost: "협상 파국 위험, 외교적 긴장 극대화",
        tensionDelta: 30,
        acceptanceScore: -15,
        consequence: "미국 측의 격렬한 반발. 국민적 자주 통상 지지율 상승."
      }
    ]
  },
  CN: {
    partnerId: "CN",
    partnerName: "중국 상무부 (MOFCOM)",
    representative: "왕 부부장 (Vice Minister Wang)",
    roomBackground: "negotiation-cn.jpg",
    title: "한·중 고위급 경제통상협상 (Beijing)",
    coreIssue: "중국발 철강·석유화학 저가 덤핑 완화 및 핵심 광물(희토류) 수출통제 해제",
    intelReport: "대사관 첩보: 중국은 미국의 대중 반도체 장비 통제에 한국이 동참하는 것을 극도로 경계하고 있습니다. 첨단 소재 공급망에서 한국의 균형 잡힌 중립성을 확인해 주면, 희토류 쿼터를 안정적으로 배정하고 철강 밀어내기 수출을 자율 규제할 여지가 있습니다.",
    partnerDemands: [
      "한국의 미국의 대중 반도체·AI 수출 통제 동참 철회 및 첨단 메모리 무차별 공급",
      "중국산 배터리 소재 및 전기차에 대한 차별적 규제 금지",
      "한중 FTA 2단계(서비스·투자) 연내 조속 타결"
    ],
    initialTension: 60,
    cards: [
      {
        id: "cn_rare_earth_hotline",
        name: "⛏️ 한·중 핵심 광물·희토류 공급망 직통 핫라인 구축",
        text: "갈륨·게르마늄·흑연 등 한국 배터리·반도체 기업용 광물의 통관 지연을 즉각 면제하는 보증 협정을 요구합니다.",
        cost: "중국산 소재 의존도 고착 우려",
        tensionDelta: -15,
        acceptanceScore: 25,
        consequence: "국내 배터리·반도체 공장 원자재 공급 불안 해소."
      },
      {
        id: "cn_antidumping_bargain",
        name: "🛡️ 철강·석유화학 자율 수출 규제(VRA) 및 덤핑 조사 유예",
        text: "중국이 저가 밀어내기 물량을 자율 통제하는 조건으로, 한국 정부의 정식 반덤핑 관세 제소를 유예하겠다고 제안합니다.",
        cost: "국내 철강·석화 업계의 불만 일부 잔존",
        tensionDelta: -10,
        acceptanceScore: 25,
        consequence: "국내 시장의 급격한 가격 붕괴 방어."
      },
      {
        id: "cn_neutral_tech",
        name: "🌐 한·중 기술 표준 및 민간 상업용 반도체 정상 교역 보장",
        text: "미국의 규제 범위 외 순수 민간 가전·차량용 반도체는 중국 시장에 안정적으로 공급하겠다는 원칙을 재확인합니다.",
        cost: "미국의 시선 경계 필요",
        tensionDelta: -20,
        acceptanceScore: 35,
        consequence: "대중 반도체 수출 급감세 차단. 중국 측의 성의 있는 양보 유도."
      },
      {
        id: "cn_retaliation_threat",
        name: "⚠️ 중국산 핵심 부품 관세 인상 및 다자 공급망 연대 압박",
        text: "일방적 희토류 통제가 계속될 경우 IPEF(인도태평양 경제프레임워크) 국가들과 연대해 제재하겠다고 경고합니다.",
        cost: "한중 관계 냉각, 대중 수출 전반 보복 위험",
        tensionDelta: 25,
        acceptanceScore: -10,
        consequence: "중국 측 강경 태도 고수. 협상 긴장도 폭증."
      }
    ]
  },
  EU: {
    partnerId: "EU",
    partnerName: "EU 통상집행위원회 (DG Trade)",
    representative: "헬레나 통상집행위원 (Commissioner Helena)",
    roomBackground: "negotiation-multi.jpg",
    title: "한·EU 통상장관회담 (Brussels)",
    coreIssue: "EU CBAM(탄소국경조정제도) 한국산 철강·배터리 인정 및 자동차 규제 대응",
    intelReport: "대사관 첩보: EU는 기후 규범에서 절대적인 도덕적 우위를 고수하지만, 우크라이나 전후 유럽 방위비 증강으로 K-방산(탱크, 자주포) 도입이 절실한 상황입니다. 방산 수출 및 녹색 기술 협력을 지렛대로 삼으면 CBAM 보고 의무 유예를 이끌어낼 수 있습니다.",
    partnerDemands: [
      "한국 철강 기업의 탄소 배출 데이터 EU 기준 완전 공개 및 배출권 가격 차액 지불",
      "EU 공급망 실사 지침(CSDDD)의 엄격한 준수",
      "한국 시장 내 유럽산 프리미엄 자동차·풍력 터빈에 대한 비관세 장벽 철폐"
    ],
    initialTension: 50,
    cards: [
      {
        id: "eu_defense_package",
        name: "🛡️ K-방산 유럽 거점 현지 생산 및 NATO 안보 공급망 제휴",
        text: "폴란드·루마니아 등 유럽 내 K-방산 현지 조립 라인을 구축하고 유럽 방위력 재건에 긴밀히 협력하겠다고 제안합니다.",
        cost: "국내 기술 이전 일부 수반",
        tensionDelta: -25,
        acceptanceScore: 35,
        consequence: "동유럽 및 NATO 지지 확보. 통상 규제 유예의 결정적 지렛대."
      },
      {
        id: "eu_cbam_equivalence",
        name: "🌱 한국 탄소배출권(K-ETS)의 EU CBAM 동등성 인정 요구",
        text: "한국 철강이 이미 지불한 국내 배출권 비용을 100% 공제해 달라고 논리적으로 요구합니다.",
        cost: "국내 탄소 제도 개혁 이행 담보 필요",
        tensionDelta: -15,
        acceptanceScore: 25,
        consequence: "대EU 철강·배터리 탄소 관세 폭탄 면제."
      },
      {
        id: "eu_renewables_partner",
        name: "💨 유럽산 해상풍력 터빈 및 수소 기술 국내 프로젝트 구매",
        text: "국내 서남해 해상풍력 발전단지에 유럽산 터빈 도입을 확대하겠다고 제안합니다.",
        cost: "국내 발전 부품 업계 반발",
        tensionDelta: -15,
        acceptanceScore: 20,
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

    this.tension = this.scenario.initialTension;
    this.totalScore = 0;
    this.history = [];
    this.usedCards = new Set();
    this.status = "in_progress"; // in_progress, agreed, partial, deferred, broken
    this.finalAgreement = null;

    // Origin bonus
    if (origin === 'bureaucrat') {
      this.totalScore += 15; // Bureaucrat starts with negotiation edge
    } else if (origin === 'politician') {
      this.tension += 5; // Politician faces slight bureaucratic skepticism
    }
  }

  playCard(cardId) {
    if (this.usedCards.has(cardId) || this.status !== 'in_progress') return null;

    const card = this.scenario.cards.find(c => c.id === cardId);
    if (!card) return null;

    this.usedCards.add(cardId);

    // Roll some slight PRNG variation (+- 5)
    const roll = this.prng.range(-4, 4);
    let cardScore = card.acceptanceScore + roll;
    let cardTension = card.tensionDelta;

    if (this.origin === 'bureaucrat') {
      cardScore += 5;
      cardTension = cardTension < 0 ? cardTension - 5 : cardTension;
    }

    this.totalScore += cardScore;
    this.tension = Math.max(0, Math.min(100, this.tension + cardTension));

    // Partner reaction dialogue
    let partnerReaction = "";
    if (cardScore >= 30) {
      partnerReaction = `[${this.scenario.representative}] "매우 인상적이고 건설적인 제안입니다. 우리 측 핵심 이해관계를 충족시켜 주는 진지한 결단에 경의를 표합니다."`;
    } else if (cardScore >= 15) {
      partnerReaction = `[${this.scenario.representative}] "한 걸음 진전된 카드이나, 여전히 우리 의회와 산업계의 눈높이에는 다소 부족합니다. 추가적인 성의를 기대합니다."`;
    } else if (cardScore >= 0) {
      partnerReaction = `[${this.scenario.representative}] "글쎄요, 기술적인 설명은 잘 들었으나 실질적인 양보가 부족합니다. 이대로는 본국을 설득하기 어렵습니다."`;
    } else {
      partnerReaction = `[${this.scenario.representative}] "유감스럽군요. 이런 식의 강경 대응과 압박은 양국 통상 관계를 파국으로 몰고 갈 뿐입니다!"`;
    }

    const stepResult = {
      card,
      cardScore,
      cardTension,
      currentTension: this.tension,
      currentScore: this.totalScore,
      partnerReaction
    };

    this.history.push(stepResult);

    // Auto check if broken
    if (this.tension >= 95) {
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
    if (this.totalScore >= 60 && this.tension <= 60) {
      // Full agreement
      this.status = "agreed";
      this.finalAgreement = {
        type: "agreed",
        title: `${this.scenario.partnerName} 통상협상 전면 타결`,
        grade: "대타결 (Historic Agreement)",
        tariffReduction: this.scenario.partnerId === 'US' ? 0.05 : 0.02,
        tradeBarrierDelta: -25,
        relationDelta: 20,
        text: `양국은 심도 있는 전략 대화 끝에 핵심 쟁점을 모두 타결했습니다. ${this.scenario.coreIssue}에 대해 한국 측의 요구가 전폭적으로 수용되었습니다.`
      };
    } else if (this.totalScore >= 35) {
      // Partial compromise
      this.status = "partial";
      this.finalAgreement = {
        type: "partial",
        title: `${this.scenario.partnerName} 절충안 합의`,
        grade: "조건부 절충 (Conditional Compromise)",
        tariffReduction: this.scenario.partnerId === 'US' ? 0.10 : 0.01,
        tradeBarrierDelta: -10,
        relationDelta: 5,
        text: `완전한 만족은 아니나, 최악의 관세 폭탄을 피하고 상호 양보를 통해 잠정적인 절충안에 서명했습니다.`
      };
    } else {
      // Failed to reach threshold -> breakdown
      return this.resolveBreakdown();
    }

    return this.finalAgreement;
  }

  resolveDeferral() {
    this.status = "deferred";
    this.finalAgreement = {
      type: "deferred",
      title: `${this.scenario.partnerName} 협상 시한 3개월 연장 및 유예`,
      grade: "협상 유예 (Extension & Grace Period)",
      tariffReduction: 0,
      tradeBarrierDelta: 0,
      relationDelta: 0,
      text: "양국 대표단은 쟁점에 대한 추가 실무 협의를 위해 현행 상태를 동결하고 3개월간의 유예 기간을 두기로 합의했습니다."
    };
    return this.finalAgreement;
  }

  resolveBreakdown() {
    this.status = "broken";
    this.finalAgreement = {
      type: "broken",
      title: `${this.scenario.partnerName} 협상 최종 결렬`,
      grade: "협상 결렬 (Negotiation Breakdown)",
      tariffReduction: -0.15, // tariff increases!
      tradeBarrierDelta: 30,
      relationDelta: -25,
      text: "양측의 입장 차이를 좁히지 못하고 협상이 끝내 결렬되었습니다. 상대국의 보복 관세 및 통상 보복 조치가 임박했습니다."
    };
    return this.finalAgreement;
  }

  // Apply outcomes to economy engine
  applyToEconomy(economyEngine) {
    if (!this.finalAgreement) return;
    const pState = economyEngine.partnerStates[this.scenario.partnerId];
    if (!pState) return;

    if (this.finalAgreement.type === 'agreed') {
      if (this.scenario.partnerId === 'US') {
        pState.tariffs.automobile = 0.025; // successfully eliminated 25% tariff!
        pState.tariffs.steel = 0.05;
        pState.tariffs.general = 0.03;
        pState.energyQuotaMod = 1.0; // Korea imports $1.0B/month of US LNG, fulfilling US trade deficit reduction
        // reduce barrier for autos
        economyEngine.industryStates.automobile.tradeBarrierIndex = Math.max(80, economyEngine.industryStates.automobile.tradeBarrierIndex - 25);
        economyEngine.industryStates.steel.tradeBarrierIndex = Math.max(80, economyEngine.industryStates.steel.tradeBarrierIndex - 20);
        // Bonus to shipbuilding
        economyEngine.industryStates.shipbuilding.pendingDeliveries += 1.5;
      } else if (this.scenario.partnerId === 'CN') {
        economyEngine.industryStates.petrochemical.tradeBarrierIndex = Math.max(85, economyEngine.industryStates.petrochemical.tradeBarrierIndex - 15);
        economyEngine.industryStates.battery.capacityIndex += 5;
      } else if (this.scenario.partnerId === 'EU') {
        economyEngine.industryStates.steel.tradeBarrierIndex = Math.max(85, economyEngine.industryStates.steel.tradeBarrierIndex - 15);
        economyEngine.industryStates.defense.pendingDeliveries += 1.2;
      }
      pState.relations = Math.min(100, pState.relations + 20);
    } else if (this.finalAgreement.type === 'partial') {
      if (this.scenario.partnerId === 'US') {
        pState.tariffs.automobile = 0.08; // moderate compromise
        pState.energyQuotaMod = 0.5; // partial LNG purchase
        economyEngine.industryStates.automobile.tradeBarrierIndex = Math.max(90, economyEngine.industryStates.automobile.tradeBarrierIndex - 12);
      }
      pState.relations = Math.min(100, pState.relations + 5);
    } else if (this.finalAgreement.type === 'broken') {
      if (this.scenario.partnerId === 'US') {
        pState.tariffs.automobile = 0.25; // disaster 25% tariff hits!
        pState.energyQuotaMod = 0.0;
        economyEngine.industryStates.automobile.tradeBarrierIndex += 35;
        economyEngine.industryStates.steel.tradeBarrierIndex += 25;
      } else if (this.scenario.partnerId === 'CN') {
        economyEngine.industryStates.petrochemical.tradeBarrierIndex += 20;
        economyEngine.industryStates.battery.tradeBarrierIndex += 15;
      }
      pState.relations = Math.max(0, pState.relations - 25);
    }
  }
}
