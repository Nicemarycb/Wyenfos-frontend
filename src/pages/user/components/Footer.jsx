import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-dark text-light pt-5 pb-3 border-top">
    <Container>
      <Row>
        {/* Logo & Social */}
        <Col md={4} className="text-center text-md-start mb-4">
          <h3 className="fw-bold">WYENFOS</h3>
          <p className="small">WIPE YOUR EXPENDITURE NEW<br />FORMULA OF SAVINGS</p>
          <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-3">
            <a href="#" className="text-light fs-5"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.instagram.com/wyenfosthrissur/?igsh=MWdlNmRueGx6c2sxZA%3D%3D#" className="text-light fs-5"><i className="fa-brands fa-square-instagram"></i></a>
            <a href="#" className="text-light fs-5"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#" className="text-light fs-5"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </Col>

        {/* Quick Links */}
        <Col md={4} className="mb-4">
          <h5 className="fw-bold text-center text-md-start">Quick Links</h5>
          <ul className="list-unstyled text-center text-md-start">
            <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
            <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
            <li><Link to="/services" className="text-light text-decoration-none">Services</Link></li>
            <li><Link to="/future/aim" className="text-light text-decoration-none">Our Aim</Link></li>
            <li><Link to="/clients" className="text-light text-decoration-none">Our Clients</Link></li>
            <li><Link to="/team" className="text-light text-decoration-none">Our Team</Link></li>
            <li><Link to="/future/vision" className="text-light text-decoration-none">Our Vision</Link></li>
            <li><Link to="/advertisements" className="text-light text-decoration-none">Our Advertisements</Link></li>
            <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
            <li><Link to="/future/internship" className="text-light text-decoration-none">internship Opportunity</Link></li>

          </ul>
        </Col>

        {/* Contact Info */}
        <Col md={4}>
          <h5 className="fw-bold text-center text-md-start">Get in Touch</h5>
          <p className="mb-1 fw-bold">WYENFOS Private Limited</p>
          <p className="mb-1">C J Tower, Ikkanda Warrior Road, Thrissur</p>
          <p className="mb-1"><strong>Phone:</strong> +91 70124 78846</p>
          <p className="mb-3"><strong>Email:</strong> wyenfospvtltd@gmail.com</p>
          <div style={{ width: '100%', height: '200px' }}>
            <iframe
              title="Wyenfos Map"
              src="https://maps.google.com/maps?q=CJ%20Tower,%20Thrissur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </Col>
      </Row>

      <hr className="mt-4" />
      <p className="text-center small text-muted">
        Copyright©2025 Wyenfos pvt ltd. All Rights Reserved
      </p>
    </Container>
  </footer>
);

export default Footer;
