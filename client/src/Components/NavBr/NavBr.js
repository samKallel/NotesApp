import React from "react";
import { Nav, NavDropdown, Navbar, Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../JS/Actions/user";
import logo from "../../Assets/ico.webp";
import { useLocation } from "react-router-dom";
function NavBr({ setSearch }) {
  const user = useSelector((state) => state.userReducer.user);
  const location = useLocation();
  const isNotesPage = location.pathname === "/notes";

  const dispatch = useDispatch();

  return (
    <div>
      <Navbar expand="lg" bg="success" variant="dark">
        <Container fluid>
          {!user ? (
            <Navbar.Brand href="/">
              <img
                src={logo}
                alt="logo"
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />{" "}
            </Navbar.Brand>
          ) : null}
          <Navbar.Toggle aria-controls="navbarScroll" />{" "}
          <Navbar.Collapse id="navbarScroll">
            {user ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  justifyItems: "baseline",
                }}
              >
                <Nav.Link href="/profile" style={{ margin: "5%" }}>
                  <img
                    src={user.image}
                    alt="ProfilePic"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                    }}
                  />
                </Nav.Link>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link href="/notes" style={{ margin: "5%" }}>
                    Notes
                  </Nav.Link>

                  <NavDropdown title={user.name} id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/profile" style={{ margin: "5%" }}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      href="/"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  {isNotesPage && (
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
                  )}
                </Nav>
              </div>
            ) : (
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{
                  maxHeight: "100px",
                }}
                navbarScroll
              >
                <div>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </div>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBr;
