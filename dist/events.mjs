// events.mjs - 104 Audited Comprehensive Events Pool & Trigger Engine for 통상교섭본부장 | TRADE CZAR

// Helper to construct structured events
function makeEvent(id, category, categoryName, title, description, condition, probability, choices) {
  return { id, category, categoryName, title, description, condition, probability, choices };
}

export const EVENTS_POOL = [];

// =============================================================================
// CATEGORY 1: 국제 통상 및 지정학 이벤트 (30 Events)
// =============================================================================
const intlEvents = [
  makeEvent("evt_intl_01", "international", "국제 통상", "미국 대통령, 한국산 제품 무역흑자 맹비난 연설",
    "미국 대통령이 러스트벨트 유세에서 '한국이 자동차와 반도체로 막대한 흑자를 누리고 있다'며 25% 보편관세 행정명령 서명을 공언했습니다.",
    s => s.month >= 2, 0.75, [
      { text: "워싱턴에 고위급 특사 파견 및 미국산 에너지 구매 확대 패키지 준비", impact: { presidentTrust: 5, diplomaticTrust: 5 }, apply: e => { e.industryStates.automobile.tradeBarrierIndex += 5; } },
      { text: "원론적 유감 표명 및 한미 FTA 규범 준수 촉구 성명", impact: { presidentTrust: -5, publicApproval: -5 }, apply: e => { e.industryStates.automobile.tradeBarrierIndex += 15; } }
    ]),
  makeEvent("evt_intl_02", "international", "국제 통상", "중국 상무부, 첨단 배터리·반도체용 희토류 수출통제 전격 발표",
    "중국 정부가 국가 안보를 이유로 갈륨, 게르마늄, 천연 흑연 등 12개 핵심 광물에 대한 수출 허가제를 발효시켰습니다.",
    s => s.month >= 3, 0.70, [
      { text: "호주·베트남 대체 공급망 긴급 바우처 지원 및 수입 관세 면제", impact: { businessTrust: 10, competitiveness: 5 }, apply: e => { e.industryStates.battery.capacityIndex = Math.max(80, e.industryStates.battery.capacityIndex - 2); } },
      { text: "대중국 고위급 통상 핫라인 가동 및 한국 기업 예외 통관 승인 교섭", impact: { diplomaticTrust: 10, businessTrust: 5 }, apply: e => { e.industryStates.battery.tradeBarrierIndex += 4; } }
    ]),
  makeEvent("evt_intl_03", "international", "국제 통상", "홍해·수에즈 운하 지정학 위기 재발…해상운임(SCFI) 급등",
    "중동 해상 분쟁으로 유럽행 컨테이너선들이 아프리카 희망봉으로 우회하며 운항 일수가 2주 늘어나고 해상운임이 급등했습니다.",
    s => s.month >= 4, 0.65, [
      { text: "국적선사 HMM 임시 선박 긴급 투입 및 수출기업 물류비 긴급 바우처", impact: { businessTrust: 10, publicApproval: 5 }, apply: e => { e.industryStates.consumer.supportLevel += 1; } },
      { text: "시베리아 횡단철도(TSR) 및 항공 물류 대체 노선 특별 지원", impact: { businessTrust: 5, competitiveness: 5 }, apply: e => { e.industryStates.automobile.supportLevel += 1; } }
    ]),
  makeEvent("evt_intl_04", "international", "국제 통상", "글로벌 빅테크의 초거대 AI 데이터센터 천문학적 증설 발주",
    "미국 빅테크들이 차세대 생성형 AI 서버 확충을 선언하며 삼성전자와 SK하이닉스에 HBM3E 및 CXL 메모리 전량 공급을 타진해 왔습니다.",
    s => s.month >= 2, 0.80, [
      { text: "반도체 메가 팹 인프라 규제 신속 해소 및 수출 통관 패스트트랙 가동", impact: { presidentTrust: 10, businessTrust: 15, competitiveness: 15 }, apply: e => { e.industryStates.semiconductor.capacityIndex += 8; } },
      { text: "시스템반도체 및 소부장 생태계 동반 투자 조건 부과", impact: { policyMomentum: 10, competitiveness: 10 }, apply: e => { e.industryStates.semiconductor.longTermCompetitiveness += 12; } }
    ]),
  makeEvent("evt_intl_05", "international", "국제 통상", "EU 탄소국경조정제도(CBAM) 전면 시행 카운트다운",
    "유럽연합이 철강, 알루미늄 제품에 대해 배출량 인증서 구매를 의무화하는 법안을 최종 확정했습니다.",
    s => s.month >= 5, 0.70, [
      { text: "한·EU 통상장관회담 긴급 소집 및 K-ETS 배출권 동등성 인정 압박", impact: { diplomaticTrust: 10, businessTrust: 10 }, apply: e => { e.industryStates.steel.tradeBarrierIndex = Math.max(80, e.industryStates.steel.tradeBarrierIndex - 8); } },
      { text: "국내 수소환원제철(HyREX) 실증 전환에 정부 특별 녹색채권 투입", impact: { businessTrust: 10, policyMomentum: 10, competitiveness: 12 }, apply: e => { e.industryStates.steel.longTermCompetitiveness += 10; } }
    ]),
  makeEvent("evt_intl_06", "international", "국제 통상", "미 재무부, 환율보고서 발표…한국 '관찰대상국' 유지 및 경고",
    "미 재무부가 반기 환율보고서에서 한국의 대규모 대미 무역흑자와 외환시장 개입 여부를 집중 감시하겠다고 밝혔습니다.",
    s => s.month >= 5 && s.currentMacro.fxRate >= 1410, 0.60, [
      { text: "외환시장 투명성 지표 공개 및 대미 통상 외교 채널로 적극 해명", impact: { diplomaticTrust: 8, presidentTrust: 5 } },
      { text: "거시건전성 조치를 통한 무역금융 속도 조절", impact: { businessTrust: -5, policyMomentum: 5 } }
    ]),
  makeEvent("evt_intl_07", "international", "국제 통상", "인도 상무부, 한국산 화학제품에 대한 세이프가드 조사 착수",
    "인도 석유화학협회가 한국산 석유화학 수입 급증으로 자국 산업 피해를 주장하며 잠정 세이프가드 관세 부과를 요구했습니다.",
    s => s.month >= 6, 0.55, [
      { text: "한·인도 CEPA 개선 협상단 급파 및 민관 공동 대응반 가동", impact: { businessTrust: 8, diplomaticTrust: 8 }, apply: e => { e.industryStates.petrochemical.tradeBarrierIndex += 5; } },
      { text: "세계무역기구(WTO) 세이프가드 위원회에 인도 측 절차 하자 이의 제기", impact: { policyMomentum: 5, diplomaticTrust: -5 }, apply: e => { e.industryStates.petrochemical.tradeBarrierIndex += 10; } }
    ]),
  makeEvent("evt_intl_08", "international", "국제 통상", "일본 엔화 가치 급락…원·엔 환율 800원대 붕괴 우려",
    "일본은행의 완화 기조와 엔화 약세로 글로벌 시장에서 일본산 자동차, 공작기계와의 가격 경쟁이 격화되고 있습니다.",
    s => s.month >= 3, 0.60, [
      { text: "중소·중견 수출기업 대상 환변동 보험 특별 지원 한도 2배 확대", impact: { businessTrust: 10, publicApproval: 5 }, apply: e => { e.industryStates.machinery.priceCompetitiveness += 5; } },
      { text: "한일 경제인 회의를 통한 제3국 공동 진출 프로젝트 협의", impact: { diplomaticTrust: 10 } }
    ]),
  makeEvent("evt_intl_09", "international", "국제 통상", "호르무즈 해협 군사적 긴장 고조…국제유가 배럴당 5달러 급등",
    "중동 유조선 나포 시도로 해상 보험료가 폭등하고 두바이유·브렌트유 선물 가격이 즉각 반응했습니다.",
    s => s.month >= 4, 0.65, [
      { text: "미국산·서아프리카산 원유 도입 인센티브 확대 및 비축유 방출 점검", impact: { businessTrust: 5, presidentTrust: 5 }, apply: e => { e.industryStates.petrochemical.priceCompetitiveness -= 4; } },
      { text: "정유사 공장 가동률 자율 조정 권고 및 나프타 긴급 할당관세 연장", impact: { businessTrust: 10 }, apply: e => { e.industryStates.petrochemical.supportLevel += 1; } }
    ]),
  makeEvent("evt_intl_10", "international", "국제 통상", "베트남 정부, 글로벌 최저한세 도입에 따른 외투기업 보조금 신설",
    "베트남이 글로벌 최저한세 시행으로 타격을 입는 한국 전자·배터리 공장에 현금성 보조금 지원책을 발표했습니다.",
    s => s.month >= 5, 0.55, [
      { text: "한·베트남 공급망 파트너십 강화 및 현지 투자 한국 기업 법적 보호 확약", impact: { businessTrust: 10, diplomaticTrust: 8 } },
      { text: "국내 리쇼어링(유턴) 기업 지원 세제 법안 병행 추진", impact: { competitiveness: 8, policyMomentum: 8 } }
    ]),
  makeEvent("evt_intl_11", "international", "국제 통상", "파나마 운하 극심한 가뭄으로 선박 통행량 30% 감축",
    "미국 동부로 향하는 한국산 완성차 및 가전제품 운송선들이 병목 현상에 갇혀 납기 지연이 발생하고 있습니다.",
    s => s.month >= 5, 0.50, [
      { text: "미 서부 항만 하역 후 대륙횡단 철도 연계 복합 물류망 지원", impact: { businessTrust: 8 }, apply: e => { e.industryStates.automobile.supportLevel += 1; } },
      { text: "선박 우선 통항권 경매 참여 긴급 지원금 조성", impact: { businessTrust: 5 } }
    ]),
  makeEvent("evt_intl_12", "international", "국제 통상", "EU 삼림벌채방지법(EUDR) 시행…타이어·고무 통관 규제 강화",
    "유럽연합이 삼림 벌채 지역에서 생산된 천연고무 사용 금지 규정을 발효하며 타이어 수출 통관 서류 검사를 강화했습니다.",
    s => s.month >= 7, 0.50, [
      { text: "원산지 추적 디지털 공급망 인증 시스템 긴급 보급 지원", impact: { businessTrust: 8, competitiveness: 5 }, apply: e => { e.industryStates.automobile.tradeBarrierIndex += 3; } },
      { text: "EU 집행위에 한국 완성차 업계 준비 기간 1년 유예 외교 요청", impact: { diplomaticTrust: 5 } }
    ]),
  makeEvent("evt_intl_13", "international", "국제 통상", "사우디아라비아 네옴시티 2단계 인프라 대규모 발주 개시",
    "사우디 정부가 더 라인 지하 고속철도 및 담수화 플랜트 150억 달러 패키지 입찰을 전격 개시했습니다.",
    s => s.month >= 6, 0.65, [
      { text: "산업통상부 중심 '팀 코리아' 원전·플랜트·방산 컨소시엄 구성 파견", impact: { presidentTrust: 10, businessTrust: 12, competitiveness: 10 }, apply: e => { e.industryStates.machinery.capacityIndex += 5; e.industryStates.defense.pendingDeliveries += 1.0; } },
      { text: "민간 자율 경쟁 체제 유지 및 국책은행 금융 보증만 지원", impact: { businessTrust: 5 } }
    ]),
  makeEvent("evt_intl_14", "international", "국제 통상", "중국 국무원, 대규모 내수 소비 진작 패키지 발표",
    "중국 정부가 가전·자동차 이구환신(보상교환)에 3,000억 위안 보조금을 투입해 내수 경기 부양에 나섰습니다.",
    s => s.month >= 4, 0.60, [
      { text: "대중국 프리미엄 가전 부품 및 고부가 석화 수출 마케팅 총력 지원", impact: { businessTrust: 10 }, apply: e => { e.industryStates.semiconductor.supportLevel += 1; e.industryStates.petrochemical.supportLevel += 1; } },
      { text: "단기 부양 효과 관망 및 신흥시장 다변화 기조 유지", impact: { policyMomentum: 5 } }
    ]),
  makeEvent("evt_intl_15", "international", "국제 통상", "동유럽 재건 사업 협의체 발족…K-인프라 장비 수요 타진",
    "전후 재건을 위한 우크라이나 및 동유럽 도로·철도·에너지망 복구에 한국산 굴착기 및 전력기기 참여 요청이 접수됐습니다.",
    s => s.month >= 7, 0.55, [
      { text: "대외경제협력기금(EDCF) 특별 원조 프로그램과 연계해 기계 기업 진출", impact: { presidentTrust: 8, diplomaticTrust: 10, competitiveness: 8 }, apply: e => { e.industryStates.machinery.pendingDeliveries = (e.industryStates.machinery.pendingDeliveries || 0) + 1.2; } },
      { text: "민간 건설기계 제조사 개별 수주 지원에 집중", impact: { businessTrust: 5 } }
    ]),
  makeEvent("evt_intl_16", "international", "국제 통상", "글로벌 컨테이너선 운임 담합 혐의…주요 해운사 미·EU 조사 착수",
    "글로벌 해운동맹 선사들의 일방적 운임 인상에 대해 각국 경쟁당국이 현장 조사에 들어갔습니다.",
    s => s.month >= 6, 0.50, [
      { text: "국내 수출화주협의회와 공조해 해운 불공정 약관 시정 건의", impact: { businessTrust: 10, publicApproval: 5 } },
      { text: "글로벌 해운사와의 장기 우대운송계약(COA) 체결 매칭 지원", impact: { businessTrust: 8 } }
    ]),
  makeEvent("evt_intl_17", "international", "국제 통상", "호주 정부, 핵심 광물 광산 지분 한국 기업에 우선 매각 제안",
    "호주 서부 리튬·희토류 광산 개발권에 한국 배터리 컨소시엄의 우선 지분 투자가 제안되었습니다.",
    s => s.month >= 5, 0.60, [
      { text: "광해광업공단 특별 광물안보펀드 2조 원 매칭 투입 승인", impact: { presidentTrust: 8, businessTrust: 12, competitiveness: 10 }, apply: e => { e.industryStates.battery.capacityIndex += 6; } },
      { text: "단기 수익성 및 재정 부담을 감안해 민간 단독 투자 유도", impact: { businessTrust: -5 } }
    ]),
  makeEvent("evt_intl_18", "international", "국제 통상", "미 의회, 반도체지원법(CHIPS Act) 보조금 지급 집행 점검 청문회",
    "미 의회가 텍사스 삼성전자 공장 등 해외 팹에 대한 연방 보조금 지급 이행 여부를 점검했습니다.",
    s => s.month >= 4, 0.65, [
      { text: "워싱턴 통상관실을 통해 약속된 보조금 전액 적기 지급 공식 서한 발송", impact: { diplomaticTrust: 8, businessTrust: 8 } },
      { text: "대미 투자 속도 조절 및 국내 생산 라인 투자 비중 확대 검토", impact: { publicApproval: 8, competitiveness: 8 } }
    ]),
  makeEvent("evt_intl_19", "international", "국제 통상", "WTO 분쟁해결기구 상소 패널, 미 철강 232조 규범 위반 판정",
    "WTO 분쟁패널이 미국의 국가안보 232조 관세 조치가 무역협정 위반이라는 최종 보고서를 발표했습니다.",
    s => s.month >= 8, 0.55, [
      { text: "판정 결과를 지렛대 삼아 대미 철강 쿼터 폐지 및 관세 면제 공식 요구", impact: { diplomaticTrust: 10, businessTrust: 10 }, apply: e => { e.industryStates.steel.tradeBarrierIndex = Math.max(80, e.industryStates.steel.tradeBarrierIndex - 8); } },
      { text: "다자간 무역규범 수호 공동성명 발표 주도", impact: { diplomaticTrust: 12 } }
    ]),
  makeEvent("evt_intl_20", "international", "국제 통상", "남미 메르코수르(Mercosur) 4개국과의 FTA 협상 최종 라운드",
    "브라질, 아르헨티나 등 남미 거대 경제권과의 무역협정이 자동차 시장 개방을 두고 막판 절충에 들어갔습니다.",
    s => s.month >= 8, 0.50, [
      { text: "남미산 대두·곡물 관세 인하를 조건으로 한국산 완성차 35% 관세 철폐 타결", impact: { presidentTrust: 10, businessTrust: 12 }, apply: e => { e.industryStates.automobile.capacityIndex += 5; } },
      { text: "국내 농축산업 피해 우려로 자동차 관세 점진 인하 타협안 제시", impact: { publicApproval: 5, businessTrust: 5 } }
    ]),
  makeEvent("evt_intl_21", "international", "국제 통상", "미국 연준(Fed), 기준금리 0.25%p 전격 인하 단행",
    "미국의 금리 인하로 글로벌 유동성이 완화되며 신흥국 달러 자금 조달 여건이 개선되었습니다.",
    s => s.month >= 6, 0.60, [
      { text: "신흥국 무역금융 결제 보증 확대 및 차세대 시장 수주 전개", impact: { businessTrust: 8, policyMomentum: 8 } },
      { text: "환율 하락(원화 강세)에 따른 수출 채산성 점검 태스크포스 가동", impact: { businessTrust: 5 } }
    ]),
  makeEvent("evt_intl_22", "international", "국제 통상", "중국, 첨단 드론 및 무인기 핵심 부품 수출 라이선스 규제",
    "중국 정부가 군사 전용 가능 품목에 대한 수출 통제를 발표해 국내 무인기 제조용 모터 공급망이 일시 경색됐습니다.",
    s => s.month >= 7, 0.55, [
      { text: "국내 소부장 모터·센서 기업에 대한 긴급 국산화 R&D 자금 5000억 원 투입", impact: { businessTrust: 10, competitiveness: 8 }, apply: e => { e.industryStates.defense.capacityIndex += 4; } },
      { text: "유럽·일본산 고성능 서보모터 수입 대체선 긴급 승인", impact: { businessTrust: 5 } }
    ]),
  makeEvent("evt_intl_23", "international", "국제 통상", "미 대선 러스트벨트 노동계, 한국산 완성차 수입 쿼터 도입 청원",
    "미국 자동차노조(UAW)가 백악관에 수입 승용차에 대한 국가별 쿼터제 시행을 강력히 촉구했습니다.",
    s => s.month >= 7, 0.60, [
      { text: "현대차 조지아 메타플랜트 현지 노동자 고용 확대 성명 및 미 의회 아웃리치", impact: { diplomaticTrust: 10, businessTrust: 8 } },
      { text: "미국 내 전기차 충전 인프라 한국 기업 참여 카드 연계 제안", impact: { policyMomentum: 8 } }
    ]),
  makeEvent("evt_intl_24", "international", "국제 통상", "아세안(ASEAN) 10개국, 역내 디지털 무역 프레임워크 출범",
    "동남아 국가들이 전자상거래 무관세 영구화 및 디지털 콘텐츠 통관 규정 단일화에 서명했습니다.",
    s => s.month >= 8, 0.65, [
      { text: "한·아세안 디지털 교역 협정 체결 및 K-뷰티·푸드 역직구 플랫폼 지원", impact: { publicApproval: 10, businessTrust: 10 }, apply: e => { e.industryStates.consumer.capacityIndex += 8; } },
      { text: "국내 클라우드·소프트웨어 기업 동남아 현지화 지원 펀드 조성", impact: { competitiveness: 8 } }
    ]),
  makeEvent("evt_intl_25", "international", "국제 통상", "글로벌 해운사들의 탄소 중립 친환경 선박 조기 발주 러시",
    "국제해사기구(IMO) 온실가스 규제 강화로 머스크, CMA-CGM 등 대형 선사들이 메탄올·암모니아선 대량 발주에 나섰습니다.",
    s => s.month >= 5, 0.70, [
      { text: "조선 3사 도크 우선 배정 및 특별 선수금환급보증(RG) 패키지 지원", impact: { presidentTrust: 10, businessTrust: 15, competitiveness: 12 }, apply: e => { e.industryStates.shipbuilding.pendingDeliveries += 1.8; } },
      { text: "중견 조선사들과 친환경 기자재 부품 협력 네트워크 구축", impact: { businessTrust: 10, competitiveness: 8 } }
    ]),
  makeEvent("evt_intl_26", "international", "국제 통상", "브라질, 한국산 농기계 및 특수 변압기에 무관세 혜택 부여",
    "브라질 농업 인프라 현대화 정책에 따라 한국산 중소형 트랙터 및 전력 인프라 관세가 0%로 인하됐습니다.",
    s => s.month >= 7, 0.50, [
      { text: "남미 농기계 수출 금융 우대금리 적용 및 현지 AS 센터 설치 지원", impact: { businessTrust: 8 }, apply: e => { e.industryStates.machinery.supportLevel += 1; } },
      { text: "국내 농기계 제조사 남미 시장 개척 사절단 파견", impact: { policyMomentum: 5 } }
    ]),
  makeEvent("evt_intl_27", "international", "국제 통상", "사우디 아람코, 아시아향 공식 원유 판매가격(OSP) 인하",
    "사우디가 시장 점유율 방어를 위해 아시아 정유사들에 대한 배럴당 OSP를 $1.50 깜짝 인하했습니다.",
    s => s.month >= 8, 0.55, [
      { text: "국내 정유·석화사 원유 도입 단가 하락으로 정제마진 개선", impact: { businessTrust: 8 }, apply: e => { e.industryStates.petrochemical.priceCompetitiveness += 4; } },
      { text: "원가 절감분을 석유화학 고부가 제품 수출 단가 인하로 연결", impact: { competitiveness: 5 } }
    ]),
  makeEvent("evt_intl_28", "international", "국제 통상", "미국, 첨단 바이오 제조 의무화 법안(Biosecure Act) 상원 통과",
    "미국 상원이 중국 바이오 CDMO와의 거래를 제한하는 생물보안법을 가결하며 한국 바이오 기업에 대규모 반사이익이 기대됩니다.",
    s => s.month >= 6, 0.70, [
      { text: "삼성바이오·셀트리온의 북미 수주 전담 지원 및 cGMP 인증 패스트트랙", impact: { presidentTrust: 8, businessTrust: 12, competitiveness: 12 }, apply: e => { e.industryStates.bio.capacityIndex += 10; } },
      { text: "국내 바이오 스타트업 배양기 및 원부자재 국산화 매칭 펀드 가동", impact: { competitiveness: 8 } }
    ]),
  makeEvent("evt_intl_29", "international", "국제 통상", "캐나다 정부, 전기차 및 배터리 공급망 특별 투자 세액공제 발표",
    "캐나다가 미국 USMCA 규정을 충족하는 한국 배터리 셀·소재 공장에 최대 30% 투자비를 환급해 주기로 했습니다.",
    s => s.month >= 8, 0.55, [
      { text: "한·캐나다 핵심광물-배터리 공급망 동맹 협정 체결 및 국내 기업 진출 지원", impact: { businessTrust: 10, diplomaticTrust: 10 }, apply: e => { e.industryStates.battery.capacityIndex += 6; } },
      { text: "국내 배터리 소재 공장 증설 인센티브와 균형 지원", impact: { publicApproval: 5 } }
    ]),
  makeEvent("evt_intl_30", "international", "국제 통상", "유럽연합, 수소 경제 법안 최종 승인…그린수소 생산 설비 러시",
    "EU가 2030년까지 산업용 수소의 42%를 재생에너지 수소로 의무화하는 법안을 발효했습니다.",
    s => s.month >= 9, 0.50, [
      { text: "한국산 수전해 설비 및 암모니아 운반선 유럽 공동 프로젝트 입찰 지원", impact: { presidentTrust: 8, businessTrust: 10, competitiveness: 10 }, apply: e => { e.industryStates.shipbuilding.pendingDeliveries += 1.0; } },
      { text: "국내 수소 생태계 원천기술 특허 출원 보조금 지원", impact: { competitiveness: 6 } }
    ])
];
EVENTS_POOL.push(...intlEvents);

