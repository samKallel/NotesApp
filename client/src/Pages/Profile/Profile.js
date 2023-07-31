import React, { useEffect, useState } from "react";
import Forms from "../../Components/Forms/Forms";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { updateProfile } from "../../JS/Actions/user";

function Profile() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  // console.log(user);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setImage(user.image);
    }
  }, [user]);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("image", image);

    dispatch(updateProfile(data));
  };

  if (!user) {
    return <Loading />;
  }
  return (
    <Forms title="PROFILE">
      {loadUser && <Loading />}
      <div>
        <Row className="ProfileContainer">
          <Col md={6}>
            <Form
              action="/api/user/profile"
              method="post"
              encType="multipart/form-data"
            >
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="***************"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={handleImageChange}
                  />
                </Col>
              </Form.Group>
              <Button variant="success" onClick={submitHandler}>
                Update your Profile
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  Profile Picture
                </Card.Title>

                <Card.Text
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={user.image}
                    alt=""
                    className="Profilepic"
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                    }}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Forms>
  );
}

export default Profile;
