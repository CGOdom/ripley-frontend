// src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import api from '../services/api';
import QuestionList from '../components/QuestionList';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAddNewQuestion = () => {
    navigate('/add-question'); // Navigate to a dedicated add question page
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h2 className="text-center">Dashboard</h2>
          <QuestionList questions={questions} />
          <Button variant="primary" className="mt-3" onClick={handleAddNewQuestion}>
            Add New Question
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
