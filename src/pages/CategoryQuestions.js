// src/pages/CategoryQuestions.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../services/api';
import QuestionList from '../components/QuestionList';

const CategoryQuestions = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchQuestions();
    fetchCategoryName();
  }, [categoryId]);

  const fetchQuestions = async () => {
    try {
      const response = await api.get(`/questions?category_id=${categoryId}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchCategoryName = async () => {
    try {
      const response = await api.get(`/categories/${categoryId}`);
      setCategoryName(response.data.name);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h2 className="text-center">Category: {categoryName}</h2>
          <QuestionList questions={questions} />
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryQuestions;
