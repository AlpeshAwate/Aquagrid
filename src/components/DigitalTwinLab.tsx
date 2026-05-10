import React from 'react';
import { Cpu } from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

// --- Mock Data & Generators ---

const generatePumpCurve = () => {
  const curve = [];
  for (let flow = 0; flow <= 100; flow += 5) {
    const head = 120 - (0.012 * Math.pow(flow, 2));
    curve.push({ flow, head, type: 'curve' });
  }
  return curve;
};

const generateOpPoints = () => {
  const points = [];
  for (let i = 0; i < 20; i++) {
    const flow = 40 + Math.random() * 40;
    const expectedHead = 120 - (0.012 * Math.pow(flow, 2));
    const actualHead = expectedHead * (0.95 + Math.random() * 0.1);
    points.push({ flow, head: actualHead, type: 'actual', efficiency: 85 + Math.random() * 10 });
  }
  points.push({ flow: 90, head: 20, type: 'anomaly', efficiency: 15 });
  return points;
};

const DigitalTwinLab: React.FC = () => {
  const chartRef = React.useRef<HTMLDivElement | null>(null);
  const [chartSize, setChartSize] = React.useState({ width: 0, height: 0 });
  const curveData = React.useMemo(() => generatePumpCurve(), []);
  const opPoints = React.useMemo(() => generateOpPoints(), []);

  React.useEffect(() => {
    const chartElement = chartRef.current;
    if (!chartElement) return;

    const updateSize = () => {
      const rect = chartElement.getBoundingClientRect();
      setChartSize({
        width: Math.max(0, Math.floor(rect.width)),
        height: Math.max(0, Math.floor(rect.height)),
      });
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(chartElement);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 h-full flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            Digital Twin Physics Lab
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Real-time H-Q (Head vs Flow) Verification against Factory Specs</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <span className="flex items-center text-slate-400"><div className="w-3 h-1 bg-slate-400 mr-2"></div> Factory Curve</span>
          <span className="flex items-center text-emerald-500"><div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div> Verified Op Point</span>
          <span className="flex items-center text-rose-500"><div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div> Anomaly Detected</span>
        </div>
      </div>

      <div ref={chartRef} className="w-full h-[340px] min-h-[300px]">
        {chartSize.width > 0 && chartSize.height > 0 && (
          <ScatterChart width={chartSize.width} height={chartSize.height} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
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
            <Scatter name="Curve" data={curveData} line={{ stroke: '#94a3b8', strokeWidth: 2 }} shape={() => null} legendType="none" />
            <Scatter name="Operations" data={opPoints}>
              {opPoints.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.type === 'anomaly' ? '#f43f5e' : '#10b981'} />
              ))}
            </Scatter>
          </ScatterChart>
        )}
      </div>
      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-lg flex items-center justify-between text-sm transition-colors">
        <span className="text-slate-600 dark:text-slate-400">Model: <span className="font-semibold text-slate-900 dark:text-white">FE-SUB-6-IND</span></span>
        <span className="text-slate-600 dark:text-slate-400">Serial: <span className="font-semibold text-slate-900 dark:text-white">IN-26-88942</span></span>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded border border-emerald-100 dark:border-emerald-800">MATCH: 98.2%</span>
      </div>
    </div>
  );
};

export default DigitalTwinLab;
