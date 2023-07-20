import React, { useEffect, useState } from "react";
import Forms from "../../Components/Forms/Forms";
import Loading from "../../Components/Loading/Loading";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../JS/Actions/user";
import Errors from "../../Components/Errors/Errors";

function Register() {
  const [newUser, setNewUser] = useState({});
  const [file, setFile] = useState("../../Assets/defaultPic.png");
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  const errors = useSelector((state) => state.userReducer.errors);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handlePhoto = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (localStorage.getItem("token") !== "" && isAuth === true) {
      navigate("/notes");
    } else navigate("/register");
  }, [
    // localStorage.getItem("token"),
    dispatch,
  ]);

  const handleUser = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("name", newUser.name);
    data.append("email", newUser.email);
    data.append("password", newUser.password);
    data.append("image", file);
    dispatch(register(data));
  };

  return (
    <Forms title="REGISTER">
      <Form>
        {errors && (
          <Errors variant={"warning"}>
            {errors.map((error) => error.msg + "! ")}
          </Errors>
        )}
        {loadUser && <Loading />}
        <Form.Group as={Row} className="mb-3" controlId="name">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handlePhoto}
            />
          </Col>
        </Form.Group>
        <Button variant="success" onClick={handleUser}>
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account ? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </Forms>
  );
}

export default Register;
