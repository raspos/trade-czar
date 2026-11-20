// campaign.mjs - Deep Branching Geopolitical Campaign Engine for 통상교섭본부장 | TRADE CZAR
// Pilot Campaign: 대만해협 위기와 실리콘 쇼크 (The Taiwan Strait Crisis & Silicon Shock)
// Enforces: No stat spoilers, deep branching, persistent diplomatic memory, and realistic uncertain consequences.

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
    crisisSummary: "중국 인민해방군이 대만해협과 타이베이 항만을 전면 봉쇄했습니다. TSMC의 첨단 파운드리 선적이 전면 중단되면서 애플, 엔비디아, 퀄컴 등 글로벌 빅테크가 마비 상태에 빠졌습니다. 워싱턴과 베이징은 동시에 통상교섭본부로 긴급 훈령과 경고장을 보내왔습니다.",
    
    // 비밀 정보 및 첩보 보고서 (플레이어가 열람할 수 있는 인텔)
    intelReports: [
      {
        id: "intel_us_cable",
        source: "주미 한국대사관 비밀 전보 (1급 비밀)",
        title: "백악관 NSC 및 USTR 비공개 회의 동향",
        content: "미국은 TSMC의 대체 물량을 한국이 즉각 메워줄 것을 강력히 요구하고 있습니다. 그러나 백악관 참모진 일부는 한국이 협력하더라도 러스트벨트 표심을 위해 한국산 자동차 관세(25%) 카드를 철회하지 않고 협상 지렛대로 유지하려는 속내를 보이고 있습니다."
      },
      {
        id: "intel_cn_wire",
        source: "상하이 총영사관 긴급 경제 동향 보고",
        title: "중국 상무부 대외 통제 동향 분석",
        content: "중국 상무부는 한국이 미국 주도의 대중 반도체 통제에 전면 동참할 경우 흑연·갈륨 통관 전면 동결을 검토 중입니다. 그러나 중국 내부적으로도 자국 스마트폰·전기차 제조를 위해 삼성·하이닉스의 메모리 칩 공급이 절실하여, 한국이 강경하게 맞설 경우 협상 여지가 완전히 닫힌 것은 아닙니다."
      },
      {
        id: "intel_corp_brief",
        source: "삼성전자·SK하이닉스 최고경영진 긴급 전략 건의서",
        title: "글로벌 파운드리 긴급 대체 견적 및 중국 팹 리스크",
        content: "TSMC 봉쇄로 평택 파운드리와 HBM 라인으로 미국·유럽의 주문이 300% 폭증하고 있습니다. 반면 중국 시안(삼성 낸드 40%)과 우시(하이닉스 D램 45%) 공장은 장비 반입이 막히면 6개월 내 가동 중단 위기에 처합니다. 정부가 외교적 완충 지대를 열어주지 않으면 국내 산업은 심각한 타격을 입습니다."
      }
    ],

    // 상충하는 이해관계자 발언
    stakeholders: [
      {
        id: "us_envoy",
        name: "캐서린 USTR 대표",
        org: "미국 무역대표부",
        flag: "🇺🇸",
        stance: "미국 주도 반도체 안보 동맹(Chip Alliance) 즉각 서명 및 대중국 반도체 장비 반출 전면 동결 요구",
        quote: "한국의 메모리와 파운드리가 자유세계 공급망의 유일한 보루입니다. 당장 시안과 우시 공장의 장비 반입을 포기하고 대미 첨단 칩 우선 공급 협약에 서명하십시오. 주저한다면 한국 기업도 대중국 협력자로 간주되어 세컨더리 보이콧을 피할 수 없을 것입니다."
      },
      {
        id: "cn_minister",
        name: "왕 상무부 부부장",
        org: "중국 상무부",
        flag: "🇨🇳",
        stance: "대중 제재 불참 보장 요구 및 흑연·희토류 수출 통제 위협",
        quote: "대만해협의 긴장은 중국의 내정 문제입니다. 한국이 미국의 패권주의 봉쇄에 가담하여 중국 기업에 대한 반도체 공급을 차단한다면, 한국 배터리 기업이 필요로 하는 흑연과 핵심 광물의 통관은 즉시 무기한 동결될 것입니다."
      },
      {
        id: "corp_chair",
        name: "이재용 회장 & 반도체 업계 대표단",
        org: "삼성전자 · SK하이닉스",
        flag: "🇰🇷",
        stance: "국내 팹 파운드리 증설 지원 및 중국 공장 가동권 사수 호소",
        quote: "본부장님, TSMC가 멈춘 지금은 한국 반도체가 세계 시장 점유율을 획기적으로 끌어올릴 100년에 한 번 올 기회입니다. 하지만 정부가 중국과의 통상 전선을 완전히 끊어버리면 우시와 시안 공장이 멈춰 수십조 원의 평가손실이 발생합니다. 본부장님의 외교적 해법이 절실합니다."
      }
    ],

    // 플레이어의 전략 노선 결단 (스탯 수치 일절 비공개)
    strategicChoices: [
      {
        id: "choice_m1_us_alliance",
        branchKey: "BRANCH_A",
        label: "노선 1: 미국 공급망 안보 동맹 전면 결속 (Western Chip Fortress)",
        description: "워싱턴의 요구를 전격 수용하여 '한·미 첨단 반도체 공급망 안보 동맹'에 공식 서명합니다. 미국 시장 내 TSMC 대체 물량을 한국 기업이 독점 수주하도록 정부 보증을 제공하고, 시안·우시 공장의 레거시 라인 점진적 철수를 수용합니다.",
        rationale: "대미 외교 안보 신뢰를 극대화하고 미국 하이테크 시장 독점 기회를 선점하지만, 중국의 극심한 원자재 통상 보복을 정면으로 감수해야 합니다."
      },
      {
        id: "choice_m1_strategic_neutrality",
        branchKey: "BRANCH_B",
        label: "노선 2: 전략적 자율성과 공급망 중립 지대 선언 (Commercial Neutrality)",
        description: "순수 상업적 메모리 반도체 교역은 안보 제재 대상이 아님을 공개 천명합니다. 워싱턴에는 상업용 메모리의 중국 공장 유지 필요성을 강력 설득하고, 베이징에는 한국이 무기용 칩을 공급하지 않는다는 중립 보장을 제안합니다.",
        rationale: "중국의 즉각적인 원자재 보복을 피하고 중국 내 반도체 자산을 사수하지만, 미국의 거센 불신과 세컨더리 보이콧 위협에 직면합니다."
      },
      {
        id: "choice_m1_domestic_sovereignty",
        branchKey: "BRANCH_C",
        label: "노선 3: 용인 메가 클러스터 국내 자립 & 신흥 다자 시장 선회 (Sovereign Diversification)",
        description: "미·중 양국의 패권 줄다리기에 휘둘리지 않고 독자 노선을 걷습니다. 용인 메가 팹 완공을 위한 국가 비상 인허가와 전력망 패스트트랙을 직권 발동하며, 수출 물량을 인도·동남아·유럽 자동차 및 산업용 시장으로 강제 다변화합니다.",
        rationale: "미·중 외교적 외풍에서 벗어나 독자적인 공급망 완결성을 추구하지만, 단기적인 생산 인프라 전환 비용과 대기업들의 거센 반발을 견뎌야 합니다."
      }
    ],

    // 외신기자회견 외교적 발언 (플레이어의 말 한마디가 영구 기록됨)
    pressQuestion: "워싱턴포스트 특파원: '본부장님, 대만해협 봉쇄로 전 세계가 한국 반도체만 바라보고 있습니다. 한국 정부는 미국의 대중국 반도체 장비 반출 통제에 공식 동참할 것입니까, 아니면 중국 시장의 이익을 지킬 것입니까?'",
    pressStatements: [
      {
        id: "stmt_m1_pro_us",
        text: "'대한민국은 자유민주주의와 한미 안보 동맹의 가치를 최우선에 두고 있습니다. 민주주의 공급망 수호를 위해 미국과 끝까지 보조를 맞출 것입니다.'",
        effectKey: "pro_us_alignment",
        note: "워싱턴 조야의 환호를 얻으나, 중국 외교부의 즉각적인 공식 규탄 성명을 유발합니다."
      },
      {
        id: "stmt_m1_commercial_pragmatism",
        text: "'민간 상업 교역과 글로벌 공급망 안정은 안보와 분리되어야 합니다. 우리는 시장 논리에 따라 실용적으로 판단할 것이며, 어느 한쪽의 일방적 봉쇄에 맹종하지 않습니다.'",
        effectKey: "strategic_autonomy",
        note: "자주 통상 의지를 천명하나, 미 상원 대중강경파 의원들의 한국 비판 청문회 추진을 부릅니다."
      },
      {
        id: "stmt_m1_corporate_autonomy",
        text: "'이는 기업의 자율적 비즈니스 판단의 영역입니다. 정부가 민간 기업의 정상적 거래를 강제로 재단하거나 정치화하는 것은 바람직하지 않습니다.'",
        effectKey: "corporate_discretion",
        note: "외교적 마찰을 피하려 했으나, 미·중 양국 언론 모두로부터 '책임 회피성 기회주의'라는 혹평을 받습니다."
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
      crisisSummary: "한국이 미국 주도 공급망 동맹에 서명하자, 베이징 상무부는 예고대로 한국행 흑연·갈륨 통관을 전면 동결했습니다. 국내 배터리 3사 공장의 원자재 재고가 3주 분량으로 줄어들었습니다. 한편 워싱턴에서는 '한국 기업이 TSMC 빈자리를 독점해 얻는 초과이익의 75%를 미 국고에 환수하라'는 백악관의 당혹스러운 추가 조건이 날아들었습니다.",
      
      intelReports: [
        {
          id: "intel_m2_a_graphite",
          source: "포스코퓨처엠 · LG에너지솔루션 긴급 타전",
          title: "흑연 재고 고갈 시점 및 대체 광산 분석",
          content: "중국산 천연흑연 통관 차단으로 포항·청주 공장이 20일 뒤 멈춥니다. 호주 시라 리소스(Syrah Resources) 광산과 모잠비크 대체선이 있으나, 정제 비용이 40% 비싸고 통관에 2개월이 소요됩니다. 정부의 긴급 물류 바우처와 관세 보전이 시급합니다."
        },
        {
          id: "intel_m2_a_ustr",
          source: "워싱턴 주미 상무관 특전",
          title: "백악관 러스트벨트 일자리 연계 압박",
          content: "미국 측 초과이익 환수 요구는 협상용 블러핑입니다. 진짜 목적은 한국 반도체 기업들이 미국 현지 팹(텍사스 테일러)에 50억 달러를 추가 투자하여 오하이오·펜실베이니아 등 러스트벨트에 반도체 패키징 라인을 짓도록 유도하는 것입니다."
        }
      ],

      stakeholders: [
        {
          id: "battery_ceos",
          name: "배터리 3사 대표단",
          org: "LG에너지솔루션 · 삼성SDI · SK온",
          flag: "🔋",
          stance: "호주·모잠비크 대체 흑연 긴급 수입 자금 및 한·중 물밑 대화 요구",
          quote: "반도체 살리겠다고 미국에 올인한 대가를 배터리가 치르고 있습니다! 지금 당장 호주 흑연 대체 수입을 위한 정부 보증을 서주시거나, 중국 상무부와 물밑 대화를 열어 통관을 풀어주십시오!"
        },
        {
          id: "us_commerce_sec",
          name: "미 상무부 차관보",
          org: "미국 상무부",
          flag: "🇺🇸",
          stance: "텍사스 팹 조기 가동 및 초과이익 공유 협정 서명 요구",
          quote: "한국은 미국의 안보 우산 덕분에 TSMC의 빈자리를 차지했습니다. 미국 국민의 세금으로 지켜준 시장에서 한국 기업만 폭리를 취할 수는 없습니다. 초과이익 공유안에 서명하거나 미국 내 패키징 공장 추가 증설을 확약하십시오."
        }
      ],

      strategicChoices: [
        {
          id: "choice_m2_a1_counter_deal",
          label: "결단 1: 텍사스 첨단 패키징 증설 카드로 백악관 초과이익 환수안 무력화",
          description: "초과이익 환수를 단호히 거부하는 대신, 미국 현지 패키징 투자 일정을 6개월 앞당겨 러스트벨트 고용 3,000명을 선물합니다. 그 대가로 미국 정부로부터 '호주·캐나다산 배터리 광물 우선 조달 쿼터'를 역으로 뜯어냅니다.",
          rationale: "대미 동맹을 확고히 하면서도 부당한 국부 유출을 막고 배터리 광물 숨통을 틔웁니다."
        },
        {
          id: "choice_m2_a2_beijing_backchannel",
          label: "결단 2: 베이징 비공개 특사 파견 및 민간 가전 칩과 흑연의 물밑 교환",
          description: "미국의 감시망을 피해 제3국(홍콩)에서 중국 상무부와 비공개 물밑 담판을 엽니다. 중국 자동차·가전용 범용 반도체 공급을 비공식 보장해주는 조건으로, 한국 배터리용 흑연 통관을 조건부 해제시킵니다.",
          rationale: "배터리 산업의 즉각적인 공장 셧다운을 막지만, 미국 정보당국에 발각될 경우 치명적인 동맹 균열 위험이 있습니다."
        }
      ],

      pressQuestion: "KBS 경제부 기자: '중국의 흑연 보복으로 배터리 공장이 멈출 위기입니다. 미국은 한술 더 떠 반도체 초과이익을 내놓으라고 압박하고 있는데, 본부장님의 복안은 무엇입니까?'",
      pressStatements: [
        {
          id: "stmt_m2_a1",
          text: "'부당한 통상 압박에는 굴복하지 않습니다. 미국의 무리한 요구는 단호히 쳐내고, 원자재 다변화로 중국의 자원 무기화를 무력화하겠습니다.'",
          effectKey: "strong_resilience"
        },
        {
          id: "stmt_m2_a2",
          text: "'위기일수록 동맹과의 신뢰가 중요합니다. 미국과 상호 윈-윈할 수 있는 합리적 투자 패키지를 조속히 매듭짓겠습니다.'",
          effectKey: "deep_alliance"
        }
      ]
    },

    // BRANCH B: 전략적 중립 노선을 선택했을 때
    BRANCH_B: {
      title: "세컨더리 보이콧의 칼날과 베이징의 독이 든 사과",
      subtitle: "미 의회의 대외 통제 법안과 중국의 시장 개방 요구",
      crisisSummary: "한국이 '상업적 중립'을 표방하자, 미 의회 강경파는 한국 반도체 기업을 제재하기 위한 '해외직접생산품규칙(FDPR) 강화법'을 발의하며 세컨더리 보이콧을 경고했습니다. 반면 중국 상무부는 시안·우시 공장의 정상 가동을 허용하겠다면서, 대신 중국산 저가 전기차와 잉여 철강을 한국 시장에 무관세로 개방하라는 충격적인 역제안을 던졌습니다.",

      intelReports: [
        {
          id: "intel_m2_b_sanctions",
          source: "워싱턴 대형 로펌 통상 자문 보고서",
          title: "미 의회 FDPR 법안 통과 가능성 및 금융 제재 시나리오",
          content: "미 상원 은행위원회는 한국 시안 공장에 미국산 계측 장비가 단 한 대라도 반입될 경우 한국 반도체 결제 계좌를 동결하는 세컨더리 보이콧을 검토 중입니다. 법안 통과까지는 약 45일의 유예가 남아있어 의회 로비가 결정적입니다."
        },
        {
          id: "intel_m2_b_steel_dumping",
          source: "포스코 · 현대제철 긴급 탄원서",
          title: "중국산 철강·전기차 무관세 개방 시 국내 제조업 붕괴 추정",
          content: "중국의 제안을 수용해 중국산 철강 관세를 철폐하면 포항과 당진 제철소 가동률이 50% 밑으로 붕괴하고 1만 명 이상의 정리해고가 불가피합니다. 반도체 하나 살리자고 국가 기간산업인 철강과 자동차를 제물로 바칠 수는 없습니다."
        }
      ],

      stakeholders: [
        {
          id: "us_senator_lobby",
          name: "미 의회 대중특별위원회 위원장",
          org: "미국 연방의회",
          flag: "🇺🇸",
          stance: "중립 철회 및 중국 시안 공장 첨단 노드 완전 동결 최후통첩",
          quote: "자유와 독재 사이에는 중립이 없습니다! 한국이 베이징에 첨단 메모리를 계속 넘긴다면, 우리는 한국의 모든 대미 수출품에 대해 징벌적 상계관세를 매길 것입니다!"
        },
        {
          id: "posco_chairman",
          name: "장인화 포스코그룹 회장",
          org: "한국철강협회",
          flag: "🏗️",
          stance: "중국산 저가 덤핑 개방 절대 결사 반대",
          quote: "본부장님! 반도체 시안 공장 지키겠다고 중국산 밀어내기 철강을 무관세로 들여온다면 포항 고로 불을 꺼야 합니다. 철강 없는 반도체가 어디 있습니까? 덤핑 개방은 매국 행위입니다!"
        }
      ],

      strategicChoices: [
        {
          id: "choice_m2_b1_reject_china_dumping",
          label: "결단 1: 중국의 저가 덤핑 요구 전면 거부 & 미 의회 반도체 안보 설득 사절단 급파",
          description: "국내 철강 산업을 보호하기 위해 중국의 덤핑 무관세 요구를 일언지하에 거절합니다. 동시에 워싱턴 의회로 삼성·하이닉스 합동 사절단을 급파해 '한국 메모리가 멈추면 미국 빅테크의 AI 서버 구축도 올스톱된다'는 상호 확증 파괴 논리로 세컨더리 보이콧을 저지합니다.",
          rationale: "국내 제조업 생태계를 지키고 미국의 제재를 정면 돌파하지만, 베이징의 외교적 보복이 재점화될 수 있습니다."
        },
        {
          id: "choice_m2_b2_geneva_multilateral",
          label: "결단 2: 스위스 제네바 긴급 소집 - 미·중·한 3자 '반도체 안전통로 협약' 중재안 발의",
          description: "양자 대결의 함정에서 벗어나 WTO 및 제네바 다자 무대에서 '인도주의적·민간용 반도체 공급 안전통로' 협약을 전격 제안합니다. EU와 일본을 우군으로 끌어들여 미·중 양국 모두가 명분을 챙기며 한발 물러서도록 판을 키웁니다.",
          rationale: "외교적 품격과 다자주의적 해법을 창출하지만, 강대국들의 거부 시 한국이 국제적 미아로 전락할 위험이 있습니다."
        }
      ],

      pressQuestion: "조선일보 외교안보 선임기자: '미국은 세컨더리 보이콧을 위협하고 중국은 철강 시장을 열라고 협박합니다. 본부장님, 중립을 지키려다 양쪽에서 뺨을 맞고 있는 것 아닙니까?'",
      pressStatements: [
        {
          id: "stmt_m2_b1",
          text: "'흔들리지 않는 원칙이 곧 가장 강력한 외교입니다. 강대국의 일방적 위협에 일희일비하지 않고 당당하게 다자 규범으로 돌파하겠습니다.'",
          effectKey: "principled_stand"
        },
        {
          id: "stmt_m2_b2",
          text: "'외교는 흑백논리가 아닙니다. 국익의 실리를 위해 물밑에서 정교한 균형점을 찾고 있으니 지켜봐 주십시오.'",
          effectKey: "pragmatic_balance"
        }
      ]
    },

    // BRANCH C: 국내 자립화 & 신흥 시장 선회 노선을 선택했을 때
    BRANCH_C: {
      title: "용인 송전탑 전쟁과 세종을 찾은 유럽의 거인들",
      subtitle: "국내 팹 인프라 갈등과 EU·인도의 대체 수주 러시",
      crisisSummary: "미·중 외풍을 피해 국내 자립과 신흥 시장 다변화를 선언하자, TSMC의 대체 물량을 찾아 헤매던 독일 폭스바겐, 지멘스, 인도 타타그룹 고위 사절단이 통상교섭본부로 긴급 입국했습니다. '차량용 칩과 전력반도체를 장기 공급해주면 현지 관세를 영구 면제하겠다'는 파격 제안입니다. 그러나 국내에서는 용인 클러스터 초고압 송전망 노선을 둘러싸고 지자체 간 극한 대립으로 착공이 지연되며 공사 중단 위기에 봉착했습니다.",

      intelReports: [
        {
          id: "intel_m2_c_eu_deal",
          source: "주벨기에 EU 대표부 긴급 보고",
          title: "한·EU 차세대 모빌리티 반도체 전략 동맹 초안",
          content: "유럽은 대만해협 위기로 벤츠·BMW 생산 라인이 멈출 위기입니다. 한국이 차량용 반도체 30%를 전담 공급해준다면, EU CBAM(탄소국경세)에서 한국 철강·배터리를 5년간 전면 면제해 주겠다는 비밀 확약서를 들고 왔습니다."
        },
        {
          id: "intel_m2_c_power_grid",
          source: "한국전력공사 계통운영본부 내부 보고서",
          title: "용인 팹 송전선로 인허가 및 주민 수용성 현황",
          content: "안성·용인 간 345kV 송전탑 건설이 지자체 소송으로 중단되었습니다. 본부장이 국무회의에서 '국가기간 전력망 특별법 직권 발동'을 건의하지 않으면, 팹 완공 일정이 1년 뒤로 밀려 유럽 주문을 소화할 수 없게 됩니다."
        }
      ],

      stakeholders: [
        {
          id: "eu_auto_envoy",
          name: "독일 자동차산업협회장 & EU 무역총국 특사",
          org: "유럽연합 통상사절단",
          flag: "🇪🇺",
          stance: "차량용 반도체 10년 독점 공급 계약 및 EU CBAM 전액 면제 제안",
          quote: "유럽의 공장들이 멈추기 직전입니다. 한국이 공급을 약속한다면, 우리는 한국산 철강과 배터리에 부과될 예정이던 수조 원의 탄소세를 전액 면제하고 유럽 시장을 활짝 열어드리겠습니다!"
        },
        {
          id: "local_gov_head",
          name: "송전선로 경유 지자체 비상대책위원장",
          org: "지역 주민 대표단",
          flag: "🏛️",
          stance: "일방적 송전탑 강행 반대 및 전면 지중화 예산 요구",
          quote: "대기업 반도체 공장 하나 살리자고 우리 지역 주민들의 건강권을 희생할 수는 없습니다! 송전선로 전면 지중화 예산 1조 원을 지원하지 않는다면 공사 현장을 결사 저지할 것입니다!"
        }
      ],

      strategicChoices: [
        {
          id: "choice_m2_c1_power_fasttrack",
          label: "결단 1: 국가기간 전력망 직권 패스트트랙 발동 & EU·인도 500억 달러 초대형 빅딜 체결",
          description: "국무총리실과 직통하여 국가전력망 특별 직권을 즉각 발동, 지중화 보상 예산을 파격 지급하여 송전망 공사를 24시간 풀가동시킵니다. 확보된 생산능력으로 EU·인도 사절단과 '유럽 CBAM 면제 및 500억 달러 반도체 장기 수출' 메가 계약에 서명합니다.",
          rationale: "국가 자립형 수출 잭팟을 터뜨리고 유럽 탄소장벽을 무력화하지만, 예산 투입에 따른 재정 당국의 반발을 감당해야 합니다."
        },
        {
          id: "choice_m2_c2_sme_consortium",
          label: "결단 2: 국내 소부장 강소기업 전면 육성 컨소시엄 및 아세안 분산 생산 기지 구축",
          description: "대기업 중심의 집중 투자를 분산하여, 국내 200개 반도체 소부장 기업에 국가 R&D와 보증을 집중 지원합니다. 동시에 베트남·말레이시아에 완제품 패키징 분산 허브를 긴급 구축하여 지정학적 단일 리스크를 영구 분산합니다.",
          rationale: "국내 산업의 뿌리 경쟁력과 다변화를 달성하지만, 대규모 수주 성과가 가시화되기까지 2~3분기의 시차가 걸립니다."
        }
      ],

      pressQuestion: "동아일보 산업부장: '용인 팹 송전망 갈등이 폭발 직전인데, 유럽과 인도에서는 천문학적인 주문이 쏟아지고 있습니다. 본부장님은 이 병목을 어떻게 뚫으시겠습니까?'",
      pressStatements: [
        {
          id: "stmt_m2_c1",
          text: "'국가의 명운이 걸린 골든타임입니다. 과감한 국가적 결단과 보상으로 전력망을 뚫고, 유럽과의 역사적 통상 빅딜을 성사시키겠습니다.'",
          effectKey: "bold_breakthrough"
        },
        {
          id: "stmt_m2_c2",
          text: "'성장도 중요하지만 상생과 분산이 진정한 안보입니다. 지역 주민과 소부장 강소기업 모두가 승리하는 지속가능한 모델을 완성하겠습니다.'",
          effectKey: "sustainable_growth"
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
      climaxNarrative: "워싱턴 백악관 오벌 오피스에서 한·미 정상회담이 열렸습니다. 한국의 신속한 결단으로 미국 빅테크의 TSMC 대체 물량 85%를 한국 기업이 독점 수주하는 역사상 최대의 수출 계약이 성사 직전에 도달했습니다. 반면 중국 시안 팹은 사실상 레거시 전용 공장으로 전환되며 대중국 수출 지형이 영구히 재편되었습니다.",
      finalDecisionPrompt: "백악관 최종 서명식 직전, 미 무역대표부는 '향후 10년간 한국산 반도체에 대해 무관세를 영구 보장하는 대신, 한국의 대미 무역흑자 축소를 위해 미국산 셰일가스(LNG) 연간 80억 달러 장기 구매 계약'을 최종 부속서로 요구했습니다.",
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
      endingEpilogue: "한국 반도체는 서방 자유세계의 확고한 공급망 핵심 축으로 우뚝 섰습니다. 대미 수출은 역대 최고치를 갱신했으며, 포스코와 배터리 3사는 호주·캐나다 광산과의 직거래망을 구축해 중국 리스크를 극복했습니다."
    },

    // BRANCH B: 전략적 중립 노선의 결전
    BRANCH_B: {
      title: "제네바 실리콘 협정과 실용 외교의 승리",
      subtitle: "스위스 제네바 비밀 다자 담판과 미·중 사이의 독자 생존",
      climaxNarrative: "스위스 제네바 WTO 본부 비공개 회의실. 플레이어가 주도한 한·미·중 3자 긴급 고위급 실무 회담에서 기적적인 중재안이 도출되었습니다. 한국의 시안·우시 공장은 '국제원자력기구(IAEA) 식 사찰에 준하는 민간 최종사용자 검증'을 거쳐 가동을 유지하고, 미국과 중국 모두 한국의 중립적 공급 능력을 공식 인정하는 '제네바 실리콘 협정'이 눈앞에 다가왔습니다.",
      finalDecisionPrompt: "양국 대표단이 협정문에 서명하기 직전, 미 상원의원이 '한국이 중국에 판매하는 메모리 칩에 대해 개당 2달러의 글로벌 안보 기여금을 징수해야 한다'는 기습 수정안을 올렸습니다.",
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
      endingEpilogue: "통상교섭본부장의 집요하고 정교한 다자 외교는 강대국들의 고래 싸움 속에서 대한민국 새우의 등을 터뜨리지 않았습니다. 한국은 시안 공장과 미국 수출선 모두를 기적적으로 지켜내며 '세계의 무역 공방'으로 우뚝 섰습니다."
    },

    // BRANCH C: 국내 자립 & 신흥 시장 선회의 결전
    BRANCH_C: {
      title: "자립형 K-반도체 르네상스와 유라시아 실크로드",
      subtitle: "용인 팹 가동과 EU·인도·동남아를 잇는 비동맹 수출 동맹",
      climaxNarrative: "용인 반도체 메가 클러스터 제1기 팹에서 첫 웨이퍼가 성공적으로 출하되었습니다. 세종시 통상교섭본부 대회의실에서는 독일 경제장관, 인도 통상장관, 아세안 사무총장이 나란히 앉아 '신(新) 유라시아 모빌리티·AI 반도체 다자 자유무역협정'에 정식 서명하고 있습니다. 한국은 미·중 양국의 눈치를 보지 않는 완전한 기술 주권을 입증했습니다.",
      finalDecisionPrompt: "서명식 현장에서 유럽연합 통상집행위원은 '한국산 친환경 수소 환원 제철 및 무탄소 배터리에 대해서도 EU 시장 관세를 0%로 영구 고정하는 특별 부속 협정'을 추가 제안해 왔습니다.",
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
      endingEpilogue: "위기를 기회로 바꾼 담대한 자주 통상의 승리였습니다. 한국은 미국과 중국이라는 거대한 두 기둥 사이에서 탈출하여, 유럽과 신흥 거대 시장을 아우르는 독자적인 글로벌 산업 네트워크의 맹주로 거듭났습니다."
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

  // Choose strategic directive for current month
  makeStrategicDecision(choiceId, gameEngine) {
    const stageData = this.getCurrentStageData();
    if (!stageData) return null;

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
        // Massive semiconductor capacity boost to US, but tariff/barrier from China
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
        // Balanced memory trade, defense of China fab
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
        // Domestic cluster boost, Europe/India relations up
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
    this.inspectedIntels = new Set(data.inspectedIntels || []);
    this.isCompleted = data.isCompleted || false;
    this.finalEpilogue = data.finalEpilogue || null;
  }
}
