// src/components/QuestionForm.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const QuestionForm = ({ onQuestionAdded }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await api.post('/questions', { title, body, category_id });

      if (response && response.data) {
        setMessage('Question added successfully!');
        onQuestionAdded(); // Notify parent component to refresh the list
        setTitle('');
        setBody('');
        setCategoryId('');
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
    <Form onSubmit={handleSubmit}>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
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
          rows={3}
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
          <option value="">Select a category</option>
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
  );
};

export default QuestionForm;
