
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const StaffMemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

  useEffect(() => {
    const fetchMember = async () => {
      try {
        console.log("Fetching member with id:", id); // Debug log
        const response = await fetch(`${API_URL}/public/team/${id}`, {
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
        console.error("Error:", error.message);
        setMember(null);
      }
    };
    fetchMember();
  }, [id]);

  if (!member) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <h3 className="mt-3">Loading...</h3>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <style>{`
        .staff-card { transition: transform 0.2s; }
        .staff-card:hover { transform: translateY(-5px); }
        .profile-img { border-radius: 8px; object-fit: cover; width: 100%; }
        .label { color: #4B5563; font-weight: 600; }
        .value { color: #1F2937; margin-bottom: 1rem; }
        .video-link:hover { text-decoration: underline; color: #1D4ED8; }
        .qr-code { max-width: 150px; margin-top: 10px; }
      `}</style>
      <Row className="justify-content-center">
        <Col md={8} className="mb-4">
          <Button
            className="mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            onClick={() => navigate("/staff-panel")}
          >
            Back to Staff Members
          </Button>
          <Card className="shadow-lg rounded-lg staff-card">
            {member.profilePicture && (
              <Card.Img
                src={member.profilePicture}
                alt={member.name}
                className="profile-img"
                style={{ maxHeight: "400px" }}
              />
            )}
            <Card.Body className="p-5">
              <Card.Title className="text-3xl font-bold text-gray-800 mb-4">{member.name}</Card.Title>
              <Card.Text className="text-lg">
                <div className="mb-3">
                  <span className="label">Role: </span>
                  <span className="value">{member.role}</span>
                </div>
                <div className="mb-3">
                  <span className="label">Employee ID: </span>
                  <span className="value">{member.employeeId}</span>
                </div>
                <div className="mb-3">
                  <span className="label">Joining Date: </span>
                  <span className="value">{member.joiningDate}</span>
                </div>
                <div className="mb-3">
                  <span className="label">Blood Group: </span>
                  <span className="value">{member.bloodGroup}</span>
                </div>
                <div className="mb-3">
                  <span className="label">Status: </span>
                  <span className="value">{member.status}</span>
                </div>
                {member.status === "Resigned" && member.resignationReason && (
                  <div className="mb-3">
                    <span className="label">Resignation Reason: </span>
                    <span className="value">{member.resignationReason}</span>
                  </div>
                )}
                {member.status === "Terminated" && member.terminationReason && (
                  <div className="mb-3">
                    <span className="label">Termination Reason: </span>
                    <span className="value">{member.terminationReason}</span>
                  </div>
                )}
                <div className="mb-3">
                  <span className="label">Short Bio: </span>
                  <span className="value">{member.shortBio || "Not provided"}</span>
                </div>
                <div className="mb-3">
                  <span className="label">Address: </span>
                  <span className="value">{member.fullBio || "Not provided"}</span>
                </div>
                <div className="mb-3">
                  <span className="label">Skills: </span>
                  <span className="value">{member.skills.length > 0 ? member.skills.join(", ") : "None"}</span>
                </div>
                <div className="mb-3">
                  <span className="label">Achievements: </span>
                  <span className="value">{member.achievements || "Not provided"}</span>
                </div>
                {member.video && (
                  <div className="mb-3">
                    <span className="label">Video: </span>
                    <a href={member.video} target="_blank" rel="noopener noreferrer" className="text-blue-500 video-link">
                      Watch Video
                    </a>
                  </div>
                )}
                {member.qrCode && (
                  <div className="mb-3">
                    <span className="label">QR Code: </span>
                    <Image src={member.qrCode} alt={`QR Code for ${member.name}`} className="qr-code" />
                  </div>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffMemberDetail;