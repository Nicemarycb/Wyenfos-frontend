
import React from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { FaLightbulb, FaRobot, FaUserTie, FaHandsHelping, FaChartLine } from "react-icons/fa";
import styled from "styled-components";
import aboutImage from "../../../assets/about.webp";

const aboutItems = [
  {
    icon: <FaLightbulb size={40} className="text-primary mb-3" />,
    title: "Innovative Solutions",
    text: "We push boundaries to deliver next-level technology solutions.",
  },
  {
    icon: <FaRobot size={40} className="text-success mb-3" />,
    title: "Emerging Technologies",
    text: "Expertise in AI, ML, and Blockchain development.",
  },
  {
    icon: <FaUserTie size={40} className="text-danger mb-3" />,
    title: "Youthful Leadership",
    text: "Led by a record-breaking young developer with vision.",
  },
  {
    icon: <FaHandsHelping size={40} className="text-info mb-3" />,
    title: "Community Focus",
    text: "We prioritize social impact, helping communities thrive.",
  },
];

// Define styled component for the Card with animation
const AnimatedCard = styled(Card)`
  /* Initial state for slide-from-left animation */
  transform: translateX(-100%);
  opacity: 0;
  /* Slower animation on mount */
  animation: slideInFromLeft 1.2s ease-out forwards;
  /* Slower hover transition */
  transition: transform 0.6s ease-in-out;

  &:hover {
    transform: translateY(-10px); /* Lift up on hover */
  }

  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const AboutSection = ({ isPreview = false }) => {
  if (isPreview) {
    return (
      <section id="about" className="py-5 bg-light">
        <Container>
          <AnimatedCard className="shadow-lg border-0 rounded-4 p-3 animate__animated animate__fadeInUp">
            <Card.Body>
              <h2 className="display-5 fw-bold text-center mb-4 text-dark">
                About Wyenfos
              </h2>
              <p className="lead text-muted text-center mb-4 px-md-5">
                Wyenfos, based in India, is dedicated to fostering savings and economic stability.
                Learn how we transform expenses into opportunities for growth.
              </p>
              <div className="text-center">
                <Button
                  href="/about"
                  variant="dark"
                  size="lg"
                  className="px-5 py-3 rounded-pill fw-semibold shadow-sm"
                >
                  Discover More
                </Button>
              </div>
            </Card.Body>
          </AnimatedCard>
        </Container>
      </section>
    );
  }

  return (
    <section id="about" className="py-5 bg-white">
      <Container>
        {/* Who We Are Section */}
        <div className="shadow p-5 rounded-4 bg-light mb-5">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-bold mb-4">Who We Are</h2>
              <p className="text-muted" style={{ textAlign: "justify" }}>
                Wyenfos, headquartered in Karnataka, India, is a trailblazing company committed to making life affordable for all.
                Our mission, encapsulated in our name "Wyenfos" (Wipe Your Expenditure), is to transform daily expenses into savings opportunities.
                We empower individuals and businesses to achieve economic stability through innovative services in offline e-commerce, education, transportation, healthcare, and beyond.
              </p>
              <p className="text-muted" style={{ textAlign: "justify" }}>
                Founded in 2019 by a team of visionary entrepreneurs, Wyenfos combines cutting-edge technology with a human-centric approach.
                Our goal is to redefine financial wellness by offering solutions that promote savings while addressing immediate needs.
                From AI-driven insights to community-focused programs, we are reshaping how people manage their finances.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <Image
                src={aboutImage}
                alt="About Wyenfos"
                fluid
                className="rounded"
                style={{ maxHeight: "350px" }}
              />
            </Col>
          </Row>
        </div>
        {/* Why Choose Us Section */}
        <h2 className="text-center fw-bold mb-5">Why Choose Us</h2>
        <Row>
          {aboutItems.map((item, i) => (
            <Col md={6} className="mb-4" key={i}>
              <Card className="text-center border-0 shadow-sm h-100 p-3">
                <Card.Body>
                  {item.icon}
                  <Card.Title className="fw-semibold">{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Our Impact Section */}
        <div className="shadow p-5 rounded-4 bg-light">
          <h2 className="text-center fw-bold mb-4">Our Impact</h2>
          <Row>
            <Col md={6}>
              <p className="text-muted" style={{ textAlign: "justify" }}>
                Wyenfos is dedicated to creating a lasting impact on communities and industries:
              </p>
              <ul>
                <li>Helped 10,000+ households save ₹50,000 annually.</li>
                <li>Trained 500 youth in digital financial literacy.</li>
                <li>Reduced transaction costs for small businesses by 30% through our e-commerce platform.</li>
                <li>Promoted sustainable practices in rural markets.</li>
              </ul>
            </Col>
            <Col md={6} className="text-center">
              <FaChartLine size={100} className="text-success d-block mx-auto mb-3" />
              <p className="text-center text-muted">
                Driving measurable growth for our community and clients.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;