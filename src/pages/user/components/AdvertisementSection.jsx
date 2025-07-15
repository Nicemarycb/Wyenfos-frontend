import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card, Button } from "react-bootstrap";

const AdvertisementSection = ({ isPreview = false }) => {
  const [advertisements, setAdvertisements] = useState([]);
  const API_URL = "https://us-central1-wyenfos-b7b96.cloudfunctions.net/api";

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(`${API_URL}/advertisements`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
        }
        const data = await response.json();
        setAdvertisements(data);
      } catch (error) {
        console.error("Failed to fetch advertisements:", error.message);
        setAdvertisements([]);
      }
    };
    fetchAdvertisements();
  }, []);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">{isPreview ? "" : "Our Advertisements"}</h2>
      {isPreview && (
        <div className="d-flex justify-content-center mb-5">
          <Button
            href="/advertisements"
            variant="light"
            size="lg"
            className="fw-bold text-dark"
          >
           Advertisements Preview
          </Button>
        </div>
      )}
      {advertisements.length === 0 ? (
        <p className="text-center">No advertisements available.</p>
      ) : (
        <Row>
          {isPreview ? (
            <Col>
              <Carousel>
                {advertisements.map((ad) => (
                  <Carousel.Item key={ad.id}>
                    <Card className="text-center">
                      <Card.Body>
                        {ad.image && (
                          <img
                            src={ad.image}
                            alt={ad.title}
                            style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }}
                          />
                        )}
                        {ad.video && (
                          <video
                            width="100%"
                            style={{ maxHeight: "400px" }}
                            controls
                            className="mt-3"
                          >
                            <source src={ad.video} type="video/mp4" />
                          </video>
                        )}
                        <Card.Title className="mt-3">{ad.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          ) : (
            <Row className="g-4">
              {advertisements.map((ad) => (
                <Col md={4} key={ad.id}>
                  <Card className="h-100 text-center shadow-sm">
                    <Card.Body>
                      {ad.image && (
                        <img
                          src={ad.image}
                          alt={ad.title}
                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                      )}
                      {ad.video && (
                        <video
                          width="100%"
                          height="auto"
                          controls
                          className="mt-3"
                        >
                          <source src={ad.video} type="video/mp4" />
                        </video>
                      )}
                      <Card.Title className="mt-3">{ad.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Row>
      )}
    </Container>
  );
};

export default AdvertisementSection;