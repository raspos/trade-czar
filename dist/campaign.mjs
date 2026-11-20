// campaign.mjs - Deep Branching Geopolitical Campaign Engine for 통상교섭본부장 | TRADE CZAR
// Pilot Campaign: 대만해협 위기와 실리콘 쇼크 (The Taiwan Strait Crisis & Silicon Shock)
// Enforces: Text cut by 80%, domestic coordination game, no stat spoilers, deep branching, persistent memory.

export const TAIWAN_STRAIT_CAMPAIGN = {
  id: "taiwan_strait_crisis",
  title: "대만해협 위기와 실리콘 쇼크",
  subtitle: "TSMC 봉쇄와 미·중 패권 전쟁 속 K-반도체의 운명",
  durationMonths: 3,

  // =========================================================================
  // MONTH 1: 제1막 · 대만해협 봉쇄와 실리콘 쇼크
  // =========================================================================
  month1: {
    month: 1,
    act: "제1막",
    title: "대만해협 봉쇄와 실리콘 쇼크",
    subtitle: "TSMC 선적 마비와 미·중 양국의 동시 최후통첩",
    crisisSummary: "중국 인민해방군이 대만해협을 전면 봉쇄하며 TSMC 파운드리 선적이 중단되었습니다. 워싱턴과 베이징은 통상교섭본부로 양자택일의 최후통첩을 동시에 전달해 왔습니다.",
    
    // 비밀 정보 및 첩보 보고서 (간결한 2문장 브리핑)
    intelReports: [
      {
        id: "intel_us_cable",
        source: "주미대사관 전문",
        title: "백악관 NSC 비공개 회의 동향",
        content: "미국은 한국의 TSMC 대체 물량 전담 공급을 강하게 압박하고 있습니다. 그러나 러스트벨트 표심을 위해 한국산 자동차 관세(25%) 카드는 계속 쥐고 흔들 방침입니다."
      },
      {
        id: "intel_cn_wire",
        source: "상하이 총영사관 타전",
        title: "중국 상무부 원자재 통제 동향",
        content: "한국이 미국의 대중 반도체 통제에 전면 동참할 경우 흑연·갈륨 통관을 즉시 동결할 계획입니다. 다만 중국 내 스마트폰 생산을 위해 한국산 메모리 칩 확보도 절박한 상황입니다."
      },
      {
        id: "intel_corp_brief",
        source: "삼성·SK 긴급 전략서",
        title: "글로벌 주문 폭증 및 중국 팹 리스크",
        content: "평택·용인 라인으로 서방의 대체 주문이 폭증하고 있으나, 중국 시안·우시 공장은 장비 반입이 막히면 6개월 내 멈춥니다. 외교적 완충 지대를 열어주지 않으면 국내 산업에 치명적입니다."
      }
    ],

    // 상충하는 이해관계자 발언 (짧고 강렬한 1~2문장)
    stakeholders: [
      {
        id: "us_envoy",
        name: "캐서린 USTR 대표",
        org: "미국 무역대표부",
        flag: "🇺🇸",
        stance: "대미 칩 우선 공급 협약 즉각 서명 요구",
        quote: "한국 반도체는 자유세계의 유일한 보루입니다. 시안·우시 공장을 포기하고 대미 칩 우선 공급 협약에 즉각 서명하십시오."
      },
      {
        id: "cn_minister",
        name: "왕 상무부 부부장",
        org: "중국 상무부",
        flag: "🇨🇳",
        stance: "대중 제재 불참 및 흑연 통관 동결 경고",
        quote: "대만해협은 중국의 내정입니다. 미국의 일방적 봉쇄에 가담하는 순간, 한국 배터리에 들어갈 흑연 통관은 즉각 전면 동결됩니다."
      },
      {
        id: "corp_chair",
        name: "이재용 회장 & 반도체 업계",
        org: "삼성전자 · SK하이닉스",
        flag: "🇰🇷",
        stance: "국내 팹 증설 지원 및 중국 공장 가동권 사수 호소",
        quote: "TSMC가 멈춘 지금은 100년 만의 도약 기회입니다. 다만 중국 전선이 끊기면 우시·시안 팹이 멈추니 외교적 안전판을 열어주십시오."
      }
    ],

    // [핵심 시스템: 국내 조율 게임] 국무회의 부처 간 비상 예산 쟁탈전
    domesticCoordination: {
      type: "cabinet_budget_clash",
      title: "국무회의 비상 예산 및 국내 통상 패키지 쟁탈전",
      desc: "대외 협상에 앞서 20조 원 비상 특별 재원의 부처별 배분과 정책 우선순위를 결단해야 합니다. 각 부처와 이익단체의 반발을 조율하십시오.",
      ministers: [
        {
          role: "기획예산처 장관",
          demands: "국가 채무비율이 한계입니다. 비상 재원은 20조 원이 마지노선이며 단 1원도 증액할 수 없습니다.",
          stanceTag: "재정 건전성 사수"
        },
        {
          role: "산업통상부 1차관",
          demands: "TSMC 셧다운은 기회입니다. 용인·평택 반도체 전력망과 용수 인프라에 최소 12조를 투입해야 합니다.",
          stanceTag: "반도체 인프라 올인"
        },
        {
          role: "농림축산식품부 장관",
          demands: "미국이 반도체 대가로 과일·축산 개방을 요구하면 농민들이 상경합니다. 피해 보전 6조 원은 배수진입니다.",
          stanceTag: "농가 상생기금 확보"
        },
        {
          role: "외교부 2차관",
          demands: "중국의 흑연 보복을 흡수할 4조 원 규모의 대체 광물 수입선 바우처와 비축 자금이 필수적입니다.",
          stanceTag: "핵심 광물 비축선 확보"
        }
      ],
      proposals: [
        {
          id: "coord_m1_prop1",
          title: "안 1: 반도체 초격차 집중 배분안",
          budgetBreakdown: "반도체 팹 인프라 13조 · 농축산 보전 4조 · 원자재 비축 3조",
          reaction: "산업부와 재계는 환호하나, 농민단체가 '농업을 제물로 바쳤다'며 거센 반발을 예고합니다.",
          consequenceKey: "semicon_focus"
        },
        {
          id: "coord_m1_prop2",
          title: "안 2: 농정·외교 균형 상생 배분안",
          budgetBreakdown: "반도체 팹 인프라 10조 · 농축산 보전 6조 · 원자재 비축 4조",
          reaction: "농림부와 외교부가 전폭 지지하며 농민 시위 우려를 차단하나, 반도체 업계는 설비 증설 지연을 우려합니다.",
          consequenceKey: "balanced_coalition"
        },
        {
          id: "coord_m1_prop3",
          title: "안 3: 재정 건전성 및 예비비 보존안",
          budgetBreakdown: "반도체 9조 · 농축산 5조 · 원자재 2조 · 비상 예비비 4조 비축",
          reaction: "기획예산처가 강력 지지하나, 산업부와 농림부 모두 '위기 상황에 안이한 긴축'이라며 불만을 제기합니다.",
          consequenceKey: "fiscal_restraint"
        }
      ]
    },

    // 플레이어의 전략 노선 결단 (스탯 수치 일절 비공개)
    strategicChoices: [
      {
        id: "choice_m1_us_alliance",
        branchKey: "BRANCH_A",
        label: "노선 1: 미국 공급망 안보 동맹 전면 결속 (Western Chip Fortress)",
        description: "워싱턴의 요구를 전격 수용하여 '한·미 첨단 반도체 공급망 안보 동맹'에 공식 서명합니다. 미국 시장 내 TSMC 대체 물량을 선점하되, 중국의 자원 보복을 정면 감수합니다.",
        rationale: "대미 안보 신뢰와 미국 하이테크 시장 독점권을 선점하지만 중국의 원자재 통상 보복에 직면합니다."
      },
      {
        id: "choice_m1_strategic_neutrality",
        branchKey: "BRANCH_B",
        label: "노선 2: 전략적 자율성과 공급망 중립 지대 선언 (Commercial Neutrality)",
        description: "순수 상업적 메모리 반도체 교역은 안보 제재 대상이 아님을 공개 천명합니다. 워싱턴에는 상업용 메모리의 유지 필요성을 설득하고, 베이징에는 중립 보장을 제안합니다.",
        rationale: "중국의 즉각적인 원자재 보복을 피하고 중국 내 반도체 팹을 사수하지만 미국의 거센 불신에 직면합니다."
      },
      {
        id: "choice_m1_domestic_sovereignty",
        branchKey: "BRANCH_C",
        label: "노선 3: 용인 메가 클러스터 국내 자립 & 신흥 다자 시장 선회 (Sovereign Diversification)",
        description: "미·중 양국의 줄다리기에 휘둘리지 않고 독자 노선을 걷습니다. 용인 메가 팹 완공을 위한 국가 인허가를 직권 발동하며, 수출 물량을 유럽·인도 모빌리티 시장으로 다변화합니다.",
        rationale: "미·중 외풍에서 벗어나 독자적인 공급망 완결성을 추구하지만 단기 인프라 전환 비용이 발생합니다."
      }
    ],

    // 외신기자회견 외교적 발언 (플레이어의 말 한마디가 영구 기록됨)
    pressQuestion: "워싱턴포스트 특파원: '본부장님, 대만해협 봉쇄로 전 세계가 한국 반도체만 바라보고 있습니다. 한국 정부는 미국의 대중국 반도체 장비 반출 통제에 공식 동참할 것입니까, 아니면 중국 시장의 이익을 지킬 것입니까?'",
    pressStatements: [
      {
        id: "stmt_m1_pro_us",
        text: "'대한민국은 한미 안보 동맹의 가치를 최우선에 둡니다. 자유세계 공급망 수호를 위해 미국과 끝까지 보조를 맞출 것입니다.'",
        effectKey: "pro_us_alignment",
        headline: "본부장 '한미 경제안보 동맹 확고'…글로벌 칩 요새 동참 선언",
        deck: "워싱턴 조야 대환영…중국 상무부 '합당한 대가 치를 것' 보복 경고"
      },
      {
        id: "stmt_m1_commercial_pragmatism",
        text: "'민간 상업 교역과 글로벌 공급망 안정은 안보와 분리되어야 합니다. 우리는 국익과 시장 논리에 따라 실용적으로 판단합니다.'",
        effectKey: "strategic_autonomy",
        headline: "본부장 '상업적 반도체는 제재 대상 아니다'…실용 중립 표방",
        deck: "중국 팹 자산 사수 승부수…미 의회 일각 '세컨더리 보이콧 검토' 반발"
      },
      {
        id: "stmt_m1_corporate_autonomy",
        text: "'이는 민간 기업의 자율적 비즈니스 판단 영역입니다. 정부가 민간 기업의 정상 거래를 일방적으로 재단하지 않을 것입니다.'",
        effectKey: "corporate_discretion",
        headline: "본부장 '기업 자율 판단 존중'…통상 갈등 신중 행보",
        deck: "외교 마찰 완충 시도…국내외 언론 '원칙적 국가 전략 부재' 지적"
      }
    ]
  },

  // =========================================================================
  // MONTH 2: 제2막 · 완전히 다른 3대 분기 전개 (BRANCH A, B, C)
  // =========================================================================
  month2: {
    month: 2,
    act: "제2막",
    
    // BRANCH A: 미국 결속 노선을 선택했을 때
    BRANCH_A: {
      title: "흑연 금수 조치와 러스트벨트의 계산서",
      subtitle: "중국의 원자재 보복과 백악관의 초과이익 환수 요구",
      crisisSummary: "한국이 미국 주도 공급망 동맹에 서명하자, 베이징은 한국행 흑연·갈륨 통관을 전면 동결했습니다. 백악관에서는 한국 기업이 얻는 초과이익의 75%를 환수하라는 당혹스러운 청구서를 보내왔습니다.",
      
      intelReports: [
        {
          id: "intel_m2_a_graphite",
          source: "포스코퓨처엠 긴급 타전",
          title: "흑연 재고 고갈 시점 분석",
          content: "중국산 흑연 통관 차단으로 포항·청주 배터리 공장이 20일 뒤 멈춥니다. 호주·모잠비크 대체선이 있으나 정제 비용과 운송비가 40% 이상 비쌉니다."
        },
        {
          id: "intel_m2_a_ustr",
          source: "주미 상무관 특전",
          title: "백악관 러스트벨트 연계 압박",
          content: "초과이익 환수 요구의 본질은 한국 기업이 러스트벨트에 패키징 라인을 조기 증설하도록 강제하려는 협상용 지렛대입니다."
        }
      ],

      stakeholders: [
        {
          id: "battery_ceos",
          name: "배터리 3사 대표단",
          org: "LG엔솔 · SK온 · 삼성SDI",
          flag: "🔋",
          stance: "호주 대체 흑연 긴급 수입 자금 지원 요구",
          quote: "반도체 살리겠다고 미국에 올인한 대가를 배터리가 치르고 있습니다! 당장 호주 흑연 대체 수입 보증을 서주십시오!"
        },
        {
          id: "us_commerce_sec",
          name: "미 상무부 차관보",
          org: "미국 상무부",
          flag: "🇺🇸",
          stance: "텍사스 패키징 조기 증설 확약 요구",
          quote: "미국의 안보 우산으로 TSMC 빈자리를 차지했으니, 러스트벨트 공장 증설에 성의를 보이십시오."
        }
      ],

      // [국내 조율 게임 Mode: 비상 공급망·선복·비축물자 배분 지휘소]
      domesticCoordination: {
        type: "supply_chain_allocation",
        title: "비상 전략물자 및 국적선사 선복 긴급 배분 지휘",
        desc: "중국의 흑연 통관 동결로 국가 비축 흑연(30일분)과 HMM 긴급 선복을 어느 산업에 우선 배분할지 결단해야 합니다.",
        options: [
          {
            id: "coord_m2_a_battery",
            title: "지침 1: 배터리 3사 국가 비축 흑연 전량 우선 배정",
            allocationDesc: "국가 비축 흑연 80%를 오창·포항 배터리 라인에 수혈하여 포드·GM 납기 지연 위기를 차단합니다.",
            reaction: "배터리 3사는 가동률을 사수하나, 반도체·철강 업계는 '소재 배분 형평성 붕괴'라며 거세게 항의합니다."
          },
          {
            id: "coord_m2_a_semicon",
            title: "지침 2: 반도체 파운드리 및 첨단 공정 연속성 사수",
            allocationDesc: "대미 TSMC 대체 납기를 맞추기 위해 파운드리 연계 소재에 비축 자원을 집중합니다.",
            reaction: "반도체 독점 수출길은 유지되나, 배터리 공장 일부 라인이 순환 휴업에 돌입합니다."
          },
          {
            id: "coord_m2_a_sme",
            title: "지침 3: 자동차 부품 및 중소 수출기업 균등 안배",
            allocationDesc: "대기업 쏠림을 막고 울산·창원 부품 협력사에 국적선사 긴급 선복을 우선 할당합니다.",
            reaction: "중소 부품사의 연쇄 도산을 막아내며 노사 연대의 전폭적 지지를 이끌어냅니다."
          }
        ]
      },

      strategicChoices: [
        {
          id: "choice_m2_a1_counter_deal",
          label: "결단 1: 텍사스 첨단 패키징 증설 카드로 백악관 초과이익 환수안 무력화",
          description: "초과이익 환수를 단호히 거부하는 대신, 미국 현지 패키징 투자 일정을 앞당겨 러스트벨트 일자리를 제공하고 배터리 광물 우선 조달 쿼터를 쟁취합니다.",
          rationale: "대미 동맹을 굳히면서 부당한 이익 환수를 막아냅니다."
        },
        {
          id: "choice_m2_a2_beijing_backchannel",
          label: "결단 2: 베이징 비공개 특사 파견 및 민간 가전 칩과 흑연의 물밑 교환",
          description: "제3국에서 중국 상무부와 비공개 물밑 담판을 엽니다. 가전용 범용 반도체 공급을 비공식 보장해주는 조건으로 한국 배터리용 흑연 통관을 조건부 해제시킵니다.",
          rationale: "배터리 셧다운을 막지만 미국 측에 발각될 경우 동맹 균열 위험이 있습니다."
        }
      ],

      pressQuestion: "KBS 경제부 기자: '중국의 흑연 보복으로 배터리 공장이 멈출 위기입니다. 미국은 한술 더 떠 반도체 초과이익을 내놓으라고 압박하고 있는데, 본부장님의 복안은 무엇입니까?'",
      pressStatements: [
        {
          id: "stmt_m2_a1",
          text: "'부당한 통상 압박에는 굴복하지 않습니다. 미국의 무리한 요구는 단호히 쳐내고, 원자재 다변화로 중국의 자원 무기화를 무력화하겠습니다.'",
          effectKey: "strong_resilience",
          headline: "본부장 '美 초과이익 환수 거부…원자재 자립으로 돌파'",
          deck: "정면 승부 선언에 재계 결집…워싱턴과 베이징의 동시 반응 예의주시"
        },
        {
          id: "stmt_m2_a2",
          text: "'위기일수록 동맹과의 신뢰가 중요합니다. 미국과 상호 윈-윈할 수 있는 합리적 투자 패키지를 조속히 매듭짓겠습니다.'",
          effectKey: "deep_alliance",
          headline: "본부장 '한미 상호 투자로 위기 극복'…대화 기조 유지",
          deck: "텍사스 패키징 협상 착수…배터리 업계 '원자재 숨통도 틔워야'"
        }
      ]
    },

    // BRANCH B: 전략적 중립 노선을 선택했을 때
    BRANCH_B: {
      title: "세컨더리 보이콧의 칼날과 베이징의 독이 든 사과",
      subtitle: "미 의회의 대외 통제 법안과 중국의 시장 개방 요구",
      crisisSummary: "한국이 상업적 중립을 선언하자, 미 의회는 한국 반도체를 겨냥한 FDPR 제재안을 발의했습니다. 반면 중국은 시안 공장을 열어줄 테니 저가 철강을 무관세로 들여보내라는 역제안을 던졌습니다.",

      intelReports: [
        {
          id: "intel_m2_b_sanctions",
          source: "워싱턴 로펌 보고서",
          title: "미 의회 FDPR 법안 통과 가능성",
          content: "미 상원 은행위는 시안 공장에 미국산 계측 장비가 반입될 경우 반도체 결제 계좌를 동결하는 세컨더리 보이콧을 발의했습니다."
        },
        {
          id: "intel_m2_b_steel_dumping",
          source: "포스코 긴급 탄원서",
          title: "중국산 철강 무관세 개방 시 파장",
          content: "중국의 제안대로 철강 관세를 풀면 포항·당진 제철소 가동률이 50% 밑으로 붕괴하고 대규모 실직이 불가피합니다."
        }
      ],

      stakeholders: [
        {
          id: "us_senator_lobby",
          name: "미 의회 대중특위 위원장",
          org: "미국 연방의회",
          flag: "🇺🇸",
          stance: "중립 철회 및 시안 공장 첨단 노드 동결 요구",
          quote: "자유와 독재 사이에는 중립이 없습니다! 베이징에 칩을 계속 넘긴다면 한국산 전 품목에 징벌적 관세를 매기겠습니다!"
        },
        {
          id: "posco_chairman",
          name: "장인화 포스코 회장",
          org: "한국철강협회",
          flag: "🏗️",
          stance: "중국산 덤핑 개방 결사 반대",
          quote: "시안 반도체 지키겠다고 덤핑 철강을 무관세로 받으면 국내 고로 불을 꺼야 합니다. 철강 없는 반도체가 어디 있습니까!"
        }
      ],

      // [국내 조율 게임 Mode: 국회 본회의 통상 안보 결의안 및 비준 표결]
      domesticCoordination: {
        type: "national_assembly_bargaining",
        title: "국회 본회의 통상 안보 비상 결의안 표결",
        desc: "미 의회의 세컨더리 보이콧을 막고 국내 산업을 보호하기 위해 여야 원내대표를 설득해 국회 표결을 통과시켜야 합니다.",
        parties: [
          { name: "여당 (115석)", stance: "정부 외교적 중재안 조건부 수용" },
          { name: "야당 (170석)", stance: "철강 노동자 보호 부대조건 명시 요구" },
          { name: "무소속 (15석)", stance: "통상 주권 수호 캐스팅보트" }
        ],
        options: [
          {
            id: "coord_m2_b_bipartisan",
            title: "안 1: 초당적 통상 주권 결의안 (야당 철강 보호 부대조건 전격 수용)",
            allocationDesc: "중국 철강 덤핑 방어 특례를 명문화하여 야당을 설득합니다.",
            reaction: "본회의 표결 결과 찬성 215표로 압도적 가결! 워싱턴과 베이징에 강력한 단일 대오를 과시합니다."
          },
          {
            id: "coord_m2_b_diplomatic",
            title: "안 2: 외교적 대화 우선 촉구 정부 원안 (원안 표결 강행)",
            allocationDesc: "정부의 외교적 재량권을 지키기 위해 부대조건 없는 원안 표결을 추진합니다.",
            reaction: "야당의 대규모 반대표 속에 찬성 152표, 반대 143표로 아슬아슬하게 신승합니다."
          },
          {
            id: "coord_m2_b_retaliation",
            title: "안 3: 대미·대중 상응 맞불 규제 촉구안 (초강경 결의)",
            allocationDesc: "외국의 어떤 일방적 제재에도 보복 관세로 맞서겠다는 강경 결의안을 상정합니다.",
            reaction: "재계 출신 의원들과 경제통 의원들의 이탈로 찬성 141표, 반대 150표로 최종 부결됩니다."
          }
        ]
      },

      strategicChoices: [
        {
          id: "choice_m2_b1_reject_china_dumping",
          label: "결단 1: 중국의 저가 덤핑 요구 전면 거부 & 미 의회 반도체 안보 설득 사절단 급파",
          description: "국내 철강 산업을 보호하기 위해 중국의 덤핑 무관세 요구를 거절하고, 워싱턴 의회로 사절단을 급파해 세컨더리 보이콧을 저지합니다.",
          rationale: "국내 제조업 생태계를 사수하고 미국의 제재를 정면 돌파합니다."
        },
        {
          id: "choice_m2_b2_geneva_multilateral",
          label: "결단 2: 스위스 제네바 긴급 소집 - 미·중·한 3자 '반도체 안전통로 협약' 중재안 발의",
          description: "양자 대결의 함정을 벗어나 WTO 제네바 무대에서 인도주의적 반도체 안전통로 협약을 제안하고 EU를 우군으로 확보합니다.",
          rationale: "다자주의적 외교 공간을 창출하여 강대국의 일방적 압박을 분산시킵니다."
        }
      ],

      pressQuestion: "조선일보 외교안보 선임기자: '미국은 세컨더리 보이콧을 위협하고 중국은 철강 시장을 열라고 협박합니다. 본부장님, 중립을 지키려다 양쪽에서 뺨을 맞고 있는 것 아닙니까?'",
      pressStatements: [
        {
          id: "stmt_m2_b1",
          text: "'원칙이 곧 가장 강력한 외교입니다. 강대국의 위협에 일희일비하지 않고 다자 규범으로 당당히 돌파하겠습니다.'",
          effectKey: "principled_stand",
          headline: "본부장 '강대국 위협에 흔들리지 않는다'…다자 규범 천명",
          deck: "제네바 3자 중재안 제시…EU와 아세안 등 국제사회 지지 확산"
        },
        {
          id: "stmt_m2_b2",
          text: "'외교는 흑백논리가 아닙니다. 국익의 실리를 위해 물밑에서 정교한 균형점을 찾고 있으니 지켜봐 주십시오.'",
          effectKey: "pragmatic_balance",
          headline: "본부장 '실리 외교로 돌파구 열겠다'…균형 통상 행보",
          deck: "국회 비준 단일 대오 확보…워싱턴과 베이징 물밑 교섭 총력"
        }
      ]
    },

    // BRANCH C: 국내 자립화 & 신흥 시장 선회 노선을 선택했을 때
    BRANCH_C: {
      title: "용인 송전탑 전쟁과 세종을 찾은 유럽의 거인들",
      subtitle: "국내 팹 인프라 갈등과 EU·인도의 대체 수주 러시",
      crisisSummary: "국내 자립과 시장 다변화를 천명하자, 독일 폭스바겐과 인도 사절단이 차량용 칩 500억 달러 수주를 위해 세종으로 급파되었습니다. 그러나 국내에서는 용인 클러스터 초고압 송전탑 노선을 둘러싸고 주민들의 단식 농성으로 착공이 중단되었습니다.",

      intelReports: [
        {
          id: "intel_m2_c_eu_deal",
          source: "주벨기에 대표부 보고",
          title: "한·EU 차세대 모빌리티 반도체 동맹",
          content: "유럽은 자동차 라인이 멈출 위기입니다. 한국이 차량용 칩을 공급해주면 EU CBAM 탄소세를 5년간 전면 면제하겠다는 제안을 가져왔습니다."
        },
        {
          id: "intel_m2_c_power_grid",
          source: "한전 계통운영본부 보고",
          title: "용인 팹 송전선로 주민 갈등 현황",
          content: "안성·용인 송전탑 건설이 주민 단식 농성으로 멈췄습니다. 본부장이 특단의 지자체 상생 중재안을 내놓지 못하면 팹 가동이 1년 이상 지연됩니다."
        }
      ],

      stakeholders: [
        {
          id: "eu_auto_envoy",
          name: "독일 자동차협회 & EU 특사",
          org: "유럽연합 통상사절단",
          flag: "🇪🇺",
          stance: "차량용 칩 10년 독점 계약 및 EU 탄소세 면제 제안",
          quote: "유럽 공장이 멈추기 직전입니다. 공급만 약속해주신다면 철강·배터리에 부과될 수조 원의 탄소세를 전액 면제하겠습니다!"
        },
        {
          id: "local_gov_head",
          name: "송전탑 경유 지자체 비대위원장",
          org: "지역 주민 대책위",
          flag: "🏛️",
          stance: "송전선로 전면 지중화 및 상생 예산 요구",
          quote: "대기업 공장 하나 살리자고 주민들 건강을 희생할 수는 없습니다! 송전선로 전면 지중화 없이는 한 발짝도 못 나갑니다!"
        }
      ],

      // [국내 조율 게임 Mode: 지자체·주민 송전탑 결사반대 농성 3자 중재]
      domesticCoordination: {
        type: "local_gov_arbitration",
        title: "용인 반도체 송전선로 지자체·주민 3자 긴급 중재",
        desc: "EU의 500억 달러 수주 납기를 맞추기 위해 주민 단식 농성을 해소하고 송전망 공사를 재개시켜야 합니다.",
        options: [
          {
            id: "coord_m2_c_underground",
            title: "중재 1: 도심 구간 전면 지중화 및 국가 예산 특별 지원",
            allocationDesc: "주민 요구를 수용하여 핵심 도심 구간을 지중화하고 예비비를 긴급 투입합니다.",
            reaction: "주민 대책위가 농성을 풀고 착공에 합의합니다! 공사 일정이 즉각 정상 궤도에 진입합니다."
          },
          {
            id: "coord_m2_c_regional_fund",
            title: "중재 2: 지역 첨단 산단 연계 및 상생 발전 기금 5천억 조성",
            allocationDesc: "지자체에 배후 부품 산단 인허가를 보장하고 삼성·SK와 공동 상생 기금을 출연합니다.",
            reaction: "지자체장이 상생 협약서에 서명하며 우호적 협력 체제로 전환됩니다."
          },
          {
            id: "coord_m2_c_decree",
            title: "중재 3: 국가 기간전력망 특별법 직권 발동 (공사 강행)",
            allocationDesc: "국가 경제 골든타임을 이유로 지자체 인허가를 배제하고 공사를 직권 강행합니다.",
            reaction: "착공은 재개되었으나 지역 주민들의 극한 반발과 상경 시위로 정치적 부담이 가중됩니다."
          }
        ]
      },

      strategicChoices: [
        {
          id: "choice_m2_c1_power_fasttrack",
          label: "결단 1: 국가기간 전력망 직권 패스트트랙 발동 & EU·인도 500억 달러 초대형 빅딜 체결",
          description: "국가전력망 특별 직권을 발동하고 보상 예산을 지급해 송전망 공사를 재개합니다. 확보된 생산능력으로 EU·인도 사절단과 메가 계약에 서명합니다.",
          rationale: "자립형 수출 잭팟을 터뜨리고 유럽 탄소장벽을 무력화합니다."
        },
        {
          id: "choice_m2_c2_sme_consortium",
          label: "결단 2: 국내 소부장 강소기업 전면 육성 컨소시엄 및 아세안 분산 생산 기지 구축",
          description: "대기업 중심의 집중 투자를 분산하여 국내 200개 소부장 기업에 보증을 지원하고 동남아 분산 패키징 거점을 구축합니다.",
          rationale: "국내 산업의 뿌리 경쟁력과 지정학적 다변화를 달성합니다."
        }
      ],

      pressQuestion: "동아일보 산업부장: '용인 팹 송전망 갈등이 폭발 직전인데, 유럽과 인도에서는 천문학적인 주문이 쏟아지고 있습니다. 본부장님은 이 병목을 어떻게 뚫으시겠습니까?'",
      pressStatements: [
        {
          id: "stmt_m2_c1",
          text: "'국가의 명운이 걸린 골든타임입니다. 과감한 결단과 상생으로 전력망을 뚫고 유럽과의 역사적 빅딜을 성사시키겠습니다.'",
          effectKey: "bold_breakthrough",
          headline: "본부장 '용인 전력망 뚫고 유럽 500억 달러 빅딜 수주'",
          deck: "지자체 상생 협약 타결…유럽 CBAM 탄소세 전면 면제 청신호"
        },
        {
          id: "stmt_m2_c2",
          text: "'성장도 중요하지만 상생과 분산이 진정한 안보입니다. 지역 주민과 강소기업이 함께 승리하는 모델을 완성하겠습니다.'",
          effectKey: "sustainable_growth",
          headline: "본부장 '소부장 강소기업과 지역 상생이 진짜 안보'",
          deck: "아세안 분산 허브 구축…미·중 외풍 막을 다변화 로드맵 가동"
        }
      ]
    }
  },

  // =========================================================================
  // MONTH 3: 제3막 · 결전의 달과 역사적 결말 (CLIMAX & EPILOGUE)
  // =========================================================================
  month3: {
    month: 3,
    act: "제3막",

    // BRANCH A: 미국 결속 노선의 결전
    BRANCH_A: {
      title: "백악관 정상회담과 글로벌 칩 요새",
      subtitle: "대미 반도체 400억 달러 수주 독점과 중국 시장의 재편",
      climaxNarrative: "워싱턴 백악관 오벌 오피스에서 한·미 정상회담이 열렸습니다. 한국 기업이 미국 시장 내 TSMC 대체 물량 85%를 독점 수주하는 역사상 최대의 통상 빅딜이 최종 성사 직전에 도달했습니다.",
      
      // [국내 조율 결과 반영 대외 협상 매트릭스]
      treatyContext: "국내에서 확보한 비상 예산과 배터리 소재 배분 결단을 바탕으로, 미국 측의 일방적 초과이익 환수를 완벽히 쳐내고 대미 자동차 관세 2.5% 인하 확약서를 테이블에 올렸습니다.",

      finalDecisionPrompt: "백악관 서명식 직전, 미 무역대표부는 '10년간 반도체 무관세를 보장하는 대가로 미국산 셰일가스(LNG) 연간 80억 달러 장기 구매 계약'을 최종 부속서로 요구했습니다.",
      finalChoices: [
        {
          id: "choice_m3_a_sign_big_deal",
          label: "최종 결단: 미국산 LNG 장기 구매 수용 및 한·미 반도체·에너지 포괄적 통상 빅딜 서명",
          summary: "대미 수출 사상 최대치 돌파, 반도체 독점 공급권 영구 확보, 대미 무역흑자 자연 축소로 환율 관찰대상국 압박 완전 해소."
        },
        {
          id: "choice_m3_a_reject_energy",
          label: "최종 결단: 에너지 구매 강제 조항 거부 & 순수 기술 협약으로 축소 관철",
          summary: "에너지 수입선 다변화 자율권 수호, 미국 측과의 치열한 기싸움 속에 기술 동맹만 단독 서명."
        }
      ],
      endingEpilogue: "한국 반도체는 서방 자유세계의 핵심 공급망 축으로 우뚝 섰습니다. 대미 수출은 역대 최고치를 갱신했으며, 포스코와 배터리 3사는 대체 광산망을 구축해 중국 리스크를 극복했습니다."
    },

    // BRANCH B: 전략적 중립 노선의 결전
    BRANCH_B: {
      title: "제네바 실리콘 협정과 실용 외교의 승리",
      subtitle: "스위스 제네바 비밀 다자 담판과 미·중 사이의 독자 생존",
      climaxNarrative: "스위스 제네바 WTO 본부 비공개 회의실에서 기적적인 중재안이 도출되었습니다. 미·중 양국 모두 한국의 중립적 공급 능력을 공식 인정하는 '제네바 실리콘 협정'이 눈앞에 다가왔습니다.",

      treatyContext: "국회 본회의의 초당적 통상 결의안을 등에 업은 한국 대표단은 강대국들의 거센 양자택일 협박을 무력화하고 완충 지대를 확립했습니다.",

      finalDecisionPrompt: "양국 대표단이 협정문에 서명하기 직전, 미 의회가 '한국이 중국에 판매하는 메모리 칩에 대해 개당 2달러의 글로벌 안보 기여금을 부과하라'는 기습 수정안을 올렸습니다.",
      finalChoices: [
        {
          id: "choice_m3_b_firm_stand",
          label: "최종 결단: 부당한 기여금 징수 거부 - '규범에 기반한 다자 합의' 원안 고수",
          summary: "원칙적 다자주의 관철, EU와 아세안의 전폭적 지지 확보, 미·중 양국 모두로부터 실질적인 상업 교역권 쟁취."
        },
        {
          id: "choice_m3_b_concede_compromise",
          label: "최종 결단: 미측 체면을 살려주는 상징적 기술 기금 조성안으로 타협",
          summary: "즉각적인 분쟁 종결, 완벽한 법적 안전판 확보, 글로벌 메모리 시장의 대체 불가능한 중립 공급국가 지위 확립."
        }
      ],
      endingEpilogue: "치밀하고 집요한 다자 외교로 고래 싸움 속에서 새우의 등을 터뜨리지 않았습니다. 한국은 시안 팹과 미국 수출선 모두를 기적적으로 지켜내며 글로벌 중립 공급망의 독보적 완충국으로 공인받았습니다."
    },

    // BRANCH C: 국내 자립 & 신흥 시장 선회의 결전
    BRANCH_C: {
      title: "자립형 K-반도체 르네상스와 유라시아 실크로드",
      subtitle: "용인 팹 가동과 EU·인도·동남아를 잇는 비동맹 수출 동맹",
      climaxNarrative: "용인 반도체 제1기 팹에서 첫 웨이퍼가 출하되었습니다. 세종시에서는 독일·인도 장관과 아세안 사무총장이 나란히 앉아 '신(新) 유라시아 통상 동맹'에 정식 서명하고 있습니다.",

      treatyContext: "지자체 및 주민과의 대타협으로 송전망을 조기 완공한 쾌거가 유럽과 인도의 500억 달러 장기 발주를 성공시키는 결정적 토대가 되었습니다.",

      finalDecisionPrompt: "서명식 현장에서 EU 통상집행위원은 '한국산 수소환원 제철과 무탄소 배터리에 대해서도 EU 관세를 영구 0%로 고정하는 특별 부속 협정'을 추가 제안했습니다.",
      finalChoices: [
        {
          id: "choice_m3_c_expand_green_deal",
          label: "최종 결단: 친환경 제철·배터리 유럽 무관세 특별 협정 전격 체결",
          summary: "반도체에 이어 철강·배터리까지 유럽 시장 독점 진출 교두보 확보. 한국 제조업의 역사상 가장 거대한 녹색 무역 쾌거."
        },
        {
          id: "choice_m3_c_focus_semicon",
          label: "최종 결단: 반도체 협정에 우선 집중하고 녹색 규범은 점진적 협상 추진",
          summary: "국내 철강·에너지 업계의 기술 전환 부담을 완충하면서, 신흥 시장 반도체 수출 공급망을 철저히 안정화."
        }
      ],
      endingEpilogue: "위기를 기회로 바꾼 담대한 자주 통상의 승리였습니다. 한국은 미·중 패권 종속에서 탈피하여 유럽과 신흥 거대 시장을 아우르는 글로벌 신산업 네트워크의 맹주로 우뚝 섰습니다."
    }
  }
};

