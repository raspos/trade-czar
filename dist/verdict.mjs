// verdict.mjs - 2028 January Final Evaluation & Causal Ending Determination Engine for 통상교섭본부장 | TRADE CZAR

export class VerdictEngine {
  evaluateFinal(monthlyResults, politicsManager, origin, gameLog = []) {
    const finalMonth = monthlyResults[monthlyResults.length - 1];
    const totalExport = finalMonth.cumulativeExport;
    const totalImport = finalMonth.cumulativeImport;
    const totalBalance = finalMonth.cumulativeBalance;
    const baseTotalExport = 1134.659;
    const baseTotalBalance = 360.560;

    const annualGrowth = Math.round(((totalExport - baseTotalExport) / baseTotalExport) * 1000) / 10;
    const stats = politicsManager.stats;

    // Career History Causal Analytics from gameLog
    let successfulNegotiations = 0;
    let failedNegotiations = 0;
    let corporateSupportCount = 0;
    let hardPushCount = 0;

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
          if (entry.policyId === 'corp_push_hard') hardPushCount += 1;
          if (entry.policyId === 'corp_capex_matching' || entry.policyId === 'corp_meeting_emergency') {
            corporateSupportCount += 1;
          }
        }
      });
    }

    // 1. DISMISSAL (전격 경질):
    // Causal failure: president trust collapse (<=28), repeated deficits, or toxic corporate push triggering mass flight
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
        totalExport, totalImport, totalBalance, annualGrowth, stats,
        cause: causeText
      });
    }

    // 2. PRESIDENTIAL CANDIDATE (차기 대선주자 등극):
    // Causal hero: Substantial surplus (>=395B) + high public approval (>=65) + high president trust (>=70) + solid business (>=55) + verified diplomatic or policy achievement
    if (totalBalance >= 395.0 && stats.publicApproval >= 65 && stats.presidentTrust >= 70 && stats.businessTrust >= 55 && stats.competitiveness >= 65) {
      return this.buildEnding("presidential_candidate", {
        title: "차기 대선주자 등극 (Presidential Hopeful)",
        badge: "국민적 영웅",
        headline: "'무역 1조 1500억불 수호' 통상교섭본부장, 차기 대선 선두주자로 급부상",
        deck: "사상 최대 무역흑자·보호무역 장벽 돌파에 국민적 신드롬…여야 모두 영입 쟁탈전",
        description: "사상 초유의 관세 전쟁과 공급망 격변 속에서 대한민국의 무역을 지켜내고 10대 첨단 산업의 경쟁력을 비약적으로 도약시켰습니다. 온 국민의 압도적 지지 속에 차기 대한민국 대통령 후보로 당당히 이름을 올립니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats,
        cause: "사상 최대 무역흑자 방어와 국민적 통상 리더십 입증"
      });
    }

    // 3. DEPUTY PRIME MINISTER (경제부총리 겸 재정경제부 장관 발탁):
    // Causal macro manager: High surplus (>=370B) + president trust (>=60) + competitiveness (>=55) + policy momentum (>=38)
    if (totalBalance >= 370.0 && stats.presidentTrust >= 60 && stats.competitiveness >= 55 && stats.policyMomentum >= 38) {
      return this.buildEnding("deputy_pm", {
        title: "경제부총리 겸 재정경제부 장관 발탁",
        badge: "경제사령탑 영전",
        headline: "통상교섭본부장, 경제부총리 파격 발탁…'무역 성과로 한국호 지휘'",
        deck: "대통령, 1년간의 탁월한 무역흑자 방어 높이 평가…재정경제부 총괄 중책 부여",
        description: "수출 전선의 승리를 대한민국 경제 전반의 거시적 도약으로 연결시킨 공로를 인정받아, 내각을 총괄하는 경제부총리 겸 재정경제부 장관으로 전격 영전했습니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats,
        cause: "탁월한 거시 무역수지 관리와 관계 부처 정책 조율 역량 인정"
      });
    }

    // 4. CORPORATE TITAN (재계 총괄 대외협력 부회장 영입):
    // Causal business partner: High business trust (>=70) + corporate partnership focus + moderate president trust (<62)
    if (stats.businessTrust >= 70 && stats.presidentTrust < 62) {
      return this.buildEnding("corporate_titan", {
        title: "재계 총괄 대외협력 부회장 영입 (Corporate Titan)",
        badge: "민간 경제 리더",
        headline: "퇴임 통상교섭본부장, 4대 그룹 총괄 부회장 영입…'글로벌 통상 사령관'",
        deck: "기업 현장 애로 해소에 앞장섰던 통상 거물, 민간 대기업의 글로벌 공급망 총괄 낙점",
        description: "재계와 긴밀히 호흡하며 기업의 수출 물류와 투자를 지원했던 통상 감각을 인정받아, 퇴임 직후 국내 굴지의 글로벌 대기업 총괄 부회장으로 파격 영입되었습니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats,
        cause: "민간 대기업의 공급망 애로 해소 및 투자 인센티브 매칭 공헌"
      });
    }

    // 5. MULTILATERAL STATESMAN (WTO 차기 사무차장 진출):
    // Causal global diplomat: High diplomatic trust (>=70) + international negotiation success + moderate president trust (<62)
    if (stats.diplomaticTrust >= 70 && stats.presidentTrust < 62) {
      return this.buildEnding("multilateral_statesman", {
        title: "WTO(세계무역기구) 사무차장 진출 (Global Statesman)",
        badge: "국제기구 고위직",
        headline: "한국 통상교섭본부장, WTO 차기 사무차장 지명…'다자무역의 수호자'",
        deck: "보호무역주의 파고 속 규범 기반 무역질서 수호 공로…제네바 국제사회 전폭 지지",
        description: "강대국들의 일방주의 속에서도 다자무역 규범과 합리적 협상을 주도했던 탁월한 외교력을 인정받아 스위스 제네바 WTO 본부의 차기 사무차장으로 공식 지명되었습니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats,
        cause: "국제 통상 분쟁의 평화적 중재 및 다자무역 규범 수호 인정"
      });
    }

    // 6. MINISTER OF INDUSTRY (산업통상부 장관 승진):
    // Causal industrial builder: Business trust (>=55) + Competitiveness (>=55) + Surplus (>=310B)
    if (stats.businessTrust >= 55 && stats.competitiveness >= 55 && totalBalance >= 310.0) {
      return this.buildEnding("minister", {
        title: "산업통상부 장관 승진",
        badge: "산업부 장관 영전",
        headline: "통상교섭본부장, 산업통상부 장관 발탁…'수출 1등 공신'",
        deck: "주력 산업 관세 방어와 수출 다변화 완수…대통령실, 정통 통상 리더십 신뢰",
        description: "미국·중국의 무역 파고를 슬기롭게 넘기고 자동차·반도체·조선 등 국가 핵심 산업의 생산능력을 수호한 성과를 인정받아 산업통상부 장관으로 정식 승진했습니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats,
        cause: "10대 주력 산업 생산능력 방어와 초격차 경쟁력 수호"
      });
    }

    // 7. HONORABLE RETIREMENT (명예로운 퇴임):
    // Standard baseline finish without catastrophic failures or extraordinary political triumphs
    return this.buildEnding("honorable_retirement", {
      title: "명예로운 퇴임 (Honorable Retirement)",
      badge: "임기 만료",
      headline: "통상교섭본부장 1년 임기 완주…'격랑의 세계 무역 속 선방한 1년'",
      deck: "연간 수출 1조 1000억 달러 수성하고 명예롭게 용퇴…학계 및 싱크탱크 복귀 전망",
      description: "사상 초유의 관세 충격과 공급망 격변 속에서도 큰 과오 없이 12개월의 통상 임기를 완주하고 명예롭게 자리에서 물러났습니다.",
      totalExport, totalImport, totalBalance, annualGrowth, stats,
      cause: "대과 없는 안정적 무역 기조 유지와 12개월 임기 완주"
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
      summary: {
        totalExportFormatted: `$${data.totalExport.toLocaleString()}B`,
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
