/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Download, AlertCircle } from 'lucide-react';
import faics from '../services/faics';

export default function AssetRegister() {
  const [assets, setAssets] = useState([]);
  const [summary, setSummary] = useState(null);
  const [filter, setFilter] = useState('all');
  const isMountedRef = useRef(true);

  const loadAssets = useCallback(async () => {
    console.log('[AssetRegister] Loading assets with filter:', filter);
    try {
      const data = await faics.getAssetRegister({ status: filter !== 'all' ? filter : undefined });
      console.log('[AssetRegister] Assets loaded:', data.assets.length);
      if (isMountedRef.current) {
        setAssets(data.assets);
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('[AssetRegister] Error loading assets:', error);
    }
  }, [filter]);

  useEffect(() => {
    console.log('[AssetRegister] Filter changed:', filter);
    loadAssets();
    return () => {
      isMountedRef.current = false;
    };
  }, [filter, loadAssets]);

  const getStatusColor = (status) => {
    const colors = {
      optimal: 'bg-green-100 text-green-700 border-green-200',
      operational: 'bg-blue-100 text-blue-700 border-blue-200',
      warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      critical: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || colors.operational;
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white/60 backdrop-blur-xl border border-slate-200 rounded-2xl p-4">
            <p className="text-xs text-slate-600 uppercase mb-1">Total Assets</p>
            <p className="text-3xl font-bold text-slate-900">{summary.total.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <p className="text-xs text-green-700 uppercase mb-1">Operational</p>
            <p className="text-3xl font-bold text-green-700">{summary.operational.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <p className="text-xs text-yellow-700 uppercase mb-1">Warning</p>
            <p className="text-3xl font-bold text-yellow-700">{summary.warning}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-xs text-red-700 uppercase mb-1">Critical</p>
            <p className="text-3xl font-bold text-red-700">{summary.critical}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-xs text-blue-700 uppercase mb-1">Avg Health</p>
            <p className="text-3xl font-bold text-blue-700">{summary.avgHealthScore}%</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['all', 'operational', 'warning', 'critical'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 flex items-center gap-2">
          <Download size={16} /> Export
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-xl border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">Asset ID</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">Type</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">Location</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">Health</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">Next Maintenance</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <td className="p-4 font-mono text-sm text-slate-900">{asset.id}</td>
                <td className="p-4 text-sm text-slate-700">{asset.type}</td>
                <td className="p-4 text-sm text-slate-700">{asset.location}</td>
                <td className="p-4">
                  <span className={`text-2xl font-bold ${getHealthColor(asset.healthScore)}`}>
                    {asset.healthScore}
                  </span>
                  <span className="text-xs text-slate-500">/100</span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(asset.status)}`}>
                    {asset.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-700">{asset.nextMaintenance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
