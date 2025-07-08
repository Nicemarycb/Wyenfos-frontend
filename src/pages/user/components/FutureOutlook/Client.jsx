
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Ratio } from "react-bootstrap";
import styled from "styled-components";

const AnimatedSection = styled.div`
  transform: scale(0.5) translateY(50px);
  opacity: 0;
  animation: bounceIn 1.2s ease-out forwards;
  animation-delay: ${props => props.index * 0.2}s;
  transition: transform 0.6s ease-in-out, scale 0.6s ease-in-out;
  background: linear-gradient(135deg, #ffffff, #e9ecef);
  border: 2px solid transparent;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    border-color: #0d6efd;
  }

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

  @keyframes bounceIn {
    0% {
      transform: scale(0.5) translateY(50px);
      opacity: 0;
    }
    60% {
      transform: scale(1.1) translateY(-10px);
      opacity: 0.7;
    }
    100% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
`;

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

const OurClients = ({ isPreview = false }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = " https://us-central1-wyenfos-b7b96.cloudfunctions.net/api"; // Use emulator URL

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/clients`);
        if (!response.ok) throw new Error(`Failed to fetch clients: ${response.status}`);
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [API_URL]);

  if (loading) {
    return (
      <section className="py-5 bg-white" id="clients">
        <Container>
          <h2 className="text-center fw-bold mb-5">Loading...</h2>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-white" id="clients">
        <Container>
          <h2 className="text-center fw-bold mb-5 text-danger">Error: {error}</h2>
        </Container>
      </section>
    );
  }

  if (isPreview) {
    return (
      <section className="py-5 bg-light" id="clients">
        <Container>
          <h1 className="h4 fw-bold text-center mb-5 text-dark">Our Clients</h1>
          <Row className="justify-content-center">
            <Col md={8}>
              <AnimatedSection className="text-center" index={0}>
                <h4 className="fw-bold mb-3 text-dark">Our Valued Partners</h4>
                <p className="text-muted lead mb-4">
                  We proudly collaborate with leading companies to deliver cutting-edge solutions.
                </p>
                <Row className="g-3 mb-4">
                  {clients.map((client, index) => (
                    <Col md={4} key={client.id || index}>
                      <AnimatedSection index={index + 1}>
                        <h6 className="fw-bold text-dark">{client.name}</h6>
                        <p className="text-muted small">{client.shortDescription}</p>
                      </AnimatedSection>
                    </Col>
                  ))}
                </Row>
                <Button
                  href="/clients"
                  variant="primary"
                  size="lg"
                  className="px-5 py-3 rounded-pill fw-semibold shadow-sm"
                >
                  View All Clients
                </Button>
              </AnimatedSection>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5 bg-white" id="clients">
      <Container>
        <h1 className="display-4 fw-bold text-center mb-5 text-dark">Our Esteemed Clients</h1>
        <p className="lead text-muted text-center mb-5">
          Discover the trusted partners who rely on Wyenfos Infotech for innovative solutions and impactful collaborations.
        </p>

        <Row className="g-4 mb-5">
          {clients.map((client, index) => (
            <Col md={4} key={client.id || index}>
              <CustomSection className="text-center">
                <h4 className="fw-bold text-dark">{client.name}</h4>
                {client.logo && (
                  <Ratio aspectRatio="1x1" className="mb-3">
                    <img src={client.logo} alt={`${client.name} logo`} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                  </Ratio>
                )}
                <p className="text-muted">{client.fullDescription}</p>
                <h6 className="fw-semibold text-primary mt-4">Collaboration</h6>
                <p className="text-muted">{client.collaboration}</p>
                <h6 className="fw-semibold text-primary mt-4">Impact</h6>
                <p className="text-muted">{client.impact}</p>
              </CustomSection>
            </Col>
          ))}
        </Row>

        <CustomSection bgLight className="p-5">
          <h3 className="fw-bold text-center mb-4 text-dark">Our Client Commitment</h3>
          <p className="text-muted text-center mb-4">
            At Wyenfos, we prioritize building strong, lasting relationships with our clients through dedication and excellence.
          </p>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Trust</h5>
              <p className="text-muted">We earn our clients' trust with reliable and transparent services.</p>
            </Col>
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Innovation</h5>
              <p className="text-muted">We deliver innovative solutions tailored to client needs.</p>
            </Col>
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Support</h5>
              <p className="text-muted">We provide ongoing support to ensure client success.</p>
            </Col>
          </Row>
        </CustomSection>
      </Container>
    </section>
  );
};

export default OurClients;

