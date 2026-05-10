export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'operator' | 'viewer'
  avatar?: string
}

export interface Asset {
  id: string
  name: string
  location: string
  status: 'active' | 'inactive' | 'maintenance'
  type: string
  lastReading?: number
  efficiency?: number
  latitude?: number
  longitude?: number
}

export interface Alert {
  id: string
  assetId: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  resolved: boolean
}

export interface ServiceProvider {
  id: string
  name: string
  type: string
  rating: number
  location: string
  price: string
  contact: string
}

export interface ComplianceRecord {
  id: string
  entity: string
  eventType: string
  timestamp: Date
  hash: string
  status: 'verified' | 'pending' | 'failed'
}

export interface DigitalTwinData {
  assetId: string
  flow: number
  head: number
  efficiency: number
  timestamp: Date
}

export type GroundwaterRisk = 'optimal' | 'watch' | 'critical'

export interface GroundwaterBasin {
  id: string
  name: string
  country: string
  bbox: [number, number, number, number]
  center: [number, number]
  storageAnomalyCm: number
  rechargeMm30d: number
  depletionRateCmYear: number
  confidence: number
  risk: GroundwaterRisk
}

export interface GroundwaterWell {
  id: string
  basinId: string
  name: string
  latitude: number
  longitude: number
  waterTableDepthMeters: number
  trend: 'rising' | 'stable' | 'falling'
  lastUpdated: string
}

export interface GroundwaterFlowVector {
  id: string
  from: [number, number]
  to: [number, number]
  velocityMDay: number
}

export interface GroundwaterSnapshot {
  basinId: string
  generatedAt: string
  source: string
  basins: GroundwaterBasin[]
  wells: GroundwaterWell[]
  flowVectors: GroundwaterFlowVector[]
  sources: GroundwaterDataSourceStatus[]
}

export interface GroundwaterDataSourceStatus {
  id: 'nasa' | 'ecmwf' | 'google'
  label: string
  status: 'live' | 'mock' | 'unavailable'
  detail: string
}

export type GroundwaterSelection =
  | { type: 'basin'; basin: GroundwaterBasin }
  | { type: 'well'; well: GroundwaterWell }
  | { type: 'flow'; flow: GroundwaterFlowVector }

export type Theme = 'light' | 'dark' | 'system'

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}
