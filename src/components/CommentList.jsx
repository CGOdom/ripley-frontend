// src/components/CommentList.jsx

import React, { useEffect, useState, useContext } from 'react';
import { ListGroup, Card, Button } from 'react-bootstrap';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CommentList = ({ answerId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/answers/${answerId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [answerId]);

  const handleAddComment = async () => {
    try {
      await api.post(`/comments/answers/${answerId}`, { body: newComment });
      // Refresh the comments list
      const response = await api.get(`/comments/answers/${answerId}`);
      setComments(response.data);
      setNewComment(''); // Clear the form
      setShowForm(false); // Hide the form
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <>
      <h4 className="mt-4">Comments</h4>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment._id}>
            <Card>
              <Card.Body>
                <Card.Text>{comment.body}</Card.Text>
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
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={2}
                className="form-control mt-3"
                placeholder="Add a comment..."
              ></textarea>
              <Button className="mt-2" onClick={handleAddComment}>
                Submit Comment
              </Button>
            </>
          ) : (
            <Button className="mt-3" onClick={() => setShowForm(true)}>
              Add Comment
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default CommentList;
