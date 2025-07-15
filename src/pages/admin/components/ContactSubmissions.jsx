import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
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

const ContactSubmissions = ({ contacts, setContacts, fetchContacts, API_URL }) => {
  const [alertModal, setAlertModal] = useState({
    show: false,
    title: "",
    message: "",
    variant: "success",
    onConfirm: null,
  });

  const handleCloseAlertModal = () => {
    setAlertModal({ show: false, title: "", message: "", variant: "success", onConfirm: null });
  };

  const showAlertModal = (title, message, variant = "success", onConfirm = null) => {
    setAlertModal({ show: true, title, message, variant, onConfirm });
  };

  const handleDeleteContact = async (id) => {
    if (!auth.currentUser) {
      showAlertModal("Authentication Error", "Please log in to delete a contact.", "danger");
      return;
    }
    showAlertModal(
      "Confirm Delete",
      "Are you sure you want to delete this contact?",
      "danger",
      async () => {
        try {
          const idToken = await auth.currentUser.getIdToken(true);
          const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
          }
          fetchContacts();
          showAlertModal("Success", "Contact deleted successfully!", "success");
        } catch (error) {
          console.error("Failed to delete contact:", error.message);
          showAlertModal("Error", `Failed to delete contact: ${error.message}`, "danger");
        }
        handleCloseAlertModal();
      }
    );
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.message}</td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AlertModal
        show={alertModal.show}
        onHide={handleCloseAlertModal}
        title={alertModal.title}
        message={alertModal.message}
        variant={alertModal.variant}
        onConfirm={alertModal.onConfirm}
      />
    </>
  );
};

export default ContactSubmissions;