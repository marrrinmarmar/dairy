// PT Greenfields Indonesia - DairySync AI Cross-Division Integrated Schedule Monitor & AI Rescheduling Engine
window.DairySyncSchedule = (function () {

  // Setup Server-Sent Events listener for live multi-tab synchronization
  let sseSource = null;
  function initRealtimeSync() {
    try {
      if (!window.EventSource) return;
      if (sseSource) sseSource.close();
      sseSource = new EventSource('/api/events');

      sseSource.onmessage = function (event) {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.type === 'OVERDUE_ALERT_10AM') {
            console.log('[SSE] Overdue alert received from server:', parsed);
            if (window.DairySyncData) {
              window.DairySyncData.evaluateDeadlineCheck();
            }
          } else if (parsed.type === 'PRE_APPROVAL_NOTICE' || parsed.type === 'POST_APPROVAL_NOTICE' || parsed.type === 'REJECTION_NOTICE') {
            console.log('[SSE] Broadcast alert received:', parsed);
            if (window.DairySyncData) {
              const state = window.DairySyncData.getState();
              if (parsed.payload) {
                state.broadcastAlerts = [parsed.payload];
              }
              window.DairySyncData.notify();
            }
          }
        } catch (e) {}
      };

      sseSource.onerror = function () {
        // Fallback gracefully without throwing errors
      };
    } catch (e) {}
  }

  // Render the Cross-Division Schedule Pipeline Table & Gantt
  // Render the Cross-Division Schedule Pipeline Table & Gantt
  function renderScheduleWidget(options = {}) {
    const state = window.DairySyncData.getState();
    const pipeline = state.integratedPipeline || [];
    const currentRole = state.currentRole;
    const icons = window.DairySyncIcons || {};
    const aiRec = state.aiRescheduleRecommendation;
    const pmAlert = state.pmWarningAlert;
    const pendingReq = state.pendingExtendRequest;
    const broadcastAlerts = state.broadcastAlerts || [];

    // Filter by division if specified in options, else full pipeline
    const filterDivision = options.filterDivision || null;
    const displayedTasks = filterDivision ? pipeline.filter(t => t.division === filterDivision) : pipeline;

    // Helper: badge style per status
    function getStatusBadge(status) {
      if (status === 'completed') {
        return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Selesai (Tepat Waktu)
        </span>`;
      }
      if (status === 'in_progress') {
        return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 animate-pulse">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Sedang Berjalan
        </span>`;
      }
      if (status === 'delayed') {
        return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-50 text-red-700 border border-red-300 animate-pulse">
          <span class="w-1.5 h-1.5 rounded-full bg-red-600"></span> Terlambat / Alert Aktif
        </span>`;
      }
      return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
        <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Menunggu Giliran
      </span>`;
    }

    // Helper: division color accents
    function getDivisionColor(div) {
      const map = {
        farm: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        logistics: 'bg-sky-100 text-sky-900 border-sky-300',
        lab: 'bg-purple-100 text-purple-900 border-purple-300',
        production: 'bg-amber-100 text-amber-900 border-amber-300',
        warehouse: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      };
      return map[div] || 'bg-slate-100 text-slate-800 border-slate-300';
    }

    return `
      <!-- Cross-Division Integrated Production Pipeline Monitor -->
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <!-- Top Header & Simulator Controls -->
        <div class="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-emerald-900 text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                REAL-TIME SCHEDULE PIPELINE
              </span>
              <span class="text-xs text-slate-500">• Lintas Divisi Terintegrasi</span>
            </div>
            <h3 class="text-base font-extrabold text-slate-900 mt-1 flex items-center gap-2">
              Pemantauan Jadwal Harian Terpadu (Farm → Logistics → QC → Production → Warehouse)
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">
              Setiap tahapan saling terhubung. Keterlambatan di hulu meminta persetujuan (ACC) Project Manager & memberi notifikasi pra-persiapan ke semua divisi hilir.
            </p>
          </div>

          <!-- Virtual Clock & Simulation Trigger Bar -->
          <div class="flex items-center flex-wrap gap-2.5">
            <!-- Virtual Clock Indicator -->
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-300 shadow-xs">
              <span class="w-2 h-2 rounded-full ${state.virtualClock >= '10:00' ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}"></span>
              <span class="text-xs text-slate-500 font-medium">Jam Pabrik:</span>
              <span class="font-mono text-sm font-bold text-slate-900">${state.virtualClock} WIB</span>
            </div>

            <!-- Instant 10:00 AM Test Button -->
            <button 
              onclick="DairySyncData.triggerSimulated10AmCheck();" 
              title="Uji skenario jam 10:00 jika Batch 1 belum selesai"
              class="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
              <span>⏱️</span>
              <span>Uji Simulasi Jam 10:00 (Batch 1 Overdue)</span>
            </button>

            <!-- Reset Schedule Button -->
            <button 
              onclick="DairySyncData.resetToDefault();" 
              title="Kembalikan jadwal ke kondisi awal"
              class="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs transition-all shadow-xs">
              ${icons.refresh || '🔄'}
            </button>
          </div>
        </div>

        <!-- Multi-Division Broadcast Alert Notifications (Before ACC: Pra-Persiapan | After ACC: Resmi Di-ACC) -->
        ${broadcastAlerts.map(alert => {
          if (alert.type === 'PRE_APPROVAL_NOTICE') {
            return `
              <!-- ⚠️ PRE-APPROVAL PREPARATION ALERT BANNER (Shown to ALL divisions) -->
              <div class="p-4 bg-gradient-to-r from-amber-500/15 via-amber-50 to-orange-50 border-b-2 border-amber-400 animate-fade-in text-slate-800">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-start gap-3">
                    <span class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-sm flex-shrink-0 animate-bounce">
                      ⚠️
                    </span>
                    <div>
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-mono font-black uppercase tracking-wider shadow-2xs">
                          PERINGATAN PRA-PERSIAPAN LINTAS DIVISI
                        </span>
                        <span class="px-2 py-0.5 rounded bg-amber-200/80 text-amber-900 text-[10px] font-bold">
                          Status: Menunggu Persetujuan (ACC) Project Manager
                        </span>
                        <span class="text-xs text-slate-500 font-mono">• ${alert.timestamp}</span>
                      </div>
                      
                      <h4 class="text-sm font-extrabold text-amber-950 mt-1">
                        ${alert.title}
                      </h4>
                      <p class="text-xs text-slate-700 mt-1 leading-relaxed">
                        ${alert.message}
                      </p>

                      <!-- Preparation Checklist per Downstream Division -->
                      <div class="mt-3 p-3 rounded-xl bg-white/90 border border-amber-300 shadow-2xs">
                        <div class="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <span>🛡️</span> Instruksi Pra-Persiapan untuk Divisi Terdampak (Sambil Menunggu ACC PM):
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-slate-700">
                          <div class="p-2 rounded-lg bg-amber-50/70 border border-amber-200">
                            <strong class="text-amber-900 block mb-0.5">⚙️ Divisi Produksi (CIP):</strong>
                            Jaga boiler steam pada 82°C. Tahan antrean pencucian saluran sampai Batch 1 tuntas.
                          </div>
                          <div class="p-2 rounded-lg bg-amber-50/70 border border-amber-200">
                            <strong class="text-amber-900 block mb-0.5">📦 Divisi Gudang (Tetra Pak):</strong>
                            Tahan infeed feeding reel karton. Siapkan staging buffer pallet pendingin.
                          </div>
                          <div class="p-2 rounded-lg bg-amber-50/70 border border-amber-200">
                            <strong class="text-amber-900 block mb-0.5">🚚 Divisi Logistik:</strong>
                            Hubungkan shore power cold-box truk TRK-03. Sesuaikan estimasi tiba di Surabaya.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onclick="DairySyncData.dismissBroadcastAlert('${alert.id}')" 
                    title="Tutup banner peringatan ini"
                    class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-amber-100 transition-colors flex-shrink-0 text-xs">
                    ✕ Tutup
                  </button>
                </div>
              </div>
            `;
          }

          if (alert.type === 'POST_APPROVAL_NOTICE') {
            return `
              <!-- 📢 POST-APPROVAL OFFICIAL ANNOUNCEMENT BANNER (Shown to ALL divisions) -->
              <div class="p-4 bg-gradient-to-r from-emerald-500/15 via-emerald-50 to-teal-50 border-b-2 border-emerald-500 animate-fade-in text-slate-800">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-start gap-3">
                    <span class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                      📢
                    </span>
                    <div>
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-black uppercase tracking-wider shadow-2xs">
                          OFFICIAL SCHEDULE UPDATE DISINKRONKAN
                        </span>
                        <span class="px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-900 text-[10px] font-bold">
                          Status: RESMI DISETUJUI PROJECT MANAGER
                        </span>
                        <span class="text-xs text-slate-500 font-mono">• ${alert.timestamp}</span>
                      </div>
                      
                      <h4 class="text-sm font-extrabold text-emerald-950 mt-1">
                        ${alert.title}
                      </h4>
                      <p class="text-xs text-slate-700 mt-1 leading-relaxed">
                        ${alert.message}
                      </p>
                      
                      <div class="mt-2 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                        <span>✓ Seluruh lini operasional otomatis diselaraskan tanpa bottleneck. Silakan jalankan tugas sesuai jadwal terupdate.</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onclick="DairySyncData.dismissBroadcastAlert('${alert.id}')" 
                    title="Tutup banner notifikasi ini"
                    class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-emerald-100 transition-colors flex-shrink-0 text-xs">
                    ✕ Tutup
                  </button>
                </div>
              </div>
            `;
          }

          if (alert.type === 'REJECTION_NOTICE') {
            return `
              <!-- ℹ️ REJECTION NOTICE BANNER -->
              <div class="p-4 bg-slate-50 border-b-2 border-slate-400 animate-fade-in text-slate-800">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-start gap-3">
                    <span class="w-10 h-10 rounded-xl bg-slate-600 text-white flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                      ℹ️
                    </span>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="px-2.5 py-0.5 rounded-full bg-slate-700 text-white text-[10px] font-mono font-black uppercase">
                          PEMBERITAHUAN KEPUTUSAN PM
                        </span>
                        <span class="text-xs text-slate-500 font-mono">• ${alert.timestamp}</span>
                      </div>
                      <h4 class="text-sm font-extrabold text-slate-900 mt-1">
                        ${alert.title}
                      </h4>
                      <p class="text-xs text-slate-600 mt-1">
                        ${alert.message}
                      </p>
                    </div>
                  </div>
                  <button onclick="DairySyncData.dismissBroadcastAlert('${alert.id}')" class="text-slate-400 hover:text-slate-700 text-xs">✕ Tutup</button>
                </div>
              </div>
            `;
          }
          return '';
        }).join('')}

        <!-- Dedicated Project Manager Acceptance Card / Non-PM Waiting Status -->
        ${pendingReq ? `
          ${currentRole === 'pm' ? `
            <!-- PM EXCLUSIVE: ACCEPTANCE / APPROVAL ACTION CARD -->
            <div class="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white border-b-2 border-amber-500 shadow-md animate-fade-in">
              <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider">
                    PROJECT MANAGER ACCEPTANCE REQUIRED
                  </span>
                  <span class="text-xs text-amber-200/90">• Permintaan Persetujuan Extend Waktu Menunggu Keputusan Anda</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono text-slate-300">Waktu Pengajuan: ${pendingReq.timestamp}</span>
                </div>
              </div>

              <div class="bg-black/35 rounded-xl p-4 border border-amber-500/30 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span class="text-[10px] text-amber-300 uppercase font-mono block">Divisi Pemohon & Tahapan:</span>
                    <strong class="text-sm text-white">${pendingReq.divisionName}</strong>
                    <div class="text-slate-300 font-mono text-[11px] mt-0.5">${pendingReq.stageName} (Batch: ${pendingReq.batchId})</div>
                  </div>
                  <div>
                    <span class="text-[10px] text-amber-300 uppercase font-mono block">Pengajuan Tambahan Waktu:</span>
                    <strong class="text-lg text-amber-400 font-mono font-extrabold">+${pendingReq.delayMinutes} Menit</strong>
                    <div class="text-slate-300 text-[11px] mt-0.5">Alasan: "${pendingReq.reason}"</div>
                  </div>
                  <div>
                    <span class="text-[10px] text-amber-300 uppercase font-mono block">Dampak Rantai Pasok Hilir:</span>
                    <div class="text-slate-300 text-[11px] leading-tight">
                      Pergeseran berantai pada 3 divisi (CIP Produksi, Packaging Gudang, Logistik). Seluruh divisi saat ini telah menerima <strong>Notifikasi Pra-Persiapan</strong>.
                    </div>
                  </div>
                </div>
              </div>

              <!-- PM Acceptance Action Buttons -->
              <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div class="text-xs text-amber-200/80 flex items-center gap-1.5">
                  <span>💡</span> Sebagai Project Manager, persetujuan Anda akan otomatis menyinkronkan timeline resmi ke semua divisi.
                </div>
                <div class="flex items-center gap-2.5">
                  <button 
                    onclick="DairySyncData.rejectTaskExtend('Pertahankan target waktu semula'); if (window.DairySyncApp) window.DairySyncApp.playAudio('click');"
                    class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 transition-all shadow-xs">
                    ❌ Tolak Pengajuan
                  </button>
                  <button 
                    onclick="DairySyncData.approveTaskExtend(); if (window.DairySyncApp) window.DairySyncApp.playAudio('click');"
                    class="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 animate-pulse">
                    <span>✅</span>
                    <span>Setujui (ACC) & Terapkan Pergeseran Jadwal Resmi</span>
                  </button>
                </div>
              </div>
            </div>
          ` : `
            <!-- Non-PM Division User: Waiting Status Notice -->
            <div class="p-3.5 bg-amber-50 border-b border-amber-300 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
              <div class="flex items-center gap-2">
                <span class="animate-spin text-sm">⏳</span>
                <span>
                  Pengajuan Extend Waktu (+${pendingReq.delayMinutes}m untuk ${pendingReq.stageName}) <strong>sedang menunggu peninjauan & persetujuan (ACC) dari Project Manager</strong>.
                </span>
              </div>
              <button 
                onclick="DairySyncApp.switchRole('pm')" 
                class="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs whitespace-nowrap shadow-xs flex items-center gap-1">
                <span>👑</span> Beralih ke Role PM untuk Memberikan ACC →
              </button>
            </div>
          `}
        ` : ''}

        <!-- PM Warning Alert Banner (if active) -->
        ${pmAlert && pmAlert.active && !pendingReq ? `
          <div class="p-4 ${pmAlert.severity === 'Critical' ? 'bg-red-50 border-b border-red-200' : 'bg-amber-50 border-b border-amber-200'} flex items-start justify-between gap-3 animate-fade-in">
            <div class="flex items-start gap-3">
              <span class="p-2 rounded-lg ${pmAlert.severity === 'Critical' ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'} text-sm mt-0.5 shadow-xs">
                ⚠️
              </span>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${pmAlert.severity === 'Critical' ? 'bg-red-200 text-red-900' : 'bg-amber-200 text-amber-900'}">
                    ${pmAlert.title}
                  </span>
                  <span class="text-xs text-slate-500">• ${pmAlert.time}</span>
                </div>
                <p class="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
                  ${pmAlert.message}
                </p>
                ${currentRole === 'production' ? `
                  <button onclick="DairySyncSchedule.openInteractivePromptModal('pipe-prd-01')" class="mt-2 px-3 py-1.5 rounded-md bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-all shadow-xs">
                    👉 Buka Dialog Konfirmasi Produksi Sekarang
                  </button>
                ` : ''}
              </div>
            </div>
            <button onclick="DairySyncData.dismissPmWarningAlert()" class="text-slate-400 hover:text-slate-600 text-xs px-2 py-1">
              ✕ Tutup
            </button>
          </div>
        ` : ''}

        <!-- AI Delay Impact Analysis & Rescheduling Recommendation Card (if generated without pending request) -->
        ${aiRec && !pendingReq ? `
          <div class="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white border-b border-emerald-800/50">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  AI SUPPLY CHAIN RESCHEDULER
                </span>
                <span class="text-xs text-emerald-200/80">• Auto-Delay Impact Analysis Aktif</span>
              </div>
              <div class="flex items-center gap-2">
                ${currentRole === 'pm' ? `
                  <button onclick="DairySyncData.applyAiReschedule();" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5">
                    ✅ Terapkan Jadwal Rekomendasi AI ke Semua Divisi
                  </button>
                ` : `
                  <span class="text-xs text-emerald-300 font-mono italic">
                    Menunggu Persetujuan Project Manager untuk Terapkan
                  </span>
                `}
              </div>
            </div>

            <div class="text-xs sm:text-sm text-slate-200 font-medium mb-4 leading-relaxed bg-black/25 p-3 rounded-lg border border-white/10">
              <strong class="text-emerald-300">Ringkasan Eksekutif AI untuk PM:</strong> ${aiRec.summaryForPM}
            </div>

            <!-- Downstream Cascading Impact Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              ${aiRec.downstreamImpacts.map(impact => `
                <div class="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <div class="font-bold text-emerald-300 text-[11px] uppercase tracking-wider mb-1">
                    ${impact.divisionName}
                  </div>
                  <div class="text-slate-300 text-[11px] leading-snug">
                    ${impact.impact}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Mitigation Steps Recommended by AI -->
            <div class="space-y-1.5 text-xs text-slate-300 bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/20">
              <div class="font-bold text-emerald-300 text-[11px] uppercase tracking-wider mb-1">
                🛡️ Rekomendasi Tindakan Mitigasi AI:
              </div>
              ${aiRec.mitigationActions.map(action => `
                <div class="flex items-start gap-2 text-[11px]">
                  <span class="text-emerald-400 font-bold">•</span>
                  <span>${action}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Interactive Schedule Table (Read-Only for non-owners, Actionable for owners) -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <tr>
                <th class="py-3 px-4 w-12 text-center">No</th>
                <th class="py-3 px-4">Divisi & Tahapan Alur</th>
                <th class="py-3 px-4">Jadwal Rencana</th>
                <th class="py-3 px-4">Ketergantungan (Depends On)</th>
                <th class="py-3 px-4">Status & Progres</th>
                <th class="py-3 px-4 text-right">Aksi Terpadu</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${displayedTasks.map((t, index) => {
                const isOwner = (currentRole === t.division) || (currentRole === 'pm');
                const isTaskDelayed = t.status === 'delayed';

                return `
                  <tr class="hover:bg-slate-50/75 transition-colors ${isTaskDelayed ? 'bg-red-50/40' : ''}">
                    <!-- Step Number -->
                    <td class="py-3.5 px-4 text-center font-mono font-bold text-slate-500">
                      ${t.stepNumber}
                    </td>

                    <!-- Division & Stage Name -->
                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getDivisionColor(t.division)}">
                          ${t.divisionName}
                        </span>
                        ${t.isKeyMilestone ? `
                          <span class="px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[9px] font-bold border border-red-200">
                            TARGET DEADLINE ${t.deadlineTime}
                          </span>
                        ` : ''}
                      </div>
                      <div class="font-bold text-slate-900 mt-1 text-sm">
                        ${t.stageName}
                      </div>
                      <div class="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Batch: <strong class="text-slate-700">${t.batchId}</strong></span>
                        <span>• PIC: ${t.assignedPIC}</span>
                      </div>
                    </td>

                    <!-- Scheduled Times (Shows original, potential pending ACC, or AI approved time) -->
                    <td class="py-3.5 px-4">
                      ${t.pendingApproval ? `
                        <div>
                          <div class="font-mono text-xs text-slate-700 font-semibold">
                            ${t.plannedStart} - ${t.plannedEnd} WIB
                          </div>
                          <div class="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2 py-1 rounded border border-amber-300 mt-1 inline-block animate-pulse shadow-2xs">
                            ⚠️ Potensi Baru: ${t.potentialStart} - ${t.potentialEnd} WIB
                            <div class="text-[9px] text-amber-800 font-sans font-bold mt-0.5">
                              Menunggu ACC PM (Pra-Persiapan Divisi +${t.potentialShift || 0}m)
                            </div>
                          </div>
                        </div>
                      ` : (t.originalStart && t.originalEnd && (t.plannedStart !== t.originalStart || t.plannedEnd !== t.originalEnd)) ? `
                        <div>
                          <div class="font-mono text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 inline-block shadow-2xs">
                            ${t.plannedStart} - ${t.plannedEnd} WIB
                          </div>
                          <div class="text-[10px] text-slate-400 line-through font-mono mt-0.5">
                            Semula: ${t.originalStart} - ${t.originalEnd} WIB
                          </div>
                          <div class="text-[10px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                            <span>✓</span> Resmi Di-ACC PM (+${t.delayShiftMinutes || 0}m)
                          </div>
                        </div>
                      ` : `
                        <div class="font-mono text-xs font-semibold text-slate-800">
                          ${t.plannedStart} - ${t.plannedEnd} WIB
                        </div>
                      `}
                      ${t.actualEnd ? `
                        <div class="text-[11px] text-emerald-700 font-mono mt-0.5">
                          ✓ Realisasi: ${t.actualEnd} WIB
                        </div>
                      ` : `
                        <div class="text-[10px] text-slate-400 mt-0.5">
                          ${t.notes}
                        </div>
                      `}
                    </td>

                    <!-- Dependencies -->
                    <td class="py-3.5 px-4 text-[11px] text-slate-500">
                      ${t.dependsOn ? `
                        <div class="flex items-center gap-1.5 text-slate-600 font-mono">
                          <span>↳</span>
                          <span>Setelah Tahap ${pipeline.find(p => p.id === t.dependsOn)?.stepNumber || ''} (${pipeline.find(p => p.id === t.dependsOn)?.divisionName.split(' ')[0] || ''})</span>
                        </div>
                      ` : `
                        <span class="text-slate-400 italic">Tahap Awal Rantai Pasok</span>
                      `}
                    </td>

                    <!-- Status Badge -->
                    <td class="py-3.5 px-4">
                      ${getStatusBadge(t.status)}
                      <div class="text-[10px] text-slate-500 mt-1">
                        ${t.statusLabel}
                      </div>
                    </td>

                    <!-- Action Controls -->
                    <td class="py-3.5 px-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        ${isOwner ? `
                          ${t.status !== 'completed' ? `
                            ${t.pendingApproval ? `
                              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 animate-pulse shadow-xs">
                                <span>⏳</span> Menunggu ACC PM
                              </span>
                            ` : `
                              <button 
                                onclick="DairySyncSchedule.openInteractivePromptModal('${t.id}')"
                                class="px-2.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1">
                                <span>Konfirmasi Selesai</span>
                              </button>
                              <button 
                                onclick="DairySyncSchedule.openExtendModal('${t.id}')"
                                title="Laporkan kendala dan ajukan extend waktu untuk persetujuan PM"
                                class="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs shadow-xs transition-all flex items-center gap-1">
                                <span>⏱️ Extend Waktu</span>
                              </button>
                            `}
                          ` : `
                            <span class="text-xs text-emerald-800 font-bold flex items-center gap-1 justify-end">
                              <span>✓</span> Terverifikasi
                            </span>
                          `}
                        ` : `
                          <span class="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100 px-2 py-1 rounded border border-slate-200" title="Anda hanya memiliki hak Read-Only untuk divisi ini">
                            <span>🔒</span> Read-Only
                          </span>
                        `}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Footer Legend & Explanations -->
        <div class="p-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-3">
          <div class="flex items-center gap-3">
            <span class="font-bold text-slate-700">Aksesibilitas Peran:</span>
            <span>Semua divisi dapat memantau secara transparan</span>
            <span>• Tombol aksi hanya dapat diklik oleh divisi yang bersangkutan & PM</span>
          </div>
          <div class="flex items-center gap-2 font-mono">
            <span>Sistem Sinkronisasi Real-Time:</span>
            <span class="text-emerald-700 font-bold">● Aktif (SSE / Event Stream)</span>
          </div>
        </div>
      </div>
    `;
  }

  // Interactive Pop-up / Modal Prompt (e.g. at 10:00 AM for Production)
  function openInteractivePromptModal(taskId = 'pipe-prd-01') {
    const state = window.DairySyncData.getState();
    const task = state.integratedPipeline.find(t => t.id === taskId) || state.integratedPipeline[3];
    
    // Remove old modal if exists
    const existing = document.getElementById('urgent-interactive-modal');
    if (existing) existing.remove();

    const modalHtml = `
      <div id="urgent-interactive-modal" class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
          <!-- Header -->
          <div class="p-5 bg-gradient-to-r from-red-600 to-rose-700 text-white flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-lg">⚠️</span>
              <div>
                <span class="text-[10px] font-mono font-bold tracking-widest uppercase bg-black/20 px-2 py-0.5 rounded">
                  POP-UP ALERT INTERAKTIF PRODUKSI
                </span>
                <h4 class="text-base font-bold text-white mt-0.5">Konfirmasi Jadwal Jam 10:00 WIB</h4>
              </div>
            </div>
            <button onclick="DairySyncSchedule.closeInteractivePromptModal()" class="text-white/80 hover:text-white text-lg">✕</button>
          </div>

          <!-- Body -->
          <div class="p-5 space-y-4">
            <div class="p-3.5 rounded-xl bg-red-50 border border-red-200 text-slate-800 text-xs leading-relaxed">
              <div class="font-bold text-red-900 text-sm mb-1 flex items-center gap-1.5">
                <span>🔔</span> Apakah ada kendala pada ${task.stageName}?
              </div>
              Batas waktu jadwal (jam <strong>${task.deadlineTime || '10:00'} WIB</strong>) telah tercapai. Sistem belum mendeteksi input konfirmasi penyelesaian pada database untuk <strong>${task.batchName}</strong>.
            </div>

            <!-- Choice Action Buttons -->
            <div id="prompt-action-choices" class="space-y-2.5">
              <button 
                onclick="DairySyncSchedule.confirmComplete('${task.id}')"
                class="w-full p-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-between">
                <span>✅ Segera Konfirmasi Selesai</span>
                <span class="text-[11px] font-normal opacity-90 font-mono">Tandai tepat waktu →</span>
              </button>

              <button 
                onclick="DairySyncSchedule.showIssueForm()"
                class="w-full p-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold transition-all flex items-center justify-between">
                <span>⚠️ Laporkan Kendala / Delay</span>
                <span class="text-[11px] font-normal text-amber-700 font-mono">Buka form kendala →</span>
              </button>
            </div>

            <!-- Issue Reporting Sub-Form (Hidden initially) -->
            <div id="prompt-issue-form" class="hidden space-y-3 pt-2 border-t border-slate-100 animate-fade-in">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Kendala yang Terjadi:
                </label>
                <select id="issue-category-select" class="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none">
                  <option value="Klep homogenizer tersumbat & butuh flush">Klep homogenizer tersumbat & butuh flushing</option>
                  <option value="Suhu plate pasteurizer naik melebihi batas 142°C">Suhu plate pasteurizer naik melebihi batas 142°C</option>
                  <option value="Penurunan tekanan uap boiler utama">Penurunan tekanan uap boiler utama</option>
                  <option value="Keterlambatan pasokan carton packaging dari gudang">Keterlambatan pasokan carton packaging dari gudang</option>
                  <option value="Lainnya">Lainnya (Tulis detail di bawah)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">
                  Catatan / Keterangan Kendala:
                </label>
                <textarea 
                  id="issue-details-text" 
                  rows="2" 
                  placeholder="Contoh: Terjadi fluktuasi tekanan homogenizer, teknisi sedang melakukan kalibrasi..."
                  class="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"></textarea>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">
                  Estimasi Tambahan Waktu Keterlambatan:
                </label>
                <div class="grid grid-cols-4 gap-2">
                  <label class="flex items-center justify-center p-2 rounded-lg border border-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="delay-option" value="15" class="mr-1.5" /> +15m
                  </label>
                  <label class="flex items-center justify-center p-2 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-xs font-bold cursor-pointer">
                    <input type="radio" name="delay-option" value="30" checked class="mr-1.5" /> +30m
                  </label>
                  <label class="flex items-center justify-center p-2 rounded-lg border border-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="delay-option" value="45" class="mr-1.5" /> +45m
                  </label>
                  <label class="flex items-center justify-center p-2 rounded-lg border border-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="delay-option" value="60" class="mr-1.5" /> +60m
                  </label>
                </div>
              </div>

              <div class="pt-2 flex items-center justify-end gap-2">
                <button 
                  onclick="DairySyncSchedule.hideIssueForm()" 
                  class="px-3 py-2 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-50">
                  Kembali
                </button>
                <button 
                  onclick="DairySyncSchedule.submitIssueReport('${task.id}')" 
                  class="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5">
                  <span>🚀</span>
                  <span>Kirim Laporan & Minta Rekomendasi AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  function closeInteractivePromptModal() {
    const modal = document.getElementById('urgent-interactive-modal');
    if (modal) modal.remove();
    window.DairySyncData.closeProductionDialog();
  }

  function showIssueForm() {
    const choices = document.getElementById('prompt-action-choices');
    const form = document.getElementById('prompt-issue-form');
    if (choices) choices.classList.add('hidden');
    if (form) form.classList.remove('hidden');
  }

  function hideIssueForm() {
    const choices = document.getElementById('prompt-action-choices');
    const form = document.getElementById('prompt-issue-form');
    if (choices) choices.classList.remove('hidden');
    if (form) form.classList.add('hidden');
  }

  function confirmComplete(taskId) {
    window.DairySyncData.resolveBatchFromPrompt(taskId, 'complete_now');
    closeInteractivePromptModal();
  }

  function submitIssueReport(taskId) {
    const categorySelect = document.getElementById('issue-category-select');
    const detailsText = document.getElementById('issue-details-text');
    const delayOption = document.querySelector('input[name="delay-option"]:checked');

    const category = categorySelect ? categorySelect.value : 'Kendala Mesin Produksi';
    const details = detailsText && detailsText.value ? detailsText.value.trim() : category;
    const delayMinutes = delayOption ? parseInt(delayOption.value, 10) : 30;

    window.DairySyncData.resolveBatchFromPrompt(taskId, 'report_delay', details, delayMinutes);
    closeInteractivePromptModal();
  }

  // Dedicated Extend Time & AI Rescheduling Modal for any task
  function openExtendModal(taskId) {
    const state = window.DairySyncData.getState();
    const task = state.integratedPipeline.find(t => t.id === taskId);
    if (!task) return;

    // Remove existing modal if any
    const existing = document.getElementById('extend-schedule-modal');
    if (existing) existing.remove();

    const modalHtml = `
      <div id="extend-schedule-modal" class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
          <div class="p-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-lg">⏱️</span>
              <div>
                <span class="text-[10px] font-mono font-bold tracking-widest uppercase bg-black/20 px-2 py-0.5 rounded">
                  APPROVAL & PREPARATION WORKFLOW
                </span>
                <h4 class="text-base font-bold text-white mt-0.5">Ajukan Extend Waktu Operasional</h4>
              </div>
            </div>
            <button onclick="DairySyncSchedule.closeExtendModal()" class="text-white/80 hover:text-white text-lg">✕</button>
          </div>

          <div class="p-5 space-y-4">
            <div class="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs">
              <div class="font-bold text-amber-900 mb-0.5">
                ${task.stepNumber}. ${task.stageName} (${task.divisionName})
              </div>
              <div class="text-slate-600 font-mono">
                Jadwal Saat Ini: <strong>${task.plannedStart} - ${task.plannedEnd} WIB</strong>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">
                Keterangan Kendala / Alasan Tambahan Waktu:
              </label>
              <textarea 
                id="extend-reason-input" 
                rows="2" 
                placeholder="Contoh: Terjadi kendala pembersihan nozzle, butuh extend 30 menit..."
                class="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none">Penyelarasan parameter operasional dan penanganan kendala</textarea>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">
                Pilih Durasi Extend Waktu yang Diajukan:
              </label>
              <div class="grid grid-cols-4 gap-2">
                <label class="flex items-center justify-center p-2.5 rounded-lg border border-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-50">
                  <input type="radio" name="modal-delay-option" value="15" class="mr-1.5" /> +15m
                </label>
                <label class="flex items-center justify-center p-2.5 rounded-lg border border-amber-400 bg-amber-50 text-amber-900 text-xs font-bold cursor-pointer">
                  <input type="radio" name="modal-delay-option" value="30" checked class="mr-1.5" /> +30m
                </label>
                <label class="flex items-center justify-center p-2.5 rounded-lg border border-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-50">
                  <input type="radio" name="modal-delay-option" value="45" class="mr-1.5" /> +45m
                </label>
                <label class="flex items-center justify-center p-2.5 rounded-lg border border-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-50">
                  <input type="radio" name="modal-delay-option" value="60" class="mr-1.5" /> +60m
                </label>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-xs text-amber-950 leading-relaxed space-y-2">
              <div class="font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                <span>🛡️</span> Alur Kerja Persetujuan PM & Notifikasi Divisi:
              </div>
              <div class="space-y-1.5 text-[11px] text-slate-700">
                <div class="flex items-start gap-1.5">
                  <span class="text-amber-600 font-bold">1.</span>
                  <span><strong>Sebelum di-ACC:</strong> Semua divisi (CIP, Gudang, Logistik) mendapat <em>Alert Pra-Persiapan</em> untuk bersiap terhadap potensi pergeseran jadwal.</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="text-amber-600 font-bold">2.</span>
                  <span><strong>Verifikasi PM:</strong> Project Manager menerima tiket persetujuan untuk menyetujui (ACC) atau menolak.</span>
                </div>
                <div class="flex items-start gap-1.5">
                  <span class="text-emerald-700 font-bold">3.</span>
                  <span><strong>Sesudah di-ACC:</strong> Seluruh divisi mendapat <em>Notifikasi Resmi</em> bahwa jadwal baru telah aktif dan seluruh estimasi hilir otomatis bergeser tanpa jeda!</span>
                </div>
              </div>
            </div>

            <div class="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button 
                onclick="DairySyncSchedule.closeExtendModal()" 
                class="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-50">
                Batal
              </button>
              <button 
                onclick="DairySyncSchedule.submitExtendRequest('${task.id}')" 
                class="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5">
                <span>🚀</span>
                <span>Ajukan Extend ke PM & Broadcast Pra-Persiapan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  function closeExtendModal() {
    const modal = document.getElementById('extend-schedule-modal');
    if (modal) modal.remove();
  }

  function submitExtendRequest(taskId) {
    const reasonInput = document.getElementById('extend-reason-input');
    const delayOption = document.querySelector('input[name="modal-delay-option"]:checked');

    const reason = reasonInput ? reasonInput.value.trim() : 'Extend waktu operasional';
    const delayMinutes = delayOption ? parseInt(delayOption.value, 10) : 30;

    window.DairySyncData.requestTaskExtend(taskId, delayMinutes, reason);
    closeExtendModal();
  }

  // Initialize SSE on script load
  initRealtimeSync();

  return {
    renderScheduleWidget,
    openInteractivePromptModal,
    closeInteractivePromptModal,
    showIssueForm,
    hideIssueForm,
    confirmComplete,
    submitIssueReport,
    openExtendModal,
    closeExtendModal,
    submitExtendRequest
  };
})();
