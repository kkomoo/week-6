import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';

// Watch images
import classicSilver from '../assets/watches/classic-silver.jpg';
import diverPro from '../assets/watches/diver-pro.jpg';
import urbanMinimalist from '../assets/watches/urban-minimalist.jpg';
import sportsChrono from '../assets/watches/sports-chrono.jpg';
import luxuryGold from '../assets/watches/luxury-gold.jpg';
import smartDigital from '../assets/watches/smart-digital.jpg';
import professionalDark from '../assets/watches/professional-dark.jpg';
import vintageBrown from '../assets/watches/vintage-brown.jpg';
import roseGold from '../assets/watches/rose-gold.jpg';
import titaniumPro from '../assets/watches/titanium-pro.jpg';
import lunarWhite from '../assets/watches/lunar-white.jpg';
import aviatorChronograph from '../assets/watches/aviator-chronograph.jpg';
import heroImage from '../assets/watches/hero-image.jpg';

// Updated product list with local watch images
const products = [
  {
    id: 1,
    name: 'Classic Silver',
    price: 249.99,
    image: classicSilver,
    description: 'Elegant silver watch with leather strap',
    rating: 4.5,
    isNew: true
  },
  {
    id: 2,
    name: 'Diver Pro',
    price: 399.99,
    image: diverPro,
    description: 'Water resistant watch for diving enthusiasts',
    rating: 4.8,
    isNew: false
  },
  {
    id: 3,
    name: 'Urban Minimalist',
    price: 199.99,
    image: urbanMinimalist,
    description: 'Sleek and minimal design for everyday wear',
    rating: 4.3,
    isNew: true
  },
  {
    id: 4,
    name: 'Sports Chrono',
    price: 299.99,
    image: sportsChrono,
    description: 'Sports watch with chronograph functionality',
    rating: 4.7,
    isNew: false
  },
  {
    id: 5,
    name: 'Luxury Gold',
    price: 599.99,
    image: luxuryGold,
    description: 'Premium gold-plated watch with sapphire crystal',
    rating: 4.9,
    isNew: true
  },
  {
    id: 6,
    name: 'Smart Digital',
    price: 349.99,
    image: smartDigital,
    description: 'Smart watch with health monitoring features',
    rating: 4.6,
    isNew: false
  },
  {
    id: 7,
    name: 'Professional Dark',
    price: 449.99,
    image: professionalDark,
    description: 'Sophisticated black watch for professionals',
    rating: 4.4,
    isNew: false
  },
  {
    id: 8,
    name: 'Vintage Brown',
    price: 279.99,
    image: vintageBrown,
    description: 'Vintage-inspired design with modern technology',
    rating: 4.2,
    isNew: false
  },
  {
    id: 9,
    name: 'Rose Gold',
    price: 499.99,
    image: roseGold,
    description: 'Elegant rose gold watch with diamond accents',
    rating: 4.8,
    isNew: true
  },
  {
    id: 10,
    name: 'Titanium Pro',
    price: 599.99,
    image: titaniumPro,
    description: 'Lightweight titanium watch for active lifestyles',
    rating: 4.7,
    isNew: false
  },
  {
    id: 11,
    name: 'Lunar White',
    price: 329.99,
    image: lunarWhite,
    description: 'Clean white ceramic watch with moon phase display',
    rating: 4.5,
    isNew: false
  },
  {
    id: 12,
    name: 'Aviator Chronograph',
    price: 549.99,
    image: aviatorChronograph,
    description: 'Pilot-inspired chronograph with tachymeter',
    rating: 4.6,
    isNew: true
  }
];

const Home = () => {
  const handleAddToCart = (product) => {
    // In a real app, you would manage cart state here
    console.log('Added to cart:', product);
  };

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <div className="bg-dark text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-3">Timeless Elegance</h1>
              <p className="lead">Discover our premium collection of luxury watches. Crafted with precision and designed for distinction.</p>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className="hero-image-container" style={{ maxHeight: '400px', overflow: 'hidden' }}>
                <img 
                  src={heroImage}
                  alt="Luxury watches" 
                  className="img-fluid rounded shadow"
                  style={{ width: '100%', height: '400px', objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        <h2 className="fw-bold mb-4 border-bottom pb-3">Featured Watches</h2>
        
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 border-0 shadow-sm">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    alt={product.name} 
                    className="img-fluid"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  {product.isNew && (
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 end-0 m-2"
                    >
                      New
                    </Badge>
                  )}
                </div>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="h5 mb-0">{product.name}</Card.Title>
                    <span className="text-warning">
                      <FontAwesomeIcon icon={faStar} /> {product.rating}
                    </span>
                  </div>
                  <Card.Text className="text-muted small mb-3">{product.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="h5 fw-bold mb-0">${product.price}</span>
                    <Button 
                      variant="outline-dark" 
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="rounded-pill px-3"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> Add
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home; 