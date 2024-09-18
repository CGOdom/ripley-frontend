// src/components/Footer.jsx

import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-white text-center py-3 mt-5">
    <Container>
      <p>© {new Date().getFullYear()} Alien Forum. All Rights Reserved.</p>
    </Container>
  </footer>
);

export default Footer;
