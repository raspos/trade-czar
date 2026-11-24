// dist/events-czar.mjs - 44 Distinct Geopolitical & Trade Events for TRADE CZAR 2.0
// Strict Character Limits:
// - Title: <= 20 characters
// - Description: <= 120 characters
// - Choices: <= 40 characters each (Zero spoiler numbers)
// - Reaction Feedback: <= 80 characters
// - State flags remembered across months to trigger delayed consequences

export const EVENTS = [
  // 1. 미국의 최후통첩 (자동차 25% 관세)
  {
    id: "evt_us_auto_tariff",
    minMonth: 1, maxMonth: 1,
    title: "미국의 최후통첩",
    desc: "미국이 한국산 자동차에 25% 관세를 통보했다. 현대차는 긴급 지원을 요청했고 백악관은 48시간의 시한을 제시했다.",
    image: "./assets/negotiation-us.jpg",
    choices: [
      {
        id: "c1",
        text: "미국산 에너지 수입 확대를 제안한다.",
        feedback: "백악관이 알래스카 LNG 구매 제안을 수용하며 관세를 잠정 유예했다.",
        effect: (state) => {
          state.flags.us_energy_deal = true;
          state.politics.stats.presidentTrust += 6;
          state.politics.stats.publicApproval += 4;
          state.economy.partnerStates.US.tariffs.automobile = 0.02;
          state.economy.partnerStates.US.relations += 8;
        },
        newsHeadline: "韓·美 자동차 관세 유예 극적 타결…알래스카 LNG 구매 카드로 백악관 설득",
        newsBody: "통상교섭본부장이 워싱턴과의 마라톤 협상 끝에 대미 자동차 25% 관세 부과를 잠정 유예시키는 합의를 이끌어냈다. 한국이 미국산 에너지 수입을 대폭 확대하는 대신 주력 수출 품목인 자동차의 관세 면제를 확보한 실용적 빅딜로 평가받고 있다."
      },
      {
        id: "c2",
        text: "자동차 기업의 현지 투자를 중재한다.",
        feedback: "현대차가 조지아 증설을 확정했으나 국내 노조가 반발하기 시작했다.",
        effect: (state) => {
          state.flags.us_factory_concession = true;
          state.politics.stats.businessTrust += 5;
          state.politics.stats.publicApproval -= 3;
          state.economy.industryStates.automobile.capacityIndex -= 2;
        },
        newsHeadline: "현대차 조지아 공장 추가 증설 합의…국내 노조 '일자리 유출' 강력 반발",
        newsBody: "미국의 자동차 관세 압박을 해소하기 위해 현대자동차가 미국 현지 공장 대규모 증설안을 전격 발표했다. 관세 장벽은 피했으나 국내 마더팩토리 생산 물량 축소를 우려한 노동계의 반발이 거세지며 새로운 국내 갈등의 불씨가 되고 있다."
      },
      {
        id: "c3",
        text: "관세 부과 시 맞대응하겠다고 선언한다.",
        feedback: "워싱턴이 강하게 반발하며 대미 자동차 수출 통관이 지연되기 시작했다.",
        effect: (state) => {
          state.flags.us_trade_clash = true;
          state.politics.stats.presidentTrust -= 5;
          state.politics.stats.publicApproval += 5;
          state.economy.partnerStates.US.tariffs.automobile = 0.15;
          state.economy.industryStates.automobile.tradeBarrierIndex += 15;
        },
        newsHeadline: "韓·美 통상 전면전 위기…정부 '미국산 농축산물 보복 관세' 배수진",
        newsBody: "통상교섭본부장이 미국의 일방적 자동차 25% 관세 위협에 대해 즉각적인 맞대응을 선언하며 양국 관계가 급랭했다. 당당한 외교라는 여론의 지지와 수출 전선에 치명적 타격을 입을 것이라는 산업계의 우려가 극명하게 엇갈리고 있다."
      }
    ]
  },

  // 2. 중국의 희토류 통관 보복
  {
    id: "evt_china_raw_block",
    minMonth: 2, maxMonth: 3,
    condition: (state) => state.flags.us_energy_deal || state.currentMonth === 2,
    title: "중국의 자원 무기화",
    desc: "중국 세관이 한국행 흑연과 갈륨의 통관을 동결했다. 배터리 3사의 핵심 원자재 재고는 보름치에 불과하다.",
    image: "./assets/negotiation-cn.jpg",
    choices: [
      {
        id: "c1",
        text: "베이징에 특사를 파견해 타협점을 찾는다.",
        feedback: "중국 상무부가 통관을 조건부 재개하며 한중 FTA 개정을 요구했다.",
        effect: (state) => {
          state.flags.china_appeased = true;
          state.politics.stats.diplomaticTrust += 5;
          state.economy.industryStates.battery.capacityIndex = Math.max(85, state.economy.industryStates.battery.capacityIndex);
        },
        newsHeadline: "베이징 협상단 파견…中 흑연 통관 조건부 재개하며 통상 양보 요구",
        newsBody: "한국 정부가 베이징에 긴급 고위급 특사를 파견하여 배터리 원자재 수출 통제 동결을 부분 해제시켰다. 중국은 원자재 카드를 쥐고 한중 FTA 서비스·투자 후속 협상에서 한국 시장의 추가 개방을 압박하고 나섰다."
      },
      {
        id: "c2",
        text: "호주와 캐나다로 공급망을 긴급 전환한다.",
        feedback: "대체 공급망 확보로 위기를 넘겼으나 단기 조달 비용이 급등했다.",
        effect: (state) => {
          state.flags.china_decoupled_battery = true;
          state.politics.stats.businessTrust += 7;
          state.politics.stats.publicApproval += 4;
          state.economy.industryStates.battery.priceCompetitiveness -= 3;
        },
        newsHeadline: "K-배터리 탈중국 공급망 속도…호주·캐나다와 핵심광물 직도입 계약 체결",
        newsBody: "정부와 배터리 3사가 중국의 흑연 수출 통제에 맞서 호주 및 캐나다 광산과의 장기 직구매 계약을 전격 체결했다. 공급망 다변화로 자원 안보는 확보했으나 생산 원가 상승 부담은 당분간 불가피할 전망이다."
      }
    ]
  },

  // 3. 대만해협 봉쇄 위기와 반도체 대란
  {
    id: "evt_taiwan_strait_shock",
    minMonth: 2, maxMonth: 4,
    title: "대만해협의 군사적 긴장",
    desc: "대만해협 군사 훈련으로 주요 해상 항로가 막혔다. TSMC 공장 가동 중단 소식에 글로벌 반도체 주문이 쇄도한다.",
    image: "./assets/war-room.jpg",
    choices: [
      {
        id: "c1",
        text: "국내 반도체 생산라인을 최대 가동한다.",
        feedback: "평택과 화성 팹이 풀가동되며 메모리 반도체 수출이 폭증했다.",
        effect: (state) => {
          state.flags.semiconductor_boom = true;
          state.politics.stats.presidentTrust += 8;
          state.economy.industryStates.semiconductor.capacityIndex += 6;
          state.economy.industryStates.semiconductor.utilizationRate = 98.0;
        },
        newsHeadline: "대만해협 충돌 위기 속 K-반도체 풀가동…글로벌 IT 빅테크 주문 쇄도",
        newsBody: "대만해협 해상 봉쇄로 TSMC 생산 차질이 현실화되자 삼성전자와 SK하이닉스 평택·이천 팹으로 대체 수요가 급증했다. 반도체 수출 단가가 급등하며 월간 무역수지가 대폭 흑자로 반등했다."
      },
      {
        id: "c2",
        text: "중립을 지키며 공급망 안정을 촉구한다.",
        feedback: "외교적 마찰을 피했으나 미·중 양국으로부터 기회주의라는 비판을 받았다.",
        effect: (state) => {
          state.politics.stats.diplomaticTrust += 3;
          state.politics.stats.publicApproval -= 4;
        },
        newsHeadline: "정부, 대만해협 사태 '원칙적 중립' 견지…미·중 양측서 어정쩡한 외교 비판",
        newsBody: "대만해협 위기 국면에서 통상 당국이 특정 진영에 치우치지 않는 신중론을 취했다. 안보 리스크 노출은 피했으나 급변하는 지정학적 국면에서 전략적 주도권을 상실했다는 지적이 제기된다."
      }
    ]
  },

  // 4. 미국 인플레이션 감축법(FEOC) 수정 압박
  {
    id: "evt_us_feoc_pressure",
    minMonth: 3, maxMonth: 5,
    title: "미국의 반도체 장비 통제",
    desc: "미 상무부가 중국 내 한국 반도체 공장에 대한 미국산 첨단 장비 반입 유예를 취소하겠다고 통보했다.",
    image: "./assets/negotiation-us.jpg",
    choices: [
      {
        id: "c1",
        text: "대미 투자 확대를 걸고 예외 승인을 요구한다.",
        feedback: "백악관과 담판 끝에 1년간 장비 반입 추가 유예를 확보했다.",
        effect: (state) => {
          state.flags.us_chip_waiver = true;
          state.politics.stats.presidentTrust += 5;
          state.politics.stats.businessTrust += 8;
        },
        newsHeadline: "삼성·SK 시안·우시 공장 장비 반입 1년 연장…워싱턴 마라톤 담판 주효",
        newsBody: "통상교섭본부장이 워싱턴을 전격 방문해 대미 반도체 투자 이행을 지렛대로 중국 내 한국 생산 공장에 대한 미국산 첨단 장비 반입 유예 1년 연장을 공식 승인받았다."
      },
      {
        id: "c2",
        text: "중국 팹 비중을 점진적으로 축소한다.",
        feedback: "국내 리쇼어링을 추진했으나 기존 중국 설비 매몰비용이 발생했다.",
        effect: (state) => {
          state.flags.china_exit_begun = true;
          state.politics.stats.businessTrust -= 4;
          state.economy.industryStates.semiconductor.longTermCompetitiveness += 5;
        },
        newsHeadline: "정부, 대중 반도체 투자 축소 및 국내 리쇼어링 촉진책 가동 발표",
        newsBody: "미국의 수출 통제 강화에 직면한 정부가 중국 공장 증설을 사실상 중단하고 국내 용인 클러스터 중심의 설비 투자를 강화하는 반도체 공급망 대전환 전략을 발표했다."
      }
    ]
  },

  // 5. 호르무즈 해협 위기와 에너지 쇼크
  {
    id: "evt_hormuz_energy_shock",
    minMonth: 4, maxMonth: 6,
    title: "호르무즈 해협 봉쇄",
    desc: "중동 전쟁 확전으로 원유 수송로가 막히며 두바이유가 배럴당 120달러를 돌파했다. 무역수지 적자 경보가 울렸다.",
    image: "./assets/origins-trade.jpg",
    choices: [
      {
        id: "c1",
        text: "정부 비축유를 방출하고 유류세를 인하한다.",
        feedback: "물가 급등은 진정되었으나 국가 재정 부담이 크게 늘어났다.",
        effect: (state) => {
          state.politics.stats.publicApproval += 6;
        },
        newsHeadline: "국제유가 120달러 돌파에 정부 비축유 전격 방출…유류세 인하 연장",
        newsBody: "호르무즈 해협 봉쇄 위기로 에너지 수입액이 급증하자 정부가 비상경제대책을 가동했다. 90일분의 정부 비축유를 시장에 풀고 긴급 수입선 다변화 지원금을 편성했다."
      },
      {
        id: "c2",
        text: "에너지 다소비 기업에 긴급 절감령을 내린다.",
        feedback: "철강과 석유화학 공장 가동률이 하락하며 생산에 차질이 생겼다.",
        effect: (state) => {
          state.politics.stats.businessTrust -= 6;
          state.economy.industryStates.steel.utilizationRate -= 8;
        },
        newsHeadline: "에너지 위기에 철강·석화 공장 가동률 조정…산업계 채산성 악화 호소",
        newsBody: "유가 급등에 따른 무역수지 방어를 위해 대형 제조 시설에 대한 에너지 절감 대책이 시행되었다. 주요 제철소와 석유화학 콤플렉스가 감산에 들어가며 수출 물량이 일시 감소했다."
      }
    ]
  },

  // 6. 농민단체의 트랙터 상경 시위
  {
    id: "evt_farmer_tractor_protest",
    minMonth: 4, maxMonth: 7,
    title: "농민 트랙터 상경 시위",
    desc: "미국산 농산물 개방 압력에 반발한 전국 5만 농민이 트랙터를 몰고 세종청사와 여의도로 진격했다.",
    image: "./assets/crisis52.jpg",
    choices: [
      {
        id: "c1",
        text: "1조원 상생기금을 신설해 농가를 달랜다.",
        feedback: "농민회가 시위를 일시 유보했으나 기재부가 재정 악화를 경고했다.",
        effect: (state) => {
          state.flags.farmer_compensated = true;
          state.politics.stats.publicApproval += 6;
          state.politics.stats.presidentTrust -= 2;
        },
        newsHeadline: "농민 시위에 '1조원 농어촌상생기금' 신설 합의…농축산물 개방 갈등 봉합",
        newsBody: "통상교섭본부장과 농림부 장관이 농민단체 대표단을 밤샘 면담한 끝에 대규모 상생기금 조성에 전격 합의했다. 농가 피해 직접 보전 방안이 확정되면서 격화되던 도심 시위가 진정 국면에 접어들었다."
      },
      {
        id: "c2",
        text: "국제 규범상 쌀과 쇠고기 양보는 불가하다고 천명한다.",
        feedback: "국민 여론은 지지했으나 미국 무역대표부가 보복 조치를 예고했다.",
        effect: (state) => {
          state.flags.agri_firm_stand = true;
          state.politics.stats.publicApproval += 8;
          state.economy.partnerStates.US.tariffs.steel += 0.05;
        },
        newsHeadline: "정부 '쌀·쇠고기 양허 절대 불가' 배수진…美 USTR '철강 관세 보복' 경고",
        newsBody: "통상교섭본부장이 대국민 담화를 통해 주식인 쌀과 기초 축산물의 시장 개방은 타협 불가의 마지노선임을 선언했다. 농민들은 환영했으나 워싱턴은 한국산 철강에 대한 보복 조치를 경고했다."
      }
    ]
  },

  // 7. EU 탄소국경조정제도(CBAM) 철강 위기
  {
    id: "evt_eu_cbam_steel",
    minMonth: 5, maxMonth: 7,
    title: "EU 탄소국경세의 칼날",
    desc: "유럽연합이 철강 탄소배출량 인증 미달을 이유로 한국산 철강에 톤당 80유로의 과징금을 부과하겠다고 통보했다.",
    image: "./assets/negotiation-multi.jpg",
    choices: [
      {
        id: "c1",
        text: "한국형 수소환원제철 R&D를 전폭 지원한다.",
        feedback: "포스코가 친환경 전환에 박차를 가했으나 단기 비용이 발생했다.",
        effect: (state) => {
          state.flags.green_steel_pushed = true;
          state.politics.stats.businessTrust += 7;
          state.economy.industryStates.steel.longTermCompetitiveness += 8;
        },
        newsHeadline: "정부, 수소환원제철 5조원 특별지원…EU 탄소국경세 정면 돌파 선언",
        newsBody: "유럽연합의 강력한 탄소 규제에 맞서 정부와 철강업계가 손잡고 친환경 제철 대전환 로드맵을 발표했다. 막대한 초기 투자가 수반되나 장기적으로 유럽 그린스틸 시장을 선점할 교두보가 될 것으로 기대된다."
      },
      {
        id: "c2",
        text: "일본 및 대만과 함께 다자 연대로 EU를 압박한다.",
        feedback: "아시아 3개국의 공동 성명에 브뤼셀이 시행 유예를 검토하기 시작했다.",
        effect: (state) => {
          state.politics.stats.diplomaticTrust += 6;
          state.economy.partnerStates.EU.relations += 4;
        },
        newsHeadline: "韓·日·대만, EU 탄소국경세 반대 공동전선 구축…브뤼셀에 유예안 제출",
        newsBody: "아시아 주요 제조업 3개국이 EU의 탄소국경조정제도가 신종 보호무역 장벽이라며 공동 대응에 나섰다. 제네바에서 열린 다자 협의에서 과징금 산정 기준의 2년 유예를 강력히 촉구했다."
      }
    ]
  },

  // 8. K-방산 폴란드·루마니아 20조원 대규모 수주
  {
    id: "evt_defense_mega_deal",
    minMonth: 5, maxMonth: 8,
    title: "K-방산 20조원 메가딜",
    desc: "폴란드와 루마니아가 K2 전차와 자주포 2차 도입 계약을 추진하며 한국수출입은행의 추가 수출 금융을 요구했다.",
    image: "./assets/ministry52.jpg",
    choices: [
      {
        id: "c1",
        text: "수은 자본금을 늘려 수출 금융을 즉각 승인한다.",
        feedback: "20조원 무기 수출 계약이 최종 체결되며 방산 수주가 확정되었다.",
        effect: (state) => {
          state.flags.defense_mega_success = true;
          state.politics.stats.presidentTrust += 10;
          state.politics.stats.publicApproval += 5;
          state.economy.industryStates.automobile.pendingDeliveries += 15.0;
        },
        newsHeadline: "K-방산 20조원 동유럽 잭팟…정부 정책금융 보증으로 메가딜 최종 성사",
        newsBody: "정부가 수출입은행의 보증 한도를 긴급 확대하여 폴란드 및 루마니아와의 20조원 규모 방산 수출 계약을 최종 매듭지었다. 방위산업이 반도체와 자동차를 잇는 새로운 무역수지 흑자 견인차로 부상했다."
      },
      {
        id: "c2",
        text: "국가 재정 리스크를 고려해 보증 규모를 축소한다.",
        feedback: "경쟁국 프랑스가 빈틈을 노리고 자체 무기 패키지를 들이밀었다.",
        effect: (state) => {
          state.politics.stats.presidentTrust -= 5;
          state.politics.stats.businessTrust -= 4;
        },
        newsHeadline: "수출금융 보증 축소에 방산 계약 난항…프랑스 경쟁사 반사이익 우려",
        newsBody: "정부가 재정 건전성을 이유로 동유럽 방산 수출에 대한 금융 보증 지원 규모를 축소하면서 최종 계약 체결이 지연되고 있다. 방산업계는 프랑스와 독일의 적극적 마케팅에 수주를 뺏길 수 있다고 호소했다."
      }
    ]
  },

  // 9. 일본의 첨단 소재 수출 심사 지연
  {
    id: "evt_japan_materials_delay",
    minMonth: 6, maxMonth: 8,
    title: "일본의 반도체 소재 견제",
    desc: "일본 경제산업성이 한국행 극자외선(EUV) 포토레지스트에 대한 개별 수출 심사를 60일 이상 지연시키고 있다.",
    image: "./assets/negotiation-cn.jpg",
    choices: [
      {
        id: "c1",
        text: "소부장 국산화 긴급 펀드 2조원을 투입한다.",
        feedback: "국내 소재 기업들의 국산화 개발 속도가 획기적으로 단축되었다.",
        effect: (state) => {
          state.flags.sobujang_self_reliance = true;
          state.politics.stats.publicApproval += 7;
          state.economy.industryStates.semiconductor.longTermCompetitiveness += 6;
        },
        newsHeadline: "日 소재 심사 지연에 소부장 자립 펀드 2조 투입…'소재 주권' 승부수",
        newsBody: "일본의 첨단 반도체 소재 수출 심사 지연이 장기화되자 정부가 국내 소부장 강소기업에 2조원의 긴급 자금을 투입하기로 했다. 단기적 조달 애로는 국산 대체품 조기 상용화로 정면 돌파한다는 구상이다."
      },
      {
        id: "c2",
        text: "도쿄에 방문해 양국 상호 신뢰 복원을 제안한다.",
        feedback: "일본 측이 심사를 재개했으나 과거사 현안에 침묵했다는 비판을 받았다.",
        effect: (state) => {
          state.politics.stats.diplomaticTrust += 5;
          state.politics.stats.publicApproval -= 4;
        },
        newsHeadline: "한일 통상장관 도쿄 회담…日 'EUV 포토레지스트 수출 심사 정상화' 합의",
        newsBody: "통상교섭본부장이 도쿄를 방문하여 일본 경제산업상과의 전격 회담을 갖고 반도체 핵심 소재의 심사 정상화를 이끌어냈다. 공급망 안정은 되찾았으나 대일 외교에서 지나치게 저자세를 취했다는 비판도 제기된다."
      }
    ]
  },

  // 10. 미 해군 함정 MRO 100억 달러 수주 기회
  {
    id: "evt_us_naval_mro",
    minMonth: 6, maxMonth: 9,
    title: "미 해군 함정 MRO 수주",
    desc: "미 해군성 장관이 한국 조선소를 방문해 7함대 소속 함정 유지·보수·정비(MRO) 독점 사업권을 제안했다.",
    image: "./assets/origins-trade.jpg",
    choices: [
      {
        id: "c1",
        text: "거제와 울산 조선소를 해군 MRO 기지로 지정한다.",
        feedback: "미 해군과의 연간 수조원대 장기 서비스 정비 계약이 체결되었다.",
        effect: (state) => {
          state.flags.naval_mro_won = true;
          state.politics.stats.presidentTrust += 7;
          state.politics.stats.businessTrust += 8;
          state.economy.servicesStates.navalMroActive = true;
          state.economy.servicesStates.navalMroLevel = 8.0;
        },
        newsHeadline: "한화오션·HD현대, 美 해군 7함대 MRO 전격 수주…연 5조원 방산 서비스 개막",
        newsBody: "한국 조선업계가 미 해군 함정 유지·보수·정비(MRO) 사업에 본격 진출했다. 거제와 울산 조선소가 미 해군 지정 정비창으로 등록되며 군함 건조와 정비를 아우르는 고부가가치 서비스 무역이 열렸다."
      },
      {
        id: "c2",
        text: "중국과의 군사적 긴장을 우려해 민간 선박에 집중한다.",
        feedback: "중국과의 마찰은 피했으나 조선업계가 천문학적 수익 기회를 놓쳤다.",
        effect: (state) => {
          state.politics.stats.businessTrust -= 7;
          state.economy.partnerStates.CN.relations += 4;
        },
        newsHeadline: "정부, 미 함정 MRO 참여 신중론…조선업계 '10조원 미래 먹거리 상실' 탄식",
        newsBody: "정부가 대중국 외교적 마찰과 주변국 안보 우려를 감안해 미 해군 함정 MRO 사업 참여에 소극적 입장을 취했다. 조선업계는 도크 활용도와 수익성 극대화의 황금 기회를 놓쳤다며 실망감을 감추지 못하고 있다."
      }
    ]
  },

  // 11. 현대차 노조 총파업
  {
    id: "evt_hyundai_labor_strike",
    minMonth: 7, maxMonth: 9,
    title: "자동차 노조 총파업",
    desc: "해외 생산 확대를 막겠다며 현대차와 기아 노조가 전면 파업에 돌입했다. 하루 수출 차질액이 3천억 원에 달한다.",
    image: "./assets/crisis52.jpg",
    choices: [
      {
        id: "c1",
        text: "노사정 중재로 국내 전기차 신공장 투자를 약속한다.",
        feedback: "노조가 파업을 철회하고 국내 미래차 전환 합의서에 서명했다.",
        effect: (state) => {
          state.flags.labor_compromise = true;
          state.politics.stats.publicApproval += 5;
          state.politics.stats.businessTrust += 4;
          state.economy.industryStates.automobile.utilizationRate = 92.0;
        },
        newsHeadline: "현대차 노사 '국내 미래차 생산 10조원 확약' 극적 타결…파업 3일 만에 철회",
        newsBody: "통상교섭본부장의 중재로 현대차 노사가 파업을 접고 극적인 대타협을 이뤄냈다. 사측이 국내 울산·화성 공장에 차세대 PBV 및 전기차 라인을 우선 배정하기로 약속하며 수출 전선이 정상화되었다."
      },
      {
        id: "c2",
        text: "불법 파업에 대해 엄정 법 집행을 경고한다.",
        feedback: "파업이 장기화되며 미국 딜러망의 재고가 바닥나기 시작했다.",
        effect: (state) => {
          state.politics.stats.businessTrust += 5;
          state.politics.stats.publicApproval -= 6;
          state.economy.industryStates.automobile.capacityIndex -= 5;
        },
        newsHeadline: "정부 '자동차 불법 파업 무관용' 천명…노정 정면충돌 속 생산 차질 장기화",
        newsBody: "정부가 자동차 파업에 대해 법과 원칙에 따른 엄정 대응을 고수하면서 노정 갈등이 파국으로 치달았다. 완성차 선적이 전면 중단되면서 북미 시장 점유율이 급락하는 등 수출 피해가 눈덩이처럼 불어나고 있다."
      }
    ]
  },

  // 12. 국회 긴급 청문회 소환
  {
    id: "evt_national_assembly_grill",
    minMonth: 7, maxMonth: 10,
    title: "국회 긴급 청문회 소환",
    desc: "야당이 대외 통상 밀실 협상 의혹을 제기하며 국회 산자위 청문회에 본부장 출석과 비준 거부를 결의했다.",
    image: "./assets/hearing52.jpg",
    choices: [
      {
        id: "c1",
        text: "협상 전문을 전격 공개하고 정면 돌파한다.",
        feedback: "투명성이 인정받으며 여야 의원 다수의 지지를 이끌어냈다.",
        effect: (state) => {
          state.politics.stats.presidentTrust += 6;
          state.politics.stats.publicApproval += 7;
        },
        newsHeadline: "통상본부장, 국회 청문회서 협상 전문 전격 공개…'국익 중심 정면돌파' 평가",
        newsBody: "통상교섭본부장이 국회 산자위 비공개 청문회에 출석해 미국 및 주요국과의 외교 전문을 가감 없이 공개하며 협상의 당위성을 조목조목 설명했다. 솔직한 소통 행보에 야당 온건파마저 설득되었다는 평가다."
      },
      {
        id: "c2",
        text: "외교 기밀 유지를 이유로 비공개 답변으로 일관한다.",
        feedback: "야당이 본부장 해임건의안 발의를 선언하며 국회가 마비되었다.",
        effect: (state) => {
          state.politics.stats.presidentTrust -= 7;
          state.politics.stats.publicApproval -= 8;
        },
        newsHeadline: "야당 '통상 밀실 협상 규탄' 본부장 해임건의안 발의…정국 급랭",
        newsBody: "국회 청문회에서 통상교섭본부장이 핵심 협상 데이터 제출을 거부하자 야당 의원들이 전원 퇴장하며 해임건의안을 공식 발의했다. 정쟁이 격화되면서 국회 비준동의안 처리가 안갯속에 빠졌다."
      }
    ]
  },

  // 13. 중소 수출기업 자금난
  {
    id: "evt_sme_liquidity_crisis",
    minMonth: 8, maxMonth: 10,
    title: "중소 수출기업 자금난",
    desc: "글로벌 고금리와 원자재가 상승으로 2·3차 수출 부품 협력업체들이 연쇄 흑자 부도 위기에 처했다.",
    image: "./assets/crisis52.jpg",
    choices: [
      {
        id: "c1",
        text: "3조원 규모의 긴급 유동성 특례보증을 지원한다.",
        feedback: "부품 생태계의 줄도산을 막아내며 수출 공급망을 사수했다.",
        effect: (state) => {
          state.politics.stats.businessTrust += 10;
          state.politics.stats.publicApproval += 4;
          state.economy.industryStates.automobile.capacityIndex += 3;
        },
        newsHeadline: "정부, 수출 중소기업에 3조 특례보증 긴급 수혈…부품 생태계 붕괴 저지",
        newsBody: "통상 당국이 금융위와 손잡고 고환율·고금리로 자금난에 빠진 수출 협력사들에 3조원의 긴급 보증을 전격 지원했다. 자동차와 조선 2차 협력업체들의 도산 도미노를 막아내며 생산 기반을 지켜냈다."
      },
      {
        id: "c2",
        text: "부실기업은 구조조정하고 강소기업에 집중한다.",
        feedback: "체질 개선을 이뤘으나 중소기업 단체의 거센 비판을 받았다.",
        effect: (state) => {
          state.politics.stats.businessTrust -= 4;
          state.politics.stats.publicApproval -= 5;
          state.economy.industryStates.automobile.priceCompetitiveness += 4;
        },
        newsHeadline: "한계 수출기업 옥석 가리기 착수…중기계 '현장 외면한 냉혹한 구조조정' 반발",
        newsBody: "정부가 무조건적 자금 지원을 지양하고 기술력을 갖춘 우량 강소기업에만 선별 지원하겠다는 방침을 고수했다. 산업 경쟁력 강화라는 명분 뒤로 한계 기업들의 폐업이 잇따르며 고용 불안이 고조되고 있다."
      }
    ]
  },

  // 14. 카타르 친환경선 수주
  {
    id: "evt_qatar_ammonia_ship",
    minMonth: 8, maxMonth: 11,
    title: "카타르 친환경선 수주",
    desc: "카타르 에너지가 발주한 50억 달러 규모의 초대형 암모니아 운반선 20척 수주 경쟁에서 한국이 유력 후보로 올랐다.",
    image: "./assets/origins-trade.jpg",
    choices: [
      {
        id: "c1",
        text: "정부 차관과 연계해 20척 전량 수주를 확정한다.",
        feedback: "조선 3사가 도크를 가득 채우며 3년치 일감을 확보했다.",
        effect: (state) => {
          state.flags.ship_super_cycle = true;
          state.politics.stats.presidentTrust += 6;
          state.politics.stats.businessTrust += 8;
          state.economy.industryStates.automobile.pendingDeliveries += 12;
        },
        newsHeadline: "조선 3사, 카타르 암모니아선 20척 전량 싹쓸이…50억 달러 수주 대박",
        newsBody: "한국 조선업계가 카타르의 초대형 친환경 암모니아 운반선 프로젝트를 독점 수주하는 쾌거를 거뒀다. 정부의 통상 외교와 조선소의 압도적 기술력이 결합해 중국 조선소의 저가 공세를 완벽히 격파했다."
      },
      {
        id: "c2",
        text: "수익성 위주로 선별하여 10척만 선별 계약한다.",
        feedback: "남은 물량을 중국이 가져갔으나 최고 선가를 기록했다.",
        effect: (state) => {
          state.politics.stats.businessTrust += 4;
        },
        newsHeadline: "조선업계, 고부가가치 선별 수주 전략…카타르선 10척 최고가 계약 체결",
        newsBody: "도크 포화 상태를 감안한 한국 조선사들이 수익성이 가장 높은 선별 물량만 계약하는 전략을 택했다. 전체 물량 일부는 중국에 넘어갔으나 척당 건조 마진은 사상 최고치를 경신했다."
      }
    ]
  },

  // 15. 한미 정상회담 담판
  {
    id: "evt_president_summit_deal",
    minMonth: 10, maxMonth: 11,
    title: "한미 정상회담 담판",
    desc: "대통령의 백악관 국빈 방문을 앞두고 미국이 반도체·자동차·에너지를 망라한 포괄적 통상 선언문 서명을 요구한다.",
    image: "./assets/president-rebuild.jpg",
    choices: [
      {
        id: "c1",
        text: "통상 불확실성을 완전히 종식시키는 조약에 서명한다.",
        feedback: "정상회담에서 조약이 발표되며 주가와 원화 가치가 급등했다.",
        effect: (state) => {
          state.flags.summit_pact_signed = true;
          state.politics.stats.presidentTrust += 12;
          state.politics.stats.publicApproval += 8;
          state.economy.partnerStates.US.relations += 15;
        },
        newsHeadline: "한·미 백악관 통상 안보 대타협 서명…반도체·자동차 관세 리스크 완전 해소",
        newsBody: "한미 정상이 워싱턴에서 포괄적 통상 안보 파트너십에 공식 서명했다. 지난 1년간 한국 경제를 옥죄던 미국의 관세 장벽과 수출 통제 리스크가 일거에 해소되며 코스피가 폭등세를 나타냈다."
      },
      {
        id: "c2",
        text: "대중국 독자 통상 권한을 지키기 위해 조건부 서명한다.",
        feedback: "워싱턴은 미온적 반응을 보였으나 베이징으로부터는 긍정적 신호를 받았다.",
        effect: (state) => {
          state.politics.stats.presidentTrust -= 2;
          state.economy.partnerStates.CN.relations += 8;
        },
        newsHeadline: "정부, 대미 합의서에 '전략적 자율성' 단서 명시…독자적 실용 통상 유지",
        newsBody: "대통령과 통상본부장이 백악관 공동 선언문 서명 과정에서 한국의 독자적 다자 무역 권한을 유보 조항으로 관철시켰다. 미국 중심의 배타적 블록에 전면 편입되는 것을 피해 대중 교역의 숨통을 틔웠다."
      }
    ]
  },

  // 16. 연말 무역의 날 7,000억 달러 결말
  {
    id: "evt_year_end_climax",
    minMonth: 12, maxMonth: 12,
    title: "7천억 달러의 결말",
    desc: "1년의 임기가 끝나가는 12월, 대한민국 연간 총수출이 사상 최초로 7,000억 달러 고지를 넘볼 수 있는 마지막 관문이다.",
    image: "./assets/office-rebuild.jpg",
    choices: [
      {
        id: "c1",
        text: "연말 총력 통관 지원과 특별 선적 패스트트랙을 가동한다.",
        feedback: "모든 항만과 공항이 철야 가동되며 수출 기록 경신에 도전했다.",
        effect: (state) => {
          state.politics.stats.presidentTrust += 8;
          state.politics.stats.publicApproval += 10;
          state.economy.monthlyResults[state.economy.monthlyResults.length - 1].export += 35.0;
        },
        newsHeadline: "대한민국 수출 사상 첫 7,000억 달러 금자탑…무역 강국 위상 전 세계 입증",
        newsBody: "글로벌 복합 통상 위기를 뚫고 대한민국이 사상 최초로 연간 수출 7,000억 달러 돌파라는 기념비적 위업을 달성했다. 전 세계적인 보호무역 광풍 속에서 공격적인 위기관리와 시장 개척이 일궈낸 기적으로 평가된다."
      },
      {
        id: "c2",
        text: "무리한 밀어내기를 자제하고 내실 중심의 정산을 진행한다.",
        feedback: "과도한 비용 지출을 줄이며 내년도 기초 체력을 안정화했다.",
        effect: (state) => {
          state.politics.stats.businessTrust += 5;
        },
        newsHeadline: "연간 수출 6,900억 달러로 알찬 마무리…체질 개선으로 실속 챙긴 무역 성적표",
        newsBody: "통상교섭본부장이 연말 무리한 실적 부풀리기 대신 무역수지 흑자 폭을 지키는 내실 위주의 결산을 택했다. 숫자 경쟁을 넘어 한국 수출의 기초 체력을 단단히 다졌다는 경제계의 호평이 잇따르고 있다."
      }
    ]
  },

  // 17. WTO 상소기구 마비와 다자 분쟁
  {
    id: "evt_wto_dispute_panel",
    minMonth: 2, maxMonth: 11,
    title: "WTO 분쟁과 규범 위기",
    desc: "미국의 철강 관세 조치에 대해 WTO 상소기구가 기능 마비된 상태에서 제소 여부를 결정해야 한다.",
    image: "./assets/negotiation-multi.jpg",
    choices: [
      {
        id: "c1",
        text: "EU 및 일본과 공동으로 다자 제소에 나선다.",
        feedback: "다자 연대를 구축하며 규범 수호의 주도권을 쥐었다.",
        effect: (state) => { state.politics.stats.diplomaticTrust += 8; }
      },
      {
        id: "c2",
        text: "양자 비공개 협상으로 실리를 챙긴다.",
        feedback: "대미 관계 훼손을 피하고 품목별 쿼터를 확보했다.",
        effect: (state) => { state.economy.partnerStates.US.relations += 6; }
      }
    ]
  },

  // 18. CPTPP 가입과 수산물 개방 압력
  {
    id: "evt_cptpp_fukushima",
    minMonth: 3, maxMonth: 10,
    title: "CPTPP 가입의 딜레마",
    desc: "CPTPP 가입을 타진하자 주도국 일본이 후쿠시마산 수산물 수입 규제 해제를 비공식 전제조건으로 내걸었다.",
    image: "./assets/negotiation-cn.jpg",
    choices: [
      {
        id: "c1",
        text: "국민 건강권은 타협 불가라며 요구를 일축한다.",
        feedback: "국민 여론의 열렬한 지지를 받았으나 가입 협상이 표류했다.",
        effect: (state) => { state.politics.stats.publicApproval += 8; }
      },
      {
        id: "c2",
        text: "과학적 검증에 기반한 단계적 협의를 제안한다.",
        feedback: "협상의 불씨는 살렸으나 시민단체의 거센 반발을 샀다.",
        effect: (state) => { state.politics.stats.publicApproval -= 6; state.politics.stats.diplomaticTrust += 6; }
      }
    ]
  },

  // 19. 칠레 핵심 리튬 공급망 국유화
  {
    id: "evt_chile_lithium_shock",
    minMonth: 3, maxMonth: 8,
    title: "칠레 리튬 국유화 파장",
    desc: "칠레 정부가 핵심 리튬 광산에 대한 국가 통제를 선언하며 한국 배터리 기업들의 지분 계약이 위태로워졌다.",
    image: "./assets/war-room.jpg",
    choices: [
      {
        id: "c1",
        text: "한-칠레 FTA 투자자 보호 조항을 발동한다.",
        feedback: "외교적 압박으로 기존 한국 지분의 예외 인정을 끌어냈다.",
        effect: (state) => { state.politics.stats.businessTrust += 7; }
      },
      {
        id: "c2",
        text: "칠레 국영기업과의 현지 합작 법인을 추진한다.",
        feedback: "새로운 협력 모델로 장기 원자재 조달권을 확보했다.",
        effect: (state) => { state.economy.industryStates.battery.capacityIndex += 4; }
      }
    ]
  },

  // 20. 페루·칠레 한-남미 자원 동맹
  {
    id: "evt_south_america_alliance",
    minMonth: 4, maxMonth: 9,
    title: "남미 핵심광물 동맹",
    desc: "남미 자원 부국들이 한국의 제련 기술과 인프라 투자를 조건으로 전략 광물 우선 공급 협정을 제안했다.",
    image: "./assets/origins-trade.jpg",
    choices: [
      {
        id: "c1",
        text: "자원 외교 펀드를 가동해 포괄적 협정을 맺는다.",
        feedback: "구리와 리튬의 안정적인 10년 직공급로를 확보했다.",
        effect: (state) => { state.economy.industryStates.battery.longTermCompetitiveness += 8; }
      },
      {
        id: "c2",
        text: "재정 부담을 고려해 민간 자율 투자에 맡긴다.",
        feedback: "위험 부담은 줄였으나 중국 자본이 광산을 선점했다.",
        effect: (state) => { state.politics.stats.businessTrust -= 4; }
      }
    ]
  },

  // 21. 인도-태평양 경제프레임워크(IPEF)
  {
    id: "evt_ipef_supply_accord",
    minMonth: 3, maxMonth: 9,
    title: "IPEF 공급망 협정 비준",
    desc: "미국 주도의 14개국 IPEF 공급망 위기대응 네트워크 협정 비준을 두고 국회의 승인이 지연되고 있다.",
    image: "./assets/negotiation-multi.jpg",
    choices: [
      {
        id: "c1",
        text: "국회 여야 원내대표를 직접 찾아가 설득한다.",
        feedback: "초당적 협력을 이끌어내며 협정이 신속 비준되었다.",
        effect: (state) => { state.politics.stats.presidentTrust += 6; state.politics.stats.policyMomentum += 5; }
      },
      {
        id: "c2",
        text: "정부 직권으로 행정명령을 통해 우선 집행한다.",
        feedback: "집행 속도는 빨랐으나 야당의 격렬한 비판을 받았다.",
        effect: (state) => { state.politics.stats.publicApproval -= 5; }
      }
    ]
  },

  // 22. 한-EU 디지털 통상 협정
  {
    id: "evt_eu_digital_trade",
    minMonth: 4, maxMonth: 10,
    title: "디지털 데이터 국경선",
    desc: "EU가 한국과의 디지털 무역 협정에서 AI 데이터 국외 이전 제한과 빅테크 플랫폼 규제 동참을 요구했다.",
    image: "./assets/office-trade.jpg",
    choices: [
      {
        id: "c1",
        text: "데이터 주권을 보호하며 EU 규범을 수용한다.",
        feedback: "국내 AI 스타트업들의 유럽 시장 진출 인증을 획득했다.",
        effect: (state) => { state.economy.servicesStates.techRoyaltyBonus += 5.0; }
      },
      {
        id: "c2",
        text: "미국식 자유로운 데이터 흐름을 고수한다.",
        feedback: "글로벌 빅테크와의 협력을 지켰으나 EU와 협상이 중단되었다.",
        effect: (state) => { state.economy.partnerStates.US.relations += 5; }
      }
    ]
  },

  // 23. 사우디 네옴시티 스마트 인프라 수주
  {
    id: "evt_saudi_neom_deal",
    minMonth: 5, maxMonth: 11,
    title: "사우디 150억 달러 수주",
    desc: "사우디아라비아가 네옴시티 수소 트램과 태양광 담수화 시설 구축에 한국 기업 컨소시엄을 우선협상자로 지정했다.",
    image: "./assets/ministry52.jpg",
    choices: [
      {
        id: "c1",
        text: "국가 보증 패키지로 최종 수주를 확정한다.",
        feedback: "중동 발 150억 달러 초대형 플랜트 수주 잭팟이 터졌다.",
        effect: (state) => { state.politics.stats.presidentTrust += 9; state.economy.industryStates.automobile.pendingDeliveries += 14.0; }
      },
      {
        id: "c2",
        text: "지정학적 리스크를 고려해 분할 수주를 택한다.",
        feedback: "안정성은 확보했으나 수주 규모가 절반으로 줄었다.",
        effect: (state) => { state.politics.stats.businessTrust += 3; }
      }
    ]
  },

  // 24. 베트남 진출 부품사 세무조사 위기
  {
    id: "evt_vietnam_tax_probe",
    minMonth: 4, maxMonth: 9,
    title: "베트남 세무조사 위기",
    desc: "베트남 당국이 현지 진출 한국 IT·전자 부품 협력사 200여 곳에 이전가격 세무조사를 벌이며 거액을 추징했다.",
    image: "./assets/board52.jpg",
    choices: [
      {
        id: "c1",
        text: "하노이에 통상 고위급 회담을 요청해 해결한다.",
        feedback: "양자 조세협정을 바탕으로 부당 추징금을 철회시켰다.",
        effect: (state) => { state.politics.stats.businessTrust += 8; }
      },
      {
        id: "c2",
        text: "현지 법률 대응을 자문하며 사태를 지켜본다.",
        feedback: "기업들이 수백억 원의 과태료를 물며 경영난에 빠졌다.",
        effect: (state) => { state.politics.stats.businessTrust -= 6; }
      }
    ]
  },

  // 25. RCEP 시장 내 중국 전기차 저가 공세
  {
    id: "evt_china_ev_dumping_asean",
    minMonth: 5, maxMonth: 10,
    title: "아세안 시장의 저가 공세",
    desc: "중국산 전기차가 태국과 인도네시아에서 파격적 보조금을 무기로 한국산 완성차의 점유율을 잠식하고 있다.",
    image: "./assets/origins-trade.jpg",
    choices: [
      {
        id: "c1",
        text: "하이브리드 및 고급화 라인업으로 전환을 지원한다.",
        feedback: "동남아 프리미엄 시장을 사수하며 수익성을 방어했다.",
        effect: (state) => { state.economy.industryStates.automobile.priceCompetitiveness += 5; }
      },
      {
        id: "c2",
        text: "아세안 정부에 중국산 불공정 보조금 조사를 요구한다.",
        feedback: "아세안 국가들이 중국의 눈치를 보며 난색을 표했다.",
        effect: (state) => { state.politics.stats.diplomaticTrust -= 3; }
      }
    ]
  },

  // 26. 중국산 후판 덤핑과 철강업계 제소
  {
    id: "evt_china_steel_dumping",
    minMonth: 6, maxMonth: 11,
    title: "중국산 후판 덤핑 제소",
    desc: "국내 제철소들이 반토막 가격에 쏟아지는 중국산 후판에 대해 반덤핑 관세 부과를 공식 신청했다.",
    image: "./assets/crisis52.jpg",
    choices: [
      {
        id: "c1",
        text: "무역위원회를 열어 잠정 반덤핑 관세를 부과한다.",
        feedback: "국내 제철소는 안도했으나 조선사들이 원가 상승을 우려했다.",
        effect: (state) => { state.economy.industryStates.steel.priceCompetitiveness += 6; }
      },
      {
        id: "c2",
        text: "조선업 경쟁력을 위해 조사를 신중히 진행한다.",
        feedback: "철강업계가 정부의 제조업 홀대론을 주장하며 반발했다.",
        effect: (state) => { state.politics.stats.businessTrust -= 5; }
      }
    ]
  },

  // 27. 바이오 의약품 미국 FDA 특허 분쟁
  {
    id: "evt_bio_patent_clash",
    minMonth: 5, maxMonth: 11,
    title: "바이오시밀러 특허 장벽",
    desc: "미국 다국적 제약사들이 한국산 바이오시밀러에 대해 10건이 넘는 특허 침해 소송을 제기하며 수출길을 막았다.",
    image: "./assets/negotiation-us.jpg",
    choices: [
      {
        id: "c1",
        text: "한미 FTA 바이오 분쟁 공동대응반을 가동한다.",
        feedback: "미 당국의 특허 무효 심판을 이끌어내며 출시를 앞당겼다.",
        effect: (state) => { state.economy.industryStates.bio.capacityIndex += 6; }
      },
      {
        id: "c2",
        text: "유럽 및 중동 신흥시장으로 수출처를 우회한다.",
        feedback: "북미 공백을 메우며 유럽 내 점유율 1위를 달성했다.",
        effect: (state) => { state.economy.partnerStates.EU.relations += 6; }
      }
    ]
  },

  // 28. 글로벌 해운 운임 폭등과 물류 대란
  {
    id: "evt_shipping_freight_spike",
    minMonth: 4, maxMonth: 9,
    title: "물류 대란과 선복 부족",
    desc: "상하이컨테이너운임지수(SCFI)가 4,000을 돌파하며 중소기업들이 수출할 배를 구하지 못해 발을 동동 구른다.",
    image: "./assets/origins-trade.jpg",
    choices: [
      {
        id: "c1",
        text: "HMM 임시 선박 10척을 긴급 투입한다.",
        feedback: "부산항의 적체 화물이 해소되며 납기 지연을 막았다.",
        effect: (state) => { state.politics.stats.publicApproval += 6; state.politics.stats.businessTrust += 6; }
      },
      {
        id: "c2",
        text: "수출 물류 바우처 한도를 두 배로 확대한다.",
        feedback: "기업들의 물류비 부담을 재정으로 흡수했다.",
        effect: (state) => { state.politics.stats.businessTrust += 5; }
      }
    ]
  },

  // 29. 우크라이나 전후 재건 50조원 사업
  {
    id: "evt_ukraine_reconstruction",
    minMonth: 6, maxMonth: 12,
    title: "우크라이나 재건 프로젝트",
    desc: "키이우와 바르샤바에서 열린 재건 회의에서 한국 기업들에 도로·전력망 50조원 복구 사업 참여를 제안했다.",
    image: "./assets/ministry52.jpg",
    choices: [
      {
        id: "c1",
        text: "정부 민관 합동 재건 사절단을 파견한다.",
        feedback: "우크라이나 핵심 인프라 재건 우선협상권을 확보했다.",
        effect: (state) => { state.politics.stats.presidentTrust += 7; }
      },
      {
        id: "c2",
        text: "러시아와의 관계를 고려해 인도적 지원에 국한한다.",
        feedback: "외교적 마찰은 피했으나 대형 건설 수주 기회를 넘겨주었다.",
        effect: (state) => { state.politics.stats.businessTrust -= 4; }
      }
    ]
  },

  // 30. 중동 국부펀드 10조원 유치
  {
    id: "evt_middle_east_swf_deal",
    minMonth: 5, maxMonth: 10,
    title: "중동 국부펀드 10조원 유치",
    desc: "UAE 무바달라 국부펀드가 한국의 2차전지 및 바이오 소부장 기업에 10조원 규모의 직접 투자를 타진했다.",
    image: "./assets/board52.jpg",
    choices: [
      {
        id: "c1",
        text: "외국인 투자 촉진 혜택을 부여해 계약을 체결한다.",
        feedback: "대규모 달러 자금이 유입되며 원화 가치가 안정되었다.",
        effect: (state) => { state.politics.stats.presidentTrust += 8; state.politics.stats.businessTrust += 8; }
      },
      {
        id: "c2",
        text: "핵심 기술 유출 우려를 이유로 심사를 엄격히 한다.",
        feedback: "기술 안보는 지켰으나 아랍 자본이 일본으로 발길을 돌렸다.",
        effect: (state) => { state.politics.stats.businessTrust -= 5; }
      }
    ]
  },

  // 31. 한-영 FTA 개정 협상
  {
    id: "evt_uk_fta_upgrade",
    minMonth: 4, maxMonth: 9,
    title: "한-영 FTA 현대화 타결",
    desc: "런던에서 열린 브렉시트 이후 한-영 FTA 개선 협상에서 원전과 청정에너지 조달 시장 개방이 의제로 올랐다.",
    image: "./assets/negotiation-multi.jpg",
    choices: [
      {
        id: "c1",
        text: "원전 건설 시장 진출을 위해 금융 규제를 완화한다.",
        feedback: "영국 신규 원전 입찰 자격을 얻으며 협정이 타결되었다.",
        effect: (state) => { state.politics.stats.diplomaticTrust += 6; }
      },
      {
        id: "c2",
        text: "국내 농축산물 추가 개방은 절대 불가하다고 맞선다.",
        feedback: "농업은 지켜냈으나 영국 내 특허 협조가 유보되었다.",
        effect: (state) => { state.politics.stats.publicApproval += 5; }
      }
    ]
  },

  // 32. 체코 두코바니 원전 24조원 수출
  {
    id: "evt_czech_nuclear_export",
    minMonth: 7, maxMonth: 11,
    title: "체코 원전 24조원 최종 계약",
    desc: "미국 웨스팅하우스의 지식재산권 이의 제기를 뚫고 체코 정부가 한국 한수원과의 최종 계약을 승인하고자 한다.",
    image: "./assets/president-rebuild.jpg",
    choices: [
      {
        id: "c1",
        text: "한미 원자력 동맹 협의로 특허 분쟁을 종식시킨다.",
        feedback: "24조원 체코 원전 건설 본계약이 공식 체결되었다.",
        effect: (state) => { state.politics.stats.presidentTrust += 11; state.politics.stats.publicApproval += 8; }
      },
      {
        id: "c2",
        text: "독자 기술 소송전을 끝까지 밀어붙인다.",
        feedback: "자존심은 세웠으나 체코 정부가 계약 일정을 연기했다.",
        effect: (state) => { state.politics.stats.presidentTrust -= 5; }
      }
    ]
  },

  // 33. 대기업의 해외 이전 발표
  {
    id: "evt_chaebol_offshoring_crisis",
    minMonth: 6, maxMonth: 10,
    title: "대기업 해외 이전 논란",
    desc: "주요 대기업이 국내 전력망 부족과 보조금 차별을 이유로 차세대 핵심 생산 기지를 북미로 이전하겠다고 밝혔다.",
    image: "./assets/board52.jpg",
    choices: [
      {
        id: "c1",
        text: "국내 첨단특화단지에 파격적 세제 혜택을 신설한다.",
        feedback: "기업 총수가 계획을 보류하고 국내 투자를 재확약했다.",
        effect: (state) => { state.politics.stats.businessTrust += 7; state.economy.industryStates.semiconductor.capacityIndex += 5; }
      },
      {
        id: "c2",
        text: "해외 이전에 따른 국내 고용유지 책임을 경고한다.",
        feedback: "정부-재계의 갈등이 번지며 주가가 하락했다.",
        effect: (state) => { state.politics.stats.businessTrust -= 8; }
      }
    ]
  },

  // 34. 대통령실과의 통상 정책 갈등
  {
    id: "evt_presidential_office_friction",
    minMonth: 5, maxMonth: 10,
    title: "대통령실과의 정무적 갈등",
    desc: "대통령실 참모진이 지지율 하락을 우려해 통상본부장의 원칙주의 대외 협상 기조를 수정하라고 요구했다.",
    image: "./assets/president-rebuild.jpg",
    choices: [
      {
        id: "c1",
        text: "대통령을 독대해 국익을 위한 불가피성을 설득한다.",
        feedback: "대통령이 본부장의 손을 들어주며 전폭 신임을 재확인했다.",
        effect: (state) => { state.politics.stats.presidentTrust += 9; }
      },
      {
        id: "c2",
        text: "정무적 부담을 감안해 발표 일정을 늦춘다.",
        feedback: "갈등은 넘겼으나 협상 상대국이 한국의 결단력을 의심했다.",
        effect: (state) => { state.politics.stats.diplomaticTrust -= 6; }
      }
    ]
  },

  // 35. 비공개 협상 문서 외신 유출
  {
    id: "evt_classified_leak_scandal",
    minMonth: 6, maxMonth: 11,
    title: "비공개 협상안 외신 유출",
    desc: "대미 철강 및 자동차 이면 양보안이 담긴 기밀 메모가 외신에 유출되며 야당이 국정조사를 요구하고 나섰다.",
    image: "./assets/press-v2.jpg",
    choices: [
      {
        id: "c1",
        text: "긴급 기자회견을 열어 맥락을 투명하게 해명한다.",
        feedback: "진솔한 설명에 국민적 의구심이 조기에 해소되었다.",
        effect: (state) => { state.politics.stats.publicApproval += 5; }
      },
      {
        id: "c2",
        text: "유출자를 색출하는 내부 보안 감사를 선언한다.",
        feedback: "부처 분위기가 흉흉해지며 관료사회가 복지부동에 빠졌다.",
        effect: (state) => { state.politics.stats.policyMomentum -= 8; }
      }
    ]
  },

  // 36. 외신기자회견 직설 발언의 파장
  {
    id: "evt_press_spillover",
    minMonth: 4, maxMonth: 10,
    title: "본부장 발언의 외교적 파장",
    desc: "기자회견에서 강대국의 일방주의를 직격한 본부장의 발언이 전 세계 헤드라인을 장식하며 파장을 낳았다.",
    image: "./assets/press-v2.jpg",
    choices: [
      {
        id: "c1",
        text: "주권 국가의 정당한 소신이라며 물러서지 않는다.",
        feedback: "개발도상국과 신흥 경제국들의 폭발적인 지지를 얻었다.",
        effect: (state) => { state.politics.stats.publicApproval += 8; state.politics.stats.diplomaticTrust += 5; }
      },
      {
        id: "c2",
        text: "외교 채널을 통해 발언의 취지를 정중히 설명한다.",
        feedback: "강대국과의 갈등 확산을 막고 실무 접촉을 재개했다.",
        effect: (state) => { state.politics.stats.diplomaticTrust += 4; }
      }
    ]
  },

  // 37. 미국 대선 통상 강경파 집권
  {
    id: "evt_us_election_hardliner",
    minMonth: 9, maxMonth: 11,
    title: "미국 새 행정부의 보편관세",
    desc: "미국 대선에서 모든 수입품에 10% 보편 관세를 매기겠다는 초강경 공약의 새 대통령이 전격 당선되었다.",
    image: "./assets/negotiation-us.jpg",
    choices: [
      {
        id: "c1",
        text: "대미 투자 기업들과 긴급 워싱턴 사절단을 급파한다.",
        feedback: "새 대통령 인수위와 접촉해 동맹국 예외 논의를 시작했다.",
        effect: (state) => { state.politics.stats.presidentTrust += 6; state.politics.stats.businessTrust += 6; }
      },
      {
        id: "c2",
        text: "유럽·일본과 함께 보호무역 공동 대응 연대를 짠다.",
        feedback: "다자적 억제력을 확보했으나 미국과의 직통 채널이 굳었다.",
        effect: (state) => { state.economy.partnerStates.EU.relations += 7; }
      }
    ]
  },

  // 38. 일본의 기록적 엔저와 수출 덤핑
  {
    id: "evt_japan_yen_dumping",
    minMonth: 5, maxMonth: 10,
    title: "초엔저와 수출 경합",
    desc: "엔/달러 환율이 160엔을 돌파하며 글로벌 시장에서 일본산 자동차와 철강이 가격 경쟁력으로 밀고 들어온다.",
    image: "./assets/origins-trade.jpg",
    choices: [
      {
        id: "c1",
        text: "수출 기업 환변동 보험 지원을 대폭 확대한다.",
        feedback: "중소 환손실을 방어하며 가격 방어벽을 세웠다.",
        effect: (state) => { state.politics.stats.businessTrust += 6; }
      },
      {
        id: "c2",
        text: "신시장 마케팅 지원금을 긴급 투입한다.",
        feedback: "인도와 중동 등 엔저 영향이 덜한 시장을 집중 공략했다.",
        effect: (state) => { state.economy.industryStates.automobile.priceCompetitiveness += 4; }
      }
    ]
  },

  // 39. 국내 재생에너지 계통망 확충 대립
  {
    id: "evt_green_grid_clash",
    minMonth: 6, maxMonth: 11,
    title: "국가전력망 확충 갈등",
    desc: "용인 반도체 메가 클러스터 가동에 필수적인 초고압 송전탑 건설이 지역 주민 반발로 전면 중단되었다.",
    image: "./assets/crisis52.jpg",
    choices: [
      {
        id: "c1",
        text: "국가전력망 특별법을 발동해 지중화와 보상을 확약한다.",
        feedback: "주민 설득에 성공하며 송전선로 공사가 재개되었다.",
        effect: (state) => { state.politics.stats.publicApproval += 5; state.economy.industryStates.semiconductor.capacityIndex += 5; }
      },
      {
        id: "c2",
        text: "공사 일정을 늦추고 대체 에너지원 조달을 검토한다.",
        feedback: "갈등은 피했으나 팹 완공 시점이 1년 지연될 위기에 처했다.",
        effect: (state) => { state.politics.stats.businessTrust -= 7; }
      }
    ]
  },

  // 40. 아프리카 핵심광물 파트너십(MSP)
  {
    id: "evt_africa_msp_mining",
    minMonth: 4, maxMonth: 10,
    title: "아프리카 광물 파트너십",
    desc: "탄자니아와 콩고민주공화국이 한국의 인프라 ODA 지원을 대가로 코발트와 흑연 광산 채굴권을 제안했다.",
    image: "./assets/war-room.jpg",
    choices: [
      {
        id: "c1",
        text: "ODA와 자원 안보를 결합한 장기 협정에 서명한다.",
        feedback: "배터리 3사의 차세대 원자재 15년 조달선을 텄다.",
        effect: (state) => { state.economy.industryStates.battery.longTermCompetitiveness += 7; }
      },
      {
        id: "c2",
        text: "국가 신용 리스크가 크다며 협정 체결을 보류한다.",
        feedback: "투자 손실 위험은 막았으나 중국 기업이 광산을 독점했다.",
        effect: (state) => { state.politics.stats.businessTrust -= 3; }
      }
    ]
  },

  // 41. 용인 반도체 클러스터 패스트트랙
  {
    id: "evt_yongin_mega_fab",
    minMonth: 7, maxMonth: 12,
    title: "용인 팹 국가 패스트트랙",
    desc: "용인 600조원 메가 클러스터 1호 팹 착공을 위해 모든 인허가를 30일 내 일괄 처리하는 방안이 상정되었다.",
    image: "./assets/board52.jpg",
    choices: [
      {
        id: "c1",
        text: "통상교섭본부 직권으로 인허가 원스톱 패스를 결재한다.",
        feedback: "세계 최대 반도체 클러스터 공사가 사상 최고 속도로 착공되었다.",
        effect: (state) => { state.politics.stats.presidentTrust += 8; state.politics.stats.businessTrust += 9; state.economy.industryStates.semiconductor.capacityIndex += 8; }
      },
      {
        id: "c2",
        text: "환경 영향 평가와 지자체 협의를 엄격히 거친다.",
        feedback: "원칙을 지켰으나 글로벌 장비 발주 일정이 어그러졌다.",
        effect: (state) => { state.politics.stats.publicApproval += 4; }
      }
    ]
  },

  // 42. 미 러스트벨트 상원의원단의 방한 압박
  {
    id: "evt_rustbelt_senators_visit",
    minMonth: 5, maxMonth: 10,
    title: "러스트벨트 의원단 방한",
    desc: "미국 의회 핵심 상원의원단이 세종을 찾아 한국 배터리 기업들의 미국 내 현지 고용 30% 증원을 공개 요구했다.",
    image: "./assets/negotiation-us.jpg",
    choices: [
      {
        id: "c1",
        text: "미국 내 장학재단과 R&D 센터 설립으로 화답한다.",
        feedback: "의원단이 만족하며 의회 내 관세 면제 지지 성명을 냈다.",
        effect: (state) => { state.politics.stats.diplomaticTrust += 6; state.economy.partnerStates.US.relations += 5; }
      },
      {
        id: "c2",
        text: "기업의 자율적 경영 판단이라며 정부 개입을 거부한다.",
        feedback: "미 의회에서 한국 기업에 대한 청문회 소집안이 발의되었다.",
        effect: (state) => { state.politics.stats.diplomaticTrust -= 5; }
      }
    ]
  },

  // 43. 한미 통화스와프와 환율 안정
  {
    id: "evt_currency_swap_defense",
    minMonth: 8, maxMonth: 12,
    title: "환율 급등과 통화 방어",
    desc: "원/달러 환율이 1,450원을 위협하며 수입 원자재가가 폭등하자 대미 통화스와프 체결이 시급한 현안으로 떠올랐다.",
    image: "./assets/ministry52.jpg",
    choices: [
      {
        id: "c1",
        text: "대미 투자 보증과 연계해 상설 통화스와프를 관철한다.",
        feedback: "환율이 1,300원대로 급락하며 수입 물가가 단숨에 안정되었다.",
        effect: (state) => { state.politics.stats.presidentTrust += 10; state.politics.stats.publicApproval += 9; }
      },
      {
        id: "c2",
        text: "외환보유액 시장 개입으로 독자 방어에 나선다.",
        feedback: "보유 달러가 급감하며 국제 신용평가사의 경고를 받았다.",
        effect: (state) => { state.politics.stats.presidentTrust -= 6; }
      }
    ]
  },

  // 44. 최종 통상 성적표 및 장관 승진 보고
  {
    id: "evt_final_cabinet_verdict",
    minMonth: 12, maxMonth: 12,
    title: "국무회의 최종 결산",
    desc: "임기 12개월을 완주한 마지막 날, 대통령과 국무위원들 앞에서 지난 1년간의 통상 전쟁 결산 보고가 시작된다.",
    image: "./assets/president-rebuild.jpg",
    choices: [
      {
        id: "c1",
        text: "대한민국의 미래 10년을 준비한 통상 백서를 보고한다.",
        feedback: "대통령과 국무위원 전원의 기립 박수가 터져 나왔다.",
        effect: (state) => { state.politics.stats.presidentTrust += 15; state.politics.stats.publicApproval += 10; }
      }
    ]
  }
];

