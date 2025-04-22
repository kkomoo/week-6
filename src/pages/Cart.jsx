import React, { useState } from 'react';
import { Container, Table, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus, faArrowLeft, faCreditCard, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Sample cart data updated with real watch images
const initialCartItems = [
  {
    id: 5,
    name: 'Luxury Gold',
    price: 599.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=100&h=100&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Urban Minimalist',
    price: 199.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=100&h=100&auto=format&fit=crop'
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.07; // 7% tax
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? 15.00 : 0; // $15 flat shipping
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  return (
    <div className="bg-light py-5 min-vh-100">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Shopping Cart</h2>
          <Link to="/home" className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center py-5">
              <div className="mb-4">
                <FontAwesomeIcon icon={faShoppingCart} size="4x" className="text-muted mb-4" />
              </div>
              <h3 className="mb-3">Your cart is empty</h3>
              <p className="text-muted mb-4">Looks like you haven't added any watches to your cart yet.</p>
              <Link to="/home" className="btn btn-primary btn-lg px-5 py-3">
                Browse Collection
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            <Col lg={8} className="mb-4 mb-lg-0">
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <Table responsive className="table-borderless align-middle">
                    <thead className="text-muted small">
                      <tr>
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="rounded"
                                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                              />
                              <div className="ms-3">
                                <h6 className="mb-0">{item.name}</h6>
                                <Badge bg="secondary" className="mt-1">Watch</Badge>
                              </div>
                            </div>
                          </td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="light"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="rounded-circle p-1"
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </Button>
                              <span className="mx-3 fw-bold">{item.quantity}</span>
                              <Button
                                variant="light"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="rounded-circle p-1"
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </Button>
                            </div>
                          </td>
                          <td className="fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <Button
                              variant="link"
                              className="text-danger p-0"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h5 className="fw-bold mb-4">Order Summary</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tax (7%)</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Shipping</span>
                    <span>${calculateShipping().toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold h5 mb-0">${calculateTotal().toFixed(2)}</span>
                  </div>
                  <Button variant="dark" className="w-100 py-2 mb-3">
                    <FontAwesomeIcon icon={faCreditCard} className="me-2" /> Checkout
                  </Button>
                  <div className="text-center">
                    <small className="text-muted">Secure Checkout. Free returns within 30 days.</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart; 