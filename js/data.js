// PT Greenfields Indonesia - DairySync AI State & Mock Data Engine
window.DairySyncData = (function () {
  const initialData = {
    currentRole: 'pm', // 'pm' | 'farm' | 'logistics' | 'lab' | 'production' | 'warehouse'
    soundEnabled: true,
    lastUpdate: new Date().toLocaleTimeString(),
    
    roles: {
      pm: {
        id: 'pm',
        name: 'Project Manager (Admin Utama)',
        short: 'Project Manager',
        code: 'ROLE-PM01',
        department: 'Executive Operations & Central Command',
        icon: 'pm',
        badge: 'Executive Oversight',
        color: 'emerald',
        canReport: false,
        canChecklist: false,
        canDownloadReport: true,
        description: 'Comprehensive system overview, global telemetry tracking, automated risk mitigation, and executive reporting.'
      },
      farm: {
        id: 'farm',
        name: 'Farm Division',
        short: 'Farm Division',
        code: 'DIV-FRM02',
        department: 'Dairy Farming & Raw Silo Management',
        icon: 'farm',
        badge: 'Extraction & Silos',
        color: 'emerald',
        canReport: true,
        canChecklist: true,
        canDownloadReport: false,
        description: 'Raw milk extraction monitoring, automated silo cooling, tank temperature regulation, and dispatch lot preparation.'
      },
      logistics: {
        id: 'logistics',
        name: 'Logistics / Distribution Division',
        short: 'Logistics Division',
        code: 'DIV-LOG03',
        department: 'Cold Chain Transit & Fleet Operations',
        icon: 'logistics',
        badge: 'Fleet & Cold Chain',
        color: 'emerald',
        canReport: true,
        canChecklist: true,
        canDownloadReport: false,
        description: 'Fleet GPS tracking, real-time IoT temperature logging, dynamic routing, and transit telemetry.'
      },
      lab: {
        id: 'lab',
        name: 'QC Laboratory Division',
        short: 'QC Lab Division',
        code: 'DIV-QCL04',
        department: 'Quality Assurance & Biochemical Analytics',
        icon: 'lab',
        badge: 'Quality & Spoilage AI',
        color: 'emerald',
        canReport: true,
        canChecklist: true,
        canDownloadReport: false,
        description: 'Milk biochemical composition analysis (Fat, Protein, pH, CFU), AI quality grading, and spoilage risk forecasting.'
      },
      production: {
        id: 'production',
        name: 'Production Division',
        short: 'Production Division',
        code: 'DIV-PRD05',
        department: 'Pasteurization, UHT & Clean-In-Place (CIP)',
        icon: 'production',
        badge: 'UHT & CIP Scheduling',
        color: 'emerald',
        canReport: true,
        canChecklist: true,
        canDownloadReport: false,
        description: 'Dynamic multi-flavor line scheduling, automated CIP wash slot insertion, dynamic bottleneck mitigation, and zero-downtime optimization.'
      },
      warehouse: {
        id: 'warehouse',
        name: 'Auxiliary & Warehouse Division (Pelengkap)',
        short: 'Warehouse Division',
        code: 'DIV-WHS06',
        department: 'Packaging, Ingredients & Cold Storage',
        icon: 'warehouse',
        badge: 'Inventory & Cold Room',
        color: 'emerald',
        canReport: true,
        canChecklist: true,
        canDownloadReport: false,
        description: 'Tetra Pak carton and cap inventory, flavor syrup buffers, cold storage capacity monitoring (2-4°C), and finished goods dispatch.'
      }
    },

    // Global Key Nodes in East Java (Greenfields operational area)
    nodes: [
      {
        id: 'node-farm1',
        name: 'Farm 1 - Wajak, Malang',
        type: 'farm',
        lat: -8.1130,
        lng: 112.7210,
        status: 'Operational',
        cows: '14,800 Holstein Friesian',
        capacity: '200,000 L / day',
        currentTemp: '3.6°C',
        details: '4 Insulated Silos (S1: 45kL, S2: 48kL, S3: 42kL, S4: Backup)',
        pj: 'Dr. Hendra Gunawan (Farm Head)'
      },
      {
        id: 'node-farm2',
        name: 'Farm 2 - Ngancar, Blitar',
        type: 'farm',
        lat: -7.9420,
        lng: 112.1850,
        status: 'Operational',
        cows: '10,500 Holstein Friesian',
        capacity: '140,000 L / day',
        currentTemp: '3.8°C',
        details: '3 Insulated Silos (S1: 40kL, S2: 38kL, S3: 35kL)',
        pj: 'Ir. Agus Santoso (Farm Lead)'
      },
      {
        id: 'node-lab',
        name: 'Central QC & Sensory Lab',
        type: 'lab',
        lat: -8.0280,
        lng: 112.5180,
        status: 'Active Testing',
        dailySamples: 64,
        avgPassRate: '98.8%',
        details: 'FTIR Milkoscan Spectrometer, MilkoScan FT3, Rapid Bacteria Counter',
        pj: 'Dr. Maya Kartika, M.Sc (QA Director)'
      },
      {
        id: 'node-plant',
        name: 'Gunung Kawi Processing Plant',
        type: 'plant',
        lat: -8.0250,
        lng: 112.5250,
        status: 'UHT Running',
        lines: 'Line 1 (Fresh UHT), Line 2 (Flavored UHT), Line 3 (Pasteurized)',
        capacity: '45,000 L / hr',
        details: 'Tetra Pak A3/Speed Fillers, GEA Pasteurizer, Automated CIP Station 1-3',
        pj: 'Ir. Bambang Wijaya (Plant Manager)'
      },
      {
        id: 'node-dist',
        name: 'Surabaya Regional Cold Distribution Hub',
        type: 'distribution',
        lat: -7.3150,
        lng: 112.7300,
        status: 'Fulfillment Active',
        coldRooms: 'Cold Vault A (2.4°C), B (3.1°C), C (2.8°C)',
        palletCount: '1,420 Pallets',
        details: 'Dock 1-8 active, GPS cross-docking dispatch system',
        pj: 'Rian Pradana (Hub Logistics Manager)'
      }
    ],

    // Fleet Real-Time Data (Gojek / Shopee style live tracking)
    trucks: [
      {
        id: 'TRK-01',
        plate: 'N 9821 GF',
        driver: 'Budi Santoso',
        phone: '+6281234567890',
        route: 'Farm 1 (Malang) → Lab & Plant',
        routeFrom: 'Farm 1 - Wajak',
        routeTo: 'Gunung Kawi Plant',
        speed: 54,
        temp: 3.4,
        tempStatus: 'normal',
        volume: 22000,
        maxCap: 25000,
        status: 'ON ROAD',
        subStatus: 'In-Transit (KM 28)',
        eta: '14:15',
        progress: 68,
        lat: -8.065,
        lng: 112.635,
        lastPing: '10s ago',
        chillerHealth: 'Optimal (Inverter Active)',
        currentBatch: '#GF-2026-A1'
      },
      {
        id: 'TRK-02',
        plate: 'N 9034 GF',
        driver: 'Ahmad Riyadi',
        phone: '+6281298765432',
        route: 'Farm 2 (Blitar) → Plant Gate',
        routeFrom: 'Farm 2 - Blitar',
        routeTo: 'Gunung Kawi Plant',
        speed: 0,
        temp: 3.8,
        tempStatus: 'normal',
        volume: 24500,
        maxCap: 25000,
        status: 'ON SITE',
        subStatus: 'Docked at Receiving Silo 2 (Unloading)',
        eta: 'Arrived (13:45)',
        progress: 100,
        lat: -8.026,
        lng: 112.524,
        lastPing: '2s ago',
        chillerHealth: 'Shore Power Connected',
        currentBatch: '#GF-2026-B1'
      },
      {
        id: 'TRK-03',
        plate: 'L 8412 GF',
        driver: 'Dedi Prasetyo',
        phone: '+6281345678123',
        route: 'Plant → Surabaya Cold Hub',
        routeFrom: 'Gunung Kawi Plant',
        routeTo: 'Surabaya Regional Hub',
        speed: 68,
        temp: 2.9,
        tempStatus: 'normal',
        volume: 18500,
        maxCap: 20000,
        status: 'ON ROAD',
        subStatus: 'Toll Malang-Pandaan (KM 45)',
        eta: '16:40',
        progress: 42,
        lat: -7.720,
        lng: 112.680,
        lastPing: '15s ago',
        chillerHealth: 'Sub-zero Chilled Airflow',
        currentBatch: '#GF-2026-P09'
      },
      {
        id: 'TRK-04',
        plate: 'N 9110 GF',
        driver: 'Hendra Wijaya',
        phone: '+6281122334455',
        route: 'Farm 1 → Central Plant',
        routeFrom: 'Farm 1 - Wajak',
        routeTo: 'Gunung Kawi Plant',
        speed: 0,
        temp: 6.4, // Anomaly! Above 4°C
        tempStatus: 'warning',
        volume: 21000,
        maxCap: 25000,
        status: 'BREAKDOWN',
        subStatus: 'Compressor Trip / Pulled Over KM 14',
        eta: 'Delayed (+45m)',
        progress: 35,
        lat: -8.095,
        lng: 112.685,
        lastPing: '1m ago',
        chillerHealth: 'FAULT: Auxiliary Belt Slippage',
        currentBatch: '#GF-2026-B2'
      },
      {
        id: 'TRK-05',
        plate: 'N 8901 GF',
        driver: 'Slamet Utomo',
        phone: '+6281233445566',
        route: 'Farm 2 → Plant Gate',
        routeFrom: 'Farm 2 - Blitar',
        routeTo: 'Gunung Kawi Plant',
        speed: 0,
        temp: 3.2,
        tempStatus: 'normal',
        volume: 25000,
        maxCap: 25000,
        status: 'DONE',
        subStatus: 'Batch Transferred & CIP Cleaned',
        eta: 'Completed (12:30)',
        progress: 100,
        lat: -8.027,
        lng: 112.528,
        lastPing: '5m ago',
        chillerHealth: 'Standby / Sterilized',
        currentBatch: '#GF-2026-A0'
      },
      {
        id: 'TRK-06',
        plate: 'W 9452 GF',
        driver: 'Eko Purwanto',
        phone: '+6281566778899',
        route: 'Plant → Surabaya Cold Hub',
        routeFrom: 'Gunung Kawi Plant',
        routeTo: 'Surabaya Regional Hub',
        speed: 61,
        temp: 3.1,
        tempStatus: 'normal',
        volume: 22000,
        maxCap: 22000,
        status: 'ON ROAD',
        subStatus: 'Approving Waru Interchange',
        eta: '14:55',
        progress: 88,
        lat: -7.360,
        lng: 112.725,
        lastPing: '8s ago',
        chillerHealth: 'ThermoKing Dual Chiller OK',
        currentBatch: '#GF-2026-P08'
      }
    ],

    // Active Batches and Production Lifecycle
    batches: [
      {
        id: '#GF-2026-A1',
        product: 'Greenfields Fresh Milk (Full Cream)',
        flavor: 'Full Cream',
        volumeLiters: 35000,
        targetTime: '14:30',
        currentStage: 'Pasteurization & Homogenization',
        stageIndex: 3, // 0: Extraction, 1: Logistics, 2: Lab Testing, 3: Production, 4: Packaging/Warehouse
        status: 'Normal',
        sourceFarm: 'Farm 1 (Malang)',
        truckId: 'TRK-01',
        qualityGrade: 'Grade A',
        estimatedFinish: '14:30',
        downstreamEta: 'On Schedule (14:30)'
      },
      {
        id: '#GF-2026-B1',
        product: 'Greenfields UHT Strawberry Milk',
        flavor: 'Strawberry',
        volumeLiters: 25000,
        targetTime: '16:00',
        currentStage: 'Automated CIP Wash (Pre-Strawberry)',
        stageIndex: 3,
        status: 'CIP Active',
        sourceFarm: 'Farm 2 (Blitar)',
        truckId: 'TRK-02',
        qualityGrade: 'Grade A',
        estimatedFinish: '16:15',
        downstreamEta: 'Delayed +15m (CIP Transition)'
      },
      {
        id: '#GF-2026-C1',
        product: 'Greenfields UHT Swiss Chocolate Milk',
        flavor: 'Swiss Chocolate',
        volumeLiters: 30000,
        targetTime: '18:15',
        currentStage: 'Ingredient Buffer & Lab Pre-release',
        stageIndex: 2,
        status: 'Normal',
        sourceFarm: 'Farm 1 (Malang)',
        truckId: 'TRK-03',
        qualityGrade: 'Grade A',
        estimatedFinish: '18:15',
        downstreamEta: 'Awaiting Line 2 CIP Slot'
      },
      {
        id: '#GF-2026-B2',
        product: 'Greenfields Low Fat High Calcium',
        flavor: 'Skim Milk',
        volumeLiters: 21000,
        targetTime: '15:10',
        currentStage: 'Cold Transit Handover',
        stageIndex: 1,
        status: 'Warning',
        sourceFarm: 'Farm 1 (Malang)',
        truckId: 'TRK-04',
        qualityGrade: 'Pending Lab Re-test',
        estimatedFinish: '16:05',
        downstreamEta: 'CRITICAL: Chiller Anomaly (+55m)'
      }
    ],

    // Division Interactive Checklists (with 10-minute Anomaly threshold)
    checklists: {
      farm: [
        { id: 'f-1', batch: '#GF-2026-A1', task: 'Automated Cow Cluster Milking & Flow Meter Log', scheduledTime: '11:00', completed: true, completedAt: '11:05', overdue: false, anomaly: false },
        { id: 'f-2', batch: '#GF-2026-A1', task: 'Plate Cooler Chilling to ≤ 3.8°C before Silo Inflow', scheduledTime: '11:20', completed: true, completedAt: '11:22', overdue: false, anomaly: false },
        { id: 'f-3', batch: '#GF-2026-A1', task: 'Silo 2 Agitation & Initial pH/Antibiotic Strip Scan', scheduledTime: '11:45', completed: true, completedAt: '11:46', overdue: false, anomaly: false },
        { id: 'f-4', batch: '#GF-2026-A1', task: 'Bulk Tanker TRK-01 Seal Lock & Sanitary Valve Connect', scheduledTime: '12:15', completed: true, completedAt: '12:18', overdue: false, anomaly: false },
        { id: 'f-5', batch: '#GF-2026-B2', task: 'Farm 1 Silo 3 Extraction Dispatch Handover to TRK-04', scheduledTime: '12:45', completed: false, overdue: true, anomaly: true, anomalyReason: 'Step overdue by 22m! Chiller trip on receiving tanker.' }
      ],
      logistics: [
        { id: 'l-1', batch: '#GF-2026-A1', task: 'Pre-Trip Chiller Inspection (Set point: 3.0°C Verified)', scheduledTime: '12:00', completed: true, completedAt: '12:02', overdue: false, anomaly: false },
        { id: 'l-2', batch: '#GF-2026-A1', task: 'Electronic Seal Activation (Seal #GF-9942A)', scheduledTime: '12:20', completed: true, completedAt: '12:21', overdue: false, anomaly: false },
        { id: 'l-3', batch: '#GF-2026-A1', task: 'Mid-route Telemetry GPS & Thermal Integrity Check', scheduledTime: '13:10', completed: true, completedAt: '13:12', overdue: false, anomaly: false },
        { id: 'l-4', batch: '#GF-2026-A1', task: 'Arrived at Lab Gate / Automatic Scale Bridge Weight', scheduledTime: '14:00', completed: false, overdue: false, anomaly: false },
        { id: 'l-5', batch: '#GF-2026-B2', task: 'TRK-04 Rapid Chiller Stabilization or Roadside Repair', scheduledTime: '13:30', completed: false, overdue: true, anomaly: true, anomalyReason: 'Overdue > 18m without technician seal sign-off!' }
      ],
      lab: [
        { id: 'q-1', batch: '#GF-2026-A1', task: 'Sterile Aseptic Sample Extraction from Tanker Manhole', scheduledTime: '12:50', completed: true, completedAt: '12:52', overdue: false, anomaly: false },
        { id: 'q-2', batch: '#GF-2026-A1', task: 'MilkoScan Infrared Fat (3.92%) & Protein (3.35%) Test', scheduledTime: '13:05', completed: true, completedAt: '13:07', overdue: false, anomaly: false },
        { id: 'q-3', batch: '#GF-2026-A1', task: 'pH Sensor Validation (6.72 pH within Greenfields spec)', scheduledTime: '13:15', completed: true, completedAt: '13:16', overdue: false, anomaly: false },
        { id: 'q-4', batch: '#GF-2026-A1', task: 'Rapid ATP Bioluminescence & Somatic Cell Count (<180k)', scheduledTime: '13:30', completed: true, completedAt: '13:32', overdue: false, anomaly: false },
        { id: 'q-5', batch: '#GF-2026-B2', task: 'TRK-04 Cold Chain Breach Thermal Re-test & Acidification Assay', scheduledTime: '13:45', completed: false, overdue: true, anomaly: true, anomalyReason: 'Lab queue delayed waiting for diverted tanker sample arrival.' }
      ],
      production: [
        { id: 'p-1', batch: '#GF-2026-A1', task: 'Raw Milk Deaeration & Clarification Centrifuge', scheduledTime: '13:40', completed: true, completedAt: '13:42', overdue: false, anomaly: false },
        { id: 'p-2', batch: '#GF-2026-A1', task: 'Continuous UHT Sterilization (142°C for 4 seconds)', scheduledTime: '14:00', completed: true, completedAt: '14:02', overdue: false, anomaly: false },
        { id: 'p-3', batch: '#GF-2026-A1', task: 'Aseptic Surge Tank Holding Buffer Verification', scheduledTime: '14:20', completed: false, overdue: false, anomaly: false },
        { id: 'p-4', batch: '#GF-2026-B1', task: 'Automated 45-Min CIP Cleaning Cycle (Caustic 80°C + Acid 65°C)', scheduledTime: '14:35', completed: false, overdue: false, anomaly: false },
        { id: 'p-5', batch: '#GF-2026-B1', task: 'Flavor Syrup Metering Injection & Sensory Test', scheduledTime: '15:25', completed: false, overdue: false, anomaly: false }
      ],
      warehouse: [
        { id: 'w-1', batch: '#GF-2026-A1', task: 'Tetra Pak Slim 1L Carton Reel Infeed Loading (#Roll-881)', scheduledTime: '13:30', completed: true, completedAt: '13:31', overdue: false, anomaly: false },
        { id: 'w-2', batch: '#GF-2026-A1', task: 'HeliCap 23 Screw Cap Ultrasonic Welder Inspection', scheduledTime: '13:50', completed: true, completedAt: '13:52', overdue: false, anomaly: false },
        { id: 'w-3', batch: '#GF-2026-A1', task: 'Secondary Packaging: Robotic Shrink Wrap & Carton Tray', scheduledTime: '14:15', completed: false, overdue: false, anomaly: false },
        { id: 'w-4', batch: '#GF-2026-A1', task: 'Automated Guided Vehicle (AGV) Transfer to Cold Room A (3.0°C)', scheduledTime: '14:40', completed: false, overdue: false, anomaly: false },
        { id: 'w-5', batch: '#GF-2026-B1', task: 'Strawberry Aroma Liquid Buffer Check (Batch #STR-409)', scheduledTime: '14:00', completed: true, completedAt: '14:05', overdue: false, anomaly: false }
      ]
    },

    // Dynamic CIP Schedule for Flavor Transitions
    cipSchedule: [
      {
        id: 'CIP-01',
        title: 'CIP Cycle 1: Pre-Run Full Sterilization',
        line: 'Line 1 (Aseptic Filler)',
        start: '10:00',
        end: '10:45',
        duration: '45 mins',
        washType: '5-Stage Full Wash (Water Rinse → Caustic Soda 80°C → Intermediate Rinse → Nitric Acid 65°C → Steam Sanitization)',
        precedingFlavor: 'None (Daily Start)',
        upcomingFlavor: 'Full Cream Fresh Milk',
        status: 'Completed',
        aiNote: 'Zero residue confirmed by conductivity sensor 0.02 μS/cm.'
      },
      {
        id: 'CIP-02',
        title: 'CIP Cycle 2: Full Cream → Strawberry Transition',
        line: 'Line 1 (Aseptic Filler)',
        start: '14:35',
        end: '15:20',
        duration: '45 mins',
        washType: 'Flavor Isolation Wash (Caustic 82°C + Disinfectant Peracetic 0.5%)',
        precedingFlavor: 'Full Cream Milk',
        upcomingFlavor: 'Strawberry Milk',
        status: 'In Progress (Active 22m remaining)',
        aiNote: 'Mandatory automated wash slot inserted to prevent natural milk protein coating strawberry aroma valves.'
      },
      {
        id: 'CIP-03',
        title: 'CIP Cycle 3: Strawberry → Swiss Chocolate Transition',
        line: 'Line 1 (Aseptic Filler)',
        start: '16:50',
        end: '17:35',
        duration: '45 mins',
        washType: 'Intensive Color & Allergen Stripping Wash',
        precedingFlavor: 'Strawberry Milk',
        upcomingFlavor: 'Swiss Chocolate Milk',
        status: 'Scheduled',
        aiNote: 'Critical flavor transition: High dye & sucrose flush required before dark cocoa dosing.'
      },
      {
        id: 'CIP-04',
        title: 'CIP Cycle 4: Swiss Chocolate → Full Cream Transition',
        line: 'Line 1 (Aseptic Filler)',
        start: '19:15',
        end: '20:15',
        duration: '60 mins',
        washType: 'Ultra-Intensive Degreaser & Cocoa Butter Removal',
        precedingFlavor: 'Swiss Chocolate Milk',
        upcomingFlavor: 'Full Cream (Next Shift)',
        status: 'Scheduled',
        aiNote: 'Extended 60m cycle: Cocoa butter residues require prolonged 85°C caustic circulation.'
      }
    ],

    // Universal Trouble Reporting & AI Mitigation Tickets
    troubleTickets: [
      {
        id: 'TICK-101',
        ticketNumber: 'TR-2026-0881',
        reportedBy: 'Hendra Wijaya (Logistics Driver)',
        division: 'logistics',
        divisionName: 'Logistics Division',
        category: 'Cold Chain Temp Breach',
        severity: 'Critical',
        batchId: '#GF-2026-B2',
        affectedVolume: '21,000 Liters Raw Milk',
        timestamp: '13:18 WIB',
        description: 'Chiller compressor thermal trip on TRK-04 while ascending Malang road KM 14. Milk tank temperature rose from 3.6°C to 6.4°C over 42 minutes.',
        etaResolution: '35 minutes',
        status: 'Contingency Active',
        aiAnalysis: {
          riskScore: '94/100 (High Acidification Hazard)',
          prediction: 'At 6.4°C, lactic acid bacteria proliferation doubles every 38 minutes. Immediate cooling or diversion required within 25 minutes to avoid souring.',
          actionSteps: [
            'STEP 1: Divert tanker TRK-04 immediately to Emergency Bypass Bay at Lab Gate 3.',
            'STEP 2: Connect auxiliary high-capacity mobile cooling umbilical (Station Chiller #4) to drop temperature to ≤ 3.5°C within 15 minutes.',
            'STEP 3: QC Lab must draw emergency 100mL sample for immediate rapid titratable acidity test (Soxhlet-Henkel > 7.0 requires lactic rejection).',
            'STEP 4: If approved by Lab, divert batch to Pasteurized Milk Silo 3 instead of UHT Line to prevent thermal curdling.'
          ],
          contingencyPlan: 'CONTINGENCY ROUTE ENGAGED: Tanker redirected to Insulated Storage Tank 3. Notification dispatched to standby Senior Mechatronics Tech Joko (Ext: 402). Downstream UHT schedule buffered +45 mins without line halt.',
          contactPJ: {
            name: 'Ir. Bambang Wijaya (Plant Ops Head)',
            phone: '+628113456789',
            role: 'Incident Commander',
            waLink: 'https://wa.me/628113456789?text=URGENT%20DAIRYSYNC%20ALERT:%20TRK-04%20Temp%20Breach%206.4C%20Batch%20GF-2026-B2'
          },
          contactPM: {
            name: 'Farhan Maulana (Project Manager)',
            phone: '+6281222333444',
            role: 'Executive PM',
            waLink: 'https://wa.me/6281222333444?text=DAIRYSYNC%20EXECUTIVE%20INCIDENT:%20Critical%20Contingency%20Active%20Ticket%20TR-2026-0881'
          }
        }
      },
      {
        id: 'TICK-102',
        ticketNumber: 'TR-2026-0880',
        reportedBy: 'Agus Subardi (Production Line 1)',
        division: 'production',
        divisionName: 'Production Division',
        category: 'CIP Cleaning Sequence Delay',
        severity: 'Medium',
        batchId: '#GF-2026-B1',
        affectedVolume: '25,000 Liters Strawberry UHT',
        timestamp: '12:45 WIB',
        description: 'Acid rinse supply valve V-204 experienced low air pressure fault (4.2 bar vs required 6.0 bar), causing a 12-minute pause in stage 4.',
        etaResolution: '15 minutes',
        status: 'Resolved',
        aiAnalysis: {
          riskScore: '42/100 (Minor Schedule Shift)',
          prediction: 'Zero product contamination; cleaning fluid was safely purged into drain. Flavor switch schedule requires +15m dynamic padding.',
          actionSteps: [
            'STEP 1: Manually switch pneumatic booster valve B-12 to secondary air compressor loop.',
            'STEP 2: Re-run automated conductivity verification (must be < 0.05 μS/cm).',
            'STEP 3: Synchronize downstream carton packing speed to 85% capacity for 20 minutes to equalize infeed buffer.'
          ],
          contingencyPlan: 'Autonomous dynamic rescheduling applied: Strawberry batch start shifted from 15:00 to 15:15. Downstream warehouse alerted.',
          contactPJ: {
            name: 'Ir. Agus Santoso (CIP Lead)',
            phone: '+6281299887766',
            role: 'CIP Station Lead',
            waLink: 'https://wa.me/6281299887766?text=DAIRYSYNC%20NOTICE:%20CIP%20Valve%20V-204%20Resolved'
          },
          contactPM: {
            name: 'Farhan Maulana (Project Manager)',
            phone: '+6281222333444',
            role: 'Executive PM',
            waLink: 'https://wa.me/6281222333444?text=DAIRYSYNC%20PM:%20CIP%20Schedule%20Optimized'
          }
        }
      }
    ],

    // QC Testing Logs & Spoilage AI Matrix
    labTests: [
      { id: 'LT-901', batch: '#GF-2026-A1', timestamp: '13:08 WIB', fat: 3.92, protein: 3.35, ph: 6.72, cfu: 140000, grade: 'Grade A', status: 'Approved for Premium UHT', spoilageRisk: '0.4% (Negligible)' },
      { id: 'LT-902', batch: '#GF-2026-B1', timestamp: '12:15 WIB', fat: 3.84, protein: 3.28, ph: 6.69, cfu: 185000, grade: 'Grade A', status: 'Approved for Flavored UHT', spoilageRisk: '0.9% (Normal)' },
      { id: 'LT-903', batch: '#GF-2026-C1', timestamp: '11:30 WIB', fat: 4.05, protein: 3.42, ph: 6.74, cfu: 120000, grade: 'Grade A', status: 'Approved for Premium Export', spoilageRisk: '0.3% (Superior)' },
      { id: 'LT-904', batch: '#GF-2026-R01', timestamp: '09:20 WIB', fat: 3.12, protein: 2.85, ph: 6.38, cfu: 940000, grade: 'Rejected', status: 'Low Fat & High Acid (Diverted to Animal Feed/Biogas)', spoilageRisk: '89.5% (Spoiled)' }
    ],

    // Auxiliary / Warehouse Inventory
    inventory: [
      { item: 'Tetra Pak Aseptic 1000ml Slim Cartons', stock: '482,000 units', minThreshold: '150,000 units', status: 'Optimal', burnRate: '12,500 units/hr', daysSupply: '3.8 days' },
      { item: 'Tetra Pak HeliCap 23 Light Blue Caps', stock: '610,000 units', minThreshold: '200,000 units', status: 'Optimal', burnRate: '12,500 units/hr', daysSupply: '4.9 days' },
      { item: 'Natural Swiss Cocoa Powder (Grade X)', stock: '8,400 kg', minThreshold: '3,000 kg', status: 'Optimal', burnRate: '250 kg/batch', daysSupply: '6.2 days' },
      { item: 'Natural Strawberry Puree & Aroma Concentrate', stock: '4,200 kg', minThreshold: '2,500 kg', status: 'Adequate', burnRate: '180 kg/batch', daysSupply: '4.6 days' },
      { item: 'Food-Grade Caustic Soda (CIP Stage 2)', stock: '12,500 Liters', minThreshold: '4,000 Liters', status: 'Optimal', burnRate: '150 L/cycle', daysSupply: '8.3 days' },
      { item: 'Nitric Acid 68% (CIP Stage 4 Descaling)', stock: '6,200 Liters', minThreshold: '2,000 Liters', status: 'Optimal', burnRate: '80 L/cycle', daysSupply: '7.8 days' }
    ],

    // Cold Rooms
    coldRooms: [
      { name: 'Cold Room Alpha (Finished Goods Vault 1)', temp: '2.8°C', humidity: '82%', capacity: '85% (1,200 Pallets)', status: 'Optimal', compressor: 'Running at 45Hz' },
      { name: 'Cold Room Beta (Finished Goods Vault 2)', temp: '3.1°C', humidity: '80%', capacity: '62% (900 Pallets)', status: 'Optimal', compressor: 'Running at 38Hz' },
      { name: 'Cold Room Gamma (Quarantine & Testing)', temp: '2.4°C', humidity: '78%', capacity: '24% (180 Pallets)', status: 'Optimal', compressor: 'Running at 30Hz' }
    ],

    // Real-Time Virtual Clock & Schedule Automation State
    virtualClock: '09:59',
    virtualClockRunning: true,
    alert10AmTriggered: false,
    pmWarningAlert: null,
    productionDialogActive: false,
    aiRescheduleRecommendation: null,

    // Project Manager Acceptance & Multi-Division Preparation Alert State
    pendingExtendRequest: null,
    broadcastAlerts: [],

    // Cross-Division Integrated Production Pipeline & Schedule (Fully Linked Dependencies)
    integratedPipeline: [
      {
        id: 'pipe-frm-01',
        stepNumber: 1,
        batchId: '#GF-2026-B1',
        batchName: 'Batch 1 - Fresh Milk 1L Pasteurized (35kL)',
        division: 'farm',
        divisionName: 'Farm Division (Wajak)',
        stageName: 'Ekstraksi & Plate Chiller Silo 2',
        plannedStart: '07:30',
        plannedEnd: '08:30',
        actualStart: '07:30',
        actualEnd: '08:28',
        status: 'completed', // 'completed' | 'in_progress' | 'delayed' | 'pending'
        statusLabel: 'Selesai Tepat Waktu',
        assignedPIC: 'Dr. Hendra Gunawan',
        notes: 'Suhu pendinginan silo 3.4°C stabil.',
        dependsOn: null
      },
      {
        id: 'pipe-log-01',
        stepNumber: 2,
        batchId: '#GF-2026-B1',
        batchName: 'Batch 1 - Fresh Milk 1L Pasteurized (35kL)',
        division: 'logistics',
        divisionName: 'Logistics Division',
        stageName: 'Cold-Chain Transit (TRK-01 Malang → Plant)',
        plannedStart: '08:30',
        plannedEnd: '09:15',
        actualStart: '08:30',
        actualEnd: '09:12',
        status: 'completed',
        statusLabel: 'Selesai Tepat Waktu',
        assignedPIC: 'Budi Santoso (Driver)',
        notes: 'GPS & Telemetri chiller 3.1°C tanpa deviasi.',
        dependsOn: 'pipe-frm-01'
      },
      {
        id: 'pipe-lab-01',
        stepNumber: 3,
        batchId: '#GF-2026-B1',
        batchName: 'Batch 1 - Fresh Milk 1L Pasteurized (35kL)',
        division: 'lab',
        divisionName: 'QC Lab Division',
        stageName: 'MilkoScan & Biochemical Clearance',
        plannedStart: '09:15',
        plannedEnd: '09:45',
        actualStart: '09:15',
        actualEnd: '09:40',
        status: 'completed',
        statusLabel: 'Grade A Clearance Passed',
        assignedPIC: 'Dr. Maya Kartika, M.Sc',
        notes: 'Fat 3.92%, Protein 3.35%, pH 6.72. Approved.',
        dependsOn: 'pipe-log-01'
      },
      {
        id: 'pipe-prd-01',
        stepNumber: 4,
        batchId: '#GF-2026-B1',
        batchName: 'Batch 1 - Fresh Milk 1L Pasteurized (35kL)',
        division: 'production',
        divisionName: 'Production Division',
        stageName: 'Batch 1 Pasteurization & Homogenization',
        plannedStart: '09:45',
        plannedEnd: '10:00',
        actualStart: '09:45',
        actualEnd: null,
        status: 'in_progress', // Targets 10:00 AM check
        statusLabel: 'Sedang Berjalan (Batas Waktu: 10:00 WIB)',
        assignedPIC: 'Agus Subardi (Line 1 Op)',
        notes: 'Target konfirmasi selesai tepat pada jam 10:00 WIB.',
        isKeyMilestone: true,
        deadlineTime: '10:00',
        dependsOn: 'pipe-lab-01'
      },
      {
        id: 'pipe-prd-02',
        stepNumber: 5,
        batchId: '#GF-2026-B1',
        batchName: 'Batch 1 - Fresh Milk 1L Pasteurized (35kL)',
        division: 'production',
        divisionName: 'Production Division',
        stageName: 'Automated 5-Stage CIP Sterilization Wash',
        plannedStart: '10:00',
        plannedEnd: '10:45',
        actualStart: null,
        actualEnd: null,
        status: 'pending',
        statusLabel: 'Menunggu Penyelesaian Batch 1',
        assignedPIC: 'Ir. Agus Santoso (CIP Lead)',
        notes: 'Sterilisasi jalur pengisian pipa sebelum transisi batch berikutnya.',
        dependsOn: 'pipe-prd-01'
      },
      {
        id: 'pipe-whs-01',
        stepNumber: 6,
        batchId: '#GF-2026-B1',
        batchName: 'Batch 1 - Fresh Milk 1L Pasteurized (35kL)',
        division: 'warehouse',
        divisionName: 'Warehouse & Packaging',
        stageName: 'Aseptic Tetra Pak Filling & Palletizing',
        plannedStart: '10:45',
        plannedEnd: '11:45',
        actualStart: null,
        actualEnd: null,
        status: 'pending',
        statusLabel: 'Menunggu Selesai CIP',
        assignedPIC: 'Bambang Irawan (Packaging Lead)',
        notes: 'Mesin pengisi Tetra Pak A3 Speed 12,000 pack/jam.',
        dependsOn: 'pipe-prd-02'
      },
      {
        id: 'pipe-log-02',
        stepNumber: 7,
        batchId: '#GF-2026-B1',
        batchName: 'Batch 1 - Fresh Milk 1L Pasteurized (35kL)',
        division: 'logistics',
        divisionName: 'Logistics Distribution',
        stageName: 'Cold-Chain Dispatch Armada Hub Surabaya',
        plannedStart: '11:45',
        plannedEnd: '14:00',
        actualStart: null,
        actualEnd: null,
        status: 'pending',
        statusLabel: 'Menunggu Muatan Gudang (Dimulai Tepat Selesai Packaging)',
        assignedPIC: 'Dedi Prasetyo (TRK-03)',
        notes: 'Jadwal armada dingin berangkat ke DC Regional Rungkut Surabaya.',
        dependsOn: 'pipe-whs-01'
      }
    ]
  };

  // Internal reactive state
  let state = JSON.parse(JSON.stringify(initialData));
  const listeners = [];

  return {
    getState: function () {
      return state;
    },
    
    subscribe: function (fn) {
      listeners.push(fn);
      return function () {
        const idx = listeners.indexOf(fn);
        if (idx !== -1) listeners.splice(idx, 1);
      };
    },

    notify: function () {
      state.lastUpdate = new Date().toLocaleTimeString();
      listeners.forEach(fn => fn(state));
    },

    setRole: function (roleId) {
      if (state.roles[roleId]) {
        state.currentRole = roleId;
        this.notify();
      }
    },

    toggleSound: function () {
      state.soundEnabled = !state.soundEnabled;
      this.notify();
      return state.soundEnabled;
    },

    // Checklist action
    toggleChecklistStep: function (division, stepId) {
      if (!state.checklists[division]) return;
      const step = state.checklists[division].find(s => s.id === stepId);
      if (step) {
        step.completed = !step.completed;
        if (step.completed) {
          step.completedAt = new Date().toLocaleTimeString().slice(0, 5);
          step.overdue = false;
          step.anomaly = false;
        } else {
          step.completedAt = null;
        }
        this.notify();
      }
    },

    // Trigger Anomaly Simulation (Rolling > 10 min delayed step)
    triggerSimulatedAnomaly: function () {
      // Find an incomplete step in Production or Logistics
      const step = state.checklists.production.find(s => s.id === 'p-4');
      if (step) {
        step.completed = false;
        step.overdue = true;
        step.anomaly = true;
        step.anomalyReason = 'AI Anomaly Detected: CIP Caustic Rinse exceeded rolling threshold by 14m! Line 1 delayed +25m.';
      }
      
      // Update affected batch downstream ETA
      const b1 = state.batches.find(b => b.id === '#GF-2026-B1');
      if (b1) {
        b1.status = 'Delayed';
        b1.downstreamEta = 'ALERT: CIP Anomaly Delayed to 16:35 (+35m)';
      }

      this.notify();
    },

    // Add new trouble ticket from Universal Trouble Reporting form
    addTroubleTicket: function (newTicket) {
      const ticketId = 'TICK-' + (100 + state.troubleTickets.length + 1);
      const ticketNum = 'TR-2026-0' + (882 + state.troubleTickets.length);
      
      const fullTicket = {
        id: ticketId,
        ticketNumber: ticketNum,
        reportedBy: newTicket.reportedBy || 'Division Field Officer',
        division: newTicket.division,
        divisionName: state.roles[newTicket.division]?.name || 'Division Ops',
        category: newTicket.category,
        severity: newTicket.severity,
        batchId: newTicket.batchId,
        affectedVolume: newTicket.affectedVolume || 'TBD',
        timestamp: new Date().toLocaleTimeString() + ' WIB',
        description: newTicket.description,
        etaResolution: newTicket.etaResolution || '30 minutes',
        status: newTicket.severity === 'Critical' ? 'Contingency Active' : 'Under Review',
        aiAnalysis: this.generateAiMitigation(newTicket)
      };

      state.troubleTickets.unshift(fullTicket);

      // If critical, trigger notification to PM
      if (newTicket.severity === 'Critical' || newTicket.severity === 'High') {
        const batch = state.batches.find(b => b.id === newTicket.batchId);
        if (batch) {
          batch.status = 'Contingency Active';
          batch.downstreamEta = `Trouble: ${newTicket.category} (${newTicket.etaResolution})`;
        }
      }

      // Automatically submit extend request for PM acceptance & broadcast preparation alert
      const etaMatch = (newTicket.etaResolution || '').match(/\d+/);
      const etaMins = etaMatch ? parseInt(etaMatch[0], 10) : 30;
      const matchedTask = state.integratedPipeline.find(t => t.division === newTicket.division && t.status !== 'completed') 
                       || state.integratedPipeline.find(t => t.division === newTicket.division);
      if (matchedTask) {
        this.requestTaskExtend(matchedTask.id, etaMins, `${newTicket.category}: ${newTicket.description.slice(0, 50)}`);
      }

      this.notify();
      return fullTicket;
    },

    // AI Recommendation Engine Generator
    generateAiMitigation: function (ticket) {
      const sev = ticket.severity;
      const cat = ticket.category;
      
      let riskScore = sev === 'Critical' ? '92/100 (Severe Risk)' : (sev === 'High' ? '76/100 (High Risk)' : (sev === 'Medium' ? '45/100 (Moderate)' : '18/100 (Minor)'));
      
      let prediction = `Automatic AI Diagnostics: Issue "${cat}" analyzed on batch ${ticket.batchId}. Root cause predicted in system telemetry variance. Immediate containment protocol generated.`;
      
      let actionSteps = [];
      let contingencyPlan = '';

      if (sev === 'Critical') {
        actionSteps = [
          `STEP 1: Immediate Line Isolation: Halt infeed valve on ${ticket.batchId} within 60 seconds.`,
          `STEP 2: Engage Auxiliary Redundancy: Activate Insulated Holding Silo 3 / Emergency Bypass Chiller.`,
          `STEP 3: Rapid Biochemical Screening: Dispatch QC Lab team to conduct 3-point titratable acidity and ATP test.`,
          `STEP 4: Notify On-Duty Senior Engineering Specialist and escalate to Executive Project Manager.`
        ];
        contingencyPlan = `CRITICAL CONTINGENCY ENGAGED: Automated bypass valve open. Batch diverted to Insulated Silo 3 (Temp maintained at 3.2°C). Emergency 3-stage CIP sanitization queued. Standby technician notified.`;
      } else if (sev === 'High') {
        actionSteps = [
          `STEP 1: Reduce operational line speed by 30% to stabilize buffer pressures.`,
          `STEP 2: Conduct on-site manual valve calibration and sensor verification.`,
          `STEP 3: Recalculate downstream batch sequence to avoid idle downstream filling lines.`,
          `STEP 4: Log root cause telemetry snapshot into Greenfields Audit Trail.`
        ];
        contingencyPlan = `HIGH PRIORITY PROTOCOL: Line paced down. Alternate raw milk buffer tank engaged. Estimated recovery within ${ticket.etaResolution}.`;
      } else {
        actionSteps = [
          `STEP 1: Verify sensor telemetry against manual analog gauge reading.`,
          `STEP 2: Execute routine preventative maintenance checklist item #14.`,
          `STEP 3: Monitor next batch transition for parameter deviation.`
        ];
        contingencyPlan = `STANDARD PROTOCOL: Monitored locally by division lead. Downstream schedule unaffected.`;
      }

      return {
        riskScore: riskScore,
        prediction: prediction,
        actionSteps: actionSteps,
        contingencyPlan: contingencyPlan,
        contactPJ: {
          name: 'Ir. Hendro Supriyanto (Ops Lead)',
          phone: '+628114433221',
          role: 'Division PIC',
          waLink: `https://wa.me/628114433221?text=DAIRYSYNC%20INCIDENT%20[${sev.toUpperCase()}]:%20${encodeURIComponent(cat)}%20Batch%20${ticket.batchId}`
        },
        contactPM: {
          name: 'Farhan Maulana (Project Manager)',
          phone: '+6281222333444',
          role: 'Executive PM',
          waLink: `https://wa.me/6281222333444?text=DAIRYSYNC%20PM%20ALERT:%20${sev.toUpperCase()}%20ticket%20filed%20by%20${ticket.division}`
        }
      };
    },

    // AI Quality Rating Calculator
    calculateQualityRating: function (fat, protein, ph, cfu) {
      fat = parseFloat(fat) || 0;
      protein = parseFloat(protein) || 0;
      ph = parseFloat(ph) || 0;
      cfu = parseInt(cfu) || 0;

      let grade = 'Grade A';
      let status = 'Approved for Premium Greenfields UHT & Pasteurized Milk';
      let risk = 'Low Spoilage Risk (< 1%)';
      let color = 'emerald';
      let shelfLife = '18 - 21 days refrigerated (Pasteurized) / 9 months (UHT)';

      if (ph < 6.55 || cfu > 500000 || fat < 3.2 || protein < 2.9) {
        grade = 'Rejected';
        status = 'Rejection Hazard: Souring / Bacterial Count Exceeded Greenfields Standard';
        risk = 'Critical Spoilage / Acidification (85-98%)';
        color = 'red';
        shelfLife = '0 days - Quarantined for Biogas or Feed Conversion';
      } else if (ph < 6.64 || cfu > 250000 || fat < 3.6 || protein < 3.1) {
        grade = 'Grade B';
        status = 'Standard Quality: Approved for Commercial Pasteurized / Bulk Processing';
        risk = 'Moderate Spoilage Risk (8-15%)';
        color = 'amber';
        shelfLife = '10 - 14 days refrigerated';
      }

      return { grade, status, risk, color, shelfLife, fat, protein, ph, cfu };
    },

    // AI Spoilage Predictor (Transit hours + Avg Tank Temp)
    predictShelfLife: function (transitHours, tankTemp) {
      transitHours = parseFloat(transitHours) || 0;
      tankTemp = parseFloat(tankTemp) || 3.0;

      // Greenfields scientific baseline:
      // Ideal temp is 2.5 - 3.8°C.
      // Above 4.0°C, shelf-life degrades exponentially.
      let baseHours = 72; // Raw milk viable holding hours at 3°C
      let tempPenalty = 0;
      
      if (tankTemp > 3.8) {
        tempPenalty = Math.pow(tankTemp - 3.8, 1.8) * 9.5;
      }
      
      let remainingHoldingHours = Math.max(0, Math.round(baseHours - (transitHours * 1.5) - tempPenalty));
      let riskPercent = Math.min(100, Math.max(1, Math.round(100 - (remainingHoldingHours / baseHours * 100))));
      
      let verdict = 'Safe & Pristine';
      let badgeClass = 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
      
      if (remainingHoldingHours < 18 || riskPercent > 70) {
        verdict = 'High Souring Risk (Quarantine / Rapid Processing)';
        badgeClass = 'text-red-400 bg-red-950/60 border-red-500/30';
      } else if (remainingHoldingHours < 36 || riskPercent > 40) {
        verdict = 'Moderate Thermal Degradation (Prioritize Infeed)';
        badgeClass = 'text-amber-400 bg-amber-950/60 border-amber-500/30';
      }

      return {
        remainingHoldingHours,
        riskPercent,
        verdict,
        badgeClass,
        transitHours,
        tankTemp
      };
    },

    // Production CIP Slot Dynamic Insertion
    recalculateCipSchedule: function (flavorSequence) {
      // Recomputes CIP slots based on array of flavors
      // e.g., ['Full Cream', 'Strawberry', 'Chocolate']
      return state.cipSchedule;
    },

    // --- INTEGRATED CROSS-DIVISION SCHEDULE & AI AUTOMATION ENGINE ---

    // Utility: Add minutes to 'HH:MM' string
    addMinutesToTime: function (timeStr, mins) {
      if (!timeStr) return timeStr;
      const parts = timeStr.split(':');
      let h = parseInt(parts[0], 10);
      let m = parseInt(parts[1], 10);
      let total = h * 60 + m + mins;
      let newH = Math.floor(total / 60) % 24;
      let newM = total % 60;
      return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
    },

    // Virtual Factory Clock Ticker
    tickVirtualClock: function (minutesToAdd = 1) {
      if (!state.virtualClockRunning) return;
      state.virtualClock = this.addMinutesToTime(state.virtualClock, minutesToAdd);
      
      // Auto check: When virtual clock reaches or passes 10:00
      this.evaluateDeadlineCheck();
      this.notify();
    },

    setVirtualClock: function (timeStr) {
      state.virtualClock = timeStr;
      this.evaluateDeadlineCheck();
      this.notify();
    },

    toggleVirtualClock: function () {
      state.virtualClockRunning = !state.virtualClockRunning;
      this.notify();
      return state.virtualClockRunning;
    },

    // Evaluates if 10:00 AM deadline has arrived without confirmation
    evaluateDeadlineCheck: function () {
      const clock = state.virtualClock;
      const task = state.integratedPipeline.find(t => t.id === 'pipe-prd-01');

      // If clock is 10:00 or later, and task is not yet completed
      if (clock >= '10:00' && task && task.status !== 'completed' && !state.alert10AmTriggered) {
        state.alert10AmTriggered = true;
        task.status = 'delayed';
        task.statusLabel = 'TERLAMBAT (Overdue > 10:00 WIB)';

        // 1. Set Warning Notification for PM
        state.pmWarningAlert = {
          id: 'ALERT-10AM-' + Date.now(),
          type: 'DEADLINE_OVERDUE',
          title: 'PERINGATAN DEADLINE JAM 10:00: BATCH 1 TERLAMBAT!',
          message: 'Bagian Produksi belum memberikan konfirmasi penyelesaian Batch 1 (Pasteurisasi & Homogenisasi) saat batas waktu 10:00 WIB telah tercapai.',
          severity: 'Critical',
          time: clock + ' WIB',
          batchId: task.batchId,
          stageName: task.stageName,
          active: true
        };

        // 2. Open Interactive Prompt Dialog on Production Dashboard
        state.productionDialogActive = true;

        // Try broadcasting to server SSE if connected
        try {
          fetch('/api/broadcast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'OVERDUE_ALERT_10AM',
              payload: {
                message: state.pmWarningAlert.message,
                clock: state.virtualClock
              }
            })
          }).catch(() => {});
        } catch (e) {}

        if (window.DairySyncApp) {
          window.DairySyncApp.playAudio('alert');
        }
      }
    },

    // Trigger instant simulation of the 10:00 AM scenario
    triggerSimulated10AmCheck: function () {
      state.virtualClock = '10:00';
      state.alert10AmTriggered = false; // Reset to re-trigger
      const task = state.integratedPipeline.find(t => t.id === 'pipe-prd-01');
      if (task) {
        task.status = 'in_progress';
        task.actualEnd = null;
      }
      state.aiRescheduleRecommendation = null;
      this.evaluateDeadlineCheck();
      this.notify();
    },

    // Resolves the prompt when Production responds
    resolveBatchFromPrompt: function (taskId, action, reason = '', delayMinutes = 30) {
      const task = state.integratedPipeline.find(t => t.id === taskId);
      if (!task) return;

      if (action === 'complete_now') {
        // Option 1: Immediately Confirm Complete
        task.status = 'completed';
        task.statusLabel = 'Selesai Terkonfirmasi';
        task.actualEnd = state.virtualClock;
        state.productionDialogActive = false;

        // Update PM Alert to success notification
        state.pmWarningAlert = {
          id: 'INFO-RESOLVED-' + Date.now(),
          type: 'RESOLVED',
          title: 'BATCH 1 TELAH DIKONFIRMASI SELESAI',
          message: `Divisi Produksi telah mengonfirmasi penyelesaian ${task.stageName} pada pukul ${state.virtualClock} WIB. Jalur downstream berjalan lancar.`,
          severity: 'Success',
          time: state.virtualClock + ' WIB',
          batchId: task.batchId,
          stageName: task.stageName,
          active: true
        };

        if (window.DairySyncApp) {
          window.DairySyncApp.playAudio('click');
        }
      } else if (action === 'report_delay') {
        // Option 2: Report Issue / Delay -> Ask for PM Acceptance first & notify divisions for preparation
        state.productionDialogActive = false;
        this.requestTaskExtend(task.id, delayMinutes, reason);
      }

      this.notify();
    },

    // Calculate time difference in minutes between two 'HH:MM' strings
    getTimeDifferenceMinutes: function (startStr, endStr) {
      if (!startStr || !endStr) return 45;
      const parts1 = startStr.split(':');
      const parts2 = endStr.split(':');
      const h1 = parseInt(parts1[0], 10);
      const m1 = parseInt(parts1[1], 10);
      const h2 = parseInt(parts2[0], 10);
      const m2 = parseInt(parts2[1], 10);
      let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
      if (diff < 0) diff += 24 * 60; // crossover midnight
      return diff;
    },

    // 1. STAGE: Request extend time (Waiting for PM Acceptance + Pre-Approval Preparation Alert for all divisions)
    requestTaskExtend: function (taskId, delayMinutes, reason = '') {
      const delay = parseInt(delayMinutes, 10) || 30;
      const pipeline = state.integratedPipeline;
      const targetIndex = pipeline.findIndex(t => t.id === taskId);
      if (targetIndex === -1) return;

      const targetTask = pipeline[targetIndex];
      targetTask.originalStart = targetTask.originalStart || targetTask.plannedStart;
      targetTask.originalEnd = targetTask.originalEnd || targetTask.plannedEnd;

      // Calculate potential new times
      const potTargetEnd = this.addMinutesToTime(targetTask.plannedEnd, delay);
      targetTask.pendingApproval = true;
      targetTask.potentialStart = targetTask.plannedStart;
      targetTask.potentialEnd = potTargetEnd;
      targetTask.potentialShift = delay;
      targetTask.extendReason = reason;
      targetTask.statusLabel = `Menunggu ACC PM (Pengajuan +${delay}m)`;

      // Calculate potential ripple times for downstream tasks
      let lastEnd = potTargetEnd;
      for (let i = targetIndex + 1; i < pipeline.length; i++) {
        const curr = pipeline[i];
        curr.originalStart = curr.originalStart || curr.plannedStart;
        curr.originalEnd = curr.originalEnd || curr.plannedEnd;
        const duration = this.getTimeDifferenceMinutes(curr.originalStart, curr.originalEnd);

        curr.pendingApproval = true;
        curr.potentialStart = lastEnd;
        curr.potentialEnd = this.addMinutesToTime(curr.potentialStart, duration);
        curr.potentialShift = delay;
        curr.statusLabel = `Pra-Persiapan: Potensi Geser +${delay}m (Menunggu ACC PM)`;
        lastEnd = curr.potentialEnd;
      }

      // Generate AI Impact Analysis Simulation
      const aiRec = this.calculateAiCascadingReschedule(targetTask, reason, delay);
      state.aiRescheduleRecommendation = aiRec;

      // Set Pending Extend Request Object
      state.pendingExtendRequest = {
        id: 'REQ-EXT-' + Date.now(),
        taskId: targetTask.id,
        stageName: targetTask.stageName,
        division: targetTask.division,
        divisionName: targetTask.divisionName,
        delayMinutes: delay,
        reason: reason || 'Penyelarasan operasional dan penanganan kendala',
        timestamp: state.virtualClock + ' WIB',
        batchId: targetTask.batchId,
        aiRec: aiRec,
        status: 'pending'
      };

      // ⚠️ BEFORE ACC: Multi-Division Preparation Alert (Semua divisi mendapat peringatan pra-persiapan)
      const preAlert = {
        id: 'PRE-ALERT-' + Date.now(),
        type: 'PRE_APPROVAL_NOTICE',
        title: `⚠️ PERINGATAN PRA-PERSIAPAN: PENGAJUAN EXTEND WAKTU +${delay} MENIT`,
        message: `Divisi ${targetTask.divisionName} mengajukan extend waktu +${delay}m karena: "${reason}". Sedang menunggu persetujuan Project Manager (PM). Divisi hilir (CIP Produksi, Gudang Packaging, Logistik) mohon bersiap untuk kemungkinan pergeseran jadwal.`,
        severity: 'Warning',
        requestingDivision: targetTask.division,
        requestingDivisionName: targetTask.divisionName,
        delayMinutes: delay,
        reason: reason,
        timestamp: state.virtualClock + ' WIB',
        active: true
      };
      state.broadcastAlerts = [preAlert];

      // PM Dedicated Alert
      state.pmWarningAlert = {
        id: 'ALERT-PM-APPROVAL-' + Date.now(),
        type: 'APPROVAL_REQUIRED',
        title: `PERMINTAAN PERSETUJUAN EXTEND WAKTU (+${delay} MENIT)`,
        message: `Divisi ${targetTask.divisionName} mengajukan perpanjangan waktu +${delay}m pada ${targetTask.stageName} akibat "${reason}". Mohon tinjau dampak rantai pasok dan berikan persetujuan.`,
        severity: 'Warning',
        time: state.virtualClock + ' WIB',
        batchId: targetTask.batchId,
        delayMinutes: delay,
        reason: reason,
        aiRecommendation: aiRec,
        active: true
      };

      try {
        fetch('/api/broadcast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'PRE_APPROVAL_NOTICE',
            payload: preAlert
          })
        }).catch(() => {});
      } catch (e) {}

      if (window.DairySyncApp) {
        window.DairySyncApp.playAudio('alert');
      }

      this.notify();
      return state.pendingExtendRequest;
    },

    // 2. STAGE: Project Manager Approves the Extend Request (Resmi Di-ACC -> Jadwal Bergeser & Semua Divisi Diberi Notif)
    approveTaskExtend: function () {
      const req = state.pendingExtendRequest;
      if (!req) return;

      const pipeline = state.integratedPipeline;
      const targetIndex = pipeline.findIndex(t => t.id === req.taskId);
      if (targetIndex === -1) return;

      const targetTask = pipeline[targetIndex];
      targetTask.plannedEnd = targetTask.potentialEnd || this.addMinutesToTime(targetTask.plannedEnd, req.delayMinutes);
      targetTask.status = 'delayed';
      targetTask.statusLabel = `Extend +${req.delayMinutes}m (Resmi Di-ACC PM)`;
      targetTask.delayShiftMinutes = (targetTask.delayShiftMinutes || 0) + req.delayMinutes;
      targetTask.pendingApproval = false;
      targetTask.potentialStart = null;
      targetTask.potentialEnd = null;
      targetTask.affected = true;

      // Officially apply ripple times to all downstream tasks
      for (let i = targetIndex + 1; i < pipeline.length; i++) {
        const curr = pipeline[i];
        curr.plannedStart = curr.potentialStart || curr.plannedStart;
        curr.plannedEnd = curr.potentialEnd || curr.plannedEnd;
        curr.delayShiftMinutes = (curr.delayShiftMinutes || 0) + req.delayMinutes;
        curr.statusLabel = `Jadwal Baru (+${curr.delayShiftMinutes}m Resmi Di-ACC PM)`;
        curr.pendingApproval = false;
        curr.potentialStart = null;
        curr.potentialEnd = null;
        curr.affected = true;
      }

      // 📢 AFTER ACC: Official Broadcast to All Divisions (Semua divisi dapat notif resmi bahwa jadwal sudah di-ACC)
      const postAlert = {
        id: 'POST-ALERT-' + Date.now(),
        type: 'POST_APPROVAL_NOTICE',
        title: '📢 JADWAL RESMI TELAH DISETUJUI OLEH PROJECT MANAGER',
        message: `Project Manager telah MENYETUJUI pengajuan extend waktu +${req.delayMinutes}m untuk ${targetTask.stageName}. Jadwal baru telah disinkronkan resmi ke seluruh divisi (CIP, Gudang, Logistik). Segera laksanakan operasional sesuai jadwal terupdate.`,
        severity: 'Success',
        timestamp: state.virtualClock + ' WIB',
        active: true
      };
      state.broadcastAlerts = [postAlert];

      // Update PM Alert
      state.pmWarningAlert = {
        id: 'INFO-APPROVED-' + Date.now(),
        type: 'APPROVED',
        title: 'PERSETUJUAN BERHASIL DITERAPKAN',
        message: `Jadwal baru (+${req.delayMinutes}m) telah aktif dan tersinkronisasi ke seluruh divisi secara real-time.`,
        severity: 'Success',
        time: state.virtualClock + ' WIB',
        active: true
      };

      state.pendingExtendRequest = null;

      try {
        fetch('/api/broadcast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'POST_APPROVAL_NOTICE',
            payload: postAlert
          })
        }).catch(() => {});
      } catch (e) {}

      if (window.DairySyncApp) {
        window.DairySyncApp.playAudio('click');
      }

      this.notify();
    },

    // 3. STAGE: Project Manager Rejects the Request
    rejectTaskExtend: function (rejectReason = 'Pertahankan jadwal target standar') {
      const req = state.pendingExtendRequest;
      if (!req) return;

      const pipeline = state.integratedPipeline;
      pipeline.forEach(t => {
        t.pendingApproval = false;
        t.potentialStart = null;
        t.potentialEnd = null;
        if (t.status === 'delayed' && t.statusLabel.includes('Menunggu ACC')) {
          t.status = 'in_progress';
          t.statusLabel = 'Pengajuan Ditolak (Tetap Jadwal Semula)';
        } else if (t.statusLabel.includes('Menunggu ACC')) {
          t.statusLabel = 'Pengajuan Ditolak (Tetap Jadwal Semula)';
        }
      });

      // ℹ️ REJECTION ALERT to all divisions
      const rejAlert = {
        id: 'REJ-ALERT-' + Date.now(),
        type: 'REJECTION_NOTICE',
        title: 'ℹ️ PENGAJUAN EXTEND WAKTU DITOLAK PROJECT MANAGER',
        message: `Project Manager memutuskan untuk mempertahankan jadwal standar. Alasan: "${rejectReason}". Seluruh divisi diminta mengoptimalkan throughput tanpa pergeseran jadwal.`,
        severity: 'Info',
        timestamp: state.virtualClock + ' WIB',
        active: true
      };
      state.broadcastAlerts = [rejAlert];

      state.pmWarningAlert = {
        id: 'INFO-REJECTED-' + Date.now(),
        type: 'REJECTED',
        title: 'PENGAJUAN DITOLAK',
        message: 'Jadwal tetap dipertahankan sesuai konfigurasi standar.',
        severity: 'Info',
        time: state.virtualClock + ' WIB',
        active: true
      };

      state.pendingExtendRequest = null;

      if (window.DairySyncApp) {
        window.DairySyncApp.playAudio('click');
      }

      this.notify();
    },

    dismissBroadcastAlert: function (alertId) {
      state.broadcastAlerts = state.broadcastAlerts.filter(a => a.id !== alertId);
      this.notify();
    },

    // Alias for extendTaskTimeAndReschedule to route to requestTaskExtend
    extendTaskTimeAndReschedule: function (taskId, delayMinutes, reason) {
      return this.requestTaskExtend(taskId, delayMinutes, reason);
    },

    // AI Engine: Auto-Delay Impact Analysis & Rescheduling
    calculateAiCascadingReschedule: function (delayedTask, reason, delayMinutes) {
      const delay = parseInt(delayMinutes, 10) || 30;
      const pipeline = state.integratedPipeline;
      const targetIndex = pipeline.findIndex(t => t.id === delayedTask.id);

      // Clone schedule and recalculate forward downstream tasks
      const revisedSchedule = pipeline.map((t, idx) => {
        if (idx < targetIndex) {
          return { ...t, revisedStart: t.plannedStart, revisedEnd: t.plannedEnd, delayShiftMinutes: 0 };
        }
        if (idx === targetIndex) {
          const revisedEnd = this.addMinutesToTime(t.plannedEnd, delay);
          return {
            ...t,
            revisedStart: t.plannedStart,
            revisedEnd: revisedEnd,
            delayShiftMinutes: delay,
            affected: true
          };
        }
        // Downstream tasks: shift both start and end by delay
        const revisedStart = this.addMinutesToTime(t.plannedStart, delay);
        const revisedEnd = this.addMinutesToTime(t.plannedEnd, delay);
        return {
          ...t,
          revisedStart,
          revisedEnd,
          delayShiftMinutes: delay,
          affected: true
        };
      });

      // Downstream division impacts
      const downstreamImpacts = [
        {
          division: 'production',
          divisionName: 'Production (CIP Washing)',
          impact: `CIP Slot 5-Stage terdorong mundur ${delay}m. Pemanasan steam boiler perlu dipertahankan pada 82°C.`,
          riskLevel: 'Moderate'
        },
        {
          division: 'warehouse',
          divisionName: 'Warehouse & Packaging',
          impact: `Mesin pengisi Tetra Pak A3 infeed tertunda hingga ${this.addMinutesToTime('10:45', delay)} WIB. Operator packaging dialihkan ke persiapan karton rol.`,
          riskLevel: 'Moderate'
        },
        {
          division: 'logistics',
          divisionName: 'Logistics Distribution',
          impact: `Truk TRK-03 (Tujuan Surabaya) mundur keberangkatan ke ${this.addMinutesToTime('12:00', delay)} WIB. Buffer pra-chilling box dinaikkan ke 2.5°C untuk mencegah kenaikan suhu.`,
          riskLevel: 'High'
        }
      ];

      return {
        timestamp: state.virtualClock + ' WIB',
        delayedTaskId: delayedTask.id,
        delayMinutes: delay,
        rawReason: reason || 'Kendala mekanis operasional pada line pasteurisasi',
        summaryForPM: `Keterlambatan ${delay} menit pada Batch 1 menyebabkan pergeseran berantai pada 3 divisi hilir (CIP Produksi, Aseptic Packaging Gudang, dan Armada Distribusi Surabaya). Waktu tiba di Surabaya bergeser ke ${this.addMinutesToTime('14:30', delay)} WIB.`,
        revisedSchedule: revisedSchedule,
        downstreamImpacts: downstreamImpacts,
        mitigationActions: [
          `Langkah 1: Aktifkan Buffer Silo Insulasi B untuk menampung susu baku agar aliran pasteurisasi tidak membebani tangki utama.`,
          `Langkah 2: Tingkatkan throughput kecepatan Tetra Pak A3 dari 10,000 menjadi 11,500 pack/jam selama 40 menit setelah CIP selesai untuk memangkas selisih waktu 15 menit.`,
          `Langkah 3: Peringatkan driver armada TRK-03 agar tetap menyambungkan shore power pendingin boks truk di loading dock plant.`
        ]
      };
    },

    // Apply the AI Rescheduled Timeline to the live pipeline
    applyAiReschedule: function () {
      if (!state.aiRescheduleRecommendation) return;

      const revised = state.aiRescheduleRecommendation.revisedSchedule;
      state.integratedPipeline = revised.map(item => {
        return {
          ...item,
          plannedStart: item.revisedStart || item.plannedStart,
          plannedEnd: item.revisedEnd || item.plannedEnd,
          statusLabel: item.affected ? `Jadwal Baru (+${item.delayShiftMinutes}m AI)` : item.statusLabel
        };
      });

      // Clear the active recommendation alert and notify all divisions
      state.pmWarningAlert = {
        id: 'INFO-AI-APPLIED-' + Date.now(),
        type: 'AI_APPLIED',
        title: 'JADWAL BARU REKOMENDASI AI BERHASIL DITERAPKAN',
        message: 'Revisi timeline telah disinkronkan ke seluruh divisi (Produksi, Gudang, QC Lab, dan Logistik) secara real-time.',
        severity: 'Success',
        time: state.virtualClock + ' WIB',
        active: true
      };

      state.aiRescheduleRecommendation = null;
      if (window.DairySyncApp) {
        window.DairySyncApp.playAudio('click');
      }
      this.notify();
    },

    dismissPmWarningAlert: function () {
      if (state.pmWarningAlert) {
        state.pmWarningAlert.active = false;
        this.notify();
      }
    },

    closeProductionDialog: function () {
      state.productionDialogActive = false;
      this.notify();
    },

    // Reset data
    resetToDefault: function () {
      state = JSON.parse(JSON.stringify(initialData));
      this.notify();
    }
  };
})();
