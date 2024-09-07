// src/pages/Dashboard.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import api from '../services/api';
import QuestionList from '../components/QuestionList';

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const fetchQuestions = async () => {
        try {
          const response = await api.get('/questions', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setQuestions(response.data);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
      fetchQuestions();
    }
  }, [navigate]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h2 className="text-center">Dashboard</h2>
          <QuestionList questions={questions} />
          <Button variant="primary" className="mt-3" block>
            Add New Question
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
