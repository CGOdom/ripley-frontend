// src/components/AnswerList.jsx

import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Button } from 'react-bootstrap';
import api from '../services/api';
import CommentList from './CommentList'; // Import CommentList component
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AnswerList = ({ questionId }) => {
  const [answers, setAnswers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAnswer, setNewAnswer] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

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
      await api.post(`/answers/${questionId}`, { body: newAnswer });
      // Refresh the answers list
      const response = await api.get(`/answers/${questionId}`);
      setAnswers(response.data);
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
                {/* Include CommentList component */}
                <CommentList answerId={answer._id} />
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {isAuthenticated && (
        <>
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
      )}
    </>
  );
};

export default AnswerList;
