
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";

const StaffMembers = () => {
  const [team, setTeam] = useState([]);
  const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const idToken = await auth.currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}/team`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
        }
        const data = await response.json();
        setTeam(data);
      } catch (error) {
        console.error("Failed to fetch team:", error.message);
        setTeam([]);
      }
    };
    if (auth.currentUser) {
      fetchTeam();
    }
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Staff Members</h2>
      <Row>
        {team.map((member) => (
          <Col md={4} key={member.id} className="mb-4">
            <Card>
              {member.profilePicture && (
                <Card.Img
                  variant="top"
                  src={member.profilePicture}
                  alt={member.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Text>
                  <strong>Role:</strong> {member.role}<br />
                  <strong>Employee ID:</strong> {member.employeeId}<br />
                  <strong>Joining Date:</strong> {member.joiningDate}<br />
                  <strong>Blood Group:</strong> {member.bloodGroup}<br />
                  <strong>Emergency Phone:</strong> {member.emergencyPhone || "Not provided"}<br />
                  <strong>Status:</strong> {member.status}
                </Card.Text>
                <Button as={Link} to={`/staff-panel/${member.id}`} variant="primary">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StaffMembers;