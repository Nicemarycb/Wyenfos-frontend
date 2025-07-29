import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import "../../staff/StaffMemberDetail.css"; // Import the custom CSS file

const StaffMemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        console.log("Fetching member with id:", id);
        const response = await fetch(`${API_URL}/team/public/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch team member");
        }
        const data = await response.json();
        setMember(data);
      } catch (error) {
        console.error("Error fetching staff member details:", error.message);
        setMember(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id, API_URL]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h3 className="mt-3">Loading Staff Member Details...</h3>
      </Container>
    );
  }

  if (!member) {
    return (
      <Container className="py-5 text-center">
        <h3>Staff Member Not Found</h3>
      </Container>
    );
  }

  // Check if user is authenticated
  const isAuthenticated = !!auth.currentUser;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {isAuthenticated && (
            <Button
              variant="primary"
              className="mb-4"
              onClick={() => navigate("/staff-panel")}
            >
              ← Back to Staff Members
            </Button>
          )}

          <Card className="shadow-sm">
            {member.profilePicture && (
              <Card.Img
                src={member.profilePicture}
                alt={member.name}
                className="profile-img-detail"
              />
            )}
            <Card.Body>
              <Card.Title className="text-center mb-4">{member.name}</Card.Title>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Role:</Col>
                <Col md={8}>{member.role}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Employee ID:</Col>
                <Col md={8}>{member.employeeId}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Joining Date:</Col>
                <Col md={8}>{member.joiningDate}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Blood Group:</Col>
                <Col md={8}>{member.bloodGroup}</Col>
              </Row>
               <Row className="mb-3">
                <Col md={4} className="fw-bold">Emergency Phone:</Col>
                <Col md={8}>{member.emergencyPhone || "Not provided"}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Status:</Col>
                <Col md={8} className={`status-text ${member.status.toLowerCase().replace(" ", "-")}`}>
                  {member.status}
                </Col>
              </Row>
              {member.status === "Resigned" && member.resignationReason && (
                <Row className="mb-3">
                  <Col md={4} className="fw-bold">Resignation Reason:</Col>
                  <Col md={8}>{member.resignationReason}</Col>
                </Row>
              )}
              {member.status === "Terminated" && member.terminationReason && (
                <Row className="mb-3">
                  <Col md={4} className="fw-bold">Termination Reason:</Col>
                  <Col md={8}>{member.terminationReason}</Col>
                </Row>
              )}
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Education:</Col>
                <Col md={8}>{member.shortBio || "Not provided"}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Address:</Col>
                <Col md={8}>{member.fullBio || "Not provided"}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Skills:</Col>
                <Col md={8}>
                  {member.skills && member.skills.length > 0 ? (
                    <ul className="mb-0 ps-3">
                      {member.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  ) : "None"}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Achievements:</Col>
                <Col md={8}>{member.achievements || "Not provided"}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Quotes:</Col>
                <Col md={8}>{member.quotes || "Not provided"}</Col>
              </Row>
              {member.video && (
                <Row className="mb-3">
                  <Col md={4} className="fw-bold">Video:</Col>
                  <Col md={8}>
                    <a href={member.video} target="_blank" rel="noopener noreferrer">Watch Video</a>
                  </Col>
                </Row>
              )}
              {isAuthenticated && member.qrCode && (
                <Row className="mb-3">
                  <Col md={4} className="fw-bold">QR Code:</Col>
                  <Col md={8}>
                    <Image src={member.qrCode} alt={`QR Code for ${member.name}`} fluid />
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffMemberDetail;