import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, Calendar, CloudRain, Database, Droplets, Gauge, Layers3, Waves } from 'lucide-react'
import groundwaterService from '@/services/groundwater'
import AquaGridLogo from '../components/AquaGridLogo'
import { useDataStore } from '@/stores/dataStore'
import type { GroundwaterBasin, GroundwaterSelection, GroundwaterSnapshot } from '@/types'
import {
  computeGroundwaterScenario,
  computeGroundwaterRiskScore,
  getGroundwaterRiskClass,
  getGroundwaterRiskLabel,
} from '@/utils/groundwater'

const WorldPumpTwin = React.lazy(() => import('@/components/WorldPumpTwin'))

const GlobalTwinPage: React.FC = () => {
  const [groundwaterEnabled, setGroundwaterEnabled] = React.useState(false)
  const [groundwaterData, setGroundwaterData] = React.useState<GroundwaterSnapshot | null>(null)
  const [selectedGroundwaterFeature, setSelectedGroundwaterFeature] = React.useState<GroundwaterSelection | null>(null)
  const [scenario, setScenario] = React.useState({
    rainfallChangePercent: -10,
    pumpingChangePercent: 15,
    rechargeIntervention: false,
  })
  const [isLoadingGroundwater, setIsLoadingGroundwater] = React.useState(false)
  const {
    groundwaterLayers,
    temporalState,
    toggleGroundwaterLayer,
    setTemporalState,
    setWellSensorData,
  } = useDataStore()

  React.useEffect(() => {
    let isMounted = true

    const loadGroundwaterSnapshot = async () => {
      setIsLoadingGroundwater(true)
      try {
        const snapshot = await groundwaterService.getAquiferDepthSnapshot('high-plains')
        if (!isMounted) return
        setGroundwaterData(snapshot)
        setWellSensorData(snapshot.wells)
        setSelectedGroundwaterFeature({ type: 'basin', basin: snapshot.basins[0] })
      } finally {
        if (isMounted) {
          setIsLoadingGroundwater(false)
        }
      }
    }

    loadGroundwaterSnapshot()

    return () => {
      isMounted = false
    }
  }, [setWellSensorData])

  const activeGroundwaterLayerIds = React.useMemo(
    () => groundwaterLayers.filter((layer) => layer.visible).map((layer) => layer.id),
    [groundwaterLayers],
  )

  const primaryBasin = groundwaterData?.basins[0]
  const primaryRiskScore = primaryBasin ? computeGroundwaterRiskScore(primaryBasin) : null
  const selectedBasinForScenario: GroundwaterBasin | null =
    selectedGroundwaterFeature?.type === 'basin'
      ? selectedGroundwaterFeature.basin
      : primaryBasin ?? null
  const scenarioProjection = selectedBasinForScenario
    ? computeGroundwaterScenario(selectedBasinForScenario, scenario)
    : null

  const selectedDetail = React.useMemo(() => {
    if (!selectedGroundwaterFeature) {
      return null
    }

    if (selectedGroundwaterFeature.type === 'basin') {
      const { basin } = selectedGroundwaterFeature
      const riskScore = computeGroundwaterRiskScore(basin)
      return {
        eyebrow: 'Selected basin',
        title: basin.name,
        rows: [
          ['Country', basin.country],
          ['Risk', basin.risk],
          ['Risk score', `${riskScore}/100 ${getGroundwaterRiskLabel(riskScore)}`],
          ['Storage anomaly', `${basin.storageAnomalyCm} cm`],
          ['Depletion rate', `${basin.depletionRateCmYear} cm/year`],
          ['Recharge 30d', `${basin.rechargeMm30d} mm`],
          ['Confidence', `${Math.round(basin.confidence * 100)}%`],
        ],
      }
    }

    if (selectedGroundwaterFeature.type === 'well') {
      const { well } = selectedGroundwaterFeature
      return {
        eyebrow: 'Selected monitoring well',
        title: well.name,
        rows: [
          ['Well ID', well.id],
          ['Basin', well.basinId],
          ['Water table depth', `${well.waterTableDepthMeters.toFixed(1)} m`],
          ['Trend', well.trend],
          ['Last update', new Date(well.lastUpdated).toLocaleDateString()],
        ],
      }
    }

    const { flow } = selectedGroundwaterFeature
    return {
      eyebrow: 'Selected flow vector',
      title: flow.id,
      rows: [
        ['Velocity', `${flow.velocityMDay} m/day`],
        ['From', `${flow.from[1].toFixed(2)}, ${flow.from[0].toFixed(2)}`],
        ['To', `${flow.to[1].toFixed(2)}, ${flow.to[0].toFixed(2)}`],
      ],
    }
  }, [selectedGroundwaterFeature])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/85 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <AquaGridLogo className="w-9 h-9 drop-shadow-lg" />
            <div>
              <span className="block text-lg font-bold leading-none text-slate-900 dark:text-white">
                Aqua<span className="text-blue-600">Grid</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Global Pump Twin
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <section className="mb-6 rounded-2xl border border-cyan-200 bg-white p-5 shadow-sm dark:border-cyan-900/50 dark:bg-slate-800">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                <Waves className="h-4 w-4" />
                Groundwater Digital Twin Prototype
              </div>
              <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">High Plains aquifer layer</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Prototype layer for basin-scale groundwater storage anomaly, monitoring wells, and Darcy-flow vectors. The mock feed is shaped for the future GLDAS, GRACE, USGS, and MODFLOW/FastAPI pipeline.
              </p>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Storage anomaly</p>
                  <p className="mt-1 text-xl font-bold text-rose-600 dark:text-rose-300">
                    {primaryBasin ? `${primaryBasin.storageAnomalyCm} cm` : '--'}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Recharge 30d</p>
                  <p className="mt-1 text-xl font-bold text-cyan-700 dark:text-cyan-300">
                    {primaryBasin ? `${primaryBasin.rechargeMm30d} mm` : '--'}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Risk score</p>
                  <p className={`mt-1 text-xl font-bold ${primaryRiskScore === null ? 'text-slate-900 dark:text-white' : getGroundwaterRiskClass(primaryRiskScore)}`}>
                    {primaryRiskScore === null ? '--' : `${primaryRiskScore}/100`}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {primaryRiskScore === null ? 'Awaiting basin feed' : getGroundwaterRiskLabel(primaryRiskScore)}
                  </p>
                </div>
              </div>

              {selectedDetail && (
                <div className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/20">
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                    {selectedDetail.eyebrow}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{selectedDetail.title}</h2>
                  <div className="mt-3 grid gap-2 md:grid-cols-3">
                    {selectedDetail.rows.map(([label, value]) => (
                      <div key={label} className="rounded-lg bg-white px-3 py-2 dark:bg-slate-900/60">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {scenarioProjection && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/40">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Scenario projection
                      </p>
                      <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        {selectedBasinForScenario?.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getGroundwaterRiskClass(scenarioProjection.projectedRiskScore)}`}>
                        {scenarioProjection.projectedRiskScore}/100
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {scenarioProjection.projectedRiskLabel}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 md:grid-cols-3">
                    <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Base risk
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        {scenarioProjection.baseRiskScore}/100
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Storage anomaly
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        {scenarioProjection.projectedStorageAnomalyCm} cm
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Water table
                      </p>
                      <p className={`mt-1 text-sm font-bold ${
                        scenarioProjection.waterTableChangeMeters > 0
                          ? 'text-rose-600 dark:text-rose-300'
                          : 'text-emerald-600 dark:text-emerald-300'
                      }`}>
                        {scenarioProjection.waterTableChangeMeters > 0 ? '+' : ''}
                        {scenarioProjection.waterTableChangeMeters} m
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Layers3 className="h-5 w-5 text-cyan-700 dark:text-cyan-300" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Groundwater layer</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {isLoadingGroundwater ? 'Loading mock aquifer feed' : groundwaterData?.source ?? 'Mock aquifer feed'}
                      </p>
                    </div>
                  </div>
                <button
                  type="button"
                  onClick={() => setGroundwaterEnabled((enabled) => !enabled)}
                  className={`h-8 w-14 rounded-full p-1 transition ${
                    groundwaterEnabled ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-pressed={groundwaterEnabled}
                  aria-label="Toggle groundwater layer"
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white transition ${
                      groundwaterEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {groundwaterLayers.map((layer) => (
                  <label
                    key={layer.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                  >
                    <span>
                      <span className="block font-semibold text-slate-900 dark:text-white">{layer.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {layer.depthRangeMeters[0]}-{layer.depthRangeMeters[1]} m
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={layer.visible}
                      onChange={() => toggleGroundwaterLayer(layer.id)}
                      className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                    />
                  </label>
                ))}
                </div>

                {groundwaterData?.sources?.length ? (
                  <div className="mt-4 grid gap-2">
                    {groundwaterData.sources.map((source) => (
                      <div
                        key={source.id}
                        className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{source.label}</p>
                          <p className="mt-1 text-slate-500 dark:text-slate-400">{source.detail}</p>
                        </div>
                        <span
                          className={`rounded-full px-2 py-0.5 font-bold uppercase tracking-wider ${
                            source.status === 'live'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                              : source.status === 'mock'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {source.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

              <div className="mt-4 grid grid-cols-2 gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span className="mb-1 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Timeline
                  </span>
                  <input
                    type="month"
                    value={temporalState.selectedDate}
                    onChange={(event) => setTemporalState({ selectedDate: event.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <span className="mb-1 flex items-center gap-1">
                    <Database className="h-3.5 w-3.5" />
                    Mode
                  </span>
                  <select
                    value={temporalState.mode}
                    onChange={(event) => setTemporalState({ mode: event.target.value as typeof temporalState.mode })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="historical">Historical</option>
                    <option value="nowcast">Nowcast</option>
                    <option value="forecast">Forecast</option>
                  </select>
                </label>
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Scenario simulator</p>
                </div>

                <div className="mt-4 space-y-4">
                  <label className="block">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <CloudRain className="h-3.5 w-3.5" />
                        Rainfall
                      </span>
                      <span>{scenario.rainfallChangePercent > 0 ? '+' : ''}{scenario.rainfallChangePercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="40"
                      step="5"
                      value={scenario.rainfallChangePercent}
                      onChange={(event) =>
                        setScenario((current) => ({
                          ...current,
                          rainfallChangePercent: Number(event.target.value),
                        }))
                      }
                      className="mt-2 w-full accent-cyan-600"
                    />
                  </label>

                  <label className="block">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Droplets className="h-3.5 w-3.5" />
                        Pumping
                      </span>
                      <span>{scenario.pumpingChangePercent > 0 ? '+' : ''}{scenario.pumpingChangePercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="50"
                      step="5"
                      value={scenario.pumpingChangePercent}
                      onChange={(event) =>
                        setScenario((current) => ({
                          ...current,
                          pumpingChangePercent: Number(event.target.value),
                        }))
                      }
                      className="mt-2 w-full accent-cyan-600"
                    />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                    <span>
                      <span className="block font-semibold text-slate-900 dark:text-white">Recharge intervention</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Managed aquifer recharge</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={scenario.rechargeIntervention}
                      onChange={(event) =>
                        setScenario((current) => ({
                          ...current,
                          rechargeIntervention: event.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                    />
                  </label>

                  <button 
                    onClick={() => {
                      setScenario({
                        rainfallChangePercent: 0,
                        pumpingChangePercent: -15,
                        rechargeIntervention: true
                      })
                    }}
                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
                  >
                    <Activity className="h-4 w-4" />
                    Auto-Optimize Policy for Basin Stability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <React.Suspense
          fallback={
            <div className="flex min-h-[620px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Loading Cesium groundwater twin...
            </div>
          }
        >
          <WorldPumpTwin
            groundwaterEnabled={groundwaterEnabled}
            groundwaterData={groundwaterData}
            activeGroundwaterLayerIds={activeGroundwaterLayerIds}
            onGroundwaterSelect={setSelectedGroundwaterFeature}
          />
        </React.Suspense>
      </main>
    </div>
  )
}

export default GlobalTwinPage
