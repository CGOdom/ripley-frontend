import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const AddQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract categoryId and categoryName from the state passed via navigation
  const { categoryId: preselectedCategoryId, categoryName } = location.state || {};

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);

        // If there's a preselected category, set it as the default value
        if (preselectedCategoryId) {
          setCategoryId(preselectedCategoryId);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [preselectedCategoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await api.post('/questions', { title, body, category_id });

      if (response && response.data) {
        setMessage('Question added successfully!');
        navigate(`/questions/${response.data.question._id}`);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError('Error adding question: ' + error.response.data.message);
      } else if (error.message) {
        setError('Error adding question: ' + error.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h2 className="text-center">Add New Question</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Question Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicBody" className="mt-3">
              <Form.Label>Question Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter question details"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCategory" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                {/* If categoryId and categoryName are passed, use them as the default option */}
                {preselectedCategoryId && categoryName ? (
                  <option value={preselectedCategoryId}>{categoryName}</option>
                ) : (
                  <option value="">Select a category</option>
                )}
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4" block>
              Submit Question
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddQuestion;
