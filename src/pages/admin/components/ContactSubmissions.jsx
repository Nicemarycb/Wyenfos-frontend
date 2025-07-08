
import React from "react";
import { Table, Button } from "react-bootstrap";
import { auth } from "../../../firebase";

const ContactSubmissions = ({ contacts, setContacts, fetchContacts, API_URL }) => {
  const handleDeleteContact = async (id) => {
    if (!auth.currentUser) {
      alert("Please log in to delete a contact.");
      return;
    }
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
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Failed to delete contact:", error.message);
      alert(`Failed to delete contact: ${error.message}`);
    }
  };

  return (
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
                variant="danger"
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
  );
};

export default ContactSubmissions;