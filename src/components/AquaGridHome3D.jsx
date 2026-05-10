import React, { useMemo, useState } from "react";
import "./AquaGridHome3D.css";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Line,
  Text,
  RoundedBox
} from "@react-three/drei";

const STATUS_COLORS = {
  healthy: "#16a34a",
  online: "#2563eb",
  active: "#0ea5e9",
  standby: "#94a3b8",
  warning: "#f59e0b",
  fault: "#ef4444"
};

const products = [
  {
    id: "well-pump",
    name: "FPS Series V Well Pump",
    brand: "Franklin Electric",
    location: "Underground Well",
    status: "healthy",
    position: [-4.2, -3.2, 0],
    metrics: {
      health: "88%",
      flow: "6.5 GPM",
      runtime: "1,240 hrs"
    }
  },
  {
    id: "subdrive",
    name: "SubDrive Connect",
    brand: "Franklin Electric",
    location: "Basement Wall",
    status: "online",
    position: [-1.7, -0.75, 0.05],
    metrics: {
      pressure: "60 PSI",
      frequency: "48 Hz",
      faults: "0"
    }
  },
  {
    id: "pressure-tank",
    name: "Pressure Tank",
    brand: "Franklin Electric System",
    location: "Basement Utility Room",
    status: "active",
    position: [-2.8, -1.45, 0],
    metrics: {
      pressure: "58 PSI",
      cycles: "14 today",
      status: "Normal"
    }
  },
  {
    id: "softener",
    name: "Puronics Water Softener",
    brand: "Puronics",
    location: "Utility Room",
    status: "warning",
    position: [0.2, -1.35, 0],
    metrics: {
      salt: "20%",
      regen: "Tonight",
      hardness: "Reduced"
    }
  },
  {
    id: "ro-system",
    name: "Puronics RO Drinking Water",
    brand: "Puronics",
    location: "Kitchen Sink",
    status: "healthy",
    position: [2.4, 0.55, 0],
    metrics: {
      filter: "72%",
      membrane: "81%",
      tds: "Good"
    }
  },
  {
    id: "sump-pump",
    name: "Little Giant Sump Pump",
    brand: "Little Giant",
    location: "Basement Sump Pit",
    status: "standby",
    position: [-4.6, -1.65, 0],
    metrics: {
      mode: "Standby",
      lastRun: "2 days ago",
      alarm: "Clear"
    }
  },
  {
    id: "condensate",
    name: "Little Giant Condensate Pump",
    brand: "Little Giant",
    location: "HVAC Closet",
    status: "healthy",
    position: [1.5, -0.9, 0],
    metrics: {
      cycles: "8 today",
      overflow: "No",
      status: "Normal"
    }
  },
  {
    id: "effluent",
    name: "Effluent / Sewage Pump",
    brand: "Little Giant",
    location: "Septic / Wastewater Area",
    status: "healthy",
    position: [4.4, -2.35, 0],
    metrics: {
      level: "Normal",
      alarm: "Clear",
      cycles: "3 today"
    }
  }
];

function PulsingRing({ color }) {
  const ref = React.useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 2.4) * 0.15;
    ref.current.scale.set(scale, scale, scale);
    ref.current.material.opacity = 0.35 + Math.sin(t * 2.4) * 0.12;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.22, 0.018, 16, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

function ProductHotspot({ product, onSelect }) {
  const color = STATUS_COLORS[product.status] || "#2563eb";

  return (
    <group position={product.position}>
      <PulsingRing color={color} />
      <mesh onClick={() => onSelect(product)}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} />
      </mesh>
      <Html center distanceFactor={9}>
        <button
          onClick={() => onSelect(product)}
          className="ag-hotspot-label"
          style={{ borderColor: color }}
        >
          <span className="ag-status-dot" style={{ backgroundColor: color }} />
          {product.name}
        </button>
      </Html>
    </group>
  );
}

function AnimatedWaterLine({ points, color = "#38bdf8" }) {
  const ref = React.useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.dashOffset = -clock.getElapsedTime() * 0.7;
  });

  return (
    <Line
      ref={ref}
      points={points}
      color={color}
      lineWidth={3}
      dashed
      dashSize={0.16}
      gapSize={0.1}
    />
  );
}

