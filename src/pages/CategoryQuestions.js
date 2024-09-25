// src/pages/CategoryQuestions.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import api from '../services/api';
import QuestionList from '../components/QuestionList';
import CategoryHeader from '../components/CategoryHeader';

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
      {/* Category Heading with "Add Question" Button */}
      <CategoryHeader categoryId={categoryId} categoryName={categoryName} />

      {/* Questions List */}
      <Row className="justify-content-md-center">
        <Col md={8}>
          <QuestionList questions={questions} />
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryQuestions;
