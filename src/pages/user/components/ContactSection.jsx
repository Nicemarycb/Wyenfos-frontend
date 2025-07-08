
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const API_URL = " https://us-central1-wyenfos-b7b96.cloudfunctions.net/api"; // Update to deployed URL after deployment

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "", // Optional field
          message: formData.message,
          timestamp: new Date().toISOString(), // Add timestamp for sorting
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setSubmitStatus("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form
    } catch (error) {
      setSubmitStatus("Failed to send message. Please try again.");
      console.error("Error submitting contact form:", error.message);
    }
  };

  return (
    <section id="contact" className="bg-light py-5">
      <Container>
        <h6 className="text-center text-uppercase text-muted mb-2">Wyenfos Group</h6>
        <h2 className="text-center display-5 fw-bold mb-5">Contact Us</h2>
        <Row className="align-items-start">
          {/* Left: Online Inquiry Form */}
          <Col md={6}>
            <h6 className="text-uppercase fw-semibold mb-3">Online Enquiry</h6>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={4}
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="dark" type="submit" className="w-100">
                Send Message
              </Button>
              {submitStatus && <p className="mt-2 text-center">{submitStatus}</p>}
            </Form>
          </Col>

          {/* Right: Contact Details */}
          <Col md={6} className="mt-5 mt-md-0">
            <h6 className="text-uppercase fw-semibold mb-3">Contact Details</h6>
            <p>
              <a
                href="mailto:wyenfospvtltd@gmail.com"
                className="text-dark text-decoration-none"
              >
                wyenfospvtltd@gmail.com
              </a>
              <br />
              <strong>7012478846</strong>
            </p>
            <div className="mt-4">
              <p>
                <strong>WYENFOS Private Limited</strong>
                <br />
                CJ Tower, Ikkanda Warrior Road,
                <br />
                Kerala, Thrissur – 680 001
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;