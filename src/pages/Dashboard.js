// src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import api from '../services/api';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
    } else {
      const fetchCategories = async () => {
        try {
          const response = await api.get('/categories', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCategories(response.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      fetchCategories();
    }
  }, [history]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h2 className="text-center">Dashboard</h2>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item key={category._id}>
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="primary" className="mt-3" block>
            Add New Question
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
