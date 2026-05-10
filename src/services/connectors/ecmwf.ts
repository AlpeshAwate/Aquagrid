import type { GroundwaterProvider } from './shared'
import { fetchJson } from './shared'

const MOCK_LATENCY_MS = 220

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockFlowVectors = [
  { id: 'ganges-flow-1', from: [76.2, 29.4] as [number, number], to: [79.8, 27.3] as [number, number], velocityMDay: 0.19 },
  { id: 'ganges-flow-2', from: [80.1, 27.4] as [number, number], to: [84.8, 25.8] as [number, number], velocityMDay: 0.15 },
  { id: 'ganges-flow-3', from: [85.2, 25.5] as [number, number], to: [88.4, 24.3] as [number, number], velocityMDay: 0.12 },
]

const ecmwfConnector: GroundwaterProvider = {
  id: 'ecmwf',
  label: 'ECMWF ERA5 / ERA5-Land',
  async fetchSnapshot(basinId) {
    const liveUrl = import.meta.env.VITE_ECMWF_AQUIFER_URL

    if (liveUrl) {
      try {
        const payload = await fetchJson<{ flowVectors?: typeof mockFlowVectors; detail?: string }>(
          `${liveUrl}?basinId=${encodeURIComponent(basinId)}`,
        )
        return {
          status: 'live',
          detail: payload.detail ?? 'Live ECMWF weather forcing feed',
          flowVectors: payload.flowVectors,
        }
      } catch {
        // fall through to mock
      }
    }

    await wait(MOCK_LATENCY_MS)
    return {
      status: 'mock',
      detail: 'Mocked ECMWF rainfall and recharge forcing',
      flowVectors: mockFlowVectors,
    }
  },
}

export default ecmwfConnector
