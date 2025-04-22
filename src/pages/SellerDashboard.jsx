import React from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBoxOpen, faListAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const navigate = useNavigate();

  // Sample data for dashboard
  const recentOrders = [
    { id: '1243', customer: 'John Smith', date: '2023-06-10', status: 'Shipped', amount: 799.99 },
    { id: '1242', customer: 'Sarah Johnson', date: '2023-06-09', status: 'Processing', amount: 349.99 },
    { id: '1241', customer: 'Mike Williams', date: '2023-06-08', status: 'Delivered', amount: 499.99 },
  ];

  const inventoryAlerts = [
    { id: 3, name: 'Urban Minimalist', stock: 2 },
    { id: 7, name: 'Professional Dark', stock: 3 },
  ];

  const handleLogout = () => {
    // In a real app, you would clear auth tokens, user state, etc.
    console.log('Seller logged out');
    
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="bg-white py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Seller Dashboard</h2>
          <div className="d-flex gap-2">
            <Link to="/seller/add-product" className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Product
            </Link>
            <Button variant="outline-secondary" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
            </Button>
          </div>
        </div>

        {/* Key Stats */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="border mb-3">
              <Card.Body className="text-center">
                <h3>$24,950</h3>
                <p className="text-muted mb-0">Total Sales</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border mb-3">
              <Card.Body className="text-center">
                <h3>42</h3>
                <p className="text-muted mb-0">Orders</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border mb-3">
              <Card.Body className="text-center">
                <h3>12</h3>
                <p className="text-muted mb-0">Products</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Recent Orders */}
          <Col lg={7} className="mb-4">
            <Card className="border">
              <Card.Header className="bg-white">
                <h5>Recent Orders</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.date}</td>
                        <td>{order.status}</td>
                        <td>${order.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          {/* Inventory Alerts */}
          <Col lg={5} className="mb-4">
            <Card className="border">
              <Card.Header className="bg-white">
                <h5>Low Stock Items</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Product</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryAlerts.map((alert) => (
                      <tr key={alert.id}>
                        <td>{alert.name}</td>
                        <td>{alert.stock} units</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Links */}
        <div className="d-flex gap-2 mb-4">
          <Link to="/seller/add-product" className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Product
          </Link>
          <Link to="/seller/inventory" className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Inventory
          </Link>
          <Link to="/seller/orders" className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faListAlt} className="me-2" /> Orders
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default SellerDashboard; 