// Campaign State Manager
export class CampaignManager {
  constructor() {
    this.activeCampaignId = "taiwan_strait_crisis";
    this.currentMonth = 1;
    this.selectedBranch = null; // BRANCH_A, BRANCH_B, BRANCH_C
    this.decisionsHistory = [];
    this.diplomaticMemory = [];
    this.domesticHistory = []; // Tracks domestic coordination choices and consequences!
    this.inspectedIntels = new Set();
    this.isCompleted = false;
    this.finalEpilogue = null;
  }

  // Get current month's campaign view data
  getCurrentStageData() {
    const camp = TAIWAN_STRAIT_CAMPAIGN;
    if (this.currentMonth === 1) {
      return {
        stage: 1,
        month: 1,
        ...camp.month1
      };
    } else if (this.currentMonth === 2) {
      const branchKey = this.selectedBranch || "BRANCH_A";
      const branchData = camp.month2[branchKey];
      return {
        stage: 2,
        month: 2,
        act: camp.month2.act,
        branchKey,
        ...branchData
      };
    } else if (this.currentMonth === 3) {
      const branchKey = this.selectedBranch || "BRANCH_A";
      const branchData = camp.month3[branchKey];
      return {
        stage: 3,
        month: 3,
        act: camp.month3.act,
        branchKey,
        ...branchData
      };
    }
    return null;
  }

