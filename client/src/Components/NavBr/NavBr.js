import React from "react";
import {
  Nav,
  NavDropdown,
  Navbar,
  Form,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../JS/Actions/user";

function NavBr({ setSearch }) {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar expand="lg" bg="success" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">Notes App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Nav>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {user ? (
                <>
                  <Nav.Link href="/notes">Notes</Nav.Link>
                  <NavDropdown title={user.name} id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item
                      href="/"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBr;
