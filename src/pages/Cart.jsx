import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card, Row, Col, Badge, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus, faArrowLeft, faCreditCard, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

// Default image for products
import defaultImage from '../assets/watches/classic-silver.jpg';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      // Fetch cart data
      fetchCartItems(userData.user_id);
    } else {
      // Redirect to login if not logged in
      setLoading(false);
      setError('Please log in to view your cart');
    }
  }, [navigate]);

  const fetchCartItems = async (userId) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost/week-6/api/controllers/read_cart.php?user_id=${userId}`);
      const data = await response.json();

      if (response.ok && data.records) {
        // Transform API data to match our component needs
        const formattedCartItems = data.records.map(item => ({
          id: item.cart_id,
          productId: item.product_id,
          name: item.product_name,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity, 10),
          image: defaultImage, // Use default image for now
          description: item.product_desc
        }));

        setCartItems(formattedCartItems);
      } else {
        // If no cart items found, use empty array
        setCartItems([]);
        if (!response.ok) {
          setError('Failed to load cart items. Please try again later.');
        }
      }
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (id, change, currentQuantity) => {
    if (updating) return;

    const newQuantity = Math.max(1, currentQuantity + change);

    // Optimistically update UI
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );

    setUpdating(true);

    try {
      const response = await fetch('http://localhost/week-6/api/controllers/update_cart.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart_id: id,
          user_id: user.user_id,
          quantity: newQuantity
        })
      });

      if (!response.ok) {
        // If update fails, revert to original cart data
        fetchCartItems(user.user_id);
        setError('Failed to update quantity. Please try again.');
      }
    } catch (err) {
      console.error('Error updating cart:', err);
      // If update fails, revert to original cart data
      fetchCartItems(user.user_id);
      setError('Network error. Please try again later.');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (id) => {
    if (updating) return;

    // Optimistically update UI
    setCartItems(items => items.filter(item => item.id !== id));

    setUpdating(true);

    try {
      const response = await fetch('http://localhost/week-6/api/controllers/remove_from_cart.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart_id: id,
          user_id: user.user_id
        })
      });

      if (!response.ok) {
        // If delete fails, revert to original cart data
        fetchCartItems(user.user_id);
        setError('Failed to remove item. Please try again.');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      // If delete fails, revert to original cart data
      fetchCartItems(user.user_id);
      setError('Network error. Please try again later.');
    } finally {
      setUpdating(false);
    }
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

  const handleCheckout = async () => {
    if (updating || cartItems.length === 0) return;

    setUpdating(true);
    setError('');

    try {
      // Prepare order data
      const orderData = {
        user_id: user.user_id,
        total_amount: calculateTotal(),
        shipping_address: "Default shipping address", // In a real app, you would get this from a form
        cart_items: cartItems.map(item => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      };

      // Create order
      const response = await fetch('http://localhost/week-6/api/controllers/create_order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message and redirect
        alert('Order placed successfully!');
        navigate('/home');
      } else {
        setError(data.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Network error. Please try again later.');
    } finally {
      setUpdating(false);
    }
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

        {error && (
          <Alert variant="danger" className="mb-4" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading your cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
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
                                onClick={() => handleQuantityChange(item.id, -1, item.quantity)}
                                className="rounded-circle p-1"
                                disabled={updating}
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </Button>
                              <span className="mx-3 fw-bold">{item.quantity}</span>
                              <Button
                                variant="light"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, 1, item.quantity)}
                                className="rounded-circle p-1"
                                disabled={updating}
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