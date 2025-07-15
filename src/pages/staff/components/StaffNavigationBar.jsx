import React from "react";
import { Navbar, Container, Button, NavbarBrand } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";

const StaffNavigationBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/admin/login"));
  };

  return (
    <Navbar>
      <Container>
        <NavbarBrand></NavbarBrand>
        <Button as={Link} to="/admin" variant="outline-primary" className="ms-auto m-4">
          Admin Dashboard
        </Button>
        <Button variant="danger" onClick={handleLogout} className="m-4">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default StaffNavigationBar;