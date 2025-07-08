import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

const StaffNavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/admin/login"));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/staff-panel">Staff Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="staff-navbar-nav" />
        <Navbar.Collapse id="staff-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/staff-panel">Staff Members</Nav.Link> */}
            <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
          </Nav>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default StaffNavigationBar;