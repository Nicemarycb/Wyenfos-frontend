import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";

// Styled component for animated section with bounce-in
const AnimatedSection = styled.div`
  transform: scale(0.5) translateY(50px);
  opacity: 0;
  animation: bounceIn 1.2s ease-out forwards;
  animation-delay: ${(props) => props.index * 0.2}s;
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

// Styled component for non-animated section
const CustomSection = styled.div`
  background: ${(props) => (props.bgLight ? "#f8f9fa" : "#ffffff")};
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

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    border-radius: 0.5rem;
    margin-top: 1rem;
  }

  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const OurTeam = ({ isPreview = false }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

  // Function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtube.com") || urlObj.hostname.includes("youtu.be")) {
        const videoId = urlObj.searchParams.get("v") || urlObj.pathname.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return null; // Return null if not a YouTube URL
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_URL}/team`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        // Filter out members who are not "Currently Working"
        const currentlyWorkingMembers = data.filter(
          (member) => member.status === "Currently Working"
        );
        setTeamMembers(currentlyWorkingMembers); //
      } catch (error) {
        console.error("Failed to fetch team:", error.message);
        setTeamMembers([]);
      }
    };
    fetchTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPreview) {
    return (
      <section className="py-5 bg-light" id="team">
        <Container>
          <h1 className="h4 fw-bold text-center mb-5 text-dark">Our Staff</h1>
          <Row className="justify-content-center">
            <Col md={8}>
              <AnimatedSection className="text-center" index={0}>
                <h4 className="fw-bold mb-3 text-dark">
                  Our Talented Professionals
                </h4>
                <p className="text-muted lead mb-4">
                  Our Staff at Wyenfos Infotech combines expertise in software
                  development, design, and mobile solutions to deliver
                  innovative projects.
                </p>
                <Row className="g-3 mb-4">
                  {teamMembers.map((member, index) => (
                    <Col md={4} key={member.id}>
                      <AnimatedSection index={index + 1}>
                        {member.profilePicture && (
                          <img
                            src={member.profilePicture}
                            alt={member.name}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "50%",
                              marginBottom: "1rem",
                            }}
                          />
                        )}
                        <h6 className="fw-bold text-dark">{member.name}</h6>
                        <p className="text-primary small fw-semibold">
                          {member.role}
                        </p>
                        <p className="text-muted small">
                          {member.skills && member.skills.length > 0
                            ? member.skills.join(", ")
                            : "No skills listed"}
                        </p>

                        {member.video && (
                          <a
                            href={member.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm mt-2"
                          >
                            Watch Video
                          </a>
                        )}
                      </AnimatedSection>
                    </Col>
                  ))}
                </Row>
                <Button
                  href="/team"
                  variant="primary"
                  size="lg"
                  className="px-5 py-3 rounded-pill fw-semibold shadow-sm"
                >
                  Meet the Staff
                </Button>
              </AnimatedSection>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5 bg-white" id="team">
      <Container>
        <h1 className="display-4 fw-bold text-center mb-5 text-dark">
          Meet Our Expert Staff
        </h1>
        <p className="lead text-muted text-center mb-5">
          At Wyenfos Infotech, our staff of skilled professionals drives
          innovation and excellence. Get to know the experts behind our success.
        </p>
        <Row className="g-4 mb-5">
          {teamMembers.map((member) => (
            <Col md={4} key={member.id}>
              <CustomSection className="text-center">
                {member.profilePicture && (
                  <img
                    src={member.profilePicture}
                    alt={member.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <h4 className="fw-bold text-dark">{member.name}</h4>
                <p className="text-primary fw-semibold">{member.role}</p>
                <h6 className="fw-semibold text-primary mt-4">Technologies</h6>
                <ul className="list-unstyled">
                  {member.skills && member.skills.length > 0 ? (
                    member.skills.map((skill, i) => (
                      <li key={i} className="text-muted small">
                        • {skill}
                      </li>
                    ))
                  ) : (
                    <li className="text-muted small">No technologies listed</li>
                  )}
                </ul>
                {member.video && (
                  <div className="mt-3">
                    {getYouTubeEmbedUrl(member.video) ? (
                      <div className="video-wrapper">
                        <iframe
                          src={getYouTubeEmbedUrl(member.video)}
                          title={`${member.name}'s Video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <a
                        href={member.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Watch Video
                      </a>
                    )}
                  </div>
                )}
              </CustomSection>
            </Col>
          ))}
        </Row>
        <CustomSection bgLight className="p-5">
          <h3 className="fw-bold text-center mb-4 text-dark">
            Our Team Culture
          </h3>
          <p className="text-muted text-center mb-4">
            Collaboration, innovation, and growth define our team at Wyenfos Infotech.
            Here’s what makes us unique:
          </p>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Collaboration</h5>
              <p className="text-muted">
                We work as a cohesive unit, sharing ideas to deliver exceptional
                results.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Innovation</h5>
              <p className="text-muted">
                We embrace new technologies and creative solutions to stay
                ahead.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <h5 className="fw-semibold text-primary">Growth</h5>
              <p className="text-muted">
                We invest in our team’s development through continuous learning.
              </p>
            </Col>
          </Row>
        </CustomSection>
      </Container>
    </section>
  );
};

export default OurTeam;