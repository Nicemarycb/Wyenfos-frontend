import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import { auth } from "../../../firebase";

const AdvertisementManagement = ({ advertisements, setAdvertisements, fetchAdvertisements, API_URL }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [formData, setFormData] = useState({ title: "", image: "", video: "" });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleShowModal = (ad = null) => {
    setCurrentAd(ad);
    setFormData(ad ? { title: ad.title, image: ad.image, video: ad.video } : { title: "", image: "", video: "" });
    setImageFile(null);
    setVideoFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "image") setImageFile(reader.result);
        else if (type === "video") setVideoFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const url = currentAd ? `${API_URL}/advertisements/${currentAd.id}` : `${API_URL}/advertisements`;
      const method = currentAd ? "PUT" : "POST";
      const body = {
        title: formData.title,
        image: imageFile || formData.image,
        video: videoFile || formData.video,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
      }

      await fetchAdvertisements();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save advertisement:", error.message);
      alert(`Failed to save advertisement: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      try {
        const idToken = await auth.currentUser.getIdToken(true);
        const response = await fetch(`${API_URL}/advertisements/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${idToken}` },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
        }

        await fetchAdvertisements();
      } catch (error) {
        console.error("Failed to delete advertisement:", error.message);
        alert(`Failed to delete advertisement: ${error.message}`);
      }
    }
  };

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add Advertisement
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Video</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {advertisements.map((ad) => (
            <tr key={ad.id}>
              <td>{ad.title}</td>
              <td>
                {ad.image ? (
                  <img src={ad.image} alt={ad.title} style={{ width: "100px", height: "auto" }} />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                {ad.video ? (
                  <video width="100" controls>
                    <source src={ad.video} type="video/mp4" />
                  </video>
                ) : (
                  "No Video"
                )}
              </td>
              <td>
                <Button variant="info" className="me-2" onClick={() => handleShowModal(ad)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(ad.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentAd ? "Edit Advertisement" : "Add Advertisement"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "image")}
              />
              {formData.image && !imageFile && (
                <img src={formData.image} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Video</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, "video")}
              />
              {formData.video && !videoFile && (
                <video width="100" controls style={{ marginTop: "10px" }}>
                  <source src={formData.video} type="video/mp4" />
                </video>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdvertisementManagement;