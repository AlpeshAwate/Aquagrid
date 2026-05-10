import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Droplets, 
  Zap, 
  AlertTriangle, 
  FileText, 
  MapPin, 
  Settings, 
  Menu, 
  X, 
  LayoutGrid,
  BarChart3, 
  Cpu, 
  TrendingUp, 
  Server,
  Download,
  Search,
  Filter,
  Globe,
  Briefcase,
  Landmark,
  Database,
  Wrench,
  ShoppingCart,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  ScatterChart, 
  Scatter, 
  ZAxis,
  ReferenceLine
} from 'recharts';

// --- Mock Data & Generators (National Scale) ---

const NATIONAL_STATS = {
  totalAssets: 128450,
  waterSaved: "4.2B Liters",
  energySaved: "850 GWh",
  activeAlerts: 142,
  auditGradeData: "94.2%",
  saasRevenue: "$12.4M ARR"
};

const REGIONS = [
  { id: 'TX', name: 'Texas', assets: 45000, health: 96, status: 'Stable' },
  { id: 'CA', name: 'California', assets: 32000, health: 88, status: 'Warning' },
  { id: 'AZ', name: 'Arizona', assets: 28000, health: 92, status: 'Stable' },
  { id: 'FL', name: 'Florida', assets: 23450, health: 95, status: 'Stable' },
];

const MARKETPLACE_SERVICES = [
  { id: 1, provider: 'Franklin Auth. Service', type: 'Preventive Maintenance', rating: 4.8, location: 'Austin, TX', price: '₹4,500' },
  { id: 2, provider: 'EcoPump Solutions', type: 'Energy Audit', rating: 4.5, location: 'Pune, MH', price: '₹8,000' },
  { id: 3, provider: 'AgriTech Support', type: 'Sensor Calibration', rating: 4.2, location: 'Hubli, KA', price: '₹2,200' },
];

// Generate Pump Curve Data (Head vs Flow)
const generatePumpCurve = () => {
  const curve = [];
  // Standard curve for a 6" Submersible
  for (let flow = 0; flow <= 100; flow += 5) {
    // Head drops as flow increases (H = a - bQ^2)
    const head = 120 - (0.012 * Math.pow(flow, 2));
    curve.push({ flow, head, type: 'curve' });
  }
  return curve;
};

// Generate Operation Points (Simulated Telemetry)
const generateOpPoints = () => {
  const points = [];
  // Efficient operation points (cluster near the curve)
  for (let i = 0; i < 20; i++) {
    const flow = 40 + Math.random() * 40;
    const expectedHead = 120 - (0.012 * Math.pow(flow, 2));
    const actualHead = expectedHead * (0.95 + Math.random() * 0.1); // +/- 5% deviation
    points.push({ flow, head: actualHead, type: 'actual', efficiency: 85 + Math.random() * 10 });
  }
  // Anomaly point (off curve)
  points.push({ flow: 90, head: 20, type: 'anomaly', efficiency: 15 });
  return points;
};

// --- Components ---

const StatCard = ({ title, value, subtext, icon: Icon, trend, colorClass }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
      </div>
      <div className={`p-2.5 rounded-lg ${colorClass} bg-opacity-10`}>
        <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
    </div>
    <div className="flex items-center justify-between text-xs">
      <span className="text-slate-500">{subtext}</span>
      {trend && (
        <span className="flex items-center text-emerald-600 font-medium">
          <TrendingUp className="w-3 h-3 mr-1" /> {trend}
        </span>
      )}
    </div>
  </div>
);

