# DairySync AI - Intelligent Supply Chain & Production Management System
### PT Greenfields Indonesia • Enterprise Web Prototype Dashboard

**DairySync AI** is an interactive, responsive industrial web prototype dashboard architected for **PT Greenfields Indonesia**. It synchronizes the entire end-to-end dairy supply chain lifecycle—from farm raw extraction and sub-zero cold-chain transit to quality control, automated CIP flavor scheduling, and executive operations oversight.

---

## 🌟 Key Architecture & 6 Distinct User Roles

The dashboard features an **Admin Role Switcher Ribbon** at the top, enabling instant swapping between 6 specialized personas:

### 1. Project Manager (Admin Utama)
- **Clearance & Access:** Full System Overview, Global Analytics, Master Audit Reports, Central Command.
- **Exclusive Feature:** **Global Operations Map & Real-time Progress Tracking**
  - High-tech dark-mode map powered by Leaflet with CartoDB Dark Matter tiles.
  - Interactive pins for Farm Silo Centers (Malang & Blitar), Central QC Lab, Gunung Kawi Processing Plant, Surabaya Distribution Hub, and active trucks on road with pulsing radar indicators.
  - Live top-bar metric counters:
    - `[ 12 ON ROAD ]`
    - `[ 8 ON SITE ]`
    - `[ 24 DONE TODAY ]`
    - `[ 1 BREAKDOWN ]`
  - Sidebar with real-time operational feeds, active AI anomaly alerts, and global batch ETAs.
  - **Exclusive Master Reporting:** Only role authorized to generate and print the comprehensive **Executive Operations & Quality Master Audit Report**.

### 2. Farm Division
- **Capabilities:**
  - Raw milk extraction volume logging across rotary milking parlors (Malang & Blitar).
  - Thermal monitoring of 4 large holding silos with live temperature gauges (3.2°C – 3.8°C), glycol loop readings, and mechanical agitator speeds.
  - Fast extraction lot logger and bulk tanker dispatch handover queue.
  - Interactive Batch Progress Checklist with rolling 10-minute SLA tracking.

### 3. Logistics / Distribution Division
- **Capabilities:**
  - **Shopee/Gojek-Style Live Fleet Tracking Map:** Real-time tanker movement across East Java dairy transport corridors.
  - Live status indicators: `In-Transit`, `Arrived at Lab Gate`, `Unloading`, `Delayed`, `Breakdown`.
  - Comprehensive live telemetry per truck: Current Speed (km/h), Milk Tank Temperature (°C) with cold-chain violation alerts, Driver Contact (WhatsApp 1-click link), and Route Progress Bars.

### 4. QC Laboratory Division
- **Capabilities:**
  - **AI Quality Rating Matrix (Interactive Auto-Calculator):** Real-time classification into *Grade A (Premium UHT)*, *Grade B (Standard)*, or *Rejection Risk* based on Fat %, Protein %, pH, and Bacteria Count (CFU/mL) sliders.
  - **AI Spoilage Predictor:** Arrhenius-based microbiological degradation model predicting remaining holding hours and souring risk based on transit hours and average tank temperature.
  - Spoilage & Expiry Tracker logging rejected lots and automated biogas diversion.

### 5. Production Division
- **Capabilities:**
  - **Dynamic Multi-Flavor Scheduling (Gantt/Timetable View):** Visual timeline sequencing flavor batches (*Full Cream -> Strawberry -> Swiss Chocolate*).
  - **Automated CIP (Clean-In-Place) Transition Manager:**
    - Automatically forces mandatory 45-minute 5-stage sanitized washing cycles between differing flavor runs to prevent flavor and allergen cross-contamination.
    - Dynamically recalculates downstream line pacing if preceding upstream delays occur.
  - Real-time tracking engine adjusting downstream packaging line ETAs to maintain zero line downtime.

### 6. Auxiliary & Warehouse Division (Pelengkap)
- **Capabilities:**
  - Packaging materials inventory tracking (Tetra Pak 1L Slim carton reels, HeliCap 23 closures, secondary packaging).
  - Flavor ingredients inventory (Natural Swiss Cocoa, Strawberry puree, CIP food-grade caustic and acid buffers).
  - Cold storage vaults monitoring (Cold Rooms Alpha, Beta, Gamma with temperature, humidity, and pallet utilization bars).

---

## ⚡ Universal System Features

### A. Universal Trouble Reporting & AI Mitigation Engine
*(Available to all operational division roles)*
- **Interactive Modal Form:** Division, Severity (`Low`, `Medium`, `High`, `Critical`), Issue Category, Affected Batch ID, Description, and Estimated Resolution Time.
- **AI Recommendation Engine:**
  - Automatically assesses risk scores and generates step-by-step containment guidelines.
  - Direct 1-Click WhatsApp links to the relevant Person in Charge (PJ) and Project Manager.
  - **Autonomous Critical Contingency Routing:** Automatically engages bypass routes (e.g., redirecting raw milk batch to Insulated Storage Tank 3, triggering emergency 3-stage CIP sequence, dispatching backup technician).

### B. Division Checklist & AI Anomaly Detection System
*(Available across operational divisions)*
- Step-by-step checklist per batch with target completion timestamps.
- **AI Anomaly Sentinel:** Monitors completion timestamps in real-time. If any step is delayed beyond a **rolling 10-minute threshold**, the system flashes an **AI Anomaly Warning Banner**, notifies the PM dashboard, and dynamically recalibrates downstream line ETAs (+25m).
- Includes an interactive **"⚠️ Trigger 10m Anomaly"** simulator button.

---

## 🛠️ Tech Stack & Implementation Details

- **Design System:** Modern Industrial Tech Dark Mode, clean typography (Outfit, Inter, JetBrains Mono), glassmorphic cards (`backdrop-blur-md`), and status-coded badges (Green = Normal, Amber = Warning, Red = Critical/Anomaly).
- **Mapping Engine:** Leaflet.js with CartoDB Dark Matter tiles, custom SVG animated radar markers, and route polylines.
- **Dialog System:** Modern HTML5 `<dialog closedby="any">` with declarative light-dismiss and javascript backdrop click fallbacks.
- **Audio Feedback:** Synthesized Web Audio API sound generator for subtle click chimes and incident alert pings (toggleable).
- **Backend Server:** Built-in zero-dependency Node.js HTTP server (`server.js`).

---

## 🚀 How to Run Locally

1. Open a terminal in this directory:
   ```bash
   node server.js
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:3000/
   ```
   *(Alternatively, you can open `index.html` directly in any modern browser!)*

3. Use the **Role Switcher Ribbon** at the top to explore all 6 division views, test the interactive sliders, trigger simulated anomalies, file trouble tickets, and download executive audit reports!
