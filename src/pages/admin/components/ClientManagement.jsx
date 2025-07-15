import React, { useState } from "react";
import { Row, Col, Form, Button, Table, Modal } from "react-bootstrap";
import { auth } from "../../../firebase";

const AlertModal = ({ show, onHide, title, message, variant, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={variant === "success" ? "text-success" : "text-danger"}>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        {onConfirm ? (
          <>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              OK
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

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
  const [showModal, setShowModal] = useState(false);
  const [alertModal, setAlertModal] = useState({
    show: false,
    title: "",
    message: "",
    variant: "success",
    onConfirm: null,
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setEditingClient(null);
    setNewClient({
      name: "",
      logo: "",
      shortDescription: "",
      fullDescription: "",
      collaboration: "",
      impact: "",
    });
    setShowModal(false);
  };

  const handleCloseAlertModal = () => {
    setAlertModal({ show: false, title: "", message: "", variant: "success", onConfirm: null });
  };

  const showAlertModal = (title, message, variant = "success", onConfirm = null) => {
    setAlertModal({ show: true, title, message, variant, onConfirm });
  };

  const handleAddOrUpdateClient = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      showAlertModal("Authentication Error", "Please log in to add or update a client.", "danger");
      return;
    }
    const method = editingClient ? "PUT" : "POST";
    const url = editingClient ? `${API_URL}/clients/${editingClient}` : `${API_URL}/clients`;
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(newClient),
      });
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          throw new Error(`HTTP error! Status: ${response.status}, Response is not JSON`);
        }
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
      }
      await response.json();
      await fetchClients();
      handleCloseModal();
      showAlertModal(
        "Success",
        `Client ${editingClient ? "updated" : "added"} successfully!`,
        "success"
      );
    } catch (error) {
      console.error(`Failed to ${editingClient ? "update" : "add"} client:`, error.message);
      showAlertModal(
        "Error",
        `Failed to ${editingClient ? "update" : "add"} client: ${error.message}`,
        "danger"
      );
    }
  };

  const handleEditClient = (client) => {
    setNewClient(client);
    setEditingClient(client.id);
    handleShowModal();
  };

  const handleDeleteClient = async (id) => {
    if (!auth.currentUser) {
      showAlertModal("Authentication Error", "Please log in to delete a client.", "danger");
      return;
    }
    showAlertModal(
      "Confirm Delete",
      "Are you sure you want to delete this client?",
      "danger",
      async () => {
        try {
          const idToken = await auth.currentUser.getIdToken(true);
          // Optimistic update
          setClients((prevClients) => prevClients.filter((client) => client.id !== id));
          const response = await fetch(`${API_URL}/clients/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          if (!response.ok) {
            let errorData;
            try {
              errorData = await response.json();
            } catch {
              throw new Error(`HTTP error! Status: ${response.status}, Response is not JSON`);
            }
            // Revert optimistic update
            await fetchClients();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
          }
          showAlertModal("Success", "Client deleted successfully!", "success");
        } catch (error) {
          console.error("Failed to delete client:", error.message);
          showAlertModal("Error", `Failed to delete client: ${error.message}`, "danger");
        }
        handleCloseAlertModal();
      }
    );
  };

  return (
    <Row>
      <Col md={12}>
        <Button variant="primary" className="mb-3" onClick={handleShowModal}>Add Client</Button>
        <h4>Clients</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Logo</th>
              <th>Short Description</th>
              <th>Collaboration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.logo && <img src={client.logo} alt="Client Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />}</td>
                <td>{client.shortDescription}</td>
                <td>{client.collaboration}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleEditClient(client)} className="me-2">Edit</Button>
                  <Button variant="secondary" size="sm" onClick={() => handleDeleteClient(client.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={handleCloseModal} centered animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{editingClient ? "Edit Client" : "Add Client"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddOrUpdateClient}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Logo URL</Form.Label>
                <Form.Control
                  type="text"
                  value={newClient.logo}
                  onChange={(e) => setNewClient({ ...newClient, logo: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={newClient.shortDescription}
                  onChange={(e) => setNewClient({ ...newClient, shortDescription: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Full Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={newClient.fullDescription}
                  onChange={(e) => setNewClient({ ...newClient, fullDescription: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Collaboration</Form.Label>
                <Form.Control
                  type="text"
                  value={newClient.collaboration}
                  onChange={(e) => setNewClient({ ...newClient, collaboration: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Impact</Form.Label>
                <Form.Control
                  as="textarea"
                  value={newClient.impact}
                  onChange={(e) => setNewClient({ ...newClient, impact: e.target.value })}
                />
              </Form.Group>
              <Button type="submit" variant="primary">{editingClient ? "Update Client" : "Add Client"}</Button>
              <Button variant="secondary" onClick={handleCloseModal} className="ms-2">Cancel</Button>
            </Form>
          </Modal.Body>
        </Modal>
        <AlertModal
          show={alertModal.show}
          onHide={handleCloseAlertModal}
          title={alertModal.title}
          message={alertModal.message}
          variant={alertModal.variant}
          onConfirm={alertModal.onConfirm}
        />
      </Col>
    </Row>
  );
};

export default ClientManagement;