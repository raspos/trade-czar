// ui.mjs - Complete UI Presentation & Interactive State Manager for 통상교섭본부장 | TRADE CZAR

import { GameManager } from './game.mjs';
import { SCENARIOS } from './scenarios.mjs';
import { ORIGINS, INDUSTRIES, PARTNERS } from './constants.mjs';
import { POLICY_ACTIONS, getMonthlyPolicies, getPolicy, DOCTRINES } from './policies.mjs';
import { CORPORATIONS, getCorporation } from './corporations.mjs';
import { getPressConferenceQA } from './press.mjs';
import { StorageManager } from './storage.mjs';
import { MONTHLY_CHAPTERS } from './storyline.mjs';
import { TAIWAN_STRAIT_CAMPAIGN } from './campaign.mjs';

class UIManager {
  constructor() {
    this.gm = new GameManager();
    this.appEl = document.getElementById('app');
    this.pendingOrigin = 'bureaucrat';
    this.pendingScenario = 'baseline';
    this.activePolicyTab = 'corporate'; // corporate, government, negotiation
    this.corporateModalOpen = false;
    this.doctrineModalOpen = false;
    this.presidentModalOpen = false;
    this.corporateFeedback = null;
    this.tradeOffSummaryModal = null;
    this.toast = null;
    this.toastTimeout = null;
    this.selectedCorpId = 'samsung';
    this.lastCorpResponse = null;
    this.activeIntelId = null;

    this.init();
  }

