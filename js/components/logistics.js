// PT Greenfields Indonesia - DairySync AI Logistics & Distribution Fleet View
// Minimalist clean styling with vector icons
window.DairySyncLogistics = (function () {

  function render() {
    const state = window.DairySyncData.getState();
    const trucks = state.trucks;
    const icons = window.DairySyncIcons;

    return `
      <div class="space-y-6">
        <!-- Logistics Metric Strip -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Active Fleet Transit</span>
              <span class="text-emerald-800 font-mono font-semibold">Live GPS</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">6 <span class="text-xs font-normal text-slate-500">Tankers Active</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-600 gap-1">
              <span>3 On Road</span>
              <span class="text-slate-400">• 1 On Site • 1 Incident</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Cold Chain Integrity</span>
              <span class="text-emerald-800 font-mono font-semibold">98.2%</span>
            </div>
            <div class="text-2xl font-bold font-mono text-emerald-800 tracking-tight">3.3 <span class="text-xs font-normal text-slate-500">°C Avg</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>1 Unit Above 4.0°C</span>
              <span class="text-red-700 font-medium">• TRK-04 Incident</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>In-Transit Milk Volume</span>
              <span class="text-slate-700 font-mono">Bulk Aseptic</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">133,000 <span class="text-xs font-normal text-slate-500">Liters</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>SS-316L Insulated</span>
              <span class="text-emerald-800 font-medium">• Food Grade</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Route On-Time Rate</span>
              <span class="text-slate-700 font-mono">Dynamic ETA</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">91.4 <span class="text-xs font-normal text-slate-500">%</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Avg Deviation:</span>
              <span class="text-slate-700 font-medium">+8.2 mins</span>
            </div>
          </div>
        </div>

        <!-- Cross-Division Integrated Production & Schedule Pipeline Monitor -->
        ${window.DairySyncSchedule ? window.DairySyncSchedule.renderScheduleWidget() : ''}

        <!-- Main Map & Fleet Roster -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Interactive Minimalist Map (2 cols) -->
          <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-700"></span>
                  Live Fleet GPS & Telemetry Radar
                </h3>
                <p class="text-xs text-slate-500">Real-time GPS coordinates, sub-zero inverter chiller logs, and route ETA</p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="DairySyncTrouble.openTroubleModal()" class="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold transition-all flex items-center gap-1.5">
                  <span>${icons.alert}</span>
                  <span>Report Road Trouble</span>
                </button>
              </div>
            </div>

            <!-- Leaflet Container -->
            <div id="logisticsMapContainer" class="w-full h-[430px] rounded-lg overflow-hidden border border-slate-200 relative shadow-inner">
              <div class="absolute top-3 left-3 z-[1000] p-2.5 rounded-lg bg-white/95 backdrop-blur-sm border border-slate-200 text-[11px] text-slate-700 shadow-sm space-y-0.5">
                <div class="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                  <span>${icons.pulse}</span> East Java Dairy Corridor
                </div>
                <div class="text-[10px] text-slate-500">Malang • Blitar • Gunung Kawi • Surabaya</div>
              </div>
            </div>

            <!-- Truck Quick Selector Ribbon -->
            <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              ${trucks.map(t => {
                const isCrit = t.status === 'BREAKDOWN';
                const isSite = t.status === 'ON SITE';
                return `
                  <button onclick="DairySyncMap.focusTruck('${t.id}')" class="p-2.5 rounded-lg text-left border transition-all ${
                    isCrit 
                      ? 'bg-red-50 border-red-300 hover:bg-red-100' 
                      : isSite 
                        ? 'bg-amber-50/50 border-amber-200 hover:bg-amber-50' 
                        : 'bg-white border-slate-200 hover:border-emerald-700'
                  }">
                    <div class="flex justify-between items-center text-[10px] font-mono">
                      <span class="font-bold ${isCrit ? 'text-red-700' : 'text-emerald-900'}">${t.id}</span>
                      <span class="text-[9px] px-1 rounded ${isCrit ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'}">${t.status}</span>
                    </div>
                    <div class="text-[11px] font-bold text-slate-900 mt-1 truncate">${t.plate}</div>
                    <div class="text-[10px] font-mono flex justify-between mt-1 text-slate-500">
                      <span>${t.speed} km/h</span>
                      <span class="${t.temp > 4 ? 'text-red-700 font-bold' : 'text-emerald-800'}">${t.temp}°C</span>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Interactive Division Checklist (1 col) -->
          <div>
            ${DairySyncChecklist.renderChecklistCard('logistics')}
          </div>
        </div>

        <!-- Detailed Fleet Telemetry Cards -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-sm font-bold text-slate-900">Live Transport Manifest & Telemetry Logs</h3>
              <p class="text-xs text-slate-500">Temperature threshold enforcement (&le; 4.0°C) with electronic seal locks</p>
            </div>
            <span class="text-xs font-mono text-emerald-800">IoT Ping: Every 5s Active</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${trucks.map(truck => {
              const isCrit = truck.status === 'BREAKDOWN';

              return `
                <div class="p-4 rounded-lg border ${isCrit ? 'border-red-300 bg-red-50/40' : 'border-slate-200 bg-white'} relative">
                  <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <div class="flex items-center gap-2">
                      <div class="w-7 h-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                        ${icons.truck}
                      </div>
                      <div>
                        <h4 class="text-xs font-bold text-slate-900">${truck.id} • ${truck.plate}</h4>
                        <span class="text-[10px] text-slate-500">${truck.currentBatch}</span>
                      </div>
                    </div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                      isCrit ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }">
                      ${truck.status}
                    </span>
                  </div>

                  <!-- Driver & Contact Card -->
                  <div class="flex items-center justify-between text-xs text-slate-700 mb-3 bg-slate-50 p-2 rounded border border-slate-200">
                    <div>
                      <span class="text-[10px] text-slate-500 block">Driver In-Charge</span>
                      <strong class="text-slate-900">${truck.driver}</strong>
                    </div>
                    <a href="https://wa.me/${truck.phone.replace(/[^0-9]/g, '')}" target="_blank" class="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-semibold flex items-center gap-1 transition-colors">
                      <span class="text-emerald-700">${icons.message}</span> Contact
                    </a>
                  </div>

                  <!-- Telemetry Grid -->
                  <div class="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div class="p-2 rounded bg-slate-50 border border-slate-200">
                      <span class="text-[9px] uppercase tracking-wider text-slate-500 block">Tank Temp</span>
                      <span class="font-mono text-sm font-bold ${truck.temp > 4 ? 'text-red-700' : 'text-emerald-800'}">
                        ${truck.temp}°C
                      </span>
                    </div>
                    <div class="p-2 rounded bg-slate-50 border border-slate-200">
                      <span class="text-[9px] uppercase tracking-wider text-slate-500 block">Speed & Status</span>
                      <span class="font-mono text-sm font-bold text-slate-900">${truck.speed} km/h</span>
                    </div>
                    <div class="p-2 rounded bg-slate-50 border border-slate-200">
                      <span class="text-[9px] uppercase tracking-wider text-slate-500 block">Cargo Volume</span>
                      <span class="font-mono font-semibold text-slate-900">${truck.volume.toLocaleString()} L</span>
                    </div>
                    <div class="p-2 rounded bg-slate-50 border border-slate-200">
                      <span class="text-[9px] uppercase tracking-wider text-slate-500 block">Arrival ETA</span>
                      <span class="font-mono font-semibold text-emerald-800">${truck.eta}</span>
                    </div>
                  </div>

                  <!-- Route Progress -->
                  <div>
                    <div class="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>${truck.routeFrom}</span>
                      <span>${truck.routeTo}</span>
                    </div>
                    <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div class="bg-emerald-800 h-full rounded-full" style="width: ${truck.progress}%"></div>
                    </div>
                    <div class="flex justify-between text-[9px] text-slate-500 mt-1">
                      <span>${truck.subStatus}</span>
                      <span class="font-mono font-medium">${truck.progress}%</span>
                    </div>
                  </div>

                  ${isCrit ? `
                    <div class="mt-3 p-2 rounded bg-red-100/70 border border-red-200 text-[10px] text-red-900 flex items-start gap-1.5">
                      <span class="text-red-700 mt-0.5">${icons.alert}</span>
                      <div>
                        <strong>Thermal Deviation:</strong> Auxiliary compressor trip. Contingency diversion to Silo 3 active.
                      </div>
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  return {
    render
  };
})();
