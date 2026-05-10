import React from 'react'

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Configure your AquaGrid preferences
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <p className="text-slate-500 dark:text-slate-400">Settings interface coming soon...</p>
      </div>
    </div>
  )
}

export default SettingsPage
