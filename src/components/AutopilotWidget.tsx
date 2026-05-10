import React, { useState, useEffect } from 'react'
import { CloudRain, Zap, Clock, CheckCircle, AlertTriangle, Power } from 'lucide-react'

const AutopilotWidget: React.FC = () => {
  const [isAutopilotOn, setIsAutopilotOn] = useState(false)
  const [savings, setSavings] = useState(0)

  // Simulate savings increasing over time when autopilot is on
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutopilotOn) {
      interval = setInterval(() => {
        setSavings(prev => prev + 0.12)
      }, 3000) // Increase every 3 seconds for demo effect
    }
    return () => clearInterval(interval)
  }, [isAutopilotOn])

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden relative">
      {/* Decorative background glow */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 transition-colors duration-1000 ${isAutopilotOn ? 'bg-emerald-500' : 'bg-slate-500'}`} />

      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest text-xs uppercase mb-1">
              <Zap className="w-4 h-4" />
              Smart Infrastructure
            </div>
            <h2 className="text-2xl font-bold text-white">AquaGrid Autopilot</h2>
            <p className="text-slate-400 text-sm mt-1 max-w-sm">
              Autonomous grid-aware and weather-predictive pump scheduling. Let the platform optimize for cost and aquifer health.
            </p>
          </div>
          
          <button
            onClick={() => setIsAutopilotOn(!isAutopilotOn)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              isAutopilotOn ? 'bg-emerald-500' : 'bg-slate-600'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition duration-300 ${
                isAutopilotOn ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {/* Weather Context */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-slate-300 mb-2">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold uppercase tracking-wider">Weather Logic</span>
            </div>
            {isAutopilotOn ? (
              <div>
                <p className="text-white font-medium">12mm rain expected</p>
                <p className="text-slate-400 text-xs mt-1">Irrigation schedules automatically paused for 48h.</p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Monitoring offline. Manual scheduling required.</p>
            )}
          </div>

          {/* Grid Context */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-slate-300 mb-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold uppercase tracking-wider">Grid Pricing</span>
            </div>
            {isAutopilotOn ? (
              <div>
                <p className="text-white font-medium">Off-peak shift active</p>
                <p className="text-slate-400 text-xs mt-1">Heavy pumping rescheduled to 02:00 AM window.</p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Running during peak tariffs.</p>
            )}
          </div>

          {/* Savings Outcome */}
          <div className="bg-emerald-900/20 rounded-xl p-4 border border-emerald-800/30 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">Session Savings</span>
            </div>
            {isAutopilotOn ? (
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-emerald-400">${savings.toFixed(2)}</span>
                <span className="text-emerald-500 text-xs font-medium">saved today</span>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Autopilot required to track active savings.</p>
            )}
          </div>
        </div>

        {/* Global Action Banner */}
        <div className={`mt-4 p-3 rounded-lg flex items-center justify-between text-sm transition-all ${
          isAutopilotOn 
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' 
            : 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
        }`}>
          <div className="flex items-center gap-2 font-medium">
            {isAutopilotOn ? (
              <>
                <Power className="w-4 h-4" />
                System is autonomously managing 14,202 assets across your fleet.
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4" />
                Fleet is running on manual overrides. Cost optimization disabled.
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutopilotWidget
