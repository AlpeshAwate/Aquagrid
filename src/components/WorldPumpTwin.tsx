import React from 'react'
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Cpu,
  Globe2,
  MapPin,
  PlayCircle,
  Radio,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react'
import {
  ArcType,
  Cartesian2,
  Cartesian3,
  Color,
  DistanceDisplayCondition,
  ImageryLayer,
  LabelStyle,
  Math as CesiumMath,
  NearFarScalar,
  PolylineGlowMaterialProperty,
  Rectangle,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  TileMapServiceImageryProvider,
  Viewer,
  buildModuleUrl,
  defined,
  type Entity,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import DigitalTwinLab from '@/components/DigitalTwinLab'
import type { GroundwaterRisk, GroundwaterSelection, GroundwaterSnapshot } from '@/types'

type RiskLevel = 'optimal' | 'watch' | 'critical'

interface PumpSite {
  id: string
  name: string
  region: string
  country: string
  lat: number
  lon: number
  connectedAssets: number
  onlineAssets: number
  healthScore: number
  efficiency: number
  energyIntensity: number
  waterMovedToday: string
  risk: RiskLevel
  primaryModel: string
  activeFault: string
  nextAction: string
}

interface WorldPumpTwinProps {
  groundwaterEnabled?: boolean
  groundwaterData?: GroundwaterSnapshot | null
  activeGroundwaterLayerIds?: string[]
  onGroundwaterSelect?: (selection: GroundwaterSelection) => void
}

const WORLD_PUMP_SITES: PumpSite[] = [
  {
    id: 'IN-GJ-001',
    name: 'Gujarat Industrial Water Grid',
    region: 'Asia Pacific',
    country: 'United States',
    lat: 22.3072,
    lon: 73.1812,
    connectedAssets: 18420,
    onlineAssets: 17960,
    healthScore: 94,
    efficiency: 88,
    energyIntensity: 3.8,
    waterMovedToday: '1.8B L',
    risk: 'optimal',
    primaryModel: 'FPS 4400 Series',
    activeFault: 'No systemic fault',
    nextAction: 'Keep predictive maintenance window',
  },
  {
    id: 'US-TX-014',
    name: 'Texas Groundwater Operations',
    region: 'North America',
    country: 'United States',
    lat: 31.9686,
    lon: -99.9018,
    connectedAssets: 14280,
    onlineAssets: 13870,
    healthScore: 91,
    efficiency: 85,
    energyIntensity: 4.2,
    waterMovedToday: '930M L',
    risk: 'watch',
    primaryModel: 'SubDrive Connect',
    activeFault: 'Voltage drift on 3.1% of assets',
    nextAction: 'Dispatch power quality inspection',
  },
  {
    id: 'BR-SP-022',
    name: 'Sao Paulo Commercial Pump Network',
    region: 'Latin America',
    country: 'Brazil',
    lat: -23.5505,
    lon: -46.6333,
    connectedAssets: 8120,
    onlineAssets: 7840,
    healthScore: 89,
    efficiency: 83,
    energyIntensity: 4.6,
    waterMovedToday: '620M L',
    risk: 'watch',
    primaryModel: 'Pioneer Pump',
    activeFault: 'Bearing vibration trend rising',
    nextAction: 'Pre-stage bearing kits',
  },
  {
    id: 'DE-NW-031',
    name: 'Rhine Industrial Circulation Fleet',
    region: 'Europe',
    country: 'Germany',
    lat: 51.4332,
    lon: 7.6616,
    connectedAssets: 6360,
    onlineAssets: 6320,
    healthScore: 97,
    efficiency: 91,
    energyIntensity: 3.2,
    waterMovedToday: '440M L',
    risk: 'optimal',
    primaryModel: 'Inline 1100',
    activeFault: 'No systemic fault',
    nextAction: 'Generate quarterly ESG pack',
  },
  {
    id: 'ZA-GP-009',
    name: 'Gauteng Mining Water Recovery',
    region: 'Africa',
    country: 'South Africa',
    lat: -26.2041,
    lon: 28.0473,
    connectedAssets: 4920,
    onlineAssets: 4520,
    healthScore: 76,
    efficiency: 71,
    energyIntensity: 6.1,
    waterMovedToday: '280M L',
    risk: 'critical',
    primaryModel: 'FPS Industrial',
    activeFault: 'Dry-run and cavitation risk cluster',
    nextAction: 'Open high priority service campaign',
  },
  {
    id: 'AU-QLD-018',
    name: 'Queensland Solar Irrigation Belt',
    region: 'Oceania',
    country: 'Australia',
    lat: -22.5752,
    lon: 144.0848,
    connectedAssets: 5630,
    onlineAssets: 5510,
    healthScore: 93,
    efficiency: 89,
    energyIntensity: 3.5,
    waterMovedToday: '350M L',
    risk: 'optimal',
    primaryModel: 'Fhoton SolarPak',
    activeFault: 'No systemic fault',
    nextAction: 'Recommend solar drive expansion',
  },
  {
    id: 'AE-DU-004',
    name: 'Gulf Desalination Support Fleet',
    region: 'Middle East',
    country: 'United Arab Emirates',
    lat: 25.2048,
    lon: 55.2708,
    connectedAssets: 7410,
    onlineAssets: 7120,
    healthScore: 84,
    efficiency: 79,
    energyIntensity: 5.4,
    waterMovedToday: '510M L',
    risk: 'watch',
    primaryModel: 'High Head Booster',
    activeFault: 'Thermal load above baseline',
    nextAction: 'Tune duty cycle and cooling profile',
  },
  {
    id: 'CN-JS-042',
    name: 'Jiangsu Industrial Water Loop',
    region: 'Asia Pacific',
    country: 'China',
    lat: 32.0603,
    lon: 118.7969,
    connectedAssets: 11880,
    onlineAssets: 11620,
    healthScore: 92,
    efficiency: 86,
    energyIntensity: 4.1,
    waterMovedToday: '860M L',
    risk: 'optimal',
    primaryModel: 'VR Series',
    activeFault: 'No systemic fault',
    nextAction: 'Continue automated verification',
  },
]

const RISK_STYLES: Record<RiskLevel, string> = {
  optimal:
    'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  watch:
    'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  critical:
    'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800',
}

const RISK_COLORS: Record<RiskLevel, Color> = {
  optimal: Color.fromCssColorString('#34d399'),
  watch: Color.fromCssColorString('#f59e0b'),
  critical: Color.fromCssColorString('#fb7185'),
}

const GROUNDWATER_COLORS: Record<GroundwaterRisk, Color> = {
  optimal: Color.fromCssColorString('#22c55e'),
  watch: Color.fromCssColorString('#f59e0b'),
  critical: Color.fromCssColorString('#ef4444'),
}

const FRANKLIN_HQ = {
  name: 'Franklin Electric Global Operations',
  lat: 41.0793,
  lon: -85.1394,
}

const formatAssets = (value: number) => value.toLocaleString('en-IN')

const siteAltitude = (site: PumpSite) => {
  const base = site.risk === 'critical' ? 620000 : site.risk === 'watch' ? 500000 : 420000
  return base + Math.min(site.connectedAssets * 16, 420000)
}

const siteRadius = (site: PumpSite) => {
  const radius = 130000 + site.connectedAssets * 18
  return Math.min(radius, 520000)
}

const createDataArc = (site: PumpSite) => {
  const midLon = (FRANKLIN_HQ.lon + site.lon) / 2
  const midLat = (FRANKLIN_HQ.lat + site.lat) / 2
  const lift = site.risk === 'critical' ? 1700000 : 1250000

  return [
    Cartesian3.fromDegrees(FRANKLIN_HQ.lon, FRANKLIN_HQ.lat, 130000),
    Cartesian3.fromDegrees(midLon, midLat, lift),
    Cartesian3.fromDegrees(site.lon, site.lat, 160000),
  ]
}

const MetricCard: React.FC<{
  label: string
  value: string
  subtext: string
  icon: React.ComponentType<{ className?: string }>
}> = ({ label, value, subtext, icon: Icon }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
      <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{subtext}</p>
  </div>
)

const WorldPumpTwin: React.FC<WorldPumpTwinProps> = ({
  groundwaterEnabled = false,
  groundwaterData = null,
  activeGroundwaterLayerIds = [],
  onGroundwaterSelect,
}) => {
  const cesiumContainerRef = React.useRef<HTMLDivElement | null>(null)
  const viewerRef = React.useRef<Viewer | null>(null)
  const siteEntityRef = React.useRef<Map<string, Entity>>(new Map())
  const groundwaterEntityIdsRef = React.useRef<string[]>([])
  const groundwaterEnabledRef = React.useRef(groundwaterEnabled)
  const groundwaterDataRef = React.useRef<GroundwaterSnapshot | null>(groundwaterData)
  const onGroundwaterSelectRef = React.useRef(onGroundwaterSelect)
  const [selectedSiteId, setSelectedSiteId] = React.useState(WORLD_PUMP_SITES[0].id)

  const selectedSite = React.useMemo(
    () => WORLD_PUMP_SITES.find((site) => site.id === selectedSiteId) ?? WORLD_PUMP_SITES[0],
    [selectedSiteId],
  )

  const fleetSummary = React.useMemo(() => {
    const connectedAssets = WORLD_PUMP_SITES.reduce((sum, site) => sum + site.connectedAssets, 0)
    const onlineAssets = WORLD_PUMP_SITES.reduce((sum, site) => sum + site.onlineAssets, 0)
    const averageHealth = Math.round(
      WORLD_PUMP_SITES.reduce((sum, site) => sum + site.healthScore, 0) / WORLD_PUMP_SITES.length,
    )
    const watchSites = WORLD_PUMP_SITES.filter((site) => site.risk !== 'optimal').length

    return {
      connectedAssets,
      onlineAssets,
      averageHealth,
      watchSites,
    }
  }, [])

  const flyToSite = React.useCallback((site: PumpSite, duration = 1.2) => {
    const viewer = viewerRef.current
    if (!viewer) return

    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(site.lon, site.lat, site.risk === 'critical' ? 2750000 : 2300000),
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-58),
        roll: 0,
      },
      duration,
    })
  }, [])

  React.useEffect(() => {
    groundwaterEnabledRef.current = groundwaterEnabled
    groundwaterDataRef.current = groundwaterData
    onGroundwaterSelectRef.current = onGroundwaterSelect
  }, [groundwaterData, groundwaterEnabled, onGroundwaterSelect])

  React.useEffect(() => {
    const container = cesiumContainerRef.current
    if (!container) return

    buildModuleUrl.setBaseUrl('/cesium/')

    const viewer = new Viewer(container, {
      animation: false,
      baseLayer: ImageryLayer.fromProviderAsync(
        TileMapServiceImageryProvider.fromUrl(buildModuleUrl('Assets/Textures/NaturalEarthII')),
        {
          brightness: 0.72,
          contrast: 1.22,
          saturation: 0.88,
        },
      ),
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      requestRenderMode: false,
      shouldAnimate: true,
      orderIndependentTranslucency: false,
      scene3DOnly: true,
      skyBox: false,
    })

    viewerRef.current = viewer
    viewer.scene.globe.baseColor = Color.fromCssColorString('#061827')
    viewer.scene.globe.enableLighting = true
    viewer.scene.skyAtmosphere.show = true
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 950000
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 38000000
    viewer.scene.canvas.setAttribute('aria-label', 'Cesium globe showing connected Franklin Electric pump sites')

    const siteEntities = siteEntityRef.current
    siteEntities.clear()

    viewer.entities.add({
      id: 'franklin-hq',
      name: FRANKLIN_HQ.name,
      position: Cartesian3.fromDegrees(FRANKLIN_HQ.lon, FRANKLIN_HQ.lat, 180000),
      point: {
        color: Color.fromCssColorString('#38bdf8'),
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        pixelSize: 13,
        scaleByDistance: new NearFarScalar(1200000, 1.4, 24000000, 0.6),
      },
      label: {
        text: 'Franklin Global Ops',
        font: '700 13px Inter, system-ui, sans-serif',
        fillColor: Color.WHITE,
        outlineColor: Color.BLACK,
        outlineWidth: 3,
        pixelOffset: new Cartesian2(0, -32),
        scaleByDistance: new NearFarScalar(1200000, 1, 18000000, 0.45),
        style: LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: 1,
      },
    })

    WORLD_PUMP_SITES.forEach((site) => {
      const color = RISK_COLORS[site.risk]
      const altitude = siteAltitude(site)

      const entity = viewer.entities.add({
        id: site.id,
        name: site.name,
        position: Cartesian3.fromDegrees(site.lon, site.lat, altitude),
        properties: {
          siteId: site.id,
        },
        point: {
          color: color.withAlpha(0.98),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          outlineColor: Color.WHITE,
          outlineWidth: 2,
          pixelSize: site.risk === 'critical' ? 18 : 14,
          scaleByDistance: new NearFarScalar(1300000, 1.8, 24000000, 0.65),
        },
        label: {
          text: `${site.country}\n${site.healthScore}%`,
          backgroundColor: Color.BLACK.withAlpha(0.54),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          distanceDisplayCondition: new DistanceDisplayCondition(0, 19000000),
          fillColor: Color.WHITE,
          font: '700 12px Inter, system-ui, sans-serif',
          outlineColor: Color.BLACK,
          outlineWidth: 3,
          pixelOffset: new Cartesian2(0, -44),
          scaleByDistance: new NearFarScalar(1200000, 1, 22000000, 0.55),
          showBackground: true,
          style: LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: 1,
        },
        ellipse: {
          semiMajorAxis: siteRadius(site),
          semiMinorAxis: siteRadius(site) * 0.72,
          material: color.withAlpha(site.risk === 'critical' ? 0.26 : 0.15),
          outline: true,
          outlineColor: color.withAlpha(0.82),
          height: 0,
        },
      })

      siteEntities.set(site.id, entity)

      viewer.entities.add({
        id: `${site.id}-mast`,
        polyline: {
          positions: [
            Cartesian3.fromDegrees(site.lon, site.lat, 0),
            Cartesian3.fromDegrees(site.lon, site.lat, altitude),
          ],
          material: new PolylineGlowMaterialProperty({
            color: color.withAlpha(0.72),
            glowPower: 0.24,
          }),
          width: 3,
        },
      })

      viewer.entities.add({
        id: `${site.id}-data-arc`,
        polyline: {
          positions: createDataArc(site),
          arcType: ArcType.GEODESIC,
          material: new PolylineGlowMaterialProperty({
            color: color.withAlpha(site.risk === 'critical' ? 0.58 : 0.34),
            glowPower: 0.12,
          }),
          width: site.risk === 'critical' ? 3 : 2,
        },
      })
    })

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas)
    handler.setInputAction((movement) => {
      const picked = viewer.scene.pick(movement.position)
      if (!defined(picked) || !defined(picked.id)) return

      const pickedEntity = picked.id as Entity
      const entityId = pickedEntity.id
      const snapshot = groundwaterDataRef.current

      if (groundwaterEnabledRef.current && snapshot && typeof entityId === 'string') {
        const basinId = entityId.replace(/^groundwater-(basin|volume)-/, '')
        const wellId = entityId.replace(/^groundwater-well-/, '')
        const flowId = entityId.replace(/^groundwater-flow-/, '').replace(/-head$/, '')

        const basin = snapshot.basins.find((candidate) => candidate.id === basinId)
        if (basin) {
          onGroundwaterSelectRef.current?.({ type: 'basin', basin })
          return
        }

        const well = snapshot.wells.find((candidate) => candidate.id === wellId)
        if (well) {
          onGroundwaterSelectRef.current?.({ type: 'well', well })
          return
        }

        const flow = snapshot.flowVectors.find((candidate) => candidate.id === flowId)
        if (flow) {
          onGroundwaterSelectRef.current?.({ type: 'flow', flow })
          return
        }
      }

      const site = WORLD_PUMP_SITES.find((candidate) => candidate.id === pickedEntity.id)
      if (site) {
        setSelectedSiteId(site.id)
        flyToSite(site)
      }
    }, ScreenSpaceEventType.LEFT_CLICK)

    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(35, 18, 21500000),
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-90),
        roll: 0,
      },
    })

    return () => {
      handler.destroy()
      siteEntities.clear()
      groundwaterEntityIdsRef.current = []
      viewer.destroy()
      viewerRef.current = null
    }
  }, [flyToSite])

  React.useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    groundwaterEntityIdsRef.current.forEach((id) => {
      const entity = viewer.entities.getById(id)
      if (entity) {
        viewer.entities.remove(entity)
      }
    })
    groundwaterEntityIdsRef.current = []

    viewer.scene.globe.translucency.enabled = groundwaterEnabled
    viewer.scene.globe.translucency.frontFaceAlpha = groundwaterEnabled ? 0.58 : 1
    viewer.scene.globe.translucency.backFaceAlpha = groundwaterEnabled ? 0.34 : 1

    if (!groundwaterEnabled || !groundwaterData) {
      viewer.scene.requestRender()
      return
    }

    const visibleDepthMultiplier = Math.max(activeGroundwaterLayerIds.length, 1)

    groundwaterData.basins.forEach((basin) => {
      const color = GROUNDWATER_COLORS[basin.risk]
      const basinId = `groundwater-basin-${basin.id}`
      const basinVolumeId = `groundwater-volume-${basin.id}`

      viewer.entities.add({
        id: basinId,
        name: basin.name,
        rectangle: {
          coordinates: Rectangle.fromDegrees(...basin.bbox),
          material: color.withAlpha(basin.risk === 'critical' ? 0.34 : 0.22),
          outline: true,
          outlineColor: color.withAlpha(0.95),
          height: -180000 * visibleDepthMultiplier,
          extrudedHeight: -420000 * visibleDepthMultiplier,
        },
      })

      viewer.entities.add({
        id: basinVolumeId,
        name: `${basin.name} aquifer pressure volume`,
        position: Cartesian3.fromDegrees(basin.center[0], basin.center[1], -220000 * visibleDepthMultiplier),
        ellipsoid: {
          radii: new Cartesian3(720000, 430000, 160000 * visibleDepthMultiplier),
          material: color.withAlpha(0.18),
          outline: true,
          outlineColor: Color.WHITE.withAlpha(0.28),
        },
      })

      groundwaterEntityIdsRef.current.push(basinId, basinVolumeId)
    })

    groundwaterData.wells.forEach((well) => {
      const wellColor =
        well.trend === 'falling'
          ? Color.fromCssColorString('#fb7185')
          : well.trend === 'rising'
            ? Color.fromCssColorString('#38bdf8')
            : Color.fromCssColorString('#a3e635')
      const wellId = `groundwater-well-${well.id}`

      viewer.entities.add({
        id: wellId,
        name: well.name,
        position: Cartesian3.fromDegrees(well.longitude, well.latitude, 90000),
        point: {
          color: wellColor,
          outlineColor: Color.WHITE,
          outlineWidth: 2,
          pixelSize: 10,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
          text: `${well.name}\n${well.waterTableDepthMeters.toFixed(1)} m`,
          backgroundColor: Color.BLACK.withAlpha(0.62),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          distanceDisplayCondition: new DistanceDisplayCondition(0, 9000000),
          fillColor: Color.WHITE,
          font: '700 11px Inter, system-ui, sans-serif',
          outlineColor: Color.BLACK,
          outlineWidth: 3,
          pixelOffset: new Cartesian2(0, -30),
          showBackground: true,
          style: LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: 1,
        },
        polyline: {
          positions: [
            Cartesian3.fromDegrees(well.longitude, well.latitude, 90000),
            Cartesian3.fromDegrees(well.longitude, well.latitude, -well.waterTableDepthMeters * 14000),
          ],
          material: new PolylineGlowMaterialProperty({
            color: wellColor.withAlpha(0.78),
            glowPower: 0.18,
          }),
          width: 3,
        },
      })

      groundwaterEntityIdsRef.current.push(wellId)
    })

    groundwaterData.flowVectors.forEach((flow) => {
      const flowId = `groundwater-flow-${flow.id}`
      const headId = `${flowId}-head`
      const flowColor = Color.fromCssColorString('#38bdf8')

      viewer.entities.add({
        id: flowId,
        name: `Darcy flow ${flow.velocityMDay} m/day`,
        polyline: {
          positions: [
            Cartesian3.fromDegrees(flow.from[0], flow.from[1], 180000),
            Cartesian3.fromDegrees(flow.to[0], flow.to[1], 180000),
          ],
          material: new PolylineGlowMaterialProperty({
            color: flowColor.withAlpha(0.86),
            glowPower: 0.2,
          }),
          width: Math.max(2, flow.velocityMDay * 20),
        },
      })

      viewer.entities.add({
        id: headId,
        position: Cartesian3.fromDegrees(flow.to[0], flow.to[1], 180000),
        point: {
          color: flowColor,
          outlineColor: Color.WHITE,
          outlineWidth: 1,
          pixelSize: 8,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      })

      groundwaterEntityIdsRef.current.push(flowId, headId)
    })

    viewer.scene.requestRender()
  }, [activeGroundwaterLayerIds, groundwaterData, groundwaterEnabled])

  React.useEffect(() => {
    const entity = siteEntityRef.current.get(selectedSiteId)
    if (entity) {
      flyToSite(selectedSite, 0.9)
    }
  }, [flyToSite, selectedSite, selectedSiteId])

  return (
    <div className="space-y-6">
      <style>
        {`
          .aquagrid-cesium .cesium-viewer,
          .aquagrid-cesium .cesium-viewer-cesiumWidgetContainer,
          .aquagrid-cesium .cesium-widget {
            height: 100%;
            width: 100%;
          }

          .aquagrid-cesium .cesium-widget-credits {
            font-size: 10px;
          }
        `}
      </style>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Globe2 className="h-4 w-4" />
            Franklin Electric Cesium digital twin
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Connected Pump Earth</h1>
          <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-400">
            A real geospatial twin for Franklin Electric pumps, motors, drives, and controllers, linking every connected asset to telemetry, physics verification, risk, service, and product feedback.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            CesiumJS globe
          </span>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            WGS84 asset positions
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <MetricCard
          label="Connected assets"
          value={formatAssets(fleetSummary.connectedAssets)}
          subtext={`${formatAssets(fleetSummary.onlineAssets)} assets currently online`}
          icon={Radio}
        />
        <MetricCard
          label="Fleet health"
          value={`${fleetSummary.averageHealth}%`}
          subtext="Composite physics, energy, and service confidence"
          icon={ShieldCheck}
        />
        <MetricCard
          label="Sites on watch"
          value={`${fleetSummary.watchSites}`}
          subtext="Regions requiring service or operating review"
          icon={AlertTriangle}
        />
        <MetricCard
          label="Action engine"
          value="24/7"
          subtext="Routes anomalies to service, spares, warranty, and product teams"
          icon={Activity}
        />
      </div>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="relative min-h-[620px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
          <div ref={cesiumContainerRef} className="aquagrid-cesium absolute inset-0" />

          <div className="pointer-events-none absolute left-4 top-4 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-white shadow-xl backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-300">Cesium geospatial layer</p>
            <p className="mt-2 max-w-sm text-sm text-slate-300">
              Drag, zoom, and tilt the Earth. Click a pump node or choose a fleet node to fly to the regional twin.
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid gap-3 rounded-xl border border-white/10 bg-slate-950/75 p-4 text-white backdrop-blur md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Data feed</p>
              <p className="mt-1 text-sm font-semibold">Controller telemetry, service history, factory curves</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Twin reasoning</p>
              <p className="mt-1 text-sm font-semibold">Physics match, energy drift, fault prediction</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Action</p>
              <p className="mt-1 text-sm font-semibold">Technician, parts, warranty, product feedback</p>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Selected twin node</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{selectedSite.name}</h2>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="h-4 w-4" />
                {selectedSite.country} - {selectedSite.region}
              </p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${RISK_STYLES[selectedSite.risk]}`}>
              {selectedSite.risk}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">Connected</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatAssets(selectedSite.connectedAssets)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">Online</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatAssets(selectedSite.onlineAssets)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">Health</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{selectedSite.healthScore}%</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">Efficiency</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{selectedSite.efficiency}%</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Physics confidence</span>
                <span>{selectedSite.healthScore}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${selectedSite.healthScore}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Energy efficiency</span>
                <span>{selectedSite.efficiency}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${selectedSite.efficiency}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <Cpu className="mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Primary model</p>
                <p className="text-slate-500 dark:text-slate-400">{selectedSite.primaryModel}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <Zap className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Energy intensity</p>
                <p className="text-slate-500 dark:text-slate-400">{selectedSite.energyIntensity} kWh per m3 moved</p>
              </div>
            </div>
            {selectedSite.activeFault === 'No systemic fault' ? (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 dark:border-emerald-900/50 dark:bg-emerald-900/10">
                <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-300">System Healthy</p>
                  <p className="text-emerald-700/80 dark:text-emerald-400/80">No active anomalies detected.</p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-3 dark:border-rose-900/50 dark:bg-rose-900/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-rose-600 dark:text-rose-400" />
                  <div>
                    <p className="font-semibold text-rose-900 dark:text-rose-300">{selectedSite.activeFault}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-rose-700/80 dark:text-rose-400/80">Recommended SRE Action</p>
                    <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-rose-100 px-3 py-2 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-200 dark:bg-rose-900/50 dark:text-rose-300 dark:hover:bg-rose-800/80">
                      <PlayCircle className="h-4 w-4" />
                      Dispatch: {selectedSite.nextAction}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Fleet nodes</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Click a site to fly the Cesium camera to its regional twin.</p>
          <div className="mt-4 max-h-[440px] space-y-2 overflow-y-auto pr-1">
            {WORLD_PUMP_SITES.map((site) => (
              <button
                key={site.id}
                onClick={() => setSelectedSiteId(site.id)}
                className={`w-full rounded-xl border p-3 text-left transition ${
                  selectedSiteId === site.id
                    ? 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/30 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{site.name}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{site.country} - {formatAssets(site.connectedAssets)} assets</p>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${RISK_STYLES[site.risk]}`}>
                    {site.risk}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-[520px]">
          <DigitalTwinLab />
        </div>
      </section>
    </div>
  )
}

export default WorldPumpTwin