// =============================================================================
// CATEGORY 2: 국내 10대 산업 및 기업 이벤트 (35 Events)
// =============================================================================
const domEvents = [
  makeEvent("evt_dom_01", "domestic", "국내 산업", "완성차 노조 하계 임단협 결렬 위기 및 파업 찬반투표",
    "현대차·기아 노조가 통상임금 및 국내 생산 보장을 요구하며 파업 찬반투표를 가결했습니다. 일주일 조업 중단 시 15억 달러 수출 차질이 예상됩니다.",
    s => s.month === 6 || s.month === 7, 0.65, [
      { text: "통상교섭본부장이 직접 노사 중재에 나서 국가 수출 비상사태 호소 및 상생안 타결", impact: { presidentTrust: 8, businessTrust: 10, publicApproval: 10 }, apply: e => { e.industryStates.automobile.utilizationRate += 5; } },
      { text: "노사 자율 교섭 원칙 유지 및 물류 차질 대비 비상 재고 방출 지시", impact: { businessTrust: -5, publicApproval: -5 }, apply: e => { e.industryStates.automobile.utilizationRate -= 8; } }
    ]),
  makeEvent("evt_dom_02", "domestic", "국내 산업", "폴란드·중동 발 12조 원 규모 K-방산 수출 2차 실행계약 체결",
    "K2 흑표 전차, K9 자주포, 천궁-II 요격미사일 패키지가 나토 동유럽 회원국 및 중동과 85억 달러 본계약을 체결했습니다.",
    s => s.month >= 3, 0.75, [
      { text: "수출입은행 특별 방산 수출금융 한도 10조 원 즉시 확충", impact: { presidentTrust: 10, businessTrust: 15, publicApproval: 15, policyMomentum: 10 }, apply: e => { e.industryStates.defense.pendingDeliveries += 2.0; } },
      { text: "현지 공동 생산 및 부품 공급망 기술 제휴 협정 승인", impact: { diplomaticTrust: 15, competitiveness: 10 }, apply: e => { e.industryStates.defense.pendingDeliveries += 1.2; } }
    ]),
  makeEvent("evt_dom_03", "domestic", "국내 산업", "K-라면·냉동김밥·화장품, 미국·유럽 대형마트 매대 올킬",
    "틱톡과 넷플릭스 K-콘텐츠 열풍에 힘입어 한국 라면과 냉동김밥, 스킨케어 제품이 미국 코스트코, 월마트에서 품절 대란을 빚고 있습니다.",
    s => s.month >= 4, 0.80, [
      { text: "K-소비재 해외 통관 패스트트랙 및 글로벌 현지 물류 허브 설치 지원", impact: { publicApproval: 15, businessTrust: 10, competitiveness: 10 }, apply: e => { e.industryStates.consumer.capacityIndex += 10; e.industryStates.consumer.supportLevel += 2; } },
      { text: "식품·뷰티 중소기업 대상 해외 위조품 및 상표권 도용 단속 강화", impact: { businessTrust: 8, policyMomentum: 8 }, apply: e => { e.industryStates.consumer.supportLevel += 1; } }
    ]),
  makeEvent("evt_dom_04", "domestic", "국내 산업", "여수·울산 석유화학 NCC(나프타분해설비) 적자 누적 셧다운 위기",
    "중국의 무차별 에틸렌 증설과 고유가로 국내 석유화학 공장들의 가동률이 60%대로 추락했습니다.",
    s => s.month >= 5, 0.70, [
      { text: "나프타 제조용 원유 무관세 연장 및 고부가 스페셜티 화학 전환 긴급 펀드", impact: { businessTrust: 15, presidentTrust: 5, policyMomentum: 8 }, apply: e => { e.industryStates.petrochemical.utilizationRate += 6; e.industryStates.petrochemical.supportLevel += 2; } },
      { text: "한계 사업장 자발적 설비 통폐합 및 친환경 바이오 플라스틱 전환 유도", impact: { competitiveness: 10, businessTrust: -5 }, apply: e => { e.industryStates.petrochemical.longTermCompetitiveness += 15; } }
    ]),
  makeEvent("evt_dom_05", "domestic", "국내 산업", "용인 첨단 반도체 메가 클러스터 1기 팹 착공식 거행",
    "총 500조 원이 투자되는 세계 최대 반도체 클러스터의 첫 삽을 뜨며 전력·용수 국가 지원이 가속화됐습니다.",
    s => s.month >= 3, 0.75, [
      { text: "대통령과 함께 착공식 참석 및 해외 글로벌 반도체 소부장 R&D 센터 투자 유치 발표", impact: { presidentTrust: 10, businessTrust: 12, competitiveness: 15 }, apply: e => { e.industryStates.semiconductor.capacityIndex += 8; } },
      { text: "수도권 전력망 확충 및 지방 반도체 특화단지 상생 펀드 동시 조성", impact: { publicApproval: 10, policyMomentum: 8 } }
    ]),
  makeEvent("evt_dom_06", "domestic", "국내 산업", "국내 배터리 3사, 차세대 LFP(리튬인산철) 양산 라인 조기 구축",
    "중국산 저가 배터리에 밀리던 ESS 및 보급형 EV 시장 공략을 위해 국내 배터리 3사가 LFP 배터리 양산을 개시했습니다.",
    s => s.month >= 6, 0.65, [
      { text: "국내 생산 LFP 배터리에 대한 탄소 발자국 인증 및 수출 바우처 우대", impact: { businessTrust: 12, competitiveness: 10 }, apply: e => { e.industryStates.battery.capacityIndex += 6; e.industryStates.battery.supportLevel += 2; } },
      { text: "국내 폐배터리 리사이클링 생태계 구축 의무화 병행", impact: { policyMomentum: 8 } }
    ]),
  makeEvent("evt_dom_07", "domestic", "국내 산업", "포스코 포항제철소, 수소환원제철(HyREX) 시험 플랜트 성공 점화",
    "석탄 대신 수소로 쇳물을 뽑아내는 친환경 제철 기술이 상용화에 한 걸음 다가서며 유럽 탄소 규제 방어에 청신호가 켜졌습니다.",
    s => s.month >= 7, 0.60, [
      { text: "수소환원제철 생산 무탄소 강재에 정부 그린 스틸 국가 인증서 발급", impact: { presidentTrust: 8, businessTrust: 10, competitiveness: 12 }, apply: e => { e.industryStates.steel.longTermCompetitiveness += 15; } },
      { text: "포항·광양 수소 공급 파이프라인 인프라 재정 특별 지원 건의", impact: { businessTrust: 8 } }
    ]),
  makeEvent("evt_dom_08", "domestic", "국내 산업", "국내 조선소, 미 해군 7함대 군수지원함 정기 MRO 수주 완료",
    "국내 조선사가 미 해군 군수지원함 유지보수 사업을 최초로 따내며 군함 MRO 시장 진출의 물꼬를 텄습니다.",
    s => s.month >= 6, 0.70, [
      { text: "한미 안보·조선 통상 특별 지원 데스크 설치 및 방산 협력 제도화", impact: { presidentTrust: 10, diplomaticTrust: 12, businessTrust: 10 }, apply: e => { e.industryStates.shipbuilding.pendingDeliveries += 1.0; } },
      { text: "부산·진해 특수선 조선 MRO 클러스터 지정 추진", impact: { publicApproval: 8 } }
    ]),
  makeEvent("evt_dom_09", "domestic", "국내 산업", "삼성바이오로직스, 송도 5공장 조기 완공 및 글로벌 수주 싹쓸이",
    "세계 최대 규모의 단일 바이오 플랜트가 가동에 들어가며 미국·유럽 빅파마로부터 3조 원대 위탁생산 계약을 체결했습니다.",
    s => s.month >= 7, 0.65, [
      { text: "바이오 원부자재 수입 검역 24시간 원스톱 통관 체제 가동", impact: { businessTrust: 10, competitiveness: 10 }, apply: e => { e.industryStates.bio.capacityIndex += 8; } },
      { text: "K-바이오 전문 인력 양성 아카데미 정부 지원 확대", impact: { policyMomentum: 5 } }
    ]),
  makeEvent("evt_dom_10", "domestic", "국내 산업", "국내 공작기계 제조사, 미국 자동차 공장 라인 장비 8억 달러 수주",
    "미국 러스트벨트 및 선벨트의 전기차·엔진 신공장에 국내 고정밀 5축 공작기계 공급이 확정됐습니다.",
    s => s.month >= 8, 0.55, [
      { text: "기계류 수출 기업에 대한 장기 외화 할부금융 특별 보증 지원", impact: { businessTrust: 8, competitiveness: 8 }, apply: e => { e.industryStates.machinery.supportLevel += 1.5; } },
      { text: "스마트 제조 부품 표준화 국가 포럼 출범", impact: { policyMomentum: 5 } }
    ]),
  makeEvent("evt_dom_11", "domestic", "국내 산업", "한국 화장품(K-Beauty), 프랑스 파리 백화점 메인 로비 팝업 오픈",
    "명품 뷰티의 본고장 파리에서 한국 중소 인디 뷰티 브랜드들이 사상 최대 매출을 올리며 유럽 수출 전선을 확장했습니다.",
    s => s.month >= 6, 0.60, [
      { text: "중소 뷰티 기업의 유럽 CPNP 화장품 인증 비용 전액 지원 바우처", impact: { publicApproval: 12, businessTrust: 8 }, apply: e => { e.industryStates.consumer.capacityIndex += 6; } },
      { text: "K-뷰티 글로벌 브랜드 위조품 모니터링 AI 시스템 구축", impact: { businessTrust: 6 } }
    ]),
  makeEvent("evt_dom_12", "domestic", "국내 산업", "국내 방산 3사, 차세대 무인전투차량 및 드론봇 시제품 공개",
    "AI 기반 다목적 무인 차량과 군집 드론 방어 체계가 국방 엑스포에서 해외 국방장관들의 집중 조명을 받았습니다.",
    s => s.month >= 9, 0.55, [
      { text: "차세대 방산 기술 해외 수출 허가 심사 패스트트랙 운영", impact: { presidentTrust: 8, competitiveness: 10 }, apply: e => { e.industryStates.defense.longTermCompetitiveness += 10; } },
      { text: "방산 부품 국산화 연구개발에 3000억 원 추가 매칭", impact: { businessTrust: 8 } }
    ]),
  makeEvent("evt_dom_13", "domestic", "국내 산업", "중소 수출기업들, 환율 급변동으로 환차손 비상 호소",
    "원/달러 환율이 단기 급변하며 파생결합보험에 가입하지 못한 지방 중소 제조업체들의 영업이익이 급감했습니다.",
    s => s.month >= 5, 0.65, [
      { text: "무역보험공사 환변동보험 무료 가입 바우처 5000개 사 긴급 배정", impact: { businessTrust: 12, publicApproval: 10 }, apply: e => { e.industryStates.consumer.supportLevel += 1; e.industryStates.machinery.supportLevel += 1; } },
      { text: "지방 거점 시중은행과 공동으로 수출기업 긴급 외화 유동성 펀드 조성", impact: { businessTrust: 8 } }
    ]),
  makeEvent("evt_dom_14", "domestic", "국내 산업", "거제·울산 조선소, 숙련 용접·도장 인력 수급난 재연",
    "선박 건조 물량이 쏟아지는데 현장 숙련공 부족으로 블록 조립 공정이 지연될 위기에 처했습니다.",
    s => s.month >= 4, 0.60, [
      { text: "외국인 전문 기능인력(E-7-3) 비자 쿼터 긴급 확대 및 정부 기술훈련원 개소", impact: { businessTrust: 10, policyMomentum: 8 }, apply: e => { e.industryStates.shipbuilding.capacityIndex += 5; } },
      { text: "조선소 자동화 로봇 용접기 도입 특별 융자 5000억 원 배정", impact: { competitiveness: 8 } }
    ]),
  makeEvent("evt_dom_15", "domestic", "국내 산업", "현대제철 당진제철소, 전기로 기반 고급 판재류 양산 돌입",
    "탄소 배출을 30% 감축한 전기로 고급 차강판 생산 체제를 갖추며 글로벌 완성차 납품 인증을 획득했습니다.",
    s => s.month >= 8, 0.55, [
      { text: "저탄소 철강재 수출 시 관세청 녹색 통관 인증서 우선 발급", impact: { businessTrust: 8, competitiveness: 8 }, apply: e => { e.industryStates.steel.supportLevel += 1.5; } },
      { text: "국내 공공 발주 건설 현장 저탄소 철강재 우선 구매 제도 도입 건의", impact: { publicApproval: 5 } }
    ]),
  makeEvent("evt_dom_16", "domestic", "국내 산업", "국내 배터리 양극재 공장, 북미 니켈 정제 합작법인(JV) 승인",
    "포스코퓨처엠과 에코프로비엠이 미국 IRA 적격 공급망 요건을 갖춘 현지 전구체 공장을 승인받았습니다.",
    s => s.month >= 7, 0.60, [
      { text: "해외 자원개발 특별 융자 및 원자재 국내 역수입 관세 면제 혜택", impact: { businessTrust: 10, competitiveness: 8 }, apply: e => { e.industryStates.battery.supportLevel += 1.5; } },
      { text: "국내 차세대 양극재 소재 연구개발 펀드 조성", impact: { competitiveness: 6 } }
    ]),
  makeEvent("evt_dom_17", "domestic", "국내 산업", "한국 라면, 전 세계 연간 수출액 최초 15억 달러 돌파 축포",
    "농심, 삼양식품의 매운맛 라면이 100개국 이상에서 대중 식품으로 자리 잡으며 농식품 수출 신기록을 세웠습니다.",
    s => s.month >= 9, 0.70, [
      { text: "대통령실과 공동으로 K-푸드 수출 유공 기업 포상 및 글로벌 물류 인프라 지원", impact: { presidentTrust: 8, publicApproval: 12 }, apply: e => { e.industryStates.consumer.capacityIndex += 6; } },
      { text: "국내 농축산물 원료 사용 비중 확대 협약 체결", impact: { publicApproval: 10 } }
    ]),
  makeEvent("evt_dom_18", "domestic", "국내 산업", "반도체 소재·부품·장비(소부장) 자립도 65% 달성 공식 발표",
    "포토레지스트, 불화수소 등 핵심 소재의 국산화율이 사상 최고를 기록하며 대외 무역 보복 방어력이 강화됐습니다.",
    s => s.month >= 9, 0.65, [
      { text: "소부장 으뜸기업 100개 사에 대한 글로벌 해외 수출 바우처 2배 증액", impact: { presidentTrust: 8, businessTrust: 12, competitiveness: 12 }, apply: e => { e.industryStates.semiconductor.longTermCompetitiveness += 10; } },
      { text: "국내 대기업 파운드리 테스트베드 개방 의무화 협약", impact: { policyMomentum: 8 } }
    ]),
  makeEvent("evt_dom_19", "domestic", "국내 산업", "SK하이닉스, 차세대 HBM4 16단 샘플 고객사 출하 성공",
    "세계 최초로 차세대 고대역폭 메모리 기술 검증을 완료하며 경쟁사들과의 격차를 1년 이상 벌렸습니다.",
    s => s.month >= 10, 0.70, [
      { text: "AI 반도체 국가 수출 전략 품목 지정 및 해외 전시회 국가관 메인 배치", impact: { presidentTrust: 10, businessTrust: 12, competitiveness: 15 }, apply: e => { e.industryStates.semiconductor.priceCompetitiveness += 8; } },
      { text: "차세대 반도체 제조 장비 시설 투자 세액공제 기간 3년 연장 건의", impact: { businessTrust: 10 } }
    ]),
  makeEvent("evt_dom_20", "domestic", "국내 산업", "국내 대형 전력기기 제조사, 미국 변압기 수주 잔고 5년 치 확보",
    "HD현대일렉트릭, 효성중공업이 미국 노후 전력망 교체 및 AI 전력 수요로 초고압 변압기 주문을 꽉 채웠습니다.",
    s => s.month >= 6, 0.65, [
      { text: "중전기기 전용 수출 컨테이너선 선복 우선 배정 협약 체결", impact: { businessTrust: 10, competitiveness: 8 }, apply: e => { e.industryStates.machinery.capacityIndex += 6; } },
      { text: "국내 전력기기 강소 협력업체 공급망 금융 우대 지원", impact: { businessTrust: 6 } }
    ]),
  makeEvent("evt_dom_21", "domestic", "국내 산업", "국내 특수선 조선소, 인도네시아·필리핀 잠수함·초계함 수주전 진입",
    "동남아 국가들의 해군력 증강 사업에 한국산 최신예 호위함 4척 입찰이 유력 후보로 선정됐습니다.",
    s => s.month >= 8, 0.55, [
      { text: "국방부와 합동 세일즈 외교단 파견 및 현지 조선소 기술 이전 패키지 제안", impact: { diplomaticTrust: 10, competitiveness: 8 }, apply: e => { e.industryStates.defense.pendingDeliveries += 0.8; } },
      { text: "정부 간 수출 계약(G2G) 금융 보증 승인", impact: { businessTrust: 8 } }
    ]),
  makeEvent("evt_dom_22", "domestic", "국내 산업", "LG에너지솔루션, 미국 대형 전력망 ESS 1조 5천억 원 프로젝트 수주",
    "북미 신재생에너지 발전 단지에 들어갈 대규모 전력망 ESS 배터리 컨테이너 공급을 따냈습니다.",
    s => s.month >= 7, 0.60, [
      { text: "ESS 배터리 수출입 검사 절차 간소화 및 해외 실증 프로젝트 자금 지원", impact: { businessTrust: 10, competitiveness: 8 }, apply: e => { e.industryStates.battery.capacityIndex += 5; } },
      { text: "국내 전력망 ESS 설치 의무화 제도 협의", impact: { policyMomentum: 6 } }
    ]),
  makeEvent("evt_dom_23", "domestic", "국내 산업", "셀트리온, 자가면역질환 신약 미국 처방약급여관리업체(PBM) 등재",
    "미국 대형 PBM의 선호의약품 목록에 이름을 올리며 북미 시장 점유율 급상승 기반을 확보했습니다.",
    s => s.month >= 8, 0.65, [
      { text: "바이오의약품 콜드체인(저온유통) 항공 물류비 특별 할인 협약 지원", impact: { businessTrust: 8, competitiveness: 8 }, apply: e => { e.industryStates.bio.capacityIndex += 5; } },
      { text: "해외 특허 분쟁 대응 법률 컨설팅 펀드 지원", impact: { businessTrust: 6 } }
    ]),
  makeEvent("evt_dom_24", "domestic", "국내 산업", "국내 자동차 부품 업계, 전동화 전환 시설자금 특별 보증 요청",
    "내연기관 부품사들이 전기차·하이브리드 전환에 필요한 설비 투자금 확보에 난항을 겪고 있습니다.",
    s => s.month >= 5, 0.60, [
      { text: "미래차 전환 펀드 2조 원 신규 조성 및 저리 융자 지원", impact: { businessTrust: 12, publicApproval: 8 }, apply: e => { e.industryStates.automobile.capacityIndex += 5; } },
      { text: "완성차 대기업의 부품사 설비 전환 상생 기금 출연 유도", impact: { policyMomentum: 8 } }
    ]),
  makeEvent("evt_dom_25", "domestic", "국내 산업", "국내 석유화학 업계, 폐플라스틱 열분해유 화학 리사이클링 공장 준공",
    "탄소 배출을 획기적으로 줄인 순환 나프타 기반 합성수지 상용화로 유럽 친환경 플라스틱 규제 장벽을 넘었습니다.",
    s => s.month >= 9, 0.50, [
      { text: "친환경 순환 플라스틱에 대한 수출 세액감면 혜택 도입", impact: { businessTrust: 10, competitiveness: 8 }, apply: e => { e.industryStates.petrochemical.longTermCompetitiveness += 10; } },
      { text: "국내 폐플라스틱 원료 수거 체계 공공 인프라화", impact: { publicApproval: 5 } }
    ]),
  makeEvent("evt_dom_26", "domestic", "국내 산업", "국내 조선 3사, 암모니아 추진 초대형 가스 운반선(VLAC) 8척 수주",
    "차세대 무탄소 암모니아 연료 추진선 시장을 독점하며 글로벌 선주들의 친환경 선박 수주를 싹쓸이했습니다.",
    s => s.month >= 9, 0.65, [
      { text: "무탄소 선박 기자재 국산화율 90% 달성을 위한 특별 R&D 자금 지원", impact: { presidentTrust: 8, businessTrust: 12, competitiveness: 12 }, apply: e => { e.industryStates.shipbuilding.pendingDeliveries += 1.2; } },
      { text: "선박 건조 선수금환급보증(RG) 한도 선제적 증액", impact: { businessTrust: 8 } }
    ]),
  makeEvent("evt_dom_27", "domestic", "국내 산업", "국내 반도체 파운드리, 글로벌 팹리스 고객사 2나노 AI 가속기 칩 수주",
    "삼성전자 파운드리 사업부가 차세대 게이트올어라운드(GAA) 공정으로 빅테크 칩 제조 계약을 성사시켰습니다.",
    s => s.month >= 10, 0.60, [
      { text: "시스템반도체 설계·파운드리 연계 국가 클러스터 인프라 긴급 확충", impact: { presidentTrust: 10, businessTrust: 12, competitiveness: 15 }, apply: e => { e.industryStates.semiconductor.capacityIndex += 6; } },
      { text: "국내 팹리스 기업 시제품 제작(MPW) 국비 지원 대폭 확대", impact: { policyMomentum: 8 } }
    ]),
  makeEvent("evt_dom_28", "domestic", "국내 산업", "국내 화장품 인디 브랜드 연합, 일본 큐텐·라쿠텐 뷰티 1~5위 석권",
    "일본 젊은 층 사이에서 K-스킨케어와 색조 화장품이 폭발적 인기를 끌며 대일 소비재 수출을 견인했습니다.",
    s => s.month >= 7, 0.65, [
      { text: "대일 화장품 검역·라벨링 간소화 및 해외 공동 물류센터 지원", impact: { publicApproval: 8, businessTrust: 8 }, apply: e => { e.industryStates.consumer.capacityIndex += 5; } },
      { text: "K-브랜드 위조품 방지 정품 인증 홀로그램 라벨 지원", impact: { businessTrust: 5 } }
    ]),
  makeEvent("evt_dom_29", "domestic", "국내 산업", "국내 기계 설비 기업들, 동유럽 배터리·전기차 턴키 공장 설비 납품",
    "헝가리, 폴란드 등 유럽 현지 배터리 공장에 국산 전극·조립 자동화 설비 수출이 10억 달러를 돌파했습니다.",
    s => s.month >= 8, 0.55, [
      { text: "수출입은행 중견 플랜트 기자재 제작자금 대출 우대금리 적용", impact: { businessTrust: 8 }, apply: e => { e.industryStates.machinery.supportLevel += 1; } },
      { text: "유럽 현지 기술지원 센터 공동 설립 지원", impact: { competitiveness: 5 } }
    ]),
  makeEvent("evt_dom_30", "domestic", "국내 산업", "철강업계, 미국향 유정용 강관(OCTG) 수출 쿼터 조기 소진 위기",
    "미국 셰일 가스 시추 붐으로 한국산 고강도 강관 주문이 몰렸으나 연간 쿼터 상한에 도달했습니다.",
    s => s.month >= 9, 0.60, [
      { text: "미 상무부에 긴급 품목 예외(Exclusion) 인정 신청 및 통상 교섭", impact: { businessTrust: 10, diplomaticTrust: 8 }, apply: e => { e.industryStates.steel.tradeBarrierIndex = Math.max(80, e.industryStates.steel.tradeBarrierIndex - 5); } },
      { text: "중동 및 캐나다 대체 시추 시장으로 수출 물량 전환 유도", impact: { businessTrust: 5 } }
    ]),
  makeEvent("evt_dom_31", "domestic", "국내 산업", "국내 방산 대기업, 미 해군 함정 MRO 전용 건조 독(Dry Dock) 준공",
    "미군 전투함과 지원함을 정밀 수리할 수 있는 최첨단 보안 건조 시설이 거제에 문을 열었습니다.",
    s => s.month >= 10, 0.65, [
      { text: "한미 방산 안보 통상 협력 기념식 참석 및 군함 MRO 세제 혜택 부여", impact: { presidentTrust: 10, diplomaticTrust: 10, businessTrust: 10 }, apply: e => { e.industryStates.shipbuilding.pendingDeliveries += 1.0; } },
      { text: "함정 유지보수 전문 기능인력 양성 과정 개설", impact: { publicApproval: 5 } }
    ]),
  makeEvent("evt_dom_32", "domestic", "국내 산업", "국내 제약·바이오 기업, 비만치료제 펩타이드 원료 의약품 수출 계약",
    "글로벌 블록버스터 비만치료제의 핵심 펩타이드 원료를 유럽 대형 제약사에 5년간 독점 공급하기로 했습니다.",
    s => s.month >= 9, 0.55, [
      { text: "펩타이드 고순도 정제 생산 시설 투자 세액공제 적용", impact: { businessTrust: 8, competitiveness: 8 }, apply: e => { e.industryStates.bio.capacityIndex += 5; } },
      { text: "바이오 원료의약품 수출 통관 간소화 제도 운영", impact: { businessTrust: 5 } }
    ]),
  makeEvent("evt_dom_33", "domestic", "국내 산업", "국내 10대 그룹, 연간 수출 목표 조기 달성 기념 결의대회",
    "대외 악조건 속에서도 반도체, 완성차, 방산 등 주력 산업의 수출 호조로 연간 목표 달성이 가시권에 들어왔습니다.",
    s => s.month >= 11, 0.70, [
      { text: "통상교섭본부장 격려사 발표 및 연말 수출 애로 24시간 특별 비상대응반 가동", impact: { presidentTrust: 10, businessTrust: 10, publicApproval: 10 }, apply: e => { e.industryStates.semiconductor.supportLevel += 1; e.industryStates.automobile.supportLevel += 1; } },
      { text: "내년도 보호무역 대비 통상 리스크 관리 포럼 소집", impact: { policyMomentum: 8 } }
    ]),
  makeEvent("evt_dom_34", "domestic", "국내 산업", "국내 로봇 제조사, 북미 물류센터 무인 지게차·AGV 대량 납품",
    "아마존 및 월마트 대형 물류 허브에 한국산 AI 자율주행 물류 로봇 2,000대 납품 계약이 성사됐습니다.",
    s => s.month >= 10, 0.50, [
      { text: "첨단 서비스·물류 로봇 해외 실증 및 통상 표준화 규범 협의 지원", impact: { businessTrust: 8, competitiveness: 8 }, apply: e => { e.industryStates.machinery.capacityIndex += 5; } },
      { text: "국내 로봇 핵심 부품 감속기·센서 국산화 펀드 조성", impact: { competitiveness: 6 } }
    ]),
  makeEvent("evt_dom_35", "domestic", "국내 산업", "국내 자동차 3사, 소프트웨어 중심 차량(SDV) 연합 플랫폼 출범",
    "현대차와 전장 부품사들이 연합해 차량용 운영체제(OS)와 차세대 인포테인먼트 수출 표준화에 나섰습니다.",
    s => s.month >= 11, 0.55, [
      { text: "SDV 차량용 반도체·소프트웨어 국가 R&D 세제 지원 및 수출 승인 단축", impact: { presidentTrust: 8, businessTrust: 10, competitiveness: 12 }, apply: e => { e.industryStates.automobile.longTermCompetitiveness += 10; } },
      { text: "글로벌 차량 사이버보안 통상 규범 공동 대응 협의체 구성", impact: { diplomaticTrust: 6 } }
    ])
];
EVENTS_POOL.push(...domEvents);

