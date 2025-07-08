import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";

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
      <h2 className="text-center mb-4">{isPreview ? "Advertisements Preview" : "Our Advertisements"}</h2>
      {advertisements.length === 0 ? (
        <p className="text-center">No advertisements available.</p>
      ) : (
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
      )}
    </Container>
  );
};

export default AdvertisementSection;