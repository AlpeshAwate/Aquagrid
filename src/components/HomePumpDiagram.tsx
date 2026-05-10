import React from 'react'

interface HomePumpDiagramProps {
  active: boolean
  className?: string
}

const HomePumpDiagram: React.FC<HomePumpDiagramProps> = ({ active, className = '' }) => {
  const waterTopY = active ? 56 : 78
  const wavePath = `M 50 ${waterTopY} Q 75 ${waterTopY - 4}, 100 ${waterTopY} T 150 ${waterTopY} T 200 ${waterTopY} T 250 ${waterTopY} V 110 H 50 Z`

  return (
    <svg
      viewBox="0 0 240 360"
      className={className}
      role="img"
      aria-label="Home water system diagram"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hpd-tank" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="hpd-water" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="hpd-pump" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="hpd-aquifer" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0c4a6e" />
          <stop offset="100%" stopColor="#082f49" />
        </linearGradient>
        <radialGradient id="hpd-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>
        <clipPath id="hpd-tank-clip">
          <rect x="60" y="40" width="120" height="70" rx="10" />
        </clipPath>
      </defs>

      {/* Underground band */}
      <rect x="0" y="240" width="240" height="120" fill="url(#hpd-aquifer)" opacity="0.18" />
      <line
        x1="0"
        y1="240"
        x2="240"
        y2="240"
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.55"
      />

      {/* === TANK === */}
      <g>
        <rect
          x="60"
          y="40"
          width="120"
          height="70"
          rx="10"
          fill="url(#hpd-tank)"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <rect x="58" y="34" width="124" height="10" rx="3" fill="#64748b" />

        <g clipPath="url(#hpd-tank-clip)">
          <rect
            x="60"
            y={waterTopY}
            width="120"
            height={110 - waterTopY}
            fill="url(#hpd-water)"
            opacity="0.85"
            style={{ transition: 'y 1.2s ease, height 1.2s ease' }}
          />

          <path d={wavePath} fill="url(#hpd-water)" opacity="0.55">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; -50 0; 0 0"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>

          {active && (
            <g fill="white" fillOpacity="0.7">
              <circle cx="80" cy="85" r="1.5">
                <animate attributeName="cy" values="100;60" dur="2s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.7;0" dur="2s" begin="0s" repeatCount="indefinite" />
              </circle>
              <circle cx="120" cy="90" r="1.2">
                <animate attributeName="cy" values="105;65" dur="2.4s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.7;0" dur="2.4s" begin="0.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="155" cy="88" r="1.4">
                <animate attributeName="cy" values="102;62" dur="2.2s" begin="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.7;0" dur="2.2s" begin="1s" repeatCount="indefinite" />
              </circle>
            </g>
          )}
        </g>

        <text
          x="120"
          y="78"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#1e293b"
          letterSpacing="1.5"
          opacity="0.55"
        >
          PRESSURE TANK
        </text>

        {/* Pressure gauge */}
        <g>
          <circle cx="168" cy="52" r="7" fill="white" stroke="#475569" strokeWidth="1.5" />
          <circle cx="168" cy="52" r="5" fill="#f1f5f9" />
          <line
            x1="168"
            y1="52"
            x2={active ? 172 : 164}
            y2={active ? 48 : 56}
            stroke="#dc2626"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ transition: 'all 1s ease' }}
          />
          <circle cx="168" cy="52" r="1.2" fill="#0f172a" />
        </g>
      </g>

      {/* === PIPE === */}
      <g>
        <rect x="113" y="110" width="14" height="170" fill="#94a3b8" />
        <rect x="116" y="110" width="8" height="170" fill="#cbd5e1" />
        <rect x="108" y="108" width="24" height="6" rx="2" fill="#64748b" />
        <rect x="108" y="276" width="24" height="6" rx="2" fill="#64748b" />

        {active && (
          <>
            <rect x="116" y="110" width="8" height="170" fill="url(#hpd-water)" opacity="0.55" />
            {[0, 0.5, 1, 1.5, 2].map((delay, i) => (
              <g key={i}>
                <circle r="2.5" fill="#0ea5e9" opacity="0">
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${delay}s`}
                    path="M 120 280 L 120 110"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.1;0.9;1"
                    dur="2.5s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </>
        )}
      </g>

      {/* === PUMP / WELLHEAD === */}
      <g>
        {active && (
          <circle cx="120" cy="312" r="48" fill="url(#hpd-glow)">
            <animate attributeName="r" values="40;55;40" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;1;0.55" dur="2.4s" repeatCount="indefinite" />
          </circle>
        )}

        <rect
          x="90"
          y="282"
          width="60"
          height="60"
          rx="8"
          fill="url(#hpd-pump)"
          stroke="#1e293b"
          strokeWidth="1.5"
        />

        {/* Vent slats */}
        <g stroke="#22d3ee" strokeOpacity="0.35" strokeWidth="0.8">
          <line x1="98" y1="294" x2="142" y2="294" />
          <line x1="98" y1="297" x2="142" y2="297" />
          <line x1="98" y1="300" x2="142" y2="300" />
        </g>

        {/* Impeller */}
        <g transform="translate(120 318)">
          <g>
            {active && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="0.9s"
                repeatCount="indefinite"
              />
            )}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <path
                key={angle}
                d="M 0 0 Q 5 -9, 13 -4 L 9 0 L 13 4 Q 5 9, 0 0 Z"
                fill="#3b82f6"
                stroke="#1e40af"
                strokeWidth="0.5"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle r="3.5" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
            <circle r="1.2" fill="#22d3ee" />
          </g>
        </g>

        <text
          x="120"
          y="338"
          textAnchor="middle"
          fontSize="6"
          fontWeight="700"
          fill="#22d3ee"
          letterSpacing="1.5"
        >
          SUBDRIVE CONNECT
        </text>

        {/* Status LED */}
        <circle cx="143" cy="288" r="2" fill={active ? '#22c55e' : '#475569'}>
          {active && (
            <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
          )}
        </circle>
      </g>
    </svg>
  )
}

export default HomePumpDiagram