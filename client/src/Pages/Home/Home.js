import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./Home.css";

function Home() {
  return (
    <div className="main">
      <Container>
        <Row>
          <div>
            <h1 className="title">Welcome to Notes App</h1>
          </div>
          <Row>
            <Row>
              <a href="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="homeButton"
                >
                  Register
                </Button>
              </a>
            </Row>
            <Row>
              <a href="/login">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="homeButton"
                >
                  Login
                </Button>
              </a>
            </Row>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
