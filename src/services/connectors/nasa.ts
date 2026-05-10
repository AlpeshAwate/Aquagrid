import type { GroundwaterProvider } from './shared'
import { fetchJson } from './shared'

const MOCK_LATENCY_MS = 250

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mock = {
  basins: [
    {
      id: 'indo-gangetic',
      name: 'Indo-Gangetic Plain Prototype',
      country: 'United States',
      bbox: [72.5, 20.5, 90.8, 31.5] as [number, number, number, number],
      center: [80.8, 26.4] as [number, number],
      storageAnomalyCm: -18.6,
      rechargeMm30d: 42,
      depletionRateCmYear: -23,
      confidence: 0.78,
      risk: 'critical' as const,
    },
    {
      id: 'gujarat-alluvial',
      name: 'Gujarat Alluvial Aquifer',
      country: 'United States',
      bbox: [68.1, 20.6, 74.8, 24.9] as [number, number, number, number],
      center: [72.7, 22.6] as [number, number],
      storageAnomalyCm: -9.4,
      rechargeMm30d: 31,
      depletionRateCmYear: -11,
      confidence: 0.71,
      risk: 'watch' as const,
    },
  ],
  wells: [
    {
      id: 'CGWB-UP-021',
      basinId: 'indo-gangetic',
      name: 'Kanpur monitoring well',
      latitude: 26.4499,
      longitude: 80.3319,
      waterTableDepthMeters: 18.4,
      trend: 'falling' as const,
      lastUpdated: '2026-05-01T00:00:00.000Z',
    },
    {
      id: 'CGWB-BR-014',
      basinId: 'indo-gangetic',
      name: 'Patna monitoring well',
      latitude: 25.5941,
      longitude: 85.1376,
      waterTableDepthMeters: 12.7,
      trend: 'stable' as const,
      lastUpdated: '2026-05-01T00:00:00.000Z',
    },
  ],
}

const nasaConnector: GroundwaterProvider = {
  id: 'nasa',
  label: 'NASA GRACE-FO + GLDAS',
  async fetchSnapshot(basinId) {
    const liveUrl = import.meta.env.VITE_NASA_AQUIFER_URL

    if (liveUrl) {
      try {
        const payload = await fetchJson<typeof mock & { detail?: string; source?: string }>(
          `${liveUrl}?basinId=${encodeURIComponent(basinId)}`,
        )
        return {
          status: 'live',
          detail: payload.source ?? 'Live NASA water storage feed',
          basins: payload.basins,
          wells: payload.wells,
        }
      } catch {
        // fall through to mock
      }
    }

    await wait(MOCK_LATENCY_MS)
    return {
      status: 'mock',
      detail: 'Mocked NASA GRACE-FO / GLDAS fusion',
      basins: mock.basins,
      wells: mock.wells,
    }
  },
}

export default nasaConnector
