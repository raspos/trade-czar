// press.mjs - Monthly Press Conference Q&A System for 통상교섭본부장 | TRADE CZAR

export function getPressConferenceQA(monthlyResult, politicsStats = {}, lastNegotiation = null, threats = [], currentMonth = 1) {
  const month = monthlyResult?.month || currentMonth || 1;
  const bal = monthlyResult?.balance ?? 0;
  const fx = monthlyResult?.macro?.fxRate ?? 1420;

  // 1. Deficit or High FX Crisis
  if (bal < 0 || fx >= 1445) {
    return {
      scenarioId: 'fx_deficit_crisis',
      outlet: '한국경제',
      reporter: '이현욱 거시금융팀장',
      question: `원·달러 환율이 1,440원을 넘나들고 이달 무역수지가 적자로 돌아섰습니다. 환율 방어와 수출 부양 중 어디에 우선순위를 두시겠습니까?`,
      choices: [
        {
          id: 'opt_export_drive',
          label: '수출 총력전',
          quote: '고환율을 기회 삼아 하반기 공격적인 수출 총력전에 나서겠습니다.',
          deltas: { businessTrust: 4, publicApproval: -3, policyMomentum: 3 },
          deltaSummary: '기업신뢰 +4 · 국민여론 -3% · 추진력 +3',
          headline: `본부장 "환율 위기를 수출 기회로"…공격적 수출 드라이브 선언`,
          deck: `무역금융 50조 긴급 투입…고환율 물가 부담 속 정면돌파 선택`
        },
        {
          id: 'opt_stabilization',
          label: '거시 수지 방어',
          quote: '핵심 원자재 관세 긴급 인하와 외환 공조로 거시 경제 불확실성을 차단하겠습니다.',
          deltas: { presidentTrust: 4, publicApproval: 3, businessTrust: -2 },
          deltaSummary: '대통령신임 +4 · 국민여론 +3% · 기업신뢰 -2',
          headline: `통상 당국, 긴급 수지 방어선 가동…"거시 안정 최우선"`,
          deck: `원자재 관세 완화 및 수입 다변화 착수…재계 "수출 활력 대책도 병행해야"`
        },
        {
          id: 'opt_structural_shift',
          label: '고부가 체질 개선',
          quote: '단기 환율에 연연하지 않고, 고부가가치 첨단 제품 수출로 체질을 바꾸겠습니다.',
          deltas: { businessTrust: 3, policyMomentum: 4, competitiveness: 3 },
          deltaSummary: '기업신뢰 +3 · 추진력 +4 · 산업경쟁력 +3',
          headline: `본부장 "단기 환율 연연 안 해…고부가 수출로 체질 개선"`,
          deck: `저가 범용 상품 축소 및 첨단 품목 집중…통상 구조개혁 청사진 제시`
        }
      ]
    };
  }

  // 2. US Tariff Pressure & Surplus Friction
  if ((threats && threats.some(t => t.partnerId === 'US')) || month % 3 === 1 || (lastNegotiation && lastNegotiation.scenario?.partnerId === 'US' && lastNegotiation.type !== 'agreed')) {
    return {
      scenarioId: 'us_tariff_pressure',
      outlet: '연합뉴스',
      reporter: '워싱턴 특파원',
      question: `미국 정부의 보편관세 압박과 대미 흑자 감축 요구가 거셉니다. 워싱턴의 요구에 양보할 것입니까, 아니면 끝까지 맞서 싸우겠습니까?`,
      choices: [
        {
          id: 'opt_hardline',
          label: '강경 원칙',
          quote: '부당한 일방주의 관세 압박에 한 치도 굴복하지 않겠습니다. WTO 제소와 맞불 관세도 불사합니다.',
          deltas: { publicApproval: 5, diplomaticTrust: -6, businessTrust: -3, policyMomentum: 2 },
          deltaSummary: '국민여론 +5% · 외교신뢰 -6 · 기업신뢰 -3',
          headline: `본부장 "美 관세 압박에 절대 굴복 없다"…통상 전쟁 불사 천명`,
          deck: `정부서울청사 긴급 회견서 정면승부 선언…워싱턴 마찰·기업 긴장 고조`
        },
        {
          id: 'opt_pragmatic',
          label: '실용 타협',
          quote: '미국산 에너지·농산물 구매를 확대해 대미 흑자를 전략적으로 조율하고 관세 폭탄을 피하겠습니다.',
          deltas: { diplomaticTrust: 6, publicApproval: -5, policyMomentum: -2 },
          deltaSummary: '외교신뢰 +6 · 국민여론 -5% · 추진력 -2',
          headline: `본부장 "美 에너지 대거 구매"…실용 카드로 관세 폭탄 피한다`,
          deck: `알래스카 LNG 등 수입 확대 약정…국내 농가·야권 거센 반발`
        },
        {
          id: 'opt_tech_lead',
          label: '기술 초격차',
          quote: '정치적 장벽을 넘는 열쇠는 압도적 기술입니다. AI 반도체·조선 초격차에 사활을 걸겠습니다.',
          deltas: { businessTrust: 6, presidentTrust: 3, competitiveness: 3 },
          deltaSummary: '기업신뢰 +6 · 대통령신임 +3 · 산업경쟁력 +3',
          headline: `본부장 "정치 흔들려도 기술은 안 흔들린다"…초격차 승부수`,
          deck: `첨단 반도체·조선 MRO에 정책 역량 총동원…"대체 불가 파트너 될 것"`
        }
      ]
    };
  }

  // 3. Supply Chain Dilemma & China Friction
  if (month === 6 || month === 9 || (lastNegotiation && lastNegotiation.scenario?.partnerId === 'CN')) {
    return {
      scenarioId: 'supply_chain_dilemma',
      outlet: '블룸버그',
      reporter: '김소희 서울지국장',
      question: `미·중 통상 패권 전쟁의 틈바구니에서 한국 공급망 분열 우려가 커지고 있습니다. 어느 쪽에 무게를 싣고 계십니까?`,
      choices: [
        {
          id: 'opt_allies_first',
          label: '가치 동맹 우선',
          quote: '한미 동맹과 경제 안보를 최우선 가치로 두고 글로벌 공급망 재편에 확고히 동참하겠습니다.',
          deltas: { diplomaticTrust: 4, businessTrust: -3, publicApproval: 2 },
          deltaSummary: '외교신뢰 +4 · 기업신뢰 -3 · 국민여론 +2%',
          headline: `본부장 "한미 경제동맹 확고 동참"…글로벌 공급망 재편 가속`,
          deck: `대중 수출 비중 축소 불가피…대중 의존 기업들 비상 대책 촉구`
        },
        {
          id: 'opt_china_pragmatism',
          label: '대중 실용 균형',
          quote: '이념보다 국익이 먼저입니다. 대중 실무 통상 대화를 가동해 불필요한 마찰을 차단하겠습니다.',
          deltas: { diplomaticTrust: -3, businessTrust: 4, publicApproval: 2 },
          deltaSummary: '외교신뢰 -3 · 기업신뢰 +4 · 국민여론 +2%',
          headline: `본부장 "대중 통상 채널 즉각 가동…불필요한 갈등 차단"`,
          deck: `원자재·핵심광물 공급망 실무 협의 제안…워싱턴 기류 예의주시`
        },
        {
          id: 'opt_sovereignty',
          label: '소부장 국산 자립',
          quote: '양자택일 압박을 벗어나는 유일한 길은 핵심 소재·부품 국산화와 기술 자립뿐입니다.',
          deltas: { businessTrust: 5, publicApproval: 4, competitiveness: 4 },
          deltaSummary: '기업신뢰 +5 · 국민여론 +4% · 산업경쟁력 +4',
          headline: `본부장 "소부장 자립만이 살길"…수출 공급망 독립 선언`,
          deck: `핵심 광물·소재 국산화 로드맵 가동…재계 "R&D 세제 지원 대폭 확대 환영"`
        }
      ]
    };
  }

  // 4. General Steady Growth & Target Achievement
  return {
    scenarioId: 'annual_target_strategy',
    outlet: '중앙일보',
    reporter: '정원석 통상전문기자',
    question: `월간 무역흑자가 견조한 흐름을 보이고 있습니다만, 연간 무역 목표 달성을 위한 본부장님의 핵심 카드는 무엇입니까?`,
    choices: [
      {
        id: 'opt_global_south',
        label: '신시장 영토 확장',
        quote: '미·중 편중에서 벗어나 아세안·인도·중동으로 우리 수출 영토를 전방위 확장하겠습니다.',
        deltas: { publicApproval: 3, businessTrust: 4, policyMomentum: 3 },
        deltaSummary: '국민여론 +3% · 기업신뢰 +4 · 추진력 +3',
        headline: `본부장 "미·중 쏠림 벗어난다"…글로벌 사우스 신시장 총공세`,
        deck: `아세안·인도·중동과 전방위 경제동반자협정(CEPA) 추진…수출 영토 확장`
      },
      {
        id: 'opt_rd_breakthrough',
        label: '초격차 R&D 투자',
        quote: '반도체·모빌리티 R&D 세제 지원을 총동원해 세계 시장에서 절대적 초격차를 굳히겠습니다.',
        deltas: { businessTrust: 6, presidentTrust: 3, competitiveness: 4 },
        deltaSummary: '기업신뢰 +6 · 대통령신임 +3 · 산업경쟁력 +4',
        headline: `본부장 "R&D 세제 혜택 총동원…기술 절대 우위 굳힌다"`,
        deck: `차세대 반도체·배터리 거점 구축…기업 설비투자 세액공제 확대 건의`
      },
      {
        id: 'opt_inclusive_trade',
        label: '상생·체감형 통상',
        quote: '수출의 온기가 골목상권과 청년 일자리까지 이어지도록 국민 체감형 상생 무역을 실현하겠습니다.',
        deltas: { publicApproval: 6, businessTrust: -2, policyMomentum: 2 },
        deltaSummary: '국민여론 +6% · 기업신뢰 -2 · 추진력 +2',
        headline: `본부장 "수출 온기, 청년 일자리로"…상생 통상 대전환 선언`,
        deck: `대·중소 상생 수출 컨소시엄 출범…국민 체감형 통상 정책으로 대전환`
      }
    ]
  };
}