  // Inspect an intelligence report
  inspectIntel(intelId) {
    this.inspectedIntels.add(intelId);
  }

  // Resolve domestic coordination decision
  makeDomesticDecision(optId, gameEngine) {
    const stageData = this.getCurrentStageData();
    if (!stageData || !stageData.domesticCoordination) return null;

    let chosenOpt = null;
    if (this.currentMonth === 1 && stageData.domesticCoordination.proposals) {
      chosenOpt = stageData.domesticCoordination.proposals.find(p => p.id === optId);
    } else if (this.currentMonth === 2 && stageData.domesticCoordination.options) {
      chosenOpt = stageData.domesticCoordination.options.find(o => o.id === optId);
    }

    if (!chosenOpt) return null;

    this.domesticHistory.push({
      month: this.currentMonth,
      optId,
      title: chosenOpt.title,
      reaction: chosenOpt.reaction
    });

    // Apply internal political / industry buffs based on domestic resolution
    if (gameEngine && gameEngine.politics) {
      if (optId === 'coord_m1_prop1') {
        gameEngine.politics.applyDeltas({ businessTrust: 8, publicApproval: -3, policyMomentum: 4 });
      } else if (optId === 'coord_m1_prop2') {
        gameEngine.politics.applyDeltas({ publicApproval: 8, presidentTrust: 6, businessTrust: 2 });
      } else if (optId === 'coord_m1_prop3') {
        gameEngine.politics.applyDeltas({ presidentTrust: 6, policyMomentum: 6, businessTrust: -2 });
      } else if (optId === 'coord_m2_a_battery') {
        gameEngine.politics.applyDeltas({ businessTrust: 8, competitiveness: 6 });
        if (gameEngine.economy.industryStates.secondary_battery) gameEngine.economy.industryStates.secondary_battery.capacityIndex += 6;
      } else if (optId === 'coord_m2_b_bipartisan') {
        gameEngine.politics.applyDeltas({ diplomaticTrust: 10, publicApproval: 8, presidentTrust: 6 });
      } else if (optId === 'coord_m2_c_underground') {
        gameEngine.politics.applyDeltas({ publicApproval: 10, businessTrust: 8 });
        if (gameEngine.economy.industryStates.semiconductor) gameEngine.economy.industryStates.semiconductor.capacityIndex += 10;
      }
    }

    return chosenOpt;
  }

