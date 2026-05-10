import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import Layout from '@/components/Layout'
import LoadingSpinner from '@/components/LoadingSpinner'
import PublicPage from '@/pages/PublicPage'
import BusinessCasePage from '@/pages/BusinessCasePage'

// Lazy load pages for code splitting
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const GlobalTwinPage = lazy(() => import('@/pages/GlobalTwinPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const AssetsPage = lazy(() => import('@/pages/AssetsPage'))
const DigitalTwinPage = lazy(() => import('@/pages/DigitalTwinPage'))
const MarketplacePage = lazy(() => import('@/pages/MarketplacePage'))
const GrowthPage = lazy(() => import('@/pages/GrowthPage'))
const CompliancePage = lazy(() => import('@/pages/CompliancePage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))

function App() {
  const { isAuthenticated } = useAuthStore()
  const { resolvedTheme } = useThemeStore()

  // Apply theme to document
  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedTheme)
  }, [resolvedTheme])

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicPage />} />
          <Route path="/business-case" element={<BusinessCasePage />} />
          <Route
            path="/global-twin"
            element={
              <Suspense fallback={<LoadingSpinner className="min-h-screen" />}>
                <GlobalTwinPage />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Suspense fallback={<LoadingSpinner className="min-h-screen" />}>
                  <LoginPage />
                </Suspense>
              )
            }
          />

          {/* Protected routes */}
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/assets" element={<AssetsPage />} />
                      <Route path="/digital-twin" element={<DigitalTwinPage />} />
                      <Route path="/marketplace" element={<MarketplacePage />} />
                      <Route path="/growth" element={<GrowthPage />} />
                      <Route path="/compliance" element={<CompliancePage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                  </Suspense>
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
