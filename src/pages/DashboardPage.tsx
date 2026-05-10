import React from 'react'
import { Server, Droplets, Landmark, ShieldCheck, TrendingUp, Activity } from 'lucide-react'
import AutopilotWidget from '@/components/AutopilotWidget'

const StatCard: React.FC<{
  title: string
  value: string
  subtext: string
  icon: React.ComponentType<{ className?: string }>
  trend?: string
  colorClass: string
}> = ({ title, value, subtext, icon: Icon, trend, colorClass }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
        <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500 dark:text-slate-400">{subtext}</span>
      {trend && (
        <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
          <TrendingUp className="w-4 h-4 mr-1" /> {trend}
        </span>
      )}
    </div>
  </div>
)

const DashboardPage: React.FC = () => {
  // Mock data for demo
  const stats = [
    {
      title: "Total Assets",
      value: "128,450",
      subtext: "Across 4 States",
      icon: Server,
      trend: "12% YoY",
      colorClass: "bg-blue-500"
    },
    {
      title: "Water Saved",
      value: "4.2B L",
      subtext: "Validated via Physics",
      icon: Droplets,
      trend: "8% MoM",
      colorClass: "bg-emerald-500"
    },
    {
      title: "Revenue",
      value: "$12.4M",
      subtext: "ARR from Platform",
      icon: Landmark,
      trend: "124% YoY",
      colorClass: "bg-indigo-500"
    },
    {
      title: "Trust Score",
      value: "94.2%",
      subtext: "Audit Compliance",
      icon: ShieldCheck,
      colorClass: "bg-amber-500"
    }
  ]

  const recentAlerts = [
    { id: '1', message: 'High TDS detected at Texas facility', severity: 'high' as const, time: '2 min ago' },
    { id: '2', message: 'Maintenance due for Pump #FE-4400-X9', severity: 'medium' as const, time: '1 hour ago' },
    { id: '3', message: 'New service request from California Agri-Corp', severity: 'low' as const, time: '3 hours ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Real-time overview of your water infrastructure
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Autopilot Widget (The Nest Experience) */}
      <AutopilotWidget />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Status */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Asset Status Overview</h2>
          <div className="space-y-4">
            {[
              { name: 'Texas Groundwater Ops', assets: 45000, health: 96, status: 'Stable' },
              { name: 'Rhine Industrial Fleet', assets: 32000, health: 88, status: 'Warning' },
              { name: 'California Agri-Corp', assets: 28000, health: 92, status: 'Stable' },
              { name: 'Gulf Desalination Support', assets: 23450, health: 95, status: 'Stable' },
            ].map((region, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    region.status === 'Stable' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{region.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{region.assets.toLocaleString()} assets</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{region.health}%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Health Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border border-slate-100 dark:border-slate-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'high' ? 'bg-red-500' :
                  alert.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{alert.message}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