  // Choose strategic directive for current month
  makeStrategicDecision(choiceId, gameEngine) {
    const stageData = this.getCurrentStageData();
    if (!stageData) return null;

    // Auto-resolve default domestic consensus if not yet manually resolved
    if (stageData.domesticCoordination) {
      const currentDom = this.domesticHistory.find(d => d.month === this.currentMonth);
      if (!currentDom) {
        const defaultPid = stageData.domesticCoordination.proposals ? stageData.domesticCoordination.proposals[0].id : (stageData.domesticCoordination.options ? stageData.domesticCoordination.options[0].id : null);
        if (defaultPid) this.makeDomesticDecision(defaultPid, gameEngine);
      }
    }

    let chosen = null;
    if (this.currentMonth === 1) {
      chosen = stageData.strategicChoices.find(c => c.id === choiceId);
      if (chosen) {
        this.selectedBranch = chosen.branchKey; // Set branch for month 2 and 3!
      }
    } else if (this.currentMonth === 2) {
      chosen = stageData.strategicChoices.find(c => c.id === choiceId);
    } else if (this.currentMonth === 3) {
      chosen = stageData.finalChoices.find(c => c.id === choiceId);
      this.isCompleted = true;
      this.finalEpilogue = stageData.endingEpilogue;
    }

    if (!chosen) return null;

    this.decisionsHistory.push({
      month: this.currentMonth,
      choiceId,
      branch: this.selectedBranch,
      label: chosen.label,
      description: chosen.description || chosen.summary
    });

    // Apply economic and political consequences internally without spoiling numbers in UI
    if (gameEngine) {
      this.applyConsequences(chosen, gameEngine);
    }

    return chosen;
  }

