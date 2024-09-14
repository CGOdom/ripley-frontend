// src/components/QuestionList.jsx

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const QuestionList = ({ questions }) => {
  return (
    <ListGroup>
      {questions.map((question) => (
        <ListGroup.Item key={question._id}>
          <Link to={`/questions/${question._id}`}>{question.title}</Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default QuestionList;
