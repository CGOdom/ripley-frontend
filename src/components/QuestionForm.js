// src/components/QuestionForm.js

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../services/api';

const QuestionForm = ({ onQuestionAdded }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/questions',
        { title, body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Question added successfully!');
      onQuestionAdded(response.data); // Trigger parent component update
      setTitle('');
      setBody('');
    } catch (error) {
      setMessage('Error adding question: ' + error.response.data.message);
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
        />
      </Form.Group>
      <Form.Group controlId="formBasicBody">
        <Form.Label>Question Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter question details"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block>
        Submit Question
      </Button>
    </Form>
  );
};

export default QuestionForm;
