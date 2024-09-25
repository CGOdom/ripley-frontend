// src/pages/QuestionDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import api from '../services/api';
import AnswerList from '../components/AnswerList';
import CategoryHeader from '../components/CategoryHeader';

const QuestionDetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await api.get(`/questions/${id}`);
        setQuestion(response.data);
        // Adjust the path based on your API response structure
        // Assuming category_id is an object with _id and name
        if (response.data.category_id) {
          setCategoryName(response.data.category_id.name);
        }
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    };
    fetchQuestion();
  }, [id]);

  return (
    <Container>
      {question ? (
        <>
          {/* Category Heading with "Add Question" Button */}
          <CategoryHeader
            categoryId={question.category_id._id}
            categoryName={question.category_id.name}
          />

          {/* Question Details */}
          <Row className="justify-content-md-center">
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Card.Title>{question.title}</Card.Title>
                  <Card.Text>{question.body}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">
                    Asked by: {question.author_id.username}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Answers List */}
          <Row className="justify-content-md-center mt-4">
            <Col md={8}>
              <AnswerList questionId={id} />
            </Col>
          </Row>
        </>
      ) : (
        // Loading Indicator
        <Row className="justify-content-md-center mt-5">
          <Col md={8} className="text-center">
            <p>Loading question details...</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default QuestionDetails;
