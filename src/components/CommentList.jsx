// src/components/CommentList.jsx

import React, { useEffect, useState, useContext } from 'react';
import { ListGroup, Card, Button, Alert } from 'react-bootstrap';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CommentList = ({ answerId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/answers/${answerId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments.');
      }
    };
    fetchComments();
  }, [answerId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }

    try {
      await api.post(`/comments/answers/${answerId}`, {
        body: newComment,
      });
      // Refresh the comments list
      const response = await api.get(`/comments/answers/${answerId}`);
      setComments(response.data);
      setNewComment(''); // Clear the form
      setShowForm(false); // Hide the form
      setSuccess('Comment added successfully!');
      setError('');
    } catch (error) {
      console.error('Error adding comment:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(`Error adding comment: ${error.response.data.message}`);
      } else {
        setError('An unexpected error occurred while adding the comment.');
      }
      setSuccess('');
    }
  };

  return (
    <>
      <h4 className="mt-4">Comments</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment._id}>
            <Card>
              <Card.Body>
                <Card.Text>{comment.body}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  {comment.author_id && comment.author_id.username
                    ? `By ${comment.author_id.username}`
                    : 'Unknown Author'}
                </Card.Subtitle>
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
              <Button
                variant="secondary"
                className="mt-2 ms-2"
                onClick={() => {
                  setShowForm(false);
                  setNewComment('');
                  setError('');
                  setSuccess('');
                }}
              >
                Cancel
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