  // Record diplomatic statement from press conference
  recordDiplomaticStatement(stmtId, gameEngine) {
    const stageData = this.getCurrentStageData();
    if (!stageData || !stageData.pressStatements) return null;

    const stmt = stageData.pressStatements.find(s => s.id === stmtId);
    if (!stmt) return null;

    this.diplomaticMemory.push({
      month: this.currentMonth,
      stmtId,
      text: stmt.text,
      effectKey: stmt.effectKey
    });

    // Apply diplomatic and political impact internally
    if (gameEngine && gameEngine.politics) {
      if (stmt.effectKey === 'pro_us_alignment') {
        gameEngine.politics.applyDeltas({ diplomaticTrust: 8, presidentTrust: 4, publicApproval: 2 });
      } else if (stmt.effectKey === 'strategic_autonomy') {
        gameEngine.politics.applyDeltas({ diplomaticTrust: -4, presidentTrust: 6, publicApproval: 8 });
      } else if (stmt.effectKey === 'corporate_discretion') {
        gameEngine.politics.applyDeltas({ diplomaticTrust: -2, presidentTrust: -2, businessTrust: 6 });
      } else if (stmt.effectKey === 'strong_resilience') {
        gameEngine.politics.applyDeltas({ publicApproval: 8, diplomaticTrust: -5, businessTrust: 4 });
      } else if (stmt.effectKey === 'deep_alliance') {
        gameEngine.politics.applyDeltas({ diplomaticTrust: 12, publicApproval: -2, businessTrust: 6 });
      } else if (stmt.effectKey === 'principled_stand') {
        gameEngine.politics.applyDeltas({ publicApproval: 10, diplomaticTrust: 4, presidentTrust: 8 });
      } else if (stmt.effectKey === 'bold_breakthrough') {
        gameEngine.politics.applyDeltas({ businessTrust: 10, competitiveness: 8, publicApproval: 6 });
      }
    }

    return stmt;
  }

