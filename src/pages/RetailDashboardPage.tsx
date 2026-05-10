import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Battery, Wrench, ShieldCheck, Activity, AlertTriangle, ArrowRight, Home as HomeIcon, CircleDollarSign, CloudRain } from 'lucide-react'
import AquaGridHome3D from '../components/AquaGridHome3D'

const RetailDashboardPage: React.FC = () => {
  const [pumpSpin, setPumpSpin] = useState(false)
  const [consumption, setConsumption] = useState(4200)
  const [cost, setCost] = useState(15.20)

  // Simulate pump activity
  useEffect(() => {
    const interval = setInterval(() => {
      setPumpSpin(prev => !prev)
      if (pumpSpin) {
        setConsumption(prev => prev + 0.5)
        setCost(prev => prev + 0.002)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [pumpSpin])

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AquaGrid Home</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2">
            <HomeIcon className="w-4 h-4" />
            1244 Willow Creek, Austin, TX
          </p>
        </div>
      </div>

      {/* Main Home Loop Vis & Battery */}
      <div className="w-full mb-8">
        <AquaGridHome3D />
      </div>

      {/* Consumption & Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Cost Tracking */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg">
              <CircleDollarSign className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">This Month's Usage</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Water Pumped</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{consumption.toLocaleString('en-US', {maximumFractionDigits: 0})} <span className="text-sm font-medium text-slate-500">gal</span></p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Energy Cost</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">${cost.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Great job!</strong> You've used 15% less water than your neighbors in Austin this week.
            </p>
          </div>
        </div>

        {/* Aquifer Intelligence */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-lg">
              <CloudRain className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Aquifer Intelligence</h2>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center shrink-0">
               <span className="font-bold text-slate-900 dark:text-white text-xs">Low</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Texas Trinity Aquifer</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Local aquifer levels dropped significantly this month. AquaGrid has automatically enabled <strong>Dry-Run Protection Mode</strong> on your pump to ensure it doesn't burn out.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Proactive Maintenance / Service */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-800 rounded-2xl border border-amber-200 dark:border-amber-700/50 shadow-sm p-6 flex flex-col justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400 rounded-xl shrink-0">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-1">FPS Series V Pump</p>
              <h2 className="text-lg font-bold text-amber-900 dark:text-amber-400 leading-tight">Minor Voltage Fluctuation Detected</h2>
              <p className="text-amber-800 dark:text-amber-300/80 text-sm mt-2">
                Replacing the $45 capacitor now will extend the life of your pump by 3 years. Prevent a $2,000 emergency replacement.
              </p>
            </div>
          </div>
          
          <Link to="/marketplace" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
            <Wrench className="w-4 h-4" />
            Schedule Authorized Service
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800 rounded-2xl border border-blue-200 dark:border-blue-700/50 shadow-sm p-6 flex flex-col justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-xl shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wider mb-1">Puronics Softener</p>
              <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400 leading-tight">Salt Level at 20%</h2>
              <p className="text-blue-800 dark:text-blue-300/80 text-sm mt-2">
                Your water treatment system is running low on salt. Order a delivery now to ensure continuous soft water for your home.
              </p>
            </div>
          </div>
          
          <Link to="/marketplace" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
            <ArrowRight className="w-4 h-4" />
            Order Salt Delivery
          </Link>
        </div>
      </div>

    </div>
  )
}

export default RetailDashboardPage