// =============================================================================
// CATEGORY 3: 정치 및 정부 부처 조정 이벤트 (25 Events)
// =============================================================================
const polEvents = [
  makeEvent("evt_pol_01", "political", "정치·정부", "대통령 긴급 독대: '무역 성적표가 국정 동력의 핵심이오'",
    "용산 대통령실에서 본부장을 긴급 호출해 수출입 지표 그래프를 직접 짚으며 엄중한 당부와 지시를 내렸습니다.",
    s => s.month === 3 || s.month === 7 || s.month === 10, 0.85, [
      { text: "'연간 무역흑자 사상 최대치 달성으로 보답하겠습니다' - 공격적 목표 공언", impact: { presidentTrust: 15, policyMomentum: 15 }, apply: e => { for (const ind of Object.values(e.industryStates)) ind.supportLevel += 0.5; } },
      { text: "'외형보다 실질 채산성과 국내 산업 경쟁력을 다지겠습니다' - 현실적 조언", impact: { presidentTrust: 5, businessTrust: 10, competitiveness: 10 } }
    ]),
  makeEvent("evt_pol_02", "political", "정치·정부", "국회 산자위 현안질의: 여야 의원들의 파상공세",
    "국회 산업통상위원회 회의장에서 여야 의원들이 미국 관세 대응과 중소기업 수출 난항을 두고 날선 질문을 쏟아냈습니다.",
    s => s.month === 5 || s.month === 9, 0.80, [
      { text: "치밀한 통상 데이터와 단계별 협상 로드맵을 제시하며 당당하게 반박 및 설득", impact: { publicApproval: 12, policyMomentum: 12, presidentTrust: 5 } },
      { text: "지적된 애로사항을 겸허히 인정하고 신속한 중소기업 보완 예산 배정 약속", impact: { businessTrust: 10, publicApproval: 5 } }
    ]),
  makeEvent("evt_pol_03", "political", "정치·정부", "경제부총리와의 정책 조율: '수출금융 확대 vs 기획예산처 재정관리'",
    "재정경제부 경제부총리와 기획예산처가 무역금융 50조 원 확대에 대해 '재정 건전성과 세수 관리'를 이유로 난색을 표했습니다.",
    s => s.month >= 6, 0.60, [
      { text: "대통령 보고를 통해 경제부총리와 기획예산처를 설득하고 전격적인 재정 배정 관철", impact: { presidentTrust: 10, policyMomentum: 15, businessTrust: 10 } },
      { text: "기획예산처의 예산 한계를 수용하고 민간 정책금융 펀드로 우회 추진", impact: { businessTrust: 5, policyMomentum: 0 } }
    ]),
  makeEvent("evt_pol_04", "political", "정치·정부", "외교부 장관과의 대미 통상 외교 조율 회의",
    "안보 외교와 통상 실익 사이의 우선순위를 두고 외교부와 통상교섭본부 간의 전략 조정 회의가 열렸습니다.",
    s => s.month >= 4, 0.65, [
      { text: "실용적 통상 이익을 최우선으로 내세워 경제 안보 패키지 협상권 확보", impact: { policyMomentum: 10, diplomaticTrust: 5 } },
      { text: "전통적 안보 동맹 틀 내에서 통상 카드를 조화롭게 연계하는 절충안 채택", impact: { diplomaticTrust: 10, presidentTrust: 5 } }
    ]),
  makeEvent("evt_pol_05", "political", "정치·정부", "한국은행 금융통화위원회 총재와의 거시경제 비공개 오찬",
    "한은 총재와 마주 앉아 원/달러 환율 급변동과 수출입 결제 대금 유동성 안정을 논의했습니다.",
    s => s.month >= 5, 0.60, [
      { text: "수출 기업의 외화 수급 안정을 위해 통화 스와프 및 외환 거시건전성 정책 공조", impact: { businessTrust: 10, competitiveness: 5 } },
      { text: "물가 안정과 수출 경쟁력 사이의 통화정책 독립성 상호 존중 확인", impact: { policyMomentum: 5, diplomaticTrust: 5 } }
    ]),
  makeEvent("evt_pol_06", "political", "정치·정부", "경제 5단체장 긴급 오찬 회동: '기업을 뛰게 해달라'",
    "한국경영자총협회, 대한상공회의소, 무역협회 등 5대 경제단체장들이 규제 완화와 세제 지원을 건의했습니다.",
    s => s.month >= 6, 0.70, [
      { text: "수출 현장 킬러 규제 10대 과제 연내 전격 철폐 약속", impact: { businessTrust: 15, presidentTrust: 5, competitiveness: 8 } },
      { text: "청년 고용 창출과 국내 공장 설비 투자 확대를 조건으로 한 선별적 지원 제시", impact: { publicApproval: 10, businessTrust: 5 } }
    ]),
  makeEvent("evt_pol_07", "political", "정치·정부", "전국 농민총연맹, 미국산 농축산물 수입 개방 반대 대규모 집회",
    "미국과의 통상 협상에서 농산물 양보설이 흘러나오자 수천 명의 농민들이 세종 청사 앞에서 상경 집회를 열었습니다.",
    s => s.month >= 4, 0.60, [
      { text: "집회 대표단을 직접 집무실로 초청해 농축산물 시장 보호 원칙을 설명하고 설득", impact: { publicApproval: 8, presidentTrust: 5 } },
      { text: "농업 피해 보전을 위한 특별 무역이득공유제 기금 1조 원 조성 법안 추진", impact: { publicApproval: 12, businessTrust: -5 } }
    ]),
  makeEvent("evt_pol_08", "political", "정치·정부", "감사원, 대미 통상 협상단 기밀 관리 및 사전 보고 정기 감사 착수",
    "협상 문서 유출 방지와 의사결정 투명성을 명분으로 감사원이 통상교섭본부 실무팀에 대한 감사를 시작했습니다.",
    s => s.month >= 7, 0.50, [
      { text: "모든 협상 기록과 절차를 투명하게 공개하며 정면 돌파", impact: { policyMomentum: 5, presidentTrust: 5 } },
      { text: "협상 전략 노출 위험을 들어 핵심 대외 기밀에 대한 감사 유예 요청", impact: { policyMomentum: 10, publicApproval: -5 } }
    ]),
  makeEvent("evt_pol_09", "political", "정치·정부", "여론조사 발표: 통상교섭본부 국정 지지율 최고치 경신",
    "기민한 수출 드라이브와 무역흑자 소식이 전해지며 통상교섭본부장에 대한 국민적 호감도가 급상승했습니다.",
    s => s.month >= 6 && s.politics.publicApproval >= 65, 0.70, [
      { text: "'국민과 수출 역군들의 땀방울 덕분'이라며 공을 기업과 노동자에게 돌리는 겸손한 담화", impact: { publicApproval: 15, presidentTrust: 8, businessTrust: 8 } },
      { text: "국민적 지지를 동력 삼아 국회에 계류된 통상 지원 특별법 통과 강력 촉구", impact: { policyMomentum: 15, publicApproval: 5 } }
    ]),
  makeEvent("evt_pol_10", "political", "정치·정부", "국무회의 긴급 안건 상정: '글로벌 공급망 교란 대응 특별법'",
    "핵심 원자재 공급선 다변화 기업에 보조금을 지급하는 특별법안이 국무회의에 긴급 상정됐습니다.",
    s => s.month >= 5, 0.65, [
      { text: "국무회의에서 안건 제안 설명을 주도하며 전 부처 장관들의 만장일치 통과 견인", impact: { presidentTrust: 10, policyMomentum: 12, businessTrust: 10 } },
      { text: "부처 간 중복 규제 조항을 정비한 뒤 재상정하도록 신중론 견지", impact: { policyMomentum: 5 } }
    ]),
  makeEvent("evt_pol_11", "political", "정치·정부", "국회 여야 지도부, 초당적 통상 외교 방미 사절단 파견 합의",
    "미국의 보편관세 압박에 맞서 여야 원내대표들이 통상교섭본부장과 함께 워싱턴 의회를 방문하기로 했습니다.",
    s => s.month >= 6, 0.60, [
      { text: "의원단에 지역구별 미국 투자 현황 브리핑 자료를 제공하고 입체적 의회 로비 전개", impact: { diplomaticTrust: 12, publicApproval: 10, presidentTrust: 8 } },
      { text: "정부 공식 협상단과의 메시지 혼선을 방지하기 위해 실무 역할 철저히 분담", impact: { policyMomentum: 8 } }
    ]),
  makeEvent("evt_pol_12", "political", "정치·정부", "중소벤처기업부 장관, 수출 테크 스타트업 공동 육성 제안",
    "AI 소프트웨어, 우주항공, 친환경 소재 스타트업의 해외 진출을 위한 협력 사업이 제안됐습니다.",
    s => s.month >= 5, 0.55, [
      { text: "글로벌 K-스타트업 전용 무역금융 및 실리콘밸리 데모데이 공동 개최", impact: { businessTrust: 10, competitiveness: 8 } },
      { text: "수출 실적이 검증된 중소 제조기업 지원에 우선순위 배정", impact: { businessTrust: 5 } }
    ]),
  makeEvent("evt_pol_13", "political", "정치·정부", "관세청, AI 기반 24시간 스마트 통관 시스템 전면 가동",
    "수출입 컨테이너 통관 소요 시간이 기존 4시간에서 30분으로 대폭 단축되며 물류 효율이 혁신됐습니다.",
    s => s.month >= 7, 0.65, [
      { text: "스마트 통관 데이터를 무역상황실과 실시간 연동해 일일 무역 텔레메트리 고도화", impact: { policyMomentum: 10, competitiveness: 8 }, apply: e => { for (const ind of Object.values(e.industryStates)) ind.supportLevel += 0.5; } },
      { text: "해외 바이어들에게 한국의 신속 통관 인프라 적극 홍보", impact: { diplomaticTrust: 6 } }
    ]),
  makeEvent("evt_pol_14", "political", "정치·정부", "통상교섭본부장 교체설 찌라시 여의도 증권가 유포 소동",
    "수출 성과를 시기한 정치권 일각에서 본부장 개각설을 흘리며 정책 동요를 시도했습니다.",
    s => s.month >= 8, 0.50, [
      { text: "일절 대응하지 않고 대형 통상 협상 타결 성과로 근거 없는 소문을 잠재움", impact: { presidentTrust: 10, policyMomentum: 10 } },
      { text: "대통령실 대변인을 통해 유임과 전폭적 신임을 확인하는 공식 브리핑 요청", impact: { presidentTrust: 5, businessTrust: 5 } }
    ]),
  makeEvent("evt_pol_15", "political", "정치·정부", "주한 미국상공회의소(AMCHAM) 초청 통상 특별 오찬 간담회",
    "제임스 킴 암참 회장과 구글, 퀄컴, GM 등 주한 미국 기업 대표들이 투자 환경 개선을 건의했습니다.",
    s => s.month >= 6, 0.60, [
      { text: "미국 기업들의 대인천·대울산 투자 확대를 조건으로 외국인투자 세제 감면 약속", impact: { diplomaticTrust: 10, businessTrust: 10 } },
      { text: "국내 플랫폼 및 노동 규범의 공정한 적용 원칙을 당당하게 설파", impact: { publicApproval: 8, diplomaticTrust: -4 } }
    ]),
  makeEvent("evt_pol_16", "political", "정치·정부", "국무총리 주재 대외경제안보전략회의 긴급 소집",
    "공급망 3법 시행과 글로벌 보호무역 격화에 따른 국가 대외경제 전략 점검 회의가 열렸습니다.",
    s => s.month >= 7, 0.65, [
      { text: "통상교섭본부가 범부처 컨트롤타워 역할을 주도하겠다고 선언하고 실행계획 발표", impact: { policyMomentum: 15, presidentTrust: 8 } },
      { text: "관계 부처 간 유기적 역할 분담을 강조하며 차분한 실무 조율 선택", impact: { diplomaticTrust: 6 } }
    ]),
  makeEvent("evt_pol_17", "political", "정치·정부", "공정거래위원회, 대기업의 1차 협력사 납품단가 연동제 실태조사",
    "원자재 가격 상승분을 납품단가에 제대로 반영하지 않은 일부 대기업에 대한 시정명령이 예고됐습니다.",
    s => s.month >= 8, 0.55, [
      { text: "수출 대기업과 중소 부품사 간 공정 거래 및 상생 협약 체결 중재", impact: { publicApproval: 10, businessTrust: 5 } },
      { text: "글로벌 가격 경쟁력 유지를 위해 대기업의 원가 절감 자율성 고려 건의", impact: { businessTrust: 8, publicApproval: -5 } }
    ]),
  makeEvent("evt_pol_18", "political", "정치·정부", "KOTRA 해외무역관장 비상 화상회의 소집",
    "전 세계 84개국 128개 무역관장들을 소집해 현지 통상 규제 동향과 신규 바이어 발굴을 지시했습니다.",
    s => s.month >= 5, 0.70, [
      { text: "무역관별 수출 계약 실적 목표제 도입 및 우수 무역관 특별 포상", impact: { policyMomentum: 10, competitiveness: 8 }, apply: e => { e.industryStates.consumer.supportLevel += 1; } },
      { text: "해외 진출 중소기업 현장 애로 해소 지원 데스크 24시간 가동", impact: { businessTrust: 8 } }
    ]),
  makeEvent("evt_pol_19", "political", "정치·정부", "환경부와의 탄소배출권(K-ETS) 유상할당 비율 협의",
    "환경부가 철강, 석유화학 기업의 배출권 유상할당 확대를 추진하자 기업들이 수출 원가 상승을 호소했습니다.",
    s => s.month >= 7, 0.50, [
      { text: "수출 주력 한계 기업에 대한 친환경 설비 전환 기간 2년 유예 협의 관철", impact: { businessTrust: 12, competitiveness: 6 } },
      { text: "유럽 CBAM 대응을 위해 배출권 가격 현실화 및 녹색 전환 가속화 수용", impact: { diplomaticTrust: 8, businessTrust: -6 } }
    ]),
  makeEvent("evt_pol_20", "political", "정치·정부", "국회 예결위, 2028년도 통상진흥 및 무역보험 기금 정부 출연금 심사",
    "내년도 통상 예산 심사에서 야당이 무역보험기금 2조 원 증액안의 실효성을 집중 검증했습니다.",
    s => s.month >= 10, 0.65, [
      { text: "올해의 압도적 수출 성과 지표를 제시하며 원안 전액 삭감 없는 통과 관철", impact: { presidentTrust: 8, policyMomentum: 12, businessTrust: 10 } },
      { text: "부실 우려 채권 관리 강화를 부대조건으로 수용하고 원만히 합의", impact: { publicApproval: 5 } }
    ]),
  makeEvent("evt_pol_21", "political", "정치·정부", "양대 노총 대표단과의 통상 노동 라운드 테이블",
    "한국노총과 민주노총 지도부가 해외 투자 확대에 따른 국내 일자리 공동화 방지 대책을 요구했습니다.",
    s => s.month >= 9, 0.55, [
      { text: "국내 리쇼어링 투자 기업에 대규모 고용 장려금을 지급하는 노사정 협약 타결", impact: { publicApproval: 12, presidentTrust: 6 } },
      { text: "글로벌 관세 장벽 극복을 위한 현지 투자의 불가피성을 설명하고 이해 당부", impact: { businessTrust: 8, publicApproval: -4 } }
    ]),
  makeEvent("evt_pol_22", "political", "정치·정부", "한국무역협회 창립기념식 특별 기조연설 초청",
    "국내 7만여 수출기업 대표들이 모인 자리에서 본부장이 대한민국 통상 비전 2030을 발표했습니다.",
    s => s.month >= 10, 0.65, [
      { text: "'수출 1조 달러 시대를 여는 혁신 제조 강국' 청사진 제시로 기립박수", impact: { businessTrust: 15, publicApproval: 10, policyMomentum: 10 } },
      { text: "현장 수출 유공 중소기업 대표들과 즉석 끝장 토론 진행", impact: { businessTrust: 12, publicApproval: 8 } }
    ]),
  makeEvent("evt_pol_23", "political", "정치·정부", "대통령실 안보실장 주재 경제안보 핵심품목 비축 점검 회의",
    "요소, 흑연, 티타늄 등 200대 경제안보 품목의 국내 비축 일수를 점검했습니다.",
    s => s.month >= 8, 0.60, [
      { text: "핵심 품목 공공 비축 일수를 기존 60일에서 100일로 확충하는 특별 예산 배정", impact: { presidentTrust: 8, competitiveness: 8 }, apply: e => { e.industryStates.battery.capacityIndex += 4; } },
      { text: "민간 기업의 대체 공급처 확보를 지원하는 세제 인센티브 법안 추진", impact: { businessTrust: 8 } }
    ]),
  makeEvent("evt_pol_24", "political", "정치·정부", "국제통화기금(IMF) 연례협의단, 한국 무역정책 긍정 평가 발표",
    "IMF 협의단이 한국의 다변화된 무역 구조와 선제적 통상 협상 노력을 높이 평가하는 성명을 냈습니다.",
    s => s.month >= 11, 0.65, [
      { text: "국제기구의 공인을 바탕으로 대외 국가 신인도 및 외국인 투자 유치 설명회 개최", impact: { diplomaticTrust: 12, presidentTrust: 8, publicApproval: 8 } },
      { text: "국내 제조업 생산성 향상을 위한 구조개혁 과제 지속 추진 발표", impact: { policyMomentum: 8 } }
    ]),
  makeEvent("evt_pol_25", "political", "정치·정부", "대통령의 대국민 담화: '무역 성과로 대한민국 경제 체질 바꿨다'",
    "대통령이 특별 대국민 담화를 통해 통상교섭본부와 산업계의 노고를 치하하고 국민적 자긍심을 고취했습니다.",
    s => s.month >= 11 && s.politics.presidentTrust >= 65, 0.70, [
      { text: "본부장과 실무 협상단 전원에게 대통령 훈장 및 포상 수여", impact: { presidentTrust: 15, publicApproval: 15, policyMomentum: 15 } },
      { text: "내년도 보호무역 쓰나미에 대비한 제2차 통상 방어망 구축 착수", impact: { policyMomentum: 12, competitiveness: 10 } }
    ])
];
EVENTS_POOL.push(...polEvents);