  // Internal economic impact calculator
  applyConsequences(chosen, gameEngine) {
    if (!gameEngine || !gameEngine.economy) return;
    const eco = gameEngine.economy;
    const pol = gameEngine.politics;

    if (this.currentMonth === 1) {
      if (chosen.branchKey === "BRANCH_A") {
        if (eco.industryStates.semiconductor) {
          eco.industryStates.semiconductor.capacityIndex += 12;
          eco.industryStates.semiconductor.supportLevel += 1.5;
        }
        if (eco.partnerStates.US) {
          eco.partnerStates.US.relations = Math.min(100, eco.partnerStates.US.relations + 15);
        }
        if (eco.partnerStates.CN) {
          eco.partnerStates.CN.relations = Math.max(0, eco.partnerStates.CN.relations - 20);
        }
        if (pol) pol.applyDeltas({ diplomaticTrust: 10, businessTrust: 8, publicApproval: 2 });
      } else if (chosen.branchKey === "BRANCH_B") {
        if (eco.industryStates.semiconductor) {
          eco.industryStates.semiconductor.utilizationRate = Math.min(100, eco.industryStates.semiconductor.utilizationRate + 6);
        }
        if (eco.partnerStates.CN) {
          eco.partnerStates.CN.relations = Math.min(100, eco.partnerStates.CN.relations + 8);
        }
        if (eco.partnerStates.US) {
          eco.partnerStates.US.relations = Math.max(0, eco.partnerStates.US.relations - 10);
        }
        if (pol) pol.applyDeltas({ diplomaticTrust: -2, businessTrust: 6, publicApproval: 8 });
      } else if (chosen.branchKey === "BRANCH_C") {
        if (eco.industryStates.semiconductor) {
          eco.industryStates.semiconductor.capacityIndex += 8;
        }
        if (eco.industryStates.machinery) {
          eco.industryStates.machinery.capacityIndex += 6;
        }
        if (eco.partnerStates.EU) {
          eco.partnerStates.EU.relations = Math.min(100, eco.partnerStates.EU.relations + 12);
        }
        if (pol) pol.applyDeltas({ diplomaticTrust: 2, businessTrust: -4, publicApproval: 10, competitiveness: 6 });
      }
    } else if (this.currentMonth === 2) {
      if (chosen.id === "choice_m2_a1_counter_deal") {
        if (eco.industryStates.automobile) eco.industryStates.automobile.tradeBarrierIndex = Math.max(0, eco.industryStates.automobile.tradeBarrierIndex - 8);
        if (eco.industryStates.secondary_battery) eco.industryStates.secondary_battery.capacityIndex += 6;
        if (pol) pol.applyDeltas({ businessTrust: 10, diplomaticTrust: 8 });
      } else if (chosen.id === "choice_m2_a2_beijing_backchannel") {
        if (eco.industryStates.secondary_battery) eco.industryStates.secondary_battery.utilizationRate = Math.min(100, eco.industryStates.secondary_battery.utilizationRate + 8);
        if (eco.partnerStates.CN) eco.partnerStates.CN.relations = Math.min(100, eco.partnerStates.CN.relations + 10);
        if (pol) pol.applyDeltas({ businessTrust: 8, diplomaticTrust: -8 });
      } else if (chosen.id === "choice_m2_b1_reject_china_dumping") {
        if (eco.industryStates.steel) eco.industryStates.steel.utilizationRate = Math.min(100, eco.industryStates.steel.utilizationRate + 10);
        if (pol) pol.applyDeltas({ businessTrust: 12, publicApproval: 8 });
      } else if (chosen.id === "choice_m2_b2_geneva_multilateral") {
        if (eco.partnerStates.EU) eco.partnerStates.EU.relations = Math.min(100, eco.partnerStates.EU.relations + 14);
        if (pol) pol.applyDeltas({ diplomaticTrust: 15, presidentTrust: 10 });
      } else if (chosen.id === "choice_m2_c1_power_fasttrack") {
        if (eco.industryStates.semiconductor) eco.industryStates.semiconductor.capacityIndex += 14;
        if (eco.industryStates.steel) eco.industryStates.steel.tradeBarrierIndex = Math.max(0, eco.industryStates.steel.tradeBarrierIndex - 12);
        if (pol) pol.applyDeltas({ businessTrust: 14, competitiveness: 10 });
      } else if (chosen.id === "choice_m2_c2_sme_consortium") {
        if (eco.industryStates.machinery) eco.industryStates.machinery.supportLevel += 2.0;
        if (pol) pol.applyDeltas({ publicApproval: 12, businessTrust: 4 });
      }
    } else if (this.currentMonth === 3) {
      if (chosen.id === "choice_m3_a_sign_big_deal") {
        if (eco.industryStates.semiconductor) eco.industryStates.semiconductor.capacityIndex += 20;
        if (eco.partnerStates.US) eco.partnerStates.US.tariffs.automobile = 0.025;
        if (pol) pol.applyDeltas({ diplomaticTrust: 20, presidentTrust: 15, businessTrust: 15 });
      } else if (chosen.id === "choice_m3_b_firm_stand") {
        if (eco.industryStates.semiconductor) eco.industryStates.semiconductor.utilizationRate = 98;
        if (pol) pol.applyDeltas({ publicApproval: 16, diplomaticTrust: 18 });
      } else if (chosen.id === "choice_m3_c_expand_green_deal") {
        if (eco.industryStates.steel) eco.industryStates.steel.tradeBarrierIndex = 0;
        if (eco.industryStates.secondary_battery) eco.industryStates.secondary_battery.tradeBarrierIndex = 0;
        if (pol) pol.applyDeltas({ businessTrust: 18, competitiveness: 16, publicApproval: 14 });
      }
    }
  }

