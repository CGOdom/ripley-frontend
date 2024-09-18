// src/components/Header.jsx

import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Button, Spinner, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user, setUser, loading } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategories();
    }
  }, [isAuthenticated]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      setIsAuthenticated(false);
      setUser(null); // Reset user state
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>XenoHub</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!loading && (
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <NavDropdown title="Categories" id="categories-nav-dropdown">
                  {categories.map((category) => (
                    <LinkContainer
                      key={category._id}
                      to={`/categories/${category._id}/questions`}
                    >
                      <NavDropdown.Item>{category.name}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
                </NavDropdown>
                <LinkContainer to="/add-question">
                  <Nav.Link>Add Question</Nav.Link>
                </LinkContainer>
                {user && (
                  <Navbar.Text className="ms-3 me-3">
                    Signed in as: <strong>{user.username || user.email}</strong>
                  </Navbar.Text>
                )}
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        )}
        {loading && (
          <Spinner animation="border" variant="light" size="sm" className="ms-auto" />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
