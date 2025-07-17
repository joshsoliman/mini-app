import React from 'react'
import { Navbar, Container, Image } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import './Topbar.css'

const Topbar: React.FC = () => (
  <Navbar bg="light" className="shadow-sm px-4 topbar">
    <Container fluid className="px-0 d-flex align-items-center">
      {/* logo on the left */}
      <Navbar.Brand className="d-flex align-items-center mb-0">
        <Image src={logo} height={24} alt="SaaSConsole" />
      </Navbar.Brand>

      {/* spacer */}
      <div className="flex-grow-1" />

      {/* user avatar on the right */}
      <div
        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
        style={{ width: 32, height: 32 }}
      >
        MS
      </div>
    </Container>
  </Navbar>
)

export default Topbar
