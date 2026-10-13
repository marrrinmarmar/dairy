// PT Greenfields Indonesia - DairySync AI Farm Division View
// Minimalist clean styling with vector icons
window.DairySyncFarm = (function () {

  function render() {
    const icons = window.DairySyncIcons;

    return `
      <div class="space-y-6">
        <!-- Division Top Hero Metric Bar -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Daily Raw Milk Yield</span>
              <span class="text-emerald-800 font-mono font-semibold">92.6% Target</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">315,400 <span class="text-xs font-normal text-slate-500">Liters</span></div>
            <div class="mt-2 flex items-center text-[11px] text-emerald-800 gap-1">
              <span class="font-medium">+3.4%</span>
              <span class="text-slate-500">vs 7-day average</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Avg Silo Temperature</span>
              <span class="text-emerald-800 font-mono font-semibold">Pristine</span>
            </div>
            <div class="text-2xl font-bold font-mono text-emerald-800 tracking-tight">3.5 <span class="text-xs font-normal text-slate-500">°C</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Setpoint: 3.0°C - 3.8°C</span>
              <span class="text-emerald-800 font-medium">• 7 Silos</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Active Milking Parlors</span>
              <span class="text-slate-700 font-mono">Rotary 80</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">25,300 <span class="text-xs font-normal text-slate-500">Cows Milk'd</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Holstein Friesian</span>
              <span class="text-emerald-800 font-medium">• 3x Cycle</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Dispatch Tanker Queue</span>
              <span class="text-slate-700 font-mono">Dock 1-4</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">4 <span class="text-xs font-normal text-slate-500">Tankers</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Next Dispatch:</span>
              <span class="text-emerald-800 font-medium">TRK-01 (14:15)</span>
            </div>
          </div>
        </div>

        <!-- Cross-Division Integrated Production & Schedule Pipeline Monitor -->
        ${window.DairySyncSchedule ? window.DairySyncSchedule.renderScheduleWidget() : ''}

        <!-- Silos & Extraction Management -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Silo Monitoring Array (2 cols) -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-700"></span>
                  Thermal Silo Farm Array (Wajak & Ngancar)
                </h3>
                <p class="text-xs text-slate-500">Automated glycol cooling & ultrasonic level telemetry</p>
              </div>
              <button onclick="DairySyncTrouble.openTroubleModal()" class="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold transition-all flex items-center gap-1.5">
                <span>${icons.alert}</span>
                <span>Report Farm Issue</span>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Silo 1 -->
              <div class="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="text-xs font-bold text-slate-900">Silo 1 (Farm 1 Malang)</h4>
                    <span class="text-[10px] text-slate-500">Batch #GF-2026-A1 • Full Cream</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    3.4°C
                  </span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between text-[11px] text-slate-700">
                    <span>Level:</span>
                    <strong class="font-mono">42,500 / 50,000 L (85%)</strong>
                  </div>
                  <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="bg-emerald-800 h-full rounded-full" style="width: 85%"></div>
                  </div>
                </div>
                <div class="text-[10px] text-slate-500 flex justify-between pt-2 border-t border-slate-200">
                  <span>Agitator: <strong class="text-slate-700">Active (28 RPM)</strong></span>
                  <span>Glycol: <strong class="text-emerald-800">-1.5°C</strong></span>
                </div>
              </div>

              <!-- Silo 2 -->
              <div class="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="text-xs font-bold text-slate-900">Silo 2 (Farm 1 Malang)</h4>
                    <span class="text-[10px] text-slate-500">Batch #GF-2026-C1 • Chocolate Prep</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    3.6°C
                  </span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between text-[11px] text-slate-700">
                    <span>Level:</span>
                    <strong class="font-mono">38,200 / 50,000 L (76%)</strong>
                  </div>
                  <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="bg-emerald-800 h-full rounded-full" style="width: 76%"></div>
                  </div>
                </div>
                <div class="text-[10px] text-slate-500 flex justify-between pt-2 border-t border-slate-200">
                  <span>Agitator: <strong class="text-slate-700">Active (28 RPM)</strong></span>
                  <span>Glycol: <strong class="text-emerald-800">-1.8°C</strong></span>
                </div>
              </div>

              <!-- Silo 3 -->
              <div class="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="text-xs font-bold text-slate-900">Silo 3 (Farm 2 Blitar)</h4>
                    <span class="text-[10px] text-slate-500">Batch #GF-2026-B1 • Strawberry</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    3.8°C
                  </span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between text-[11px] text-slate-700">
                    <span>Level:</span>
                    <strong class="font-mono">31,000 / 45,000 L (69%)</strong>
                  </div>
                  <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="bg-emerald-800 h-full rounded-full" style="width: 69%"></div>
                  </div>
                </div>
                <div class="text-[10px] text-slate-500 flex justify-between pt-2 border-t border-slate-200">
                  <span>Agitator: <strong class="text-slate-700">Active (26 RPM)</strong></span>
                  <span>Glycol: <strong class="text-emerald-800">-1.2°C</strong></span>
                </div>
              </div>

              <!-- Silo 4 - Backup/Contingency -->
              <div class="p-4 rounded-lg bg-slate-50 border border-emerald-300">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="text-xs font-bold text-slate-900">Silo 4 (Standby Buffer)</h4>
                    <span class="text-[10px] text-emerald-800 font-medium">Contingency Armed</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-emerald-900 border border-emerald-200">
                    3.2°C
                  </span>
                </div>
                <div class="space-y-1 mb-2">
                  <div class="flex justify-between text-[11px] text-slate-700">
                    <span>Buffer Available:</span>
                    <strong class="font-mono text-emerald-900">8,500 / 50,000 L (17%)</strong>
                  </div>
                  <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="bg-emerald-700 h-full rounded-full" style="width: 17%"></div>
                  </div>
                </div>
                <div class="text-[10px] text-slate-500 flex justify-between pt-2 border-t border-slate-200">
                  <span>Sanitization: <strong class="text-emerald-800">CIP Validated</strong></span>
                  <span>Bypass Valve: <strong class="text-emerald-800">Ready</strong></span>
                </div>
              </div>
            </div>

            <!-- Fast Milk Logging Input Card -->
            <div class="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h4 class="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <span>${icons.droplet}</span> Raw Milk Extraction Logger
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label class="text-[10px] text-slate-500 block mb-1">Source Parlor</label>
                  <select class="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800">
                    <option>Parlor A - Rotary 80 (Malang)</option>
                    <option>Parlor B - Parallel 40 (Blitar)</option>
                  </select>
                </div>
                <div>
                  <label class="text-[10px] text-slate-500 block mb-1">Volume (Liters)</label>
                  <input type="number" value="12500" class="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 font-mono">
                </div>
                <div>
                  <label class="text-[10px] text-slate-500 block mb-1">Inflow Temp (°C)</label>
                  <input type="number" step="0.1" value="3.5" class="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 font-mono">
                </div>
                <div class="flex items-end">
                  <button onclick="alert('Extraction lot logged into DairySync Farm Ledger.')" class="w-full py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs transition-colors shadow-sm">
                    Commit Lot
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Division Checklist (1 col) -->
          <div>
            ${DairySyncChecklist.renderChecklistCard('farm')}
          </div>
        </div>
      </div>
    `;
  }

  return {
    render
  };
})();
