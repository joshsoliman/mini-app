// Layout.tsx
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Sidebar from './layout/Sidebar'
import logo from '../assets/logo.png'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
    {/* Topbar spans full width and has zero horizontal padding */}
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm px-0"
      style={{ height: 60 }}
    >
      <Container
        fluid
        className="d-flex align-items-center justify-content-between px-0"
      >
        {/* Brand with extra left margin (ms-3 ≈ 1rem / 16px) */}
        <Navbar.Brand href="/" className="p-0 m-0 ms-4">
          <img src={logo} alt="SaaSConsole" height={28} />
        </Navbar.Brand>

        {/* Avatar on the right */}
        <Nav className="pe-3">
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
            style={{ width: 32, height: 32 }}
          >
            MS
          </div>
        </Nav>
      </Container>
    </Navbar>

    {/* Sidebar + content */}
    <div className="d-flex flex-grow-1">
      <Sidebar />

      <Container fluid className="pt-4 px-4">
        {children}
      </Container>
    </div>
  </div>
)

export default Layout
