// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuestionDetails from './pages/QuestionDetails';
import AddQuestion from './pages/AddQuestion';
import PrivateRoute from './components/PrivateRoute';
import CategoryQuestions from './pages/CategoryQuestions'; // New component

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <PrivateRoute>
              <QuestionDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-question"
          element={
            <PrivateRoute>
              <AddQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/:categoryId/questions"
          element={
            <PrivateRoute>
              <CategoryQuestions />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Fallback Route for Undefined Paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
