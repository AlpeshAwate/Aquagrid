# Technical Specification: AquaGrid Groundwater Digital Twin (GDT)

## 1. Executive Summary
This document outlines the architecture and implementation plan for integrating a global groundwater digital twin into the AquaGrid platform. The goal is to move beyond surface-level mapping to a multi-layered, predictive 3D environment that simulates aquifer health using satellite data, physics-based modeling, and machine learning.

---

## 2. System Architecture

The GDT operates on a three-tier architecture:

### A. The Data Pipeline (Ingestion & ETL)
*   **Satellite Input:** GRACE/GRACE-FO for Groundwater Storage Anomaly (GWSA).
*   **Hydrogeological Baseline:** GLHYMPS (porosity/permeability) and IGRAC (aquifer boundaries).
*   **Real-time Forcing:** Weather APIs (ECMWF) for precipitation and recharge data.
*   **Infrastructure Context:** AquaGrid's internal Asset Register (pumping stations, wells).

### B. The Modeling Engine (The "Brain")
*   **Physics Layer:** MODFLOW 6 (Parallel) running on a high-performance compute cluster (or AWS Lambda for basin-specific sub-models).
*   **Surrogate Layer:** An LSTM-based Machine Learning model trained on historical data to provide low-latency "nowcasts" of water table depths to the frontend.
*   **API Layer:** Python (FastAPI) serving data as OGC 3D Tiles or Voxel grids.

### C. The Visualization Layer (The "Chassis")
*   **Platform:** CesiumJS (Integrated into `src/pages/GlobalTwinPage.tsx`).
*   **Key Features:** Sub-surface clipping, transparency controls, and temporal sliders for historical/predictive analysis.

---

## 3. Frontend Implementation Strategy (React/Cesium)

### 3.1 Sub-surface Visualization
To visualize "hidden" water, we will implement two primary Cesium techniques:
1.  **Clipping Planes:** Allow users to "slice" the terrain to reveal a vertical cross-section of the aquifer.
2.  **Cesium VoxelPrimitive:** For high-resolution 3D volumetric data (e.g., salinity or pressure gradients within the aquifer).

### 3.2 State Management (`zustand`)
Extend `src/stores/dataStore.ts` to handle:
*   `groundwaterLayers`: Toggle visibility for different depth intervals.
*   `temporalState`: Sync the 3D globe with historical GRACE data timelines.
*   `wellSensorData`: Real-time telemetry from IGRAC-compatible monitoring wells.

---

## 4. Phase-wise Roadmap

### Phase 1: Prototype (Basin Level - The Ganges)
*   **Goal:** Demonstrate a functional twin for the Indo-Gangetic Plain.
*   **Action:** Ingest GLDAS-2.2 data via Google Earth Engine and overlay it as a heatmap in Cesium.
*   **Verification:** Compare satellite GWSA with local CGWB (Central Ground Water Board) well data.

### Phase 2: Hybrid Modeling
*   **Goal:** Integrate predictive capabilities.
*   **Action:** Deploy the ML Surrogate model to predict water table fluctuations based on seasonal rainfall forecasts.
*   **UI:** Add a "Predictive Slider" to the Dashboard.

### Phase 3: Global Scale & Volumetric 3D
*   **Goal:** Full global coverage with 3D aquifer volumes.
*   **Action:** Convert the entire GLHYMPS dataset into Cesium 3D Tiles (CDB or 3DTILES).
*   **UI:** Enable "Underground Mode" where terrain becomes semi-transparent.

---

## 5. Technical Challenges & Mitigations

| Challenge | Mitigation Strategy |
| :--- | :--- |
| **Data Latency** | Use **ML Surrogates** to provide immediate estimates while physics models run in the background. |
| **Browser Memory** | Implement **3D Tiles styling** to only render high-detail voxels in the user's immediate viewport. |
| **Validation** | Create a **"Confidence Score" layer** based on the proximity of satellite data to physical monitoring wells. |
| **Human Impact** | Integrate **Satellite Evapotranspiration (ET)** to detect unmetered groundwater extraction (illegal pumping). |

---

## 6. Next Steps for AquaGrid Codebase
1.  **Enhance `GlobalTwinPage.tsx`:** Add a "Groundwater" layer toggle in the UI.
2.  **Mock Data Injection:** Create a service in `src/services/iot.js` to simulate aquifer depth API calls for the prototype phase.
3.  **Cesium Shader Customization:** Implement custom shaders to visualize water flow vectors (Darcy's Law) in 3D.
