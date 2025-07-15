import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Tabs, Tab, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import TeamManagement from "./TeamManagement";
import ClientManagement from "./ClientManagement";
import ContactSubmissions from "./ContactSubmissions";
import InternshipInquiries from "./InternshipInquiries";
import AdvertisementManagement from "./AdvertisementManagement";
import "../../admin/AdminDashboard.css"; // Import custom CSS for this component

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

  useEffect(() => {
    fetchTeam();
    fetchClients();
    fetchContacts();
    fetchInquiries();
    fetchAdvertisements();
  }, []);

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
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorData.error || "Unknown error"
          }`
        );
      }
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      console.error("Failed to fetch team:", error.message);
      setTeam([]);
    }
  };

  const fetchClients = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(`${API_URL}/clients`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorData.error || "Unknown error"
          }`
        );
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Failed to fetch clients:", error.message);
      setClients([]);
    }
  };

  const fetchContacts = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(`${API_URL}/contacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorData.error || "Unknown error"
          }`
        );
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error.message);
      setContacts([]);
    }
  };

  const fetchInquiries = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(`${API_URL}/internship-inquiries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorData.error || "Unknown error"
          }`
        );
      }
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error.message);
      setInquiries([]);
    }
  };

  const fetchAdvertisements = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(`${API_URL}/advertisements`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorData.error || "Unknown error"
          }`
        );
      }
      const data = await response.json();
      setAdvertisements(data);
    } catch (error) {
      console.error("Failed to fetch advertisements:", error.message);
      setAdvertisements([]);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/admin/login"));
  };

  return (
    <Container className="py-5 admin-dashboard-container">
      <Row className="mb-4 align-items-center dashboard-header">
        <Col xs={12} md={6}>
          <h2 className="dashboard-title">Admin Dashboard</h2>
        </Col>
        <Col xs={12} md={6} className="text-md-end button-group">
          <Button
            as={Link}
            to="/staff-panel"
            variant="outline-primary"
            className="me-3 staff-panel-button"
          >
            Staff Panel
          </Button>
          <Button variant="danger" onClick={handleLogout} className="logout-button">
            Logout
          </Button>
        </Col>
      </Row>

      <Card className="dashboard-card">
        <Card.Body>
          <Tabs
            defaultActiveKey="team"
            id="admin-dashboard-tabs"
            className="mb-4 custom-tabs"
            fill // Make tabs fill the available width
          >
            <Tab eventKey="team" title="Team Management">
              <TeamManagement
                team={team}
                setTeam={setTeam}
                fetchTeam={fetchTeam}
                API_URL={API_URL}
              />
            </Tab>
            <Tab eventKey="clients" title="Client Management">
              <ClientManagement
                clients={clients}
                setClients={setClients}
                fetchClients={fetchClients}
                API_URL={API_URL}
              />
            </Tab>
            <Tab eventKey="contacts" title="Contact Submissions">
              <ContactSubmissions
                contacts={contacts}
                setContacts={setContacts}
                fetchContacts={fetchContacts}
                API_URL={API_URL}
              />
            </Tab>
            <Tab eventKey="inquiries" title="Internship Inquiries">
              <InternshipInquiries
                inquiries={inquiries}
                setInquiries={setInquiries}
                fetchInquiries={fetchInquiries}
                API_URL={API_URL}
              />
            </Tab>
            <Tab eventKey="advertisements" title="Advertisement Management">
              <AdvertisementManagement
                advertisements={advertisements}
                setAdvertisements={setAdvertisements}
                fetchAdvertisements={fetchAdvertisements}
                API_URL={API_URL}
              />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;