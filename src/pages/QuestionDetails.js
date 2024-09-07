// src/pages/QuestionDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import api from '../services/api';
import AnswerList from '../components/AnswerList';

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await api.get(`/questions/${id}`);
        setQuestion(response.data);
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    };
    fetchQuestion();
  }, [id]);

  return (
    <Container>
      {question && (
        <>
          <Row className="mt-5">
            <Col md={8} className="mx-auto">
              <Card>
                <Card.Body>
                  <Card.Title>{question.title}</Card.Title>
                  <Card.Text>{question.body}</Card.Text>
                </Card.Body>
              </Card>
              <AnswerList questionId={id} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default QuestionDetails;
