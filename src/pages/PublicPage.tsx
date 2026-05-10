import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Droplets, Map, Activity,
  Menu, X, ChevronRight, AlertTriangle,
  TrendingUp, TrendingDown, CloudRain,
  Filter, Navigation, ShieldCheck, Phone,
  Sparkles, Globe, Zap, Mic, Sprout,
  Users, Truck, Camera, Languages, Factory,
  Landmark, BookOpen, Scale, Recycle, Coins,
  Layers, Radio, Anchor, LifeBuoy, Share2, Maximize2,
  Thermometer, Wind, Cpu, Settings, Wrench, Battery,
  Server, Signal, Wifi, BarChart3, Lock, ToggleLeft, ToggleRight,
  Scan, Wallet, FileText, Siren, Play, Video, CheckCircle,
  ClipboardCheck, Mail, PieChart, ArrowUpRight, Database,
  FileBadge, ShieldAlert, BadgeCheck, Download, Banknote
} from 'lucide-react';

// --- CONFIGURATION & MOCK DATA ---

const TRANSLATIONS = {
  en: {
    hero_public: "AquaGrid Global.",
    subhero_public: "The API for Earth's Water Infrastructure.",
    tabs: {
      enterprise: "Enterprise Risk", agriscale: "Agri-Scale", waas: "Water-as-a-Service",
    },
  },
  es: {
    hero_public: "AquaGrid Global.",
    subhero_public: "La API para la Infraestructura Hídrica de la Tierra.",
    tabs: { enterprise: "Riesgo Empresarial", agriscale: "Escala Agrícola", waas: "Agua como Servicio" }
  },
  zh: {
    hero_public: "AquaGrid 全球",
    subhero_public: "地球水基础设施 API。",
    tabs: { enterprise: "企业风险", agriscale: "农业规模", waas: "水务即服务" }
  }
} as const;

const FE_PRODUCTS = [
  { name: "FPS 4400 Series", type: "Submersible", fit: "Ideal for 400ft Depth" },
  { name: "SubDrive Connect Plus", type: "Smart Controller", fit: "Telemetry Enabled" },
  { name: "Fhoton™ SolarPak", type: "Solar Drive", fit: "Zero Grid Dependency" }
];

const WAAS_CONTRACTS = [
  { entity: "Texas Groundwater Ops", uptime: "99.99%", amount: "4.2M L/day", status: "SLA Met" },
  { entity: "Rhine Industrial Fleet", uptime: "99.95%", amount: "8.5M L/day", status: "SLA Met" },
];

const WATER_MARKET = [
  { entity: "California Agri-Corp", action: "Autopilot Savings", amount: "+$45,000", type: "earn" },
  { entity: "Global Desalination Inc", action: "Predictive Maintenance", amount: "-$12,000", type: "spend" },
  { entity: "Sao Paulo Muni.", action: "Leakage Prevention", amount: "+$85,000", type: "earn" },
];

// --- REUSABLE UI COMPONENTS ---

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  dark?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", onClick, dark = false }) => (
  <div
    onClick={onClick}
    className={`${dark ? 'bg-slate-900/60 border-slate-700' : 'bg-white/60 border-white/50'} backdrop-blur-2xl border shadow-[0_8px_32px_rgba(31,38,135,0.07)] rounded-3xl p-6 transition-all duration-500 hover:bg-white/80 hover:shadow-[0_16px_48px_rgba(31,38,135,0.15)] hover:-translate-y-1 ${className}`}
  >
    {children}
  </div>
);

interface BadgeProps {
  children: React.ReactNode;
  color?: "blue" | "green" | "red" | "orange" | "dark";
}

