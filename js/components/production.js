// PT Greenfields Indonesia - DairySync AI Production Division View
// Minimalist clean styling with vector icons
window.DairySyncProduction = (function () {

  function render() {
    const state = window.DairySyncData.getState();
    const batches = state.batches;
    const cipSchedule = state.cipSchedule;
    const icons = window.DairySyncIcons;

    return `
      <div class="space-y-6">
        <!-- Production Top Hero Metric Strip -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>UHT Line Throughput</span>
              <span class="text-slate-700 font-mono">Tetra Pak A3</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">41,200 <span class="text-xs font-normal text-slate-500">L / hr</span></div>
            <div class="mt-2 flex items-center text-[11px] text-emerald-800 gap-1">
              <span class="font-semibold">91.5% Capacity</span>
              <span class="text-slate-400">• Zero Line Starvation</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Automated CIP Sentinel</span>
              <span class="text-emerald-800 font-mono font-semibold">Active</span>
            </div>
            <div class="text-2xl font-bold font-mono text-emerald-800 tracking-tight">45 <span class="text-xs font-normal text-slate-500">min Cycles</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Cross-Contamination:</span>
              <span class="text-emerald-800 font-semibold">0.00%</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Flavor Transition Matrix</span>
              <span class="text-slate-700 font-mono">Dynamic AI</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">3 <span class="text-xs font-normal text-slate-500">Flavors Active</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-600 gap-1">
              <span>Full Cream → Strawberry → Chocolate</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Downstream ETA Sync</span>
              <span class="text-emerald-800 font-mono font-semibold">Synced</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">Zero <span class="text-xs font-normal text-slate-500">Line Stops</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Dynamic Auto-Buffer:</span>
              <span class="text-emerald-800 font-semibold">+45m Active</span>
            </div>
          </div>
        </div>

        <!-- Cross-Division Integrated Production & Schedule Pipeline Monitor -->
        ${window.DairySyncSchedule ? window.DairySyncSchedule.renderScheduleWidget() : ''}

        <!-- Automated CIP Transition Manager & Dynamic Flavor Gantt -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  CIP TRANSITION MANAGER
                </span>
                <span class="text-xs text-slate-500">• Cross-Contamination Prevention</span>
              </div>
              <h3 class="text-sm font-bold text-slate-900 mt-1">Dynamic Flavor Scheduling & Automated Washing Sequence</h3>
            </div>

            <div class="flex items-center gap-2">
              <button onclick="DairySyncProduction.reoptimizeSchedule()" class="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm">
                <span>${icons.refresh}</span>
                <span>AI Re-Optimize Timetable</span>
              </button>
              <button onclick="DairySyncTrouble.openTroubleModal()" class="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold transition-all flex items-center gap-1.5">
                <span>${icons.alert}</span>
                <span>Report Line Anomaly</span>
              </button>
            </div>
          </div>

          <!-- Explanatory AI Rule Card -->
          <div class="mb-5 p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
            <span class="text-emerald-800 mt-0.5">${icons.shield}</span>
            <div>
              <strong class="text-slate-900">AI Flavor Isolation Standard:</strong>
              When transitioning from distinct flavors (e.g., Strawberry to Swiss Chocolate or Full Cream), the system <strong>automatically forces a non-negotiable 45-minute 5-Stage CIP Washing slot</strong>. 
              If upstream delays occur (such as road breakdowns or lab sample re-tests), the AI Real-Time Tracking Engine dynamically ripples schedule adjustments forward, keeping filling line downtime at exactly zero.
            </div>
          </div>

          <!-- Dynamic Visual Gantt Chart / Timetable -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
              <span>Line 1 Master Schedule (Today's Flavor Transitions)</span>
              <span class="text-[10px] font-mono text-emerald-800 font-semibold">Live Time: 13:40 WIB</span>
            </h4>

            <!-- Visual Timeline Bar -->
            <div class="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div class="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-2">
                <span>10:00 WIB</span>
                <span>12:00</span>
                <span>14:00 (Current)</span>
                <span>16:00</span>
                <span>18:00</span>
                <span>20:00 WIB</span>
              </div>

              <!-- Gantt Progress Strip -->
              <div class="relative w-full h-11 bg-white rounded border border-slate-200 overflow-hidden flex shadow-inner">
                <!-- Slot 1: Full Cream -->
                <div class="h-full bg-emerald-50 border-r border-emerald-200 flex flex-col justify-center px-2 text-[10px]" style="width: 25%">
                  <span class="font-bold text-emerald-950 truncate">1. Full Cream</span>
                  <span class="text-emerald-800 text-[9px]">35kL • Done</span>
                </div>

                <!-- Slot 2: CIP Cycle (Washing) -->
                <div class="h-full bg-amber-50 border-r border-amber-300 flex flex-col justify-center px-2 text-[10px]" style="width: 12%">
                  <span class="font-bold text-amber-900 truncate">CIP Wash 2</span>
                  <span class="text-amber-700 text-[9px]">Active (45m)</span>
                </div>

                <!-- Slot 3: Strawberry -->
                <div class="h-full bg-slate-100 border-r border-slate-200 flex flex-col justify-center px-2 text-[10px]" style="width: 22%">
                  <span class="font-bold text-slate-900 truncate">2. Strawberry</span>
                  <span class="text-slate-500 text-[9px]">25kL • Ready</span>
                </div>

                <!-- Slot 4: CIP Cycle (Washing) -->
                <div class="h-full bg-amber-50/60 border-r border-amber-200 flex flex-col justify-center px-2 text-[10px]" style="width: 12%">
                  <span class="font-bold text-amber-800 truncate">CIP Wash 3</span>
                  <span class="text-amber-600 text-[9px]">45m Slot</span>
                </div>

                <!-- Slot 5: Chocolate -->
                <div class="h-full bg-slate-100 border-r border-slate-200 flex flex-col justify-center px-2 text-[10px]" style="width: 29%">
                  <span class="font-bold text-slate-900 truncate">3. Swiss Chocolate</span>
                  <span class="text-slate-500 text-[9px]">30kL • Queued</span>
                </div>
              </div>
            </div>

            <!-- Detailed CIP Slots List -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              ${cipSchedule.map(c => {
                const isProg = c.status.includes('In Progress');
                const isDone = c.status === 'Completed';

                return `
                  <div class="p-3.5 rounded-lg border transition-all ${
                    isProg 
                      ? 'bg-amber-50/60 border-amber-300' 
                      : isDone 
                        ? 'bg-slate-50 border-slate-200 opacity-80' 
                        : 'bg-white border-slate-200'
                  }">
                    <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <div>
                        <h5 class="text-xs font-bold text-slate-900">${c.title}</h5>
                        <span class="text-[10px] text-slate-500">${c.line} • ${c.start} - ${c.end} (${c.duration})</span>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                        isProg ? 'bg-amber-100 text-amber-900 border border-amber-300' : (isDone ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600')
                      }">
                        ${c.status}
                      </span>
                    </div>

                    <div class="text-[11px] text-slate-600 space-y-1 mb-2">
                      <p><span class="text-slate-400">Chemical Protocol:</span> ${c.washType}</p>
                      <div class="flex justify-between text-[10px] text-slate-500 pt-1">
                        <span>From: <strong class="text-slate-800">${c.precedingFlavor}</strong></span>
                        <span>➔ Into: <strong class="text-emerald-800">${c.upcomingFlavor}</strong></span>
                      </div>
                    </div>

                    <div class="p-2 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-600">
                      <strong class="text-slate-800">AI Wash Note:</strong> ${c.aiNote}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Active Batch Progression & Division Checklist -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 class="text-sm font-bold text-slate-900">Live Batch Pipeline & Real-Time Tracking Engine</h3>
                <p class="text-xs text-slate-500">Dynamic ETA adjustment synchronizing Farm extraction, fleet transit, and lab release</p>
              </div>
              <span class="text-xs font-mono text-emerald-800 font-semibold">Zero Idle Buffer</span>
            </div>

            <div class="space-y-3">
              ${batches.map(b => {
                const isCrit = b.status === 'Warning' || b.status.includes('Anomaly') || b.status.includes('Delayed');
                return `
                  <div class="p-4 rounded-lg border ${isCrit ? 'border-red-300 bg-red-50/30' : 'border-slate-200 bg-white'} relative">
                    <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">${b.id}</span>
                        <div>
                          <h4 class="text-xs font-bold text-slate-900">${b.product}</h4>
                          <span class="text-[10px] text-slate-500">Volume: ${b.volumeLiters.toLocaleString()} L • Source: ${b.sourceFarm}</span>
                        </div>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCrit ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }">
                        ${b.status}
                      </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-2.5">
                      <div class="p-2 rounded bg-slate-50 border border-slate-200">
                        <span class="text-[10px] text-slate-500 block">Current Stage</span>
                        <strong class="text-slate-800">${b.currentStage}</strong>
                      </div>
                      <div class="p-2 rounded bg-slate-50 border border-slate-200">
                        <span class="text-[10px] text-slate-500 block">Target Finish</span>
                        <span class="font-mono text-slate-900 font-bold">${b.targetTime} WIB</span>
                      </div>
                      <div class="p-2 rounded bg-slate-50 border border-slate-200">
                        <span class="text-[10px] text-slate-500 block">Downstream ETA</span>
                        <span class="font-mono ${isCrit ? 'text-red-700 font-bold' : 'text-emerald-800 font-semibold'}">${b.downstreamEta}</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-1.5 text-[9px] font-mono text-slate-500">
                      <span class="px-2 py-0.5 rounded ${b.stageIndex >= 0 ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-slate-100'}">1. Extracted</span>
                      <span>➔</span>
                      <span class="px-2 py-0.5 rounded ${b.stageIndex >= 1 ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-slate-100'}">2. Transit</span>
                      <span>➔</span>
                      <span class="px-2 py-0.5 rounded ${b.stageIndex >= 2 ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-slate-100'}">3. Lab Check</span>
                      <span>➔</span>
                      <span class="px-2 py-0.5 rounded ${b.stageIndex >= 3 ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-slate-100'}">4. UHT & Pack</span>
                      <span>➔</span>
                      <span class="px-2 py-0.5 rounded ${b.stageIndex >= 4 ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-slate-100'}">5. Cold Hub</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Interactive Division Checklist (1 col) -->
          <div>
            ${DairySyncChecklist.renderChecklistCard('production')}
          </div>
        </div>
      </div>
    `;
  }

  function reoptimizeSchedule() {
    alert('AI Smart Scheduling Optimization Executed!\n\n• Recalculated Line 1 & Line 2 flavor transitions.\n• Preserved 45-min mandatory CIP isolation windows.\n• Synchronized downstream carton filling rate to 92.4% buffer capacity.\n• Zero downtime predicted.');
  }

  return {
    render,
    reoptimizeSchedule
  };
})();
