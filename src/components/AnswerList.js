// src/components/AnswerList.js

import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Button } from 'react-bootstrap';
import api from '../services/api';

const AnswerList = ({ questionId }) => {
  const [answers, setAnswers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await api.get(`/answers/${questionId}`);
        setAnswers(response.data);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };
    fetchAnswers();
  }, [questionId]);

  const handleAddAnswer = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        `/answers/${questionId}`,
        { body: newAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnswers([...answers, response.data]); // Add new answer to the list
      setNewAnswer(''); // Clear the form
      setShowForm(false); // Hide the form
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  return (
    <>
      <h3 className="mt-4">Answers</h3>
      <ListGroup>
        {answers.map((answer) => (
          <ListGroup.Item key={answer._id}>
            <Card>
              <Card.Body>
                <Card.Text>{answer.body}</Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {showForm ? (
        <>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            rows={3}
            className="form-control mt-3"
            placeholder="Add your answer..."
          ></textarea>
          <Button className="mt-2" onClick={handleAddAnswer}>
            Submit Answer
          </Button>
        </>
      ) : (
        <Button className="mt-3" onClick={() => setShowForm(true)}>
          Add Answer
        </Button>
      )}
    </>
  );
};

export default AnswerList;
