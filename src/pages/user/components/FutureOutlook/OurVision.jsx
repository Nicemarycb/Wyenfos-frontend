import React from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import visionImage from "../../../../assets/bulb.webp";

// Styled component for animated card with fade-in and slide-from-bottom
const AnimatedCard = styled(Card)`
  transform: rotateX(90deg);
  opacity: 0;
  animation: flipInBottom 0.8s ease-out forwards;

  &:hover {
    transform: rotateX(0deg) scale(1.05);
  }

  @keyframes flipInBottom {
    from {
      transform: rotateX(90deg);
      opacity: 0;
    }
    to {
      transform: rotateX(0deg);
      opacity: 1;
    }
  }
`;
const AnimatedButton = styled(Button)`
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s ease, height 0.5s ease;
  }

  &:hover::after {
    width: 300px;
    height: 300px;
  }
`;

// Styled component for image with hover zoom
const ZoomImage = styled(Image)`
  transition: transform 0.6s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const OurVision = ({ isPreview = false }) => {
  if (isPreview) {
    return (
      <section id="future-vision" className="py-5 bg-light">
        <Container>
          {/* <h2 className="display-5 fw-bold text-center mb-5 text-primary">
            Our Vision
          </h2> */}
          <div className="d-flex justify-content-center mb-5">
           <AnimatedButton
              href="/future/vision"
              variant="light"
              size="lg"
              className="fw-bold text-dark"
            >
              Our Vision
           </AnimatedButton>
          </div>
          <Row className="justify-content-center">
            <Col md={8}>
              <AnimatedCard className="shadow-lg border-0 rounded-4 p-4 text-center">
                <Card.Body>
                  <ZoomImage
                    src={visionImage}
                    alt="Our Vision"
                    fluid
                    rounded
                    className="shadow mb-4"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                  <Card.Title className="fw-bold mb-3">
                    Simplifying Lives Through Innovation
                  </Card.Title>
                  <Card.Text className="text-muted lead">
                    We aim to enhance well-being by turning every purchase into an opportunity for financial empowerment.
                  </Card.Text>

                </Card.Body>
              </AnimatedCard>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section id="future-vision" className="py-5 bg-white">
      <Container>
        {/* Header */}
        <h2 className="display-4 fw-bold text-center mb-5 text-warning">
          Our Vision for the Future
        </h2>
        <p className="lead text-muted text-center mb-5">
          Wyenfos Infotech is committed to transforming lives by integrating convenience, financial empowerment,
          and innovation into every interaction. Our vision is to create a new world where daily transactions lead to a more secure and fulfilling life.
        </p>

        {/* Vision Statement */}
        <Row className="align-items-center g-5 mb-5">
          <Col md={6}>
            <ZoomImage
              src={visionImage}
              alt="Our Vision"
              fluid
              rounded
              className="shadow-lg"
            />
          </Col>
          <Col md={6}>
            <Card className="shadow-sm border-0 rounded-4 p-4">
              <Card.Body>
                <p className="lead fw-semibold text-secondary">
                  Our company Empowering Futures, Everyday: The Wyenfos Infotech Promise
                </p>
                <p className="text-muted">
                  At Wyenfos Infotech, we envision a future where every individual is equipped with the essential IT skills to achieve financial stability and career advancement. By providing accessible, high-quality educational opportunities, we aim to empower aspiring professionals to thrive in the digital economy and foster their economic resilience.
                </p>
                <p className="text-muted">
                  Our commitment extends profoundly beyond merely offering courses. We are assiduously building a holistic educational ecosystem that prioritizes unparalleled convenience, ensuring flexible learning paths adaptable to diverse schedules; unwavering accessibility, making cutting-edge IT education attainable for everyone, regardless of background; and robust empowerment, equipping our students with practical skills and confidence to excel in their chosen fields. Through our meticulously designed curriculum, expert instructors, and a supportive learning environment, we are dedicated to ensuring that every learner can achieve a more secure, fulfilling, and technologically proficient life.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Core Pillars */}
        <h3 className="fw-bold text-center mb-4 text-warning">Core Pillars of Our Vision</h3>
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 rounded-4 h-100 p-3">
              <Card.Body>
                <h5 className="fw-bold text-dark">Skill Mastery</h5>
                <p className="text-muted">
                  We empower individuals with in-demand IT skills and knowledge, fostering expertise crucial for navigating the digital landscape.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 rounded-4 h-100 p-3">
              <Card.Body>
                <h5 className="fw-bold text-dark">Convenience</h5>
                <p className="text-muted">
                  Our solutions simplify daily tasks, making life easier with seamless, user-friendly experiences.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm border-0 rounded-4 h-100 p-3">
              <Card.Body>
                <h5 className="fw-bold text-dark">Innovation</h5>
                <p className="text-muted">
                  We leverage cutting-edge technologies to deliver transformative solutions that redefine possibilities.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* How We Achieve It */}
        <div className="shadow p-5 rounded-4 bg-light">
          <h3 className="fw-bold text-center mb-4 text-warning">How We Achieve It</h3>
          <p className="text-muted text-center mb-4">
            Our vision is brought to life through strategic initiatives and innovative approaches:
          </p>
          <Row className="g-4">
            <Col md={6}>
              <h5 className="fw-semibold text-dark">Smart Technology</h5>
              <p className="text-muted">
                We use AI, blockchain, and IoT to create intelligent platforms that integrate income generation into transactions.
              </p>
            </Col>
            <Col md={6}>
              <h5 className="fw-semibold text-dark">User-Centric Design</h5>
              <p className="text-muted">
                Our solutions prioritize ease of use, ensuring accessibility for all users, from individuals to businesses.
              </p>
            </Col>
            <Col md={6}>
              <h5 className="fw-semibold text-dark">Sustainable Practices</h5>
              <p className="text-muted">
                We promote eco-friendly and ethical solutions to support long-term well-being and community growth.
              </p>
            </Col>
            <Col md={6}>
              <h5 className="fw-semibold text-dark">Global Reach</h5>
              <p className="text-muted">
                We aim to scale our vision worldwide, empowering communities across borders with financial opportunities.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default OurVision;