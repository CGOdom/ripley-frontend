// src/components/QuestionForm.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

const QuestionForm = ({ onQuestionAdded }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category_id, setCategoryId] = useState(''); // State for category selection
  const [categories, setCategories] = useState([]); // State to hold categories
  const [message, setMessage] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories'); // Assuming an endpoint to get categories
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await api.post('/questions', { title, body, category_id }); // Include category_id
      setMessage('Question added successfully!');
      onQuestionAdded(); // Notify parent component to refresh the list
      setTitle('');
      setBody('');
      setCategoryId('');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage('Error adding question: ' + error.response.data.message);
      } else {
        setMessage('An error occurred while adding the question.');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {message && <Alert variant="info">{message}</Alert>}
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
      <Button variant="primary" type="submit" className="mt-4" block="true">
        Submit Question
      </Button>
    </Form>
  );
};

export default QuestionForm;
