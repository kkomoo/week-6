import React from 'react';
import { Container, Card, Table, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faBoxOpen, 
  faSignOutAlt,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
  faHistory,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const navigate = useNavigate();

  // Sample inventory data
  const inventoryItems = [
    { id: 1, name: 'Luxury Watch A', stock: 5, status: 'Low Stock', lastUpdated: '2024-03-15' },
    { id: 2, name: 'Premium Watch B', stock: 0, status: 'Out of Stock', lastUpdated: '2024-03-14' },
    { id: 3, name: 'Classic Watch C', stock: 15, status: 'In Stock', lastUpdated: '2024-03-13' },
    { id: 4, name: 'Smart Watch D', stock: 3, status: 'Low Stock', lastUpdated: '2024-03-15' },
    { id: 5, name: 'Designer Watch E', stock: 8, status: 'In Stock', lastUpdated: '2024-03-12' }
  ];

  // Sample sales history data
  const salesHistory = [
    { id: 1, product: 'Luxury Watch A', date: '2024-03-15', price: 599.99, status: 'Delivered' },
    { id: 2, product: 'Premium Watch B', date: '2024-03-14', price: 499.99, status: 'Shipped' },
    { id: 3, product: 'Classic Watch C', date: '2024-03-13', price: 299.99, status: 'Processing' },
    { id: 4, product: 'Smart Watch D', date: '2024-03-12', price: 399.99, status: 'Delivered' },
    { id: 5, product: 'Designer Watch E', date: '2024-03-11', price: 699.99, status: 'Delivered' }
  ];

  const handleLogout = () => {
    console.log('Seller logged out');
    navigate('/login');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Out of Stock':
        return <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />;
      case 'Low Stock':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-warning" />;
      case 'In Stock':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Out of Stock':
        return 'text-danger';
      case 'Low Stock':
        return 'text-warning';
      case 'In Stock':
        return 'text-success';
      default:
        return '';
    }
  };

  const getOrderStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-success';
      case 'Shipped':
        return 'text-primary';
      case 'Processing':
        return 'text-warning';
      default:
        return '';
    }
  };

  // Calculate total sales
  const totalSales = salesHistory.reduce((sum, sale) => sum + sale.price, 0);

  return (
    <div className="min-vh-100 bg-white">
      <Container fluid className="px-4 py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="mb-1 fw-bold">Seller Dashboard</h4>
            <p className="text-muted mb-0">Monitor your inventory and sales performance</p>
          </div>
          <div className="d-flex gap-3">
            <Button 
              variant="primary" 
              className="d-flex align-items-center px-3 rounded-pill"
              as={Link} 
              to="/seller/add-product"
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              New Product
            </Button>
            <Button 
              variant="light" 
              className="d-flex align-items-center rounded-pill border-0"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <Row className="g-3 mb-4">
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-3 bg-success bg-opacity-10 me-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                  </div>
                  <div>
                    <h6 className="mb-1">In Stock Items</h6>
                    <h4 className="mb-0 fw-bold">
                      {inventoryItems.filter(item => item.status === 'In Stock').length}
                    </h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-3 bg-warning bg-opacity-10 me-3">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-warning" />
                  </div>
                  <div>
                    <h6 className="mb-1">Low Stock Items</h6>
                    <h4 className="mb-0 fw-bold">
                      {inventoryItems.filter(item => item.status === 'Low Stock').length}
                    </h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-3 bg-danger bg-opacity-10 me-3">
                    <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
                  </div>
                  <div>
                    <h6 className="mb-1">Out of Stock</h6>
                    <h4 className="mb-0 fw-bold">
                      {inventoryItems.filter(item => item.status === 'Out of Stock').length}
                    </h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-3 bg-primary bg-opacity-10 me-3">
                    <FontAwesomeIcon icon={faDollarSign} className="text-primary" />
                  </div>
                  <div>
                    <h6 className="mb-1">Total Sales</h6>
                    <h4 className="mb-0 fw-bold">
                      ${totalSales.toFixed(2)}
                    </h4>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Inventory Table */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">
                <FontAwesomeIcon icon={faBoxOpen} className="me-2 text-primary" />
                Inventory Status
              </h5>
            </div>
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 ps-4">Product</th>
                    <th className="border-0">Stock Level</th>
                    <th className="border-0">Status</th>
                    <th className="border-0">Last Updated</th>
                    <th className="border-0 text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-4">
                        <p className="mb-0 fw-medium">{item.name}</p>
                      </td>
                      <td>
                        <span className="fw-medium">{item.stock}</span> units
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {getStatusIcon(item.status)}
                          <span className={`ms-2 ${getStatusClass(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td>{item.lastUpdated}</td>
                      <td className="text-end pe-4">
                        <Button 
                          variant="light"
                          size="sm"
                          className="rounded-pill px-3 border"
                          onClick={() => navigate(`/seller/inventory/edit/${item.id}`)}
                        >
                          Update Stock
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Sales History */}
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">
                <FontAwesomeIcon icon={faHistory} className="me-2 text-primary" />
                Recent Sales History
              </h5>
            </div>
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 ps-4">Product</th>
                    <th className="border-0">Date</th>
                    <th className="border-0">Price</th>
                    <th className="border-0 pe-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesHistory.map((sale) => (
                    <tr key={sale.id}>
                      <td className="ps-4">
                        <p className="mb-0 fw-medium">{sale.product}</p>
                      </td>
                      <td>{sale.date}</td>
                      <td>${sale.price.toFixed(2)}</td>
                      <td className={`pe-4 ${getOrderStatusClass(sale.status)}`}>
                        {sale.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default SellerDashboard; 