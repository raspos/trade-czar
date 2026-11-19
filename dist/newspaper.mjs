// newspaper.mjs - Virtual JoongAng Ilbo (중앙일보) Front Page Generator

export class NewspaperEngine {
  constructor() {
    this.issueBase = 21450;
  }

  generateFrontPage(monthlyResult, politicsState, lastAction = null, negotiationResult = null) {
    const month = monthlyResult.month;
    // Monthly statistics released in following month (e.g., Jan stats released in Feb)
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

    // Headline generation logic based on actual economic outcome & narrative
    if (negotiationResult && negotiationResult.type === 'agreed') {
      headline = `美·韓 통상협상 극적 타결…韓 자동차 '25% 관세 폭탄' 피했다`;
      deck = `통상교섭본부, 워싱턴 담판서 車 관세 면제 이끌어내…LNG 구매·투자 패키지 합의`;
    } else if (negotiationResult && negotiationResult.type === 'broken') {
      headline = `한·미 통상 담판 끝내 결렬…美, 韓 자동차에 '25% 관세' 즉각 발효`;
      deck = `수출 전선에 사상 최악의 먹구름…정부, WTO 제소 및 보복관세 검토`;
    } else if (lastAction && lastAction.id === 'corp_push_hard') {
      headline = `정부 '수출 쥐어짜기'에 실적 늘었지만…재계 "관치 경제" 집단 반발`;
      deck = `통상교섭본부장, 대기업에 비상 가동 압박…단기 물량 밀어내기 후폭풍 우려`;
    } else if (monthlyResult.balance < 0) {
      headline = `유가·환율 쇼크에 수입 급증…무역수지 ${Math.abs(monthlyResult.balance).toFixed(1)}억 달러 '적자 전락'`;
      deck = `수출 ${exp}억 달러로 주춤한 사이 에너지 수입 폭증…수출사령탑 긴급 점검`;
    } else if (monthlyResult.balance >= 6.0 && topInd.id === 'semiconductor') {
      headline = `반도체가 견인한 '수출 신기록'…무역흑자 ${bal}억 달러 '축포'`;
      deck = `AI 메모리 초호황에 반도체 수출 급증…${bottomInd.name} 등 전통 제조업은 침체 그늘`;
    } else if (topInd.yoyGrowth >= 15.0) {
      headline = `${topInd.name} 질주에 수출 ${exp}억 달러 선방…무역흑자 ${bal}억 달러`;
      deck = `글로벌 통상 파고 속 주력 품목 선전…연간 누적 흑자 ${cumBal}억 달러 달성`;
    } else {
      headline = `수출 ${exp}억 달러·흑자 ${bal}억 달러…제조업 양극화 속 통상사령탑 시험대`;
      deck = `전년비 수출 ${yoy}…대외 불확실성 속 하반기 통상 정책 방향에 이목 집중`;
    }

    // Lead paragraph
    body.push(
      `관세청과 산업통상자원부는 1일 발표한 '${month}월 수출입 동향'에서 지난달 우리나라 총수출액이 ${exp}억 달러, 수입액이 ${imp}억 달러를 기록해 무역수지 ${bal}억 달러 ${monthlyResult.balance >= 0 ? '흑자' : '적자'}를 기록했다고 공식 발표했다. 연간 누적 무역흑자는 ${cumBal}억 달러로 집계됐다.`
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

    return {
      dateStr,
      headline,
      deck,
      paragraphs: body,
      figures: [
        { label: "당월 수출액", value: `$${exp}B (${yoy})` },
        { label: "당월 수입액", value: `$${imp}B` },
        { label: "당월 무역수지", value: `${monthlyResult.balance >= 0 ? '+' : ''}$${bal}B` },
        { label: "연간 누적 흑자", value: `$${cumBal}B` },
        { label: "환율 (원/달러)", value: `${monthlyResult.macro.fxRate}원` },
        { label: "국제유가 (Brent)", value: `$${monthlyResult.macro.brentOil}/배럴` }
      ],
      topIndustry: topInd,
      bottomIndustry: bottomInd
    };
  }
}
