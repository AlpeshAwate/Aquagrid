import React from 'react'
import {
  BarChart3,
  Briefcase,
  Building2,
  Factory,
  Gauge,
  PackageCheck,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'

const revenueSignals = [
  {
    label: 'Qualified pipeline',
    value: '$18.6M',
    detail: 'Pump, motor, drive, and monitoring opportunities from at-risk basins',
    icon: TrendingUp,
  },
  {
    label: 'Service conversion',
    value: '31%',
    detail: 'Predicted faults routed to authorized service partners',
    icon: Wrench,
  },
  {
    label: 'Aftermarket pull',
    value: '$4.2M',
    detail: 'Spare parts and replacement kits forecast from telemetry',
    icon: PackageCheck,
  },
  {
    label: 'Energy savings case',
    value: '14.8%',
    detail: 'Average efficiency gain from drive and duty-cycle recommendations',
    icon: Zap,
  },
]

const opportunities = [
  {
    account: 'Texas Groundwater Ops',
    signal: 'High groundwater stress plus aging submersible fleet',
    recommendation: 'Upgrade to high-efficiency submersible package with drive controls',
    owner: 'Water Systems Sales',
    value: '$3.8M',
    stage: 'Proposal',
  },
  {
    account: 'Texas Groundwater Operations',
    signal: 'Voltage drift and pump cycling detected across 440 sites',
    recommendation: 'Bundle SubDrive Connect monitoring with service agreement',
    owner: 'Headwater Distribution',
    value: '$2.4M',
    stage: 'Distributor review',
  },
  {
    account: 'Gauteng Mining Water Recovery',
    signal: 'Critical cavitation and dry-run risk cluster',
    recommendation: 'Priority service campaign with spare kits and uptime SLA',
    owner: 'Service Operations',
    value: '$1.7M',
    stage: 'Action required',
  },
]

const departmentImpacts = [
  {
    department: 'Sales',
    impact: 'Turns GDT risk signals into account plans, product recommendations, and renewal timing.',
    metric: 'Pipeline created',
    icon: Briefcase,
  },
  {
    department: 'Service',
    impact: 'Prioritizes technician dispatch, preventive maintenance, and spare kit staging.',
    metric: 'Downtime avoided',
    icon: Wrench,
  },
  {
    department: 'Distribution',
    impact: 'Gives Headwater and channel partners demand signals by geography and asset type.',
    metric: 'Inventory accuracy',
    icon: Building2,
  },
  {
    department: 'Engineering',
    impact: 'Feeds real-world duty cycles, failure modes, and water conditions into product design.',
    metric: 'Field insight',
    icon: Gauge,
  },
  {
    department: 'Manufacturing',
    impact: 'Improves demand planning for motors, drives, pumps, and control packages.',
    metric: 'Forecast quality',
    icon: Factory,
  },
  {
    department: 'Warranty',
    impact: 'Separates product defects from installation, voltage, dry-run, and water-quality misuse.',
    metric: 'Claim clarity',
    icon: ShieldCheck,
  },
]

const GrowthPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <BarChart3 className="h-4 w-4" />
            Franklin Electric AquaGrid Cloud
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">AquaGrid Command Center</h1>
          <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-400">
            Converts groundwater, pump telemetry, service history, and asset risk into product revenue, recurring service, channel enablement, and operational intelligence.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900/60 dark:bg-emerald-950/30">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Platform motion</p>
          <p className="mt-1 text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            Hardware + software + service + distribution
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {revenueSignals.map((signal) => (
          <div key={signal.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{signal.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{signal.value}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                <signal.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{signal.detail}</p>
          </div>
        ))}
      </div>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-slate-200 p-5 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Commercial opportunities</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              GDT and asset signals translated into revenue plays for sales, distribution, and service teams.
            </p>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {opportunities.map((opportunity) => (
              <div key={opportunity.account} className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_180px]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white">{opportunity.account}</h3>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
                      {opportunity.stage}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{opportunity.signal}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{opportunity.recommendation}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Owner</p>
                  <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{opportunity.owner}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Value</p>
                  <p className="mt-1 text-lg font-bold text-emerald-600 dark:text-emerald-300">{opportunity.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Operating model</h2>
          </div>
          <div className="mt-5 space-y-4">
            {[
              ['Signal', 'GDT, pump telemetry, energy drift, warranty, and service history'],
              ['Decision', 'Product recommendation, risk score, ROI, and service action'],
              ['Execution', 'Sales motion, distributor quote, technician dispatch, parts staging'],
              ['Learning', 'Field outcomes returned to engineering, demand planning, and warranty'],
            ].map(([label, detail]) => (
              <div key={label} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{detail}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Department value map</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {departmentImpacts.map((item) => (
            <div key={item.department} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{item.department}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.impact}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-300">{item.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default GrowthPage
