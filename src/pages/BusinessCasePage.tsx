import React from 'react'
import { Link } from 'react-router-dom'
import { Droplets, ArrowLeft, Target, Server, ShieldCheck, Zap, Globe, Cpu, Lock, Network, Banknote } from 'lucide-react'

const BusinessCasePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-200">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] bg-blue-200/50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-indigo-200/40"></div>
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-4 md:px-8 py-4 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Droplets size={22} className="text-white fill-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-none text-slate-900">Aqua<span className="text-blue-600">Grid</span></span>
              <span className="text-[10px] text-slate-500 tracking-wider font-mono uppercase">Global OS</span>
            </div>
          </Link>
        </div>
        <Link to="/" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-24">
        
        {/* Header */}
        <header className="mb-16 text-center">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold uppercase tracking-wider rounded-full text-xs mb-6 inline-block">Architecture & Strategy</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">The API for Earth's Water Infrastructure</h1>
          <p className="text-xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto">
            Historically, the water industry has operated on a hardware-centric model. AquaGrid represents a paradigm shift, transitioning the business from selling "metal impellers" to selling <strong className="font-semibold text-slate-900">Reliable Water Movement.</strong>
          </p>
        </header>

        <div className="space-y-12">
          
          {/* Executive Summary */}
          <section className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Target size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-900">1. Executive Summary</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              By treating physical pumps as edge-computing sensors, AquaGrid creates a massive, interconnected <strong>Water Intelligence Grid</strong>. This platform abstracts the complexity of hydrogeology, weather forecasting, and electrical grid pricing into a unified, autonomous operating system (OS) for global water management.
            </p>
          </section>

          {/* Business Case (WaaS) */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 px-2">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Banknote size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-900">2. The Business Case: Water-as-a-Service (WaaS)</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">A. Enterprise & Municipal WaaS</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">Customers no longer buy pumps; they subscribe to a guaranteed output (e.g., "10,000 Liters/minute at 99.99% uptime").</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-slate-700"><ShieldCheck size={16} className="text-emerald-500 mt-0.5 shrink-0"/> <strong>Revenue:</strong> Subscription-based contracts.</li>
                  <li className="flex items-start gap-2 text-slate-700"><ShieldCheck size={16} className="text-emerald-500 mt-0.5 shrink-0"/> <strong>Margin Expansion:</strong> Predictive maintenance (SRE) prevents catastrophic failures.</li>
                </ul>
              </div>

              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">B. The Agricultural Autopilot</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">For commercial agriculture, AquaGrid acts as an autonomous governor offering "Zero-Touch Irrigation."</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-slate-700"><ShieldCheck size={16} className="text-blue-500 mt-0.5 shrink-0"/> <strong>Value:</strong> Ingests crop requirements, weather forecasts, and real-time aquifer depths.</li>
                  <li className="flex items-start gap-2 text-slate-700"><ShieldCheck size={16} className="text-blue-500 mt-0.5 shrink-0"/> <strong>Revenue:</strong> SaaS subscription tiered by acreage or fleet size.</li>
                </ul>
              </div>

              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">C. Data Monetization & ESG Compliance</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">AquaGrid aggregates unparalleled telemetry on global groundwater extraction and energy usage.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-slate-700"><ShieldCheck size={16} className="text-indigo-500 mt-0.5 shrink-0"/> <strong>Governments:</strong> Subscribe to the Groundwater Risk Score and basin APIs.</li>
                  <li className="flex items-start gap-2 text-slate-700"><ShieldCheck size={16} className="text-indigo-500 mt-0.5 shrink-0"/> <strong>ESG Reporting:</strong> Immutable Ledger generates verifiable reports on carbon offsets.</li>
                </ul>
              </div>

              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">D. The Ecosystem Marketplace</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">AquaGrid becomes the central procurement and integration hub for the water industry.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-slate-700"><ShieldCheck size={16} className="text-amber-500 mt-0.5 shrink-0"/> <strong>Revenue:</strong> Transaction fees on 3rd-party auxiliary components.</li>
                  <li className="flex items-start gap-2 text-slate-700"><ShieldCheck size={16} className="text-amber-500 mt-0.5 shrink-0"/> <strong>Integration:</strong> Subscriptions for digital APIs (e.g., premium weather hooks).</li>
                </ul>
              </div>
            </div>
          </section>

          {/* System Architecture */}
          <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Server size={200} />
            </div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-slate-800 text-cyan-400 rounded-xl"><Network size={24} /></div>
              <h2 className="text-2xl font-bold">3. System Architecture</h2>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex gap-4">
                <div className="mt-1"><Globe className="text-blue-400" size={20}/></div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">A. The Frontend (Visualization & Control)</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Built on React 19, TypeScript, Vite, and TailwindCSS. It utilizes <strong>Zustand</strong> for high-frequency state management. The Global Twin relies on the <strong>CesiumJS 3D engine</strong>, rendering WGS84 coordinates, sub-surface aquifer data, and Darcy flow vectors via WebGL.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1"><Zap className="text-amber-400" size={20}/></div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">B. The Data Pipeline (Ingestion & ETL)</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">High-frequency IoT telemetry (vibration, temperature, RPM) is streamed from edge controllers via MQTT/WebSockets. External REST APIs ingest ECMWF weather forecasts, grid pricing, and satellite gravity data (GRACE-FO).</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1"><Cpu className="text-emerald-400" size={20}/></div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">C. The "Brain" (Modeling & Autonomy)</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">A physics engine compares live telemetry against factory "Head vs. Flow" curves. A Machine Learning Surrogate predicts depletion and optimizes schedules, overriding manual controls. The SRE Exception Engine monitors the fleet to dispatch autonomous maintenance commands.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1"><Lock className="text-indigo-400" size={20}/></div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">D. The Immutable Ledger</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">A cryptographically secure log records all autonomous decisions and SLA performance metrics. This guarantees trust and transparency for enterprise billing and regulatory ESG reporting.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Moat */}
          <section className="bg-gradient-to-br from-indigo-50 to-white backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-indigo-100 shadow-xl shadow-indigo-100/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl"><ShieldCheck size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-900">4. Strategic Moat</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">
              By deploying AquaGrid, the platform creates an insurmountable data moat. As more pumps are connected:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-slate-700 font-medium">
              <li>Machine learning models predicting aquifer health and mechanical failure become exponentially more accurate.</li>
              <li>The ecosystem marketplace becomes the default procurement engine for the industry.</li>
              <li>The cost of switching for an enterprise becomes prohibitive, as they would lose the entire autonomous orchestration and ESG reporting layer.</li>
            </ol>
            <div className="mt-8 p-6 bg-indigo-600 text-white rounded-2xl text-center font-medium text-lg shadow-lg">
              AquaGrid is not just a software interface for a pump; it is the nervous system for the world's most critical resource.
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

export default BusinessCasePage