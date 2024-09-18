// src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import api from '../services/api';
import QuestionList from '../components/QuestionList';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]); // Holds categories
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category ID
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      let endpoint = '/questions';
      if (selectedCategory) {
        endpoint = `/questions?category_id=${selectedCategory}`;
      }
      const response = await api.get(endpoint);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAddNewQuestion = () => {
    navigate('/add-question');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h2 className="text-center">Dashboard</h2>

          {/* Category Selection */}
          <Form.Group controlId="formBasicCategory" className="mt-3">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Question List */}
          <QuestionList questions={questions} />

          <Button variant="primary" className="mt-3" onClick={handleAddNewQuestion}>
            Add New Question
          </Button>

          {/* Category List with Links */}
          {categories.length > 0 && (
            <div className="mt-4">
              <h4>Browse by Category</h4>
              <ListGroup>
                {categories.map((category) => (
                  <ListGroup.Item key={category._id}>
                    <Link to={`/categories/${category._id}/questions`}>{category.name}</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