  // Advance to next month in campaign
  advanceMonth() {
    if (this.currentMonth < 3) {
      this.currentMonth += 1;
      return true;
    }
    this.isCompleted = true;
    return false;
  }

  serialize() {
    return {
      activeCampaignId: this.activeCampaignId,
      currentMonth: this.currentMonth,
      selectedBranch: this.selectedBranch,
      decisionsHistory: this.decisionsHistory,
      diplomaticMemory: this.diplomaticMemory,
      domesticHistory: this.domesticHistory,
      inspectedIntels: Array.from(this.inspectedIntels),
      isCompleted: this.isCompleted,
      finalEpilogue: this.finalEpilogue
    };
  }

  deserialize(data) {
    if (!data) return;
    this.activeCampaignId = data.activeCampaignId || "taiwan_strait_crisis";
    this.currentMonth = data.currentMonth || 1;
    this.selectedBranch = data.selectedBranch || null;
    this.decisionsHistory = data.decisionsHistory || [];
    this.diplomaticMemory = data.diplomaticMemory || [];
    this.domesticHistory = data.domesticHistory || [];
    this.inspectedIntels = new Set(data.inspectedIntels || []);
    this.isCompleted = data.isCompleted || false;
    this.finalEpilogue = data.finalEpilogue || null;
  }
}
