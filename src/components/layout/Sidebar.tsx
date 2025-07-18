import React from 'react'
import { Nav } from 'react-bootstrap'
import { FaBuilding, FaBolt } from 'react-icons/fa'

// Sidebar link data
const navItems = [
  { path: '/companies', Icon: FaBuilding, label: 'Companies' },
  { path: '/integrations', Icon: FaBolt,     label: 'Integrations' },
]

function SidebarLink({
  to,
  Icon,
  label,
  active,
}: {
  to: string
  Icon: React.ComponentType<{ size?: number }>
  label: string
  active: boolean
}) {
  return (
    <Nav.Link
      href={to}
      className="
        d-flex 
        flex-column 
        align-items-center 
        justify-content-center 
        py-3 
        w-100              
      "
      style={{
        color: active ? '#FFC107' : '#FFF',
        border: 'none',
        textDecoration: 'none',
        textAlign: 'center', 
      }}
    >
      <Icon size={20} />
      <span style={{ fontSize: 12, marginTop: 4 }}>{label}</span>
    </Nav.Link>
  )
}

const Sidebar: React.FC = () => {
  const currentPath = window.location.pathname

  return (
    <div
      style={{
        backgroundColor: '#10475E',
        width: '80px',       
        height: '100vh',
      }}
      className="
        d-flex
        flex-column
        align-items-center
        p-0"
    >
      <Nav
        className="
          flex-column 
          gap-2 
          mt-4 
          w-100           
        "
      >
        {navItems.map(({ path, Icon, label }) => (
          <SidebarLink
            key={path}
            to={path}
            Icon={Icon}
            label={label}
            active={currentPath === path}
          />
        ))}
      </Nav>
    </div>
  )
}

export default Sidebar
