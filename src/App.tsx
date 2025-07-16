// src/App.tsx
import React from 'react';
import Layout from './components/Layout';
import CompaniesPage from './pages/companies/CompaniesPage';

function App() {
  return (
    <Layout>
      <CompaniesPage />
    </Layout>
  );
}

export default App;