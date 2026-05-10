// Intelligence Engine and Advanced Components for AquaGrid v1.1

import React, { useState } from 'react';
import { Activity, ChevronRight, Search, Mic, ShieldCheck, Wrench, Scan, Siren } from 'lucide-react';

// --- INTELLIGENCE ENGINE (MOCK) ---

const RESPONSE_TIERS = {
  TIER_1: { id: 1, label: "Informational", color: "bg-blue-100 text-blue-700 border-blue-200" },
  TIER_2: { id: 2, label: "Analytical", color: "bg-purple-100 text-purple-700 border-purple-200" },
  TIER_3: { id: 3, label: "Advisory", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  TIER_4: { id: 4, label: "Restricted", color: "bg-red-100 text-red-700 border-red-200" },
};

const mockIntelligenceQuery = (query, role) => {
  const q = query.toLowerCase();
  
  // TIER 4: RESTRICTED (Safety/Compliance Critical)
  if (q.includes("shutdown") || q.includes("violation") || q.includes("illegal")) {
    return {
      tier: RESPONSE_TIERS.TIER_4,
      summary: "Shutdown sequence requires authorized operator override.",
      evidence: [
        "Digital Twin lock active (Safety Protocol 4.2).",
        "Regulatory audit trail initiated.",
        "Manual sign-off required from Plant Manager."
      ],
      confidence: 100,
      sources: "Firmware Lock · Regulatory Database",
      action: "Escalate to Safety Officer"
    };
  }

  // TIER 3: ADVISORY (Recommendations)
  if (q.includes("fix") || q.includes("recommend") || q.includes("optimize")) {
    return {
      tier: RESPONSE_TIERS.TIER_3,
      summary: "If efficiency degradation continues, bearing replacement is recommended within 14 days.",
      evidence: [
        "Vibration analysis (X-Axis) trending > 2.5mm/s.",
        "Energy consumption +4% vs baseline.",
        "Predictive model confidence > 90%."
      ],
      confidence: 92.5,
      sources: "Digital Twin · Historical Maintenance Logs",
      action: "Schedule Maintenance (Kit #FE-B22)"
    };
  }

  // TIER 2: ANALYTICAL (Root Cause/Trends)
  if (q.includes("why") || q.includes("risk") || q.includes("trend")) {
    return {
      tier: RESPONSE_TIERS.TIER_2,
      summary: "Process drift detected at Houston Textile Hub due to variable intake quality.",
      evidence: [
        "TDS discharge increased 18% over 30 days.",
        "Pump efficiency dropped from 92% to 84%.",
        "Correlation with monsoon runoff identified."
      ],
      confidence: 96.1,
      sources: "IoT Telemetry · Regional Baseline",
      action: "Inspect Pre-Filter Assembly"
    };
  }

  // TIER 1: INFORMATIONAL (Status)
  return {
    tier: RESPONSE_TIERS.TIER_1,
    summary: role === 'Director' 
      ? "National Grid is stable. 142,500 Assets online. Compliance at 94%."
      : "Asset FE-4400-X9 is running optimal. Next schedule: 18:00.",
    evidence: [
      "Real-time heartbeat received 2s ago.",
      "No critical alerts in current zone.",
      "Weather impact nominal."
    ],
    confidence: 99.9,
    sources: "Live Grid · Satellite",
    action: null
  };
};

export const AskAquaGridBar = ({ userRole = "Director" }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!query) return;
    setLoading(true);
    // Simulate network delay for authority
    setTimeout(() => {
      setResponse(mockIntelligenceQuery(query, userRole));
      setLoading(false);
    }, 600);
  };

  return (
    <div className="mb-8">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-sm px-1 py-1 flex items-center gap-2 transition-all focus-within:shadow-md focus-within:border-blue-300">
        <div className="pl-4 pr-2 text-slate-400">
          <Mic size={18} />
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          placeholder={`Ask AquaGrid (${userRole} View)... e.g. 'Why is Houston at risk?'`}
          className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400 py-3"
        />
        <button 
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition flex items-center gap-2"
        >
          {loading ? <Activity size={14} className="animate-spin"/> : <Search size={14} />}
          {loading ? 'Verifying...' : 'Analyze'}
        </button>
      </div>

      {response && (
        <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-start mb-3">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${response.tier.color}`}>
              {response.tier.label}
            </span>
            <span className={`text-xs font-bold ${response.confidence > 90 ? 'text-emerald-600' : 'text-orange-600'}`}>
              {response.confidence}% Confidence
            </span>
          </div>
          
          <p className="text-sm font-semibold text-slate-900 mb-4 leading-relaxed">
            {response.summary}
          </p>
          
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Evidence Chain</p>
            <ul className="space-y-2">
              {response.evidence.map((ev, i) => (
                <li key={i} className="flex gap-2 text-xs text-slate-600">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></div>
                  {ev}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono opacity-90 bg-slate-50 w-fit px-2 py-1 rounded-md border border-slate-100">
              <ShieldCheck size={12} className="text-emerald-600" />
              <span className="font-bold text-slate-700">Verified</span>
              <span className="text-slate-300">|</span>
              <span>Score: {response.confidence}%</span>
              <span className="text-slate-300">|</span>
              <span>Src: {response.sources}</span>
            </div>
            {response.action && (
              <button className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                {response.action} <ChevronRight size={12}/>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- DOMAIN COMPONENTS ---

export const PumpCurveViewer = () => (
  <div className="relative h-48 w-full bg-slate-900 rounded-2xl border border-slate-700 p-4 flex flex-col justify-between overflow-hidden group shadow-inner">
    <div className="flex justify-between items-start z-10">
      <div>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">FE Select™ Integration</p>
        <h4 className="text-white text-sm font-bold">Design vs. Actual</h4>
      </div>
      <span className="px-2 py-0.5 bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">Optimal Zone</span>
    </div>
    
    {/* SVG Curve Simulation */}
    <div className="absolute inset-0 flex items-end">
      <svg viewBox="0 0 100 50" className="w-full h-full opacity-60">
        <path d="M0,50 Q20,10 50,20 T100,40" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2" />
        <path d="M0,50 Q20,10 50,20 T100,40" fill="url(#grad)" opacity="0.3" />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute left-[45%] top-[40%] w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,1)]"></div>
      <div className="absolute left-[45%] top-[40%] w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-ping opacity-75"></div>
    </div>
    
    <div className="flex justify-between items-end z-10 text-[10px] text-slate-500 font-mono">
      <span>0 LPM</span>
      <span>1200 LPM</span>
    </div>
  </div>
);