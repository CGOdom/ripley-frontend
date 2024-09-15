// src/components/Header.jsx

import React, { useContext } from 'react';
import { Navbar, Nav, Button, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user, loading } = useContext(AuthContext); // Destructure user

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>Alien Forum</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {!isAuthenticated && !loading && (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
          {isAuthenticated && !loading && (
            <>
              <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
              <Navbar.Text className="ms-3 me-3">
                Signed in as: <strong>{user.username || user.email}</strong>
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {loading && (
            <Spinner animation="border" variant="light" size="sm" className="ms-2" />
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
