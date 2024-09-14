// src/components/QuestionForm.jsx

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

const QuestionForm = ({ onQuestionAdded }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await api.post('/questions', { title, body });
      setMessage('Question added successfully!');
      onQuestionAdded(); // Notify parent component to refresh the list
      setTitle('');
      setBody('');
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
      <Button variant="primary" type="submit" className="mt-4" block="true">
        Submit Question
      </Button>
    </Form>
  );
};

export default QuestionForm;
