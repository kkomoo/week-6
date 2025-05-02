import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave, faImage } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    quantity: '',
    isNew: false,
    imageFile: null,
    imagePreview: null
  });

  useEffect(() => {
    // Check if user is logged in and is a seller
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      // Redirect if not a seller
      if (userData.role !== 'seller') {
        navigate('/home');
      }
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [navigate]);

  const categories = [
    'Luxury',
    'Sports',
    'Smart',
    'Classic',
    'Vintage',
    'Professional',
    'Minimalist'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: val
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (!user) {
      setError('You must be logged in as a seller to add products');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare data for API
      const productData = {
        product_name: formData.name,
        product_desc: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.quantity, 10),
        seller_id: user.user_id
      };

      // Send data to API
      const response = await fetch('http://localhost/week-6/api/controllers/create_product.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message
        setShowSuccess(true);

        // Reset form after successful submission
        setFormData({
          name: '',
          price: '',
          description: '',
          category: '',
          quantity: '',
          isNew: false,
          imageFile: null,
          imagePreview: null
        });
        setValidated(false);

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        setError(data.message || 'Failed to add product. Please try again.');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Add New Product</h2>
          <Link to="/seller/dashboard" className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
          </Link>
        </div>

        {showSuccess && (
          <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
            Product has been successfully added!
          </Alert>
        )}

        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Price ($)</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.toLowerCase()}>
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Product description"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity in Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                  min="0"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Mark as New Arrival"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                {formData.imagePreview && (
                  <div className="mb-3">
                    <img
                      src={formData.imagePreview}
                      alt="Product preview"
                      className="img-thumbnail mb-2"
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <Form.Control
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  required={!formData.imagePreview}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} className="me-2" /> Save Product
                </>
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddProduct;