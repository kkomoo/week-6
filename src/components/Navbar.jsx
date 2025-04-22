import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faShoppingCart, 
  faStore,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSellerPage = location.pathname.startsWith('/seller');

  const handleLogout = () => {
    // In a real app, you would clear auth tokens, user state, etc.
    console.log('User logged out');
    
    // Navigate to login page
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold">
          CHRONOSPHERE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home">
              <FontAwesomeIcon icon={faHome} className="me-2" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/seller/dashboard" className={isSellerPage ? 'active' : ''}>
              <FontAwesomeIcon icon={faStore} className="me-2" /> Seller
            </Nav.Link>
            <Button 
              variant="outline-secondary" 
              size="sm" 
              className="ms-2 d-flex align-items-center"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 