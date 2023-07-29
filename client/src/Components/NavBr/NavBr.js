import React from "react";
import {
  Nav,
  NavDropdown,
  Navbar,
  Form,
  Container,
  Offcanvas,
} from "react-bootstrap";
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
      <Navbar key="md" md="md" bg="success" variant="dark">
        <Container fluid>
          {user ? (
            <div className="d-flex align-items-center">
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

              <NavDropdown
                title={user.name}
                id="navbarScrollingDropdown"
                style={{ margin: "2%", color: "white" }}
              >
                <NavDropdown.Item href="/notes" style={{ margin: "5%" }}>
                  Notes
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile" style={{ margin: "5%" }}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={() => dispatch(logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <div>
                <Navbar.Brand href="/">Notes App</Navbar.Brand>
                <Nav.Link href="/" style={{ margin: "5%" }}>
                  <img
                    src={logo}
                    alt="logo"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                    }}
                  />
                </Nav.Link>
              </div>
            </Nav>
          )}
          {!user && (
            <div
              style={{
                color: "white",
              }}
            >
              <Nav.Link href="/login" style={{ margin: "20px" }}>
                Login
              </Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </div>
          )}
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
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBr;
