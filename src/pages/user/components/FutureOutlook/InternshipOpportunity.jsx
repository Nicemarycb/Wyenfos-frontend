
import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Briefcase, People, Star } from "react-bootstrap-icons";
import styled from "styled-components";
import internImage from "../../../../assets/intern.webp"; // Corrected path

const benefits = [
  {
    icon: <Briefcase size={40} className="text-primary mb-3" />,
    title: "Work on Live Projects",
    shortDescription: "Gain real-world experience with client projects.",
    fullDescription: "Interns at Wyenfos work on live client projects, tackling real challenges in software development, design, and innovation. From building web apps to designing UI/UX, you’ll apply your skills in a professional setting.",
    example: "Contribute to e-commerce platforms or AI-driven analytics tools.",
  },
  {
    icon: <People size={40} className="text-success mb-3" />,
    title: "Expert Guidance",
    shortDescription: "Learn from industry professionals.",
    fullDescription: "Our mentors are experienced developers, designers, and product managers who provide hands-on guidance. You’ll receive personalized feedback and learn best practices in agile development, coding, and design thinking.",
    example: "Weekly 1:1 sessions with senior developers.",
  },
  {
    icon: <Star size={40} className="text-warning mb-3" />,
    title: "Career Opportunity",
    shortDescription: "Build your portfolio and career.",
    fullDescription: "Earn a certificate, showcase your work in a professional portfolio, and gain priority consideration for full-time roles at Wyenfos. Our internship is a launchpad for your tech career.",
    example: "Portfolio projects featured in our client presentations.",
  },
];

// Styled component for animated section with flip-in
const AnimatedSection = styled.div`
  transform: rotateY(180deg);
  opacity: 0;
  animation: flipIn 1.2s ease-out forwards;
  animation-delay: ${props => props.index * 0.2}s;
  transition: transform 0.6s ease-in-out, scale 0.6s ease-in-out;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border: 2px solid transparent;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    border-color: #0d6efd; /* Primary blue on hover */
  }

  /* Gradient border effect */
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #0d6efd, #6c757d);
    z-index: -1;
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }

  @keyframes flipIn {
    0% {
      transform: rotateY(180deg);
      opacity: 0;
    }
    100% {
      transform: rotateY(0);
      opacity: 1;
    }
  }
`;

// Styled component for non-animated section in full mode
const CustomSection = styled.div`
  background: ${props => (props.bgLight ? '#f8f9fa' : '#ffffff')};
  border: 2px solid transparent;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: border-color 0.6s ease-in-out;

  &:hover {
    border-color: #0d6efd;
  }

  /* Gradient border effect */
  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #0d6efd, #6c757d);
    z-index: -1;
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
`;

// Styled component for image with hover zoom
const ZoomImage = styled(Image)`
  transition: transform 0.6s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const InternshipOpportunity = ({ isPreview = false }) => {
  if (isPreview) {
    return (
      <section id="future-internship" className="py-5 bg-light">
        <Container>
          <h1 className="h4 fw-bold text-center mb-5 text-dark">
            Internship Opportunities
          </h1>
          <Row className="text-center justify-content-center">
            <Col md={8}>
              <AnimatedSection className="text-center" index={0}>
                <ZoomImage
                  src={internImage}
                  alt="Internship Program"
                  fluid
                  className="rounded-3 mb-4"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <h4 className="fw-bold mb-3 text-dark">
                  Kickstart Your Tech Career
                </h4>
                <p className="text-muted lead mb-4">
                  Join Wyenfos Infotech’s internship program to gain hands-on experience in software development, design, and innovation.
                </p>
                <Button
                  href="/internship/apply"
                  variant="primary"
                  size="lg"
                  className="px-5 py-3 fw-semibold rounded-pill shadow-sm"
                >
                  Explore Internships
                </Button>
              </AnimatedSection>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section id="future-internship" className="py-5 bg-white">
      <Container>
        {/* Hero Section */}
        <Row className="align-items-center mb-5 g-5">
          <Col md={6}>
            <ZoomImage
              src={internImage}
              alt="Internship Program"
              fluid
              className="rounded-3 shadow-lg"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </Col>
          <Col md={6}>
            <h1 className="display-4 fw-bold text-dark mb-4">
              Internship Opportunities at Wyenfos
            </h1>
            <p className="lead text-muted mb-4">
              Launch your career with Wyenfos Infotech’s internship program, designed to provide hands-on experience in cutting-edge technologies and real-world projects.
            </p>
            <Button
              href="/internship/apply"
              variant="primary"
              size="lg"
              className="px-5 py-3 rounded-pill fw-semibold shadow-sm"
            >
              Apply Now
            </Button>
          </Col>
        </Row>

        {/* Program Overview */}
        <CustomSection bgLight className="p-5 mb-5">
          <h3 className="fw-bold text-center text-dark mb-4">Program Overview</h3>
          <p className="text-muted text-center mb-4">
            Our internship program is designed to nurture talent and prepare you for a successful career in technology.
          </p>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Duration</h5>
              <p className="text-muted">
                3-6 months, flexible based on your academic schedule.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Roles</h5>
              <p className="text-muted">
                Software Development, UI/UX Design, Data Science, Product Management.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Eligibility</h5>
              <p className="text-muted">
                Students or recent graduates in Computer Science, Design, or related fields.
              </p>
            </Col>
          </Row>
        </CustomSection>

        {/* Benefits Section */}
        <h3 className="fw-bold text-center text-dark mb-4">Why Join Our Internship?</h3>
        <Row className="g-4 mb-5">
          {benefits.map((benefit, index) => (
            <Col md={4} key={index}>
              <CustomSection className="text-center p-3">
                {benefit.icon}
                <h5 className="fw-bold text-dark">{benefit.title}</h5>
                <p className="text-muted">{benefit.fullDescription}</p>
                <p className="text-primary small fw-semibold">{benefit.example}</p>
              </CustomSection>
            </Col>
          ))}
        </Row>

        {/* How to Apply Section */}
        <CustomSection bgLight className="p-5" id="apply">
          <h3 className="fw-bold text-center text-dark mb-4">How to Apply</h3>
          <p className="text-muted text-center mb-4">
            Ready to join? Follow these simple steps to apply for our internship program.
          </p>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Submit Application</h5>
              <p className="text-muted">
                Fill out our online application form with your resume and portfolio.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Interview</h5>
              <p className="text-muted">
                Meet with our team to discuss your skills and aspirations.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Get Started</h5>
              <p className="text-muted">
                Receive an offer and begin your internship journey with Wyenfos!
              </p>
            </Col>
          </Row>
        </CustomSection>
      </Container>
    </section>
  );
};

export default InternshipOpportunity;