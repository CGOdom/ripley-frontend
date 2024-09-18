// src/pages/Login.js

import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setIsAuthenticated, setUser } = useContext(AuthContext); // Include setUser
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/users/login', { email, password });
      if (response.data && response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user); // Set user data
        navigate('/dashboard');
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage('Error logging in: ' + error.response.data.message);
      } else if (error.message) {
        setMessage('Error logging in: ' + error.message);
      } else {
        setMessage('An error occurred during login.');
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          {message && <Alert variant="danger">{message}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4" block>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
