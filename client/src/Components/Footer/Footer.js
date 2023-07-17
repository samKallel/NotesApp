import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import gomycode from "../../Assets/gomycode.png";
const Footer = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="text-center py-3">
          <span style={{ color: "green", margin: "auto" }}>
            <h7>Lab Phase dans le cadre de la formation JS Full stack chez:</h7>
          </span>
        </Col>
        <Col>
          <a href="https://gomycode.com/tn/fr/">
            <img
              src={gomycode}
              alt="GoMyCode"
              style={{ width: "100px", height: "50px" }}
            />
          </a>
        </Col>
        <col></col>
      </Row>
    </Container>
  );
};

export default Footer;
