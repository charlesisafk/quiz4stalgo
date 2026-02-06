import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container } from "react-bootstrap";
import { logout } from "../actions/userActions";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin) || {};
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <Navbar expand="lg" bg="primary" variant="dark" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Project Management</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {userInfo ? (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>

                  {userInfo.role === "admin" && (
                    <NavDropdown title="Admin" id="admin-dropdown">
                      <LinkContainer to="/createproject">
                        <NavDropdown.Item>Create Project</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/createuser">
                        <NavDropdown.Item>Create User</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/userlist">
                        <NavDropdown.Item>User List</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>

            {userInfo && (
              <Nav>
                <NavDropdown
                  title={`${userInfo.username} (${userInfo.role})`}
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item disabled>
                    {userInfo.email}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
