// verdict.mjs - 2028 January Final Evaluation & Causal Ending Determination Engine for 통상교섭본부장 | TRADE CZAR
// Enhanced for PHASE 4: Goods vs Services separation, Best/Worst Industries, Policy audit, and Structural Legacy

export class VerdictEngine {
  evaluateFinal(monthlyResults, politicsManager, origin, gameLog = [], engine = null) {
    const finalMonth = monthlyResults[monthlyResults.length - 1];
    const totalExport = finalMonth.cumulativeExport;
    const totalImport = finalMonth.cumulativeImport;
    const totalBalance = finalMonth.cumulativeBalance;
    const baseTotalExport = 1134.659;
    const baseTotalBalance = 360.560;

    // Cumulative services export calculation
    let totalServicesExport = 0;
    monthlyResults.forEach(m => {
      totalServicesExport += (m.servicesExport || 0);
    });

    const annualGrowth = Math.round(((totalExport - baseTotalExport) / baseTotalExport) * 1000) / 10;
    const stats = politicsManager.stats;

    // Analyze Industry Performance across 12 months
    const industries = monthlyResults[11]?.industries || monthlyResults[monthlyResults.length - 1]?.industries || {};
    const indArray = Object.values(industries);
    indArray.sort((a, b) => b.yoyGrowth - a.yoyGrowth);
    const bestIndustry = indArray[0] || { name: "반도체", yoyGrowth: 12.5 };
    const worstIndustry = indArray[indArray.length - 1] || { name: "석유화학", yoyGrowth: -8.4 };

    // Career History Causal Analytics from gameLog
    let successfulNegotiations = 0;
    let failedNegotiations = 0;
    let corporateSupportCount = 0;
    let hardPushCount = 0;
    const policyCounts = {};

    if (Array.isArray(gameLog)) {
      gameLog.forEach(entry => {
        if (entry.type === 'negotiation') {
          if (entry.outcome && (entry.outcome.includes('타결') || entry.outcome.includes('절충') || entry.outcome === 'agreed')) {
            successfulNegotiations += 1;
          } else if (entry.outcome && (entry.outcome.includes('결렬') || entry.outcome === 'broken')) {
            failedNegotiations += 1;
          }
        }
        if (entry.type === 'policy') {
          policyCounts[entry.policyId] = (policyCounts[entry.policyId] || 0) + 1;
          if (entry.policyId === 'corp_push_hard') hardPushCount += 1;
          if (entry.policyId === 'corp_capex_matching' || entry.policyId === 'corp_meeting_emergency') {
            corporateSupportCount += 1;
          }
        }
      });
    }

    // Determine Top & Worst Policies
    let topPolicy = { name: "대미 고위급 통상 협상 타결", desc: "미국 25% 보편관세를 선제적으로 방어하여 자동차·부품 수출 생태계 보존" };
    let worstPolicy = { name: "단기 수출 실적 압박", desc: "기업 현장의 피로도 누적과 재계 신뢰 훼손 초래" };

    if (successfulNegotiations >= 1) {
      topPolicy = { name: "워싱턴·베이징 통상 담판 타결", desc: "주요 교역국과의 정면 충돌을 피하고 안정적 통상 쿼터 확보" };
    } else if (corporateSupportCount >= 2) {
      topPolicy = { name: "첨단 생산설비 보조금 및 인프라 매칭", desc: "용인·평택 반도체 클러스터와 배터리 팹의 조기 상업가동 지원" };
    }

    if (failedNegotiations >= 1) {
      worstPolicy = { name: "양자 통상 협상 결렬", desc: "상대국의 징벌적 보복관세 발효로 주력 산업에 치명타" };
    } else if (hardPushCount >= 2) {
      worstPolicy = { name: "고강도 비상 생산 압박", desc: "무리한 납기 단축과 물량 밀어내기로 국내 설비의 해외 이전 가속화" };
    }

    // Long-Term Structural Legacy
    let structuralLegacy = "";
    if (stats.competitiveness >= 60 && totalBalance >= 380) {
      structuralLegacy = "대한민국은 반도체 초격차와 청정 MRO 선박 수주를 양 날개 삼아, 사상 최대의 무역수지 흑자와 차세대 첨단 제조업 체질 개선을 동시에 달성한 '통상 황금기'를 열었습니다.";
    } else if (stats.businessTrust >= 60) {
      structuralLegacy = "민관 원팀 통상 거버넌스를 정착시켜, 글로벌 보호무역의 파고 속에서도 국내 1·2차 협력업체 공급망과 제조업 일자리를 굳건히 지켜냈습니다.";
    } else if (stats.diplomaticTrust >= 65) {
      structuralLegacy = "다자 규범과 양자 타결의 정교한 줄타기를 통해 강대국 패권 경쟁의 틈바구니에서 국익을 극대화한 실용 통상 외교의 표준을 확립했습니다.";
    } else {
      structuralLegacy = "대외 충격 속에서 수출 전선의 급격한 붕괴는 막았으나, 특정 품목 의존도 심화와 주요국 무역장벽 대응이라는 구조적 숙제를 남겼습니다.";
    }

    // 3 Defining Decisions of the 1-year tenure
    const keyDecisions = [];
    if (successfulNegotiations >= 1) {
      keyDecisions.push({
        title: "양자 통상 담판 대타결",
        summary: "워싱턴·베이징과의 양자 협상에서 품목 관세 인상을 선제 차단하고 핵심 수출선 수호",
        impact: "자동차·반도체 주력 품목 관세 장벽 80% 완화"
      });
    } else if (failedNegotiations >= 1) {
      keyDecisions.push({
        title: "통상 협상 결렬 및 자립 대응",
        summary: "상대국과의 이견 폭발로 협상 결렬 및 징벌적 보복 관세 직면",
        impact: "주력 수출선 관세 폭탄 현실화 및 독자 공급망 모색"
      });
    } else {
      keyDecisions.push({
        title: "통상 협상 실무 조율 및 다변화",
        summary: "신흥국 및 다자 규범 중심의 우회 수출선 개척에 주력",
        impact: "글로벌 사우스 다자 협력 네트워크 유지"
      });
    }

    if (corporateSupportCount >= 2) {
      keyDecisions.push({
        title: "첨단 전략산업 생산설비 보조금 및 인프라 매칭",
        summary: "대기업·중견기업 팹 증설과 패키징 시설에 일대일 정부 보조금 매칭",
        impact: "국내 팹 생산능력(Capacity) +6% 및 장기 성장 기반 확충"
      });
    } else if (hardPushCount >= 2) {
      keyDecisions.push({
        title: "고강도 비상 생산 압박 조치",
        summary: "단기 수출 목표 달성을 위한 24시간 가동 및 관치 생산 독려",
        impact: "단기 수출 물량 확보 vs 재계 신뢰 급락 및 공장 이전 촉발"
      });
    } else {
      keyDecisions.push({
        title: "수출금융 50조 원 및 물류 바우처 집중 투입",
        summary: "수출입은행·무보 무역금융 긴급 공급 및 HMM 선복 우선 배정",
        impact: "중소·중견기업 물류·금융 애로 전면 해소"
      });
    }

    const hasAgriFund = gameLog.some(g => g.type === 'corporate_agency_response' || (g.chosenOption && g.chosenOption.includes('농축산')) || g.title?.includes('농축산') || g.title?.includes('상생기금'));
    if (hasAgriFund) {
      keyDecisions.push({
        title: "당정 협의 1조 원 농축산 피해보완 상생기금 조성",
        summary: "통상 검역 개방에 따른 피해 농가에 직불금 보전 확정으로 대미 담판 배수진 마련",
        impact: "국내 정치적 파국 방어 및 대외 협상 레버리지 확보"
      });
    } else {
      keyDecisions.push({
        title: "10대 주력 기업 및 글로벌 파트너 현장 공조",
        summary: "공급망 위기 발생 시 현장 긴급 간담회 및 민관 원팀 대응",
        impact: "수출 전선 이탈 방지 및 거시경제 펀더멘털 방어"
      });
    }

    // Common ending context
    const context = {
      totalExport,
      totalImport,
      totalBalance,
      totalServicesExport,
      annualGrowth,
      stats,
      bestIndustry,
      worstIndustry,
      topPolicy,
      worstPolicy,
      structuralLegacy,
      keyDecisions
    };

    // 1. DISMISSAL (전격 경질):
    const isSevereCrisis = totalBalance < 250.0 && stats.presidentTrust <= 38;
    const isCorporateRevolt = stats.businessTrust <= 12 && stats.publicApproval <= 25;
    if (politicsManager.isDismissed || stats.presidentTrust <= 28 || isSevereCrisis || isCorporateRevolt || failedNegotiations >= 2) {
      let causeText = "누적된 무역 부진과 대통령 신임 상실";
      if (failedNegotiations >= 2) causeText = "연이은 국제 통상 협상 결렬로 인한 보복관세 초래";
      else if (isCorporateRevolt) causeText = "무리한 관치 강압 생산으로 인한 재계 반발과 공장 해외 이전 사태";
      else if (isSevereCrisis) causeText = "오일쇼크 및 무역적자 위기 방어 실패";

      return this.buildEnding("dismissed", {
        title: "전격 경질 (Dismissal)",
        badge: "불명예 퇴진",
        headline: "통상교섭본부장 전격 경질…대통령실 '정책 혼선과 무역 실패 문책'",
        deck: `${causeText}로 임기를 채우지 못하고 전격 해임…후임 인선 착수`,
        description: `사상 초유의 글로벌 통상 격변 속에서 대통령의 신임을 잃고 ${causeText}에 대한 책임을 물어 전격 경질되었습니다. 통상 사령탑의 뼈아픈 낙마로 기록됩니다.`,
        cause: causeText,
        ...context
      });
    }

    // 2. PRESIDENTIAL CANDIDATE (차기 대선주자 등극):
    if (totalBalance >= 395.0 && stats.publicApproval >= 65 && stats.presidentTrust >= 70 && stats.businessTrust >= 55 && stats.competitiveness >= 65) {
      return this.buildEnding("presidential_candidate", {
        title: "차기 대선주자 등극 (Presidential Hopeful)",
        badge: "국민적 영웅",
        headline: "'무역 1조 1500억불 수호' 통상교섭본부장, 차기 대선 선두주자로 급부상",
        deck: "사상 최대 무역흑자·보호무역 장벽 돌파에 국민적 신드롬…여야 모두 영입 쟁탈전",
        description: "사상 초유의 관세 전쟁과 공급망 격변 속에서 대한민국의 무역을 지켜내고 10대 첨단 산업의 경쟁력을 비약적으로 도약시켰습니다. 온 국민의 압도적 지지 속에 차기 대한민국 대통령 후보로 당당히 이름을 올립니다.",
        cause: "사상 최대 무역흑자 방어와 국민적 통상 리더십 입증",
        ...context
      });
    }

    // 3. DEPUTY PRIME MINISTER (경제부총리 겸 재정경제부 장관 발탁):
    if (totalBalance >= 370.0 && stats.presidentTrust >= 60 && stats.competitiveness >= 55 && stats.policyMomentum >= 38) {
      return this.buildEnding("deputy_pm", {
        title: "경제부총리 겸 재정경제부 장관 발탁",
        badge: "경제사령탑 영전",
        headline: "통상교섭본부장, 경제부총리 파격 발탁…'무역 성과로 한국호 지휘'",
        deck: "대통령, 1년간의 탁월한 무역흑자 방어 높이 평가…재정경제부 총괄 중책 부여",
        description: "수출 전선의 승리를 대한민국 경제 전반의 거시적 도약으로 연결시킨 공로를 인정받아, 내각을 총괄하는 경제부총리 겸 재정경제부 장관으로 전격 영전했습니다.",
        cause: "탁월한 거시 무역수지 관리와 관계 부처 정책 조율 역량 인정",
        ...context
      });
    }

    // 4. CORPORATE TITAN (재계 총괄 대외협력 부회장 영입):
    if (stats.businessTrust >= 70 && stats.presidentTrust < 62) {
      return this.buildEnding("corporate_titan", {
        title: "재계 총괄 대외협력 부회장 영입 (Corporate Titan)",
        badge: "민간 경제 리더",
        headline: "퇴임 통상교섭본부장, 4대 그룹 총괄 부회장 영입…'글로벌 통상 사령관'",
        deck: "기업 현장 애로 해소에 앞장섰던 통상 거물, 민간 대기업의 글로벌 공급망 총괄 낙점",
        description: "재계와 긴밀히 호흡하며 기업의 수출 물류와 투자를 지원했던 통상 감각을 인정받아, 퇴임 직후 국내 굴지의 글로벌 대기업 총괄 부회장으로 파격 영입되었습니다.",
        cause: "민간 대기업의 공급망 애로 해소 및 투자 인센티브 매칭 공헌",
        ...context
      });
    }

    // 5. MULTILATERAL STATESMAN (WTO 차기 사무차장 진출):
    if (stats.diplomaticTrust >= 70 && stats.presidentTrust < 62) {
      return this.buildEnding("multilateral_statesman", {
        title: "WTO(세계무역기구) 사무차장 진출 (Global Statesman)",
        badge: "국제기구 고위직",
        headline: "한국 통상교섭본부장, WTO 차기 사무차장 지명…'다자무역의 수호자'",
        deck: "보호무역주의 파고 속 규범 기반 무역질서 수호 공로…제네바 국제사회 전폭 지지",
        description: "강대국들의 일방주의 속에서도 다자무역 규범과 합리적 협상을 주도했던 탁월한 외교력을 인정받아 스위스 제네바 WTO 본부의 차기 사무차장으로 공식 지명되었습니다.",
        cause: "국제 통상 분쟁의 평화적 중재 및 다자무역 규범 수호 인정",
        ...context
      });
    }

    // 6. MINISTER OF INDUSTRY (산업통상부 장관 승진):
    if (stats.businessTrust >= 55 && stats.competitiveness >= 55 && totalBalance >= 310.0) {
      return this.buildEnding("minister", {
        title: "산업통상부 장관 승진",
        badge: "산업부 장관 영전",
        headline: "통상교섭본부장, 산업통상부 장관 발탁…'수출 1등 공신'",
        deck: "주력 산업 관세 방어와 수출 다변화 완수…대통령실, 정통 통상 리더십 신뢰",
        description: "미국·중국의 무역 파고를 슬기롭게 넘기고 자동차·반도체·조선 등 국가 핵심 산업의 생산능력을 수호한 성과를 인정받아 산업통상부 장관으로 정식 승진했습니다.",
        cause: "10대 주력 산업 생산능력 방어와 초격차 경쟁력 수호",
        ...context
      });
    }

    // 7. HONORABLE RETIREMENT (명예로운 퇴임):
    return this.buildEnding("honorable_retirement", {
      title: "명예로운 퇴임 (Honorable Retirement)",
      badge: "임기 만료",
      headline: "통상교섭본부장 1년 임기 완주…'격랑의 세계 무역 속 선방한 1년'",
      deck: "연간 수출 1조 1000억 달러 수성하고 명예롭게 용퇴…학계 및 싱크탱크 복귀 전망",
      description: "사상 초유의 관세 충격과 공급망 격변 속에서도 큰 과오 없이 12개월의 통상 임기를 완주하고 명예롭게 자리에서 물러났습니다.",
      cause: "대과 없는 안정적 무역 기조 유지와 12개월 임기 완주",
      ...context
    });
  }

