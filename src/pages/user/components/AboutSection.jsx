import React from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { FaLightbulb, FaRobot, FaUserTie, FaHandsHelping } from "react-icons/fa";
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
  /* Initial state for slide-from-right animation */
  transform: translateX(100%);
  opacity: 0;
  /* Slower animation on mount */
  animation: slideInFromRight 1.5s ease-out forwards;
  /* Slower hover transition */
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out;

  &:hover {
    transform: scale(1.05); /* Bulge effect on hover */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  @keyframes slideInFromRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

// Styled component for cards in the "Why Choose Us" section
const WhyChooseUsCard = styled(Card)`
  /* Initial state for slide-from-right animation */
  transform: translateX(100%);
  opacity: 0;
  /* Slower animation on mount with staggered delay */
  animation: slideInFromRight 1.5s ease-out forwards;
  animation-delay: ${props => props.index * 0.3}s;
  /* Slower hover transition */
  transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out;

  &:hover {
    transform: scale(1.05); /* Bulge effect on hover */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  @keyframes slideInFromRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const AnimatedIcon = styled.div`
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.2); /* Slight scale on hover */
    color: #007bff;
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
                About Wyenfos Infotech
              </h2>
              <p className="lead text-muted text-center mb-4 px-md-5">
                Wyenfos Infotech, based in India,
               seamlessly integrates cutting-edge technology with a human-centric approach
              </p>
              <div className="text-center">
                <Button
                  href="/about"
                  className="button-cs"
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
                <strong> Wyenfos Infotech, established on October 25 2023 in Kerala India,</strong> is a pioneering IT firm committed to democratizing financial access through innovative digital solutions. We empower individuals and enterprises alike to cultivate robust economic stability.
              </p>
              <p className="text-muted" style={{ textAlign: "justify" }}>
                Our core strength lies in delivering comprehensive technological solutions, encompassing bespoke iOS and Android application development, sophisticated graphic design, full-stack web development, and advanced software engineering. Beyond client services, we are dedicated to nurturing future talent by offering specialized IT-related courses for students, equipping them with essential skills for the evolving digital landscape.
              </p>
              <p className="text-muted" style={{ textAlign: "justify" }}>
                Founded by visionary entrepreneurs, Wyenfos Infotech seamlessly integrates cutting-edge technology with a human-centric approach. We leverage AI-driven insights and embrace emerging technologies to redefine personal and corporate financial management, providing solutions that address immediate fiscal needs.
              </p>
            </Col>
            <Col md={6} className="text-center">
              <Image
                src={aboutImage}
                alt="About Wyenfos Infotech"
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
              <WhyChooseUsCard className="text-center border-0 shadow-sm h-100 p-3" index={i}>
                <Card.Body>
                  <AnimatedIcon>{item.icon}</AnimatedIcon>
                  <Card.Title className="fw-semibold">{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.text}</Card.Text>
                </Card.Body>
              </WhyChooseUsCard>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;