import React from "react";
import { Container, Button } from "react-bootstrap";

const HeroSection = () => {
  const backgroundImage = require("../../../assets/img1.avif"); // Place your image in src/assets/hero.jpg

  return (
    <section
      className="d-flex align-items-center text-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <Container style={{ zIndex: 2 }}>
        <h1 className="display-2 fw-bold mb-4">
          Make a Wise Decision – Get Website And App Today!
        </h1>
        <p className="lead mb-4">
          Empowering your business with cutting-edge digital solutions.
        </p>
        <Button variant="light" size="lg">
          Get Started
        </Button>
      </Container>
    </section>
  );
};

export default HeroSection;
