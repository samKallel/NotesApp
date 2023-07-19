import React, { useState } from "react";
import Forms from "../../Components/Forms/Forms";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../JS/Actions/user";
import Loading from "../../Components/Loading/Loading";
import Errors from "../../Components/Errors/Errors";

function Login() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  const errors = useSelector((state) => state.userReducer.errors);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleUser = async (e) => {
    e.preventDefault();
    dispatch(login(user));
    try {
      (await (localStorage.getItem("token") !== "" && isAuth === true))
        ? await navigate("/notes")
        : navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  };
  return (
    <Forms title="LOGIN">
      <Form>
        {errors && (
          <Errors variant={"warning"}>
            {errors.map((error) => error.msg + "! ")}
          </Errors>
        )}
        {loadUser && <Loading />}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
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

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
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
        <Button variant="success" onClick={handleUser}>
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer ? <Link to="/register">Register here</Link>
        </Col>
      </Row>
    </Forms>
  );
}

export default Login;
