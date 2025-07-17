// src/pages/integrations/IntegrationsPage.tsx
import React, { useEffect } from 'react'

const IntegrationsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Integrations'
  }, [])

  return (
    <div className="p-4">
      <h2>Integrations</h2>
      {/* ... */}
    </div>
  )
}

export default IntegrationsPage
