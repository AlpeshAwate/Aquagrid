import type {
  GroundwaterDataSourceStatus,
  GroundwaterSnapshot,
} from '@/types'
import { groundwaterConnectors } from './connectors'
import type { GroundwaterProviderContribution } from './connectors/shared'

const mergeById = <T extends { id: string }>(items: T[]) => {
  const byId = new Map<string, T>()
  items.forEach((item) => byId.set(item.id, item))
  return [...byId.values()]
}

const baselineSnapshot = (basinId: string): GroundwaterSnapshot => ({
  basinId,
  generatedAt: new Date().toISOString(),
  source: 'Baseline groundwater prototype',
  basins: [
    {
      id: 'high-plains',
      name: 'High Plains Aquifer Prototype',
      country: 'United States',
      bbox: [72.5, 20.5, 90.8, 31.5],
      center: [80.8, 26.4],
      storageAnomalyCm: -18.6,
      rechargeMm30d: 42,
      depletionRateCmYear: -23,
      confidence: 0.78,
      risk: 'critical',
    },
    {
      id: 'texas-trinity',
      name: 'Texas Trinity Aquifer',
      country: 'United States',
      bbox: [68.1, 20.6, 74.8, 24.9],
      center: [72.7, 22.6],
      storageAnomalyCm: -9.4,
      rechargeMm30d: 31,
      depletionRateCmYear: -11,
      confidence: 0.71,
      risk: 'watch',
    },
  ],
  wells: [
    {
      id: 'CGWB-UP-021',
      basinId: 'high-plains',
      name: 'Lubbock monitoring well',
      latitude: 26.4499,
      longitude: 80.3319,
      waterTableDepthMeters: 18.4,
      trend: 'falling',
      lastUpdated: '2026-05-01T00:00:00.000Z',
    },
    {
      id: 'CGWB-BR-014',
      basinId: 'high-plains',
      name: 'Amarillo monitoring well',
      latitude: 25.5941,
      longitude: 85.1376,
      waterTableDepthMeters: 12.7,
      trend: 'stable',
      lastUpdated: '2026-05-01T00:00:00.000Z',
    },
    {
      id: 'CGWB-GJ-008',
      basinId: 'texas-trinity',
      name: 'Austin monitoring well',
      latitude: 22.3072,
      longitude: 73.1812,
      waterTableDepthMeters: 21.9,
      trend: 'falling',
      lastUpdated: '2026-05-01T00:00:00.000Z',
    },
  ],
  flowVectors: [
    { id: 'high-plains-flow-1', from: [-101.2, 33.4], to: [-98.8, 31.3], velocityMDay: 0.19 },
    { id: 'high-plains-flow-2', from: [-99.1, 31.4], to: [-97.8, 29.8], velocityMDay: 0.15 },
    { id: 'high-plains-flow-3', from: [-98.2, 30.5], to: [-96.4, 29.3], velocityMDay: 0.12 },
    { id: 'texas-flow-1', from: [-100.0, 31.5], to: [-97.5, 30.8], velocityMDay: 0.08 },
  ],
  sources: [
    {
      id: 'nasa',
      label: 'NASA GRACE-FO + GLDAS',
      status: 'mock',
      detail: 'Awaiting NASA proxy or Earthdata-backed feed',
    },
    {
      id: 'ecmwf',
      label: 'ECMWF ERA5 / ERA5-Land',
      status: 'mock',
      detail: 'Awaiting ECMWF proxy or CDS-backed feed',
    },
    {
      id: 'google',
      label: 'Google Earth Engine',
      status: 'mock',
      detail: 'Awaiting Earth Engine proxy feed',
    },
  ],
})

const applyContribution = (
  snapshot: GroundwaterSnapshot,
  provider: GroundwaterProviderContribution,
  source: GroundwaterDataSourceStatus,
) => {
  if (provider.basins?.length) {
    const byId = new Map(snapshot.basins.map((basin) => [basin.id, basin]))
    provider.basins.forEach((basin) => {
      byId.set(basin.id, basin)
    })
    snapshot.basins = [...byId.values()]
  }

  if (provider.wells?.length) {
    snapshot.wells = mergeById([...snapshot.wells, ...provider.wells])
  }

  if (provider.flowVectors?.length) {
    snapshot.flowVectors = mergeById([...snapshot.flowVectors, ...provider.flowVectors])
  }

  snapshot.sources = snapshot.sources.map((entry) => (entry.id === source.id ? source : entry))
  snapshot.source = `${snapshot.source}; ${source.label}: ${source.status}`
}

class GroundwaterService {
  async getAquiferDepthSnapshot(basinId = 'indo-gangetic'): Promise<GroundwaterSnapshot> {
    const snapshot = baselineSnapshot(basinId)

    const providerResults = await Promise.allSettled(
      groundwaterConnectors.map(async (connector) => {
        const contribution = await connector.fetchSnapshot(basinId)
        return { connector, contribution }
      }),
    )

    providerResults.forEach((result) => {
      if (result.status !== 'fulfilled') return

      const { connector, contribution } = result.value
      applyContribution(
        snapshot,
        contribution,
        {
          id: connector.id,
          label: connector.label,
          status: contribution.status,
          detail: contribution.detail,
        },
      )
    })

    snapshot.generatedAt = new Date().toISOString()
    return snapshot
  }
}

export default new GroundwaterService()
