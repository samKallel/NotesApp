import React from "react";
import { Nav, NavDropdown, Navbar, Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../JS/Actions/user";

function NavBr({ setSearch }) {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar expand="lg" bg="success" variant="dark">
        <Container fluid>
          {!user ? <Navbar.Brand href="/">Notes App</Navbar.Brand> : null}
          <Navbar.Toggle aria-controls="navbarScroll" />{" "}
          <Navbar.Collapse id="navbarScroll">
            {user ? (
              <>
                <Nav className="m-auto">
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form>
                </Nav>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <>
                    <Nav.Link href="/notes">Notes</Nav.Link>
                    <NavDropdown title={user.name} id="navbarScrollingDropdown">
                      <NavDropdown.Item href="/profile">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                </Nav>
              </>
            ) : (
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBr;
