import React, { useState } from 'react'
import { Search, Filter, ShoppingBag, Wrench, Cpu, ShieldCheck, Star, MapPin, ArrowRight, Zap, CloudRain } from 'lucide-react'

// --- Mock Data ---

type Category = 'all' | 'franklin' | 'auxiliary' | 'services' | 'digital'

interface MarketplaceItem {
  id: string
  name: string
  provider: string
  category: Category
  type: string
  rating: number
  price: string
  description: string
  imageIcon: React.ReactNode
  imageUrl?: string
  verified: boolean
}

const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  // Franklin Electric OEM
  {
    id: 'fe-001',
    name: 'FPS 4400 Submersible Pump',
    provider: 'Franklin Electric',
    category: 'franklin',
    type: 'Hardware',
    rating: 4.9,
    price: '$1,200',
    description: 'High-efficiency submersible pump for industrial and agricultural applications. 4-inch diameter, NEMA standard.',
    imageIcon: <Zap className="w-8 h-8 text-blue-500" />,
    imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80',
    verified: true,
  },
  {
    id: 'fe-002',
    name: 'SubDrive Connect Plus',
    provider: 'Franklin Electric',
    category: 'franklin',
    type: 'Controller',
    rating: 4.8,
    price: '$850',
    description: 'Variable frequency drive with built-in Wi-Fi for real-time telemetry and smartphone configuration.',
    imageIcon: <Cpu className="w-8 h-8 text-blue-500" />,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    verified: true,
  },
  {
    id: 'fe-003',
    name: 'Fhoton Solar Drive',
    provider: 'Franklin Electric',
    category: 'franklin',
    type: 'Solar Infrastructure',
    rating: 4.9,
    price: '$1,400',
    description: 'Off-grid solar inverter designed to power AC motors using DC solar arrays. High MPPT efficiency.',
    imageIcon: <Zap className="w-8 h-8 text-amber-500" />,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    verified: true,
  },
  
  // Auxiliary Components
  {
    id: 'aux-001',
    name: 'Industrial Grade PVC Riser Pipes',
    provider: 'Apex Pipe Systems (Local)',
    category: 'auxiliary',
    type: 'Infrastructure',
    rating: 4.6,
    price: '$24 / meter',
    description: 'Heavy-duty column pipes designed to withstand high hydrostatic pressure. Compatible with FE 4" pumps.',
    imageIcon: <ShoppingBag className="w-8 h-8 text-slate-500" />,
    imageUrl: 'https://images.unsplash.com/photo-1585675100414-22cb7f77dc05?w=800&q=80',
    verified: false,
  },
  {
    id: 'aux-002',
    name: 'Ultrasonic Flow Sensor V2',
    provider: 'SenseWater IoT',
    category: 'auxiliary',
    type: 'Sensor',
    rating: 4.7,
    price: '$320',
    description: 'Non-intrusive flow meter that integrates directly into the AquaGrid telemetry bus via RS-485.',
    imageIcon: <Cpu className="w-8 h-8 text-emerald-500" />,
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
    verified: true,
  },

  // Field Services (Local)
  {
    id: 'srv-001',
    name: 'Authorized Installation & Commissioning',
    provider: 'Texas Hydro Tech',
    category: 'services',
    type: 'Field Service',
    rating: 4.9,
    price: 'Custom Quote',
    description: 'FE-certified installation team. Includes electrical safety sign-off and AquaGrid OS onboarding.',
    imageIcon: <Wrench className="w-8 h-8 text-indigo-500" />,
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    verified: true,
  },
  {
    id: 'srv-002',
    name: 'Deep Borewell Drilling (Rig Rental)',
    provider: 'Standard Drillers Corp',
    category: 'services',
    type: 'Heavy Service',
    rating: 4.4,
    price: '$45 / foot',
    description: 'Rotary drilling up to 1000ft. Includes lithology logging compatible with AquaGrid aquifer mapping.',
    imageIcon: <Wrench className="w-8 h-8 text-slate-600" />,
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    verified: false,
  },

  // Digital & APIs
  {
    id: 'dig-001',
    name: 'ECMWF Advanced Weather Hook',
    provider: 'Euro Weather API',
    category: 'digital',
    type: 'Software Add-on',
    rating: 5.0,
    price: '$49 / month',
    description: 'High-resolution 10-day precipitation forecasts. Plugs directly into the AquaGrid Autopilot for irrigation pausing.',
    imageIcon: <CloudRain className="w-8 h-8 text-cyan-500" />,
    imageUrl: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&q=80',
    verified: true,
  },
]

const MarketplacePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.provider.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Ecosystem Marketplace</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Procure Franklin OEM hardware, source local installation partners, buy auxiliary components, and integrate 3rd-party data APIs directly into your AquaGrid environment.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search products or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeCategory === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveCategory('franklin')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeCategory === 'franklin' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-blue-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Franklin Electric OEM
          </button>
          <button
            onClick={() => setActiveCategory('auxiliary')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeCategory === 'auxiliary' 
                ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Auxiliary Components
          </button>
          <button
            onClick={() => setActiveCategory('services')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeCategory === 'services' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Field Services (Local)
          </button>
          <button
            onClick={() => setActiveCategory('digital')}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              activeCategory === 'digital' 
                ? 'bg-cyan-600 text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Digital APIs & Data
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            
            {/* Product Image */}
            {item.imageUrl && (
              <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                {/* Category Badge overlay on image */}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-white text-xs font-bold px-2 py-1 rounded shadow-sm border border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                  {item.type}
                </div>
              </div>
            )}

            <div className="p-5 flex-1">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${!item.imageUrl ? 'bg-slate-50 dark:bg-slate-900/50' : 'bg-transparent -mt-10 mb-2 bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700'}`}>
                  {item.imageIcon}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{item.price}</span>
                  {!item.imageUrl && <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.type}</span>}
                </div>
              </div>
              
              <div className="mt-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h3>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.provider}</span>
                  {item.verified && (
                    <span className="flex items-center text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 px-1.5 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3 mr-0.5" />
                      Verified Partner
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-2 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.rating}</span>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700/50 flex gap-3">
              <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                View Details
              </button>
              <button className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                {item.category === 'digital' ? 'Subscribe' : 'Procure'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-12 text-center">
          <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No items found</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  )
}

export default MarketplacePage