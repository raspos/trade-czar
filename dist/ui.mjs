// dist/ui.mjs - Minimalist Presentation Manager for TRADE CZAR 2.0
import { GameManager } from './game.mjs';
import { StorageManager } from './storage.mjs';

export class UIManager {
  constructor() {
    this.gm = new GameManager();
    this.appEl = document.getElementById('app');
    this.statusModalOpen = false;

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.appEl) return;
    this.appEl.innerHTML = '';

    switch (this.gm.screen) {
      case 'title':
        this.appEl.appendChild(this.renderTitleScreen());
        break;
      case 'game':
        this.appEl.appendChild(this.renderGameScreen());
        break;
      case 'newspaper':
        this.appEl.appendChild(this.renderNewspaperScreen());
        break;
      case 'verdict':
        this.appEl.appendChild(this.renderVerdictScreen());
        break;
      default:
        this.appEl.appendChild(this.renderTitleScreen());
    }

    if (this.statusModalOpen) {
      this.appEl.appendChild(this.renderStatusModal());
    }
  }

  // 1. Title Screen (Minimalist: Title, Motto, Inaugurate, Continue)
  renderTitleScreen() {
    const wrap = document.createElement('div');
    wrap.className = 'title-container';

    const hasSave = StorageManager.hasSave();

    wrap.innerHTML = `
      <div class="title-masthead">
        <h1 class="title-main">통상교섭본부장</h1>
        <div class="title-sub">TRADE CZAR</div>
        <p class="title-motto">대한민국의 무역과 미래가 당신의 결정에 달려 있다.</p>
      </div>
      <div class="title-actions">
        <button id="btn-inaugurate" class="btn-primary">취임하기</button>
        ${hasSave ? '<button id="btn-continue" class="btn-secondary">이어하기</button>' : ''}
      </div>
    `;

    setTimeout(() => {
      const btnInaugurate = wrap.querySelector('#btn-inaugurate');
      if (btnInaugurate) {
        btnInaugurate.onclick = () => {
          this.gm.newGame();
          this.render();
        };
      }

      const btnContinue = wrap.querySelector('#btn-continue');
      if (btnContinue) {
        btnContinue.onclick = () => {
          if (this.gm.loadGame()) {
            this.render();
          } else {
            this.gm.newGame();
            this.render();
          }
        };
      }
    }, 0);

    return wrap;
  }

  // 2. Game Screen (Strictly 5 Elements)
  renderGameScreen() {
    const wrap = document.createElement('div');
    wrap.className = 'game-container';

    const res = this.gm.latestMonthlyResult;
    const stats = this.gm.politics.stats;
    const event = this.gm.currentEvent;

    const cumExport = res ? Math.round(res.cumulativeExport) : 542;
    const cumBalance = res ? Math.round(res.cumulativeBalance) : 28;
    const publicApproval = Math.round(stats.publicApproval);
    const presidentTrust = Math.round(stats.presidentTrust);

    wrap.innerHTML = `
      <!-- Element 1: Header / Date & Term -->
      <header class="game-header">
        <div class="game-role">통상교섭본부장</div>
        <div class="game-date-tools">
          <span class="game-date">2027년 ${this.gm.currentMonth}월 · ${this.gm.currentMonth}/12개월</span>
          <button class="btn-text-link" id="btn-open-status">상세 지표</button>
        </div>
      </header>

      <!-- Element 2: 4 Core National Metrics -->
      <div class="metrics-row">
        <div class="metric-item">
          <span class="metric-label">누적 수출</span>
          <span class="metric-val">${cumExport}억 달러</span>
        </div>
        <div class="metric-item">
          <span class="metric-label">무역수지</span>
          <span class="metric-val">${cumBalance >= 0 ? '+' : ''}${cumBalance}억 달러</span>
        </div>
        <div class="metric-item">
          <span class="metric-label">국민 지지율</span>
          <span class="metric-val">${publicApproval}%</span>
        </div>
        <div class="metric-item">
          <span class="metric-label">대통령 신임</span>
          <span class="metric-val">${presidentTrust}%</span>
        </div>
      </div>

      <!-- Element 3: Event Representative Image -->
      <div class="event-image-frame">
        <img src="${event.image}" alt="${event.title}" />
      </div>

      <!-- Element 4: Event Title & Short Description -->
      <div class="event-narrative">
        <h2 class="event-title">${event.title}</h2>
        <p class="event-desc">${event.desc}</p>
      </div>

      <!-- Element 5: Player's Choices / Immediate Reaction -->
      ${this.gm.chosenChoice ? `
        <div class="feedback-box">
          <p class="feedback-quote">${this.gm.chosenChoice.feedback || ''}</p>
        </div>
        <button id="btn-view-newspaper" class="btn-primary">이달의 중앙일보 1면 확인</button>
      ` : `
        <div class="choices-list">
          ${event.choices.map(c => `
            <button class="choice-btn" data-cid="${c.id}">
              <span class="choice-bullet">·</span>
              <span>${c.text}</span>
            </button>
          `).join('')}
        </div>
      `}
    `;

    setTimeout(() => {
      // Choice click
      wrap.querySelectorAll('.choice-btn').forEach(btn => {
        btn.onclick = () => {
          const cid = btn.getAttribute('data-cid');
          this.gm.chooseOption(cid);
          this.render();
        };
      });

      // View newspaper
      const btnViewNews = wrap.querySelector('#btn-view-newspaper');
      if (btnViewNews) {
        btnViewNews.onclick = () => {
          this.gm.advanceToNewspaper();
          this.render();
        };
      }

      // Open status modal
      const btnOpenStatus = wrap.querySelector('#btn-open-status');
      if (btnOpenStatus) {
        btnOpenStatus.onclick = () => {
          this.statusModalOpen = true;
          this.render();
        };
      }
    }, 0);

    return wrap;
  }

  // 3. JoongAng Ilbo Newspaper Screen
  renderNewspaperScreen() {
    const wrap = document.createElement('div');
    const news = this.gm.latestNewspaper;
    const res = this.gm.latestMonthlyResult;

    const monthExp = res ? res.export.toFixed(1) : "54.2";
    const monthBal = res ? res.balance.toFixed(1) : "2.8";
    const exchangeRate = res ? Math.round(res.exchangeRate) : 1335;
    const kospi = res ? Math.round(res.kospi) : 2580;

    wrap.innerHTML = `
      <div class="newspaper-wrapper">
        <div class="newspaper-masthead">
          <img src="./assets/joongang-logo.png" alt="중앙일보" class="newspaper-logo-img" />
          <div class="newspaper-meta">2027년 ${this.gm.currentMonth}월 조간 · 제${21450 + this.gm.currentMonth}호</div>
        </div>
        <h1 class="newspaper-headline">${news.headline}</h1>
        ${news.deck ? `<div class="newspaper-deck">${news.deck}</div>` : ''}
        <div class="newspaper-lead-image">
          <img src="${news.leadImage || './assets/office-rebuild.jpg'}" alt="보도 사진" />
        </div>
        <div class="newspaper-body-text">
          ${news.body.join('<br><br>')}
        </div>
        <div class="newspaper-numbers-strip">
          <span>당월 수출: <strong>${monthExp}억 달러</strong></span>
          <span>당월 수지: <strong>${Number(monthBal) >= 0 ? '+' : ''}${monthBal}억 달러</strong></span>
          <span>원/달러 환율: <strong>${exchangeRate}원</strong></span>
          <span>코스피: <strong>${kospi}p</strong></span>
        </div>
      </div>
      <button id="btn-next-month" class="btn-primary">
        ${this.gm.isDismissed ? '경질 통보 확인' : (this.gm.currentMonth >= 12 ? '임기 최종 결산 확인' : '다음 달 집무 진행')}
      </button>
    `;

    setTimeout(() => {
      const btnNext = wrap.querySelector('#btn-next-month');
      if (btnNext) {
        btnNext.onclick = () => {
          this.gm.advanceMonth();
          this.render();
        };
      }
    }, 0);

    return wrap;
  }

  // 4. Detailed Status Modal (Clean, Minimalist Ledger)
  renderStatusModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    const partners = this.gm.economy.partnerStates;
    const industries = this.gm.economy.industryStates;
    const res = this.gm.latestMonthlyResult;

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">대한민국 통상 및 산업 상세 지표</h3>
          <button class="btn-text-link" id="btn-close-status">닫기 ✕</button>
        </div>

        <div class="modal-section-title">주요 교역국 수출 실적 및 관세율</div>
        <div class="modal-grid-2">
          ${Object.values(partners).map(p => `
            <div class="modal-data-row">
              <span>${p.name}</span>
              <strong>관계: ${Math.round(p.relations)} / 관세: ${(p.tariffs.general * 100).toFixed(1)}%</strong>
            </div>
          `).join('')}
        </div>

        <div class="modal-section-title">6대 주력 수출 산업 가동 현황</div>
        <div class="modal-grid-2">
          ${Object.values(industries).slice(0, 6).map(ind => `
            <div class="modal-data-row">
              <span>${ind.name}</span>
              <strong>가동률: ${Math.round(ind.utilizationRate)}%</strong>
            </div>
          `).join('')}
        </div>

        <div class="modal-section-title">거시 경제 지표</div>
        <div class="modal-grid-2">
          <div class="modal-data-row">
            <span>원/달러 환율</span>
            <strong>${res ? Math.round(res.exchangeRate) : 1335}원</strong>
          </div>
          <div class="modal-data-row">
            <span>코스피 지수</span>
            <strong>${res ? Math.round(res.kospi) : 2580}p</strong>
          </div>
        </div>

        <div style="margin-top: 24px;">
          <button id="btn-close-status-bottom" class="btn-secondary">닫기</button>
        </div>
      </div>
    `;

    setTimeout(() => {
      const close = () => {
        this.statusModalOpen = false;
        this.render();
      };
      const btn1 = modal.querySelector('#btn-close-status');
      const btn2 = modal.querySelector('#btn-close-status-bottom');
      if (btn1) btn1.onclick = close;
      if (btn2) btn2.onclick = close;
    }, 0);

    return modal;
  }

  // 5. Verdict / Ending Screen
  renderVerdictScreen() {
    const wrap = document.createElement('div');
    wrap.className = 'verdict-container';

    const v = this.gm.finalVerdict || {
      title: "통상교섭본부장 퇴임",
      grade: "우수",
      epilogue: "12개월의 통상 전쟁을 완주했다.",
      totalExport: "670.0",
      totalBalance: "32.0",
      publicApproval: 52,
      presidentTrust: 65,
      monthsServed: 12
    };

    wrap.innerHTML = `
      <div class="verdict-header">
        <div class="verdict-badge">통상교섭본부장 최종 평가서</div>
        <h1 class="verdict-title">${v.title}</h1>
      </div>

      <div class="verdict-summary-card">
        <div class="verdict-numbers-grid">
          <div>
            <span class="metric-label">재임 기간</span>
            <div class="metric-val">${v.monthsServed}개월</div>
          </div>
          <div>
            <span class="metric-label">누적 총수출</span>
            <div class="metric-val">${v.totalExport}억 달러</div>
          </div>
          <div>
            <span class="metric-label">누적 무역수지</span>
            <div class="metric-val">${Number(v.totalBalance) >= 0 ? '+' : ''}${v.totalBalance}억 달러</div>
          </div>
        </div>
        <p class="verdict-epilogue">${v.epilogue}</p>
      </div>

      <button id="btn-restart" class="btn-primary">처음부터 다시하기</button>
    `;

    setTimeout(() => {
      const btnRestart = wrap.querySelector('#btn-restart');
      if (btnRestart) {
        btnRestart.onclick = () => {
          StorageManager.clear();
          this.gm = new GameManager();
          this.render();
        };
      }
    }, 0);

    return wrap;
  }
}

// Auto mount
document.addEventListener('DOMContentLoaded', () => {
  window.tradeCzarUI = new UIManager();
});
