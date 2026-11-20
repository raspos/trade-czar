// dist/visual-stage.mjs
// Visual Stage Engine for Trade Czar (통상교섭본부장)
// Implements 60-70% visual screen ratio, 2D character portraits with 5 facial expressions,
// interactive desk props, and docked bottom dialogue boxes modeled after BOK Governor.

export const SHOWCASE_SCENES = {
  us_negotiation: {
    id: "scene_us_negotiation",
    title: "미국 무역대표부(USTR) 고위급 협상장",
    location: "워싱턴 D.C. USTR 본부 대회의실",
    flag: "🇺🇸",
    npcId: "us_trade_rep",
    npcName: "캐서린 타이",
    npcTitle: "미국 무역대표부(USTR) 대표",
    bgSvg: "./assets/scenes/scene_us_negotiation.svg",
    defaultExpr: "stern",
    dialogue: "한국산 전기차와 배터리에 대한 세액공제 유예는 미국 내 추가 투자와 알래스카 LNG 장기구매 계약이 전제되어야 합니다. 의회의 기류는 매우 강경합니다.",
    props: [
      { id: "tariff_draft", label: "📄 관세 양허안 초안", detail: "대미 자동차 25% 품목 관세 잠정 유예 조항 및 3년 내 미국 현지화 60% 달성 의무화 조항 수록." },
      { id: "lng_memo", label: "⚡ 알래스카 LNG 구매서", detail: "연간 400만 톤 규모 15년 장기 공급계약. 러스트벨트 및 공화당 상원의원 집중 로비 품목." },
      { id: "us_intel", label: "🔒 USTR 전략 전문", detail: "USTR은 한국의 반도체 보조금 및 대중국 첨단장비 규제 동참을 이번 협상의 최종 마지노선으로 설정함." }
    ],
    choices: [
      {
        id: "us_opt_1",
        label: "대미 반도체 400억 달러 투자 패키지와 연계하여 자동차 관세 완전 면제를 관철한다.",
        reactionText: "타이 대표가 서류를 넘겨보며 고개를 끄덕입니다: '삼성과 SK의 텍사스 증설 일정과 연계된다면 백악관 국가경제위원회(NEC)를 설득할 명분이 생깁니다.'",
        newExpr: "satisfied"
      },
      {
        id: "us_opt_2",
        label: "알래스카 LNG 수입 다변화 카드로 미국 의회 러스트벨트 의원들을 우회 압박한다.",
        reactionText: "타이 대표의 눈빛이 흔들립니다: '에너지 카드는 펜실베이니아와 오하이오 의원들을 움직일 수 있습니다. 다만 의회 청문회 일정을 고려해야 합니다.'",
        newExpr: "surprised"
      },
      {
        id: "us_opt_3",
        label: "세계무역기구(WTO) 불공정 보조금 제소 가능성을 시사하며 원칙적 재협상을 요구한다.",
        reactionText: "타이 대표의 표정이 순식간에 차갑게 굳어집니다: '통상교섭본부장, 워싱턴은 다자 분쟁 제소를 동맹에 대한 비우호적 조치로 간주할 것입니다.'",
        newExpr: "angry"
      }
    ]
  },
  president_office: {
    id: "scene_president_office",
    title: "대통령 집무실 (긴급 독대)",
    location: "용산 대통령실 본관 접견실",
    flag: "🇰🇷",
    npcId: "president",
    npcName: "대통령",
    npcTitle: "대한민국 국정 최고책임자",
    bgSvg: "./assets/scenes/scene_president_office.svg",
    defaultExpr: "stern",
    dialogue: "통상교섭본부장, 대미 관세와 대중 공급망 사이에서 국익의 마지노선이 흔들려선 안 되네. 정무적 부담은 내가 모두 질 테니 경제의 활로를 뚫게.",
    props: [
      { id: "pres_docket", label: "📁 대통령 결재 서류철", detail: "대미·대중 통상 비상 대응 긴급 훈령 및 외교안보특별위원회 지침 원본." },
      { id: "hotline", label: "☎️ 국정 비상 핫라인", detail: "경제부총리, 외교부 장관, 안보실장과의 4자 직통 보안 통신망." },
      { id: "poll_dossier", label: "📊 국정 지지율 보고서", detail: "통상 협상 타결 여부에 따라 수출 둔화 우려와 여론 지지율 7%p 급변 예상." }
    ],
    choices: [
      {
        id: "pres_opt_1",
        label: "대통령령 긴급 통상조정권을 발동하여 부처 간 이견을 일거에 종식시키겠습니다.",
        reactionText: "대통령이 결재판을 당기며 힘있게 서명합니다: '좋네. 재정당국과 농림부의 반발은 내가 국무회의에서 직접 정리하겠네. 결단력 있게 밀어붙이게.'",
        newExpr: "satisfied"
      },
      {
        id: "pres_opt_2",
        label: "대통령 직속 통상안보회의를 소집해 야당과 산업계 대표를 직접 설득해주십시오.",
        reactionText: "대통령이 턱을 괴며 깊은 고뇌에 잠깁니다: '국회 비준을 염두에 둔 포석이로군. 정무수석에게 지시해 여야 원내대표 긴급 오찬을 잡도록 하겠네.'",
        newExpr: "surprised"
      },
      {
        id: "pres_opt_3",
        label: "국익 우선의 전략적 모호성을 유지하며 미·중 양측의 2차 제안을 기다리겠습니다.",
        reactionText: "대통령이 단호한 어조로 목소리를 높입니다: '모호성은 전략이 아닐세! 결정을 미루는 순간 우리 기업들이 현장에서 가장 먼저 피를 흘리게 돼.'",
        newExpr: "angry"
      }
    ]
  },
  hyundai_boardroom: {
    id: "scene_hyundai_boardroom",
    title: "현대자동차그룹 글로벌 전략회의실",
    location: "서울 양재동 현대자동차 본사 21층 대회의실",
    flag: "🚗",
    npcId: "hyundai_exec",
    npcName: "정의선",
    npcTitle: "현대자동차그룹 회장",
    bgSvg: "./assets/scenes/scene_hyundai_boardroom.svg",
    defaultExpr: "neutral",
    dialogue: "미국 관세 장벽을 피하려면 조지아 메가플랜트 조기 가동이 불가피하지만, 국내 울산 공장 고용과 부품 협력사 3천 곳의 생존도 외면할 수 없습니다.",
    props: [
      { id: "georgia_blueprint", label: "🏭 조지아 메가플랜트 투자안", detail: "총 75억 달러 투자. 연산 30만 대 규모. 미국 현지생산 전환 시 수출 물량 35% 대체." },
      { id: "ulsan_accord", label: "🤝 울산 마더팩토리 노사협약", detail: "차세대 전고체 배터리 및 PBV 전용라인 국내 우선 배정 확약서." },
      { id: "supplier_dossier", label: "📋 부품 협력사 경영진단", detail: "2·3차 부품업체 840개사 현금 유동성 한계 도달 경보. 긴급 특례보증 필요." }
    ],
    choices: [
      {
        id: "hd_opt_1",
        label: "국내 핵심 부품 R&D 세액공제를 대폭 확대하여 울산 마더팩토리 생산량을 사수한다.",
        reactionText: "정의선 회장이 굳은 악수를 청합니다: '정부의 R&D 지원 확약이 있다면 국내 생산 라인을 유지하며 미래차 전환 속도를 두 배로 끌어올리겠습니다.'",
        newExpr: "satisfied"
      },
      {
        id: "hd_opt_2",
        label: "대미 협상에서 한국산 배터리·부품의 원산지 포괄 인정을 핵심 패키지로 관철한다.",
        reactionText: "정의선 회장이 안도의 한숨을 내쉽니다: '원산지 룰만 인정받아도 국내 협력사들의 대미 직수출 길이 열립니다. 협상단에 전폭 협조하겠습니다.'",
        newExpr: "surprised"
      },
      {
        id: "hd_opt_3",
        label: "해외 이전 기업에 대한 국내 고용유지 부담금 부과를 검토하겠다고 경고한다.",
        reactionText: "정의선 회장의 미간이 깊게 찌푸려집니다: '글로벌 무한경쟁 상황에서 기업의 발목을 잡는 정책은 결국 국내 생태계 전체의 공멸을 부를 뿐입니다.'",
        newExpr: "angry"
      }
    ]
  },
  domestic_council: {
    id: "scene_cabinet_meeting",
    title: "정부서울청사 국내 조정회의 (국무회의실)",
    location: "정부서울청사 19층 국무대회의실",
    flag: "🌾",
    npcId: "farmer_leader",
    npcName: "전국농민총연맹 대표",
    npcTitle: "농민단체 비상대책위원장",
    bgSvg: "./assets/scenes/scene_cabinet_meeting.svg",
    defaultExpr: "angry",
    dialogue: "공산품 수출을 늘리겠다고 농민을 또다시 희생양 삼는다면, 전국 200만 농민은 트랙터를 몰고 광화문과 세종청사로 진격할 것입니다!",
    props: [
      { id: "relief_fund", label: "💰 농어촌상생기금 특별회계", detail: "1조원 규모 특별회계 조성안. 수출 대기업 기여금과 정부 예산 5:5 매칭 펀드." },
      { id: "parliament_tally", label: "🗳️ 국회 비준동의안 의석표", detail: "재적 300석 중 찬성 132석, 반대 120석, 유보 48석. 농촌 지역구 의원 35명이 캐스팅보트." },
      { id: "fiscal_rule", label: "📉 국가채무 관리 가이드라인", detail: "기획예산처 장관: '국가채무비율 50% 돌파 시 국가신용등급 강등 경고'." }
    ],
    choices: [
      {
        id: "dom_opt_1",
        label: "수출 대기업 이익의 일부를 농업상생기금으로 환원하는 특별법 제정을 제안한다.",
        reactionText: "농민대표가 목소리를 낮추며 서류를 검토합니다: '구체적인 기금 출연 약정과 법적 구속력이 담보된다면 대화에 응할 용의가 있습니다.'",
        newExpr: "neutral"
      },
      {
        id: "dom_opt_2",
        label: "국회 비준을 담보하기 위해 농축산물 민감품목 양허 제외를 대외 협상 배수진으로 삼는다.",
        reactionText: "농민대표가 자리를 털고 일어나며 환호합니다: '본부장께서 쌀과 쇠고기 양허 제외를 문서로 보장한다면 비준 반대 투쟁을 즉각 철회하겠습니다!'",
        newExpr: "satisfied"
      },
      {
        id: "dom_opt_3",
        label: "국제무역 규범 준수를 강조하며 시장 개방의 불가피성을 직시하라고 반박한다.",
        reactionText: "농민대표가 탁자를 치며 격렬히 항의합니다: '책상물림 관료의 궤변입니다! 현장의 피눈물을 무시하는 정권에 정면으로 맞서 싸우겠습니다!'",
        newExpr: "angry"
      }
    ]
  },
  wto_dispute: {
    id: "scene_wto_dispute",
    title: "세계무역기구(WTO) 분쟁해결기구 회의장",
    location: "스위스 제네바 WTO 본부 윌리엄 라파드 센터",
    flag: "⚖️",
    npcId: "eu_trade_rep",
    npcName: "베른트 주에바",
    npcTitle: "WTO 분쟁해결기구 패널 의장 / EU 대표",
    bgSvg: "./assets/scenes/scene_wto_dispute.svg",
    defaultExpr: "stern",
    dialogue: "일방적인 국가안보 예외(GATT 제21조) 남용은 다자무역 규범에 대한 중대한 도전입니다. 제네바 패널의 긴급 잠정조치 심리를 개시합니다.",
    props: [
      { id: "ds598_dossier", label: "📑 DS598 공식 제소장", detail: "미국의 관세 부과 및 수출통제 조치가 GATT 제1조, 제3조, 제11조를 명백히 위반했다는 대한민국 정부 공식 소장." },
      { id: "injunction_req", label: "⚖️ 긴급 잠정조치 신청서", detail: "최종 판정 전까지 상대국의 차별적 관세 징수를 즉시 중단하도록 명하는 잠정 처분 신청." },
      { id: "coalition_memo", label: "🌐 14개국 다자공동성명", detail: "EU, 일본, 캐나다, 호주, 싱가포르 등 규범 기반 다자무역 수호 연대 성명서." }
    ],
    choices: [
      {
        id: "wto_opt_1",
        label: "EU·일본과 함께 GATT 제21조 안보예외 남용에 대한 다자 공동 제소단을 구성한다.",
        reactionText: "패널 의장이 고개를 끄덕이며 의사봉을 듭니다: '14개국 공동 제소는 제네바 상소기구에서도 최우선 긴급 안건으로 다루어질 것입니다.'",
        newExpr: "satisfied"
      },
      {
        id: "wto_opt_2",
        label: "WTO 패널 심리 전 양자 합의를 통한 통상 보복 유예(스탠드스틸)를 전격 제안한다.",
        reactionText: "패널 의장이 서류를 훑어봅니다: '분쟁 당사국 간의 자발적 냉각 기간 합의는 다자 체제의 파국을 막는 현명한 외교적 접근입니다.'",
        newExpr: "surprised"
      },
      {
        id: "wto_opt_3",
        label: "다자 판정을 기다리지 않고 상응하는 보복 관세를 즉각 고시하겠다고 선언한다.",
        reactionText: "패널 의장이 단호하게 경고합니다: '승인 없는 일방적 보복 관세는 다자 분쟁 체제 자체를 부정하는 위험한 선례가 될 것입니다.'",
        newExpr: "angry"
      }
    ]
  }
};

