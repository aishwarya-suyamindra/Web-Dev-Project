import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Button, Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import '../stylesheets/HomePageComponent.css';

const WelcomePage = () => {

  return (
    <div className="welcome-page ">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col className="text-center">
          <h1>Welcome to Your Streaming Service</h1>
          <p className="lead">Unlimited access to thousands of movies and TV shows.</p>

            <div className="cta-buttons">
              <Link to="/register">
                <Button variant="primary" className="me-2">
                  Register
                </Button>
              </Link>

              <Link to="/login">
                <Button variant="secondary" className="me-2">
                  Login
                </Button>
              </Link>

            <Link to="/browse">
              <Button variant="success">Continue as Guest</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WelcomePage;


