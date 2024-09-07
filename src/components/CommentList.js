// src/components/CommentList.js

import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Button } from 'react-bootstrap';
import api from '../services/api';

const CommentList = ({ answerId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);

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
      const token = localStorage.getItem('token');
      const response = await api.post(
        `/comments/answers/${answerId}`,
        { body: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data]); // Add new comment to the list
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
  );
};

export default CommentList;
