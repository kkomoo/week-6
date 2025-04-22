import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faUser, 
  faEnvelope, 
  faLock, 
  faPhone, 
  faLocationDot,
  faSignature
} from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    contact_number: '',
    email_address: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-dark py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <div className="text-center mb-4">
              <FontAwesomeIcon 
                icon={faClock} 
                className="text-warning"
                style={{ fontSize: '3.5rem' }}
              />
              <h1 className="mt-3 mb-2 fw-bold text-white display-5">CHRONOSPHERE</h1>
              <p className="text-light mb-4 lead">Join Our Exclusive Collection</p>
            </div>

            <Card className="bg-dark text-white border border-secondary shadow">
              <Card.Body className="p-4">
                {error && <Alert variant="danger">{error}</Alert>}
                <h3 className="text-center mb-4 fw-light">Create Your Account</h3>
                
                <Form onSubmit={handleSubmit}>
                  {/* Account Information */}
                  <h6 className="text-warning mb-3 fw-bold">Account Information</h6>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faUser} className="text-warning me-2" />
                          <Form.Label className="mb-0 text-light">Username</Form.Label>
                        </div>
                        <Form.Control
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Choose username"
                          className="bg-dark border-secondary text-white py-2"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faEnvelope} className="text-warning me-2" />
                          <Form.Label className="mb-0 text-light">Email Address</Form.Label>
                        </div>
                        <Form.Control
                          type="email"
                          name="email_address"
                          value={formData.email_address}
                          onChange={handleChange}
                          placeholder="Enter email"
                          className="bg-dark border-secondary text-white py-2"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faLock} className="text-warning me-2" />
                          <Form.Label className="mb-0 text-light">Password</Form.Label>
                        </div>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create password"
                          className="bg-dark border-secondary text-white py-2"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faLock} className="text-warning me-2" />
                          <Form.Label className="mb-0 text-light">Confirm Password</Form.Label>
                        </div>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm password"
                          className="bg-dark border-secondary text-white py-2"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Personal Information */}
                  <h6 className="text-warning mb-3 fw-bold">Personal Information</h6>
                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faSignature} className="text-warning me-2" />
                          <Form.Label className="mb-0 text-light">First Name</Form.Label>
                        </div>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First name"
                          className="bg-dark border-secondary text-white py-2"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faSignature} className="text-warning me-2" />
                          <Form.Label className="mb-0 text-light">Middle Name</Form.Label>
                        </div>
                        <Form.Control
                          type="text"
                          name="middleName"
                          value={formData.middleName}
                          onChange={handleChange}
                          placeholder="Middle name"
                          className="bg-dark border-secondary text-white py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faSignature} className="text-warning me-2" />
                          <Form.Label className="mb-0 text-light">Last Name</Form.Label>
                        </div>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name"
                          className="bg-dark border-secondary text-white py-2"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Contact Information */}
                  <h6 className="text-warning mb-3 fw-bold">Contact Information</h6>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faPhone} className="text-warning me-2" />
                          <Form.Label className="mb-0 text-light">Contact Number</Form.Label>
                        </div>
                        <Form.Control
                          type="tel"
                          name="contact_number"
                          value={formData.contact_number}
                          onChange={handleChange}
                          placeholder="Enter contact number"
                          className="bg-dark border-secondary text-white py-2"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <FontAwesomeIcon icon={faLocationDot} className="text-warning me-2" />
                          <Form.Label className="mb-0 text-light">Address</Form.Label>
                        </div>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          className="bg-dark border-secondary text-white py-2"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid gap-3">
                    <Button 
                      variant="warning" 
                      type="submit"
                      className="py-2"
                      size="lg"
                    >
                      Create Account
                    </Button>
                    <Link 
                      to="/login" 
                      className="btn btn-outline-light py-2"
                    >
                      Back to Login
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <small className="text-light">
                © 2024 Chronosphere. All rights reserved.
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register; 