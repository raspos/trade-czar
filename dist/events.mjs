// events.mjs - 100+ Events Pool & Event Resolution Engine

export const EVENTS_POOL = [
  // === 1. 국제 이벤트 (International Shocks & Opportunities) ===
  {
    id: "evt_intl_us_tariff_speech",
    category: "international",
    categoryName: "국제 통상",
    title: "미국 대통령, 한국산 제품 무역흑자 맹비난 연설",
    description: "미국 대통령이 러스트벨트 유세 연설에서 '한국이 자동차와 반도체로 미국에서 막대한 달러를 쓸어가고 있다'며 25% 보편관세 행정명령 서명을 공언했습니다.",
    condition: (state) => state.month >= 2 && state.currentMacro.fxRate >= 1380,
    probability: 0.7,
    choices: [
      {
        text: "즉각 워싱턴에 고위급 특사 파견 및 미국산 에너지 구매 확대 카드 준비",
        impact: { presidentTrust: 5, diplomaticTrust: 5, policyMomentum: 5 },
        apply: (engine) => {
          engine.industryStates.automobile.tradeBarrierIndex += 5;
        }
      },
      {
        text: "외교 채널을 통한 원칙적 유감 표명 및 실무 협의 요구 (원론적 대응)",
        impact: { presidentTrust: -5, publicApproval: -5 },
        apply: (engine) => {
          engine.industryStates.automobile.tradeBarrierIndex += 15;
        }
      }
    ]
  },
  {
    id: "evt_intl_china_rare_earth",
    category: "international",
    categoryName: "국제 통상",
    title: "중국 상무부, 첨단 반도체·배터리용 희토류 수출통제 전격 발표",
    description: "중국 정부가 국가 안보를 이유로 갈륨, 게르마늄, 천연 흑연 등 12개 핵심 광물에 대한 수출 허가제를 발효시켰습니다. 국내 배터리 및 반도체 공장의 원자재 재고가 40일분으로 줄어들었습니다.",
    condition: (state) => state.month >= 3,
    probability: 0.65,
    choices: [
      {
        text: "호주·베트남·캐나다 대체 공급망 긴급 바우처 지원 및 수입 관세 면제",
        impact: { businessTrust: 10, policyMomentum: 5, competitiveness: 5 },
        apply: (engine) => {
          engine.industryStates.battery.capacityIndex = Math.max(80, engine.industryStates.battery.capacityIndex - 3);
        }
      },
      {
        text: "대중국 고위급 통상 핫라인 가동 및 한국 기업 예외 통관 승인 교섭",
        impact: { diplomaticTrust: 10, businessTrust: 5 },
        apply: (engine) => {
          engine.industryStates.battery.tradeBarrierIndex += 5;
        }
      }
    ]
  },
  {
    id: "evt_intl_red_sea_crisis",
    category: "international",
    categoryName: "국제 통상",
    title: "홍해·수에즈 운하 지정학 위기 재발…해상운임(SCFI) 급등",
    description: "중동 해상 분쟁으로 유럽행 컨테이너선들이 수에즈 운하를 우회하여 아프리카 희망봉으로 회항하면서 운항 일수가 2주 늘어나고 해상운임이 30% 폭등했습니다.",
    condition: (state) => state.month >= 4,
    probability: 0.6,
    choices: [
      {
        text: "국적선사 HMM 임시 선박 긴급 투입 및 중소 수출기업 물류비 긴급 바우처",
        impact: { businessTrust: 10, publicApproval: 5, policyMomentum: 5 },
        apply: (engine) => {
          engine.industryStates.consumer.supportLevel += 1;
        }
      },
      {
        text: "시베리아 횡단철도(TSR) 및 항공 물류 대체 노선 지원",
        impact: { businessTrust: 5, competitiveness: 5 },
        apply: (engine) => {
          engine.industryStates.automobile.supportLevel += 1;
        }
      }
    ]
  },
  {
    id: "evt_intl_ai_datacenter_boom",
    category: "international",
    categoryName: "국제 통상",
    title: "글로벌 빅테크의 초거대 AI 데이터센터 천문학적 증설 발주",
    description: "미국 실리콘밸리 빅테크들이 차세대 생성형 AI 클라우드 서버 확충을 선언하며 삼성전자와 SK하이닉스에 HBM3E 및 CXL 메모리 전량 독점 공급을 타진해 왔습니다.",
    condition: (state) => state.month >= 2,
    probability: 0.8,
    choices: [
      {
        text: "반도체 국가전략 팹 인프라 규제 신속 해소 및 수출 통관 패스트트랙",
        impact: { presidentTrust: 10, businessTrust: 15, competitiveness: 15 },
        apply: (engine) => {
          engine.industryStates.semiconductor.capacityIndex += 10;
          engine.industryStates.semiconductor.supportLevel += 2;
        }
      },
      {
        text: "메모리 쏠림 방지를 위한 시스템반도체 및 파운드리 생태계 병행 육성 조건 부과",
        impact: { policyMomentum: 10, competitiveness: 10 },
        apply: (engine) => {
          engine.industryStates.semiconductor.longTermCompetitiveness += 15;
        }
      }
    ]
  },
  {
    id: "evt_intl_eu_cbam_countdown",
    category: "international",
    categoryName: "국제 통상",
    title: "EU 탄소국경조정제도(CBAM) 전면 시행 카운트다운",
    description: "유럽연합이 철강, 알루미늄, 비료 수입품에 대해 본격적인 탄소 배출량 인증서 구매를 의무화하는 법안을 최종 확정했습니다. 국내 고로 제철소들에 매년 수천억 원의 탄소 관세가 예고됐습니다.",
    condition: (state) => state.month >= 5,
    probability: 0.7,
    choices: [
      {
        text: "한·EU 통상장관회담 긴급 소집 및 K-ETS(배출권거래제) 100% 동등성 인정 압박",
        impact: { diplomaticTrust: 10, businessTrust: 10, competitiveness: 8 },
        apply: (engine) => {
          engine.industryStates.steel.tradeBarrierIndex = Math.max(80, engine.industryStates.steel.tradeBarrierIndex - 10);
        }
      },
      {
        text: "국내 수소환원제철(HyREX) 설비 전환에 정부 특별 녹색채권 지원",
        impact: { businessTrust: 10, policyMomentum: 10, competitiveness: 12 },
        apply: (engine) => {
          engine.industryStates.steel.longTermCompetitiveness += 10;
        }
      }
    ]
  },

  // === 2. 국내 산업 이벤트 (Domestic Industry Dynamics) ===
  {
    id: "evt_dom_auto_strike_risk",
    category: "domestic",
    categoryName: "국내 산업",
    title: "완성차 노조 하계 임단협 결렬 위기 및 파업 찬반투표",
    description: "현대차·기아 노조가 통상임금 및 국내 생산 물량 보장을 요구하며 파업을 가결했습니다. 완성차 조업이 일주일만 중단되어도 당월 자동차 수출 15억 달러가 증발할 위기입니다.",
    condition: (state) => state.month === 6 || state.month === 7,
    probability: 0.65,
    choices: [
      {
        text: "통상교섭본부장이 직접 노사 중재에 나서 '국가 수출 비상사태' 호소 및 상생안 타결",
        impact: { presidentTrust: 8, businessTrust: 10, publicApproval: 10 },
        apply: (engine) => {
          engine.industryStates.automobile.utilizationRate += 5;
        }
      },
      {
        text: "노사 자율 교섭 원칙 유지 및 물류 차질 대비 비상 재고 방출 지시",
        impact: { businessTrust: -5, publicApproval: -5 },
        apply: (engine) => {
          engine.industryStates.automobile.utilizationRate -= 8;
        }
      }
    ]
  },
  {
    id: "evt_dom_defense_mega_deal",
    category: "domestic",
    categoryName: "국내 산업",
    title: "폴란드·중동 발 12조 원 규모 K-방산 수출 2차 실행계약 체결",
    description: "K2 흑표 전차, K9 자주포, 천궁-II 요격미사일 패키지가 나토 동유럽 회원국 및 중동 주요국과 85억 달러 규모의 2차 본계약을 체결했습니다.",
    condition: (state) => state.month >= 3,
    probability: 0.75,
    choices: [
      {
        text: "수출입은행 특별 방산 수출금융 한도 10조 원 즉시 확충",
        impact: { presidentTrust: 10, businessTrust: 15, publicApproval: 15, policyMomentum: 10 },
        apply: (engine) => {
          engine.industryStates.defense.pendingDeliveries += 2.0;
        }
      },
      {
        text: "현지 공동 생산 및 부품 공급망 기술 제휴 협정 승인",
        impact: { diplomaticTrust: 15, competitiveness: 10 },
        apply: (engine) => {
          engine.industryStates.defense.pendingDeliveries += 1.2;
        }
      }
    ]
  },
  {
    id: "evt_dom_kfood_global_craze",
    category: "domestic",
    categoryName: "국내 산업",
    title: "K-라면·냉동김밥·화장품, 미국·유럽 대형마트 매대 올킬",
    description: "틱톡과 넷플릭스 K-콘텐츠 열풍에 힘입어 한국 라면과 냉동김밥, 스킨케어 제품이 미국 코스트코, 월마트, 유럽 까르푸 전 매장에서 품절 대란을 빚고 있습니다.",
    condition: (state) => state.month >= 4,
    probability: 0.8,
    choices: [
      {
        text: "K-소비재 해외 통관 패스트트랙 및 글로벌 현지 물류 허브 설치 지원",
        impact: { publicApproval: 15, businessTrust: 10, competitiveness: 10 },
        apply: (engine) => {
          engine.industryStates.consumer.capacityIndex += 10;
          engine.industryStates.consumer.supportLevel += 2;
        }
      },
      {
        text: "식품·뷰티 중소기업 대상 해외 위조품 및 상표권 도용 단속 강화",
        impact: { businessTrust: 8, policyMomentum: 8 },
        apply: (engine) => {
          engine.industryStates.consumer.supportLevel += 1;
        }
      }
    ]
  },
  {
    id: "evt_dom_petrochem_shutdown",
    category: "domestic",
    categoryName: "국내 산업",
    title: "여수·울산 석유화학 NCC(나프타분해설비) 적자 누적 셧다운 위기",
    description: "중국의 무차별 에틸렌 증설과 고유가로 인해 국내 석유화학 공장들의 스프레드가 손익분기점을 밑돌며 가동률이 60%대로 추락했습니다.",
    condition: (state) => state.month >= 5,
    probability: 0.7,
    choices: [
      {
        text: "나프타 제조용 원유 무관세 연장 및 고부가 스페셜티 화학 전환 긴급 펀드",
        impact: { businessTrust: 15, presidentTrust: 5, policyMomentum: 8 },
        apply: (engine) => {
          engine.industryStates.petrochemical.utilizationRate += 6;
          engine.industryStates.petrochemical.supportLevel += 2;
        }
      },
      {
        text: "한계 사업장 자발적 설비 통폐합 및 친환경 바이오 플라스틱 전환 유도",
        impact: { competitiveness: 10, businessTrust: -5 },
        apply: (engine) => {
          engine.industryStates.petrochemical.longTermCompetitiveness += 15;
        }
      }
    ]
  },

  // === 3. 정치 및 정부 이벤트 (Political Pressure & Parliamentary Hearings) ===
  {
    id: "evt_pol_president_urgent_call",
    category: "political",
    categoryName: "정치·정부",
    title: "대통령 긴급 독대: '무역 성적표가 경제의 성패를 가른다'",
    description: "용산 대통령실에서 본부장을 긴급 호출했습니다. 대통령은 참모진을 물리치고 집무실에서 수출입 지표 그래프를 직접 짚으며 격려와 엄중한 경고를 동시에 던졌습니다.",
    condition: (state) => state.month === 3 || state.month === 7 || state.month === 10,
    probability: 0.85,
    choices: [
      {
        text: "'연간 무역흑자 700억 달러 반드시 달성하겠습니다' - 공격적 목표 공언",
        impact: { presidentTrust: 15, policyMomentum: 15 },
        apply: (engine) => {
          for (const ind of Object.values(engine.industryStates)) {
            ind.supportLevel += 0.5;
          }
        }
      },
      {
        text: "'지금은 외형보다 체질 개선이 중요합니다. 실질적 채산성을 지키겠습니다' - 현실적 조언",
        impact: { presidentTrust: 5, businessTrust: 10, competitiveness: 10 },
        apply: (engine) => {
          engine.industryStates.automobile.priceCompetitiveness += 5;
        }
      }
    ]
  },
  {
    id: "evt_pol_hearing_confrontation",
    category: "political",
    categoryName: "정치·정부",
    title: "국회 산자위 현안질의: 여야 의원들의 파상공세",
    description: "국회 산업통상자원위원회 회의장에서 여야 의원들이 미국 관세 대응 미흡과 중소 수출기업의 고사 위기를 두고 본부장을 향해 날선 비판을 쏟아붓고 있습니다.",
    condition: (state) => state.month === 5 || state.month === 9,
    probability: 0.8,
    choices: [
      {
        text: "구체적 통상 데이터와 단계별 로드맵을 제시하며 당당하게 반박 및 정책 설득",
        impact: { publicApproval: 12, policyMomentum: 12, presidentTrust: 5 }
      },
      {
        text: "지적된 문제점을 겸허히 인정하고 국회 요구사항을 반영한 보완 대책 약속",
        impact: { businessTrust: 10, publicApproval: 5, presidentTrust: 0 }
      }
    ]
  },
  {
    id: "evt_pol_deputy_pm_friction",
    category: "political",
    categoryName: "정치·정부",
    title: "경제부총리와의 정책 충돌: '수출금융 예산 vs 재정 건전성'",
    description: "기재부 경제부총리가 무역금융 50조 원 확대와 수출 세액공제 안에 대해 '세수 펑크와 국가 채무'를 이유로 강력히 반대하고 나섰습니다.",
    condition: (state) => state.month >= 6,
    probability: 0.6,
    choices: [
      {
        text: "대통령 보고를 통해 부총리를 설득하고 전격적인 예산 배정 관철",
        impact: { presidentTrust: 10, policyMomentum: 15, businessTrust: 10 }
      },
      {
        text: "기재부의 재정 한계를 수용하고 민간 정책금융 펀드로 우회 추진",
        impact: { businessTrust: 5, policyMomentum: 0 }
      }
    ]
  },

  // === 4. 통상 첩보 및 비공개 이벤트 (Negotiation & Intelligence) ===
  {
    id: "evt_intel_us_leak",
    category: "negotiation",
    categoryName: "통상 첩보",
    title: "미 의회 비공개 메모 유출: '한국산 자동차 관세 면제 조건'",
    description: "워싱턴 정가 소식통을 통해 미 상원 재정위원회의 비공개 보고서가 입수되었습니다. 미국 의회가 알래스카 LNG 구매와 미 군함 MRO 수주를 공식 약속하면 자동차 관세를 유예할 의사가 있다는 핵심 정보입니다.",
    condition: (state) => state.month >= 2,
    probability: 0.7,
    choices: [
      {
        text: "대미 협상 대표단에 즉각 훈령을 하달하여 해당 카드를 우선 제시",
        impact: { diplomaticTrust: 10, policyMomentum: 10 },
        apply: (engine) => {
          if (engine.partnerStates.US) {
            engine.partnerStates.US.relations += 10;
          }
        }
      }
    ]
  }
];

export class EventEngine {
  constructor(prng) {
    this.prng = prng;
    this.triggeredEvents = new Set();
  }

  // Check eligible events for current month and state
  rollEvent(state) {
    const eligible = EVENTS_POOL.filter(evt => {
      if (this.triggeredEvents.has(evt.id)) return false;
      return evt.condition(state);
    });

    if (eligible.length === 0) return null;

    // Filter by probability
    const candidates = eligible.filter(evt => this.prng.next() <= evt.probability);
    if (candidates.length === 0) return null;

    const chosen = this.prng.choice(candidates);
    this.triggeredEvents.add(chosen.id);
    return chosen;
  }
}
