// newspaper.mjs - Virtual JoongAng Ilbo (중앙일보) Front Page Generator
// Enhanced with multi-month memory, proactive partner threats, corporate agency, and Two-Level Game coverage

export class NewspaperEngine {
  constructor() {
    this.issueBase = 21450;
    this.pastHeadlines = [];
  }

  generateFrontPage(monthlyResult, politicsState, lastAction = null, negotiationResult = null, extraContext = {}) {
    const month = monthlyResult.month;
    const releaseYear = month === 12 ? 2028 : 2027;
    const releaseMonth = month === 12 ? 1 : month + 1;
    const dateStr = `${releaseYear}년 ${releaseMonth}월 2일 화요일 (제${this.issueBase + month}호)`;

    const exp = monthlyResult.export.toFixed(1);
    const imp = monthlyResult.import.toFixed(1);
    const bal = monthlyResult.balance.toFixed(1);
    const yoy = monthlyResult.yoyExportGrowth >= 0 ? `+${monthlyResult.yoyExportGrowth}%` : `${monthlyResult.yoyExportGrowth}%`;
    const cumBal = monthlyResult.cumulativeBalance.toFixed(1);

    // Identify industry heroes and victims
    const indArray = Object.values(monthlyResult.industries);
    indArray.sort((a, b) => b.yoyGrowth - a.yoyGrowth);
    const topInd = indArray[0];
    const bottomInd = indArray[indArray.length - 1];

    let headline = "";
    let deck = "";
    let body = [];

    const { corporateAction, proactiveThreat, twoLevelNote, doctrine, pressStatement, campaignDecision, campaignMonth, campaignBranch } = extraContext;

    // Campaign Pilot: Taiwan Strait Crisis Front-Page Priority
    if (campaignDecision) {
      if (campaignMonth === 1) {
        if (campaignBranch === 'BRANCH_A') {
          headline = `韓, 美 주도 '반도체 안보동맹' 전격 서명…대만해협 위기 속 TSMC 대체 선점`;
          deck = `시안·우시 리스크 감수하고 서방 칩 요새로…베이징 "원자재 통상 보복" 격렬 반발`;
          body.push(`중국의 대만해협 봉쇄로 글로벌 테크 공급망이 마비된 가운데, 정부가 미국과의 첨단 반도체 공급망 안보 동맹에 전격 서명했다. 워싱턴 시장 내 TSMC 대체 물량을 선점하는 대신 중국의 자원 보복을 정면 돌파하겠다는 전략적 결단이다.`);
        } else if (campaignBranch === 'BRANCH_B') {
          headline = `韓, "상업용 반도체는 제재 대상 아니다"…대만해협 격랑 속 '공급망 중립' 천명`;
          deck = `美 세컨더리 보이콧 압박 맞서 시안 팹 사수…미·중 동시 물밑 교섭 착수`;
          body.push(`대만해협의 전운 속에서 통상교섭본부장이 순수 민간 메모리 교역의 불가침성을 선언하며 '공급망 중립 지대'를 공식 천명했다. 미·중 양국의 일방적 줄세우기를 거부하고 국익 중심의 실용 통상 노선을 천명한 것으로 풀이된다.`);
        } else {
          headline = `韓, "미·중 패권에 휘둘리지 않는다"…용인 팹 국가 패스트트랙·유럽·인도 직수출 선언`;
          deck = `100% 소부장 국내 자립화 승부수…독일·인도 자동차 고위 사절단 세종으로 집결`;
          body.push(`미·중 패권 다툼의 희생양이 되지 않겠다는 선언과 함께, 용인 메가 클러스터 국내 완결형 생태계 구축과 유럽·인도 대체 시장 개척을 위한 국가 총동원령이 발동됐다. TSMC 대체 물량을 찾는 글로벌 기업들의 발길이 세종으로 이어지고 있다.`);
        }
      } else if (campaignMonth === 2) {
        if (campaignBranch === 'BRANCH_A') {
          headline = `中, 한국행 흑연·갈륨 통관 전면 동결…배터리 3사 "원자재 재고 20일분 비상"`;
          deck = `美 초과이익 환수 압박까지 겹쳐…통상사령탑, 텍사스 증설 카드로 백악관 정면 승부`;
          body.push(`한국의 대미 반도체 결속에 반발한 중국 상무부가 흑연·갈륨 통관을 전면 동결하며 배터리 산업에 비상이 걸렸다. 한편 워싱턴에서는 초과이익 환수 요구가 빗발치자 통상 당국은 현지 패키징 투자 조기 카드로 맞불을 놓았다.`);
        } else if (campaignBranch === 'BRANCH_B') {
          headline = `美 의회, 韓 반도체 FDPR 제재안 발의…中 "시안 열어줄 테니 철강 무관세 개방하라"`;
          deck = `양대 강국 사이 샌드위치 위기…정부, 제네바 3자 다자 협정 발의로 정면 돌파`;
          body.push(`한국의 상업적 중립 표방에 대해 미 의회가 세컨더리 보이콧 카드를 꺼내 들었고, 중국은 국내 철강 시장 개방이라는 독이 든 사과를 내밀었다. 통상 당국은 국내 산업 피해를 막기 위해 스위스 제네바 다자 협상으로 판을 키웠다.`);
        } else {
          headline = `EU·인도 통상 사절단 세종 전격 방문…韓 반도체 500억 달러 장기 공급 빅딜`;
          deck = `용인 송전탑 국가직권 착공…유럽 CBAM 탄소세 5년 면제 확약서 쟁취`;
          body.push(`TSMC 봉쇄로 유럽 자동차 라인이 멈출 위기에 처하자, 독일과 인도가 한국산 차량용 반도체 수주를 위해 세종으로 급파됐다. 정부는 국내 송전망 인허가를 직권 돌파하고 유럽 탄소국경세 전면 면제라는 역사적 쾌거를 거뒀다.`);
        }
      } else if (campaignMonth === 3) {
        if (campaignBranch === 'BRANCH_A') {
          headline = `韓·美 백악관 정상회담 통상 빅딜 체결…대미 반도체 수출 사상 최대치 돌파`;
          deck = `TSMC 대체 점유율 85% 석권…美 LNG 장기 구매로 환율 관찰대상국 압박 털어내`;
          body.push(`백악관 정상회담에서 한·미 포괄적 통상 빅딜이 최종 성사됐다. 한국 기업이 미국 시장 내 TSMC 대체 물량을 사실상 독점 수주하며 반도체 수출이 사상 최고치를 경신했으며, 에너지 구매 연계로 통상 마찰을 해소했다.`);
        } else if (campaignBranch === 'BRANCH_B') {
          headline = `제네바 실리콘 협정 극적 타결…미·중 양국, 韓 반도체 '중립 무역 지대' 공식 승인`;
          deck = `치밀한 다자 외교로 시안 공장과 미국 수출선 동시 수호…세계의 공급망 완충국 우뚝`;
          body.push(`스위스 제네바에서 열린 미·중·한 3자 비밀 회담에서 '제네바 실리콘 협정'이 공식 체결됐다. 한국은 고래 싸움 속에서 시안 팹과 대미 수출선을 모두 지켜내며 글로벌 공급망의 독보적 중립 완충 국가로 공인받았다.`);
        } else {
          headline = `자립형 K-반도체 제1기 팹 첫 출하…韓·EU·인도 신(新) 유라시아 통상 동맹 출범`;
          deck = `미·중 패권 종속 탈출하고 기술 주권 입증…친환경 제철·배터리 유럽 무관세 협정 쾌거`;
          body.push(`용인 반도체 메가 클러스터에서 첫 웨이퍼가 성공적으로 출하된 가운데, 유럽 및 신흥 시장과의 다자 FTA가 전격 발효됐다. 미·중 패권 줄다리기에서 탈피하여 독자적인 글로벌 산업 네트워크를 구축한 자주 통상의 승리다.`);
        }
      }
    } else if (pressStatement) {
      headline = pressStatement.headline;
      deck = pressStatement.deck;
      body.push(`정부서울청사 합동브리핑실에서 열린 ${month}월 수출입 동향 기자회견에서 통상교섭본부장은 "${pressStatement.quote}"라고 결연한 입장을 천명했다. 당국은 이달 무역수지가 ${bal >= 0 ? '+' : ''}$${bal}B를 기록했다고 발표했다.`);
    } else if (corporateAction && corporateAction.actionKey === 'hyundai_georgia_shift') {
      headline = `현대차 조지아 3교대 전격 확대…美 관세 장기화에 "울산 특근 전면 중단"`;
      deck = `통상 리스크에 기업 '탈한국' 가속화…지역 부품사 연쇄 위기감 고조`;
      body.push(`현대자동차그룹이 미국의 고율 관세 장기화에 대응해 조지아 메타플랜트 생산라인을 3교대로 풀가동하고 국내 울산 공장 특근을 중단하기로 결정했다. 통상 리스크가 결국 국내 제조업 일자리와 협력업체 생태계를 직접 강타하는 모양새다.`);
    } else if (corporateAction && corporateAction.actionKey === 'posco_furnace_shutdown') {
      headline = `포스코, 40년 만에 고로 '휴풍' 결단…中 덤핑·EU 탄소세에 철강 비상`;
      deck = `포항 1선재공장·당진 전기로 가동 중단…철강업계 사상 최악의 한파`;
      body.push(`중국산 저가 덤핑 후판의 국내 시장 침투와 유럽연합(EU)의 CBAM 탄소국경세 압박에 밀려 포스코와 현대제철이 핵심 설비 가동을 멈췄다. 한국 제조업의 쌀로 불리는 철강 산업이 심각한 위기 국면에 진입했다.`);
    } else if (twoLevelNote && twoLevelNote.includes('트랙터')) {
      headline = `대미 협상 '농산물 양보'에 농심 폭발…전국 농민 5만 명 트랙터 상경 시위`;
      deck = `광화문 광장 농민 총궐기 "통상교섭본부장 즉각 파면하라"…당정 수습 부심`;
      body.push(`미국과의 통상 담판 과정에서 사전 동의 없는 농산물 검역 완화가 알려지자, 전국농민회총연맹을 비롯한 농민 단체들이 트랙터를 몰고 서울 도심으로 집결했다. 통상 관세 방어를 위해 농업을 희생시켰다는 거센 비판이 쏟아지고 있다.`);
    } else if (proactiveThreat && proactiveThreat.partnerId === 'US') {
      headline = `美 USTR, "대미 흑자 감축 없으면 25% 보편관세 강행" 공식 최후통첩`;
      deck = `워싱턴의 초강경 통상 압박…통상교섭본부, 비상 대응책 마련 착수`;
      body.push(`미국 무역대표부(USTR)가 한국 통상 당국을 상대로 상호주의 보편관세 25% 부과 카운트다운을 통보했다. 연간 550억 달러에 달하는 대미 무역흑자를 대폭 줄이지 않을 경우 주요 수출품에 고율 관세를 즉각 집행하겠다는 압박이다.`);
    } else if (negotiationResult && negotiationResult.type === 'agreed') {
      const isLngCommitted = negotiationResult.energyQuotaMod > 0;
      if (isLngCommitted) {
        headline = `美·韓 통상협상 극적 타결…車 '25% 관세' 막고 美 에너지 100억불 수입`;
        deck = `통상교섭본부, 워싱턴서 벼랑 끝 담판…자동차 수출 지켰지만 '에너지 빅딜' 대가`;
        body.push(`워싱턴 D.C.에서 열린 한미 고위급 통상 담판이 극적인 타협점을 찾았다. 미국의 25% 보복 관세를 철회시키고 2.5% 수준의 관세율을 방어하는 대신, 미국산 LNG 연간 100억 달러 장기 구매와 현지 투자를 확약했다. 자동차 산업의 숨통은 틔웠으나 막대한 수입 약정이라는 숙제를 안게 됐다.`);
      } else {
        headline = `美·韓 통상협상 극적 타결…韓 자동차 '25% 관세 폭탄' 피했다`;
        deck = `통상교섭본부, 워싱턴 담판서 車 관세 면제 이끌어내…방산·투자 패키지 합의`;
        body.push(`워싱턴 D.C.에서 열린 한미 고위급 통상 담판이 극적인 타협점을 찾았다. 미국의 25% 보복 관세를 철회시키고 2.5% 수준의 관세율을 방어함으로써 우리 완성차 및 1·2차 부품 수출 전선의 최대 악재를 걷어냈다.`);
      }
    } else if (negotiationResult && negotiationResult.type === 'broken') {
      headline = `한·미 통상 담판 끝내 결렬…美, 韓 자동차에 '25% 관세' 즉각 발효`;
      deck = `수출 전선에 사상 최악의 먹구름…정부, WTO 제소 및 보복관세 검토`;
      body.push(`한미 양자 통상 협상이 양국의 첨예한 이견을 좁히지 못하고 파국으로 끝났다. 미국은 즉각 한국산 자동차에 25% 관세를 부과하기 시작했으며, 국내 완성차 및 부품 공장의 연쇄 셧다운 우려가 현실화되고 있다.`);
    } else if (topInd.yoyGrowth - bottomInd.yoyGrowth >= 22.0) {
      headline = `수출 ${exp}억 달러 달성에도…'반도체 착시' 속 제조업 양극화 심화`;
      deck = `${topInd.name} 나홀로 질주(+${topInd.yoyGrowth}%)…${bottomInd.name}(-${Math.abs(bottomInd.yoyGrowth)}%) 등 전통 제조 한파`;
      body.push(`월간 수출 실적은 호조세를 보였으나 산업 현장의 양극화는 위험 수위에 도달했다. ${topInd.name} 산업이 고성장세를 주도하는 반면, ${bottomInd.name}과 범용 제조업은 글로벌 수요 둔화와 관세 장벽에 가로막혀 가동률 저하에 신음하고 있다.`);
    } else if (monthlyResult.servicesExport && monthlyResult.servicesExport >= 1.2) {
      headline = `미 7함대 군수지원·K-물류 돌풍…'서비스 무역'이 수출 흑자 새 엔진`;
      deck = `거제·울산 MRO 함정정비 수주 잇따라…통관 상품수출 넘어 용역 수출 신기원`;
      body.push(`국내 조선소의 독보적 특수선 정비 기술이 미 해군 7함대 MRO(유지·보수·정비) 사업을 본격 수주하며 매달 수억 달러의 서비스 수출을 창출하고 있다. 기존 관세청 상품 통관 수출을 넘어 한국은행 국제수지 서비스 무역의 새 지평을 열었다는 평가다.`);
    } else if (monthlyResult.balance < 0) {
      headline = `유가·환율 쇼크에 수입 급증…무역수지 ${Math.abs(monthlyResult.balance).toFixed(1)}억 달러 '적자 전락'`;
      deck = `수출 ${exp}억 달러로 주춤한 사이 에너지 수입 폭증…수출사령탑 긴급 점검`;
      body.push(`국제 유가 불안과 고환율의 이중고 속에 수입액이 급증하며 월간 무역수지가 적자로 돌아섰다. 에너지 수입 의존도가 높은 한국 경제의 구조적 취약점이 다시 한번 노출됐다.`);
    } else if (monthlyResult.balance >= 6.0 && topInd.id === 'semiconductor') {
      headline = `반도체가 견인한 '수출 신기록'…무역흑자 ${bal}억 달러 '축포'`;
      deck = `AI 메모리 초호황에 반도체 수출 급증…${bottomInd.name} 등 전통 제조업은 침체 그늘`;
      body.push(`글로벌 AI 인프라 투자 열풍에 힘입어 반도체 수출이 사상 최고치를 경신하며 월간 무역흑자 ${bal}억 달러를 견인했다. 다만 특정 품목 쏠림 현상에 대한 경계의 목소리도 높다.`);
    } else {
      headline = `수출 ${exp}억 달러·흑자 ${bal}억 달러…제조업 양극화 속 통상사령탑 시험대`;
      deck = `전년비 수출 ${yoy}…대외 불확실성 속 하반기 통상 정책 방향에 이목 집중`;
      body.push(`통상교섭본부의 정책 운용 속에 월간 수출 ${exp}억 달러를 달성했으나 글로벌 통상 파고는 여전히 거세다. 전문가들은 장기적인 공급망 안정과 기술 초격차 확보를 주문하고 있다.`);
    }

    // Lead paragraph
    body.push(
      `관세청과 산업통상부는 1일 발표한 '${month}월 수출입 동향'에서 지난달 우리나라 총수출액이 ${exp}억 달러, 수입액이 ${imp}억 달러를 기록해 무역수지 ${bal}억 달러 ${monthlyResult.balance >= 0 ? '흑자' : '적자'}를 기록했다고 공식 발표했다. 연간 누적 무역흑자는 ${cumBal}억 달러로 집계됐다.`
    );

    // Industry analysis
    body.push(
      `품목별로는 희비가 뚜렷하게 엇갈렸다. ${topInd.name} 산업이 전년 동월 대비 ${topInd.yoyGrowth >= 0 ? '+' : ''}${topInd.yoyGrowth}%의 성장세를 기록하며 수출 전선의 든든한 버팀목 역할을 해냈다. 반면, ${bottomInd.name} 산업은 글로벌 수요 위축과 통상 장벽 심화로 전년 대비 ${bottomInd.yoyGrowth}% 감소하며 뚜렷한 부진을 보였다.`
    );

    // Policy & Stakeholder context
    if (politicsState.businessTrust < 45) {
      body.push(
        `한편 재계와 산업계에서는 통상 당국의 일방적인 정책 추진에 대해 우려의 목소리를 내놓고 있다. 한 주요 대기업 고위 관계자는 "글로벌 공급망 재편 속에서 정부의 실질적인 세제와 금융 지원보다는 목표 달성을 위한 압박이 앞서고 있다"며 정책 유연성을 주문했다.`
      );
    } else {
      body.push(
        `전문가들은 통상교섭본부의 기민한 외교적 대응과 현장 중심의 수출금융 지원이 단기적인 무역 방어에 기여하고 있다고 평가했다. 다만 미국의 보호무역 기조와 중국발 공급과잉 등 구조적 파고에 대비한 장기 전략이 절실하다는 지적이다.`
      );
    }

    if (doctrine) {
      body.push(
        `정부가 가동 중인 '${doctrine.name}' 기조에 발맞춰 ${doctrine.slogan}`
      );
    }

    const frontPageData = {
      dateStr,
      headline,
      deck,
      paragraphs: body,
      figures: [
        { label: "통관 상품수출", value: `$${exp}B (${yoy})` },
        { label: "BOP 서비스수출", value: `$${(monthlyResult.servicesExport || 0).toFixed(1)}B` },
        { label: "당월 수입액", value: `$${imp}B` },
        { label: "당월 무역수지", value: `${monthlyResult.balance >= 0 ? '+' : ''}$${bal}B` },
        { label: "연간 누적 흑자", value: `$${cumBal}B` },
        { label: "환율 (원/달러)", value: `${monthlyResult.macro.fxRate}원` },
        { label: "국제유가 (Brent)", value: `$${monthlyResult.macro.brentOil}/배럴` }
      ],
      topIndustry: topInd,
      bottomIndustry: bottomInd
    };

    this.pastHeadlines.push({ month, headline, deck });
    return frontPageData;
  }
}
