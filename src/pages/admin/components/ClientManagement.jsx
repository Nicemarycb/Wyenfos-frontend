
import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { auth } from "../../../firebase";

const ClientManagement = ({ clients, setClients, fetchClients, API_URL }) => {
  const [newClient, setNewClient] = useState({
    name: "",
    logo: "",
    shortDescription: "",
    fullDescription: "",
    collaboration: "",
    impact: "",
  });
  const [editingClient, setEditingClient] = useState(null);

  const handleAddOrUpdateClient = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Please log in to add or update a client.");
      return;
    }

    const method = editingClient ? "PUT" : "POST";
    const url = editingClient
      ? `${API_URL}/clients/${editingClient}`
      : `${API_URL}/clients`;
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(newClient),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
      }
      await response.json();
      fetchClients();
      setNewClient({
        name: "",
        logo: "",
        shortDescription: "",
        fullDescription: "",
        collaboration: "",
        impact: "",
      });
      setEditingClient(null);
      alert(`Client ${editingClient ? "updated" : "added"} successfully!`);
    } catch (error) {
      console.error(`Failed to ${editingClient ? "update" : "add"} client:`, error.message);
      alert(`Failed to ${editingClient ? "update" : "add"} client: ${error.message}`);
    }
  };

  const handleEditClient = (client) => {
    setNewClient(client);
    setEditingClient(client.id);
  };

  const handleDeleteClient = async (id) => {
    if (!auth.currentUser) {
      alert("Please log in to delete a client.");
      return;
    }
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
      }
      fetchClients();
      alert("Client deleted successfully!");
    } catch (error) {
      console.error("Failed to delete client:", error.message);
      alert(`Failed to delete client: ${error.message}`);
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h4>{editingClient ? "Edit Client" : "Add Client"}</h4>
        <Form onSubmit={handleAddOrUpdateClient}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newClient.name}
              onChange={(e) =>
                setNewClient({ ...newClient, name: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Logo URL</Form.Label>
            <Form.Control
              type="text"
              value={newClient.logo}
              onChange={(e) =>
                setNewClient({ ...newClient, logo: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              value={newClient.shortDescription}
              onChange={(e) =>
                setNewClient({ ...newClient, shortDescription: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Full Description</Form.Label>
            <Form.Control
              as="textarea"
              value={newClient.fullDescription}
              onChange={(e) =>
                setNewClient({ ...newClient, fullDescription: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Collaboration</Form.Label>
            <Form.Control
              type="text"
              value={newClient.collaboration}
              onChange={(e) =>
                setNewClient({ ...newClient, collaboration: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Impact</Form.Label>
            <Form.Control
              as="textarea"
              value={newClient.impact}
              onChange={(e) =>
                setNewClient({ ...newClient, impact: e.target.value })
              }
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            {editingClient ? "Update Client" : "Add Client"}
          </Button>
          {editingClient && (
            <Button
              variant="secondary"
              onClick={() => {
                setEditingClient(null);
                setNewClient({
                  name: "",
                  logo: "",
                  shortDescription: "",
                  fullDescription: "",
                  collaboration: "",
                  impact: "",
                });
              }}
              className="ms-2"
            >
              Cancel Edit
            </Button>
          )}
        </Form>
      </Col>
      <Col md={6}>
        <h4>Clients</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleEditClient(client)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ClientManagement;
