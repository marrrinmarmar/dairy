// PT Greenfields Indonesia - DairySync AI Division Checklist & AI Anomaly Detection Engine
// Minimalist styling: Clean White & Gray with Deep Forest Green Accents
window.DairySyncChecklist = (function () {
  
  function renderChecklistCard(divisionKey) {
    const state = window.DairySyncData.getState();
    const steps = state.checklists[divisionKey] || [];
    const icons = window.DairySyncIcons;

    const hasAnomaly = steps.some(s => s.anomaly || s.overdue);
    const completedCount = steps.filter(s => s.completed).length;
    const progressPercent = steps.length ? Math.round((completedCount / steps.length) * 100) : 0;

    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                CHECKLIST PROGRESS
              </span>
              <span class="text-xs text-slate-500">• Rolling SLA Monitor</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 mt-1">Operational Step-by-Step Execution</h3>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-slate-600">${completedCount}/${steps.length} (${progressPercent}%)</span>
            <div class="w-20 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
              <div class="bg-emerald-800 h-full rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
            </div>
            <button onclick="DairySyncData.triggerSimulatedAnomaly()" title="Simulate rolling 10-minute timeout anomaly" class="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 text-[11px] font-semibold flex items-center gap-1.5 transition-colors">
              <span class="text-amber-700">${icons.alert}</span>
              <span>Test 10m Anomaly</span>
            </button>
          </div>
        </div>

        <!-- AI Anomaly Detector Warning Banner -->
        ${hasAnomaly ? `
          <div class="mb-4 p-3.5 rounded-lg bg-red-50 border border-red-200">
            <div class="flex items-start gap-3">
              <div class="w-7 h-7 rounded bg-red-100 border border-red-200 flex items-center justify-center text-red-700 flex-shrink-0 mt-0.5">
                ${icons.alert}
              </div>
              <div class="flex-1 text-xs">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-red-900">AI Anomaly Warning: Rolling 10-Minute SLA Exceeded</h4>
                  <span class="text-[10px] font-mono text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-300">PM NOTIFIED</span>
                </div>
                <p class="text-red-700 mt-1 leading-relaxed">
                  One or more validation steps were not confirmed within the 10-minute SLA window.
                  Downstream processing ETA has been autonomously recalculated (+25 mins) to prevent cold-chain and UHT line bottlenecks.
                </p>
                <div class="mt-2.5 flex items-center gap-2">
                  <button onclick="DairySyncTrouble.openTroubleModal()" class="px-3 py-1 rounded bg-red-700 hover:bg-red-800 text-white font-semibold text-[11px] transition-colors shadow-sm">
                    File Containment Ticket
                  </button>
                  <span class="text-[10px] text-slate-500">Section Lead & PM alerted via event bus.</span>
                </div>
              </div>
            </div>
          </div>
        ` : `
          <div class="mb-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs text-slate-700">
            <span class="text-emerald-700">${icons.shield}</span>
            <span><strong>AI Sentinel Active:</strong> All operational steps within nominal 10-minute window.</span>
          </div>
        `}

        <!-- Steps List -->
        <div class="space-y-2">
          ${steps.map(step => {
            const isDone = step.completed;
            const isAnomaly = step.anomaly;

            return `
              <div class="flex items-start gap-3 p-3 rounded-lg transition-all ${
                isDone 
                  ? 'bg-slate-50 border border-slate-100 opacity-75' 
                  : isAnomaly 
                    ? 'bg-red-50/50 border border-red-200' 
                    : 'bg-white border border-slate-200 hover:border-slate-300'
              }">
                <button 
                  onclick="DairySyncData.toggleChecklistStep('${divisionKey}', '${step.id}')"
                  class="mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    isDone 
                      ? 'bg-emerald-800 border-emerald-800 text-white' 
                      : isAnomaly 
                        ? 'border-red-400 hover:bg-red-50 text-red-600' 
                        : 'border-slate-300 hover:border-emerald-700 text-transparent'
                  }">
                  ${icons.check}
                </button>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-semibold ${isDone ? 'line-through text-slate-400' : isAnomaly ? 'text-red-900 font-bold' : 'text-slate-800'}">
                      ${step.task}
                    </span>
                    <div class="flex items-center gap-1.5 flex-shrink-0">
                      <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        ${step.batch}
                      </span>
                      <span class="text-[10px] font-mono ${isAnomaly ? 'text-red-700 font-bold' : 'text-slate-500'}">
                        Target: ${step.scheduledTime}
                      </span>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 mt-1 text-[11px]">
                    ${isDone ? `
                      <span class="text-emerald-800 text-[10px] font-medium">Verified at ${step.completedAt || 'Nominal'} WIB</span>
                    ` : isAnomaly ? `
                      <span class="text-red-700 font-semibold text-[10px]">${step.anomalyReason || 'Overdue > 10m rolling threshold'}</span>
                    ` : `
                      <span class="text-slate-400 text-[10px]">Pending operator confirmation</span>
                    `}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  return {
    renderChecklistCard
  };
})();
