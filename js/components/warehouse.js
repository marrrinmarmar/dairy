// PT Greenfields Indonesia - DairySync AI Auxiliary & Warehouse Division View
// Minimalist clean styling with vector icons
window.DairySyncWarehouse = (function () {

  function render() {
    const state = window.DairySyncData.getState();
    const inventory = state.inventory;
    const coldRooms = state.coldRooms;
    const icons = window.DairySyncIcons;

    return `
      <div class="space-y-6">
        <!-- Warehouse Metric Strip -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Finished Goods in Cold Store</span>
              <span class="text-emerald-800 font-mono font-semibold">2-4°C Vaults</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">2,280 <span class="text-xs font-normal text-slate-500">Pallets Stored</span></div>
            <div class="mt-2 flex items-center text-[11px] text-emerald-800 gap-1">
              <span class="font-semibold">72% Utilization</span>
              <span class="text-slate-500">• Rooms A, B, C</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Tetra Pak Reel Infeed Buffer</span>
              <span class="text-slate-700 font-mono">1L Slim</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">482,000 <span class="text-xs font-normal text-slate-500">Cartons</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>3.8 Days Buffer</span>
              <span class="text-emerald-800 font-medium">• Nominal</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Flavor Ingredients Stock</span>
              <span class="text-slate-700 font-mono">Cocoa & Puree</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">12,600 <span class="text-xs font-normal text-slate-500">kg Puree</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Aroma Puree Buffer</span>
              <span class="text-emerald-800 font-medium">• &gt;4 Days</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Outbound Dispatches</span>
              <span class="text-emerald-800 font-mono font-semibold">Cross-dock</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">18 <span class="text-xs font-normal text-slate-500">Trailers Cleared</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Surabaya & Jabodetabek</span>
              <span class="text-emerald-800 font-medium">• 100% Sealed</span>
            </div>
          </div>
        </div>

        <!-- Cross-Division Integrated Production & Schedule Pipeline Monitor -->
        ${window.DairySyncSchedule ? window.DairySyncSchedule.renderScheduleWidget() : ''}

        <!-- Cold Storage Vaults Monitoring -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-700"></span>
                Finished Product Cold Vaults Capacity & Environmental Sentinel
              </h3>
              <p class="text-xs text-slate-500">Automated temperature logging, evaporator cycle management, and humidity tracking</p>
            </div>
            <button onclick="DairySyncTrouble.openTroubleModal()" class="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold transition-all flex items-center gap-1.5">
              <span>${icons.alert}</span>
              <span>Report Vault Issue</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${coldRooms.map((room, idx) => `
              <div class="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div class="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                  <h4 class="text-xs font-bold text-slate-900">${room.name}</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-emerald-900 border border-emerald-200">
                    ${room.temp}
                  </span>
                </div>

                <div class="space-y-1.5 text-xs text-slate-600 mb-3">
                  <div class="flex justify-between">
                    <span class="text-slate-500">Humidity:</span>
                    <strong class="font-mono text-slate-900">${room.humidity}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Capacity Load:</span>
                    <strong class="font-mono text-emerald-800">${room.capacity}</strong>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">Compressor:</span>
                    <span class="text-slate-700 font-mono text-[11px]">${room.compressor}</span>
                  </div>
                </div>

                <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-emerald-800 h-full rounded-full" style="width: ${idx === 0 ? '85%' : (idx === 1 ? '62%' : '24%')}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Packaging & Ingredients Inventory & Checklist -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 class="text-sm font-bold text-slate-900">Packaging Materials & Syrups Inventory</h3>
                <p class="text-xs text-slate-500">Automated minimum stock alerts & CIP chemical buffer tracking</p>
              </div>
              <button onclick="alert('ERP SAP Inventory Resupply Sync Triggered.')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-semibold transition-all">
                Sync with SAP
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    <th class="pb-2.5">Material / Chemical</th>
                    <th class="pb-2.5">Current Stock</th>
                    <th class="pb-2.5">Min Threshold</th>
                    <th class="pb-2.5">Burn Rate</th>
                    <th class="pb-2.5">Days Supply</th>
                    <th class="pb-2.5">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${inventory.map(item => `
                    <tr class="hover:bg-slate-50/60 transition-colors">
                      <td class="py-2.5 font-semibold text-slate-900">${item.item}</td>
                      <td class="py-2.5 font-mono text-slate-700">${item.stock}</td>
                      <td class="py-2.5 font-mono text-slate-400">${item.minThreshold}</td>
                      <td class="py-2.5 font-mono text-slate-600">${item.burnRate}</td>
                      <td class="py-2.5 font-mono text-emerald-800 font-bold">${item.daysSupply}</td>
                      <td class="py-2.5">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          ${item.status}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Interactive Division Checklist (1 col) -->
          <div>
            ${DairySyncChecklist.renderChecklistCard('warehouse')}
          </div>
        </div>
      </div>
    `;
  }

  return {
    render
  };
})();
