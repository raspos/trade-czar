// ui.mjs - Complete UI Presentation & Interactive State Manager for 통상교섭본부장 | TRADE CZAR

import { GameManager } from './game.mjs';
import { SCENARIOS } from './scenarios.mjs';
import { ORIGINS, INDUSTRIES, PARTNERS } from './constants.mjs';
import { POLICY_ACTIONS } from './policies.mjs';
import { CORPORATIONS } from './corporations.mjs';
import { StorageManager } from './storage.mjs';

class UIManager {
  constructor() {
    this.gm = new GameManager();
    this.appEl = document.getElementById('app');
    this.pendingOrigin = 'bureaucrat';
    this.pendingScenario = 'baseline';
    this.activePolicyTab = 'corporate'; // corporate, government, negotiation

    this.init();
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

    // Render Masthead Header
    const mast = this.renderMasthead();
    this.appEl.appendChild(mast);

    const main = document.createElement('main');
    main.className = 'shell';

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
          <span>⚡ 행동력:</span> <strong>${this.gm.actionPoints} / 3</strong>
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

  // 1. Title Screen
  renderTitleScreen() {
    const wrap = document.createElement('div');
    wrap.style.paddingTop = '24px';

    const hero = document.createElement('section');
    hero.className = 'hero';
    hero.innerHTML = `
      <div class="hero-copy">
        <span class="eyebrow">대한민국 경제 전략 시뮬레이션</span>
        <h1>통상교섭본부장</h1>
        <p>"12번의 무역 성적표, 대한민국 산업의 운명이 결정된다."</p>
        <p style="font-size: 13px; color: var(--gold-light);">실제 관세청 수출입 데이터를 바탕으로 반도체, 자동차, 조선 등 10대 주력 산업을 지휘하고 미국·중국과의 통상 담판을 이끄십시오.</p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="primary" id="btn-new-game" style="font-size: 16px; padding: 12px 26px;">새 임기 시작</button>
          ${StorageManager.hasSave() ? '<button class="secondary" id="btn-continue" style="font-size: 16px;">이전 임기 이어하기</button>' : ''}
        </div>
      </div>
      <div class="hero-art"></div>
    `;
    wrap.appendChild(hero);

    // Scenario feature boxes
    const grid = document.createElement('div');
    grid.className = 'office-grid';
    grid.innerHTML = `
      <div class="office-card">
        <div class="icon-head">📊</div>
        <h3>실제 무역 데이터 기반</h3>
        <p>관세청과 산업통상부 2026년 기준선 수출입 데이터를 토대로 10대 산업과 7대 교역국의 수치를 오차 없이 정밀 시뮬레이션합니다.</p>
      </div>
      <div class="office-card">
        <div class="icon-head">🤝</div>
        <h3>인터랙티브 통상 담판</h3>
        <p>미국의 25% 자동차 관세 폭탄과 중국의 핵심 희토류 통제에 맞서 고위급 양자 협상 테이블에서 치열한 카드 수 싸움을 벌입니다.</p>
      </div>
      <div class="office-card">
        <div class="icon-head">📰</div>
        <h3>가상 중앙일보 1면 보도</h3>
        <p>매월 확정된 수출입 성적표와 정책 파급효과가 중앙일보 가상 1면 헤드라인과 분석 기사로 생생하게 발행됩니다.</p>
      </div>
    `;
    wrap.appendChild(grid);

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
    }, 0);

    return wrap;
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
    const scene = document.createElement('div');
    scene.className = 'scene-container';
    scene.style.backgroundImage = "url('./assets/office-trade.jpg')";
    scene.innerHTML = `
      <div class="scene-overlay">
        <div>
          <h2>통상교섭본부장 집무실</h2>
          <p>정부서울청사 별관 · 2027년 ${this.gm.currentMonth}월 정책 턴 (${this.gm.actionPoints} / 3 행동력 잔여)</p>
        </div>
      </div>
    `;
    wrap.appendChild(scene);