function HouseShell() {
  return (
    <group>
      <mesh position={[0, -2.05, -0.08]}>
        <boxGeometry args={[10.5, 0.1, 0.18]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      <mesh position={[0, -3.2, -0.12]}>
        <boxGeometry args={[10.5, 0.6, 0.12]} />
        <meshStandardMaterial color="#bae6fd" transparent opacity={0.55} />
      </mesh>

      <Text position={[-4.7, -3.6, 0]} fontSize={0.18} color="#0369a1" anchorX="left">
        Aquifer
      </Text>

      <RoundedBox position={[-1.1, -1.1, -0.15]} args={[7.4, 1.75, 0.2]} radius={0.05}>
        <meshStandardMaterial color="#e0f2fe" transparent opacity={0.55} />
      </RoundedBox>

      <RoundedBox position={[0.2, 0.55, -0.15]} args={[6.8, 1.9, 0.2]} radius={0.05}>
        <meshStandardMaterial color="#f8fafc" transparent opacity={0.68} />
      </RoundedBox>

      <mesh position={[0.2, 1.72, -0.15]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[2.9, 2.9, 0.2]} />
        <meshStandardMaterial color="#dbeafe" transparent opacity={0.72} />
      </mesh>
    </group>
  );
}

function ProductModels() {
  return (
    <group>
      <WellPumpModel />
      <PressureTankModel />
      <ControllerModel />
      <SoftenerModel />
      <ROSystemModel />
      <SumpPumpModel />
      <CondensatePumpModel />
      <EffluentPumpModel />
    </group>
  );
}

function WellPumpModel() {
  return (
    <group position={[-4.2, -3.2, 0]}>
      <mesh position={[0, 0.75, -0.03]}>
        <cylinderGeometry args={[0.22, 0.22, 2.5, 32]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.9, 32]} />
        <meshStandardMaterial color="#0f766e" metalness={0.45} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.35, 32]} />
        <meshStandardMaterial color="#1d4ed8" />
      </mesh>
      <mesh position={[0, 2.08, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.12, 32]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
    </group>
  );
}

function PressureTankModel() {
  return (
    <group position={[-2.8, -1.45, 0]}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.8, 32]} />
        <meshStandardMaterial color="#2563eb" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.28, 32, 16]} />
        <meshStandardMaterial color="#2563eb" roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.28, 32, 16]} />
        <meshStandardMaterial color="#1d4ed8" roughness={0.35} />
      </mesh>
    </group>
  );
}

