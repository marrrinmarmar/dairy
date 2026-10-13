// PT Greenfields Indonesia - DairySync AI Universal Trouble Reporting & AI Mitigation Engine
// Minimalist clean styling with vector icons
window.DairySyncTrouble = (function () {
  
  function renderTroubleModal(defaultDivision = 'farm') {
    const state = window.DairySyncData.getState();
    const batches = state.batches;
    const icons = window.DairySyncIcons;
    
    return `
      <dialog id="troubleModal" closedby="any" class="bg-transparent backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm p-0 m-auto max-w-2xl w-full text-slate-800 rounded-xl shadow-xl border border-slate-200">
        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                ${icons.alert}
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900">Universal Incident Reporting & AI Mitigation</h3>
                <p class="text-xs text-slate-500">Automated contingency routing & step-by-step containment guidelines</p>
              </div>
            </div>
            <button onclick="document.getElementById('troubleModal').close()" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <form id="troubleReportForm" onsubmit="DairySyncTrouble.handleFormSubmit(event)" class="mt-4 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Reporting Division</label>
                <select name="division" id="reportDivision" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700">
                  <option value="farm" ${defaultDivision === 'farm' ? 'selected' : ''}>Farm Division (Extraction & Silos)</option>
                  <option value="logistics" ${defaultDivision === 'logistics' ? 'selected' : ''}>Logistics Division (Fleet Transit)</option>
                  <option value="lab" ${defaultDivision === 'lab' ? 'selected' : ''}>QC Laboratory (Testing & Spoilage)</option>
                  <option value="production" ${defaultDivision === 'production' ? 'selected' : ''}>Production Division (UHT & CIP)</option>
                  <option value="warehouse" ${defaultDivision === 'warehouse' ? 'selected' : ''}>Warehouse Division (Packaging & Cold Storage)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Severity Level</label>
                <select name="severity" id="reportSeverity" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-red-600 font-medium">
                  <option value="Low">Low (Minor deviation, no schedule impact)</option>
                  <option value="Medium">Medium (Schedule shift &lt; 20m)</option>
                  <option value="High">High (Line pacing or lab re-sampling)</option>
                  <option value="Critical" selected>Critical (Thermal breach / CIP fault)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Issue Category</label>
                <select name="category" id="reportCategory" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700">
                  <option value="Cold Chain Temp Breach">Cold Chain Temp Breach (&gt; 4.0°C)</option>
                  <option value="CIP Cleaning Sequence Fault">CIP Cleaning Sequence Fault / Valve Trip</option>
                  <option value="Fleet Mechanical Breakdown">Fleet Mechanical Breakdown on Road</option>
                  <option value="Silo Infeed Bacterial Deviation">Silo Infeed Bacterial Deviation / Acidification</option>
                  <option value="Aseptic Packaging Jam">Aseptic Packaging Jam / Foil Leak</option>
                  <option value="Milk Volume Discrepancy">Raw Milk Volume Discrepancy &gt; 500L</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Affected Batch ID</label>
                <select name="batchId" id="reportBatchId" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700">
                  ${batches.map(b => `<option value="${b.id}">${b.id} - ${b.product} (${b.volumeLiters.toLocaleString()} L)</option>`).join('')}
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Estimated Resolution Time (ETA)</label>
                <input type="text" name="etaResolution" placeholder="e.g. 25 minutes" value="30 minutes" required class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Affected Volume (Optional)</label>
                <input type="text" name="affectedVolume" placeholder="e.g. 22,000 Liters" value="22,000 Liters" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700">
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Detailed Incident Description & Readings</label>
              <textarea name="description" rows="3" required placeholder="Describe symptom, sensor values, immediate actions taken..." class="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-700 resize-none">Tanker temperature reading spiked from 3.5°C to 5.8°C over 25 minutes. Compressor belt shows high vibration alert.</textarea>
            </div>

            <!-- AI Notice Box -->
            <div class="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-950">
              <span class="text-emerald-800 mt-0.5">${icons.sparkles}</span>
              <div class="leading-relaxed">
                <strong class="text-emerald-900">AI Mitigation Engine:</strong>
                Submitting this ticket will immediately trigger automated containment protocols, compute contingency rerouting, and notify the Project Manager and Section Lead via direct WhatsApp alert link.
              </div>
            </div>

            <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button type="button" onclick="document.getElementById('troubleModal').close()" class="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-semibold transition-colors">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
                <span>${icons.shield}</span>
                <span>Deploy AI Containment & Report</span>
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <!-- Ticket Resolution & Direct Contact Modal -->
      <dialog id="ticketDetailModal" closedby="any" class="bg-transparent backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm p-0 m-auto max-w-2xl w-full text-slate-800 rounded-xl shadow-xl border border-slate-200">
        <div id="ticketDetailContent" class="bg-white p-6 rounded-xl border border-slate-200"></div>
      </dialog>
    `;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    const newTicket = {
      division: formData.get('division'),
      severity: formData.get('severity'),
      category: formData.get('category'),
      batchId: formData.get('batchId'),
      affectedVolume: formData.get('affectedVolume'),
      etaResolution: formData.get('etaResolution'),
      description: formData.get('description'),
      reportedBy: `${window.DairySyncData.getState().roles[window.DairySyncData.getState().currentRole]?.name || 'Division Officer'}`
    };

    const created = window.DairySyncData.addTroubleTicket(newTicket);
    document.getElementById('troubleModal').close();

    showTicketDetails(created.id);
  }

  function showTicketDetails(ticketId) {
    const state = window.DairySyncData.getState();
    const ticket = state.troubleTickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const modal = document.getElementById('ticketDetailModal');
    const content = document.getElementById('ticketDetailContent');
    if (!modal || !content) return;
    const icons = window.DairySyncIcons;

    const isCrit = ticket.severity === 'Critical';

    content.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-[11px] font-bold ${isCrit ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}">
            ${ticket.severity.toUpperCase()}
          </span>
          <h3 class="text-sm font-bold text-slate-900">${ticket.ticketNumber} • ${ticket.category}</h3>
        </div>
        <button onclick="document.getElementById('ticketDetailModal').close()" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="my-4 space-y-3.5 text-xs">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <div>
            <span class="text-[10px] text-slate-500 block">Affected Batch</span>
            <strong class="text-slate-900">${ticket.batchId}</strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-500 block">Reported By</span>
            <span class="text-slate-700 font-medium">${ticket.reportedBy}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-500 block">Resolution ETA</span>
            <span class="text-emerald-800 font-bold">${ticket.etaResolution}</span>
          </div>
          <div>
            <span class="text-[10px] text-slate-500 block">Status</span>
            <span class="${isCrit ? 'text-red-700' : 'text-amber-700'} font-semibold">${ticket.status}</span>
          </div>
        </div>

        <div>
          <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Report Description:</span>
          <p class="mt-1 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">${ticket.description}</p>
        </div>

        <!-- AI Containment Guidelines -->
        <div class="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-200">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-emerald-800">${icons.sparkles}</span>
            <h4 class="font-bold text-emerald-900 text-xs uppercase tracking-wider">AI Containment Guidelines:</h4>
            <span class="ml-auto text-[10px] px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-300">Risk: ${ticket.aiAnalysis.riskScore}</span>
          </div>

          <p class="text-[11px] text-slate-600 mb-2.5 leading-relaxed">${ticket.aiAnalysis.prediction}</p>

          <div class="space-y-1.5 mb-3">
            ${ticket.aiAnalysis.actionSteps.map(step => `
              <div class="flex items-start gap-2 p-2 rounded bg-white border border-slate-200 text-[11px] text-slate-800">
                <span class="text-emerald-700 font-bold">${icons.check}</span>
                <span>${step}</span>
              </div>
            `).join('')}
          </div>

          ${ticket.aiAnalysis.contingencyPlan ? `
            <div class="p-2.5 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-800">
              <strong class="text-red-900 flex items-center gap-1">${icons.shield} Automated Contingency Route:</strong>
              <p class="mt-0.5">${ticket.aiAnalysis.contingencyPlan}</p>
            </div>
          ` : ''}
        </div>

        <!-- Direct WhatsApp / Contact Buttons -->
        <div>
          <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-2">Direct Contact Links:</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a href="${ticket.aiAnalysis.contactPJ.waLink}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors group">
              <div class="flex items-center gap-2.5">
                <span class="text-emerald-700">${icons.message}</span>
                <div>
                  <div class="font-bold text-xs text-slate-900">WhatsApp Section Lead</div>
                  <div class="text-[10px] text-slate-500">${ticket.aiAnalysis.contactPJ.name}</div>
                </div>
              </div>
              <span class="text-slate-400 group-hover:translate-x-0.5 transition-transform">${icons.arrowRight}</span>
            </a>

            <a href="${ticket.aiAnalysis.contactPM.waLink}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors group">
              <div class="flex items-center gap-2.5">
                <span class="text-emerald-700">${icons.phone}</span>
                <div>
                  <div class="font-bold text-xs text-slate-900">Escalate to Project Manager</div>
                  <div class="text-[10px] text-slate-500">${ticket.aiAnalysis.contactPM.name}</div>
                </div>
              </div>
              <span class="text-slate-400 group-hover:translate-x-0.5 transition-transform">${icons.arrowRight}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-3 border-t border-slate-100">
        <button onclick="document.getElementById('ticketDetailModal').close()" class="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700">
          Close
        </button>
      </div>
    `;

    modal.showModal();
  }

  return {
    renderTroubleModal,
    handleFormSubmit,
    showTicketDetails,
    openTroubleModal: function () {
      const modal = document.getElementById('troubleModal');
      if (modal) {
        const state = window.DairySyncData.getState();
        const sel = document.getElementById('reportDivision');
        if (sel && state.currentRole !== 'pm') {
          sel.value = state.currentRole;
        }
        modal.showModal();
      }
    }
  };
})();