const IntegrationBadge = ({ name, status, type }) => {
  const statusConfig = {
    'Active': { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
    'Syncing': { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Activity },
    'Pending': { color: 'bg-slate-100 text-slate-600 border-slate-200', icon: Lock },
  };
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${type === 'Govt' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'}`}>
          {type === 'Govt' ? <Landmark className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">{name}</p>
          <p className="text-xs text-slate-500">{type} Integration</p>
        </div>
      </div>
      <span className={`flex items-center px-2 py-1 rounded text-xs font-medium border ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    </div>
  );
};

const DigitalTwinLab = () => {
  const curveData = generatePumpCurve();
  const opPoints = generateOpPoints();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            Digital Twin Physics Lab
          </h3>
          <p className="text-sm text-slate-500">Real-time H-Q (Head vs Flow) Verification against Factory "Birth Certificate"</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <span className="flex items-center text-slate-400"><div className="w-3 h-1 bg-slate-400 mr-2"></div> Factory Curve</span>
          <span className="flex items-center text-emerald-500"><div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div> Verified Op Point</span>
          <span className="flex items-center text-rose-500"><div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div> Anomaly Detected</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" dataKey="flow" name="Flow" unit=" LPM" label={{ value: 'Flow Rate (LPM)', position: 'bottom', offset: 0, fill: '#64748b', fontSize: 12 }} />
            <YAxis type="number" dataKey="head" name="Head" unit=" m" label={{ value: 'Total Dynamic Head (m)', angle: -90, position: 'left', fill: '#64748b', fontSize: 12 }} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-slate-800 text-white text-xs p-2 rounded shadow-xl">
                    <p className="font-bold mb-1">{data.type === 'actual' ? 'Live Telemetry' : 'Factory Spec'}</p>
                    <p>Flow: {data.flow.toFixed(1)} LPM</p>
                    <p>Head: {data.head.toFixed(1)} m</p>
                    {data.efficiency && <p className={data.efficiency < 50 ? 'text-rose-400' : 'text-emerald-400'}>Eff: {data.efficiency.toFixed(1)}%</p>}
                  </div>
                );
              }
              return null;
            }} />
            {/* The Curve Line */}
            <Scatter name="Curve" data={curveData} line={{ stroke: '#94a3b8', strokeWidth: 2 }} shape={() => null} legendType="none" />
            {/* The Operation Points */}
            <Scatter name="Operations" data={opPoints} fill="#10b981">
              {opPoints.map((entry, index) => (
                <cell key={`cell-${index}`} fill={entry.type === 'anomaly' ? '#f43f5e' : '#10b981'} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between text-sm">
        <span className="text-slate-600">Model: <span className="font-semibold">FE-SUB-6-IND</span></span>
        <span className="text-slate-600">Serial: <span className="font-semibold">IN-26-88942</span></span>
        <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded border border-emerald-100">MATCH: 98.2%</span>
      </div>
    </div>
  );
};

export default function AquaGridNational() {
  const [activeTab, setActiveTab] = useState('national');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Navigation Config
  const navItems = [
    { id: 'national', label: 'National Command', icon: Globe },
    { id: 'fleet', label: 'Asset Fleet', icon: Server },
    { id: 'digitaltwin', label: 'Digital Twin Lab', icon: Cpu },
    { id: 'marketplace', label: 'Service Market', icon: ShoppingCart }, // Commercial Layer
    { id: 'compliance', label: 'Audit & Policy', icon: FileText },
    { id: 'integrations', label: 'Integration Hub', icon: Database }, // API Status
  ];

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 font-sans overflow-hidden">
      
      {/* --- Enterprise Sidebar --- */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col z-30 shadow-2xl`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/50">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-white text-lg tracking-tight">AQUAGRID</h1>
                <p className="text-[10px] text-blue-400 font-semibold tracking-wider">ENTERPRISE</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-700 text-white shadow-md' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Profile (Director) */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white border-2 border-slate-800">
              VP
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">Aditya Rao</p>
                <p className="text-xs text-slate-500 truncate">Dir. Competency Center</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* --- Main Workspace --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Production</span>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-slate-800">{navItems.find(i => i.id === activeTab)?.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {/* Global Status Ticker */}
            <div className="hidden lg:flex items-center gap-4 mr-4">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">System Load</span>
                  <span className="text-xs font-medium text-slate-700">42ms Latency</span>
               </div>
               <div className="h-8 w-px bg-slate-200"></div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Data Ingest</span>
                  <span className="text-xs font-medium text-slate-700">14k events/sec</span>
               </div>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          
          {/* VIEW: NATIONAL COMMAND */}
          {activeTab === 'national' && (
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">National Overview</h2>
                  <p className="text-slate-500 mt-1">Real-time status of Global Cyber-Physical Water Infrastructure.</p>
                </div>
                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2 shadow-sm">
                      <Download className="w-4 h-4" /> Export Report
                   </button>
                   <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200">
                      Add Deployment Region
                   </button>
                </div>
              </div>

              {/* Top Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Assets Managed" 
                  value={NATIONAL_STATS.totalAssets.toLocaleString()} 
                  subtext="Across 4 States" 
                  icon={Server} 
                  trend="12% YoY"
                  colorClass="bg-blue-500" 
                />
                <StatCard 
                  title="Verified Water Saved" 
                  value={NATIONAL_STATS.waterSaved} 
                  subtext="Validated via Physics Engine" 
                  icon={Droplets} 
                  trend="8% MoM"
                  colorClass="bg-emerald-500" 
                />
                <StatCard 
                  title="Platform Revenue (ARR)" 
                  value={NATIONAL_STATS.saasRevenue} 
                  subtext="SaaS + Data Monetization" 
                  icon={Landmark} 
                  trend="124% YoY"
                  colorClass="bg-indigo-500" 
                />
                 <StatCard 
                  title="Audit Grade Reliability" 
                  value={NATIONAL_STATS.auditGradeData} 
                  subtext="Trust Score > 95%" 
                  icon={ShieldCheck} 
                  colorClass="bg-amber-500" 
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Deployment Map (Abstract) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-slate-800 mb-4">Regional Deployment Status</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {REGIONS.map(region => (
                         <div key={region.id} className="p-4 border border-slate-100 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                               <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-blue-500" />
                                  <span className="font-semibold text-slate-700">{region.name}</span>
                               </div>
                               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${region.status === 'Stable' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                  {region.status.toUpperCase()}
                               </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                               <div>
                                  <p className="text-xs text-slate-500">Assets</p>
                                  <p className="text-sm font-medium text-slate-900">{region.assets.toLocaleString()}</p>
                               </div>
                               <div>
                                  <p className="text-xs text-slate-500">Health Idx</p>
                                  <p className="text-sm font-medium text-slate-900">{region.health}%</p>
                               </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* API Status */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-slate-800 mb-4">Integration Hub</h3>
                   <div className="space-y-3">
                      <IntegrationBadge name="Central Ground Water Auth" status="Active" type="Govt" />
                      <IntegrationBadge name="SBI Green Financing" status="Active" type="Bank" />
                      <IntegrationBadge name="HDFC Agri-Lending" status="Syncing" type="Bank" />
                      <IntegrationBadge name="Pollution Control Board" status="Pending" type="Govt" />
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: DIGITAL TWIN LAB */}
          {activeTab === 'digitaltwin' && (
            <div className="space-y-6 h-full flex flex-col">
               <div>
                  <h2 className="text-2xl font-bold text-slate-900">Digital Twin Verification Lab</h2>
                  <p className="text-slate-500 mt-1">FR-02: Physics-Based Validation Engine</p>
               </div>
               <div className="flex-1">
                 <DigitalTwinLab />
               </div>
            </div>
          )}

           {/* VIEW: SERVICE MARKETPLACE */}
           {activeTab === 'marketplace' && (
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                  <div>
                     <h2 className="text-2xl font-bold text-slate-900">Service Marketplace</h2>
                     <p className="text-slate-500 mt-1">Commercial Layer: Connect assets with authorized service partners.</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
                        Become a Partner
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Filters */}
                  <div className="md:col-span-1 space-y-4">
                     <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="font-semibold text-slate-800 mb-3">Service Type</h4>
                        <div className="space-y-2">
                           {['Preventive Maintenance', 'Emergency Repair', 'Energy Audit', 'Spare Parts'].map(type => (
                              <label key={type} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                 <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                                 {type}
                              </label>
                           ))}
                        </div>
                     </div>
                     <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h4 className="font-semibold text-blue-900 mb-2">Revenue Generated</h4>
                        <p className="text-2xl font-bold text-blue-700">₹4.2 Cr</p>
                        <p className="text-xs text-blue-600">YTD Commissions from Marketplace</p>
                     </div>
                  </div>

                  {/* Listings */}
                  <div className="md:col-span-2 space-y-4">
                     {MARKETPLACE_SERVICES.map(service => (
                        <div key={service.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                           <div className="flex items-start gap-4">
                              <div className="p-3 bg-slate-100 rounded-lg">
                                 <Wrench className="w-6 h-6 text-slate-600" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-slate-800">{service.provider}</h4>
                                 <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{service.type}</span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {service.location}</span>
                                 </div>
                                 <div className="mt-2 flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                       <div key={i} className={`w-3 h-3 rounded-full ${i < Math.floor(service.rating) ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                                    ))}
                                    <span className="text-xs text-slate-500 ml-1">{service.rating}/5.0</span>
                                 </div>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-lg font-bold text-slate-900">{service.price}</p>
                              <button className="mt-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800">
                                 Book Service
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
           )}

           {/* VIEW: COMPLIANCE */}
           {activeTab === 'compliance' && (
              <div className="space-y-6">
                 <div>
                  <h2 className="text-2xl font-bold text-slate-900">Audit & Policy Engine</h2>
                  <p className="text-slate-500 mt-1">Immutable Ledger for CGWA & ESG Reporting.</p>
                 </div>
                 
                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                          <tr>
                             <th className="px-6 py-4">Transaction ID</th>
                             <th className="px-6 py-4">Timestamp</th>
                             <th className="px-6 py-4">Entity</th>
                             <th className="px-6 py-4">Event Type</th>
                             <th className="px-6 py-4">Verification Hash</th>
                             <th className="px-6 py-4">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {[1,2,3,4,5].map(i => (
                             <tr key={i} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-600">TXN-2026-88{i}</td>
                                <td className="px-6 py-4 text-slate-600">2026-02-14 10:42:{10+i}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">Reliance Ind. Jamnagar</td>
                                <td className="px-6 py-4">
                                   <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">Quarterly Usage Report</span>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-400">0x7f83...9a2{i}</td>
                                <td className="px-6 py-4">
                                   <div className="flex items-center gap-1 text-emerald-600 font-medium">
                                      <CheckCircle2 className="w-4 h-4" /> Verified
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

           {/* Placeholder for other tabs */}
           {(activeTab === 'fleet' || activeTab === 'integrations') && (
              <div className="flex items-center justify-center h-96 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                 <div className="text-center">
                    <Database className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-slate-500">Module Active in Production</h3>
                    <p className="text-sm text-slate-400">Select another module to view visualization.</p>
                 </div>
              </div>
           )}

        </div>
      </main>
    </div>
  );
}