function ControllerModel() {
  return (
    <group position={[-1.7, -0.75, 0.04]}>
      <RoundedBox args={[0.55, 0.45, 0.12]} radius={0.04}>
        <meshStandardMaterial color="#0f172a" />
      </RoundedBox>
      <RoundedBox position={[0, 0.05, 0.07]} args={[0.38, 0.16, 0.03]} radius={0.02}>
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.25} />
      </RoundedBox>
      <mesh position={[0.2, -0.14, 0.08]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function SoftenerModel() {
  return (
    <group position={[0.2, -1.35, 0]}>
      <mesh position={[-0.18, 0.45, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.95, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.35} />
      </mesh>
      <mesh position={[-0.18, 0.98, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.12, 32]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <RoundedBox position={[0.28, 0.25, 0]} args={[0.34, 0.7, 0.28]} radius={0.06}>
        <meshStandardMaterial color="#f8fafc" transparent opacity={0.92} />
      </RoundedBox>
    </group>
  );
}

function ROSystemModel() {
  return (
    <group position={[2.4, 0.55, 0]}>
      <RoundedBox position={[0, -0.1, -0.02]} args={[0.9, 0.65, 0.2]} radius={0.04}>
        <meshStandardMaterial color="#e2e8f0" />
      </RoundedBox>
      {[-0.22, 0, 0.22].map((x) => (
        <mesh key={x} position={[x, -0.13, 0.1]}>
          <cylinderGeometry args={[0.055, 0.055, 0.38, 20]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
      ))}
      <mesh position={[0.39, -0.15, 0.1]}>
        <sphereGeometry args={[0.13, 24, 16]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
}

function SumpPumpModel() {
  return (
    <group position={[-4.6, -1.65, 0]}>
      <mesh position={[0, 0.05, -0.02]}>
        <cylinderGeometry args={[0.38, 0.38, 0.38, 32]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.42} />
      </mesh>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.28, 24]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </group>
  );
}

function CondensatePumpModel() {
  return (
    <group position={[1.5, -0.9, 0]}>
      <RoundedBox position={[0, 0.35, -0.02]} args={[0.65, 0.9, 0.2]} radius={0.04}>
        <meshStandardMaterial color="#cbd5e1" />
      </RoundedBox>
      <RoundedBox position={[0.45, -0.12, 0.03]} args={[0.35, 0.2, 0.16]} radius={0.03}>
        <meshStandardMaterial color="#0f172a" />
      </RoundedBox>
    </group>
  );
}

function EffluentPumpModel() {
  return (
    <group position={[4.4, -2.35, 0]}>
      <RoundedBox position={[0, 0, -0.02]} args={[1.1, 0.45, 0.18]} radius={0.08}>
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.7} />
      </RoundedBox>
      <mesh position={[0.28, 0.12, 0.05]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 24]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </group>
  );
}

function WaterNetwork() {
  const lines = useMemo(
    () => [
      [[-4.2, -3.1, 0.04], [-4.2, -2.05, 0.04], [-2.8, -2.05, 0.04], [-2.8, -1.0, 0.04]],
      [[-2.55, -1.15, 0.04], [-1.3, -1.15, 0.04], [0.0, -1.15, 0.04]],
      [[0.35, -1.05, 0.04], [0.9, -0.2, 0.04], [2.4, 0.25, 0.04]],
      [[-4.6, -1.45, 0.04], [-5.05, -1.1, 0.04], [-5.05, -0.3, 0.04]],
      [[4.1, -2.25, 0.04], [3.4, -2.05, 0.04], [2.8, -1.5, 0.04]],
      [[1.85, -0.95, 0.04], [2.3, -1.1, 0.04], [2.7, -1.35, 0.04]]
    ],
    []
  );

  return (
    <group>
      {lines.map((points, index) => (
        <AnimatedWaterLine key={index} points={points} />
      ))}
    </group>
  );
}

function ProductInfoPanel({ selectedProduct, onClose }) {
  if (!selectedProduct) return null;

  const color = STATUS_COLORS[selectedProduct.status] || "#2563eb";

  return (
    <div className="ag-info-panel">
      <div className="ag-info-header">
        <div>
          <div className="ag-product-brand">{selectedProduct.brand}</div>
          <h3>{selectedProduct.name}</h3>
        </div>
        <button onClick={onClose} className="ag-close-button">×</button>
      </div>

      <div className="ag-product-location">{selectedProduct.location}</div>

      <div className="ag-product-status" style={{ color }}>
        <span style={{ backgroundColor: color }} />
        {selectedProduct.status.toUpperCase()}
      </div>

      <div className="ag-metrics-grid">
        {Object.entries(selectedProduct.metrics).map(([key, value]) => (
          <div key={key} className="ag-metric-card">
            <div className="ag-metric-label">{key}</div>
            <div className="ag-metric-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Scene({ onSelect }) {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[2, 5, 4]} intensity={1.4} />
      <pointLight position={[-4, 1, 3]} intensity={0.6} />

      <HouseShell />
      <WaterNetwork />
      <ProductModels />

      {products.map((product) => (
        <ProductHotspot key={product.id} product={product} onSelect={onSelect} />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={5.5}
        maxDistance={10}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.05}
      />
    </>
  );
}

export default function AquaGridHome3D() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  return (
    <div className="ag-3d-wrapper">
      <div className="ag-3d-header">
        <div>
          <div className="ag-eyebrow">Live Connected Ecosystem</div>
          <h2>AquaGrid Smart Water Home</h2>
        </div>
        <div className="ag-live-badge">
          <span />
          Live System Status
        </div>
      </div>

      <div className="ag-3d-canvas-card">
        <Canvas camera={{ position: [0, 0.8, 7.2], fov: 45 }} dpr={[1, 2]}>
          <Scene onSelect={setSelectedProduct} />
        </Canvas>

        <ProductInfoPanel
          selectedProduct={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  );
}