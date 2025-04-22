import React, { useState } from 'react';
import { Container, Table, Button, Form, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faSearch, 
  faPlus, 
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Import the same watch images used in the Home component
import classicSilver from '../assets/watches/classic-silver.jpg';
import diverPro from '../assets/watches/diver-pro.jpg';
import urbanMinimalist from '../assets/watches/urban-minimalist.jpg';
import sportsChrono from '../assets/watches/sports-chrono.jpg';
import luxuryGold from '../assets/watches/luxury-gold.jpg';
import smartDigital from '../assets/watches/smart-digital.jpg';

const SellerInventory = () => {
  // Sample inventory data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Classic Silver',
      price: 249.99,
      image: classicSilver,
      category: 'Classic',
      stock: 15,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Diver Pro',
      price: 399.99,
      image: diverPro,
      category: 'Sports',
      stock: 8,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Urban Minimalist',
      price: 199.99,
      image: urbanMinimalist,
      category: 'Minimalist',
      stock: 2,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Sports Chrono',
      price: 299.99,
      image: sportsChrono,
      category: 'Sports',
      stock: 10,
      status: 'Active'
    },
    {
      id: 5,
      name: 'Luxury Gold',
      price: 599.99,
      image: luxuryGold,
      category: 'Luxury',
      stock: 5,
      status: 'Active'
    },
    {
      id: 6,
      name: 'Smart Digital',
      price: 349.99,
      image: smartDigital,
      category: 'Smart',
      stock: 0,
      status: 'Out of Stock'
    }
  ]);

  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Filter products
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle product deletion
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setShowDeleteModal(false);
  };

  // Update product stock quantity
  const handleStockChange = (id, newStock) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { 
            ...product, 
            stock: parseInt(newStock, 10), 
            status: parseInt(newStock, 10) > 0 ? 'Active' : 'Out of Stock'
          } 
        : product
    ));
  };

  return (
    <div className="bg-white py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Inventory</h2>
          <div>
            <Link to="/seller/dashboard" className="btn btn-outline-dark me-2">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Dashboard
            </Link>
            <Link to="/seller/add-product" className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Product
            </Link>
          </div>
        </div>

        <Row className="mb-4">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <Table responsive hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="rounded"
                        width="40"
                        height="40"
                        style={{ objectFit: 'cover' }}
                      />
                      <span className="ms-3">{product.name}</span>
                    </div>
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>
                    <InputGroup size="sm" style={{ width: '100px' }}>
                      <Form.Control
                        type="number"
                        min="0"
                        value={product.stock}
                        onChange={(e) => handleStockChange(product.id, e.target.value)}
                      />
                    </InputGroup>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button variant="outline-primary" size="sm" as={Link} to={`/seller/products/${product.id}/edit`}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  <p className="mb-0">No products found</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        
        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete 
            {productToDelete && <strong> "{productToDelete.name}"</strong>}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default SellerInventory; 