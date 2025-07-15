import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Alert, Modal } from "react-bootstrap";
import styled from "styled-components";
import { Briefcase, People, Star } from "react-bootstrap-icons";

// Simplified CustomSection to reduce reflows
const CustomSection = styled.div`
  background: ${(props) => (props.bgLight ? "#f8f9fa" : "#ffffff")};
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const benefits = [
  {
    icon: <Briefcase size={40} className="text-primary mb-3" />,
    title: "Work on Live Projects",
    description: "Contribute to e-commerce platforms or AI-driven analytics tools.",
  },
  {
    icon: <People size={40} className="text-success mb-3" />,
    title: "Expert Guidance",
    description: "Weekly 1:1 sessions with senior developers.",
  },
  {
    icon: <Star size={40} className="text-warning mb-3" />,
    title: "Career Opportunity",
    description: "Portfolio projects featured in our client presentations.",
  },
];

const internshipRoles = [
  {
    title: "Software Development Intern",
    description: "Work on full-stack development projects using React, Node.js, and Firebase.",
    skills: "JavaScript, React, Node.js, Git",
    duration: "6 month Internship and 6 month Training",
    responsibilities: [
      "Develop and maintain web applications.",
      "Collaborate with the team on project requirements.",
      "Write clean, efficient, and reusable code.",
    ],
   notes: "We Provide One Year Work Experience Certificate.",
  },
  {
    title: "UI/UX Design Intern",
    description: "Design user interfaces and prototypes for web and mobile applications.",
    skills: "Figma, Adobe XD, User Research",
    duration: "6 month Internship and 6 month Training",
    responsibilities: [
      "Create wireframes and prototypes using Figma or Adobe XD.",
      "Conduct user research and usability testing.",
      "Collaborate with developers to implement designs.",
    ],
   notes: "We Provide One Year Work Experience Certificate.",
  },
  {
    title: "Graphic Designer Intern",
    description: "Create visually appealing graphics for marketing materials and digital platforms.",
    skills: "Adobe Photoshop, Illustrator, Graphic Design Principles",
    duration: "6 month Internship and 6 month Training",
    responsibilities: [
      "Design logos, banners, and social media graphics.",
      "Collaborate with the marketing team on branding projects.",
      "Ensure designs align with brand guidelines.",
    ],
   notes: "We Provide One Year Work Experience Certificate.",
  },
  {
    title: "Mobile Application Development Intern",
    description: "Develop and maintain mobile applications for Android and cross-platform environments.",
    skills: "Kotlin, Flutter, Android Studio",
    duration: "6 month Internship and 6 month Training",
    responsibilities: [
      "Build and test mobile apps using Kotlin or Flutter.",
      "Integrate APIs and ensure app performance.",
      "Work with UI/UX designers for a seamless user experience.",
    ],
   notes: "We Provide One Year Work Experience Certificate.",
  },
  {
    title: "iOS Developer Intern",
    description: "Develop and optimize iOS applications using Swift and Xcode.",
    skills: "Swift, Xcode, iOS SDK",
    duration: "6 month Internship and 6 month Training",
    responsibilities: [
      "Design and implement iOS app features.",
      "Debug and optimize app performance.",
      "Publish apps to the App Store.",
    ],
    notes: "We Provide One Year Work Experience Certificate.",
  },
];

const InternshipApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/internship-inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }
      await response.json();
      setSubmitStatus("success");
      setFormData({ name: "", email: "", role: "", message: "" });
    } catch (error) {
      console.error("Failed to submit application:", error.message);
      setSubmitStatus("error");
    }
  };

  const handleShowModal = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRole(null); // Clear selectedRole first
    setShowModal(false); // Then hide modal
  };

  return (
    <section id="internship-application" className="py-5 bg-white">
      <Container>
        <h1 className="display-4 fw-bold text-dark text-center mb-5">
          Apply for an Internship at Wyenfos
        </h1>

        {/* Benefits Section */}
        <CustomSection bgLight className="p-5 mb-5">
          <h3 className="fw-bold text-center mb-4 text-dark">Why Join Us?</h3>
          <Row className="g-4">
            {benefits.map((benefit, index) => (
              <Col md={4} key={index} className="text-center">
                {benefit.icon}
                <h5 className="fw-bold text-dark">{benefit.title}</h5>
                <p className="text-muted">{benefit.description}</p>
              </Col>
            ))}
          </Row>
        </CustomSection>

        {/* Internship Roles Section */}
        <h3 className="fw-bold text-center mb-4 text-dark">Available Roles</h3>
        <Row className="g-4 mb-5">
          {internshipRoles.map((role, index) => (
            <Col md={4} key={index}>
              <CustomSection className="text-center p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="fw-bold text-dark">{role.title}</h5>
                  <p className="text-muted">{role.description}</p>
                  <p className="text-primary small fw-semibold">Skills: {role.skills}</p>
                </div>
                <Button
                  variant="primary"
                  className="mt-3 rounded-pill"
                  onClick={() => handleShowModal(role)}
                >
                  View Details
                </Button>
              </CustomSection>
            </Col>
          ))}
        </Row>

        {/* Application Form Section */}
        <CustomSection bgLight className="p-5" id="apply-form">
          <h3 className="fw-bold text-center mb-4 text-dark">Application Form</h3>
          {submitStatus === "success" && (
            <Alert variant="success" className="mb-4">
              Application submitted successfully!
            </Alert>
          )}
          {submitStatus === "error" && (
            <Alert variant="danger" className="mb-4">
              Failed to submit application. Please try again.
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preferred Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select a role</option>
                {internshipRoles.map((role, index) => (
                  <option key={index} value={role.title}>
                    {role.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about yourself and why you want to join Wyenfos Infotech."
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" size="lg" className="w-100">
              Submit Application
            </Button>
          </Form>
        </CustomSection>

        {/* Modal for Role Details */}
        <Modal show={showModal} onHide={handleCloseModal} centered animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedRole?.title || "Role Details"} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRole ? (
              <>
                <p><strong>Description:</strong> {selectedRole.description}</p>
                <p><strong>Skills Required:</strong> {selectedRole.skills}</p>
                <p><strong>Duration:</strong> {selectedRole.duration}</p>
                <p><strong>Responsibilities:</strong></p>
                <ul>
                  {selectedRole.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
                <p><strong>Notes:</strong> {selectedRole.notes}</p>
              </>
            ) : (
              <p>No role selected.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal} className="rounded-pill">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default InternshipApplication;