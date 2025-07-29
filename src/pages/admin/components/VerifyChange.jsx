import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';

const VerifyChange = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');
  const type = searchParams.get('type');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyChange = async () => {
      if (!token || !userId || !type) {
        setError('Invalid verification link');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://us-central1-wyenfos-b7b96.cloudfunctions.net/api/verify-change?token=${token}&userId=${userId}&type=${type}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Verification failed');
        setMessage(data.message);
        navigate('/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/login', {
          state: { success: data.message },
        });
      } catch (err) {
        setError(`Verification failed: ${err.message}`);
        navigate('/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/login', {
          state: { error: `Verification failed: ${err.message}` },
        });
      } finally {
        setLoading(false);
      }
    };

    verifyChange();
  }, [token, userId, type, navigate]);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className="p-4 shadow-sm text-center">
          <Card.Body>
            <h2 className="mb-4">Verifying Change...</h2>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default VerifyChange;