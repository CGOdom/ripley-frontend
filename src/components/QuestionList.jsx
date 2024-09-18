// src/components/QuestionList.jsx

import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const QuestionList = ({ questions }) => {
  return (
    <ListGroup variant="flush">
      {questions.map((question) => (
        <ListGroup.Item key={question._id}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to={`/questions/${question._id}`}>{question.title}</Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Category: {question.category_id.name} | Asked by: {question.author_id.username}
              </Card.Subtitle>
              <Card.Text>
                {question.body.length > 100
                  ? question.body.substring(0, 100) + '...'
                  : question.body}
              </Card.Text>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default QuestionList;
