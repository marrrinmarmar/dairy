// PT Greenfields Indonesia - DairySync AI Project Manager (Admin Utama) View
// Minimalist clean styling with vector icons
window.DairySyncPM = (function () {

  function render() {
    const state = window.DairySyncData.getState();
    const trucks = state.trucks;
    const batches = state.batches;
    const troubleTickets = state.troubleTickets;
    const icons = window.DairySyncIcons;

    const onRoadCount = trucks.filter(t => t.status === 'ON ROAD').length + 9;
    const onSiteCount = trucks.filter(t => t.status === 'ON SITE').length + 7;
    const doneCount = trucks.filter(t => t.status === 'DONE').length + 23;
    const breakdownCount = trucks.filter(t => t.status === 'BREAKDOWN').length;

    return `
      <div class="space-y-6">
        <!-- PM Exclusive Live Top-Bar Metric Counters -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <!-- ON ROAD Counter -->
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span class="flex items-center gap-1.5 font-bold tracking-wider text-slate-700">
                <span class="w-2 h-2 rounded-full bg-emerald-700"></span> ON ROAD
              </span>
              <span class="text-[10px] font-mono text-slate-400">In Transit</span>
            </div>
            <div class="text-3xl font-extrabold font-mono text-slate-900 tracking-tight">${onRoadCount} <span class="text-xs font-normal text-slate-500">Tankers</span></div>
            <div class="mt-2 text-[11px] text-slate-600 flex items-center justify-between">
              <span>Avg Speed: 56 km/h</span>
              <span class="font-mono text-emerald-800 font-semibold">3.2°C</span>
            </div>
          </div>

          <!-- ON SITE Counter -->
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span class="flex items-center gap-1.5 font-bold tracking-wider text-slate-700">
                <span class="w-2 h-2 rounded-full bg-emerald-700"></span> ON SITE
              </span>
              <span class="text-[10px] font-mono text-slate-400">Dock & Lab</span>
            </div>
            <div class="text-3xl font-extrabold font-mono text-slate-900 tracking-tight">${onSiteCount} <span class="text-xs font-normal text-slate-500">Nodes</span></div>
            <div class="mt-2 text-[11px] text-slate-600 flex items-center justify-between">
              <span>Unloading & Testing</span>
              <span class="font-mono text-slate-800">Silo Inflow</span>
            </div>
          </div>

          <!-- DONE Counter -->
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span class="flex items-center gap-1.5 font-bold tracking-wider text-emerald-900">
                <span class="w-2 h-2 rounded-full bg-emerald-800"></span> DONE TODAY
              </span>
              <span class="text-[10px] font-mono text-emerald-800 font-semibold">100% Cleared</span>
            </div>
            <div class="text-3xl font-extrabold font-mono text-emerald-900 tracking-tight">${doneCount} <span class="text-xs font-normal text-slate-500">Batches</span></div>
            <div class="mt-2 text-[11px] text-emerald-800 flex items-center justify-between">
              <span>345,000 Liters</span>
              <span class="font-mono">CIP Sterilized</span>
            </div>
          </div>

          <!-- BREAKDOWN Counter -->
          <div class="p-4 rounded-xl bg-white border border-red-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span class="flex items-center gap-1.5 font-bold tracking-wider text-red-700">
                <span class="w-2 h-2 rounded-full bg-red-600"></span> BREAKDOWNS
              </span>
              <span class="text-[10px] font-mono text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">Incident</span>
            </div>
            <div class="text-3xl font-extrabold font-mono text-red-700 tracking-tight">${breakdownCount} <span class="text-xs font-normal text-slate-500">Active</span></div>
            <div class="mt-2 text-[11px] text-red-700 flex items-center justify-between">
              <span>TRK-04 Compressor</span>
              <span class="font-mono font-bold">Tank 3 Diverted</span>
            </div>
          </div>
        </div>

        <!-- Cross-Division Integrated Production & Schedule Pipeline Monitor -->
        ${window.DairySyncSchedule ? window.DairySyncSchedule.renderScheduleWidget() : ''}

        <!-- Master Global Operations Map with Feeds & Anomaly Sidebar -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                    EXECUTIVE RADAR
                  </span>
                  <span class="text-xs text-slate-500">• Global Supply Chain Map</span>
                </div>
                <h3 class="text-sm font-bold text-slate-900 mt-1">Real-Time East Java Fleet & Operational Nodes Radar</h3>
              </div>

              <div class="flex items-center gap-2">
                <button onclick="DairySyncPM.generateExecutiveReport()" class="px-3.5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm">
                  <span>${icons.document}</span>
                  <span>Generate Executive Audit Report</span>
                </button>
              </div>
            </div>

            <!-- Leaflet Clean Light Map Container -->
            <div id="pmMapContainer" class="w-full h-[470px] rounded-lg overflow-hidden border border-slate-200 relative shadow-inner">
              <div class="absolute bottom-3 left-3 z-[1000] p-3 rounded-lg bg-white/95 backdrop-blur-sm border border-slate-200 text-[11px] text-slate-700 shadow-sm space-y-1.5">
                <div class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Map Legend:</div>
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-800"></span> <span>Farm Silos (Wajak / Ngancar)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span> <span>QC Central Lab & Processing Plant</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> <span>Surabaya Regional Cold Distribution Hub</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-600"></span> <span class="text-red-700 font-medium">Active Incident / Breakdown</span>
                </div>
              </div>
            </div>

            <!-- Map Status Footer -->
            <div class="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div class="flex items-center gap-4">
                <span>Route Length: <strong class="text-slate-800">164 km</strong></span>
                <span>Active Milk Volume: <strong class="text-emerald-800 font-semibold">133,000 L</strong></span>
              </div>
              <div class="flex items-center gap-1.5 text-emerald-800 font-mono text-[11px]">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-700"></span> Telemetry Polling: 5000ms Active
              </div>
            </div>
          </div>

          <!-- Sidebar: Operational Feeds & Active AI Anomaly Alerts (1 col) -->
          <div class="space-y-4 flex flex-col">
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div class="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <span class="text-red-600">${icons.alert}</span> Active AI Anomaly Alerts
                </h4>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-red-50 text-red-700 border border-red-200">
                  1 Priority Alert
                </span>
              </div>

              <!-- Anomaly Card -->
              <div class="p-3 rounded-lg bg-red-50/60 border border-red-200 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-red-900 font-mono">INCIDENT: TR-2026-0881</span>
                  <span class="text-[10px] text-red-700 font-bold">Critical</span>
                </div>
                <p class="text-[11px] text-slate-700">
                  <strong>Batch #GF-2026-B2:</strong> TRK-04 temperature rose to 6.4°C (&gt;4.0°C SLA). Compressor belt failure at KM 14.
                </p>
                <div class="p-2 rounded bg-white border border-slate-200 text-[10px] text-slate-600 leading-relaxed">
                  <strong class="text-emerald-800">AI Mitigation:</strong>
                  Diverted to Insulated Tank 3. Standby Tech Joko dispatched. UHT schedule buffered +45m.
                </div>
                <button onclick="DairySyncTrouble.showTicketDetails('TICK-101')" class="w-full py-1.5 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1">
                  <span>Inspect Incident Plan</span>
                  <span>${icons.arrowRight}</span>
                </button>
              </div>
            </div>

            <!-- Global Batch ETAs -->
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Global Batch Downstream ETAs
                  </h4>
                  <span class="text-[10px] font-mono text-emerald-800 font-semibold">Zero Idle Buffer</span>
                </div>

                <div class="space-y-2">
                  ${batches.map(b => `
                    <div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-mono font-bold text-slate-900">${b.id}</span>
                        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded ${b.status === 'Normal' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}">
                          ${b.targetTime}
                        </span>
                      </div>
                      <div class="text-[11px] text-slate-700 truncate">${b.product}</div>
                      <div class="text-[10px] text-slate-500 mt-1 flex justify-between">
                        <span>Stage: ${b.currentStage}</span>
                        <span class="font-semibold text-emerald-800">${b.downstreamEta}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- PM Policy Notice -->
              <div class="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-600 flex items-start gap-2">
                <span class="text-emerald-800 mt-0.5">${icons.shield}</span>
                <div class="leading-relaxed">
                  <strong>Role Access Notice:</strong>
                  Project Manager has full executive visibility and report generation authority. Direct operational checklists must be submitted by division officers.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Master Operations Table -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-sm font-bold text-slate-900">Central Operations Master Ledger & Active Incidents</h3>
              <p class="text-xs text-slate-500">Unified audit trail across Farm, Fleet, Lab, Production, and Warehouses</p>
            </div>
            <span class="text-xs font-mono text-slate-500">Total Incidents: ${troubleTickets.length}</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  <th class="pb-2.5">Ticket #</th>
                  <th class="pb-2.5">Division</th>
                  <th class="pb-2.5">Severity</th>
                  <th class="pb-2.5">Category</th>
                  <th class="pb-2.5">Affected Batch</th>
                  <th class="pb-2.5">Resolution ETA</th>
                  <th class="pb-2.5">Status</th>
                  <th class="pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${troubleTickets.map(t => {
                  const isCrit = t.severity === 'Critical';
                  return `
                    <tr class="hover:bg-slate-50/60 transition-colors">
                      <td class="py-2.5 font-mono font-bold text-slate-900">${t.ticketNumber}</td>
                      <td class="py-2.5 text-slate-700">${t.divisionName}</td>
                      <td class="py-2.5">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isCrit ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}">
                          ${t.severity}
                        </span>
                      </td>
                      <td class="py-2.5 text-slate-800">${t.category}</td>
                      <td class="py-2.5 font-mono text-slate-600">${t.batchId}</td>
                      <td class="py-2.5 font-mono text-emerald-800 font-medium">${t.etaResolution}</td>
                      <td class="py-2.5 ${isCrit ? 'text-red-700' : 'text-amber-700'} font-semibold">${t.status}</td>
                      <td class="py-2.5 text-right">
                        <button onclick="DairySyncTrouble.showTicketDetails('${t.id}')" class="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-700 font-semibold transition-colors">
                          Details
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function generateExecutiveReport() {
    DairySyncExecutiveReport.openModal();
  }

  return {
    render,
    generateExecutiveReport
  };
})();