// Helper to pick event of the month
export function selectEventForMonth(state) {
  const currentMonth = state.currentMonth;
  const available = EVENTS.filter(e => {
    if (state.pastEventIds && state.pastEventIds.includes(e.id)) return false;
    if (e.minMonth && currentMonth < e.minMonth) return false;
    if (e.maxMonth && currentMonth > e.maxMonth) return false;
    if (e.condition && !e.condition(state)) return false;
    return true;
  });

  if (available.length > 0) {
    return available[0];
  }

  return {
    id: `evt_generic_${currentMonth}`,
    title: "국제 통상 현안 점검",
    desc: `2027년 ${currentMonth}월, 글로벌 공급망과 환율 급변 속에서 주요 교역국과의 비공개 통상 실무 점검이 진행되고 있다.`,
    image: "./assets/ministry52.jpg",
    choices: [
      {
        id: "c1",
        text: "수출 기업 긴급 금융 지원을 강화한다.",
        feedback: "현장 기업들의 애로사항이 즉각 해소되었다.",
        effect: (s) => { s.politics.stats.businessTrust += 4; }
      },
      {
        id: "c2",
        text: "해외 통상 거점의 모니터링을 확대한다.",
        feedback: "외교 채널을 통한 정보망이 강화되었다.",
        effect: (s) => { s.politics.stats.diplomaticTrust += 4; }
      }
    ]
  };
}
