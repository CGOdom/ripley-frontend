// src/components/CategoryHeader.js

import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CategoryHeader = ({ categoryId, categoryName }) => {
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (categoryId && categoryName) {
      navigate('/add-question', {
        state: {
          categoryId,
          categoryName,
        },
      });
    } else {
      // Optionally handle cases where categoryId or categoryName is missing
      console.warn('Category ID or Name is missing.');
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col md={8}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Category: {categoryName}</h2>
          <Button variant="primary" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </div>
      </Col>
    </Row>
  );
};

// PropTypes for type checking
CategoryHeader.propTypes = {
  categoryId: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default CategoryHeader;
