import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';

// Watch images for fallback
import classicSilver from '../assets/watches/classic-silver.jpg';
import diverPro from '../assets/watches/diver-pro.jpg';
import urbanMinimalist from '../assets/watches/urban-minimalist.jpg';
import heroImage from '../assets/watches/hero-image.jpg';

// Image mapping for products
const productImages = {
  'Classic Silver': classicSilver,
  'Diver Pro': diverPro,
  'Urban Minimalist': urbanMinimalist,
  // Add more mappings as needed
};

// Default image for products without a specific image
const defaultImage = classicSilver;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/week-6/api/controllers/read_products.php');
        const data = await response.json();

        if (response.ok && data.records) {
          // Transform API data to match our component needs
          const formattedProducts = data.records.map(product => ({
            id: product.product_id,
            name: product.product_name,
            price: parseFloat(product.price),
            image: productImages[product.product_name] || defaultImage,
            description: product.product_desc,
            rating: 4.5, // Default rating since API doesn't provide it
            isNew: new Date(product.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // New if created in last 7 days
            stock: product.stock_quantity,
            seller: product.seller_name
          }));

          setProducts(formattedProducts);
        } else {
          // If no products found, use empty array
          setProducts([]);
          if (!response.ok) {
            setError('Failed to load products. Please try again later.');
          }
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (!user) {
      // Redirect to login if not logged in
      window.location.href = '/login';
      return;
    }

    try {
      const response = await fetch('http://localhost/week-6/api/controllers/add_to_cart.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.user_id,
          product_id: product.id,
          quantity: 1
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Product added to cart!');
      } else {
        alert(data.message || 'Failed to add product to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Network error. Please try again later.');
    }
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
              {user && (
                <p className="mt-3">
                  Welcome back, <span className="fw-bold">{user.username}</span>!
                </p>
              )}
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

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <Alert variant="info">
            No products available at the moment. Please check back later.
          </Alert>
        ) : (
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
                    {product.stock <= 5 && product.stock > 0 && (
                      <Badge
                        bg="warning"
                        text="dark"
                        className="position-absolute top-0 start-0 m-2"
                      >
                        Only {product.stock} left
                      </Badge>
                    )}
                    {product.stock === 0 && (
                      <Badge
                        bg="secondary"
                        className="position-absolute top-0 start-0 m-2"
                      >
                        Out of Stock
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
                    <Card.Text className="text-muted small mb-1">{product.description}</Card.Text>
                    <Card.Text className="text-muted small mb-3">
                      <small>Seller: {product.seller}</small>
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="h5 fw-bold mb-0">${product.price.toFixed(2)}</span>
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="rounded-pill px-3"
                        disabled={product.stock === 0 || !user}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
                        {!user ? 'Login to Buy' : product.stock === 0 ? 'Sold Out' : 'Add'}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;