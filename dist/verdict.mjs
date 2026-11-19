// verdict.mjs - 2028 January Final Evaluation & Ending Determination

export class VerdictEngine {
  evaluateFinal(monthlyResults, politicsManager, origin) {
    // 12 months cumulative
    const finalMonth = monthlyResults[monthlyResults.length - 1];
    const totalExport = finalMonth.cumulativeExport;
    const totalImport = finalMonth.cumulativeImport;
    const totalBalance = finalMonth.cumulativeBalance;
    const baseTotalExport = 709.2;
    const baseTotalBalance = 77.5;

    const annualGrowth = Math.round(((totalExport - baseTotalExport) / baseTotalExport) * 1000) / 10;
    const stats = politicsManager.stats;

    // Check early dismissal
    if (politicsManager.isDismissed) {
      return this.buildEnding("dismissed", {
        title: "전격 경질 (Dismissal)",
        badge: "불명예 퇴진",
        headline: "통상교섭본부장 전격 경질…대통령 '무역 적자·외교 실패 문책'",
        deck: "잇단 무역적자와 대미 관세 협상 결렬로 신임 상실…후임 인선 착수",
        description: "대통령의 신임이 바닥으로 추락하고 연속된 무역적자와 통상 외교 실패가 겹치며 임기를 채우지 못하고 전격 경질되었습니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats
      });
    }

    // Presidential Candidate condition:
    // Super high export, high public approval (>75), high president trust (>75)
    if (totalBalance >= 75.0 && stats.publicApproval >= 72 && stats.presidentTrust >= 70 && stats.competitiveness >= 65) {
      return this.buildEnding("presidential_candidate", {
        title: "차기 대선주자 등극 (Presidential Hopeful)",
        badge: "국민적 영웅",
        headline: "'무역 7500억불 신화' 통상교섭본부장, 차기 대선 선두주자로 급부상",
        deck: "사상 최대 무역흑자·관세 위기 돌파에 국민적 신드롬…여야 모두 영입 쟁탈전",
        description: "사상 초유의 관세 전쟁과 공급망 격변 속에서 대한민국의 무역을 지켜내고 10대 첨단 산업의 경쟁력을 비약적으로 도약시켰습니다. 온 국민의 압도적 지지 속에 차기 대한민국 대통령 후보로 당당히 이름을 올립니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats
      });
    }

    // Deputy Prime Minister (경제부총리 겸 기획재정부 장관):
    // Strong economy, balanced macroeconomic management, high policy momentum & trust
    if (totalBalance >= 65.0 && stats.presidentTrust >= 65 && stats.competitiveness >= 65 && stats.businessTrust >= 55) {
      return this.buildEnding("deputy_pm", {
        title: "경제부총리 겸 기획재정부 장관 발탁",
        badge: "경제사령탑 영전",
        headline: "통상교섭본부장, 경제부총리 파격 발탁…'무역 성과로 한국호 지휘'",
        deck: "대통령, 1년간의 탁월한 무역수지 방어 높이 평가…거시경제 총괄 중책 부여",
        description: "수출 전선의 승리를 대한민국 경제 전반의 성장으로 연결시킨 공로를 인정받아, 내각을 총괄하는 경제부총리 겸 기획재정부 장관으로 전격 영전했습니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats
      });
    }

    // Minister of Trade, Industry & Energy (산업통상자원부 장관):
    // Solid export growth & solid business trust
    if (totalBalance >= 50.0 && stats.presidentTrust >= 50 && stats.competitiveness >= 55) {
      return this.buildEnding("minister", {
        title: "산업통상자원부 장관 승진",
        badge: "산업부 장관 영전",
        headline: "통상교섭본부장, 산업통상자원부 장관 발탁…'수출 1등 공신'",
        deck: "주력 산업 관세 방어와 수출 다변화 완수…대통령실, 정통 통상 리더십 신뢰",
        description: "미국·중국의 무역 파고를 슬기롭게 넘기고 자동차·반도체·조선 등 국가 핵심 산업의 생산능력을 수호한 성과를 인정받아 산업통상자원부 장관으로 정식 승진했습니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats
      });
    }

    // Corporate Titan (재계 영입):
    // Very high business trust (>75) even if presidential trust was mediocre
    if (stats.businessTrust >= 75 && totalExport >= 680) {
      return this.buildEnding("corporate_titan", {
        title: "재계 총괄 대외협력 부회장 영입 (Corporate Titan)",
        badge: "민간 경제 리더",
        headline: "퇴임 통상교섭본부장, 4대 그룹 총괄 부회장 영입…'글로벌 통상 사령관'",
        deck: "기업 현장 애로 해소에 앞장섰던 통상 거물, 민간 대기업의 글로벌 공급망 총괄 낙점",
        description: "재계와 긴밀히 호흡하며 기업의 수출 물류와 투자를 지원했던 통상 감각을 인정받아, 퇴임 직후 국내 굴지의 글로벌 대기업 총괄 부회장으로 파격 영입되었습니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats
      });
    }

    // Multilateral Statesman (국제기구 진출):
    // High diplomatic trust (>70)
    if (stats.diplomaticTrust >= 70) {
      return this.buildEnding("multilateral_statesman", {
        title: "WTO(세계무역기구) 사무차장 진출 (Global Statesman)",
        badge: "국제기구 고위직",
        headline: "한국 통상교섭본부장, WTO 차기 사무차장 지명…'다자무역의 수호자'",
        deck: "보호무역주의 파고 속 규범 기반 무역질서 수호 공로…제네바 국제사회 전폭 지지",
        description: "강대국들의 일방주의 속에서도 다자무역 규범과 합리적 협상을 주도했던 탁월한 외교력을 인정받아 스위스 제네바 WTO 본부의 차기 사무차장으로 공식 지명되었습니다.",
        totalExport, totalImport, totalBalance, annualGrowth, stats
      });
    }

    // Default: Honorable Retirement (명예로운 퇴임)
    return this.buildEnding("honorable_retirement", {
      title: "명예로운 퇴임 (Honorable Retirement)",
      badge: "임기 만료",
      headline: "통상교섭본부장 1년 임기 완주…'격랑의 세계 무역 속 선방한 1년'",
      deck: "연간 수출 7000억불 안착시키고 명예롭게 용퇴…학계 및 싱크탱크 복귀 전망",
      description: "사상 초유의 관세 충격과 공급망 격변 속에서도 큰 과오 없이 12개월의 통상 임기를 완주하고 명예롭게 자리에서 물러났습니다.",
      totalExport, totalImport, totalBalance, annualGrowth, stats
    });
  }

  buildEnding(id, data) {
    return {
      endingId: id,
      ...data,
      dateStr: "2028년 1월 3일 월요일 (신년 특별호)",
      scoreCard: [
        { label: "연간 총수출액", value: `$${data.totalExport.toFixed(1)}B (${data.annualGrowth >= 0 ? '+' : ''}${data.annualGrowth}%)` },
        { label: "연간 총수입액", value: `$${data.totalImport.toFixed(1)}B` },
        { label: "연간 무역수지", value: `${data.totalBalance >= 0 ? '+' : ''}$${data.totalBalance.toFixed(1)}B` },
        { label: "대통령 신임도", value: `${data.stats.presidentTrust}점` },
        { label: "기업계 신뢰도", value: `${data.stats.businessTrust}점` },
        { label: "외교 신뢰도", value: `${data.stats.diplomaticTrust}점` },
        { label: "국민 지지율", value: `${data.stats.publicApproval}%` },
        { label: "산업 경쟁력", value: `${data.stats.competitiveness}점` }
      ]
    };
  }
}
