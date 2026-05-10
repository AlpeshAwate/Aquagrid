import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Battery, Wrench, ShieldCheck, Activity, AlertTriangle, ArrowRight, Home as HomeIcon, CircleDollarSign, CloudRain } from 'lucide-react'

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* The "Home Water Loop" 2D Visualization */}
        <div className="lg:col-span-2 bg-gradient-to-b from-sky-50 to-sky-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-sky-200 dark:border-slate-700 shadow-sm overflow-hidden relative min-h-[320px]">
          
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-sky-700 dark:text-sky-300 shadow-sm border border-sky-200/50 dark:border-slate-700">
            <Activity className="w-4 h-4" />
            Live System Status
          </div>

          {/* Simple Animated 2D Diagram */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
            {/* House / Tank */}
            <div className="w-32 h-24 bg-white dark:bg-slate-700 rounded-t-xl border-t-4 border-slate-300 dark:border-slate-600 relative flex items-center justify-center shadow-lg z-10">
              <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-wider">Pressure Tank</span>
            </div>
            
            {/* Pipe */}
            <div className="w-4 h-32 bg-sky-300 dark:bg-sky-800 relative z-0">
               {pumpSpin && (
                 <div className="absolute inset-0 bg-sky-400 dark:bg-sky-600 animate-pulse"></div>
               )}
            </div>

            {/* Well & Pump */}
            <div className="relative">
              <div className="w-16 h-24 bg-slate-800 dark:bg-slate-950 rounded-b-xl border-x-4 border-b-4 border-slate-600 dark:border-slate-800 flex flex-col items-center justify-center p-2 z-10">
                <div className={`w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ${pumpSpin ? 'animate-spin' : ''}`}>
                   <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-[10px] mt-2 font-bold uppercase tracking-wider text-center leading-tight">SubDrive<br/>Connect</span>
              </div>
              <div className="absolute -inset-8 bg-sky-200/50 dark:bg-sky-900/20 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur p-3 rounded-xl border border-sky-100 dark:border-slate-700 shadow-sm text-right">
             <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Current Flow</p>
             <p className="text-xl font-bold text-sky-600 dark:text-sky-400">{pumpSpin ? '12.4' : '0.0'} <span className="text-sm">GPM</span></p>
          </div>
        </div>

        {/* Connected Ecosystem */}
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 flex-1 relative overflow-hidden">
             <div className="absolute top-0 inset-x-0 h-1 bg-blue-500"></div>
             <h3 className="font-bold text-slate-900 dark:text-white mb-4">Connected Ecosystem</h3>
             
             <div className="space-y-3">
               <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                 <div>
                   <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">FPS Series V</p>
                   <p className="text-sm font-semibold text-slate-900 dark:text-white">Well Pump</p>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">88% Health</p>
                   <p className="text-[10px] text-slate-500">Est. 6.5 Yrs Left</p>
                 </div>
               </div>

               <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                 <div>
                   <p className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">SubDrive Connect</p>
                   <p className="text-sm font-semibold text-slate-900 dark:text-white">Smart Controller</p>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Online</p>
                 </div>
               </div>

               <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                 <div>
                   <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Little Giant</p>
                   <p className="text-sm font-semibold text-slate-900 dark:text-white">Basement Sump Pump</p>
                 </div>
                 <p className="text-xs font-bold text-slate-500">Standby</p>
               </div>

               <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800/30">
                 <div>
                   <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">Puronics</p>
                   <p className="text-sm font-semibold text-slate-900 dark:text-white">Water Softener</p>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-amber-600 dark:text-amber-500">20% Salt</p>
                   <p className="text-[10px] text-amber-700/70 dark:text-amber-400/70">Refill soon</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

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