import type {
  GroundwaterBasin,
  GroundwaterDataSourceStatus,
  GroundwaterFlowVector,
  GroundwaterWell,
} from '@/types'

export interface GroundwaterProviderContribution {
  status: GroundwaterDataSourceStatus['status']
  detail: string
  basins?: GroundwaterBasin[]
  wells?: GroundwaterWell[]
  flowVectors?: GroundwaterFlowVector[]
}

export interface GroundwaterProvider {
  id: GroundwaterDataSourceStatus['id']
  label: string
  fetchSnapshot: (basinId: string) => Promise<GroundwaterProviderContribution>
}

export const fetchJson = async <T>(url: string, timeoutMs = 7000): Promise<T> => {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return (await response.json()) as T
  } finally {
    window.clearTimeout(timeoutId)
  }
}

export const providerStatus = (
  id: GroundwaterDataSourceStatus['id'],
  label: string,
  status: GroundwaterDataSourceStatus['status'],
  detail: string,
): GroundwaterDataSourceStatus => ({
  id,
  label,
  status,
  detail,
})
