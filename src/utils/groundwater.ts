import type { GroundwaterBasin } from '@/types'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export const computeGroundwaterRiskScore = (basin: GroundwaterBasin) => {
  const storageStress = clamp(Math.abs(Math.min(basin.storageAnomalyCm, 0)) / 30, 0, 1)
  const depletionStress = clamp(Math.abs(Math.min(basin.depletionRateCmYear, 0)) / 35, 0, 1)
  const rechargeDeficit = clamp((70 - basin.rechargeMm30d) / 70, 0, 1)
  const uncertaintyPenalty = clamp(1 - basin.confidence, 0, 1)

  return Math.round(
    (storageStress * 0.34 + depletionStress * 0.34 + rechargeDeficit * 0.22 + uncertaintyPenalty * 0.1) * 100,
  )
}

export const getGroundwaterRiskLabel = (score: number) => {
  if (score >= 70) return 'Critical'
  if (score >= 40) return 'Watch'
  return 'Stable'
}

export const getGroundwaterRiskClass = (score: number) => {
  if (score >= 70) return 'text-rose-600 dark:text-rose-300'
  if (score >= 40) return 'text-amber-600 dark:text-amber-300'
  return 'text-emerald-600 dark:text-emerald-300'
}

export interface GroundwaterScenarioInput {
  rainfallChangePercent: number
  pumpingChangePercent: number
  rechargeIntervention: boolean
}

export const computeGroundwaterScenario = (
  basin: GroundwaterBasin,
  scenario: GroundwaterScenarioInput,
) => {
  const baseRiskScore = computeGroundwaterRiskScore(basin)
  const rainfallRiskDelta = scenario.rainfallChangePercent * -0.22
  const pumpingRiskDelta = scenario.pumpingChangePercent * 0.28
  const rechargeRiskDelta = scenario.rechargeIntervention ? -14 : 0
  const projectedRiskScore = clamp(
    Math.round(baseRiskScore + rainfallRiskDelta + pumpingRiskDelta + rechargeRiskDelta),
    0,
    100,
  )

  const projectedStorageAnomalyCm =
    basin.storageAnomalyCm +
    scenario.rainfallChangePercent * 0.1 -
    scenario.pumpingChangePercent * 0.08 +
    (scenario.rechargeIntervention ? 2.8 : 0)

  const waterTableChangeMeters =
    scenario.pumpingChangePercent * 0.045 -
    scenario.rainfallChangePercent * 0.035 -
    (scenario.rechargeIntervention ? 1.4 : 0)

  return {
    baseRiskScore,
    projectedRiskScore,
    projectedRiskLabel: getGroundwaterRiskLabel(projectedRiskScore),
    projectedStorageAnomalyCm: Number(projectedStorageAnomalyCm.toFixed(1)),
    waterTableChangeMeters: Number(waterTableChangeMeters.toFixed(1)),
  }
}
