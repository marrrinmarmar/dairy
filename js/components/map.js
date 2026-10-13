// PT Greenfields Indonesia - DairySync AI Interactive Map Engine
// Minimalist Industrial Design: Clean Map Canvas with Greenfields Dark Forest Markers
window.DairySyncMap = (function () {
  let pmMapInstance = null;
  let logMapInstance = null;
  let pmMarkers = [];
  let logMarkers = [];
  let routeLines = [];

  // Minimalist vector icons for maps
  function createCustomIcon(type, label, status, isBreakdown = false) {
    const pulseHtml = isBreakdown ? `<span class="absolute -inset-1 rounded-full bg-red-500 opacity-60 minimal-ping"></span>` : '';
    let iconSvg = '';
    
    if (type === 'truck') {
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ${isBreakdown ? 'text-red-600' : 'text-emerald-800'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="1"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2"></circle>
          <circle cx="18.5" cy="18.5" r="2"></circle>
        </svg>
      `;
    } else if (type === 'farm') {
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      `;
    } else if (type === 'plant') {
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 20h20"></path>
          <path d="M6 20V10l6 4V4l8 6v10"></path>
        </svg>
      `;
    } else if (type === 'lab') {
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 2v7.31L4.69 17.5A2 2 0 0 0 6.44 20.5h11.12a2 2 0 0 0 1.75-3L14 9.31V2"></path>
        </svg>
      `;
    } else if (type === 'distribution') {
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="21 8 21 21 3 21 3 8"></polyline>
          <rect x="1" y="3" width="22" height="5" rx="1"></rect>
          <line x1="10" y1="12" x2="14" y2="12"></line>
        </svg>
      `;
    } else if (type === 'breakdown') {
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 2 22 22 22 12 2"></polygon>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      `;
    }

    const html = `
      <div class="relative group flex items-center justify-center">
        ${pulseHtml}
        <div class="relative flex items-center justify-center w-8 h-8 rounded-full bg-white border ${isBreakdown ? 'border-red-400 shadow-red-100' : 'border-slate-300 shadow-slate-100'} shadow-md transition-transform group-hover:scale-110">
          ${iconSvg}
        </div>
        <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono font-medium text-slate-700 whitespace-nowrap pointer-events-none shadow-sm">
          ${label}
        </div>
      </div>
    `;

    return L.divIcon({
      html: html,
      className: 'custom-map-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18]
    });
  }

  return {
    initPmMap: function (elementId) {
      const container = document.getElementById(elementId);
      if (!container) return;

      if (pmMapInstance) {
        pmMapInstance.remove();
        pmMapInstance = null;
      }

      pmMapInstance = L.map(elementId, {
        zoomControl: false,
        attributionControl: false
      }).setView([-7.85, 112.55], 9);

      L.control.zoom({ position: 'bottomright' }).addTo(pmMapInstance);

      // CartoDB Positron (Clean Minimalist Light Tile)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(pmMapInstance);

      this.renderPmMapEntities();
    },

    renderPmMapEntities: function () {
      if (!pmMapInstance) return;
      const state = window.DairySyncData.getState();

      pmMarkers.forEach(m => pmMapInstance.removeLayer(m));
      pmMarkers = [];

      // Render Fixed Nodes (Farms, Lab, Plant, Hub)
      state.nodes.forEach(node => {
        const icon = createCustomIcon(node.type, node.name.split(' - ')[0], node.status, false);
        const marker = L.marker([node.lat, node.lng], { icon: icon }).addTo(pmMapInstance);

        marker.bindPopup(`
          <div class="p-3 min-w-[210px] text-slate-800 font-sans">
            <div class="flex items-center gap-2 mb-1.5 border-b border-slate-100 pb-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
              <h4 class="font-bold text-xs uppercase tracking-wider text-slate-900">${node.name}</h4>
            </div>
            <p class="text-[11px] text-slate-600 mb-1">Status: <span class="text-emerald-700 font-semibold">${node.status}</span></p>
            <p class="text-[11px] text-slate-500 mb-1">${node.details}</p>
            <div class="pt-1.5 border-t border-slate-100 text-[10px] text-slate-500">
              PIC: <strong class="text-slate-700">${node.pj}</strong>
            </div>
          </div>
        `, { className: 'clean-leaflet-popup' });

        pmMarkers.push(marker);
      });

      // Transport corridor polyline (Deep Forest Green)
      const corridorPath = [
        [-8.1130, 112.7210],
        [-8.0650, 112.6350],
        [-8.0280, 112.5180],
        [-7.7200, 112.6800],
        [-7.3150, 112.7300]
      ];

      const poly = L.polyline(corridorPath, {
        color: '#064E3B',
        weight: 2.5,
        opacity: 0.6,
        dashArray: '5, 6',
        lineCap: 'round'
      }).addTo(pmMapInstance);
      pmMarkers.push(poly);

      // Render Trucks
      state.trucks.forEach(truck => {
        const isBreakdown = truck.status === 'BREAKDOWN';
        const icon = createCustomIcon('truck', truck.id, truck.status, isBreakdown);
        const marker = L.marker([truck.lat, truck.lng], { icon: icon }).addTo(pmMapInstance);

        marker.bindPopup(`
          <div class="p-3 min-w-[220px] text-slate-800 font-sans">
            <div class="flex items-center justify-between gap-2 mb-2 border-b border-slate-100 pb-1.5">
              <span class="font-bold text-xs text-slate-900">${truck.id} (${truck.plate})</span>
              <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide ${isBreakdown ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}">
                ${truck.status}
              </span>
            </div>
            <div class="space-y-1 text-[11px] text-slate-600">
              <p><span class="text-slate-400">Driver:</span> ${truck.driver} (${truck.phone})</p>
              <p><span class="text-slate-400">Route:</span> ${truck.route}</p>
              <p><span class="text-slate-400">Cargo:</span> <strong>${truck.volume.toLocaleString()} L</strong> (${truck.currentBatch})</p>
              <div class="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                <span class="text-slate-400">Tank Temp:</span>
                <span class="font-mono font-bold ${truck.temp > 4 ? 'text-red-600' : 'text-emerald-800'}">${truck.temp}°C</span>
              </div>
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-slate-400">Speed / ETA:</span>
                <span class="font-mono text-slate-800 font-medium">${truck.speed} km/h • ${truck.eta}</span>
              </div>
            </div>
          </div>
        `, { className: 'clean-leaflet-popup' });

        pmMarkers.push(marker);
      });
    },

    initLogisticsMap: function (elementId) {
      const container = document.getElementById(elementId);
      if (!container) return;

      if (logMapInstance) {
        logMapInstance.remove();
        logMapInstance = null;
      }

      logMapInstance = L.map(elementId, {
        zoomControl: false,
        attributionControl: false
      }).setView([-8.05, 112.58], 11);

      L.control.zoom({ position: 'bottomright' }).addTo(logMapInstance);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(logMapInstance);

      this.renderLogisticsMapEntities();
    },

    renderLogisticsMapEntities: function (activeTruckId = null) {
      if (!logMapInstance) return;
      const state = window.DairySyncData.getState();

      logMarkers.forEach(m => logMapInstance.removeLayer(m));
      logMarkers = [];

      state.nodes.forEach(node => {
        if (node.type === 'plant' || node.type === 'farm') {
          const icon = createCustomIcon(node.type, node.name.split(' - ')[0], node.status, false);
          const marker = L.marker([node.lat, node.lng], { icon }).addTo(logMapInstance);
          logMarkers.push(marker);
        }
      });

      state.trucks.forEach(truck => {
        const isBreakdown = truck.status === 'BREAKDOWN';
        const icon = createCustomIcon('truck', truck.id, truck.status, isBreakdown);
        const marker = L.marker([truck.lat, truck.lng], { icon }).addTo(logMapInstance);

        marker.bindPopup(`
          <div class="p-3 min-w-[230px] text-slate-800 font-sans">
            <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
              <div>
                <span class="text-xs font-bold text-slate-900 block">${truck.id} • ${truck.plate}</span>
                <span class="text-[10px] text-slate-500">Driver: ${truck.driver}</span>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${isBreakdown ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}">
                ${truck.status}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-2 mb-2 p-2 rounded bg-slate-50 border border-slate-200 text-[11px]">
              <div>
                <span class="text-[9px] uppercase tracking-wider text-slate-400 block">Tank Temp</span>
                <span class="font-mono text-sm font-bold ${truck.temp > 4 ? 'text-red-600' : 'text-emerald-800'}">${truck.temp}°C</span>
              </div>
              <div>
                <span class="text-[9px] uppercase tracking-wider text-slate-400 block">Speed</span>
                <span class="font-mono text-sm font-bold text-slate-800">${truck.speed} km/h</span>
              </div>
            </div>

            <div class="mb-2">
              <div class="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>${truck.routeFrom}</span>
                <span>${truck.routeTo}</span>
              </div>
              <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div class="bg-emerald-700 h-full rounded-full transition-all duration-500" style="width: ${truck.progress}%"></div>
              </div>
            </div>

            <div class="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
              <span>Chiller: <strong class="text-slate-700">${truck.chillerHealth}</strong></span>
              <span class="font-mono text-emerald-800">${truck.lastPing}</span>
            </div>
          </div>
        `, { className: 'clean-leaflet-popup' });

        logMarkers.push(marker);
      });
    },

    focusTruck: function (truckId) {
      const state = window.DairySyncData.getState();
      const truck = state.trucks.find(t => t.id === truckId);
      if (truck && logMapInstance) {
        logMapInstance.setView([truck.lat, truck.lng], 13, { animate: true });
        this.renderLogisticsMapEntities(truckId);
      }
    },

    tickSimulation: function () {
      const state = window.DairySyncData.getState();
      state.trucks.forEach(t => {
        if (t.status === 'ON ROAD') {
          t.lat += (Math.random() - 0.48) * 0.0008;
          t.lng += (Math.random() - 0.48) * 0.0008;
          t.speed = Math.max(35, Math.min(75, t.speed + Math.floor((Math.random() - 0.5) * 4)));
          t.lastPing = 'Just now';
        }
      });
      if (pmMapInstance) this.renderPmMapEntities();
      if (logMapInstance) this.renderLogisticsMapEntities();
    }
  };
})();
