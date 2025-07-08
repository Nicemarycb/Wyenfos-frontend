

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaBullseye, FaRocket, FaLightbulb } from "react-icons/fa";
import styled from "styled-components";

const aims = [
  {
    icon: <FaBullseye size={40} className="text-danger mb-3" />,
    title: "Focused Goals",
    shortDescription: "Deliver scalable tech solutions with measurable results.",
    fullDescription: "At Wyenfos, our primary aim is to empower businesses by delivering focused, scalable, and high-quality technology solutions. We align our efforts with your strategic objectives to ensure every project drives measurable outcomes, from increased efficiency to enhanced customer engagement.",
    benefits: [
      "Tailored solutions for specific business needs",
      "Data-driven results tracking",
      "Scalable architectures for future growth",
    ],
    impact: "Our focused approach has helped clients achieve up to 40% improvement in operational efficiency.",
  },
  {
    icon: <FaRocket size={40} className="text-success mb-3" />,
    title: "Growth Acceleration",
    shortDescription: "Boost startups and enterprises with innovative digital strategies.",
    fullDescription: "We strive to accelerate growth for startups and enterprises through cutting-edge applications, websites, and digital transformation strategies. Our solutions are designed to enhance market reach, streamline operations, and drive revenue growth.",
    benefits: [
      "Rapid prototyping for startups",
      "Enterprise-grade digital platforms",
      "Marketing-integrated solutions",
    ],
    impact: "Our clients have seen up to 50% faster time-to-market with our growth-focused solutions.",
  },
  {
    icon: <FaLightbulb size={40} className="text-warning mb-3" />,
    title: "Innovation at Core",
    shortDescription: "Solve challenges creatively with cutting-edge technology.",
    fullDescription: "Innovation is the heartbeat of Wyenfos. We tackle complex challenges with creative solutions, leveraging emerging technologies like AI, blockchain, and IoT to keep our clients ahead of industry trends and competitors.",
    benefits: [
      "Access to emerging tech expertise",
      "Custom R&D for unique challenges",
      "Future-proof solutions",
    ],
    impact: "Our innovative solutions have enabled clients to pioneer new markets and disrupt industries.",
  },
];

// Styled component for animated card with scale-in
const AnimatedCard = styled(Card)`
  transform: scale(0.5);
  opacity: 0;
  animation: scaleIn 1.2s ease-out forwards;
  animation-delay: ${props => props.index * 0.2}s;
  transition: transform 0.6s ease-in-out;

  &:hover {
    transform: translateY(-10px) rotate(2deg); /* Lift and slight rotation */
  }

  @keyframes scaleIn {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const OurAim = ({ isPreview = false }) => {
  if (isPreview) {
    return (
      <section id="future-roadmap" className="py-5 bg-light">
        <Container>
          {/* <h2 className="display-5 fw-bold text-center mb-5 text-primary">
            Our Aim
          </h2> */}
          <div className="d-flex justify-content-center mb-5">
           <Button
              href="/future/aim"
              variant="light"
              size="lg"
            className="fw-bold text-dark"
            >
              Our Aim
            </Button>
             </div>

          <Row className="g-4">
            {aims.map((aim, index) => (
              <Col md={4} key={index}>
                <AnimatedCard
                  className="text-center shadow-lg border-0 rounded-4 h-100"
                  index={index}
                >
                  <Card.Body>
                    {aim.icon}
                    <Card.Title className="fw-semibold">{aim.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {aim.shortDescription}
                    </Card.Text>
                  </Card.Body>
                </AnimatedCard>
              </Col>
            ))}
          </Row>
         
           
         
        </Container>
      </section>
    );
  }

  return (
   <section id="future-roadmap" className="py-5 bg-white">
  <Container>
    {/* Header */}
    <h2 className="display-4 fw-bold text-center mb-3 text-dark">Our Strategic Aims</h2>
    <p className="lead text-muted text-center mb-5">
      Wyenfos is driven by a clear vision to empower businesses through focused goals, accelerated growth, and relentless innovation.
    </p>

    {/* Aim Details */}
    {aims.map((aim, index) => (
      <div key={index} className="mb-5">
        <Row className="align-items-center">
          <Col md={4} className="text-center mb-4 mb-md-0">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: "100px", height: "100px" }}>
              {aim.icon}
            </div>
            <h4 className="fw-bold mt-3 text-dark">{aim.title}</h4>
          </Col>
          <Col md={8}>
            <Card className="shadow-lg border-0 rounded-4 p-4 hover-shadow" style={{ background: "#f9f9f9" }}>
              <Card.Body>
                <p className="text-muted fs-6">{aim.fullDescription}</p>

                <h5 className="fw-semibold mt-4 text-success">Key Benefits</h5>
                <ul className="list-unstyled ps-3">
                  {aim.benefits.map((benefit, i) => (
                    <li key={i} className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <h5 className="fw-semibold mt-4 text-success">Impact</h5>
                <p className="text-muted">{aim.impact}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    ))}

    {/* Commitment Section */}
    <div className="bg-gradient p-5 rounded-4 mt-5" style={{ background: "linear-gradient(120deg, #e0f7fa, #ffffff)" }}>
      <h2 className="fw-bold text-center mb-4 text-dark">Our Commitment</h2>
      <p className="text-muted text-center fs-5 mb-5">
        At Wyenfos, we are committed to long-term partnerships and sustainable growth. Our aims are rooted in:
      </p>
      <Row>
        {[
          { title: "Client Success", desc: "We prioritize your success, delivering solutions that exceed expectations." },
          { title: "Sustainable Innovation", desc: "We embrace eco-friendly and ethical practices in our tech solutions." },
          { title: "Global Impact", desc: "We aim to create positive change worldwide through technology." }
        ].map((item, idx) => (
          <Col md={4} className="text-center mb-4" key={idx}>
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h5 className="fw-bold text-success">{item.title}</h5>
              <p className="text-muted">{item.desc}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  </Container>
</section>

  );
};

export default OurAim;