  buildEnding(id, data) {
    return {
      endingId: id,
      title: data.title,
      badge: data.badge,
      headline: data.headline,
      deck: data.deck,
      description: data.description,
      cause: data.cause || "",
      dateStr: "2028년 1월 1일 월요일 (제21463호)",
      bestIndustry: data.bestIndustry,
      worstIndustry: data.worstIndustry,
      topPolicy: data.topPolicy,
      worstPolicy: data.worstPolicy,
      structuralLegacy: data.structuralLegacy,
      keyDecisions: data.keyDecisions || [],
      scoreCard: [
        { label: "통관 상품수출", value: `$${data.totalExport.toLocaleString()}B` },
        { label: "BOP 서비스수출", value: `$${(data.totalServicesExport || 0).toFixed(1)}B` },
        { label: "총 수입액", value: `$${data.totalImport.toLocaleString()}B` },
        { label: "연간 무역수지", value: `${data.totalBalance >= 0 ? '+' : ''}$${data.totalBalance.toLocaleString()}B` },
        { label: "수출 증가율", value: `${data.annualGrowth >= 0 ? '+' : ''}${data.annualGrowth}%` },
        { label: "대통령 신임도", value: `${Math.round(data.stats.presidentTrust)}점` },
        { label: "기업계 신뢰", value: `${Math.round(data.stats.businessTrust)}점` },
        { label: "외교적 신뢰", value: `${Math.round(data.stats.diplomaticTrust)}점` },
        { label: "국민 지지율", value: `${Math.round(data.stats.publicApproval)}%` },
        { label: "산업 경쟁력", value: `${Math.round(data.stats.competitiveness)}pt` }
      ],
      summary: {
        totalExportFormatted: `$${data.totalExport.toLocaleString()}B`,
        totalServicesExportFormatted: `$${data.totalServicesExport.toFixed(1)}B`,
        totalImportFormatted: `$${data.totalImport.toLocaleString()}B`,
        totalBalanceFormatted: `${data.totalBalance >= 0 ? '+' : ''}$${data.totalBalance.toLocaleString()}B`,
        annualGrowthFormatted: `${data.annualGrowth >= 0 ? '+' : ''}${data.annualGrowth}%`,
        presidentTrust: Math.round(data.stats.presidentTrust),
        businessTrust: Math.round(data.stats.businessTrust),
        diplomaticTrust: Math.round(data.stats.diplomaticTrust),
        publicApproval: Math.round(data.stats.publicApproval),
        competitiveness: Math.round(data.stats.competitiveness)
      }
    };
  }
}
