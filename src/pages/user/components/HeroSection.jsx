import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./hero.css";

import imgMain from "../../../assets/dd5d95c7d860a31bea8b52c8bb1259f1.jpg";
import imgExtra1 from "../../../assets/firstp.jpg";
import imgExtra2 from "../../../assets/1345c0ea27c5422c61bfd64f93fc8846.jpg";

const HeroSection = () => {
  return (
    <section className="hero-modern-section d-flex align-items-center">
      <div className="bg-shapes">
        <img src={imgExtra1} className="bg-shape shape1" alt="Decor 1" />
        <img src={imgExtra2} className="bg-shape shape2" alt="Decor 2" />
      </div>

      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-start">
            <h1 className="hero-title mb-4">
              Bring Your Ideas to Life <br />
              with <span className="text-gradient">Next-Gen Solutions</span>
            </h1>
            <p className="lead mb-4 text-secondary">
              We design and build stunning websites and mobile apps with full digital integration.
            </p>
            <Button
              className="custom-cta"
              href="/about"
            >
              Start Your Project
            </Button>
          </Col>
          <Col md={6} className="text-center d-none d-md-block">
            <div className="image-container">
              <img src={imgMain} alt="Hero" className="main-hero-image" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
