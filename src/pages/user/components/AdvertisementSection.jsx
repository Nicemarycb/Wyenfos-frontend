import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "./AdvertisementSection.css";

const AdvertisementSection = ({ isPreview = false }) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(`${API_URL}/advertisements`);
        const data = await response.json();
        setAdvertisements(data);
        setFilteredAds(data);
      } catch (error) {
        console.error("Failed to fetch advertisements:", error.message);
      }
    };
    fetchAdvertisements();
  }, []);

  useEffect(() => {
    const filtered = advertisements.filter((ad) =>
      ad.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredAds(filtered);
  }, [searchText, advertisements]);

  const handleAdClick = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
  };

  return (
    <Container className="py-5 advertisement-container">
      {!isPreview && <h2 className="text-center mb-4">Our Advertisements</h2>}

      {isPreview ? (
        <>
          <h3 className="text-center mb-4">Advertisements Preview</h3>
          <Carousel>
            {advertisements.slice(0, 5).map((ad) => (
              <Carousel.Item key={ad.id}>
                <div className="d-flex justify-content-center">
                  {ad.image && (
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="carousel-image"
                    />
                  )}
                  {ad.video && (
                    <video className="carousel-video" controls>
                      <source src={ad.video} type="video/mp4" />
                    </video>
                  )}
                </div>
                <Carousel.Caption>
                  <h5 className="text-white text-shadow bg-dark bg-opacity-50 px-2 py-1 rounded">
                    {ad.title}
                  </h5>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="text-center mt-4">
            <Button href="/advertisements" className="preview-btn">
              View All
            </Button>
          </div>
        </>
      ) : (
        <Row>
          {/* Sidebar Filter */}
          <Col md={3}>
            <Card className="p-3 shadow-sm">
              <h5 className="mb-3 fw-bold">Search Advertisement</h5>
              <Form.Control
                type="text"
                placeholder="Search by title..."
                className="filter-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              {/* Added Buttons */}
              <div className="d-grid gap-2 mt-3">
                <Button
                  className="internship-btn"
                  href="/internship/apply"
                >
                  Apply Internship
                </Button>

                <Button
                  className="hiring-btn"
                  href="/internship/apply"
                >
                  Hiring

                </Button>
              </div>
            </Card>
          </Col>

          {/* Advertisement Cards */}
          <Col md={9}>
            <Row className="g-4 align-items-stretch">
              {filteredAds.length === 0 ? (
                <p className="text-center">No advertisements found.</p>
              ) : (
                filteredAds.map((ad) => (
                  <Col md={6} lg={4} key={ad.id}>
                    <Card
                      className="h-100 shadow-sm ad-card"
                      onClick={() => handleAdClick(ad)}
                    >
                      <Card.Body className="text-center p-0">
                        <div className="ad-media-wrapper">
                          {ad.image && (
                            <img
                              src={ad.image}
                              alt={ad.title}
                              className="ad-image"
                            />
                          )}
                          {ad.video && (
                            <video className="ad-video" controls>
                              <source src={ad.video} type="video/mp4" />
                            </video>
                          )}
                        </div>
                        <Card.Title className="card-title">
                          {ad.title}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      )}

      {/* Modal for Enlarged Ad */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedAd?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {selectedAd?.image && (
            <img
              src={selectedAd.image}
              alt={selectedAd.title}
              style={{ width: "100%", height: "auto", borderRadius: "12px" }}
            />
          )}
          {selectedAd?.video && (
            <video
              width="100%"
              height="auto"
              controls
              style={{ borderRadius: "12px" }}
            >
              <source src={selectedAd.video} type="video/mp4" />
            </video>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdvertisementSection;