export class VisualStageManager {
  constructor(gameManager) {
    this.gm = gameManager;
    this.activeSceneKey = 'us_negotiation'; // Default showcase scene or campaign synced
    this.npcExpressions = {}; // { npcId: 'neutral' | 'angry' | 'surprised' | 'satisfied' | 'stern' }
    this.activePropId = null;
    this.dialogueHistory = [];
    this.lastReaction = null;
    this.speakerFocus = 'npc'; // 'npc' or 'player'
  }

  setScene(sceneKey) {
    if (SHOWCASE_SCENES[sceneKey]) {
      this.activeSceneKey = sceneKey;
      this.lastReaction = null;
      this.activePropId = null;
      this.speakerFocus = 'npc';
    }
  }

  getCurrentScene() {
    return SHOWCASE_SCENES[this.activeSceneKey] || SHOWCASE_SCENES.us_negotiation;
  }

  getNpcExpression(npcId, defaultExpr = 'neutral') {
    return this.npcExpressions[npcId] || defaultExpr;
  }

  setNpcExpression(npcId, expr) {
    this.npcExpressions[npcId] = expr;
  }

  renderStageElement(onStateChange) {
    const scene = this.getCurrentScene();
    const npcExpr = this.getNpcExpression(scene.npcId, scene.defaultExpr);
    const playerExpr = this.lastReaction ? 'satisfied' : 'stern';

    const stageWrap = document.createElement('div');
    stageWrap.className = 'game-stage-wrapper';

    // 1. Scene Switcher / Showcase Nav Tabs
    const tabsBar = document.createElement('div');
    tabsBar.className = 'stage-scene-tabs';
    tabsBar.innerHTML = `
      <div class="stage-tabs-label">🎬 5대 핵심 전용 장면:</div>
      <div class="stage-tabs-scroll">
        <button class="stage-nav-tab ${this.activeSceneKey === 'us_negotiation' ? 'active' : ''}" data-skey="us_negotiation">
          🇺🇸 미국 USTR 협상장
        </button>
        <button class="stage-nav-tab ${this.activeSceneKey === 'president_office' ? 'active' : ''}" data-skey="president_office">
          🇰🇷 대통령 긴급 독대
        </button>
        <button class="stage-nav-tab ${this.activeSceneKey === 'hyundai_boardroom' ? 'active' : ''}" data-skey="hyundai_boardroom">
          🚗 현대차 투자 협상
        </button>
        <button class="stage-nav-tab ${this.activeSceneKey === 'domestic_council' ? 'active' : ''}" data-skey="domestic_council">
          🌾 국내 조정회의
        </button>
        <button class="stage-nav-tab ${this.activeSceneKey === 'wto_dispute' ? 'active' : ''}" data-skey="wto_dispute">
          ⚖️ WTO 분쟁 회의
        </button>
      </div>
    `;
    stageWrap.appendChild(tabsBar);

    // 2. High-Ratio Visual Viewport (60~70% Screen Presence)
    const viewport = document.createElement('div');
    viewport.className = 'game-stage-viewport';
    viewport.style.backgroundImage = `url('${scene.bgSvg}')`;

    // Viewport Top HUD Bar
    const hudBar = document.createElement('div');
    hudBar.className = 'stage-hud-bar';
    hudBar.innerHTML = `
      <div class="stage-hud-left">
        <span class="stage-flag">${scene.flag}</span>
        <div>
          <h3 class="stage-location-title">${scene.title}</h3>
          <p class="stage-location-sub">${scene.location}</p>
        </div>
      </div>
      <div class="stage-hud-right">
        <span class="stage-status-badge">실시간 외교 교섭 대화룸</span>
      </div>
    `;
    viewport.appendChild(hudBar);

    // Characters Area (Left: Player, Right: NPC)
    const actorsArea = document.createElement('div');
    actorsArea.className = 'stage-actors-area';

    // Left Actor: Player
    const playerActor = document.createElement('div');
    playerActor.className = `stage-actor player-side ${this.speakerFocus === 'player' ? 'focused-speaker' : ''}`;
    playerActor.innerHTML = `
      <div class="actor-portrait-card">
        <img src="./assets/portraits/player_minister_${playerExpr}.svg" alt="통상교섭본부장" class="actor-img" />
        <div class="actor-nametag">
          <strong>대한민국 통상교섭본부장</strong>
          <small>Chief Trade Negotiator</small>
        </div>
      </div>
    `;
    actorsArea.appendChild(playerActor);

    // Center Stage Props (Interactive table / documents / phones)
    const centerProps = document.createElement('div');
    centerProps.className = 'stage-center-props';
    centerProps.innerHTML = `
      <div class="stage-desk-surface">
        <div class="props-container">
          ${scene.props.map(p => `
            <button class="stage-prop-btn ${this.activePropId === p.id ? 'active' : ''}" data-pid="${p.id}">
              ${p.label}
            </button>
          `).join('')}
        </div>
        ${this.activePropId ? `
          <div class="active-prop-dossier">
            <strong>${scene.props.find(p => p.id === this.activePropId)?.label}:</strong>
            <span>${scene.props.find(p => p.id === this.activePropId)?.detail}</span>
          </div>
        ` : ''}
      </div>
    `;
    actorsArea.appendChild(centerProps);

    // Right Actor: Counterpart NPC
    const npcActor = document.createElement('div');
    npcActor.className = `stage-actor npc-side ${this.speakerFocus === 'npc' ? 'focused-speaker' : ''}`;
    npcActor.innerHTML = `
      <div class="actor-portrait-card">
        <img src="./assets/portraits/${scene.npcId}_${npcExpr}.svg" alt="${scene.npcName}" class="actor-img" />
        <div class="actor-nametag">
          <strong>${scene.npcName}</strong>
          <small>${scene.npcTitle}</small>
        </div>
        <div class="actor-expression-badge ${npcExpr}">
          ${npcExpr === 'angry' ? '😡 불쾌함' : (npcExpr === 'satisfied' ? '😊 만족' : (npcExpr === 'surprised' ? '😲 놀람' : (npcExpr === 'stern' ? '🤨 강경' : '😐 평상시')))}
        </div>
      </div>
    `;
    actorsArea.appendChild(npcActor);

    viewport.appendChild(actorsArea);
    stageWrap.appendChild(viewport);

    // 3. Docked Bottom Dialogue & Action Box
    const dialogueBox = document.createElement('div');
    dialogueBox.className = 'stage-dialogue-box';

    const currentQuote = this.lastReaction ? this.lastReaction.text : scene.dialogue;
    const currentSpeaker = this.lastReaction ? (this.lastReaction.speaker || scene.npcName) : scene.npcName;
    const currentSpeakerOrg = this.lastReaction ? (this.lastReaction.title || scene.npcTitle) : scene.npcTitle;

    dialogueBox.innerHTML = `
      <div class="dialogue-header-row">
        <div class="dialogue-speaker-pill">
          <span class="speaker-flag">${scene.flag}</span>
          <strong>${currentSpeaker}</strong>
          <span class="speaker-role">· ${currentSpeakerOrg}</span>
        </div>
        ${this.lastReaction ? `
          <button class="stage-replay-btn" id="btn-stage-replay">🔄 최초 발언 보기</button>
        ` : ''}
      </div>
      <div class="dialogue-quote-text">
        "${currentQuote}"
      </div>
      <div class="stage-action-choices-grid">
        ${scene.choices.map((c, idx) => `
          <button class="stage-choice-button ${this.lastReaction && this.lastReaction.choiceId === c.id ? 'chosen' : ''}" data-cid="${c.id}">
            <div class="choice-num-pill">${idx + 1}</div>
            <div class="choice-text">${c.label}</div>
          </button>
        `).join('')}
      </div>
    `;
    stageWrap.appendChild(dialogueBox);

    // Event Handlers
    setTimeout(() => {
      // Scene switcher tabs
      stageWrap.querySelectorAll('.stage-nav-tab').forEach(tab => {
        tab.onclick = () => {
          const skey = tab.getAttribute('data-skey');
          this.setScene(skey);
          if (onStateChange) onStateChange();
        };
      });

      // Props clicks
      stageWrap.querySelectorAll('.stage-prop-btn').forEach(btn => {
        btn.onclick = () => {
          const pid = btn.getAttribute('data-pid');
          this.activePropId = (this.activePropId === pid) ? null : pid;
          if (onStateChange) onStateChange();
        };
      });

      // Choices clicks
      stageWrap.querySelectorAll('.stage-choice-button').forEach(btn => {
        btn.onclick = () => {
          const cid = btn.getAttribute('data-cid');
          const choice = scene.choices.find(c => c.id === cid);
          if (!choice) return;

          this.setNpcExpression(scene.npcId, choice.newExpr);
          this.speakerFocus = 'npc';
          this.lastReaction = {
            choiceId: cid,
            speaker: scene.npcName,
            title: scene.npcTitle,
            text: choice.reactionText
          };

          if (onStateChange) onStateChange();
        };
      });

      // Replay speech
      const btnReplay = stageWrap.querySelector('#btn-stage-replay');
      if (btnReplay) {
        btnReplay.onclick = () => {
          this.lastReaction = null;
          this.setNpcExpression(scene.npcId, scene.defaultExpr);
          if (onStateChange) onStateChange();
        };
      }
    }, 0);

    return stageWrap;
  }
}
