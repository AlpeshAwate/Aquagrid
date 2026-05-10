import React from 'react';
import { InfrastructureShell, OperationalCanvas, TrustCard, BehaviorLine, AlertSurface } from './InfrastructureUI';

// DEMO: How AquaGrid Should Look in 2030
export default function AquaGridFuture() {
  return (
    <InfrastructureShell>
      <OperationalCanvas title="ASSET INTELLIGENCE" confidence={99.2}>
        
        {/* Asset Overview */}
        <div className="col-span-12 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">PUMP STATION PS-4401</h2>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>LOCATION: DAHEJ INDUSTRIAL CLUSTER</span>
              <span>COMMISSIONED: 2019-03-15</span>
              <span>NEXT SERVICE: 45 DAYS</span>
            </div>
          </div>
        </div>

        {/* Digital Twin Visualization */}
        <div className="col-span-8 bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
              DIGITAL TWIN • LIVE TELEMETRY
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">STREAMING</span>
            </div>
          </div>
          
          {/* Twin Visualization Area */}
          <div className="h-80 bg-slate-900/50 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="w-32 h-48 bg-gradient-to-b from-slate-600 to-slate-800 rounded-2xl mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-cyan-500/10 animate-pulse rounded-2xl"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400 font-mono">
                  FE-4401-ACTIVE
                </div>
              </div>
              <p className="text-xs text-slate-500">3D ASSET MODEL • AR READY</p>
            </div>
          </div>

          {/* Performance Envelope */}
          <div className="grid grid-cols-3 gap-4">
            <BehaviorLine expected={92} actual={94} label="FLOW RATE" />
            <BehaviorLine expected={88} actual={85} label="EFFICIENCY" />
            <BehaviorLine expected={95} actual={97} label="PRESSURE HEAD" />
          </div>
        </div>

        {/* Live Metrics */}
        <div className="col-span-4 space-y-4">
          <TrustCard 
            title="Trust Score" 
            value="99.2" 
            unit="/100" 
            status="optimal" 
            confidence={99}
          >
            <div className="text-xs text-slate-400 space-y-1">
              <div>Physics Match: 98.5%</div>
              <div>Energy Correlation: 99.8%</div>
              <div>Historical Baseline: 99.3%</div>
            </div>
          </TrustCard>

          <TrustCard 
            title="Energy Consumption" 
            value="4.2" 
            unit="kWh/m³" 
            status="optimal" 
            confidence={97}
            trend={-2.3}
          >
            <div className="text-xs text-slate-400">
              15% below regional average
            </div>
          </TrustCard>

          <TrustCard 
            title="Remaining Useful Life" 
            value="8.2" 
            unit="YEARS" 
            status="optimal" 
            confidence={94}
          >
            <div className="text-xs text-slate-400">
              Based on degradation analysis
            </div>
          </TrustCard>
        </div>

        {/* Verification Panel */}
        <div className="col-span-6 bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-6">
            VERIFICATION ENGINE • CORE IP
          </h3>
          
          <div className="space-y-6">
            {/* Truth Triangle */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-light text-blue-400 mb-2">98.5%</div>
                <div className="text-xs text-slate-400">PHYSICS SIGNAL</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-light text-purple-400 mb-2">99.8%</div>
                <div className="text-xs text-slate-400">ENERGY SIGNAL</div>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <div className="text-2xl font-light text-orange-400 mb-2">99.3%</div>
                <div className="text-xs text-slate-400">BASELINE SIGNAL</div>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="text-center py-6 border-t border-slate-700">
              <div className="text-4xl font-light text-emerald-400 mb-2">99.2</div>
              <div className="text-sm text-slate-300 mb-4">COMPOSITE TRUST SCORE</div>
              <div className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/30">
                AUDIT GRADE • COURT ADMISSIBLE
              </div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="col-span-6 bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider mb-6">
            SYSTEM INTELLIGENCE
          </h3>
          
          <AlertSurface alerts={[
            { 
              level: 'info', 
              title: 'Efficiency Optimization Available', 
              location: 'Motor Speed Control', 
              time: '14:15' 
            },
            { 
              level: 'info', 
              title: 'Predictive Maintenance Window', 
              location: 'Bearing Assembly', 
              time: '13:30' 
            }
          ]} />

          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="text-xs text-slate-400 mb-3">AI INSIGHTS</div>
            <div className="space-y-2 text-sm text-slate-300">
              <p>"This deviation is unusual for monsoon season"</p>
              <p>"Similar assets typically require service at 8,500 hours"</p>
              <p>"Energy efficiency 12% above regional baseline"</p>
            </div>
          </div>
        </div>

      </OperationalCanvas>
    </InfrastructureShell>
  );
}