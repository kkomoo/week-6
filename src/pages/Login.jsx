import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-dark">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <div className="text-center mb-4">
              <FontAwesomeIcon 
                icon={faClock} 
                className="text-warning"
                style={{ fontSize: '3.5rem' }}
              />
              <h1 className="mt-3 mb-2 fw-bold text-white display-5">CHRONOSPHERE</h1>
              <p className="text-light mb-4 lead">Timeless Elegance, Modern Luxury</p>
            </div>
            
            <Card className="bg-dark text-white border border-secondary shadow">
              <Card.Body className="p-4">
                <h3 className="text-center mb-4 fw-light">Welcome Back</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <FontAwesomeIcon icon={faUser} className="text-warning me-2" />
                      <Form.Label className="mb-0 text-light">Email address</Form.Label>
                    </div>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="bg-dark border-secondary text-white py-2"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <FontAwesomeIcon icon={faLock} className="text-warning me-2" />
                      <Form.Label className="mb-0 text-light">Password</Form.Label>
                    </div>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="bg-dark border-secondary text-white py-2"
                      required
                    />
                  </Form.Group>

                  <div className="d-grid gap-3">
                    <Button 
                      variant="warning" 
                      type="submit"
                      className="py-2"
                      size="lg"
                    >
                      Sign In
                    </Button>
                    <Link 
                      to="/register" 
                      className="btn btn-outline-light py-2"
                    >
                      Create New Account
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

export default Login; 