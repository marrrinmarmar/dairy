// PT Greenfields Indonesia - DairySync AI Main Orchestration Application
window.DairySyncApp = (function () {

  // Web Audio API Synthesized Chimes
  let audioCtx = null;
  function playChime(type = 'click') {
    if (!window.DairySyncData.getState().soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'alert') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Setup modern <dialog closedby="any"> fallback as required by modern-web-guidance
  function setupDialogBackdropFallbacks() {
    document.querySelectorAll('dialog').forEach(dialog => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        dialog.addEventListener('click', (event) => {
          if (event.target !== dialog) return;
          const rect = dialog.getBoundingClientRect();
          const isContent = (
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width
          );
          if (!isContent) {
            dialog.close();
          }
        });
      }
    });
  }

  function renderNavbar() {
    const state = window.DairySyncData.getState();
    const current = state.roles[state.currentRole];
    const rolesList = Object.values(state.roles);
    const icons = window.DairySyncIcons || {};

    return `
      <!-- Persistent Top Navigation Bar (Minimalist Light & Forest Green) -->
      <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Top Row: Brand & Live Status -->
          <div class="flex items-center justify-between h-16">
            <!-- Brand -->
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-950/20">
                ${icons.milk || ''}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-black tracking-widest uppercase text-emerald-900">
                    PT GREENFIELDS INDONESIA
                  </span>
                  <span class="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-mono font-bold">
                    v2.6 PROTOTYPE
                  </span>
                </div>
                <h1 class="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                  DairySync AI <span class="text-slate-400 font-normal hidden sm:inline">• Intelligent Supply Chain & Production Management</span>
                </h1>
              </div>
            </div>

            <!-- Global Action Controls -->
            <div class="flex items-center gap-2 sm:gap-3">
              <!-- Live Factory Virtual Clock -->
              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs shadow-inner">
                <span class="w-2 h-2 rounded-full ${state.virtualClock >= '10:00' ? 'bg-red-500 animate-ping' : 'bg-emerald-600'}"></span>
                <span class="text-slate-500 font-medium hidden sm:inline">Jam Pabrik:</span>
                <span class="font-mono font-bold text-slate-900">${state.virtualClock} WIB</span>
              </div>

              <!-- Simulator Trigger: 10:00 AM Overdue Test -->
              <button onclick="DairySyncData.triggerSimulated10AmCheck();" title="Simulasi Pukul 10:00 (Batch 1 Produksi Belum Konfirmasi)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm animate-pulse">
                <span>⏱️</span> <span class="hidden sm:inline">Uji Jam 10:00 Overdue</span>
              </button>

              <!-- Fast Sound Toggle -->
              <button onclick="DairySyncApp.toggleSound()" title="Toggle Web Audio Feedback" class="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs transition-colors shadow-sm">
                <span id="soundIcon" class="inline-flex">${state.soundEnabled ? (icons.soundOn || '') : (icons.soundOff || '')}</span>
              </button>

              <!-- Universal Trouble Report (Disabled for PM by role policy) -->
              ${state.currentRole !== 'pm' ? `
                <button onclick="DairySyncTrouble.openTroubleModal(); DairySyncApp.playAudio('click');" class="px-3.5 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5">
                  ${icons.alertTriangle || ''} Report Trouble
                </button>
              ` : `
                <button onclick="DairySyncPM.generateExecutiveReport(); DairySyncApp.playAudio('click');" class="px-3.5 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5">
                  ${icons.document || ''} Download Report
                </button>
              `}
            </div>
          </div>

          <!-- Bottom Row: 6 User Role Switcher Ribbon -->
          <div class="py-2 border-t border-slate-100 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            <div class="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mr-2 flex-shrink-0">
              <span class="text-slate-600">${icons.users || ''}</span> ROLE SWITCHER:
            </div>

            <div class="flex items-center gap-1.5 flex-nowrap">
              ${rolesList.map(r => {
                const isActive = r.id === state.currentRole;
                const roleIconSvg = icons[r.icon] || '';
                return `
                  <button 
                    onclick="DairySyncApp.switchRole('${r.id}')"
                    class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      isActive 
                        ? 'bg-emerald-900 text-white shadow-sm ring-1 ring-emerald-950/20' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                    }">
                    <span class="${isActive ? 'text-emerald-200' : 'text-slate-500'}">${roleIconSvg}</span>
                    <span>${r.short}</span>
                    ${isActive ? `<span class="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>` : ''}
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Role Permissions Indicator Badge -->
            <div class="hidden xl:flex items-center gap-2 text-[10px] text-slate-500 pl-3 border-l border-slate-200 flex-shrink-0">
              <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-semibold">${current.code}</span>
              <span class="font-medium">${current.badge}</span>
              ${current.canReport ? `<span class="text-emerald-700 font-semibold">● Input Enabled</span>` : `<span class="text-slate-600 font-medium">● Oversight Only</span>`}
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function renderCurrentView() {
    const state = window.DairySyncData.getState();
    const roleId = state.currentRole;

    if (roleId === 'pm') return window.DairySyncPM.render();
    if (roleId === 'farm') return window.DairySyncFarm.render();
    if (roleId === 'logistics') return window.DairySyncLogistics.render();
    if (roleId === 'lab') return window.DairySyncLab.render();
    if (roleId === 'production') return window.DairySyncProduction.render();
    if (roleId === 'warehouse') return window.DairySyncWarehouse.render();
    return `<div class="text-slate-800 p-8">Unknown View</div>`;
  }

  function render() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;
    const icons = window.DairySyncIcons || {};

    appContainer.innerHTML = `
      ${renderNavbar()}
      
      <!-- Main Content Stage -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- View Title & Breadcrumb -->
        <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div class="text-xs font-mono text-emerald-800 mb-1 flex items-center gap-1.5">
              <span>PT Greenfields Operations Center</span>
              <span class="text-slate-400">/</span>
              <span class="text-slate-600 font-semibold">${window.DairySyncData.getState().roles[window.DairySyncData.getState().currentRole].department}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              ${window.DairySyncData.getState().roles[window.DairySyncData.getState().currentRole].name}
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">
              ${window.DairySyncData.getState().roles[window.DairySyncData.getState().currentRole].description}
            </p>
          </div>

          <!-- Role Action Badges -->
          <div class="flex items-center gap-2">
            ${window.DairySyncData.getState().currentRole === 'pm' ? `
              <span class="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                ${icons.badge || ''} Master Executive Clearance
              </span>
            ` : `
              <span class="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                ${icons.check || ''} Division Field Operational Active
              </span>
            `}
          </div>
        </div>

        <!-- Role View Container -->
        <div id="roleViewContainer">
          ${renderCurrentView()}
        </div>
      </main>

      <!-- Universal Modals -->
      ${DairySyncTrouble.renderTroubleModal(window.DairySyncData.getState().currentRole)}
      ${DairySyncExecutiveReport.renderModal()}
    `;

    // Initialize Maps and Auto-Prompt Dialogs after DOM rendering
    setTimeout(() => {
      const state = window.DairySyncData.getState();
      if (state.currentRole === 'pm') {
        window.DairySyncMap.initPmMap('pmMapContainer');
      } else if (state.currentRole === 'logistics') {
        window.DairySyncMap.initLogisticsMap('logisticsMapContainer');
      }

      // If interactive prompt is active and user is in Production role, auto open modal
      if (state.productionDialogActive && state.currentRole === 'production') {
        if (window.DairySyncSchedule) {
          window.DairySyncSchedule.openInteractivePromptModal('pipe-prd-01');
        }
      }

      setupDialogBackdropFallbacks();
    }, 100);
  }

  function switchRole(roleId) {
    playChime('click');
    window.DairySyncData.setRole(roleId);
  }

  function toggleSound() {
    const isEnabled = window.DairySyncData.toggleSound();
    playChime('click');
    const icon = document.getElementById('soundIcon');
    const icons = window.DairySyncIcons || {};
    if (icon) icon.innerHTML = isEnabled ? (icons.soundOn || '') : (icons.soundOff || '');
  }

  function init() {
    // Subscribe to state updates
    window.DairySyncData.subscribe(() => {
      render();
    });

    // Initial render
    render();

    // Start background simulation ticker (truck GPS movements & time tick)
    setInterval(() => {
      window.DairySyncMap.tickSimulation();
    }, 5000);

    // Factory Virtual Clock background ticker
    setInterval(() => {
      window.DairySyncData.tickVirtualClock(1);
    }, 60000);
  }

  return {
    init,
    switchRole,
    toggleSound,
    playAudio: playChime
  };
})();

// Bootstrap application on window load
window.addEventListener('DOMContentLoaded', () => {
  window.DairySyncApp.init();
});
