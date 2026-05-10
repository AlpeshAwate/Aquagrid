import React from 'react'
import AssetRegister from '@/components/AssetRegister'

const AssetsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Assets</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage and monitor your water infrastructure assets across the world
          </p>
        </div>
      </div>

      <AssetRegister />
    </div>
  )
}

export default AssetsPage