    // Active random event modal trigger if present
    if (this.gm.activeEvent) {
      const evtCard = document.createElement('div');
      evtCard.className = 'panel';
      evtCard.style.borderLeft = '5px solid var(--red)';
      evtCard.style.background = '#fefcf8';
      evtCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <span class="status-pill" style="background: rgba(175, 81, 71, 0.15); color: var(--red); font-weight: 800;">🚨 ${this.gm.activeEvent.categoryName} 긴급 현안</span>
          <small style="color: var(--muted);">${this.gm.currentMonth}월 발생</small>
        </div>
        <h3 style="font-family: var(--font-serif); font-size: 20px; margin-bottom: 8px; color: var(--navy); border: 0; padding: 0;">${this.gm.activeEvent.title}</h3>
        <p style="font-size: 14px; line-height: 1.6; margin-bottom: 16px; color: #333;">${this.gm.activeEvent.description}</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${this.gm.activeEvent.choices.map((c, idx) => `
            <button class="secondary btn-event-choice" data-choice="${idx}" style="text-align: left; padding: 12px 14px; border: 1px solid var(--line);">
              <strong>선택 ${idx + 1}.</strong> ${c.text}
            </button>
          `).join('')}
        </div>
      `;
      wrap.appendChild(evtCard);
      setTimeout(() => {
        wrap.querySelectorAll('.btn-event-choice').forEach(btn => {
          btn.onclick = () => {
            const idx = Number(btn.getAttribute('data-choice'));
            this.gm.resolveEventChoice(idx);
            this.render();
          };
        });
      }, 0);
    }

    // Dismissal Warning alert
    if (this.gm.politics && this.gm.politics.dismissalWarning) {
      const warnAlert = document.createElement('div');
      warnAlert.className = 'panel';
      warnAlert.style.borderLeft = '5px solid var(--red)';
      warnAlert.style.background = '#fff5f5';
      warnAlert.innerHTML = `
        <strong style="color: var(--red); font-size: 15px;">⚠️ 대통령실 경고: 조기 경질 위기!</strong>
        <p style="font-size: 13px; margin: 4px 0 0; color: #661010;">연속된 무역수지 적자와 대통령 신임도 추락으로 경질 위기에 몰렸습니다. 즉각적인 흑자 반전 대책이 요구됩니다.</p>
      `;
      wrap.appendChild(warnAlert);
    }

    // Interactive Office Objects Grid
    const officeGrid = document.createElement('div');
    officeGrid.className = 'office-grid';

    officeGrid.innerHTML = `
      <div class="office-card" id="obj-war-room" style="cursor: pointer;">
        <div class="icon-head">🖥️</div>
        <h3>무역상황 모니터</h3>
        <p>10대 주력 산업 및 7대 교역국의 실시간 수출입 수치, 가동률, 관세 장벽, 환율과 유가 지표를 종합 분석합니다.</p>
        <button class="secondary" style="width: 100%;">상황실 입장 →</button>
      </div>

      <div class="office-card" id="obj-policies" style="cursor: pointer;">
        <div class="icon-head">📁</div>
        <h3>월간 정책 결재함</h3>
        <p>기업 관리, 정부 무역금융, 규제 완화 등 이번 달 3회의 핵심 정책 행동을 결재하고 지연 파급효과를 확인합니다.</p>
        <button class="primary" style="width: 100%;">정책 집행 (${this.gm.actionPoints} AP) →</button>
      </div>

      <div class="office-card" id="obj-nego-us" style="cursor: pointer;">
        <div class="icon-head">🤝</div>
        <h3>대미 통상 협상 훈령</h3>
        <p>미국의 25% 자동차 관세 폭탄을 방어하기 위한 워싱턴 고위급 양자 담판 테이블로 즉각 직행합니다.</p>
        <button class="secondary" style="width: 100%;">대미 협상 시작 →</button>
      </div>

      <div class="office-card" id="obj-president-call" style="cursor: pointer;">
        <div class="icon-head">📞</div>
        <h3>대통령 직통 핫라인</h3>
        <p>용산 대통령실의 신임도(${this.gm.politics.stats.presidentTrust})와 대통령의 특별 지시 사항을 확인합니다.</p>
        <button class="secondary" style="width: 100%;">지시 사항 열람 →</button>
      </div>

      <div class="office-card" id="obj-corp-dialogue" style="cursor: pointer;">
        <div class="icon-head">💼</div>
        <h3>10대 기업 간담회 연락망</h3>
        <p>삼성, 현대차, SK, 포스코, 조선 3사 등 주요 기업들의 현장 건의사항과 수출 애로를 청취합니다.</p>
        <button class="secondary" style="width: 100%;">기업 건의 열람 →</button>
      </div>

      <div class="office-card" id="obj-newspaper-archive" style="cursor: pointer;">
        <div class="icon-head">📰</div>
        <h3>중앙일보 조간 지면</h3>
        <p>지난달 무역 성적표를 보도한 가상 중앙일보 1면 헤드라인과 분석 기사를 다시 확인합니다.</p>
        <button class="secondary" style="width: 100%;" ${!this.gm.latestNewspaper ? 'disabled' : ''}>1면 지면 보기 →</button>
      </div>
    `;
    wrap.appendChild(officeGrid);

    // Monthly advance action banner
    const actionBanner = document.createElement('div');
    actionBanner.className = 'panel';
    actionBanner.style.textAlign = 'center';
    actionBanner.style.background = 'var(--paper-card)';
    actionBanner.innerHTML = `
      <h3 style="border: 0; padding: 0; margin-bottom: 6px;">2027년 ${this.gm.currentMonth}월 정책 수립 완료</h3>
      <p style="font-size: 14px; color: var(--muted); margin-bottom: 16px;">행동력을 모두 사용했거나 이번 달 정책 결정을 마쳤다면, 경제 시뮬레이션을 실행하여 이달의 무역 성적표를 확정하십시오.</p>
      <button class="primary" id="btn-advance-month" style="font-size: 16px; padding: 12px 36px;">
        ${this.gm.currentMonth}월 수출입 실적 확정 및 성적표 발표 →
      </button>
    `;
    wrap.appendChild(actionBanner);

    setTimeout(() => {
      document.getElementById('obj-war-room').onclick = () => { this.gm.screen = 'war_room'; this.render(); };
      document.getElementById('obj-policies').onclick = () => { this.gm.screen = 'policies'; this.render(); };
      document.getElementById('obj-nego-us').onclick = () => { this.gm.executePolicy('nego_us_bilateral'); this.render(); };
      document.getElementById('obj-president-call').onclick = () => {
        alert(`[대통령실 지시]\n\n"${this.gm.scenario.presidentMandate}"\n\n대통령 신임도: ${this.gm.politics.stats.presidentTrust}점 / 100점`);
      };
      document.getElementById('obj-corp-dialogue').onclick = () => {
        const text = CORPORATIONS.map(c => `• [${c.name}] (${c.leader}): ${c.demands[0].text}`).join('\n\n');
        alert(`[10대 기업 현장 애로사항 건의]\n\n${text}`);
      };
      const btnNews = document.getElementById('obj-newspaper-archive');
      if (btnNews && this.gm.latestNewspaper) btnNews.onclick = () => { this.gm.screen = 'newspaper'; this.render(); };

      const btnAdv = document.getElementById('btn-advance-month');
      if (btnAdv) btnAdv.onclick = () => {
        this.gm.advanceTurn();
        this.render();
      };
    }, 0);

    return wrap;
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
          <p style="font-size: 13px; color: var(--muted);">이번 달 가용한 행동력: <strong>${this.gm.actionPoints} / 3</strong></p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="secondary tab-btn ${this.activePolicyTab === 'corporate' ? 'primary' : ''}" data-tab="corporate">기업 관리</button>
          <button class="secondary tab-btn ${this.activePolicyTab === 'government' ? 'primary' : ''}" data-tab="government">정부 정책</button>
          <button class="secondary tab-btn ${this.activePolicyTab === 'negotiation' ? 'primary' : ''}" data-tab="negotiation">통상 협상</button>
        </div>
      </div>
    `;
    wrap.appendChild(header);

    // List policies of active tab
    const filtered = POLICY_ACTIONS.filter(p => p.category === this.activePolicyTab);

    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '14px';

    filtered.forEach(policy => {
      const isUsed = this.gm.usedPoliciesThisMonth.includes(policy.id);
      const noAP = this.gm.actionPoints <= 0;

      const card = document.createElement('div');
      card.className = 'panel';
      card.style.marginBottom = '0';
      card.style.borderLeft = isUsed ? '4px solid var(--muted)' : '4px solid var(--gold)';
      card.style.opacity = isUsed ? '0.6' : '1';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <span class="status-pill">${policy.categoryName}</span>
          ${isUsed ? '<span style="color: var(--muted); font-size: 12px; font-weight: 700;">✓ 당월 집행 완료</span>' : '<span style="color: var(--gold); font-size: 12px; font-weight: 700;">소모: 1 행동력</span>'}
        </div>
        <h3 style="border: 0; padding: 0; margin-bottom: 8px; font-size: 18px;">${policy.title}</h3>
        <p style="font-size: 14px; color: #444; margin-bottom: 12px; line-height: 1.6;">${policy.description}</p>
        <div style="background: rgba(177, 145, 88, 0.08); padding: 10px 14px; border-radius: 4px; font-size: 13px; margin-bottom: 16px;">
          <b>기대 효과 및 부작용:</b> ${policy.costText}
        </div>
        <div>
          <button class="primary btn-execute-policy" data-pid="${policy.id}" ${isUsed || noAP ? 'disabled' : ''}>
            ${policy.isNegotiationLaunch ? '협상장 입장 →' : '정책 결재 및 집행'}
          </button>
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
          this.gm.executePolicy(pid);
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

    // Left Column: Intelligence, Demands, and Dialogue Stage
    const leftCol = document.createElement('div');
    leftCol.className = 'negotiation-stage';
    leftCol.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
        <span class="eyebrow" style="color: var(--gold-light);">BILATERAL SUMMIT</span>
        <span style="font-size: 13px;">협상 타결 점수: <strong>${nego.totalScore} / 60</strong></span>
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
        <small style="font-size: 11px; color: #aaa;">긴장도가 95%를 초과하면 협상이 자동 결렬됩니다.</small>
      </div>

      <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 6px; margin: 16px 0; font-size: 13px; line-height: 1.6; border-left: 3px solid var(--gold);">
        <strong style="color: var(--gold-light);">🕵️ ${nego.scenario.intelReport}</strong>
      </div>

      <div style="margin-top: 16px;">
        <h4 style="font-size: 13px; color: var(--gold-light); margin-bottom: 8px;">상대국 요구안:</h4>
        <ul style="font-size: 12px; padding-left: 18px; color: #ddd; line-height: 1.7;">
          ${nego.scenario.partnerDemands.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      ${nego.history.length > 0 ? `
        <div style="margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 14px;">
          <h4 style="font-size: 13px; color: var(--gold-light); margin-bottom: 8px;">최근 대화 기록:</h4>
          <div style="font-size: 13px; font-style: italic; color: #e5e5e5; background: rgba(255,255,255,0.06); padding: 10px; border-radius: 4px;">
            ${nego.history[nego.history.length - 1].partnerReaction}
          </div>
        </div>
      ` : ''}
    `;
    stageWrap.appendChild(leftCol);

    // Right Column: Hand of Strategic Cards
    const rightCol = document.createElement('div');
    rightCol.innerHTML = `
      <div class="panel" style="margin-bottom: 16px;">
        <h3 style="border: 0; padding: 0; margin-bottom: 12px; font-size: 18px;">한국 측 협상 카드 선택</h3>
        <p style="font-size: 13px; color: var(--muted); margin-bottom: 16px;">원하는 협상 카드를 제시하여 상대국의 수용도를 높이고 긴장도를 관리하십시오.</p>
        <div class="negotiation-cards">
          ${nego.scenario.cards.map(card => {
            const isUsed = nego.usedCards.has(card.id);
            return `
              <button class="negotiation-card-btn btn-play-card" data-cid="${card.id}" ${isUsed ? 'disabled' : ''}>
                <strong>${card.name}</strong>
                <p>${card.text}</p>
                <div style="display: flex; justify-content: space-between; font-size: 11px;">
                  <span style="color: var(--navy); font-weight: 700;">비용: ${card.cost}</span>
                  <small style="color: ${card.acceptanceScore >= 25 ? 'var(--green)' : 'var(--gold)'};">예상 수용도: +${card.acceptanceScore}pt</small>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div style="background: var(--white); border: 1px solid var(--line); border-radius: 6px; padding: 16px; display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="primary" id="btn-conclude-agree" style="flex: 1;">타결안 서명 시도</button>
          <button class="secondary" id="btn-conclude-defer" style="flex: 1;">협상 3개월 유예</button>
          <button class="danger" id="btn-conclude-break" style="flex: 1;">협상 결렬 감수</button>
        </div>
        <small style="color: var(--muted); font-size: 11px; text-align: center;">타결을 위해서는 점수 60점 이상, 긴장도 60% 이하가 권장됩니다.</small>
      </div>
    `;
    stageWrap.appendChild(rightCol);

    wrap.appendChild(stageWrap);

    setTimeout(() => {
      wrap.querySelectorAll('.btn-play-card').forEach(btn => {
        btn.onclick = () => {
          const cid = btn.getAttribute('data-cid');
          nego.playCard(cid);
          this.render();
        };
      });
      const btnAgree = document.getElementById('btn-conclude-agree');
      if (btnAgree) btnAgree.onclick = () => {
        const res = this.gm.concludeNegotiation('agree');
        alert(`[협상 결과 보고]\n\n${res.grade}\n\n${res.text}`);
        this.render();
      };
      const btnDefer = document.getElementById('btn-conclude-defer');
      if (btnDefer) btnDefer.onclick = () => {
        const res = this.gm.concludeNegotiation('defer');
        alert(`[협상 결과 보고]\n\n${res.grade}\n\n${res.text}`);
        this.render();
      };
      const btnBreak = document.getElementById('btn-conclude-break');
      if (btnBreak) btnBreak.onclick = () => {
        if (confirm('정말로 협상을 결렬시키겠습니까? 상대국의 즉각적인 보복 관세가 발효될 수 있습니다.')) {
          const res = this.gm.concludeNegotiation('breakdown');
          alert(`[협상 결과 보고]\n\n${res.grade}\n\n${res.text}`);
          this.render();
        }
      };
    }, 0);

    return wrap;
  }

  // 8. Result Briefing Screen
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
          <h2>2027년 ${res.month}월 수출입 동향 공식 브리핑</h2>
          <p>정부서울청사 본관 브리핑룸 · 관세청 및 산업통상부 공동 발표</p>
        </div>
      </div>
    `;
    wrap.appendChild(scene);

    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.style.textAlign = 'center';
    panel.innerHTML = `
      <span class="eyebrow" style="color: var(--gold); font-weight: 800;">OFFICIAL TRADE REPORT</span>
      <h3 style="border: 0; padding: 0; font-size: 26px; margin: 8px 0 16px;">
        ${res.month}월 무역수지: 
        <span style="color: ${res.balance >= 0 ? 'var(--green)' : 'var(--red)'};">
          ${res.balance >= 0 ? '+' : ''}$${res.balance.toFixed(1)}B 흑자
        </span>
      </h3>
      <div class="metrics-strip">
        <div class="metric-card">
          <small>총수출액</small>
          <strong>$${res.export.toFixed(1)}B</strong>
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
      </div>

      <div style="margin: 24px 0; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
        <button class="primary" id="btn-view-newspaper" style="font-size: 16px; padding: 12px 30px;">
          📰 중앙일보 1면 보도 확인 →
        </button>
      </div>
    `;
    wrap.appendChild(panel);

    setTimeout(() => {
      const btn = document.getElementById('btn-view-newspaper');
      if (btn) btn.onclick = () => {
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
      </div>

      <div class="front-figures-box" style="margin: 20px 0;">
        <h4>2027년 연간 통상 성적표</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
          ${verdict.scoreCard.map(sc => `
            <div style="background: var(--white); padding: 10px; border-radius: 4px; border: 1px solid var(--line);">
              <small style="color: var(--muted); display: block;">${sc.label}</small>
              <strong style="font-size: 16px; color: var(--navy);">${sc.value}</strong>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px; display: flex; justify-content: center; gap: 14px;">
        <button class="primary" id="btn-replay-game" style="font-size: 16px; padding: 12px 36px;">다시 플레이하기 (새 게임)</button>
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
