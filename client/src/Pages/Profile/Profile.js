import React, { useState } from "react";
import Forms from "../../Components/Forms/Forms";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  console.log(user);
  const [userUpdated, setUserUpdated] = useState();
  return (
    <Forms title="PROFILE">
      {/* {errors && (
          <Errors variant={"warning"}>
            {errors.map((error) => error.msg + "! ")}
          </Errors>
        )}
        {loadUser && <Loading />} */}
      <div>
        <Row className="ProfileContainer">
          <Col md={6}>Form </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <img src={user.image} alt={user.name} className="Profilepic" /> */}
          </Col>
        </Row>
        {/* <Form.Group as={Row} className="mb-3" controlId="name">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              // onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              placeholder="email@example.com"
              name="email"
              // onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="password">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              // onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="pic">
          <Form.Label column sm="2">
            Profile Picture
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="file"
              name="image"
              accept=".png, .jpg, .jpeg"
              placeholder="Upload profile picture"
              // onChange={handlePhoto}
            />
          </Col>
        </Form.Group>
        <Button
          variant="success"
          // onClick={handleUser}
        >
          Register
        </Button> */}
      </div>
    </Forms>
  );
}

export default Profile;
