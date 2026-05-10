import React from 'react'
import { FileText, ShieldCheck, Activity, Leaf, Lock, CheckCircle, Download, FileCheck } from 'lucide-react'

const AuditLedger = [
  { id: '0x8f2a', timestamp: '2026-05-09 14:22:01', entity: 'AquaGrid Autopilot', event: 'Pump Scheduled (Off-Peak)', status: 'verified', hash: 'e3b0c44298fc' },
  { id: '0x8f29', timestamp: '2026-05-09 09:15:43', entity: 'Anomaly Engine', event: 'OTA Firmware v2.1.4 Deployed', status: 'verified', hash: '8d969eef6ecad' },
  { id: '0x8f28', timestamp: '2026-05-08 22:00:15', entity: 'Grid Operator', event: 'Manual Override: Flow Increased', status: 'verified', hash: 'b1a2c3d4e5f6' },
  { id: '0x8f27', timestamp: '2026-05-08 18:45:00', entity: 'Weather Hook', event: 'Irrigation Paused (Rain Event)', status: 'verified', hash: 'c5d6e7f8a9b0' },
  { id: '0x8f26', timestamp: '2026-05-07 11:30:22', entity: 'System', event: 'Daily Groundwater Compliance Check', status: 'verified', hash: 'f1e2d3c4b5a6' },
]

const CompliancePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-sm mb-1">
            <ShieldCheck className="w-4 h-4" />
            Audit & Compliance
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Water-as-a-Service (WaaS) & ESG</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Verifiable SLA tracking, automated environmental reporting, and immutable ledger events for regulatory compliance.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          <Download className="w-4 h-4" />
          Export ESG Report
        </button>
      </div>

      {/* WaaS SLA Dashboard */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Enterprise SLA Performance (30 Days)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Fleet Uptime</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">99.994%</span>
              <span className="text-xs text-emerald-500 font-medium">Guaranteed: 99.9%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Volume Delivered vs Contracted</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">4.2B L</span>
              <span className="text-xs text-emerald-500 font-medium">102% of SLA</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm flex flex-col justify-center border-l-4 border-l-indigo-500">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Smart Contract Validated</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">All WaaS obligations met. Auto-billing executed for current cycle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESG Metrics */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-500" />
          Environmental, Social, & Governance (ESG)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">Carbon Offset via Autopilot</p>
              <p className="text-xs text-emerald-600/80 dark:text-emerald-500/80 mt-1">Energy saved by off-peak and weather-aware scheduling</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">1,240 Tons</p>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mt-1 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded inline-block bg-white dark:bg-slate-900">YTD Verified</p>
            </div>
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-200 dark:border-cyan-800/50 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-800 dark:text-cyan-400">Aquifer Protection</p>
              <p className="text-xs text-cyan-600/80 dark:text-cyan-500/80 mt-1">Pumping halted dynamically to prevent basin depletion</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">18.4M Liters</p>
              <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mt-1 border border-cyan-200 dark:border-cyan-800 px-2 py-0.5 rounded inline-block bg-white dark:bg-slate-900">Conserved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Immutable Ledger */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-500" />
            Immutable System Ledger
          </h2>
          <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded border border-emerald-100 dark:border-emerald-800 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Blockchain Synced
          </span>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden text-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Event ID</th>
                  <th className="px-6 py-4 font-semibold">Timestamp</th>
                  <th className="px-6 py-4 font-semibold">Initiator</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                  <th className="px-6 py-4 font-semibold">Verification Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {AuditLedger.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">{row.id}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.timestamp}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{row.entity}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{row.event}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded">
                        {row.hash}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CompliancePage