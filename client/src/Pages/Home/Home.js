import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/notes");
    }
  }, [navigate]);
  return (
    <div className="main">
      <Container>
        <Row>
          <h1 className="title">Welcome to Notes App</h1>

          <div className="button">
            <a href="/register">
              <Button
                variant="outline-primary"
                size="lg"
                className="homeButton"
              >
                Register
              </Button>
            </a>

            <a href="/login">
              <Button
                variant="outline-primary"
                size="lg"
                className="homeButton"
              >
                Login
              </Button>
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
