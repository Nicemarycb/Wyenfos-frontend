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
            <Button variant={variant === "danger" ? "danger" : "primary"} onClick={onConfirm}>
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

const InternshipInquiries = ({ inquiries, setInquiries, fetchInquiries, API_URL }) => {
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

  const handleAcceptInquiry = async (id) => {
    if (!auth.currentUser) {
      showAlertModal("Authentication Error", "Please log in to accept an inquiry.", "danger");
      return;
    }
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(`${API_URL}/internship-inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ status: "Accepted" }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
      }
      await fetchInquiries();
      showAlertModal("Success", "Inquiry accepted successfully!", "success");
    } catch (error) {
      console.error("Failed to accept inquiry:", error.message);
      showAlertModal("Error", `Failed to accept inquiry: ${error.message}`, "danger");
    }
  };

  const handleRejectInquiry = async (id) => {
    if (!auth.currentUser) {
      showAlertModal("Authentication Error", "Please log in to reject an inquiry.", "danger");
      return;
    }
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(`${API_URL}/internship-inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ status: "Rejected" }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
      }
      await fetchInquiries();
      showAlertModal("Success", "Inquiry rejected successfully!", "success");
    } catch (error) {
      console.error("Failed to reject inquiry:", error.message);
      showAlertModal("Error", `Failed to reject inquiry: ${error.message}`, "danger");
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!auth.currentUser) {
      showAlertModal("Authentication Error", "Please log in to delete an inquiry.", "danger");
      return;
    }
    showAlertModal(
      "Confirm Delete",
      "Are you sure you want to delete this internship inquiry?",
      "danger",
      async () => {
        try {
          const idToken = await auth.currentUser.getIdToken(true);
          // Optimistic update: remove inquiry from state
          setInquiries((prevInquiries) => prevInquiries.filter((inquiry) => inquiry.id !== id));
          const response = await fetch(`${API_URL}/internship-inquiries/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          if (!response.ok) {
            const text = await response.text();
            let errorData;
            try {
              errorData = JSON.parse(text);
            } catch {
              throw new Error(`HTTP error! Status: ${response.status}, Response is not JSON: ${text.slice(0, 100)}...`);
            }
            // Revert optimistic update if request fails
            await fetchInquiries();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
          }
          showAlertModal("Success", "Inquiry deleted successfully!", "success");
        } catch (error) {
          console.error("Failed to delete inquiry:", error.message);
          showAlertModal("Error", `Failed to delete inquiry: ${error.message}`, "danger");
        }
        handleCloseAlertModal();
      }
    );
  };

  return (
    <><Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Message</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {inquiries.map((inquiry) => (
          <tr key={inquiry.id}>
            <td>{inquiry.name}</td>
            <td>{inquiry.email}</td>
            <td>{inquiry.role}</td>
            <td>{inquiry.message}</td>
            <td>{inquiry.status}</td>
            <td>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                {inquiry.status === "Pending" && (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAcceptInquiry(inquiry.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRejectInquiry(inquiry.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDeleteInquiry(inquiry.id)}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table><AlertModal
        show={alertModal.show}
        onHide={handleCloseAlertModal}
        title={alertModal.title}
        message={alertModal.message}
        variant={alertModal.variant}
        onConfirm={alertModal.onConfirm} /></>
    
  );
};

export default InternshipInquiries;