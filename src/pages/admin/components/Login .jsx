import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Modal } from 'react-bootstrap';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetMessage('');
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage('Password reset email sent! Please check your inbox.');
      setResetEmail('');
      setShowResetModal(false);
    } catch (err) {
      setResetError('Failed to send reset email. Please check the email address.');
      console.error('Password reset error:', err.message);
    }
  };

  const handleShowResetModal = () => setShowResetModal(true);
  const handleCloseResetModal = () => {
    setShowResetModal(false);
    setResetEmail('');
    setResetError('');
    setResetMessage('');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: '100vh' }}>
      <Card className="shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Header className="bg-primary text-white text-center">
          <h2 className="mb-0">Admin Login</h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
          {resetMessage && <Alert variant="success" className="mb-3">{resetMessage}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            <div className="d-flex justify-content-between mb-3">
              <Button type="submit" variant="primary" className="rounded-pill py-2">
                Login
              </Button>
              <Button variant="link" onClick={handleShowResetModal}>
                Forgot Password?
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Password Reset Modal */}
      <Modal show={showResetModal} onHide={handleCloseResetModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resetError && <Alert variant="danger">{resetError}</Alert>}
          {resetMessage && <Alert variant="success">{resetMessage}</Alert>}
          <Form onSubmit={handlePasswordReset}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 rounded-pill py-2">
              Send Reset Email
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResetModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;