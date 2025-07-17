// src/App.tsx
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import CompaniesPage from './pages/companies/CompaniesPage'
import IntegrationsPage from './pages/integrations/IntegrationsPage'

function TitleUpdater() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname.startsWith('/integrations')) {
      document.title = 'Integrations'
    } else if (pathname.startsWith('/companies')) {
      document.title = 'Companies'
    } else {
      document.title = 'SaaS Console'
    }
  }, [pathname])
  return null
}

const App: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <TitleUpdater />
      <Routes>
        <Route path="/companies"    element={<CompaniesPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="*"              element={<Navigate to="/companies" replace />} />
      </Routes>
    </Layout>
  </BrowserRouter>
)

export default App
