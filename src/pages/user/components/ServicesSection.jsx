import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FaLaptopCode,
  FaGlobe,
  FaMobileAlt,
  FaPaintBrush,
  FaApple,
  FaPalette,
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
    technologies: ["React", "Vue.js", "WordPress", "Shopify", "Firebase", "MongoDB", "Angular", "Express", "Node.js"],
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
    title: "Graphic Designer",
    shortDescription: "Stunning visuals and branding for your business.",
    fullDescription: "Our graphic design services create compelling visuals that communicate your brand’s identity. From logos to marketing collateral, we craft designs that leave a lasting impression.",
    features: [
      "Logo and brand identity",
      "Marketing materials (brochures, flyers)",
      "Graphic design is essentially visual communication",
      "Social media graphics",
    ],
    useCase: "Great for businesses rebranding or launching new products, such as restaurants or tech startups.",
    technologies: ["Adobe Photoshop", "Illustrator", "Corel Draw", "After Effects"],
  },
  {
    icon: <FaApple size={40} color="#f1c40f" />,
    title: "iOS/Android Development",
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
  {
    icon: <FaPalette size={40} color="#f1c40f" />,
    title: "UI-UX Designer",
    shortDescription: "Intuitive and engaging user interfaces for exceptional experiences.",
    fullDescription: "We craft user-centric designs that prioritize usability and deliver delightful experiences. Our UI/UX services encompass user research, wireframing, prototyping, and visual design to create interfaces that are both functional and beautiful.",
    features: [
      "User research and persona development",
      "Wireframing and prototyping",
      "Information architecture",
      "Usability testing",
      "Interactive design",
    ],
    useCase: "Essential for any digital product or service aiming to improve user satisfaction and engagement, such as web applications, mobile apps, or software.",
    technologies: ["Figma", "Sketch", "Adobe XD", "Miro", "InVision"],
  },
];

// Styled components for animations
const AnimatedCard = styled(Card)`
  transform: scale(1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.1); /* Bulge effect on hover */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: #f8f9fa;
  }

  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const AnimatedIcon = styled.div`
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.2); /* Slight scale on hover */
    color: #007bff;
  }
`;

const AnimatedSection = styled.section`
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
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

const AnimatedApproachCard = styled.div`
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: #f8f9fa;
  }
`;

const ServicesSection = ({ isPreview = false }) => {
  return (
    <AnimatedSection id="services" className={`py-5 ${isPreview ? 'bg-light' : 'bg-white'}`}>
      <Container>
        {isPreview ? (
          <>
            <div className="d-flex justify-content-center mb-5">
              <AnimatedButton
                href="/services"
                variant="light"
                size="lg"
                className="fw-bold text-dark"
              >
                Our Service
              </AnimatedButton>
            </div>
            <Row className="justify-content-center">
              {services.map((service, index) => (
                <Col md={3} sm={6} className="mb-4 text-center" key={index}>
                  <AnimatedCard
                    className="shadow-lg border-0 rounded-4 h-100 p-3"
                    index={index}
                  >
                    <Card.Body>
                      <AnimatedIcon index={index}>{service.icon}</AnimatedIcon>
                      <h5 className="fw-bold">{service.title}</h5>
                      <p className="text-muted px-2">{service.shortDescription}</p>
                    </Card.Body>
                  </AnimatedCard>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <>
            <h2 className="display-4 fw-bold text-center mb-5 text-warning">
              Our Comprehensive Services
            </h2>
            <p className="lead text-muted text-center mb-5">
              At Wyenfos Infotech, we offer a wide range of technology and design services to empower your business. Explore how we can transform your ideas into reality.
            </p>
            {services.map((service, index) => (
              <div key={index} className="mb-5">
                <Row className="align-items-center">
                  <Col md={4} className="text-center mb-4 mb-md-0">
                    <AnimatedIcon index={index}>{service.icon}</AnimatedIcon>
                    <h3 className="fw-bold">{service.title}</h3>
                  </Col>
                  <Col md={8}>
                    <AnimatedCard className="shadow-sm border-0 rounded-4 p-4" index={index}>
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
                    </AnimatedCard>
                  </Col>
                </Row>
              </div>
            ))}
            <div className="shadow p-5 rounded-4 bg-light">
              <h2 className="fw-bold text-center mb-4">Our Approach</h2>
              <p className="text-muted text-center mb-4">
                We follow a proven process to deliver exceptional services tailored to your needs.
              </p>
              <Row>
                {[
                  { title: "Discovery", desc: "We analyze your requirements and goals to create a strategic plan." },
                  { title: "Development", desc: "Our team builds robust, scalable solutions using the latest technologies." },
                  { title: "Delivery & Support", desc: "We deploy your solution and provide ongoing support for success." }
                ].map((item, idx) => (
                  <Col md={4} className="text-center mb-4" key={idx}>
                    <AnimatedApproachCard className="p-4 bg-white rounded shadow-sm h-100" index={idx}>
                      <h5 className="fw-bold">{item.title}</h5>
                      <p className="text-muted">{item.desc}</p>
                    </AnimatedApproachCard>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        )}
      </Container>
    </AnimatedSection>
  );
};

export default ServicesSection;