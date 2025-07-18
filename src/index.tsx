import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'   // or 'react-dom' if you’re not on React 18+
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)