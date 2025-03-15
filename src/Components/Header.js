import React from 'react';
import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header11'>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">
            <h1>DashBoard</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
