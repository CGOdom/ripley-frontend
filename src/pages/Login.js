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
            {/* Email Field */}
            {/* Password Field */}
            {/* Submit Button */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
