import { create } from 'zustand'
import type { GroundwaterWell } from '@/types'

interface Asset {
  id: string
  name: string
  location: string
  status: 'active' | 'inactive' | 'maintenance'
  type: string
  lastReading?: number
  efficiency?: number
}

interface Alert {
  id: string
  assetId: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  resolved: boolean
}

export interface GroundwaterLayer {
  id: string
  name: string
  depthRangeMeters: [number, number]
  visible: boolean
}

export interface TemporalState {
  selectedDate: string
  mode: 'historical' | 'nowcast' | 'forecast'
}

export type WellSensorData = GroundwaterWell

interface DataState {
  assets: Asset[]
  alerts: Alert[]
  groundwaterLayers: GroundwaterLayer[]
  temporalState: TemporalState
  wellSensorData: WellSensorData[]
  isLoading: boolean
  error: string | null
  setAssets: (assets: Asset[]) => void
  addAsset: (asset: Asset) => void
  updateAsset: (id: string, updates: Partial<Asset>) => void
  deleteAsset: (id: string) => void
  setAlerts: (alerts: Alert[]) => void
  addAlert: (alert: Alert) => void
  resolveAlert: (id: string) => void
  setGroundwaterLayers: (layers: GroundwaterLayer[]) => void
  toggleGroundwaterLayer: (id: string) => void
  setTemporalState: (temporalState: Partial<TemporalState>) => void
  setWellSensorData: (wellSensorData: WellSensorData[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useDataStore = create<DataState>((set) => ({
  assets: [],
  alerts: [],
  groundwaterLayers: [
    { id: 'shallow', name: 'Shallow aquifer', depthRangeMeters: [0, 80], visible: true },
    { id: 'intermediate', name: 'Intermediate aquifer', depthRangeMeters: [80, 220], visible: true },
    { id: 'deep', name: 'Deep aquifer', depthRangeMeters: [220, 520], visible: false },
  ],
  temporalState: {
    selectedDate: '2026-05',
    mode: 'nowcast',
  },
  wellSensorData: [],
  isLoading: false,
  error: null,
  setAssets: (assets) => set({ assets }),
  addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
  updateAsset: (id, updates) => set((state) => ({
    assets: state.assets.map(asset =>
      asset.id === id ? { ...asset, ...updates } : asset
    )
  })),
  deleteAsset: (id) => set((state) => ({
    assets: state.assets.filter(asset => asset.id !== id)
  })),
  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
  resolveAlert: (id) => set((state) => ({
    alerts: state.alerts.map(alert =>
      alert.id === id ? { ...alert, resolved: true } : alert
    )
  })),
  setGroundwaterLayers: (groundwaterLayers) => set({ groundwaterLayers }),
  toggleGroundwaterLayer: (id) => set((state) => ({
    groundwaterLayers: state.groundwaterLayers.map((layer) =>
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    )
  })),
  setTemporalState: (temporalState) => set((state) => ({
    temporalState: { ...state.temporalState, ...temporalState }
  })),
  setWellSensorData: (wellSensorData) => set({ wellSensorData }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
