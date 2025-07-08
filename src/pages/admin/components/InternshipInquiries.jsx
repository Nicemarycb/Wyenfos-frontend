
import React from "react";
import { Table, Button } from "react-bootstrap";
import { auth } from "../../../firebase";

const InternshipInquiries = ({ inquiries, setInquiries, fetchInquiries, API_URL }) => {
  const handleAcceptInquiry = async (id) => {
    if (!auth.currentUser) {
      alert("Please log in to accept an inquiry.");
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
      fetchInquiries();
      alert("Inquiry accepted successfully!");
    } catch (error) {
      console.error("Failed to accept inquiry:", error.message);
      alert(`Failed to accept inquiry: ${error.message}`);
    }
  };

  const handleRejectInquiry = async (id) => {
    if (!auth.currentUser) {
      alert("Please log in to reject an inquiry.");
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
      fetchInquiries();
      alert("Inquiry rejected successfully!");
    } catch (error) {
      console.error("Failed to reject inquiry:", error.message);
      alert(`Failed to reject inquiry: ${error.message}`);
    }
  };

  return (
    <Table striped bordered hover>
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
              {inquiry.status === "Pending" && (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAcceptInquiry(inquiry.id)}
                    className="me-2"
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
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InternshipInquiries;