  showToast(title, message, type = 'info') {
    this.toast = { title, message, type };
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toast = null;
      this.render();
    }, 4500);
    this.render();
  }

  init() {
    // Check if save exists
    if (StorageManager.hasSave()) {
      const saved = StorageManager.load();
      if (saved) {
        this.gm.deserialize(saved);
      }
    }
    this.render();
  }

  render() {
    if (!this.appEl) return;
    this.appEl.innerHTML = '';

    // Render Toast container if toast active
    if (this.toast) {
      const tWrap = document.createElement('div');
      tWrap.className = 'toast-container';
      tWrap.innerHTML = `
        <div class="toast-banner ${this.toast.type}">
          <div>
            <strong style="font-size: 13px; color: var(--navy); display: block;">${this.toast.title}</strong>
            <span style="font-size: 12px; color: #444; line-height: 1.4;">${this.toast.message}</span>
          </div>
          <button style="background: none; border: 0; cursor: pointer; font-size: 14px; color: var(--muted); padding: 0 4px;" id="btn-close-toast">✕</button>
        </div>
      `;
      this.appEl.appendChild(tWrap);
      setTimeout(() => {
        const btn = document.getElementById('btn-close-toast');
        if (btn) btn.onclick = () => {
          this.toast = null;
          this.render();
        };
      }, 0);
    }

    // Render Masthead Header ONLY on internal game screens (title screen has full-bleed hero scene like BOK Governor)
    if (this.gm.screen !== 'title') {
      const mast = this.renderMasthead();
      this.appEl.appendChild(mast);
    }

    const main = document.createElement('main');
    if (this.gm.screen !== 'title') {
      main.className = 'shell';
    }

    switch (this.gm.screen) {
      case 'title':
        main.appendChild(this.renderTitleScreen());
        break;
      case 'origin_select':
        main.appendChild(this.renderOriginSelectScreen());
        break;
      case 'scenario_select':
        main.appendChild(this.renderScenarioSelectScreen());
        break;
      case 'office':
        main.appendChild(this.renderOfficeScreen());
        break;
      case 'war_room':
        main.appendChild(this.renderWarRoomScreen());
        break;
      case 'policies':
        main.appendChild(this.renderPolicyScreen());
        break;
      case 'negotiation':
        main.appendChild(this.renderNegotiationScreen());
        break;
      case 'result_briefing':
        main.appendChild(this.renderResultBriefingScreen());
        break;
      case 'newspaper':
        main.appendChild(this.renderNewspaperScreen());
        break;
      case 'verdict':
        main.appendChild(this.renderVerdictScreen());
        break;
      default:
        main.appendChild(this.renderOfficeScreen());
    }

    this.appEl.appendChild(main);

    if (this.presidentModalOpen) {
      this.appEl.appendChild(this.renderPresidentModal());
    }

    if (this.tradeOffSummaryModal) {
      this.appEl.appendChild(this.renderNegotiationTradeOffModal(this.tradeOffSummaryModal));
    }
  }

  // Masthead bar
  renderMasthead() {
    const mast = document.createElement('header');
    mast.className = 'mast';

    const bar = document.createElement('div');
    bar.className = 'shell bar';

    const brand = document.createElement('div');
    brand.className = 'brand';
    brand.onclick = () => {
      if (confirm('타이틀 화면으로 이동하시겠습니까? 현재 진행 상황은 자동 저장됩니다.')) {
        this.gm.screen = 'title';
        this.render();
      }
    };
    brand.innerHTML = `
      <div class="seal">通</div>
      <div class="brand-text">
        <b>통상교섭본부장</b>
        <small>TRADE CZAR · 2027</small>
      </div>
    `;
    bar.appendChild(brand);

    if (this.gm.screen !== 'title' && this.gm.screen !== 'origin_select' && this.gm.screen !== 'scenario_select') {
      const headerStatus = document.createElement('div');
      headerStatus.className = 'header-status';

      const monthName = `${this.gm.currentMonth}월`;
      const pTrust = this.gm.politics ? this.gm.politics.stats.presidentTrust : 50;
      const bTrust = this.gm.politics ? this.gm.politics.stats.businessTrust : 50;
      const dTrust = this.gm.politics ? this.gm.politics.stats.diplomaticTrust : 50;
      const approval = this.gm.politics ? this.gm.politics.stats.publicApproval : 50;

      headerStatus.innerHTML = `
        <div class="status-pill">
          <span>📅</span> <strong>${monthName}</strong>
        </div>
        <div class="status-pill action-pill">
          <span>⚡ 행동력:</span> <strong>${this.gm.actionPoints} / ${this.gm.maxActionPoints || 5}</strong>
        </div>
        <div class="status-pill" title="대통령 신임도">
          <span>🏛️</span> <strong>${pTrust}</strong>
        </div>
        <div class="status-pill" title="기업계 신뢰도">
          <span>💼</span> <strong>${bTrust}</strong>
        </div>
        <div class="status-pill" title="외교 신뢰도">
          <span>🌐</span> <strong>${dTrust}</strong>
        </div>
        <div class="status-pill" title="국민 지지율">
          <span>📊</span> <strong>${approval}%</strong>
        </div>
      `;
      bar.appendChild(headerStatus);
    }

    mast.appendChild(bar);
    return mast;
  }

  // Navigation tab bar
  renderNavTabs(activeTab) {
    const nav = document.createElement('nav');
    nav.className = 'app-nav';

    const tabs = [
      { id: 'office', label: '집무실 (Office)' },
      { id: 'war_room', label: '무역상황실 (War Room)' },
      { id: 'policies', label: `정책 집행 (${this.gm.actionPoints} AP)` },
      { id: 'newspaper', label: '중앙일보 1면', disabled: !this.gm.latestNewspaper }
    ];

    tabs.forEach(t => {
      const btn = document.createElement('button');
      btn.textContent = t.label;
      if (t.id === activeTab) btn.setAttribute('aria-current', 'true');
      if (t.disabled) {
        btn.disabled = true;
        btn.style.opacity = '0.4';
      }
      btn.onclick = () => {
        this.gm.screen = t.id;
        this.render();
      };
      nav.appendChild(btn);
    });

    return nav;
  }

  // 1. Title Screen (BOK Governor Aligned Full-Bleed Hero Scene)
  renderTitleScreen() {
    const section = document.createElement('section');
    section.className = 'title-scene';
    const hasSave = StorageManager.hasSave();

    section.innerHTML = `
      <div class="title-copy">
        <p class="eyebrow">2027 · 통상 전략 시뮬레이션</p>
        <h1 class="title-wordmark">
          <span class="title-korean" aria-label="통상교섭본부장">
            <span>통상</span> <span>교섭</span> <span>본부장</span>
          </span>
          <small lang="en">TRADE CZAR · Minister for Trade</small>
        </h1>
        <p>12번의 무역 성적표,<br>대한민국 산업의 운명이 결정된다.</p>
        <div class="title-actions">
          <button class="primary" id="btn-new-game" data-action="new-term">새 게임</button>
          ${hasSave ? '<button class="secondary" id="btn-continue" data-action="resume-term">이어하기</button>' : ''}
          <button class="secondary" id="btn-guide" data-view="model">게임 방법</button>
          <button class="secondary" id="btn-settings" data-action="settings">설정</button>
        </div>
        <footer class="title-footer">
          <p>© <a href="https://raspos.github.io/databrew/" target="_blank" rel="noopener noreferrer">databrew</a>. All rights reserved.</p>
        </footer>
      </div>
    `;

    // Attach event listeners
    setTimeout(() => {
      const btnNew = document.getElementById('btn-new-game');
      if (btnNew) btnNew.onclick = () => {
        this.gm.screen = 'origin_select';
        this.render();
      };
      const btnCont = document.getElementById('btn-continue');
      if (btnCont) btnCont.onclick = () => {
        const saved = StorageManager.load();
        if (saved) {
          this.gm.deserialize(saved);
          this.render();
        }
      };
      const btnGuide = document.getElementById('btn-guide');
      if (btnGuide) btnGuide.onclick = () => {
        this.showHowToPlayModal();
      };
      const btnSettings = document.getElementById('btn-settings');
      if (btnSettings) btnSettings.onclick = () => {
        this.showSettingsModal();
      };
    }, 0);

    return section;
  }

  showHowToPlayModal() {
    const dialog = document.createElement('dialog');
    dialog.className = 'game-dialog game-document play-guide';
    dialog.style.maxWidth = '680px';
    dialog.style.maxHeight = '90vh';
    dialog.style.overflowY = 'auto';

    dialog.innerHTML = `
      <div style="display: flex; justify-content: flex-end; margin-bottom: 8px;">
        <button class="secondary" id="btn-close-guide" style="padding: 4px 10px;">닫기 ✕</button>
      </div>
      <section class="panel play-guide" style="background: none; border: 0; padding: 0;">
        <h1 style="font-family: var(--font-display); font-size: 24px; color: var(--navy); margin-bottom: 14px;">게임 방법</h1>
        <ol style="font-size: 14px; line-height: 1.7; padding-left: 20px; color: #333; margin-bottom: 20px;">
          <li><b>출신과 시나리오 선택:</b> 관료·기업가·정치인 중 출신을 정하고, 2027년 대한민국이 마주할 통상 위기 시나리오를 선택합니다.</li>
          <li><b>월간 3회 정책 결재 (3 AP):</b> 매월 주어지는 3회의 행동력으로 기업 현장 지원, 무역금융 확대, 규제 혁신 등을 결재합니다. 정책은 1~3개월의 시차를 두고 파급됩니다.</li>
          <li><b>고위급 양자 통상 담판 (2-Level Games):</b> 미국의 25% 보편·자동차 관세 폭탄과 중국의 공급망 디커플링에 맞서 워싱턴·베이징과의 양자 협상 테이블에서 국익을 방어합니다.</li>
          <li><b>무역 성적표와 중앙일보 1면:</b> 매월 말 경제 시뮬레이션이 실행되어 관세청 수출입 확정치와 가상 중앙일보 1면 조간이 발행됩니다.</li>
          <li><b>12개월 완주와 2028년 최종 평가:</b> 12차례 무역 성적표를 거친 후 정부서울청사와 용산 대통령실의 최종 평가를 받아 7대 다중 엔딩에 도달합니다.</li>
        </ol>
        <p style="font-size: 13px; color: var(--muted); margin-bottom: 20px;">* 집무실의 무역상황 모니터에서 10대 산업과 7대 교역국의 수치를 상시 점검할 수 있습니다.</p>
      </section>

      <section class="panel" style="background: var(--paper-card); border-left: 4px solid var(--navy); margin-top: 16px;">
        <div class="eyebrow" style="color: var(--navy); font-weight: 800;">데이터와 모형</div>
        <h2 style="font-size: 18px; margin: 4px 0 10px; color: var(--navy);">시뮬레이션 가정</h2>
        <p style="font-size: 13px; line-height: 1.6; color: #444;">
          대한민국 관세청과 산업통상자원부의 2026년 공식 확정 통계(1~10월 확정 수출 $931.036B, 수입 $635.214B)와 10대 산업×7대 교역국 교차 원장 매트릭스를 기반으로 구축되었습니다.
        </p>
        <p style="font-size: 13px; line-height: 1.6; color: #444;">
          통관 기준 상품수출과 BOP 서비스수출(MRO·물류·기술)은 엄격히 분리 계산되며, 환율·유가·해상운임·글로벌 수요·품목 관세 및 국내 팹 가동률 상한(Capacity Cap)이 유기적으로 연동됩니다.
        </p>
      </section>
    `;

    dialog.addEventListener('close', () => dialog.remove(), { once: true });
    this.appEl.appendChild(dialog);
    dialog.showModal();

    setTimeout(() => {
      const btnClose = dialog.querySelector('#btn-close-guide');
      if (btnClose) btnClose.onclick = () => dialog.close();
    }, 0);
  }

  showSettingsModal() {
    const dialog = document.createElement('dialog');
    dialog.className = 'game-dialog pause-menu';
    dialog.style.maxWidth = '420px';

    const isReduced = document.documentElement.classList.contains('reduce-motion');

    dialog.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--line); padding-bottom: 8px;">
        <h2 style="font-size: 18px; color: var(--navy); margin: 0;">설정</h2>
        <button class="secondary" id="btn-close-settings" style="padding: 2px 8px; font-size: 12px;">✕</button>
      </div>
      <div style="display: flex; flex-direction: column; gap: 14px; font-size: 14px;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" id="chk-reduce-motion" ${isReduced ? 'checked' : ''}>
          화면 전환 효과 줄이기 (Reduce Motion)
        </label>
        <div style="border-top: 1px solid var(--line); padding-top: 12px;">
          <p style="font-size: 12px; color: var(--muted); margin-bottom: 8px;">저장된 세이브 데이터 관리:</p>
          <button class="danger" id="btn-clear-save" style="width: 100%; padding: 8px; font-size: 13px;">
            진행 중인 세이브 데이터 초기화
          </button>
        </div>
      </div>
    `;

    dialog.addEventListener('close', () => dialog.remove(), { once: true });
    this.appEl.appendChild(dialog);
    dialog.showModal();

    setTimeout(() => {
      const btnClose = dialog.querySelector('#btn-close-settings');
      if (btnClose) btnClose.onclick = () => dialog.close();

      const chkMotion = dialog.querySelector('#chk-reduce-motion');
      if (chkMotion) chkMotion.onchange = (e) => {
        document.documentElement.classList.toggle('reduce-motion', e.target.checked);
      };

      const btnClear = dialog.querySelector('#btn-clear-save');
      if (btnClear) btnClear.onclick = () => {
        if (confirm('정말로 저장된 진행 데이터를 모두 삭제하시겠습니까?')) {
          StorageManager.clear();
          dialog.close();
          this.showToast('세이브 데이터 초기화', '저장된 게임 데이터가 삭제되었습니다.', 'warning');
          this.render();
        }
      };
    }, 0);
  }

  // 2. Origin Select Screen
  renderOriginSelectScreen() {
    const wrap = document.createElement('div');
    wrap.style.padding = '20px 0';

    wrap.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="eyebrow" style="color: var(--gold); font-weight: 800;">STEP 1 / 2</span>
        <h2 style="font-family: var(--font-display); font-size: 28px; margin-top: 6px;">통상교섭본부장 출신 선택</h2>
        <p style="color: var(--muted); font-size: 14px;">플레이어의 출신 배경에 따라 협상력, 기업계 신뢰, 대통령과의 관계가 달라집니다.</p>
      </div>
      <div class="portrait-triptych">
        ${Object.values(ORIGINS).map(orig => `
          <div class="origin-card origin-${orig.id} ${this.pendingOrigin === orig.id ? 'selected' : ''}" data-origin="${orig.id}">
            <div class="origin-portrait-img"></div>
            <h3 style="font-family: var(--font-serif); font-size: 18px; margin-bottom: 4px;">${orig.title}</h3>
            <span style="font-size: 11px; color: var(--gold); font-weight: 700;">${orig.englishTitle}</span>
            <p style="font-size: 13px; margin: 10px 0; color: #444;">${orig.description}</p>
            <div style="border-top: 1px solid var(--line); padding-top: 8px; font-size: 12px;">
              <div style="color: var(--green); margin-bottom: 4px;"><b>강점:</b> ${orig.pros}</div>
              <div style="color: var(--red);"><b>약점:</b> ${orig.cons}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="text-align: center; margin-top: 24px; display: flex; justify-content: center; gap: 12px;">
        <button class="secondary" id="btn-back-title">이전</button>
        <button class="primary" id="btn-next-scenario" style="padding: 12px 30px;">시나리오 선택으로</button>
      </div>
    `;

    setTimeout(() => {
      wrap.querySelectorAll('.origin-card').forEach(card => {
        card.onclick = () => {
          this.pendingOrigin = card.getAttribute('data-origin');
          this.render();
        };
      });
      const btnBack = document.getElementById('btn-back-title');
      if (btnBack) btnBack.onclick = () => {
        this.gm.screen = 'title';
        this.render();
      };
      const btnNext = document.getElementById('btn-next-scenario');
      if (btnNext) btnNext.onclick = () => {
        this.gm.screen = 'scenario_select';
        this.render();
      };
    }, 0);

    return wrap;
  }

  // 3. Scenario Select Screen
  renderScenarioSelectScreen() {
    const wrap = document.createElement('div');
    wrap.style.padding = '20px 0';

    wrap.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="eyebrow" style="color: var(--gold); font-weight: 800;">STEP 2 / 2</span>
        <h2 style="font-family: var(--font-display); font-size: 28px; margin-top: 6px;">시작 시나리오 선택</h2>
        <p style="color: var(--muted); font-size: 14px;">2027년 대한민국이 마주할 거시경제 위기와 통상 과제를 선택하십시오.</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
        ${SCENARIOS.map(sc => `
          <div class="office-card ${this.pendingScenario === sc.id ? 'selected' : ''}" style="cursor: pointer; border-width: ${this.pendingScenario === sc.id ? '2px' : '1px'}; border-color: ${this.pendingScenario === sc.id ? 'var(--gold-bright)' : 'var(--line)'};" data-scenario="${sc.id}">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
              <span class="status-pill" style="font-size: 11px;">${sc.badge}</span>
              <small style="color: var(--muted); font-weight: 700;">난이도: ${sc.difficulty}</small>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 18px; margin-bottom: 6px;">${sc.title}</h3>
            <p style="font-size: 13px; color: #555; margin-bottom: 12px;">${sc.description}</p>
            <div style="font-size: 12px; background: rgba(177, 145, 88, 0.1); padding: 8px 10px; border-radius: 4px; border-left: 3px solid var(--gold);">
              <b>핵심 과제:</b> ${sc.objective}
            </div>
          </div>
        `).join('')}
      </div>
      <div style="background: var(--white); border: 1px solid var(--line); border-radius: 6px; padding: 16px; margin: 20px 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <label style="font-size: 13px; font-weight: 700; color: var(--navy); display: flex; align-items: center; gap: 8px;">
          🎲 난수 시드 (동일 시드로 동일 결과 재현):
          <input type="number" id="input-custom-seed" value="${this.gm.seed}" style="padding: 6px 10px; border: 1px solid var(--line); border-radius: 4px; font-family: monospace;">
        </label>
        <span style="font-size: 12px; color: var(--muted);">시드를 비워두면 무작위 시드로 자동 생성됩니다.</span>
      </div>
      <div style="text-align: center; margin-top: 24px; display: flex; justify-content: center; gap: 12px;">
        <button class="secondary" id="btn-back-origin">이전</button>
        <button class="primary" id="btn-start-game" style="padding: 12px 36px; font-size: 16px;">취임 및 집무실 입장</button>
      </div>
    `;

    setTimeout(() => {
      wrap.querySelectorAll('[data-scenario]').forEach(card => {
        card.onclick = () => {
          this.pendingScenario = card.getAttribute('data-scenario');
          this.render();
        };
      });
      const btnBack = document.getElementById('btn-back-origin');
      if (btnBack) btnBack.onclick = () => {
        this.gm.screen = 'origin_select';
        this.render();
      };
      const btnStart = document.getElementById('btn-start-game');
      if (btnStart) btnStart.onclick = () => {
        const seedInput = document.getElementById('input-custom-seed');
        const customSeed = seedInput && seedInput.value.trim() ? Number(seedInput.value) : null;
        this.gm.newGame(this.pendingScenario, this.pendingOrigin, customSeed);
        this.render();
      };
    }, 0);

    return wrap;
  }

  // 4. Minister's Executive Office Screen
  renderOfficeScreen() {
    const wrap = document.createElement('div');
    wrap.appendChild(this.renderNavTabs('office'));

    // Scene header
    const maxAP = this.gm.maxActionPoints || 5;
    const scene = document.createElement('div');
    scene.className = 'scene-container';
    scene.style.backgroundImage = "url('./assets/office-trade.jpg')";
    scene.innerHTML = `
      <div class="scene-overlay">
        <div>
          <h2>통상교섭본부장 집무실</h2>
          <p>정부서울청사 별관 · 2027년 ${this.gm.currentMonth}월 정책 턴 (행동력: ${this.gm.actionPoints} / ${maxAP} AP 잔여)</p>
        </div>
      </div>
    `;
    wrap.appendChild(scene);

    // 3-Step Work Flow Tracker (게임 진행 순서 직관적 안내)
    const flowTracker = document.createElement('div');
    flowTracker.className = 'office-flow-tracker';
    flowTracker.innerHTML = `
      <div class="flow-step done">
        <div class="step-num">1</div>
        <div>
          <div class="step-title">1단계: 현안 브리핑</div>
          <div class="step-desc">외교·통상 긴급 경보 파악</div>
        </div>
      </div>
      <div class="flow-step active">
        <div class="step-num">2</div>
        <div>
          <div class="step-title">2단계: 본부장 결재 (5 AP)</div>
          <div class="step-desc">협상·정책·기업 지원 결재</div>
        </div>
      </div>
      <div class="flow-step ${this.gm.actionPoints === 0 ? 'active' : ''}">
        <div class="step-num">3</div>
        <div>
          <div class="step-title">3단계: 실적 확정</div>
          <div class="step-desc">무역 성적표 및 1면 보도</div>
        </div>
      </div>
    `;
    wrap.appendChild(flowTracker);

    // Interactive Onboarding Guide (Month 1 1-minute executive primer)
    if (this.gm.currentMonth === 1 && !this.gm.firstTurnBriefingDismissed) {
      wrap.appendChild(this.renderFirstTurnBriefing());
    }

    // Visual AP Battery Dashboard (5 AP 게이지)
    const apBanner = document.createElement('div');
    apBanner.className = 'ap-dashboard-banner';
    const slotsHtml = Array.from({ length: maxAP }, (_, i) => {
      const active = i < this.gm.actionPoints;
      return `
        <div class="ap-slot-box ${active ? 'active' : 'spent'}">
          <span>⚡</span>
          <span>${active ? 'AP' : '사용'}</span>
        </div>
      `;
    }).join('');

    apBanner.innerHTML = `
      <div class="ap-banner-left">
        <div class="ap-badge-icon">⚡</div>
        <div class="ap-banner-text">
          <h3>본부장 가용 행동력: <span style="color: #fde047;">${this.gm.actionPoints}</span> / ${maxAP} AP</h3>
          <p>협상 담판(1 AP), 정책 결재(각 1 AP), 기업 지원(1 AP) 등에 자유롭게 배분하십시오.</p>
        </div>
      </div>
      <div class="ap-slots-row">
        ${slotsHtml}
      </div>
    `;
    wrap.appendChild(apBanner);

    // =========================================================================
    // GEOPOLITICAL CAMPAIGN SITUATION ROOM (Months 1-3 Taiwan Strait Pilot)
    // =========================================================================
    const stageData = (this.gm.campaign && this.gm.currentMonth <= 3) ? this.gm.campaign.getCurrentStageData() : null;

    if (stageData) {
      const campRoom = document.createElement('div');
      campRoom.className = 'campaign-situation-room';

      const currentDecision = this.gm.campaign.decisionsHistory.find(d => d.month === this.gm.currentMonth);
      const currentStmt = this.gm.campaign.diplomaticMemory.find(s => s.month === this.gm.currentMonth);

      // STEP 1 SECTION: 이달의 긴급 통상 현안 브리핑
      const step1Header = document.createElement('div');
      step1Header.className = 'step-section-header';
      step1Header.innerHTML = `
        <span class="step-badge">STEP 1</span>
        <h3 class="step-section-title">이달의 긴급 통상 정세 및 비밀 정보 브리핑</h3>
        <span class="step-section-hint">외교·통상 전선의 돌발 위기를 파악하십시오</span>
      `;
      campRoom.appendChild(step1Header);

      // 1. Situation Briefing Banner
      const narrativeBox = document.createElement('div');
      narrativeBox.className = 'panel';
      narrativeBox.style.borderLeft = '6px solid var(--navy)';
      narrativeBox.style.background = 'linear-gradient(180deg, #fdfbf7 0%, #f4ede2 100%)';
      narrativeBox.style.padding = '22px 24px';
      narrativeBox.style.marginBottom = '16px';
      narrativeBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <span class="campaign-act-badge">${stageData.act} · 2027년 ${stageData.month}월 실록</span>
          <span style="font-size: 12px; color: var(--muted); font-weight: 700;">대만해협 위기 시범 전역</span>
        </div>
        <h2 style="font-size: 22px; color: var(--navy); margin: 6px 0 3px; font-family: var(--font-serif); font-weight: 900;">
          ${stageData.title}
        </h2>
        <div style="font-size: 13.5px; color: #78350f; font-weight: 700; margin-bottom: 12px;">
          ${stageData.subtitle}
        </div>
        <p style="font-size: 14px; color: #334155; line-height: 1.65; margin: 0; word-break: keep-all;">
          ${stageData.crisisSummary || stageData.climaxNarrative}
        </p>
      `;
      campRoom.appendChild(narrativeBox);

      // 2. Classified Intelligence Desk (기밀 첩보 서류철)
      if (stageData.intelReports && stageData.intelReports.length > 0) {
        if (!this.activeIntelId || !stageData.intelReports.some(i => i.id === this.activeIntelId)) {
          this.activeIntelId = stageData.intelReports[0].id;
        }
        const activeIntel = stageData.intelReports.find(i => i.id === this.activeIntelId) || stageData.intelReports[0];

        const intelBox = document.createElement('div');
        intelBox.className = 'intel-desk-container';
        intelBox.innerHTML = `
          <div class="intel-header-row">
            <div>
              <span style="background: #e0e7ff; color: #3730a3; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase;">
                📁 1급 비밀 대외 정보 서류철
              </span>
              <span style="font-size: 12px; color: #64748b; margin-left: 8px;">(클릭하여 각 기관별 비밀 보고서 열람)</span>
            </div>
            <small style="color: #64748b; font-weight: 600;">통상교섭본부 비밀취급인가 전용</small>
          </div>
          <div class="intel-tabs-row">
            ${stageData.intelReports.map(ir => `
              <button class="btn-intel-tab ${ir.id === activeIntel.id ? 'active' : ''}" data-iid="${ir.id}">
                ${ir.source.split(' ')[0]} 전문
              </button>
            `).join('')}
          </div>
          <div class="intel-content-box">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
              <strong style="color: #1e293b; font-size: 13.5px;">${activeIntel.title}</strong>
              <small style="color: #64748b;">출처: ${activeIntel.source}</small>
            </div>
            <p style="font-size: 13px; color: #334155; line-height: 1.6; margin: 0;">
              ${activeIntel.content}
            </p>
          </div>
        `;
        campRoom.appendChild(intelBox);
      }

      // 3. Conflicting Stakeholder Demands (상충하는 이해관계자 압박)
      if (stageData.stakeholders && stageData.stakeholders.length > 0) {
        const stkSec = document.createElement('div');
        stkSec.style.margin = '16px 0';
        stkSec.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <h4 style="font-size: 15px; color: var(--navy); margin: 0; font-family: var(--font-serif); font-weight: 800;">
              ⚡ 주요 당사국 및 산업계 대표 발언 (상충하는 이해관계)
            </h4>
            <small style="color: var(--muted);">배후 의도와 요구를 면밀히 분석하십시오</small>
          </div>
          <div class="stakeholder-dossier-grid">
            ${stageData.stakeholders.map(stk => `
              <div class="stakeholder-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="font-size: 14px; color: var(--navy);">${stk.flag} ${stk.name}</strong>
                  <span class="status-pill" style="font-size: 10.5px;">${stk.org}</span>
                </div>
                <div style="font-size: 11.5px; color: #991b1b; font-weight: 700; margin-bottom: 6px;">
                  핵심 기조: ${stk.stance}
                </div>
                <div class="stakeholder-quote-box">
                  "${stk.quote}"
                </div>
              </div>
            `).join('')}
          </div>
        `;
        campRoom.appendChild(stkSec);
      }

      // 4. Strategic Course Directives (통상교섭본부장의 전략 노선 결단)
      const choicesToRender = stageData.strategicChoices || stageData.finalChoices || [];
      const decSec = document.createElement('div');
      decSec.style.margin = '20px 0';

      if (currentDecision) {
        decSec.innerHTML = `
          <div class="panel" style="border: 2px solid var(--green); background: #f0fdf4; padding: 18px 20px; box-shadow: 0 4px 12px rgba(22, 101, 52, 0.08);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span class="status-pill" style="background: var(--green); color: #fff; font-weight: 800;">
                ✅ ${this.gm.currentMonth}월 본부장 전략 노선 결단 확정
              </span>
              <small style="color: #166534; font-weight: 700;">내부 경제 엔진에 정책 집행 반영됨</small>
            </div>
            <h3 style="font-size: 17px; color: #14532d; margin: 4px 0 6px; font-family: var(--font-serif); font-weight: 800;">
              ${currentDecision.label}
            </h3>
            <p style="font-size: 13.5px; color: #166534; margin: 0; line-height: 1.5;">
              ${currentDecision.description}
            </p>
          </div>
        `;
      } else {
        decSec.innerHTML = `
          <div class="step-section-header" style="margin-bottom: 12px;">
            <span class="step-badge">STEP 2</span>
            <h3 class="step-section-title">통상교섭본부장의 전략 노선 결단 (단일 선택)</h3>
            <span class="step-section-hint">선택의 경제적·외교적 결과는 다음 달 사건과 무역통계로 드러납니다</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${choicesToRender.map((c, idx) => `
              <div class="campaign-decision-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
                  <strong style="font-size: 15px; color: var(--navy); font-family: var(--font-serif); font-weight: 800;">
                    ${c.label}
                  </strong>
                </div>
                <p style="font-size: 13px; color: #334155; line-height: 1.55; margin: 0 0 8px;">
                  ${c.description}
                </p>
                <div class="decision-rationale-tag">
                  ⚖️ 전략적 고려: ${c.rationale || c.summary}
                </div>
                <button class="primary btn-campaign-choice" data-cid="${c.id}" style="width: 100%; margin-top: 12px; padding: 10px 16px; font-size: 13.5px; font-weight: 800;">
                  이 노선으로 공식 결단 하달 ➔
                </button>
              </div>
            `).join('')}
          </div>
        `;
      }
      campRoom.appendChild(decSec);

      // 5. Diplomatic Statement Podium (외신기자회견 공식 외교 발언대)
      if (stageData.pressQuestion && stageData.pressStatements) {
        const stmtSec = document.createElement('div');
        stmtSec.style.margin = '20px 0';

        if (currentStmt) {
          stmtSec.innerHTML = `
            <div class="panel" style="border: 2px solid #2563eb; background: #eff6ff; padding: 16px 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span class="status-pill" style="background: #2563eb; color: #fff; font-weight: 800;">
                  🎙️ 외신기자회견 공식 외교 발언 완료 (영구 기록)
                </span>
                <small style="color: #1e40af; font-weight: 700;">외교적 기억(Diplomatic Memory) 등재</small>
              </div>
              <p style="font-size: 14px; font-weight: 700; color: #1e3a8a; margin: 4px 0 0; line-height: 1.5;">
                "${currentStmt.text}"
              </p>
            </div>
          `;
        } else {
          stmtSec.innerHTML = `
            <div class="panel" style="border: 1.5px solid #93c5fd; background: #f0f7ff; padding: 18px 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="background: #1d4ed8; color: #fff; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px;">
                  🎙️ 외신기자회견 대외 공식 성명대
                </span>
                <small style="color: #1e40af; font-weight: 600;">말 한마디가 조간 1면과 상대국 대응을 바꿉니다</small>
              </div>
              <h4 style="font-size: 14px; color: #1e3a8a; margin: 0 0 10px; font-family: var(--font-serif); font-weight: 800;">
                "${stageData.pressQuestion}"
              </h4>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${stageData.pressStatements.map(s => `
                  <div class="press-statement-option">
                    <div style="font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 4px;">
                      ${s.text}
                    </div>
                    <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
                      파급 예상: ${s.note || ''}
                    </div>
                    <button class="secondary btn-campaign-stmt" data-sid="${s.id}" style="padding: 6px 14px; font-size: 12px; font-weight: 700;">
                      이 발언을 공식 성명으로 발표 ➔
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }
        campRoom.appendChild(stmtSec);
      }

      wrap.appendChild(campRoom);
    } else {
      // General Office View for Month 4+
      // STEP 1 SECTION: 이달의 긴급 통상 현안 브리핑
      const step1Header = document.createElement('div');
      step1Header.className = 'step-section-header';
      step1Header.innerHTML = `
        <span class="step-badge">STEP 1</span>
        <h3 class="step-section-title">이달의 긴급 통상 현안 브리핑</h3>
        <span class="step-section-hint">먼저 주요 대외 동향을 확인하십시오</span>
      `;
      wrap.appendChild(step1Header);

      const chapter = MONTHLY_CHAPTERS[this.gm.currentMonth] || MONTHLY_CHAPTERS[1];
      const chapterCrisisDecision = this.gm.chapterCrisisDecisions?.[this.gm.currentMonth];

      const storyChapterBox = document.createElement('div');
      storyChapterBox.className = 'panel story-chapter-panel';
      storyChapterBox.style.borderLeft = '6px solid var(--navy)';
      storyChapterBox.style.background = 'linear-gradient(180deg, #fdfbf7 0%, #f7f1e6 100%)';
      storyChapterBox.style.padding = '20px 22px';
      storyChapterBox.style.marginBottom = '14px';
      storyChapterBox.style.boxShadow = '0 3px 12px rgba(16, 28, 43, 0.08)';

      let crisisHtml = '';
      if (chapter.urgentCrisis) {
        if (chapterCrisisDecision) {
          crisisHtml = `
            <div style="background: rgba(34, 197, 94, 0.1); border: 1.5px solid #16a34a; border-radius: 6px; padding: 12px 16px; margin-top: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; flex-wrap: wrap; gap: 6px;">
                <span style="font-size: 11px; font-weight: 800; color: #166534; text-transform: uppercase;">✅ 통상 결단 완료 · ${chapter.urgentCrisis.title}</span>
                <span style="font-size: 11px; color: #15803d; font-weight: 700;">${chapterCrisisDecision.summary || ''}</span>
              </div>
              <div style="font-size: 13.5px; font-weight: 700; color: #14532d;">
                "${chapterCrisisDecision.chosenText}"
              </div>
            </div>
          `;
        } else {
          crisisHtml = `
            <div style="background: #ffffff; border: 2px solid #b91c1c; border-radius: 8px; padding: 16px 18px; margin-top: 14px; box-shadow: 0 4px 14px rgba(185, 28, 28, 0.12);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                <span style="background: #b91c1c; color: #fff; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 4px;">
                  🚨 이달의 긴급 통상 결단 (고위급 딜레마)
                </span>
                <span style="font-size: 12px; color: #7f1d1d; font-weight: 700;">행동력(AP) 미소모</span>
              </div>
              <h4 style="font-size: 15px; color: #991b1b; margin: 0 0 6px; font-family: var(--font-serif); font-weight: 800;">
                ${chapter.urgentCrisis.title}
              </h4>
              <p style="font-size: 13px; color: #374151; margin: 0 0 12px; line-height: 1.5;">
                ${chapter.urgentCrisis.desc}
              </p>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${chapter.urgentCrisis.choices.map((c, idx) => `
                  <button class="secondary btn-chapter-crisis-choice" data-choice="${idx}" style="text-align: left; padding: 10px 14px; border: 1.5px solid #e5e7eb; border-radius: 6px; background: #fafaf9; cursor: pointer; transition: all 0.2s ease;">
                    <div style="font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 3px;">
                      선택 ${idx + 1}. ${c.text}
                    </div>
                    <div style="font-size: 11px; color: #b45309; font-weight: 600;">
                      📊 영향: ${c.summary}
                    </div>
                  </button>
                `).join('')}
              </div>
            </div>
          `;
        }
      }

      storyChapterBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <span style="background: var(--navy); color: var(--gold); font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 12px; letter-spacing: 0.5px;">
            ${chapter.act} · 2027년 ${this.gm.currentMonth}월 통상 실록
          </span>
          <span style="font-size: 12px; color: var(--muted); font-weight: 600;">
            총 12막 중 ${this.gm.currentMonth}막
          </span>
        </div>
        <h2 style="font-size: 21px; color: var(--navy); margin: 6px 0 2px; font-family: var(--font-serif); font-weight: 900; letter-spacing: -0.3px;">
          ${chapter.title}
        </h2>
        <div style="font-size: 13px; color: #78350f; font-weight: 700; margin-bottom: 10px;">
          ${chapter.subtitle}
        </div>
        <p style="font-size: 13.5px; color: #334155; line-height: 1.6; margin: 0; word-break: keep-all;">
          ${chapter.briefing}
        </p>
        ${crisisHtml}
      `;
      wrap.appendChild(storyChapterBox);
    }

    // STEP 2 SECTION: 본부장 3대 결재 데스크
    const chapter = MONTHLY_CHAPTERS[this.gm.currentMonth] || MONTHLY_CHAPTERS[1];
    const step2Header = document.createElement('div');
    step2Header.className = 'step-section-header';
    step2Header.innerHTML = `
      <span class="step-badge">STEP 2</span>
      <h3 class="step-section-title">본부장 핵심 결재 데스크</h3>
      <span class="step-section-hint">가용 행동력: <b>${this.gm.actionPoints} AP</b></span>
    `;
    wrap.appendChild(step2Header);

    const officeGrid = document.createElement('div');
    officeGrid.className = 'office-grid';
    officeGrid.innerHTML = `
      <div class="office-card primary-task" id="obj-policies" style="cursor: pointer;">
        <span class="task-tag core">업무 ① · 핵심 결재 (각 1 AP)</span>
        <div class="icon-head">📁</div>
        <h3>월간 정책 결재함</h3>
        <div style="font-size: 11px; background: rgba(180, 83, 9, 0.1); color: #92400e; padding: 4px 8px; border-radius: 4px; font-weight: 700; margin-bottom: 6px;">
          ★ ${chapter.specialPolicy ? chapter.specialPolicy.title : '이달의 긴급 특별 결재 대기 중'}
        </div>
        <p style="font-size: 12px; color: #475569; margin: 0 0 10px;">이달의 긴급 특별 결재 및 금융·세제·인프라 등 15대 정책 수단을 집행합니다.</p>
        <button class="primary" style="width: 100%;">정책 결재함 열기 (${this.gm.actionPoints} AP 잔여) →</button>
      </div>

      <div class="office-card" id="obj-nego-us" style="cursor: pointer;">
        <span class="task-tag must">업무 ② · 통상 외교 (1 AP)</span>
        <div class="icon-head">🤝</div>
        <h3>${chapter.negotiationTitle || '대미 통상 협상 훈령'}</h3>
        <p style="font-size: 12px; color: #475569; margin: 0 0 10px;">${chapter.negotiationDesc || '양자 통상 담판 테이블로 직행합니다.'}</p>
        <button class="secondary" style="width: 100%;">
          ${this.gm.activeNegotiation && this.gm.activeNegotiation.status === 'suspended' ? '정회된 협상 속개 →' : (chapter.negotiationButtonText || '외교 협상 시작 →')}
        </button>
      </div>

      <div class="office-card" id="obj-corp-dialogue" style="cursor: pointer;">
        <span class="task-tag opt">업무 ③ · 산업 현장 (1 AP)</span>
        <div class="icon-head">💼</div>
        <h3>${chapter.featuredCorpTitle || '10대 기업 현장 간담회'}</h3>
        <p style="font-size: 12px; color: #475569; margin: 0 0 10px;">${chapter.featuredCorpGreeting ? chapter.featuredCorpGreeting.substring(0, 52) + '...' : '주력 수출 기업의 현장 병목을 해결합니다.'}</p>
        <button class="secondary" style="width: 100%;">기업 간담회 진행 (1 AP) →</button>
      </div>
    `;
    wrap.appendChild(officeGrid);

    // Auxiliary Drawers Toolbar (보조 서류함: 상황실, 독트린, 핫라인, 지난 지면)
    const doc = this.gm.doctrine || DOCTRINES[0];
    const drawerToolbar = document.createElement('div');
    drawerToolbar.className = 'drawer-toolbar';
    drawerToolbar.innerHTML = `
      <span class="drawer-toolbar-title">📂 보조 서류철:</span>
      <button class="drawer-btn" id="obj-war-room">🖥️ 무역상황실 모니터</button>
      <button class="drawer-btn" id="btn-open-doctrine-modal">⚙️ 국정 독트린: <b>${doc.name}</b></button>
      <button class="drawer-btn" id="obj-president-call">📞 대통령 핫라인 (${Math.round(this.gm.politics.stats.presidentTrust)}점)</button>
      <button class="drawer-btn" id="obj-newspaper-archive" ${!this.gm.latestNewspaper ? 'disabled' : ''}>📰 지난 조간 1면</button>
    `;
    wrap.appendChild(drawerToolbar);

    // STEP 3 SECTION: 이달의 무역 성적표 확정 및 턴 종료
    const step3Header = document.createElement('div');
    step3Header.className = 'step-section-header';
    step3Header.innerHTML = `
      <span class="step-badge">STEP 3</span>
      <h3 class="step-section-title">이달의 무역 성적표 확정 및 턴 종료</h3>
      <span class="step-section-hint">모든 결재를 마치면 성적표를 발표하십시오</span>
    `;
    wrap.appendChild(step3Header);

    // Monthly advance action banner
    const actionBanner = document.createElement('div');
    actionBanner.className = 'panel';
    actionBanner.style.textAlign = 'center';
    actionBanner.style.background = 'var(--paper-card)';
    actionBanner.style.border = '2px solid var(--navy)';
    actionBanner.style.padding = '24px 20px';
    actionBanner.innerHTML = `
      <h3 style="border: 0; padding: 0; margin-bottom: 6px; font-size: 18px; color: var(--navy);">
        2027년 ${this.gm.currentMonth}월 통상 정책 수립 완료
      </h3>
      <p style="font-size: 13px; color: var(--muted); margin-bottom: 14px;">
        결재를 모두 마쳤다면, 경제 엔진을 구동하여 이달의 수출입 실적을 확정하고 중앙일보 1면 보도를 확인하십시오.
      </p>
      ${this.gm.actionPoints > 0 ? `
        <div style="background: rgba(177, 145, 88, 0.1); border: 1px dashed var(--gold); border-radius: 4px; padding: 6px 14px; display: inline-block; font-size: 12px; color: var(--navy); margin-bottom: 14px;">
          ⚡ 이번 달 행동력이 <b>${this.gm.actionPoints} AP</b> 남아있습니다. 더 결재하거나 바로 발표할 수 있습니다.
        </div>
      ` : ''}
      <div>
        <button class="primary" id="btn-advance-month" style="font-size: 16px; padding: 14px 40px; box-shadow: 0 4px 14px rgba(16, 28, 43, 0.25);">
          ⚡ ${this.gm.currentMonth}월 수출입 실적 확정 및 성적표 발표 →
        </button>
      </div>
    `;
    wrap.appendChild(actionBanner);

    // Render Doctrine Selector Modal if opened
    if (this.doctrineModalOpen) {
      wrap.appendChild(this.renderDoctrineModal());
    }

    // Render Corporate Modal if opened
    if (this.corporateModalOpen) {
      wrap.appendChild(this.renderCorporateModal());
    }

    setTimeout(() => {
      const btnCloseCorpFb = document.getElementById('btn-close-corp-fb');
      if (btnCloseCorpFb) btnCloseCorpFb.onclick = () => { this.corporateFeedback = null; this.render(); };

      const btnResumeNego = document.getElementById('btn-resume-suspended-nego');
      if (btnResumeNego) btnResumeNego.onclick = () => {
        this.gm.activeNegotiation.resumeSession();
        this.gm.screen = 'negotiation';
        this.render();
      };

      const btnDoc = document.getElementById('btn-open-doctrine-modal');
      if (btnDoc) btnDoc.onclick = () => {
        this.doctrineModalOpen = true;
        this.render();
      };

      // Campaign Pilot Event Handlers (Intel tabs, strategic choices, diplomatic statements)
      wrap.querySelectorAll('.btn-intel-tab').forEach(btn => {
        btn.onclick = () => {
          const iid = btn.getAttribute('data-iid');
          this.activeIntelId = iid;
          if (this.gm.campaign) this.gm.campaign.inspectIntel(iid);
          this.render();
        };
      });

      wrap.querySelectorAll('.btn-campaign-choice').forEach(btn => {
        btn.onclick = () => {
          const cid = btn.getAttribute('data-cid');
          if (this.gm.campaign) {
            const chosen = this.gm.campaign.makeStrategicDecision(cid, this.gm);
            if (chosen) {
              this.showToast('전략 노선 결단 확정', `"${chosen.label}" 공식 하달`, 'success');
              this.render();
            }
          }
        };
      });

      wrap.querySelectorAll('.btn-campaign-stmt').forEach(btn => {
        btn.onclick = () => {
          const sid = btn.getAttribute('data-sid');
          if (this.gm.campaign) {
            const stmt = this.gm.campaign.recordDiplomaticStatement(sid, this.gm);
            if (stmt) {
              this.gm.latestPressStatement = stmt;
              this.showToast('외교 성명 발표 완료', '대외 공식 성명이 외신에 배포되었습니다.', 'info');
              this.render();
            }
          }
        };
      });

      wrap.querySelectorAll('.btn-chapter-crisis-choice').forEach(btn => {
        btn.onclick = () => {
          const idx = Number(btn.getAttribute('data-choice'));
          const res = this.gm.resolveChapterCrisis(idx);
          if (res && res.decision) {
            this.showToast('통상 결단 확정', `"${res.decision.chosenText}" (${res.decision.summary})`, 'success');
          }
          this.render();
        };
      });

      wrap.querySelectorAll('.btn-corp-agency-opt').forEach(btn => {
        btn.onclick = () => {
          const cid = btn.getAttribute('data-cid');
          const akey = btn.getAttribute('data-akey');
          const oid = btn.getAttribute('data-oid');
          const res = this.gm.resolveCorporateAction(cid, akey, oid);
          if (res) {
            this.corporateFeedback = res;
            this.showToast('기업 대응 조치 확정', res.resolveText, 'success');
          }
          this.render();
        };
      });

      const elWar = document.getElementById('obj-war-room');
      if (elWar) elWar.onclick = () => { this.gm.screen = 'war_room'; this.render(); };
      const elPol = document.getElementById('obj-policies');
      if (elPol) elPol.onclick = () => { this.gm.screen = 'policies'; this.render(); };
      const elNego = document.getElementById('obj-nego-us');
      if (elNego) elNego.onclick = () => {
        if (this.gm.activeNegotiation && this.gm.activeNegotiation.status === 'suspended') {
          this.gm.activeNegotiation.resumeSession();
          this.gm.screen = 'negotiation';
        } else {
          this.gm.launchNegotiation();
        }
        this.render();
      };
      const elPres = document.getElementById('obj-president-call');
      if (elPres) elPres.onclick = () => {
        this.presidentModalOpen = true;
        this.render();
      };
      const elCorp = document.getElementById('obj-corp-dialogue');
      if (elCorp) elCorp.onclick = () => {
        const ch = MONTHLY_CHAPTERS[this.gm.currentMonth];
        this.selectedCorpId = ch?.featuredCorpId || 'samsung';
        this.corporateModalOpen = true;
        this.render();
      };
      const btnNews = document.getElementById('obj-newspaper-archive');
      if (btnNews && this.gm.latestNewspaper) btnNews.onclick = () => { this.gm.screen = 'newspaper'; this.render(); };

      const btnAdv = document.getElementById('btn-advance-month');
      if (btnAdv) btnAdv.onclick = () => {
        if (this.gm.currentMonth <= 3 && this.gm.campaign) {
          const hasDecided = this.gm.campaign.decisionsHistory.some(d => d.month === this.gm.currentMonth);
          if (!hasDecided) {
            const stage = this.gm.campaign.getCurrentStageData();
            const defChoice = (stage.strategicChoices || stage.finalChoices || [])[0];
            if (defChoice) {
              this.gm.campaign.makeStrategicDecision(defChoice.id, this.gm);
            }
          }
        }
        this.gm.advanceTurn();
        this.render();
      };
    }, 0);

    return wrap;
  }

  // 1-minute Inaugural Executive Onboarding
  renderFirstTurnBriefing() {
    const box = document.createElement('div');
    box.className = 'panel';
    box.style.border = '2px solid var(--gold)';
    box.style.background = '#fefdfa';
    box.style.marginBottom = '20px';
    box.style.boxShadow = '0 6px 18px rgba(177, 145, 88, 0.15)';

    box.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--line); padding-bottom: 10px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 20px;">📜</span>
          <div>
            <span class="eyebrow" style="color: var(--gold); font-weight: 800;">INDEPENDENT ONBOARDING GUIDE</span>
            <h3 style="margin: 0; font-size: 18px; color: var(--navy); font-family: var(--font-serif);">통상교섭본부장 취임 브리핑: 5대 핵심 가이드</h3>
          </div>
        </div>
        <button class="secondary" id="btn-dismiss-first-guide" style="font-size: 11px; padding: 4px 10px;">가이드 닫기 ✕</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 13px; margin-bottom: 16px;">
        <div style="background: var(--white); padding: 10px; border-radius: 4px; border: 1px solid var(--line);">
          <strong style="color: var(--navy); display: block; margin-bottom: 3px;">1. 직책 (Role)</strong>
          <p style="margin: 0; font-size: 12px; color: #555;">대한민국 대외 통상 총괄 사령탑. 관세 장벽 방어와 무역흑자를 지휘합니다.</p>
        </div>
        <div style="background: var(--white); padding: 10px; border-radius: 4px; border: 1px solid var(--line);">
          <strong style="color: var(--navy); display: block; margin-bottom: 3px;">2. 최종 목표 (Goal)</strong>
          <p style="margin: 0; font-size: 12px; color: #555;">2027년 12개월 동안 무역수지 흑자를 수호하고 10대 첨단 주력산업을 지켜내십시오.</p>
        </div>
        <div style="background: var(--white); padding: 10px; border-radius: 4px; border: 1px solid var(--line);">
          <strong style="color: var(--navy); display: block; margin-bottom: 3px;">3. 월간 3 AP (Action)</strong>
          <p style="margin: 0; font-size: 12px; color: #555;">매월 3회의 정책 행동력(대미 담판, 설비 매칭, 무역금융 등)을 전략적으로 배분합니다.</p>
        </div>
        <div style="background: var(--white); padding: 10px; border-radius: 4px; border: 1px solid var(--line);">
          <strong style="color: var(--navy); display: block; margin-bottom: 3px;">4. 결과 확인 (Feedback)</strong>
          <p style="margin: 0; font-size: 12px; color: #555;">정책 수립 후 '실적 확정'을 누르면 중앙일보 1면과 관세청 공식 성적표가 발행됩니다.</p>
        </div>
        <div style="background: var(--white); padding: 10px; border-radius: 4px; border: 1px solid var(--line);">
          <strong style="color: var(--navy); display: block; margin-bottom: 3px;">5. 엔딩 판정 (Verdict)</strong>
          <p style="margin: 0; font-size: 12px; color: #555;">12개월 완주 후 누적 흑자, 지지율, 외교신뢰도에 따라 7대 멀티 엔딩이 판정됩니다.</p>
        </div>
      </div>

      <div style="background: rgba(177, 145, 88, 0.08); padding: 12px 16px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div style="font-size: 13px; color: var(--navy);">
          <strong>💡 1분 쾌속 시작 가이드:</strong> 첫 번째 조치로 전 산업 수출 탄력을 높이는 무역금융 투입을 추천합니다.
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="primary" id="btn-quickstart-first-action" style="font-size: 13px; padding: 8px 16px;">
            ⚡ 추천 첫 조치 집행: 무역금융 50조 원 공급 (1 AP)
          </button>
          <button class="secondary" id="btn-explore-office" style="font-size: 13px; padding: 8px 14px;">
            집무실 직접 둘러보기
          </button>
        </div>
      </div>
    `;

    setTimeout(() => {
      const btnDismiss = document.getElementById('btn-dismiss-first-guide');
      if (btnDismiss) btnDismiss.onclick = () => {
        this.gm.firstTurnBriefingDismissed = true;
        this.gm.autoSave();
        this.render();
      };
      const btnExplore = document.getElementById('btn-explore-office');
      if (btnExplore) btnExplore.onclick = () => {
        this.gm.firstTurnBriefingDismissed = true;
        this.gm.autoSave();
        this.render();
      };
      const btnQuick = document.getElementById('btn-quickstart-first-action');
      if (btnQuick) btnQuick.onclick = () => {
        this.gm.firstTurnBriefingDismissed = true;
        const res = this.gm.executePolicy('gov_trade_financing_50t');
        if (res && res.success) {
          this.showToast('추천 정책 집행 완료', '무역금융 50조 원 긴급 공급 집행 완료 (잔여 2 AP)', 'success');
        }
        this.render();
      };
    }, 0);

    return box;
  }

  // Presidential Hotline Modal
  renderPresidentModal() {
    const dialog = document.createElement('dialog');
    dialog.className = 'game-dialog';
    dialog.open = true;
    dialog.style.maxWidth = '520px';
    dialog.style.padding = '22px';

    dialog.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; border-bottom: 1px solid var(--line); padding-bottom: 8px;">
        <span class="status-pill" style="background: var(--navy); color: #fff; font-weight: 800;">🏛️ 용산 대통령실 직통 비화 핫라인</span>
        <button class="secondary" id="btn-close-pres-modal" style="font-size: 11px; padding: 4px 8px;">닫기 ✕</button>
      </div>
      <h3 style="font-family: var(--font-serif); font-size: 19px; color: var(--navy); margin-bottom: 8px;">대통령 특별 훈령 및 지시사항</h3>
      <div style="background: #fcfbf7; border-left: 4px solid var(--navy); padding: 14px; font-size: 14px; line-height: 1.6; font-style: italic; color: #1a1a1a; margin-bottom: 16px; border-radius: 0 4px 4px 0;">
        "${this.gm.scenario.presidentMandate}"
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; padding: 10px 14px; background: #f7f9fa; border: 1px solid var(--line); border-radius: 4px;">
        <span>대통령실 신임도:</span>
        <strong style="font-size: 16px; color: ${this.gm.politics.stats.presidentTrust >= 60 ? 'var(--green)' : 'var(--red)'};">
          ${Math.round(this.gm.politics.stats.presidentTrust)}점 / 100점
        </strong>
      </div>
      <div style="text-align: right; margin-top: 20px;">
        <button class="primary" id="btn-ack-pres-modal" style="padding: 10px 24px; font-size: 14px;">지시사항 확인</button>
      </div>
    `;

    setTimeout(() => {
      const btnClose = document.getElementById('btn-close-pres-modal');
      if (btnClose) btnClose.onclick = () => { this.presidentModalOpen = false; this.render(); };
      const btnAck = document.getElementById('btn-ack-pres-modal');
      if (btnAck) btnAck.onclick = () => { this.presidentModalOpen = false; this.render(); };
    }, 0);

    return dialog;
  }

  // Negotiation Trade-off Summary Modal
  renderNegotiationTradeOffModal(agreement) {
    const dialog = document.createElement('dialog');
    dialog.className = 'game-dialog';
    dialog.open = true;
    dialog.style.maxWidth = '640px';
    dialog.style.padding = '24px';
    dialog.style.maxHeight = '90vh';
    dialog.style.overflowY = 'auto';

    const isAgreed = agreement.type === 'agreed';
    const isBroken = agreement.type === 'broken';
    const badgeColor = isAgreed ? 'var(--green)' : (isBroken ? 'var(--red)' : 'var(--gold)');

    const summary = agreement.tradeOffSummary || {
      gains: [agreement.title],
      concessions: ["상호 타협안 도출"],
      diplomaticSpillover: "대외 통상 신뢰도 및 양국 거버넌스 유지"
    };

    dialog.innerHTML = `
      <div style="text-align: center; margin-bottom: 18px;">
        <span class="status-pill" style="font-size: 13px; font-weight: 800; background: ${badgeColor}; color: #fff;">
          ${agreement.grade}
        </span>
        <h2 style="font-family: var(--font-display); font-size: 24px; margin: 10px 0 6px; color: var(--navy);">${agreement.title}</h2>
        <p style="font-size: 14px; color: #333; line-height: 1.6;">${agreement.description}</p>
      </div>

      <div style="background: rgba(37, 107, 79, 0.08); border: 1px solid var(--green); border-radius: 6px; padding: 14px; margin-bottom: 12px;">
        <h4 style="font-size: 14px; color: var(--green); margin: 0 0 6px; font-weight: 800;">🏆 대한민국 핵심 획득 성과 (Gains)</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #222; line-height: 1.6;">
          ${summary.gains.map(g => `<li>${g}</li>`).join('')}
        </ul>
      </div>

      <div style="background: rgba(175, 81, 71, 0.08); border: 1px solid var(--red); border-radius: 6px; padding: 14px; margin-bottom: 12px;">
        <h4 style="font-size: 14px; color: var(--red); margin: 0 0 6px; font-weight: 800;">⚖️ 불가피한 양보 및 감수 사항 (Trade-off Concessions)</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #222; line-height: 1.6;">
          ${summary.concessions.map(c => `<li>${c}</li>`).join('')}
        </ul>
      </div>

      <div style="background: #fdfbf7; border: 1px solid var(--line); border-left: 4px solid var(--navy); border-radius: 4px; padding: 12px; margin-bottom: 22px; font-size: 13px; line-height: 1.6; color: #333;">
        <strong style="color: var(--navy); display: block; margin-bottom: 3px;">🌐 제3국 통상 외교 및 국내 파급효과 (Diplomatic Spillover):</strong>
        ${summary.diplomaticSpillover}
      </div>

      <div style="text-align: center;">
        <button class="primary" id="btn-close-tradeoff-modal" style="font-size: 15px; padding: 12px 36px; width: 100%;">
          결과 확정하고 집무실로 복귀
        </button>
      </div>
    `;

    setTimeout(() => {
      const btn = document.getElementById('btn-close-tradeoff-modal');
      if (btn) btn.onclick = () => {
        this.tradeOffSummaryModal = null;
        this.gm.screen = 'office';
        this.render();
      };
    }, 0);

    return dialog;
  }

  // 6대 국정 통상 독트린 선택 모달
  renderDoctrineModal() {
    const dialog = document.createElement('dialog');
    dialog.className = 'game-dialog';
    dialog.open = true;
    dialog.style.maxHeight = '90vh';
    dialog.style.overflowY = 'auto';

    dialog.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; border-bottom: 2px solid var(--navy); padding-bottom: 8px;">
        <div>
          <span class="eyebrow" style="color: var(--navy); font-weight: 800;">NATIONAL STRATEGIC DOCTRINE</span>
          <h2 style="font-family: var(--font-serif); font-size: 22px; color: var(--navy); margin-top: 4px;">대한민국 6대 국정 통상 독트린 선포 및 전환</h2>
        </div>
        <button class="secondary" id="btn-close-doc-modal" style="padding: 6px 12px; font-size: 14px;">닫기 ✕</button>
      </div>
      <p style="font-size: 13px; color: var(--muted); margin-bottom: 16px;">
        선택한 독트린은 12개월간 상시 지속 패시브 효과를 발휘하며 무역 외교와 산업 구조에 지대한 영향을 미칩니다.
      </p>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${DOCTRINES.map(d => {
          const isCurrent = this.gm.doctrine && this.gm.doctrine.id === d.id;
          return `
            <div style="border: 2px solid ${isCurrent ? 'var(--navy)' : 'var(--line)'}; background: ${isCurrent ? '#f0f4f8' : 'var(--white)'}; border-radius: 6px; padding: 14px; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <strong style="font-size: 16px; color: var(--navy); font-family: var(--font-serif);">${d.name}</strong>
                  ${isCurrent ? '<span class="status-pill" style="background: var(--navy); color: #fff; font-size: 11px;">현재 적용 중</span>' : ''}
                </div>
                <p style="margin: 0 0 6px; font-size: 12px; color: #444;">"${d.slogan}"</p>
                <div style="font-size: 11px; display: flex; gap: 12px; flex-wrap: wrap;">
                  <span style="color: var(--green); font-weight: 700;">✨ 혜택: ${d.passiveBonusText}</span>
                  <span style="color: var(--red);">⚠️ 기회비용/리스크: ${d.riskText}</span>
                </div>
              </div>
              <button class="btn-select-doc ${isCurrent ? 'secondary' : 'primary'}" data-did="${d.id}" ${isCurrent ? 'disabled' : ''} style="padding: 10px 18px; font-size: 13px; white-space: nowrap;">
                ${isCurrent ? '선택됨' : '선포하기 →'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    setTimeout(() => {
      const btnClose = dialog.querySelector('#btn-close-doc-modal');
      if (btnClose) btnClose.onclick = () => {
        this.doctrineModalOpen = false;
        this.render();
      };
      dialog.querySelectorAll('.btn-select-doc').forEach(btn => {
        btn.onclick = () => {
          const did = btn.getAttribute('data-did');
          this.gm.setDoctrine(did);
          this.doctrineModalOpen = false;
          this.render();
        };
      });
    }, 0);

    return dialog;
  }

  // Interactive Corporate Dialogue Modal
  renderCorporateModal() {
    const dialog = document.createElement('dialog');
    dialog.className = 'game-dialog';
    dialog.open = true;
    dialog.style.maxHeight = '90vh';
    dialog.style.overflowY = 'auto';

    const ch = MONTHLY_CHAPTERS[this.gm.currentMonth] || MONTHLY_CHAPTERS[1];
    const corp = getCorporation(this.selectedCorpId, this.gm.currentMonth) || CORPORATIONS[0];
    const isFeatured = (ch.featuredCorpId === corp.id);

    dialog.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; border-bottom: 2px solid var(--gold); padding-bottom: 8px;">
        <div>
          <span class="eyebrow" style="color: var(--gold); font-weight: 800;">TOP 10 EXPORTERS ROUNDTABLE</span>
          <h2 style="font-family: var(--font-serif); font-size: 22px; color: var(--navy); margin-top: 4px;">10대 기업 현장 간담회 및 전략 협의</h2>
        </div>
        <button class="secondary" id="btn-close-corp-modal" style="padding: 6px 12px; font-size: 14px;">닫기 ✕</button>
      </div>

      <!-- Corporate selector tabs -->
      <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 16px;">
        ${CORPORATIONS.map(c => {
          const featured = (ch.featuredCorpId === c.id);
          return `
            <button class="secondary tab-corp-btn ${c.id === this.selectedCorpId ? 'primary' : ''}" data-cid="${c.id}" style="padding: 8px 12px; font-size: 13px; white-space: nowrap; ${featured ? 'border: 2px solid var(--gold); font-weight: 800;' : ''}">
              ${c.icon} ${c.name} ${featured ? '★' : ''}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Corporate Card -->
      <div style="background: var(--white); border: ${isFeatured ? '2px solid var(--gold)' : '1px solid var(--line)'}; border-radius: 6px; padding: 18px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="font-size: 18px; color: var(--navy); margin: 0;">
              ${corp.icon} ${corp.name}
              ${isFeatured ? '<span class="status-pill" style="background: var(--gold); color: #fff; font-size: 11px; margin-left: 6px;">★ 이달의 집중 현안 기업</span>' : ''}
            </h3>
            <small style="color: var(--muted); font-weight: 700;">대표 면담자: ${corp.leader} · 수출 비중: ${(corp.annualExportShare * 100).toFixed(0)}%</small>
          </div>
          <span class="status-pill" style="font-size: 12px;">기조: ${corp.stance}</span>
        </div>

        <div style="background: #fbf8f0; border-left: 4px solid var(--gold); padding: 12px 14px; border-radius: 4px; margin: 12px 0; font-size: 14px; line-height: 1.6; color: #222;">
          <strong>현장 긴급 현안 및 최고경영진 발언:</strong><br>
          "${corp.dialogue.greeting}"
        </div>

        ${this.lastCorpResponse ? `
          <div style="background: rgba(37, 107, 79, 0.08); border-left: 4px solid var(--green); padding: 10px 14px; border-radius: 4px; margin: 12px 0; font-size: 13px; color: #194d38;">
            <b>기업 측 현장 반응:</b><br>${this.lastCorpResponse}
          </div>
        ` : ''}

        <div style="margin-top: 16px;">
          <h4 style="font-size: 14px; color: var(--navy); margin-bottom: 8px;">
            통상교섭본부장의 정책 지침 및 현장 지원 선택 (1 AP 소모, 잔여: ${this.gm.actionPoints} AP):
          </h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${corp.dialogue.options.map((opt, idx) => `
              <button class="secondary btn-corp-opt" data-opt="${idx}" ${this.gm.actionPoints <= 0 ? 'disabled' : ''} style="text-align: left; padding: 12px 14px; border: 1px solid var(--line); line-height: 1.5;">
                <strong style="color: var(--navy); display: block; margin-bottom: 4px;">지침 ${idx + 1}. ${opt.text}</strong>
                <span style="font-size: 12px; color: var(--muted);">예상 파급효과: 기업신뢰 ${opt.impact?.businessTrust ? (opt.impact.businessTrust > 0 ? '+' : '') + opt.impact.businessTrust : '0'}pt, 산업 경쟁력 ${opt.impact?.competitiveness ? (opt.impact.competitiveness > 0 ? '+' : '') + opt.impact.competitiveness : '0'}pt</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const btnClose = dialog.querySelector('#btn-close-corp-modal');
      if (btnClose) btnClose.onclick = () => {
        this.corporateModalOpen = false;
        this.lastCorpResponse = null;
        this.render();
      };
      dialog.querySelectorAll('.tab-corp-btn').forEach(btn => {
        btn.onclick = () => {
          this.selectedCorpId = btn.getAttribute('data-cid');
          this.lastCorpResponse = null;
          this.render();
        };
      });
      dialog.querySelectorAll('.btn-corp-opt').forEach(btn => {
        btn.onclick = () => {
          const optIdx = Number(btn.getAttribute('data-opt'));
          const res = this.gm.consultCorporation(this.selectedCorpId, optIdx);
          if (res) {
            if (res.error) {
              this.showToast('행동력(AP) 부족', '남은 행동력(AP)이 없습니다.', 'warning');
            } else {
              this.lastCorpResponse = res.response;
              this.showToast('기업 현장 지침 하달', `${corp.name}에 본부장 정책 지침을 하달했습니다. (1 AP 소모)`, 'success');
              this.render();
            }
          }
        };
      });
    }, 0);

    return dialog;
  }

  // 5. Trade War Room Screen
  renderWarRoomScreen() {
    const wrap = document.createElement('div');
    wrap.appendChild(this.renderNavTabs('war_room'));

    const scene = document.createElement('div');
    scene.className = 'scene-container';
    scene.style.backgroundImage = "url('./assets/war-room.jpg')";
    scene.innerHTML = `
      <div class="scene-overlay">
        <div>
          <h2>국가 무역상황실 (Trade War Room)</h2>
          <p>글로벌 공급망·10대 주력 산업·교역국별 수출입 텔레메트리 관제 모니터</p>
        </div>
      </div>
    `;
    wrap.appendChild(scene);

    // Latest month stats summary
    const res = this.gm.latestMonthlyResult;
    const exp = res ? `$${res.export.toFixed(1)}B` : '$54.4B (추정)';
    const imp = res ? `$${res.import.toFixed(1)}B` : '$53.7B (추정)';
    const bal = res ? `${res.balance >= 0 ? '+' : ''}$${res.balance.toFixed(1)}B` : '+$0.7B';
    const cumBal = res ? `$${res.cumulativeBalance.toFixed(1)}B` : '+$0.7B';
    const fx = res ? `${res.macro.fxRate}원` : '1,410.5원';
    const oil = res ? `$${res.macro.brentOil}` : '$78.4';

    const strip = document.createElement('div');
    strip.className = 'metrics-strip';
    strip.innerHTML = `
      <div class="metric-card">
        <small>직전 월 수출액</small>
        <strong>${exp}</strong>
      </div>
      <div class="metric-card">
        <small>직전 월 수입액</small>
        <strong>${imp}</strong>
      </div>
      <div class="metric-card">
        <small>직전 월 무역수지</small>
        <strong style="color: ${res && res.balance < 0 ? 'var(--red)' : 'var(--green)'};">${bal}</strong>
      </div>
      <div class="metric-card">
        <small>연간 누적 흑자</small>
        <strong>${cumBal}</strong>
      </div>
      <div class="metric-card">
        <small>원/달러 환율</small>
        <strong>${fx}</strong>
      </div>
      <div class="metric-card">
        <small>국제유가 (Brent)</small>
        <strong>${oil}</strong>
      </div>
    `;
    wrap.appendChild(strip);

    // 10 Industries Table
    const indPanel = document.createElement('div');
    indPanel.className = 'panel';
    indPanel.innerHTML = `
      <h3>10대 주력 산업 수출입 상태 현황</h3>
      <div class="table-responsive">
        <table class="game-table">
          <thead>
            <tr>
              <th>산업명</th>
              <th>당월 수출액</th>
              <th>당월 수입액</th>
              <th>무역수지</th>
              <th>전년비 증감</th>
              <th>가동률</th>
              <th>관세 장벽</th>
            </tr>
          </thead>
          <tbody>
            ${INDUSTRIES.map(ind => {
              const indState = this.gm.economy.industryStates[ind.id];
              const indResult = res ? res.industries[ind.id] : null;
              const expVal = indResult ? `$${indResult.export.toFixed(1)}B` : '-';
              const impVal = indResult ? `$${indResult.import.toFixed(1)}B` : '-';
              const balVal = indResult ? `${indResult.balance >= 0 ? '+' : ''}$${indResult.balance.toFixed(1)}B` : '-';
              const yoyVal = indResult ? `${indResult.yoyGrowth >= 0 ? '+' : ''}${indResult.yoyGrowth}%` : '-';
              return `
                <tr>
                  <td><strong>${ind.icon} ${ind.name}</strong> <small style="color: var(--muted);">(${ind.hs})</small></td>
                  <td>${expVal}</td>
                  <td>${impVal}</td>
                  <td style="font-weight: 700; color: ${indResult && indResult.balance < 0 ? 'var(--red)' : 'var(--navy)'};">${balVal}</td>
                  <td style="font-weight: 700; color: ${indResult && indResult.yoyGrowth < 0 ? 'var(--red)' : 'var(--green)'};">${yoyVal}</td>
                  <td>${indState.utilizationRate}%</td>
                  <td>${indState.tradeBarrierIndex} pt</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
    wrap.appendChild(indPanel);

    // 7 Trading Partners Grid
    const partPanel = document.createElement('div');
    partPanel.className = 'panel';
    partPanel.innerHTML = `
      <h3>7대 주요 교역국별 통상 현황</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
        ${PARTNERS.map(p => {
          const pResult = res ? res.partners[p.id] : null;
          const pState = this.gm.economy.partnerStates[p.id];
          const expVal = pResult ? `$${pResult.export.toFixed(1)}B` : '-';
          const impVal = pResult ? `$${pResult.import.toFixed(1)}B` : '-';
          const balVal = pResult ? `${pResult.balance >= 0 ? '+' : ''}$${pResult.balance.toFixed(1)}B` : '-';
          return `
            <div style="background: var(--paper-card); border: 1px solid var(--line); border-radius: 6px; padding: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong>${p.flag} ${p.name}</strong>
                <span class="status-pill" style="font-size: 11px;">관계: ${Math.round(pState.relations)}점</span>
              </div>
              <div style="font-size: 12px; color: var(--muted); margin-bottom: 8px;">협상 상대: ${p.leader}</div>
              <div style="font-size: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                <div>대외수출: <b>${expVal}</b></div>
                <div>수입액: <b>${impVal}</b></div>
                <div style="grid-column: 1/-1; margin-top: 4px; padding-top: 4px; border-top: 1px dashed var(--line); color: ${pResult && pResult.balance < 0 ? 'var(--red)' : 'var(--green)'};">
                  무역수지: <b>${balVal}</b>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    wrap.appendChild(partPanel);

    return wrap;
  }

  // 6. Policy Screen
  renderPolicyScreen() {
    const wrap = document.createElement('div');
    wrap.appendChild(this.renderNavTabs('policies'));

    const header = document.createElement('div');
    header.style.marginBottom = '20px';
    header.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-family: var(--font-display); font-size: 24px; color: var(--navy);">월간 통상 정책 집행</h2>
          <p style="font-size: 13px; color: var(--muted);">이번 달 가용한 행동력: <strong>${this.gm.actionPoints} / ${this.gm.maxActionPoints || 5}</strong></p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="secondary tab-btn ${this.activePolicyTab === 'corporate' ? 'primary' : ''}" data-tab="corporate">기업 관리</button>
          <button class="secondary tab-btn ${this.activePolicyTab === 'government' ? 'primary' : ''}" data-tab="government">정부 정책</button>
          <button class="secondary tab-btn ${this.activePolicyTab === 'negotiation' ? 'primary' : ''}" data-tab="negotiation">통상 협상</button>
        </div>
      </div>
    `;
    wrap.appendChild(header);

    // List policies of active tab (including Month-specific Special Policy)
    const allPolicies = getMonthlyPolicies(this.gm.currentMonth);
    const filtered = allPolicies.filter(p => {
      if (p.id.startsWith('special_policy_')) {
        return this.activePolicyTab === 'government';
      }
      return p.category === this.activePolicyTab;
    });

    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '14px';

    filtered.forEach(policy => {
      const isUsed = this.gm.usedPoliciesThisMonth.includes(policy.id);
      const noAP = this.gm.actionPoints <= 0;
      const isSpecial = policy.id.startsWith('special_policy_');

      const card = document.createElement('div');
      card.className = 'panel';
      card.style.marginBottom = '0';
      if (isSpecial) {
        card.style.border = isUsed ? '2px solid #94a3b8' : '2px solid #b45309';
        card.style.borderLeft = isUsed ? '6px solid var(--muted)' : '6px solid #b45309';
        card.style.background = isUsed ? '#f8fafc' : '#fefce8';
      } else {
        card.style.borderLeft = isUsed ? '4px solid var(--muted)' : '4px solid var(--gold)';
      }
      card.style.opacity = isUsed ? '0.6' : '1';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="status-pill" style="${isSpecial ? 'background: #b45309; color: #fff; font-weight: 800;' : ''}">${isSpecial ? '★ 이달의 긴급 특별 결재' : policy.categoryName}</span>
            <h3 style="border: 0; padding: 0; margin: 0; font-size: 17px; font-weight: 800; color: var(--navy);">${policy.title}</h3>
          </div>
          <button class="primary btn-execute-policy" data-pid="${policy.id}" ${isUsed || noAP ? 'disabled' : ''} style="padding: 7px 16px; font-size: 13px; white-space: nowrap; ${isSpecial && !isUsed && !noAP ? 'background: #b45309;' : ''}">
            ${isUsed ? '✓ 집행 완료' : (policy.isNegotiationLaunch ? '협상장 입장 ➔' : '결재 집행 (1 AP) ➔')}
          </button>
        </div>
        <div style="background: #fbf8f0; border-left: 3px solid var(--gold); padding: 8px 12px; border-radius: 4px; font-size: 13px; color: var(--ink);">
          <strong>💡 파급 효과 및 반작용:</strong> ${policy.costText}
        </div>
      `;
      list.appendChild(card);
    });

    wrap.appendChild(list);

    setTimeout(() => {
      wrap.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
          this.activePolicyTab = btn.getAttribute('data-tab');
          this.render();
        };
      });
      wrap.querySelectorAll('.btn-execute-policy').forEach(btn => {
        btn.onclick = () => {
          const pid = btn.getAttribute('data-pid');
          const res = this.gm.executePolicy(pid);
          if (res && res.lastActionResult) {
            this.showToast('정책 결재 및 집행 완료', `${res.lastActionResult.title}: ${res.lastActionResult.costText} (잔여: ${res.actionPoints} AP)`, 'success');
          }
          this.render();
        };
      });
    }, 0);

    return wrap;
  }

  // 7. Interactive Bilateral Negotiation Screen
  renderNegotiationScreen() {
    const nego = this.gm.activeNegotiation;
    if (!nego) {
      this.gm.screen = 'office';
      this.render();
      return document.createElement('div');
    }

    const wrap = document.createElement('div');

    const scene = document.createElement('div');
    scene.className = 'scene-container';
    scene.style.backgroundImage = `url('./assets/${nego.scenario.roomBackground}')`;
    scene.innerHTML = `
      <div class="scene-overlay">
        <div>
          <h2>${nego.scenario.title}</h2>
          <p>상대국 대표: ${nego.scenario.representative}</p>
        </div>
      </div>
    `;
    wrap.appendChild(scene);

    const stageWrap = document.createElement('div');
    stageWrap.className = 'negotiation-wrap';

    // Left Column: Intelligence, Initial Demands, Counter-Demands, Domestic Voices
    const leftCol = document.createElement('div');
    leftCol.className = 'negotiation-stage';

    const demands = nego.scenario.initialDemands || nego.scenario.partnerDemands || [];
    const stakeholders = nego.scenario.stakeholderOpinions || {};

    leftCol.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
        <span class="eyebrow" style="color: var(--gold-light);">BILATERAL SUMMIT · STAGE ${nego.history.length + 1}</span>
        <span style="font-size: 13px;">협상 수용 점수: <strong>${nego.totalScore} / ${nego.scenario.minAcceptableScore || 50}pt</strong></span>
      </div>
      <h3 style="font-family: var(--font-serif); font-size: 20px; color: #fff; margin-bottom: 12px;">핵심 쟁점: ${nego.scenario.coreIssue}</h3>
      
      <div class="tension-bar-wrap">
        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
          <span>협상 긴장도 (Tension)</span>
          <strong style="color: ${nego.tension > 75 ? '#ef4444' : (nego.tension > 40 ? '#f59e0b' : '#10b981')};">${nego.tension}%</strong>
        </div>
        <div class="tension-bar">
          <div class="tension-fill" style="width: ${nego.tension}%;"></div>
        </div>
        <small style="font-size: 11px; color: #aaa;">긴장도가 92%를 초과하면 협상이 자동 결렬됩니다.</small>
      </div>

      <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 6px; margin: 14px 0; font-size: 13px; line-height: 1.6; border-left: 3px solid var(--gold);">
        <strong style="color: var(--gold-light);">🕵️ ${nego.scenario.intelReport}</strong>
      </div>

      <div style="margin-top: 14px;">
        <h4 style="font-size: 13px; color: var(--gold-light); margin-bottom: 6px;">상대국 3대 핵심 요구안:</h4>
        <ul style="font-size: 12px; padding-left: 18px; color: #ddd; line-height: 1.7;">
          ${demands.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      ${nego.currentCounterDemand ? `
        <div style="background: rgba(239, 68, 68, 0.2); border-left: 3px solid #ef4444; padding: 12px; border-radius: 4px; margin-top: 14px; font-size: 12px; color: #fca5a5;">
          <strong style="color: #fff; display: block; margin-bottom: 4px;">🚨 상대국의 기습 역제안 (Counter-Demand):</strong>
          "${nego.currentCounterDemand}"
        </div>
      ` : ''}

      <div style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 12px;">
        <h4 style="font-size: 13px; color: var(--gold-light); margin-bottom: 6px;">국내 이해관계자 여론 및 이해상충:</h4>
        <div style="font-size: 11px; color: #ccc; display: flex; flex-direction: column; gap: 6px;">
          ${Object.entries(stakeholders).map(([k, text]) => `
            <div style="background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 4px; border-left: 2px solid var(--gold);">
              ${text}
            </div>
          `).join('')}
        </div>
      </div>

      ${nego.history.length > 0 ? `
        <div style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 12px;">
          <h4 style="font-size: 13px; color: var(--gold-light); margin-bottom: 6px;">직전 교섭 기록:</h4>
          <div style="font-size: 12px; font-style: italic; color: #e5e5e5; background: rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 4px;">
            ${nego.history[nego.history.length - 1].partnerReaction}
          </div>
        </div>
      ` : ''}
    `;
    stageWrap.appendChild(leftCol);

    // Right Column: Hand of Strategic Cards & Conclude Options
    const rightCol = document.createElement('div');
    rightCol.innerHTML = `
      <!-- Two-Level Game: Domestic Stakeholder Consultations -->
      <div style="background: var(--paper-card); border: 1px solid var(--line); border-radius: 6px; padding: 14px; margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h4 style="margin: 0; font-size: 14px; color: var(--navy); font-family: var(--font-serif);">🏛️ 양면 게임: 국내 이해관계자 긴급 조율 (Two-Level Game)</h4>
          <span style="font-size: 11px; color: var(--muted);">정치적 자산: <b>${this.gm.politics.stats.politicalCapital}pt</b></span>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="secondary btn-domestic-consult" data-aid="agri_relief_fund" ${nego.domesticState.agriConsensus ? 'disabled' : ''} style="font-size: 11px; padding: 6px 10px;">
            ${nego.domesticState.agriConsensus ? '✅ 당정 1조원 상생기금 확보됨' : '🌾 당정 1조원 상생기금 조성 (자산 -15)'}
          </button>
          <button class="secondary btn-domestic-consult" data-aid="parliament_pre_ratify" ${nego.domesticState.parliamentConsensus ? 'disabled' : ''} style="font-size: 11px; padding: 6px 10px;">
            ${nego.domesticState.parliamentConsensus ? '✅ 국회 사전비준 공감대 확보' : '🏛️ 국회 통상소위 사전설명 (자산 -10)'}
          </button>
          <button class="secondary btn-domestic-consult" data-aid="chaebol_burden_share" ${nego.domesticState.chaebolBurdenShare ? 'disabled' : ''} style="font-size: 11px; padding: 6px 10px;">
            ${nego.domesticState.chaebolBurdenShare ? '✅ 4대 그룹 대미투자 매칭됨' : '💼 4대 그룹 대미투자 매칭'}
          </button>
        </div>
      </div>

      <div class="panel" style="margin-bottom: 16px;">
        <h3 style="border: 0; padding: 0; margin-bottom: 8px; font-size: 18px;">한국 측 협상 카드 선택</h3>
        <p style="font-size: 13px; color: var(--muted); margin-bottom: 14px;">전략 카드를 제시하여 상대국 수용도를 올리고 긴장도를 관리하십시오.</p>
        <div class="negotiation-cards">
          ${nego.scenario.cards.map(card => {
            const isUsed = nego.usedCards.has(card.id);
            return `
              <button class="negotiation-card-btn btn-play-card" data-cid="${card.id}" ${isUsed ? 'disabled' : ''}>
                <strong>${card.name}</strong>
                <p>${card.text}</p>
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-top: 4px;">
                  <span style="color: var(--navy); font-weight: 700;">비용/리스크: ${card.cost}</span>
                  <small style="color: ${card.acceptanceScore >= 25 ? 'var(--green)' : 'var(--gold)'}; font-weight: 700;">수용도: +${card.acceptanceScore}pt | 긴장도: ${card.tensionDelta}pt</small>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div style="background: var(--white); border: 1px solid var(--line); border-radius: 6px; padding: 16px; display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="primary" id="btn-conclude-agree" style="flex: 1.5; font-weight: 700;">타결안 서명 시도</button>
          <button class="secondary" id="btn-conclude-defer" style="flex: 1;">협상 3개월 유예</button>
          <button class="secondary" id="btn-conclude-suspend" style="flex: 1;">협상 일시 정회</button>
          <button class="danger" id="btn-conclude-break" style="flex: 1;">협상 결렬 감수</button>
        </div>
        <div style="font-size: 11px; color: var(--muted); line-height: 1.4; text-align: center;">
          * <b>대타결</b>: 점수 ${nego.scenario.minAcceptableScore + 10}점 이상 & 긴장도 60% 이하 | <b>조건부 절충</b>: 점수 ${nego.scenario.minAcceptableScore}점 이상 & 긴장도 75% 이하
        </div>
      </div>
    `;
    stageWrap.appendChild(rightCol);

    wrap.appendChild(stageWrap);

    setTimeout(() => {
      wrap.querySelectorAll('.btn-domestic-consult').forEach(btn => {
        btn.onclick = () => {
          const aid = btn.getAttribute('data-aid');
          const res = nego.consultDomestic(aid, this.gm.politics);
          if (res.success) {
            this.showToast('국내 당정 합의 성사', `${res.title}: ${res.description}`, 'success');
          } else {
            this.showToast('합의 무산', res.reason, 'danger');
          }
          this.render();
        };
      });

      wrap.querySelectorAll('.btn-play-card').forEach(btn => {
        btn.onclick = () => {
          const cid = btn.getAttribute('data-cid');
          const stepRes = nego.playCard(cid);
          if (stepRes.domesticNote) {
            this.showToast('국내 여론 반응', stepRes.domesticNote, stepRes.domesticNote.includes('합의') ? 'success' : 'danger');
          }
          this.render();
        };
      });
      const btnAgree = document.getElementById('btn-conclude-agree');
      if (btnAgree) btnAgree.onclick = () => {
        const res = this.gm.concludeNegotiation('agree');
        this.tradeOffSummaryModal = res;
        this.render();
      };
      const btnDefer = document.getElementById('btn-conclude-defer');
      if (btnDefer) btnDefer.onclick = () => {
        const res = this.gm.concludeNegotiation('defer');
        this.tradeOffSummaryModal = res;
        this.render();
      };
      const btnSuspend = document.getElementById('btn-conclude-suspend');
      if (btnSuspend) btnSuspend.onclick = () => {
        const res = nego.suspendSession();
        this.showToast('협상 일시 정회', `${res.title}: ${res.description}`, 'warning');
        this.gm.screen = 'office';
        this.render();
      };
      const btnBreak = document.getElementById('btn-conclude-break');
      if (btnBreak) btnBreak.onclick = () => {
        if (confirm('정말로 협상을 결렬시키겠습니까? 상대국의 즉각적인 보복 관세가 발효됩니다.')) {
          const res = this.gm.concludeNegotiation('breakdown');
          this.tradeOffSummaryModal = res;
          this.render();
        }
      };
    }, 0);

    return wrap;
  }

  // 8. Result Briefing Screen & Press Conference
  renderResultBriefingScreen() {
    const wrap = document.createElement('div');
    const res = this.gm.latestMonthlyResult;
    if (!res) {
      this.gm.screen = 'office';
      this.render();
      return wrap;
    }

    const scene = document.createElement('div');
    scene.className = 'scene-container';
    scene.style.backgroundImage = "url('./assets/press-v2.jpg')";
    scene.innerHTML = `
      <div class="scene-overlay">
        <div>
          <h2>2027년 ${res.month}월 통상 브리핑 및 대국민 기자회견</h2>
          <p>정부서울청사 합동브리핑실 · 관세청 및 통상교섭본부 공동 발표</p>
        </div>
      </div>
    `;
    wrap.appendChild(scene);

    // Compute Top Gainer & Top Loser Industries
    const indEntries = Object.values(res.industries);
    const sortedByGrowth = [...indEntries].sort((a, b) => b.balance - a.balance);
    const topGainer = sortedByGrowth[0];
    const topLoser = sortedByGrowth[sortedByGrowth.length - 1];

    const qa = this.gm.currentPressQA || getPressConferenceQA(
      res,
      this.gm.politics?.stats,
      this.gm.lastNegotiationAgreement,
      this.gm.monthlyThreats,
      this.gm.currentMonth
    );
    const selectedChoice = this.gm.latestPressStatement;

    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.style.textAlign = 'center';
    panel.innerHTML = `
      <span class="eyebrow" style="color: var(--gold); font-weight: 800;">OFFICIAL TRADE REPORT</span>
      <h3 style="border: 0; padding: 0; font-size: 24px; margin: 6px 0 16px;">
        ${res.month}월 무역수지: 
        <span style="color: ${res.balance >= 0 ? 'var(--green)' : 'var(--red)'};">
          ${res.balance >= 0 ? '+' : ''}$${res.balance.toFixed(1)}B ${res.balance >= 0 ? '흑자' : '적자'}
        </span>
      </h3>

      <!-- 5-Metric Score Strip -->
      <div class="metrics-strip" style="margin-bottom: 14px;">
        <div class="metric-card">
          <small>통관 상품수출</small>
          <strong>$${res.goodsExport !== undefined ? res.goodsExport.toFixed(1) : res.export.toFixed(1)}B</strong>
          <div class="delta ${res.yoyExportGrowth >= 0 ? 'plus' : 'minus'}">전년비 ${res.yoyExportGrowth >= 0 ? '+' : ''}${res.yoyExportGrowth}%</div>
        </div>
        <div class="metric-card">
          <small>총수입액</small>
          <strong>$${res.import.toFixed(1)}B</strong>
          <div class="delta ${res.yoyImportGrowth >= 0 ? 'plus' : 'minus'}">전년비 ${res.yoyImportGrowth >= 0 ? '+' : ''}${res.yoyImportGrowth}%</div>
        </div>
        <div class="metric-card">
          <small>당월 무역수지</small>
          <strong style="color: ${res.balance >= 0 ? 'var(--green)' : 'var(--red)'};">${res.balance >= 0 ? '+' : ''}$${res.balance.toFixed(1)}B</strong>
        </div>
        <div class="metric-card">
          <small>연간 누적 흑자</small>
          <strong>$${res.cumulativeBalance.toFixed(1)}B</strong>
        </div>
        <div class="metric-card">
          <small>원/달러 환율</small>
          <strong>₩${res.macro ? res.macro.fxRate : 1420}</strong>
        </div>
      </div>

      <!-- 1-line Highlight Bar -->
      <div style="background: var(--paper-card); border: 1px solid var(--line); border-radius: 6px; padding: 10px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 13px; text-align: left;">
        <div>🏆 <strong>최대 개선 산업:</strong> <span style="color: var(--green); font-weight: 700;">${topGainer.name}</span> ($${topGainer.export.toFixed(1)}B · +$${topGainer.balance.toFixed(1)}B)</div>
        <div>⚠️ <strong>부진 산업:</strong> <span style="color: var(--red); font-weight: 700;">${topLoser.name}</span> ($${topLoser.export.toFixed(1)}B · ${topLoser.balance >= 0 ? '+' : ''}$${topLoser.balance.toFixed(1)}B)</div>
      </div>

      <!-- Interactive Press Conference Section -->
      <div class="press-qa-container" style="background: var(--white); border: 2px solid var(--gold); border-radius: 8px; padding: 20px; margin-bottom: 20px; text-align: left; box-shadow: 0 4px 16px rgba(16,28,43,0.06);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--line); padding-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">🎙️</span>
            <span style="font-family: var(--font-display); font-size: 17px; font-weight: 800; color: var(--navy);">대국민 기자회견 · 출입기자단 긴급 질의</span>
          </div>
          <span class="status-pill" style="background: var(--navy); color: #fff; font-size: 11px; font-weight: 700;">
            ${qa.outlet} · ${qa.reporter}
          </span>
        </div>

        <div style="background: #fbf8f0; border-left: 4px solid var(--gold); padding: 12px 16px; border-radius: 4px; margin-bottom: 14px;">
          <p style="font-family: var(--font-serif); font-size: 15px; color: var(--ink); line-height: 1.6; margin: 0; font-weight: 600;">
            "${qa.question}"
          </p>
        </div>

        <div style="font-size: 13px; color: var(--muted); margin-bottom: 10px; font-weight: 700;">
          ⚡ 본부장 공식 입장 선택 (선택 즉시 지표 반영 및 내일 아침 중앙일보 1면 특종 보도):
        </div>

        <div class="press-choices-list" style="display: flex; flex-direction: column; gap: 10px;">
          ${qa.choices.map((c, idx) => {
            const isSelected = selectedChoice?.id === c.id;
            return `
              <div class="press-choice-card ${isSelected ? 'selected' : ''}" data-idx="${idx}" style="background: ${isSelected ? 'rgba(37, 107, 79, 0.06)' : 'var(--paper-card)'}; border: ${isSelected ? '2px solid var(--green)' : '1px solid var(--line)'}; border-radius: 6px; padding: 12px 14px; cursor: pointer; transition: all 0.2s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; flex-wrap: wrap; gap: 6px;">
                  <span class="status-pill" style="background: ${isSelected ? 'var(--green)' : 'var(--gold)'}; color: #fff; font-size: 11px; font-weight: 800;">
                    ${idx + 1}. ${c.label} ${isSelected ? '✓ 발표 완료' : ''}
                  </span>
                  <span style="font-size: 12px; font-weight: 700; color: ${isSelected ? 'var(--green)' : 'var(--navy)'};">
                    ${c.deltaSummary}
                  </span>
                </div>
                <p style="font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 4px; line-height: 1.5;">
                  "${c.quote}"
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
                  <small style="color: var(--muted); font-size: 11px;">📰 1면 헤드라인: <strong>${c.headline}</strong></small>
                  <button class="btn-press-select ${isSelected ? 'primary' : 'secondary'}" data-idx="${idx}" style="padding: 5px 12px; font-size: 11px;">
                    ${isSelected ? '✓ 발표 완료' : '입장 발표'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div style="margin: 20px 0; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
        <button class="primary" id="btn-view-newspaper" style="font-size: 16px; padding: 14px 34px; box-shadow: 0 4px 12px rgba(177,145,88,0.3);">
          📰 기자회견 보도 중앙일보 1면 보기 →
        </button>
      </div>
    `;
    panel.style.textAlign = 'center';
    wrap.appendChild(panel);

    setTimeout(() => {
      wrap.querySelectorAll('.btn-press-select, .press-choice-card').forEach(el => {
        el.onclick = (e) => {
          e.stopPropagation();
          const idx = Number(el.getAttribute('data-idx'));
          const result = this.gm.resolvePressAnswer(idx);
          if (result) {
            this.showToast('공식 입장 발표 완료', `"${result.choice.quote}" (중앙일보 1면 반영)`, 'success');
            this.render();
          }
        };
      });

      const btn = document.getElementById('btn-view-newspaper');
      if (btn) btn.onclick = () => {
        if (!this.gm.latestPressStatement) {
          this.gm.resolvePressAnswer(0);
        }
        this.gm.screen = 'newspaper';
        this.render();
      };
    }, 0);

    return wrap;
  }

  // 9. Virtual JoongAng Ilbo Front Page
  renderNewspaperScreen() {
    const wrap = document.createElement('div');
    wrap.appendChild(this.renderNavTabs('newspaper'));

    const news = this.gm.latestNewspaper;
    if (!news) {
      this.gm.screen = 'office';
      this.render();
      return wrap;
    }

    const paper = document.createElement('article');
    paper.className = 'front-page';

    paper.innerHTML = `
      <header>
        <img src="./assets/joongang-logo.png" alt="중앙일보" class="joongang-logo-img">
        <div class="front-meta">
          <span>${news.dateStr}</span>
          <span>THE JOONGANG</span>
          <span>경제 1면 종합</span>
        </div>
      </header>

      <h1 class="main-headline">${news.headline}</h1>
      <div class="front-deck">${news.deck}</div>

      <div class="front-columns">
        <div class="front-article">
          ${news.paragraphs.map(p => `<p>${p}</p>`).join('')}
        </div>
        <aside class="front-aside">
          <div class="front-figures-box">
            <h4>이달의 무역 성적표</h4>
            <ul>
              ${news.figures.map(f => `
                <li>
                  <span>${f.label}</span>
                  <strong>${f.value}</strong>
                </li>
              `).join('')}
            </ul>
          </div>
          <div style="margin-top: 14px; font-size: 11px; color: var(--muted); line-height: 1.5;">
            * 자료: 관세청 품목별 통관 무역통계 및 한국은행 거시경제지표 기반 가상 시뮬레이션
          </div>
        </aside>
      </div>

      <div style="margin-top: 30px; padding-top: 18px; border-top: 2px solid #292622; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <button class="secondary" id="btn-back-briefing">← 수출입 브리핑으로</button>
        <button class="primary" id="btn-next-month-flow" style="font-size: 15px; padding: 12px 28px;">
          ${this.gm.currentMonth === 12 ? '2028년 1월 최종 평가 및 엔딩 보기 →' : `${this.gm.currentMonth + 1}월 정책 턴으로 진행 →`}
        </button>
      </div>
    `;
    wrap.appendChild(paper);

    setTimeout(() => {
      const btnBack = document.getElementById('btn-back-briefing');
      if (btnBack) btnBack.onclick = () => { this.gm.screen = 'result_briefing'; this.render(); };
      const btnNext = document.getElementById('btn-next-month-flow');
      if (btnNext) btnNext.onclick = () => { this.gm.proceedToNextMonth(); this.render(); };
    }, 0);

    return wrap;
  }

  // 10. Verdict & Ending Screen
  renderVerdictScreen() {
    const wrap = document.createElement('div');
    const verdict = this.gm.finalVerdict;
    if (!verdict) {
      this.gm.screen = 'office';
      this.render();
      return wrap;
    }

    const scene = document.createElement('div');
    scene.className = 'scene-container';
    scene.style.backgroundImage = "url('./assets/office-rebuild.jpg')";
    scene.innerHTML = `
      <div class="scene-overlay">
        <div>
          <h2>2028년 1월 최종 정책 평가</h2>
          <p>1년간의 무역 정책 총결산 및 대한민국 정부의 최종 신임 판정</p>
        </div>
      </div>
    `;
    wrap.appendChild(scene);

    // Commemorative Newspaper
    const paper = document.createElement('article');
    paper.className = 'front-page';
    paper.innerHTML = `
      <header>
        <img src="./assets/joongang-logo.png" alt="중앙일보" class="joongang-logo-img">
        <div class="front-meta">
          <span>${verdict.dateStr}</span>
          <span>THE JOONGANG</span>
          <span>신년 특별 호외</span>
        </div>
      </header>

      <div style="text-align: center; margin: 10px 0;">
        <span class="status-pill" style="font-size: 13px; font-weight: 800; background: rgba(177, 145, 88, 0.2); border-color: var(--gold);">${verdict.badge}</span>
      </div>

      <h1 class="main-headline" style="text-align: center;">${verdict.headline}</h1>
      <div class="front-deck" style="text-align: center;">${verdict.deck}</div>

      <div class="panel" style="background: var(--paper-card); border-left: 4px solid var(--gold); margin: 20px 0;">
        <h3 style="font-family: var(--font-display); font-size: 22px; color: var(--navy); border: 0; padding: 0; margin-bottom: 8px;">
          최종 엔딩: ${verdict.title}
        </h3>
        <p style="font-size: 15px; line-height: 1.7; color: #222;">${verdict.description}</p>
        ${verdict.structuralLegacy ? `
          <div style="margin-top: 12px; padding: 12px; background: rgba(255,255,255,0.7); border-radius: 4px; border-left: 3px solid var(--navy); font-size: 13px; line-height: 1.6; color: #333;">
            <strong style="color: var(--navy); display: block; margin-bottom: 4px;">🏛️ 1년간의 정책이 남긴 대한민국 산업 구조적 유산 (Structural Legacy):</strong>
            ${verdict.structuralLegacy}
          </div>
        ` : ''}
      </div>

      <!-- Industry & Policy Highlights -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin: 20px 0;">
        ${verdict.bestIndustry ? `
          <div style="background: rgba(37, 107, 79, 0.08); border: 1px solid var(--green); border-radius: 6px; padding: 12px;">
            <span class="status-pill" style="background: var(--green); color: #fff; font-size: 10px;">🏆 연간 최우수 성장 산업 (Best Industry)</span>
            <h4 style="font-size: 16px; margin: 6px 0 2px; color: var(--navy);">${verdict.bestIndustry.name}</h4>
            <div style="font-size: 12px; color: #333;">성장률: <b style="color: var(--green);">+${verdict.bestIndustry.yoyGrowth || 0}%</b> · 총수출 견인</div>
          </div>
        ` : ''}
        ${verdict.worstIndustry ? `
          <div style="background: rgba(175, 81, 71, 0.08); border: 1px solid var(--red); border-radius: 6px; padding: 12px;">
            <span class="status-pill" style="background: var(--red); color: #fff; font-size: 10px;">⚠️ 연간 최대 고전 산업 (Worst Industry)</span>
            <h4 style="font-size: 16px; margin: 6px 0 2px; color: var(--navy);">${verdict.worstIndustry.name}</h4>
            <div style="font-size: 12px; color: #333;">성장률: <b style="color: var(--red);">${verdict.worstIndustry.yoyGrowth || 0}%</b> · 통상 장벽 타격</div>
          </div>
        ` : ''}
        ${verdict.topPolicy ? `
          <div style="background: var(--white); border: 1px solid var(--line); border-radius: 6px; padding: 12px;">
            <span class="status-pill" style="background: var(--navy); color: #fff; font-size: 10px;">⭐ 최대 성과 정책 (Top Performing Policy)</span>
            <h4 style="font-size: 15px; margin: 6px 0 2px; color: var(--navy);">${verdict.topPolicy.name}</h4>
            <div style="font-size: 12px; color: #555;">${verdict.topPolicy.desc}</div>
          </div>
        ` : ''}
        ${verdict.worstPolicy ? `
          <div style="background: var(--white); border: 1px solid var(--line); border-radius: 6px; padding: 12px;">
            <span class="status-pill" style="background: #666; color: #fff; font-size: 10px;">📉 최대 부작용 정책 (Highest Cost Policy)</span>
            <h4 style="font-size: 15px; margin: 6px 0 2px; color: #444;">${verdict.worstPolicy.name}</h4>
            <div style="font-size: 12px; color: #555;">${verdict.worstPolicy.desc}</div>
          </div>
        ` : ''}
      </div>

      <!-- 3 Key Defining Decisions of the Tenure -->
      ${verdict.keyDecisions && verdict.keyDecisions.length > 0 ? `
        <div class="panel" style="background: var(--white); border: 1px solid var(--line); border-radius: 6px; padding: 16px; margin: 20px 0; text-align: left;">
          <h3 style="font-family: var(--font-display); font-size: 18px; color: var(--navy); border: 0; padding: 0; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>🧭</span> <span>1년간의 3대 핵심 결단 (3 Key Defining Decisions)</span>
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px;">
            ${verdict.keyDecisions.map((kd, idx) => `
              <div style="background: #fbf9f5; border: 1px solid var(--line); border-left: 3px solid var(--gold); border-radius: 4px; padding: 12px;">
                <span class="status-pill" style="font-size: 10px; margin-bottom: 6px; display: inline-block;">결단 ${idx + 1}</span>
                <strong style="color: var(--navy); display: block; font-size: 14px; margin-bottom: 4px;">${kd.title}</strong>
                <p style="font-size: 12px; color: #444; margin: 0 0 6px; line-height: 1.5;">${kd.summary}</p>
                <div style="font-size: 11px; color: var(--green); font-weight: 700;">파급효과: ${kd.impact}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="front-figures-box" style="margin: 20px 0;">
        <h4>2027년 연간 종합 통상 성적표 (Scorecard)</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
          ${verdict.scoreCard.map(sc => `
            <div style="background: var(--white); padding: 10px; border-radius: 4px; border: 1px solid var(--line);">
              <small style="color: var(--muted); display: block;">${sc.label}</small>
              <strong style="font-size: 16px; color: var(--navy);">${sc.value}</strong>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
        <button class="primary" id="btn-replay-game" style="font-size: 16px; padding: 12px 36px;">다시 플레이하기 (새 게임)</button>
        <button class="secondary" id="btn-replay-new-doctrine" style="font-size: 16px; padding: 12px 28px;">다른 독트린으로 재도전 ⚙️</button>
        <button class="secondary" id="btn-title-return" style="font-size: 16px;">타이틀 화면으로</button>
      </div>
    `;
    wrap.appendChild(paper);

    setTimeout(() => {
      const btnReplay = document.getElementById('btn-replay-game');
      if (btnReplay) btnReplay.onclick = () => {
        StorageManager.clear();
        this.gm.screen = 'scenario_select';
        this.render();
      };
      const btnDoctrineReplay = document.getElementById('btn-replay-new-doctrine');
      if (btnDoctrineReplay) btnDoctrineReplay.onclick = () => {
        StorageManager.clear();
        this.gm.screen = 'scenario_select';
        this.render();
      };
      const btnTitle = document.getElementById('btn-title-return');
      if (btnTitle) btnTitle.onclick = () => {
        StorageManager.clear();
        this.gm.screen = 'title';
        this.render();
      };
    }, 0);

    return wrap;
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new UIManager();
});
