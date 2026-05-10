import type { GroundwaterProvider } from './shared'
import { fetchJson } from './shared'

const MOCK_LATENCY_MS = 180

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const mockBasinAugment = {
  confidenceBoost: 0.03,
  detail: 'Mocked Google Earth Engine land stress and field abstraction layer',
}

const googleConnector: GroundwaterProvider = {
  id: 'google',
  label: 'Google Earth Engine',
  async fetchSnapshot(basinId) {
    const liveUrl = import.meta.env.VITE_GOOGLE_EE_AQUIFER_URL

    if (liveUrl) {
      try {
        const payload = await fetchJson<{ confidenceBoost?: number; detail?: string }>(
          `${liveUrl}?basinId=${encodeURIComponent(basinId)}`,
        )
        return {
          status: 'live',
          detail: payload.detail ?? 'Live Google Earth Engine layer feed',
        }
      } catch {
        // fall through to mock
      }
    }

    await wait(MOCK_LATENCY_MS)
    return {
      status: 'mock',
      detail: mockBasinAugment.detail,
    }
  },
}

export default googleConnector