// =============================================================================
// CATEGORY 4: 통상 첩보 및 비공개 교섭 이벤트 (14 Events)
// =============================================================================
const intelEvents = [
  makeEvent("evt_intel_01", "negotiation", "통상 첩보", "미 의회 비공개 메모 유출: '한국산 자동차 관세 면제 조건'",
    "워싱턴 정가 소식통을 통해 미 상원 재정위원회의 비공개 내부 보고서가 입수되었습니다.",
    s => s.month >= 2, 0.75, [
      { text: "대미 협상 대표단에 즉각 훈령을 하달하여 알래스카 LNG 및 군함 MRO 카드 우선 제시", impact: { diplomaticTrust: 10, policyMomentum: 10 }, apply: e => { if (e.partnerStates.US) e.partnerStates.US.relations += 8; } }
    ]),
  makeEvent("evt_intel_02", "negotiation", "통상 첩보", "베이징 주재 대사관 발 극비 전문: '중국 상무부의 희토류 협상 한계선'",
    "중국 정부가 순수 민간 차량용 배터리 소재는 비공식 패스트트랙으로 통관을 허용할 준비가 되어 있다는 첩보입니다.",
    s => s.month >= 3, 0.70, [
      { text: "대중 협상에서 첨단 군사용과 일반 민수용을 분리하는 투트랙 협상안 전격 제시", impact: { diplomaticTrust: 10, businessTrust: 8 }, apply: e => { if (e.partnerStates.CN) e.partnerStates.CN.relations += 8; } }
    ]),
  makeEvent("evt_intel_03", "negotiation", "통상 첩보", "브뤼셀 통상관실 긴급 보고: 'EU CBAM 철강 배출량 계량 방식 논란'",
    "EU 집행위 내부에서 고로 제철소의 재생에너지 전력 사용을 탄소 감축 실적으로 인정할지 격론이 벌어지고 있습니다.",
    s => s.month >= 4, 0.65, [
      { text: "한국전력의 신재생에너지 PPA(전력구매계약) 인증서를 EU 기준에 맞추는 긴급 기술 로비", impact: { diplomaticTrust: 10, businessTrust: 10 }, apply: e => { e.industryStates.steel.tradeBarrierIndex = Math.max(80, e.industryStates.steel.tradeBarrierIndex - 5); } }
    ]),
  makeEvent("evt_intel_04", "negotiation", "통상 첩보", "도쿄 경제산업성 내부 문서 입수: '한미일 첨단 소부장 공급망 연대'",
    "일본 정부가 차세대 극자외선(EUV) 펠리클 및 특수 가스 공동 비축을 한국에 공식 제안할 방침이라는 정보입니다.",
    s => s.month >= 4, 0.65, [
      { text: "한일 소부장 통상 협의체 조기 개최를 역제안하고 수출 절차 완전 백색국가화 관철", impact: { diplomaticTrust: 12, competitiveness: 8 }, apply: e => { e.industryStates.semiconductor.capacityIndex += 5; } }
    ]),
  makeEvent("evt_intel_05", "negotiation", "통상 첩보", "사우디 국부펀드(PIF)의 극비 방산·원전 패키지 투자 타진",
    "사우디 정부가 한국 방산 기업 지분 인수 및 현지 합작 법인 설립에 50억 달러 투자를 희망한다는 소식입니다.",
    s => s.month >= 5, 0.60, [
      { text: "정부 간 방산 안보 협정(G2G) 체결을 전제로 투자 승인 협상 개시", impact: { presidentTrust: 10, businessTrust: 10, competitiveness: 10 }, apply: e => { e.industryStates.defense.pendingDeliveries += 1.5; } }
    ]),
  makeEvent("evt_intel_06", "negotiation", "통상 첩보", "싱가포르 중계무역 업계의 대러·대이란 우회 수출 단속 동향",
    "미국 재무부 해외자산통제국(OFAC)이 제3국 우회 수출 기업들에 대한 세컨더리 보이콧 조사를 준비하고 있습니다.",
    s => s.month >= 6, 0.60, [
      { text: "국내 수출기업 전수 자율 통제 점검 및 미국의 제재 규정 준수 가이드라인 긴급 하달", impact: { diplomaticTrust: 10, policyMomentum: 8 } }
    ]),
  makeEvent("evt_intel_07", "negotiation", "통상 첩보", "글로벌 원자재 트레이더 극비 리포트: '하반기 구리·리튬 공급 과잉 전망'",
    "남미 광산 증설로 핵심 광물 가격이 하향 안정화될 것이라는 신뢰도 높은 예측 보고서가 입수됐습니다.",
    s => s.month >= 6, 0.65, [
      { text: "국내 배터리·전선 기업들의 장기 원자재 도입 계약 단가 재협상 지원", impact: { businessTrust: 10 }, apply: e => { e.industryStates.battery.priceCompetitiveness += 5; } }
    ]),
  makeEvent("evt_intel_08", "negotiation", "통상 첩보", "미 USTR 대표단 방한 일정 유출: '비공개 농가 방문 추진'",
    "미국 협상 대표단이 한국 방문 기간 중 지방 과수 농가를 비공식 방문해 검역 개방 여론을 떠보려 한다는 첩보입니다.",
    s => s.month >= 7, 0.55, [
      { text: "농림축산식품부와 공조해 선제적으로 한국 농가의 방역 위생 기준 설명회 공식 주선", impact: { diplomaticTrust: 8, publicApproval: 8 } }
    ]),
  makeEvent("evt_intel_09", "negotiation", "통상 첩보", "중국 세관의 한국산 석유화학 제품 통관 지연 사전 경보",
    "중국 칭다오·상하이 세관에서 한국산 합성수지에 대한 검사 비율을 무작위로 높이려 한다는 첩보입니다.",
    s => s.month >= 7, 0.60, [
      { text: "한중 세관 당국 간 상호인정협정(AEO) 핫라인을 통해 부당 통관 지연 즉각 해소", impact: { businessTrust: 10, diplomaticTrust: 6 }, apply: e => { e.industryStates.petrochemical.tradeBarrierIndex = Math.max(80, e.industryStates.petrochemical.tradeBarrierIndex - 5); } }
    ]),
  makeEvent("evt_intel_10", "negotiation", "통상 첩보", "유럽 최대 자동차 부품사, 한국산 배터리 셀 독점 공급 타진",
    "독일 완성차 컨소시엄이 유럽 내 중국산 배터리 의존도를 줄이기 위해 한국 3사에 10조 원 규모 장기 공급을 요청했습니다.",
    s => s.month >= 8, 0.65, [
      { text: "대EU 통상 채널을 가동해 독일 정부의 공장 설립 보조금 수령 지원", impact: { businessTrust: 12, competitiveness: 10 }, apply: e => { e.industryStates.battery.capacityIndex += 8; } }
    ]),
  makeEvent("evt_intel_11", "negotiation", "통상 첩보", "국제 신용평가사(무디스·S&P) 한국 통상 구조 특별 실사단 파견",
    "신용평가사들이 대미 관세 위험 및 수출 다변화 성과를 한국 국가신용등급 평가에 반영하기로 했습니다.",
    s => s.month >= 9, 0.60, [
      { text: "본부장이 직접 프레젠테이션을 주재하여 견고한 무역흑자 텔레메트리 입증", impact: { presidentTrust: 10, diplomaticTrust: 12, competitiveness: 10 } }
    ]),
  makeEvent("evt_intel_12", "negotiation", "통상 첩보", "미국 방산 조달청의 군함 유지보수(MRO) 추가 슬롯 배정 동향",
    "미 해군이 태평양 함대뿐 아니라 인도양 작전 함정까지 한국 야드에 정비 위탁을 검토 중이라는 내부 첩보입니다.",
    s => s.month >= 9, 0.65, [
      { text: "국방부와 한미 안보 협력 공동 성명 채택 및 장기 군함 정비 협정(MSRA) 조기 체결", impact: { presidentTrust: 10, diplomaticTrust: 12 }, apply: e => { e.industryStates.shipbuilding.pendingDeliveries += 1.5; } }
    ]),
  makeEvent("evt_intel_13", "negotiation", "통상 첩보", "유럽의약품청(EMA) 신속 승인 가이드라인 개정안 입수",
    "유럽 보건당국이 바이오시밀러의 임상 3상 면제 범위를 확대할 방침이라는 호재성 정보입니다.",
    s => s.month >= 10, 0.60, [
      { text: "국내 바이오시밀러 기업들의 유럽 허가 신청 서류 신속 검토 지원", impact: { businessTrust: 10, competitiveness: 10 }, apply: e => { e.industryStates.bio.capacityIndex += 8; } }
    ]),
  makeEvent("evt_intel_14", "negotiation", "통상 첩보", "미국 의회 러스트벨트 의원단, 한국산 철강 강관 쿼터 예외 법안 검토",
    "미국 내 석유·가스 시추 비용 급등으로 미국 시추 기업들이 한국산 특수 강관 쿼터 확대를 의회에 로비하고 있습니다.",
    s => s.month >= 10, 0.65, [
      { text: "미국 에너지산업협회와 공동 전선을 구축해 쿼터 20% 긴급 확대 관철", impact: { businessTrust: 12, diplomaticTrust: 10 }, apply: e => { e.industryStates.steel.tradeBarrierIndex = Math.max(75, e.industryStates.steel.tradeBarrierIndex - 12); } }
    ])
];
EVENTS_POOL.push(...intelEvents);

console.log(`Audited EVENTS_POOL loaded: Total ${EVENTS_POOL.length} events verified.`);

export class EventEngine {
  constructor(prng) {
    this.prng = prng;
    this.triggeredEvents = new Set();
  }

  rollEvent(state) {
    const eligible = EVENTS_POOL.filter(evt => {
      if (this.triggeredEvents.has(evt.id)) return false;
      return evt.condition(state);
    });

    if (eligible.length === 0) return null;

    const candidates = eligible.filter(evt => this.prng.next() <= evt.probability);
    if (candidates.length === 0) return null;

    const chosen = this.prng.choice(candidates);
    this.triggeredEvents.add(chosen.id);
    return chosen;
  }
}
