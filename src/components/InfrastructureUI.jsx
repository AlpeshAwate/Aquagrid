// AQUAGRID - CRITICAL INFRASTRUCTURE INTELLIGENCE DESIGN SYSTEM
// 5-Years-Ahead UI/UX Implementation

import React from 'react';

// INFRASTRUCTURE SHELL (Always Visible)
export const InfrastructureShell = ({ children }) => (
  <div className="min-h-screen bg-slate-900 text-slate-100 font-mono">
    {/* Top Utility Bar - Never Changes */}
    <header className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JS</span>
            </div>
            <span className="text-lg font-medium tracking-tight">AQUAGRID</span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            NATIONAL WATER INTELLIGENCE
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-400">SYSTEM TIME</span>
          <span className="font-mono">2024-12-19 14:23:45 IST</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-slate-300">OPERATIONAL</span>
        </div>
      </div>
    </header>

    <div className="flex pt-16">
      {/* Primary Navigation - The Spine */}
      <nav className="fixed left-0 top-16 bottom-0 w-64 bg-slate-900 border-r border-slate-800 overflow-y-auto">
        <div className="p-4 space-y-1">
          {[
            'Command Center',
            'Assets', 
            'Operations',
            'Verification',
            'Compliance',
            'Services',
            'Insights',
            'Reports'
          ].map(item => (
            <button key={item} className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  </div>
);

// OPERATIONAL CANVAS (Post-Dashboard Era)
export const OperationalCanvas = ({ title, confidence, children }) => (
  <div className="space-y-8">
    {/* Context Strip */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-medium text-white mb-1">{title}</h1>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>CONFIDENCE: {confidence}%</span>
          <span>LAST VERIFIED: 2 MIN AGO</span>
          <span>DATA SOURCES: 12 ACTIVE</span>
        </div>
      </div>
    </div>
    
    {/* Canvas Content */}
    <div className="grid grid-cols-12 gap-6 min-h-[600px]">
      {children}
    </div>
  </div>
);

// TRUST SIGNAL CARD (Infrastructure-Grade)
export const TrustCard = ({ title, value, unit, status, confidence, trend, children }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-200">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">{title}</h3>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          status === 'optimal' ? 'bg-green-500' :
          status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
        }`}></div>
        <span className="text-xs text-slate-400">{confidence}%</span>
      </div>
    </div>

    {/* Primary Value */}
    <div className="mb-4">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-light text-white">{value}</span>
        <span className="text-sm text-slate-400">{unit}</span>
        {trend && (
          <span className={`text-xs px-2 py-1 rounded ${
            trend > 0 ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </div>

    {/* Additional Content */}
    {children}

    {/* Trust Footer */}
    <div className="pt-4 border-t border-slate-700 text-xs text-slate-500">
      VERIFIED • AUDIT-GRADE • FRANKLIN CERTIFIED
    </div>
  </div>
);

// BEHAVIOR LINE (Beyond Charts)
export const BehaviorLine = ({ expected, actual, label }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-xs text-slate-400">
      <span>{label}</span>
      <span>EXPECTED VS ACTUAL</span>
    </div>
    
    {/* Expected Envelope */}
    <div className="relative h-16 bg-slate-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-700/50 to-slate-600/50"></div>
      
      {/* Actual Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
           style={{ width: `${actual}%` }}></div>
      
      {/* Confidence Band */}
      <div className="absolute bottom-0 left-0 h-4 bg-cyan-500/20 rounded-r"
           style={{ width: `${expected}%` }}></div>
    </div>
    
    <div className="flex justify-between text-xs">
      <span className="text-slate-500">Within Expected Range</span>
      <span className="text-cyan-400 font-mono">{actual}%</span>
    </div>
  </div>
);

// ALERT SURFACE (Events, Not Notifications)
export const AlertSurface = ({ alerts = [] }) => (
  <div className="space-y-2">
    {alerts.map((alert, i) => (
      <div key={i} className={`p-4 rounded-lg border-l-4 ${
        alert.level === 'critical' ? 'bg-red-900/20 border-red-500' :
        alert.level === 'warning' ? 'bg-amber-900/20 border-amber-500' :
        'bg-slate-800/50 border-slate-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">{alert.title}</p>
            <p className="text-xs text-slate-400 mt-1">{alert.location} • {alert.time}</p>
          </div>
          <button className="text-xs px-3 py-1 bg-slate-700 text-slate-300 rounded hover:bg-slate-600">
            ACKNOWLEDGE
          </button>
        </div>
      </div>
    ))}
  </div>
);

// COMMAND CENTER IMPLEMENTATION
export const CommandCenter = () => (
  <InfrastructureShell>
    <OperationalCanvas title="COMMAND CENTER" confidence={98.4}>
      
      {/* Executive Status Strip */}
      <div className="col-span-12 grid grid-cols-5 gap-4 mb-8">
        <TrustCard title="Water Health" value="94.2" unit="INDEX" status="optimal" confidence={98} trend={2.1} />
        <TrustCard title="Energy Efficiency" value="87.5" unit="%" status="optimal" confidence={96} trend={1.8} />
        <TrustCard title="Compliance" value="100" unit="%" status="optimal" confidence={100} />
        <TrustCard title="Critical Alerts" value="0" unit="ACTIVE" status="optimal" confidence={100} />
        <TrustCard title="Sites Online" value="142" unit="/142" status="optimal" confidence={99} />
      </div>

      {/* National Map */}
      <div className="col-span-8 bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
        <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-4">
          NATIONAL COVERAGE
        </h3>
        <div className="h-96 bg-slate-900/50 rounded-lg flex items-center justify-center">
          <span className="text-slate-500 text-sm">INTERACTIVE MAP SURFACE</span>
        </div>
      </div>

      {/* Priority Actions */}
      <div className="col-span-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-6">
            PRIORITY ACTIONS
          </h3>
          
          <AlertSurface alerts={[
            { level: 'info', title: '3 Assets Need Attention', location: 'Texas Groundwater Ops', time: '14:20' },
            { level: 'info', title: '2 Compliance Reports Pending', location: 'California', time: '13:45' }
          ]} />
          
          <div className="mt-8 pt-6 border-t border-slate-700">
            <BehaviorLine expected={85} actual={87} label="SYSTEM PERFORMANCE" />
          </div>
        </div>
      </div>

    </OperationalCanvas>
  </InfrastructureShell>
);

// EXPORT THE SYSTEM (components only - no constants)
// Note: Components are already exported individually above