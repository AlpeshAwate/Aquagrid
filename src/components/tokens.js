// AQUAGRID - CRITICAL INFRASTRUCTURE INTELLIGENCE DESIGN SYSTEM TOKENS
// 5-Years-Ahead UI/UX Implementation

// CORE DESIGN TOKENS (Infrastructure-Grade)
export const tokens = {
  colors: {
    // Contextual Illumination Mode
    base: {
      midnight: '#0F172A',
      graphite: '#1E293B',
      steel: '#334155',
      mist: '#64748B'
    },
    water: {
      deep: '#0E7490',
      flow: '#0891B2',
      safe: '#06B6D4'
    },
    status: {
      amber: '#D97706',
      risk: '#DC2626',
      trust: '#059669'
    },
    // 70% low-contrast, 20% medium, 10% high
    contrast: {
      low: 'rgba(255,255,255,0.05)',
      medium: 'rgba(255,255,255,0.12)',
      high: 'rgba(255,255,255,0.95)'
    }
  },
  typography: {
    // IBM Plex Sans hierarchy
    system: '32px/1.2 "IBM Plex Sans", system-ui',
    section: '18px/1.3 "IBM Plex Sans", system-ui', 
    data: '13px/1.4 "IBM Plex Sans", system-ui',
    meta: '11px/1.3 "IBM Plex Sans", system-ui'
  },
  motion: {
    // Data settling into place
    settle: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    reveal: '150ms ease-out'
  }
};
