// PT Greenfields Indonesia - DairySync AI QC Laboratory Division View
// Minimalist clean styling with vector icons
window.DairySyncLab = (function () {

  function render() {
    const state = window.DairySyncData.getState();
    const labTests = state.labTests;
    const icons = window.DairySyncIcons;

    return `
      <div class="space-y-6">
        <!-- QC Top Hero Metrics -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Today's Samples Analyzed</span>
              <span class="text-emerald-800 font-mono font-semibold">FT3 FTIR</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">48 <span class="text-xs font-normal text-slate-500">Lots</span></div>
            <div class="mt-2 flex items-center text-[11px] text-emerald-800 gap-1">
              <span>98.4% Pass Rate</span>
              <span class="text-slate-500">• Greenfields Spec</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Average Fat / Protein</span>
              <span class="text-emerald-800 font-mono font-semibold">MilkoScan</span>
            </div>
            <div class="text-2xl font-bold font-mono text-emerald-800 tracking-tight">3.94% <span class="text-xs font-normal text-slate-500">/ 3.34%</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Spec: &ge;3.80% / &ge;3.20%</span>
              <span class="text-emerald-800 font-medium">• Premium</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Quarantine & Spoilage Vol</span>
              <span class="text-slate-700 font-mono">Diverted</span>
            </div>
            <div class="text-2xl font-bold font-mono text-slate-900 tracking-tight">4,200 <span class="text-xs font-normal text-slate-500">Liters</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>1 Lot Diverted</span>
              <span class="text-slate-600">• Eco-Biogas</span>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>AI Spoilage Sentinel</span>
              <span class="text-emerald-800 font-mono font-semibold">Microbial ML</span>
            </div>
            <div class="text-2xl font-bold font-mono text-emerald-800 tracking-tight">0.42 <span class="text-xs font-normal text-slate-500">% Risk</span></div>
            <div class="mt-2 flex items-center text-[11px] text-slate-500 gap-1">
              <span>Transit + Thermal Check</span>
              <span class="text-emerald-800 font-medium">• Zero Acidity</span>
            </div>
          </div>
        </div>

        <!-- Cross-Division Integrated Production & Schedule Pipeline Monitor -->
        ${window.DairySyncSchedule ? window.DairySyncSchedule.renderScheduleWidget() : ''}

        <!-- 2 Column: AI Quality Rating Matrix & Spoilage Predictor -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- AI Quality Rating Matrix -->
          <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span class="text-emerald-800">${icons.sparkles}</span>
                    AI Quality Rating Matrix (Interactive Calculator)
                  </h3>
                  <p class="text-xs text-slate-500">Greenfields biochemical composition rating & sensory classification</p>
                </div>
                <button onclick="DairySyncTrouble.openTroubleModal()" class="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold transition-all">
                  Report Lab Outlier
                </button>
              </div>

              <!-- Interactive Controls -->
              <div class="space-y-3.5 text-xs">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-700 font-semibold">Milk Fat Content (%)</span>
                    <span id="calcFatVal" class="font-mono text-emerald-800 font-bold">3.95%</span>
                  </div>
                  <input type="range" id="calcFat" min="2.8" max="4.8" step="0.05" value="3.95" oninput="DairySyncLab.updateMatrix()" class="w-full">
                  <div class="flex justify-between text-[10px] text-slate-400">
                    <span>Low &lt;3.2%</span>
                    <span>Standard 3.6%</span>
                    <span>Spec &ge;3.8%</span>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-700 font-semibold">Protein Content (%)</span>
                    <span id="calcProteinVal" class="font-mono text-emerald-800 font-bold">3.35%</span>
                  </div>
                  <input type="range" id="calcProtein" min="2.6" max="4.0" step="0.05" value="3.35" oninput="DairySyncLab.updateMatrix()" class="w-full">
                  <div class="flex justify-between text-[10px] text-slate-400">
                    <span>Low &lt;2.9%</span>
                    <span>Standard 3.1%</span>
                    <span>Spec &ge;3.2%</span>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-700 font-semibold">pH Level (Acidity)</span>
                    <span id="calcPhVal" class="font-mono text-emerald-800 font-bold">6.72</span>
                  </div>
                  <input type="range" id="calcPh" min="6.2" max="7.0" step="0.02" value="6.72" oninput="DairySyncLab.updateMatrix()" class="w-full">
                  <div class="flex justify-between text-[10px] text-slate-400">
                    <span>Acidic &lt;6.55</span>
                    <span>Nominal 6.65 - 6.75</span>
                    <span>Alkaline &gt;6.85</span>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-700 font-semibold">Total Bacteria Count (CFU / mL)</span>
                    <span id="calcCfuVal" class="font-mono text-emerald-800 font-bold">140,000 CFU</span>
                  </div>
                  <input type="range" id="calcCfu" min="50000" max="800000" step="10000" value="140000" oninput="DairySyncLab.updateMatrix()" class="w-full">
                  <div class="flex justify-between text-[10px] text-slate-400">
                    <span>Pristine &lt;150k</span>
                    <span>Acceptable &lt;250k</span>
                    <span>Hazard &gt;500k</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dynamic Result Card -->
            <div id="matrixResultBox" class="mt-4 p-4 rounded-lg bg-emerald-50/60 border border-emerald-200">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-slate-600 font-medium">AI Calculated Classification:</span>
                <span id="matrixGradeBadge" class="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-emerald-100 text-emerald-900 border border-emerald-300">
                  GRADE A (PREMIUM GREENFIELDS)
                </span>
              </div>
              <p id="matrixStatusText" class="text-xs text-slate-700 mb-2 leading-relaxed">
                Approved for Premium Greenfields UHT & Pasteurized Milk lines. Exceeds national SNI standards.
              </p>
              <div class="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-emerald-200/60 text-slate-600">
                <div>Spoilage Risk: <strong id="matrixRiskText" class="text-emerald-900">Low (&lt;1%)</strong></div>
                <div>Projected Shelf-Life: <strong id="matrixShelfText" class="text-slate-800">9 Months (UHT)</strong></div>
              </div>
            </div>
          </div>

          <!-- AI Spoilage & Shelf-Life Predictor -->
          <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 class="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span class="text-emerald-800">${icons.clock}</span>
                    AI Spoilage Predictor (Transit + Temp Exposure)
                  </h3>
                  <p class="text-xs text-slate-500">Lactic acid bacteria growth simulation based on thermal transit exposure</p>
                </div>
                <span class="text-xs font-mono text-emerald-800 font-semibold">Kinetic ML</span>
              </div>

              <!-- Predictor Sliders -->
              <div class="space-y-4 text-xs">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-700 font-semibold">Transit Duration (Hours from Extraction)</span>
                    <span id="predHoursVal" class="font-mono text-emerald-800 font-bold">2.5 Hours</span>
                  </div>
                  <input type="range" id="predHours" min="0.5" max="12.0" step="0.5" value="2.5" oninput="DairySyncLab.updatePredictor()" class="w-full">
                  <div class="flex justify-between text-[10px] text-slate-400">
                    <span>Local (1h)</span>
                    <span>Corridor (3-4h)</span>
                    <span>Max Hold (12h)</span>
                  </div>
                </div>

                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-slate-700 font-semibold">Average Tank Temperature (°C)</span>
                    <span id="predTempVal" class="font-mono text-emerald-800 font-bold">3.4°C</span>
                  </div>
                  <input type="range" id="predTemp" min="2.0" max="8.5" step="0.1" value="3.4" oninput="DairySyncLab.updatePredictor()" class="w-full">
                  <div class="flex justify-between text-[10px] text-slate-400">
                    <span>Optimal (2.5 - 3.8°C)</span>
                    <span>Caution (4.0 - 5.0°C)</span>
                    <span>Hazard (&gt;6°C)</span>
                  </div>
                </div>

                <div class="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                  <strong class="text-slate-800 block mb-1">Microbiological Degradation Model:</strong>
                  Raw milk bacterial replication follows Arrhenius thermodynamics. When internal tank temperature exceeds 3.8°C, bacterial doubling time drops rapidly, accelerating protein denaturing.
                </div>
              </div>
            </div>

            <!-- Predictor Output Box -->
            <div id="predResultBox" class="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs text-slate-600 font-medium">Predicted Viable Holding Window:</span>
                <span id="predRemainingHours" class="font-mono text-base font-bold text-emerald-900">68 Hours Remaining</span>
              </div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-slate-600 font-medium">Acidification Risk:</span>
                <span id="predRiskPercent" class="font-mono text-xs font-bold text-emerald-800">1.8% Risk</span>
              </div>
              <div id="predVerdictBadge" class="p-2 rounded bg-emerald-100 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <span>${icons.shield}</span> <span>Status: Safe & Pristine - Approved for Production</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Spoilage & Expiration Logs & Interactive Checklist -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 class="text-sm font-bold text-slate-900">Daily Laboratory Assay & Spoilage Log</h3>
                <p class="text-xs text-slate-500">Electronic batch sign-offs & rejected lot diversion audit</p>
              </div>
              <span class="text-xs font-mono text-slate-500">ISO-17025 Certified</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    <th class="pb-2.5">Test ID / Batch</th>
                    <th class="pb-2.5">Timestamp</th>
                    <th class="pb-2.5">Fat / Protein</th>
                    <th class="pb-2.5">pH / CFU</th>
                    <th class="pb-2.5">AI Rating</th>
                    <th class="pb-2.5">Classification</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${labTests.map(test => {
                    const isRej = test.grade === 'Rejected';
                    return `
                      <tr class="hover:bg-slate-50/60 transition-colors">
                        <td class="py-2.5 font-mono">
                          <span class="font-bold text-slate-900 block">${test.id}</span>
                          <span class="text-[10px] text-slate-500">${test.batch}</span>
                        </td>
                        <td class="py-2.5 text-slate-500 font-mono">${test.timestamp}</td>
                        <td class="py-2.5 font-mono text-slate-800">
                          ${test.fat}% / ${test.protein}%
                        </td>
                        <td class="py-2.5 font-mono text-slate-700">
                          pH ${test.ph} • <span class="text-[10px] text-slate-500">${(test.cfu/1000).toFixed(0)}k CFU</span>
                        </td>
                        <td class="py-2.5">
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                            isRej ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }">
                            ${test.grade}
                          </span>
                        </td>
                        <td class="py-2.5">
                          <span class="text-[11px] ${isRej ? 'text-red-700 font-semibold' : 'text-slate-600'}">${test.status}</span>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Interactive Division Checklist (1 col) -->
          <div>
            ${DairySyncChecklist.renderChecklistCard('lab')}
          </div>
        </div>
      </div>
    `;
  }

  function updateMatrix() {
    const fat = document.getElementById('calcFat').value;
    const protein = document.getElementById('calcProtein').value;
    const ph = document.getElementById('calcPh').value;
    const cfu = document.getElementById('calcCfu').value;

    document.getElementById('calcFatVal').innerText = fat + '%';
    document.getElementById('calcProteinVal').innerText = protein + '%';
    document.getElementById('calcPhVal').innerText = ph;
    document.getElementById('calcCfuVal').innerText = parseInt(cfu).toLocaleString() + ' CFU';

    const result = window.DairySyncData.calculateQualityRating(fat, protein, ph, cfu);

    const badge = document.getElementById('matrixGradeBadge');
    const statusText = document.getElementById('matrixStatusText');
    const riskText = document.getElementById('matrixRiskText');
    const shelfText = document.getElementById('matrixShelfText');

    badge.innerText = result.grade.toUpperCase();
    if (result.grade === 'Grade A') {
      badge.className = 'px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-emerald-100 text-emerald-900 border border-emerald-300';
      riskText.className = 'text-emerald-900';
    } else if (result.grade === 'Grade B') {
      badge.className = 'px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-amber-50 text-amber-900 border border-amber-300';
      riskText.className = 'text-amber-900';
    } else {
      badge.className = 'px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-red-100 text-red-900 border border-red-300';
      riskText.className = 'text-red-700 font-bold';
    }

    statusText.innerText = result.status;
    riskText.innerText = result.risk;
    shelfText.innerText = result.shelfLife;
  }

  function updatePredictor() {
    const hours = document.getElementById('predHours').value;
    const temp = document.getElementById('predTemp').value;

    document.getElementById('predHoursVal').innerText = hours + ' Hours';
    document.getElementById('predTempVal').innerText = temp + '°C';

    const res = window.DairySyncData.predictShelfLife(hours, temp);

    document.getElementById('predRemainingHours').innerText = res.remainingHoldingHours + ' Hours Remaining';
    document.getElementById('predRiskPercent').innerText = res.riskPercent + '% Risk';
    
    const verdict = document.getElementById('predVerdictBadge');
    if (res.riskPercent > 50) {
      verdict.className = 'p-2 rounded bg-red-100 text-xs text-red-900 font-semibold flex items-center gap-2';
    } else if (res.riskPercent > 20) {
      verdict.className = 'p-2 rounded bg-amber-100 text-xs text-amber-900 font-semibold flex items-center gap-2';
    } else {
      verdict.className = 'p-2 rounded bg-emerald-100 text-xs text-emerald-900 font-semibold flex items-center gap-2';
    }
    verdict.innerHTML = `<span>${window.DairySyncIcons.shield}</span> <span>Status: ${res.verdict}</span>`;
  }

  return {
    render,
    updateMatrix,
    updatePredictor
  };
})();