const Badge: React.FC<BadgeProps> = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-red-50 text-red-700 border-red-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    dark: "bg-slate-800 text-slate-300 border-slate-700"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color]}`}>
      {children}
    </span>
  );
};

const PublicPage: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'es' | 'zh'>('en');
  const [activeTab, setActiveTab] = useState<'enterprise' | 'agriscale' | 'waas'>('enterprise');
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-cyan-200 overflow-x-hidden pb-32 relative">

      {/* AURORA BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] bg-sky-200/50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-teal-200/40"></div>
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
      </div>

      {/* HEADER */}
      <nav className="fixed top-0 w-full z-40 px-4 md:px-8 py-4 flex justify-between items-center bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Droplets size={22} className="text-white fill-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight block leading-none text-slate-900">Aqua<span className="text-blue-600">Grid</span></span>
            <span className="text-[10px] text-slate-500 tracking-wider font-mono uppercase flex items-center gap-1">
              Global OS <span className="hidden sm:inline">| Powered by <span className="text-blue-600 font-bold">Franklin Electric</span></span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
            {(['en', 'es', 'zh'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${lang === l ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <Link
            to="/login"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Access Platform
          </Link>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28">

        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
           <div>
             <Badge color="blue">Global Intelligence Network</Badge>
             <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 mt-4 text-slate-900">{t.hero_public}</h1>
             <p className="text-slate-600 text-xl font-light max-w-3xl leading-relaxed">{t.subhero_public}</p>
             <div className="mt-8 flex flex-wrap gap-3">
               <Link
                 to="/global-twin"
                 className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
               >
                 <Globe size={20} />
                 Enter Global Digital Twin
               </Link>
               <Link
                 to="/login"
                 className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-4 text-sm font-bold text-slate-700 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-slate-900"
               >
                 SRE Operator Sign In
               </Link>
               <Link
                 to="/business-case"
                 className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/80 px-6 py-4 text-sm font-bold text-blue-700 shadow-sm backdrop-blur transition-colors hover:bg-blue-100 hover:text-blue-900"
               >
                 <FileText size={20} />
                 Read the Business Case
               </Link>
             </div>
           </div>
        </div>

        {/* --- PUBLIC PORTAL --- */}
        <div className="space-y-8 animate-fade-in-up mt-16">
          {activeTab === 'enterprise' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3 bg-slate-900 rounded-[2rem] relative overflow-hidden group shadow-2xl h-[500px]">
                 <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" alt="Global Map"/>
                 <div className="absolute top-6 left-6 flex gap-2">
                   <div className="bg-slate-900/80 backdrop-blur-xl px-4 py-2 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2">
                     <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                     <span className="text-xs font-bold text-white">Global Fleet: 99.99% Uptime</span>
                   </div>
                 </div>
                 <div className="absolute bottom-6 left-6 right-6">
                   <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-700 flex justify-between items-center">
                     <div>
                       <h3 className="text-xl font-bold text-white">Ganges Basin Aquifer</h3>
                       <p className="text-sm text-slate-400">Groundwater Risk: Optimal</p>
                     </div>
                     <div className="flex gap-6 text-center">
                       <div>
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Storage Anomaly</p>
                         <p className="text-xl font-bold text-emerald-400">+12.4 cm</p>
                       </div>
                       <div>
                         <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Assets</p>
                         <p className="text-xl font-bold text-white">142,840</p>
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
              <div className="flex flex-col gap-6">
                 <GlassCard className="flex-1 !bg-rose-50/50 !border-rose-100">
                   <div className="flex items-center gap-3 mb-3">
                     <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                       <AlertTriangle size={20}/>
                     </div>
                     <h3 className="font-bold text-slate-900">SRE Exception</h3>
                   </div>
                   <p className="text-sm text-slate-600 mb-4 leading-relaxed">Bearing vibration detected in Texas facility. Autopilot has rerouted flow.</p>
                   <Link to="/login" className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1">
                     Dispatch Predictive Maintenance <ArrowUpRight size={14} />
                   </Link>
                 </GlassCard>
                 <GlassCard className="flex-1">
                   <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <Activity size={18} className="text-blue-500" />
                     Network Pulse
                   </h3>
                   <div className="space-y-3">
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-slate-500">Telemetry Processed</span>
                       <span className="font-bold text-slate-900">1.2B points/hr</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-slate-500">Physics Matches</span>
                       <span className="font-bold text-emerald-600">98.4%</span>
                     </div>
                   </div>
                 </GlassCard>
              </div>
            </div>
          )}

          {/* AGRI-SCALE TAB */}
          {activeTab === 'agriscale' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <GlassCard className="!bg-gradient-to-br !from-emerald-50 !to-white border-emerald-100">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                     <Sprout size={24}/>
                   </div>
                   <h3 className="font-bold text-lg text-slate-900">Autopilot Irrigation</h3>
                 </div>
                 <p className="text-3xl font-bold text-slate-900 mb-2 tracking-tighter">Zero-Touch</p>
                 <p className="text-sm text-slate-600 mb-4">Pumps run based on ECMWF weather data and grid pricing.</p>
                 <span className="text-xs text-emerald-700 font-bold bg-emerald-100/50 border border-emerald-200 px-3 py-1.5 rounded-lg inline-flex items-center gap-2">
                   <CloudRain size={14} /> 12mm Rain Expected: Paused
                 </span>
               </GlassCard>
               <GlassCard className="col-span-2">
                 <h3 className="font-bold text-slate-400 uppercase text-xs mb-6 tracking-widest flex items-center gap-2">
                   <Server size={14} /> Infrastructure Layer
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {FE_PRODUCTS.map((prod, i) => (
                     <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group">
                       <p className="text-blue-600 text-[10px] font-bold mb-2 uppercase tracking-wide">{prod.type}</p>
                       <p className="font-bold text-slate-900 text-sm mb-2 group-hover:text-blue-700">{prod.name}</p>
                       <p className="text-xs text-slate-500">{prod.fit}</p>
                     </div>
                   ))}
                 </div>
               </GlassCard>
            </div>
          )}

          {/* WAAS & FINTECH */}
          {activeTab === 'waas' && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* SLA Hub */}
                <GlassCard className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-indigo-100 rounded-xl text-indigo-700">
                        <FileBadge size={24}/>
                      </div>
                      <h3 className="font-bold text-slate-900">SLA Obligations</h3>
                   </div>
                   <p className="text-xs text-slate-500 mb-4">Real-time Water-as-a-Service tracking.</p>
                   <div className="space-y-3">
                      {WAAS_CONTRACTS.map((contract, i) => (
                         <div key={i} className="flex justify-between items-center p-3 bg-white/80 rounded-lg border border-indigo-200 shadow-sm">
                            <div>
                               <p className="font-bold text-slate-900 text-sm">{contract.entity}</p>
                               <p className="text-[10px] text-slate-500">Vol: {contract.amount} | Uptime: {contract.uptime}</p>
                            </div>
                            <span className="flex items-center text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-1 rounded">
                              <CheckCircle size={10} className="mr-1" /> {contract.status}
                            </span>
                         </div>
                      ))}
                   </div>
                </GlassCard>

                {/* Ledger & Exchange */}
                <div className="col-span-2 grid grid-cols-2 gap-6">
                   <GlassCard className="bg-gradient-to-br from-cyan-50 to-white border-cyan-100 flex flex-col justify-center text-center">
                      <div className="mx-auto p-4 bg-cyan-100 rounded-full text-cyan-600 mb-4">
                        <Lock size={32}/>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Immutable Ledger</h3>
                      <p className="text-sm text-slate-500 mt-2 max-w-[200px] mx-auto">All autonomous decisions and ESG metrics are cryptographically verified.</p>
                      <button className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                        <Download size={16} /> Export ESG Report
                      </button>
                   </GlassCard>
                   <GlassCard>
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <TrendingUp size={18} className="text-blue-500" /> System Value
                      </h3>
                      <div className="space-y-3">
                         {WATER_MARKET.map((deal, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-white border border-slate-100 shadow-sm rounded-lg">
                               <div className="flex items-center gap-3">
                                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${deal.type === 'earn' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                    {deal.type === 'earn' ? <TrendingUp size={14}/> : <Wrench size={14}/>}
                                  </div>
                                  <div>
                                    <p className="font-bold text-xs text-slate-900">{deal.entity}</p>
                                    <p className="text-[10px] text-slate-500">{deal.action}</p>
                                  </div>
                               </div>
                               <p className={`font-bold text-sm ${deal.type === 'earn' ? 'text-emerald-600' : 'text-rose-600'}`}>{deal.amount}</p>
                            </div>
                         ))}
                      </div>
                   </GlassCard>
                </div>
             </div>
          )}
        </div>

      </main>

      {/* --- FLOATING NAVIGATION PILL --- */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-4">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/60 p-2 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-x-auto no-scrollbar flex justify-center">
          <div className="flex gap-1">
            {(['enterprise', 'agriscale', 'waas'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.tabs[tab]}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default PublicPage;
