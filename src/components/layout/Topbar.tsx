import React from 'react'
import { Navbar, Container, Image } from 'react-bootstrap'
import logoImage from '../../assets/logo.png'
import './Topbar.css'

const UserAvatar: React.FC<{ initials: string }> = ({ initials }) => (
  <div
    className="
      rounded-circle
      bg-primary
      text-white
      d-flex
      justify-content-center
      align-items-center"

    style={{
      width: 32,  
      height: 32, 
      fontSize: 14,
      fontWeight: 500,
    }}
  >
    {initials}
  </div>
)

const Topbar: React.FC = () => {
  const userInitials = 'MS'

  return (
    <Navbar
      bg="light"
      className="
        shadow-sm
        px-4
        topbar"
    >
      <Container fluid className="
        px-0
        d-flex
        align-items-center">

      <Navbar.Brand className="
        d-flexalign-items-center
        mb-0">
          <Image
            src={logoImage}
            height={24}
            alt="AppLogo"
          />
      </Navbar.Brand>

        <div className="flex-grow-1" />

        <UserAvatar initials={userInitials} />
      </Container>
    </Navbar>
  )
}

export default Topbar
