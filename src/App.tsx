import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Layout } from '@/components/Layout/Layout'
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute'
import { Dashboard } from '@/pages/Dashboard'
import { CreateSegment } from '@/pages/CreateSegment'
import { CampaignHistory } from '@/pages/CampaignHistory'
import { Login } from '@/pages/Login'

const queryClient = new QueryClient()

// Navigation items for consistent menu rendering
const navigationItems = [
  { name: 'Dashboard', href: '/' },
  { name: 'Create Segment', href: '/create-segment' },
  { name: 'Campaigns', href: '/campaigns' }
]

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout navigationItems={navigationItems}>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-segment"
              element={
                <ProtectedRoute>
                  <Layout navigationItems={navigationItems}>
                    <CreateSegment />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns"
              element={
                <ProtectedRoute>
                  <Layout navigationItems={navigationItems}>
                    <CampaignHistory />
                  </Layout>
                </ProtectedRoute>
              }
            />
            {/* Redirect all unknown paths to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App