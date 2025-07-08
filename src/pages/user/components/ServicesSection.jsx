
import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FaLaptopCode,
  FaGlobe,
  FaMobileAlt,
  FaPaintBrush,
  FaApple,
} from "react-icons/fa";
import styled from "styled-components";

const services = [
  {
    icon: <FaLaptopCode size={40} color="#f1c40f" />,
    title: "Software Development",
    shortDescription: "Custom software solutions tailored to your business needs.",
    fullDescription: "We design and develop bespoke software solutions that streamline your business processes, enhance productivity, and drive growth. Our team leverages cutting-edge technologies to deliver scalable, secure, and user-friendly applications.",
    features: [
      "Custom ERP and CRM systems",
      "Cloud-based solutions",
      "Integration with existing systems",
      "Ongoing maintenance and support",
    ],
    useCase: "Ideal for businesses seeking to automate workflows or digitize operations, such as manufacturing firms or service providers.",
    technologies: ["Java", "Python", ".NET", "Node.js", "AWS"],
  },
  {
    icon: <FaGlobe size={40} color="#f1c40f" />,
    title: "Web Development",
    shortDescription: "Modern, responsive websites to boost your online presence.",
    fullDescription: "Our web development services create visually stunning, responsive, and SEO-optimized websites that engage your audience and elevate your brand. From e-commerce platforms to corporate sites, we deliver solutions that perform.",
    features: [
      "Responsive design",
      "SEO optimization",
      "Content management systems (CMS)",
      "E-commerce functionality",
    ],
    useCase: "Perfect for businesses needing a professional online presence, such as retail stores or consulting firms.",
    technologies: ["React", "Vue.js", "WordPress", "Shopify"],
  },
  {
    icon: <FaMobileAlt size={40} color="#f1c40f" />,
    title: "Mobile App Development",
    shortDescription: "Powerful Android and iOS apps with seamless UX.",
    fullDescription: "We build high-performance mobile applications for Android and iOS, offering intuitive interfaces and robust functionality. Our apps are designed to enhance user engagement and meet your business objectives.",
    features: [
      "Cross-platform development",
      "Native app performance",
      "Push notifications",
      "App store deployment",
    ],
    useCase: "Suitable for startups or enterprises launching customer-facing apps, such as delivery services or fitness platforms.",
    technologies: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  {
    icon: <FaPaintBrush size={40} color="#f1c40f" />,
    title: "Graphic Design",
    shortDescription: "Stunning visuals and branding for your business.",
    fullDescription: "Our graphic design services create compelling visuals that communicate your brand’s identity. From logos to marketing collateral, we craft designs that leave a lasting impression.",
    features: [
      "Logo and brand identity",
      "Marketing materials (brochures, flyers)",
      "UI/UX design",
      "Social media graphics",
    ],
    useCase: "Great for businesses rebranding or launching new products, such as restaurants or tech startups.",
    technologies: ["Adobe Photoshop", "Illustrator", "Figma", "Canva"],
  },
  {
    icon: <FaApple size={40} color="#f1c40f" />,
    title: "iOS Development",
    shortDescription: "Sleek, high-performance iOS apps for Apple devices.",
    fullDescription: "We specialize in building premium iOS applications optimized for Apple’s ecosystem, delivering exceptional performance and user experiences. Our apps adhere to Apple’s design guidelines for seamless integration.",
    features: [
      "Swift-based development",
      "Apple Watch and iPad support",
      "In-app purchases",
      "Secure data handling",
    ],
    useCase: "Ideal for businesses targeting Apple users, such as e-commerce or entertainment apps.",
    technologies: ["Swift", "Xcode", "Core Data", "ARKit"],
  },
];

// Styled component for animated column with slide-from-left
const AnimatedCol = styled(Col)`
  transform: translateX(-100%);
  opacity: 0;
  animation: slideInFromLeft 1.2s ease-out forwards;
  transition: transform 0.6s ease-in-out;

  /* Stagger animation for each card */
  animation-delay: ${props => props.index * 0.2}s;

  &:hover {
    transform: translateY(-10px);
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

const ServicesSection = ({ isPreview = false }) => {
  if (isPreview) {
    return (
      <section id="services" className="py-5 bg-light">
        <Container>
          {/* <h2
          
            Our Services
          </h2> */}
          <div className="d-flex justify-content-center mb-5">
            <Button
              href="/services"
              variant="light"
              size="lg"
              className="fw-bold text-dark"
            >
              Our Service
            </Button>
          </div>

          <Row className="justify-content-center">
            {services.map((service, index) => (
              <AnimatedCol
                md={3}
                sm={6}
                className="mb-4 text-center"
                key={index}
                index={index}
              >
                <Card className="shadow-lg border-0 rounded-4 h-100 p-3">
                  <Card.Body>
                    <div className="mb-3">{service.icon}</div>
                    <h5 className="fw-bold">{service.title}</h5>
                    <p className="text-muted px-2">{service.shortDescription}</p>
                  </Card.Body>
                </Card>
              </AnimatedCol>
            ))}
          </Row>
          <div className="text-center mt-4">
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="services" className="py-5 bg-white">
      <Container>
        {/* Header */}
        <h2 className="display-4 fw-bold text-center mb-5 text-warning">
          Our Comprehensive Services
        </h2>
        <p className="lead text-muted text-center mb-5">
          At Wyenfos, we offer a wide range of technology and design services to empower your business. Explore how we can transform your ideas into reality.
        </p>

        {/* Service Details */}
        {services.map((service, index) => (
          <div key={index} className="mb-5">
            <Row className="align-items-center">
              <Col md={4} className="text-center mb-4 mb-md-0">
                <div className="mb-3">{service.icon}</div>
                <h3 className="fw-bold">{service.title}</h3>
              </Col>
              <Col md={8}>
                <Card className="shadow-sm border-0 rounded-4 p-4">
                  <Card.Body>
                    <p className="text-muted">{service.fullDescription}</p>
                    <h5 className="fw-semibold mt-4">Key Features</h5>
                    <ul className="list-unstyled">
                      {service.features.map((feature, i) => (
                        <li key={i} className="mb-2">
                          <span className="text-primary">•</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <h5 className="fw-semibold mt-4">Use Case</h5>
                    <p className="text-muted">{service.useCase}</p>
                    <h5 className="fw-semibold mt-4">Technologies</h5>
                    <p className="text-muted">{service.technologies.join(", ")}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        ))}

        {/* Our Approach Section */}
        <div className="shadow p-5 rounded-4 bg-light">
          <h2 className="fw-bold text-center mb-4">Our Approach</h2>
          <p className="text-muted text-center mb-4">
            We follow a proven process to deliver exceptional services tailored to your needs.
          </p>
          <Row>
            <Col md={4} className="text-center mb-4">
              <h5 className="fw-bold">Discovery</h5>
              <p className="text-muted">
                We analyze your requirements and goals to create a strategic plan.
              </p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <h5 className="fw-bold">Development</h5>
              <p className="text-muted">
                Our team builds robust, scalable solutions using the latest technologies.
              </p>
            </Col>
            <Col md={4} className="text-center mb-4">
              <h5 className="fw-bold">Delivery & Support</h5>
              <p className="text-muted">
                We deploy your solution and provide ongoing support for success.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ServicesSection;