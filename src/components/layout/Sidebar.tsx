// src/components/layout/Sidebar.tsx
import React from 'react'
import { Nav } from 'react-bootstrap'
import { FaBuilding, FaBolt } from 'react-icons/fa'

const Sidebar: React.FC = () => {
  const pathname = window.location.pathname

  const links = [
    { to: '/companies',    Icon: FaBuilding, label: 'Companies' },
    { to: '/integrations', Icon: FaBolt,     label: 'Integrations' },
  ]

  return (
    <div
      style={{ backgroundColor: '#10475E', width: 80, height: '100vh' }}
      className="d-flex flex-column align-items-center p-0"
    >
      <Nav className="flex-column gap-1 mt-4 w-100">
        {links.map(({ to, Icon, label }) => {
          const isActive = pathname === to
          return (
            <Nav.Link
              key={to}
              href={to}
              className="d-flex flex-column align-items-center justify-content-center py-3 px-0"
              style={{
                color: isActive ? '#FFC107' : '#FFFFFF',
                border: 'none',
                textDecoration: 'none',
              }}
            >
              <Icon size={20} />
              <span style={{ fontSize: 12, marginTop: 2 }}>
                {label}
              </span>
            </Nav.Link>
          )
        })}
      </Nav>
    </div>
  )
}

export default Sidebar
