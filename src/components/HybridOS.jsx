import { useState } from 'react'
import { Droplets, Search, MessageSquare, Grid3X3, Send, Clock, Shield, TrendingUp } from 'lucide-react'

export default function AquaGridHybridOS() {
  const [mode, setMode] = useState('ask') // ask | search | operate
  const [query, setQuery] = useState('')
  const [conversation, setConversation] = useState([])

  const handleAsk = () => {
    if (!query.trim()) return
    
    const newConversation = [...conversation, {
      type: 'question',
      content: query,
      timestamp: new Date().toLocaleTimeString()
    }, {
      type: 'answer',
      content: {
        summary: 'Water stress risk is LOW for next month based on monsoon forecast and current reserves.',
        evidence: ['Groundwater levels: 85% of seasonal average', 'Monsoon prediction: 102% of normal', 'Industrial demand: Stable'],
        confidence: 94,
        source: 'IMD + Groundwater Board + Industrial Monitoring',
        actions: ['Monitor daily consumption', 'Prepare contingency if <80%']
      },
      timestamp: new Date().toLocaleTimeString()
    }]
    
    setConversation(newConversation)
    setQuery('')
  }

  return (
    <div className="min-h-screen bg-[#FEF7FF]">
      {/* Header with Mode Switcher */}
      <nav className="bg-[#EADDFF] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#6750A4] rounded-full flex items-center justify-center shadow-md">
              <Droplets className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1D1B20]">AquaGrid</h1>
              <p className="text-xs text-[#49454F]">Water Intelligence OS</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex gap-2 bg-[#E8DEF8] rounded-full p-1">
            <button
              onClick={() => setMode('ask')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                mode === 'ask' ? 'bg-[#6750A4] text-white shadow-md' : 'text-[#49454F] hover:bg-[#D0BCFF]/30'
              }`}
            >
              <MessageSquare size={16} />
              Ask
            </button>
            <button
              onClick={() => setMode('search')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                mode === 'search' ? 'bg-[#6750A4] text-white shadow-md' : 'text-[#49454F] hover:bg-[#D0BCFF]/30'
              }`}
            >
              <Search size={16} />
              Search
            </button>
            <button
              onClick={() => setMode('operate')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                mode === 'operate' ? 'bg-[#6750A4] text-white shadow-md' : 'text-[#49454F] hover:bg-[#D0BCFF]/30'
              }`}
            >
              <Grid3X3 size={16} />
              Operate
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* ASK MODE - Conversational Intelligence */}
        {mode === 'ask' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1D1B20] mb-2">Water Intelligence Console</h2>
              <p className="text-[#49454F]">Ask questions about water systems, compliance, and operations</p>
            </div>

            {/* Conversation History */}
            <div className="space-y-6 mb-8">
              {conversation.map((item, i) => (
                <div key={i} className={`${item.type === 'question' ? 'text-right' : 'text-left'}`}>
                  {item.type === 'question' ? (
                    <div className="inline-block bg-[#6750A4] text-white px-4 py-3 rounded-2xl max-w-md">
                      <p className="text-sm">{item.content}</p>
                      <p className="text-xs opacity-70 mt-1">{item.timestamp}</p>
                    </div>
                  ) : (
                    <div className="bg-[#FFFBFE] border border-[#E8DEF8] rounded-2xl p-6 max-w-2xl shadow-sm">
                      {/* Summary */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-[#1D1B20] mb-2">Analysis</h4>
                        <p className="text-[#49454F]">{item.content.summary}</p>
                      </div>

                      {/* Evidence */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-[#1D1B20] mb-2">Evidence</h4>
                        <ul className="space-y-1">
                          {item.content.evidence.map((evidence, j) => (
                            <li key={j} className="text-sm text-[#49454F] flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#6750A4] rounded-full"></div>
                              {evidence}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-[#E8DEF8]">
                        <div className="flex items-center gap-4 text-xs text-[#49454F]">
                          <div className="flex items-center gap-1">
                            <Shield size={12} />
                            Confidence: {item.content.confidence}%
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {item.timestamp}
                          </div>
                        </div>
                        <button className="text-xs text-[#6750A4] font-semibold hover:underline">
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="bg-[#FFFBFE] border border-[#E8DEF8] rounded-2xl p-4 shadow-sm">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about water stress, compliance, asset performance..."
                  className="flex-1 bg-transparent border-none outline-none text-[#1D1B20] placeholder-[#49454F]"
                  onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                />
                <button
                  onClick={handleAsk}
                  className="bg-[#6750A4] text-white p-2 rounded-full hover:bg-[#7965AF] transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Suggested Questions */}
            {conversation.length === 0 && (
              <div className="mt-6">
                <p className="text-sm text-[#49454F] mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Are we at risk of water stress next month?',
                    'Which plants are drifting from efficiency baseline?',
                    'Show compliance exposure for Texas units'
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(suggestion)}
                      className="text-xs bg-[#E8DEF8] text-[#6750A4] px-3 py-2 rounded-full hover:bg-[#D0BCFF] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEARCH MODE - Knowledge Base */}
        {mode === 'search' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1D1B20] mb-2">Knowledge Search</h2>
              <p className="text-[#49454F]">Search verified water data, assets, reports, and regulations</p>
            </div>

            {/* Search Input */}
            <div className="bg-[#FFFBFE] border border-[#E8DEF8] rounded-2xl p-4 shadow-sm mb-8">
              <div className="flex gap-3">
                <Search className="text-[#49454F]" size={20} />
                <input
                  type="text"
                  placeholder="Search assets, sites, reports, regulations..."
                  className="flex-1 bg-transparent border-none outline-none text-[#1D1B20] placeholder-[#49454F]"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="space-y-4">
              {[
                { type: 'Asset', title: 'Pump Station PS-4401', status: 'Operational', confidence: 99, location: 'Houston, Texas' },
                { type: 'Report', title: 'Q3 2024 Water Audit', status: 'Verified', confidence: 100, location: 'Texas Groundwater Ops' },
                { type: 'Site', title: 'Sanand Industrial Park', status: 'Monitored', confidence: 97, location: 'Austin, Texas' }
              ].map((result, i) => (
                <div key={i} className="bg-[#FFFBFE] border border-[#E8DEF8] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-[#E8DEF8] text-[#6750A4] px-2 py-1 rounded-full font-semibold">
                          {result.type}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          result.status === 'Operational' || result.status === 'Verified' ? 'bg-[#C4EED0] text-[#006E1C]' : 'bg-[#FFF4E6] text-[#BF5000]'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#1D1B20] mb-1">{result.title}</h3>
                      <p className="text-sm text-[#49454F]">{result.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-[#49454F] mb-1">
                        <Shield size={12} />
                        {result.confidence}%
                      </div>
                      <button className="text-xs text-[#6750A4] font-semibold hover:underline">
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OPERATE MODE - Spatial Control */}
        {mode === 'operate' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1D1B20] mb-2">Operations Center</h2>
              <p className="text-[#49454F]">Monitor, control, and manage water systems</p>
            </div>

            {/* Operational Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Asset Health */}
              <div className="bg-[#FFFBFE] rounded-3xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-[#1D1B20]">Asset Health</h3>
                  <div className="flex items-center gap-1 text-xs text-[#006E1C]">
                    <TrendingUp size={12} />
                    94%
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#1D1B20] mb-2">11,847</p>
                  <p className="text-sm text-[#49454F]">Assets Online</p>
                </div>
                <button className="w-full mt-4 py-2 bg-[#E8DEF8] text-[#6750A4] rounded-xl font-semibold hover:bg-[#D0BCFF] transition-colors">
                  View Fleet
                </button>
              </div>

              {/* Active Alerts */}
              <div className="bg-[#FFDAD6] rounded-3xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-[#410002]">Active Alerts</h3>
                  <span className="text-xs bg-[#BA1A1A] text-white px-2 py-1 rounded-full font-semibold">
                    23
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-[#410002]">
                    <p className="font-semibold">High TDS - Zone A</p>
                    <p className="text-xs opacity-70">2 min ago</p>
                  </div>
                  <div className="text-sm text-[#410002]">
                    <p className="font-semibold">Maintenance Due - PS-4401</p>
                    <p className="text-xs opacity-70">15 min ago</p>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-[#BA1A1A] text-white rounded-xl font-semibold hover:bg-[#A91B1B] transition-colors">
                  Acknowledge All
                </button>
              </div>

              {/* Pending Actions */}
              <div className="bg-[#FFF4E6] rounded-3xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-[#BF5000]">Pending Actions</h3>
                  <span className="text-xs bg-[#FF8C00] text-white px-2 py-1 rounded-full font-semibold">
                    7
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-[#BF5000]">
                    <p className="font-semibold">Approve Service Request</p>
                    <p className="text-xs opacity-70">Dahej Plant</p>
                  </div>
                  <div className="text-sm text-[#BF5000]">
                    <p className="font-semibold">Review Compliance Report</p>
                    <p className="text-xs opacity-70">Texas Groundwater Ops</p>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-[#FF8C00] text-white rounded-xl font-semibold hover:bg-[#E67E00] transition-colors">
                  Review Queue
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}