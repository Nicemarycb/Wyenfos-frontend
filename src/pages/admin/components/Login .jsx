import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Modal } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../../firebase';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for main login password visibility
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [emailToChange, setEmailToChange] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false); // State for confirm password visibility
  const [changeError, setChangeError] = useState('');
  const [changeMessage, setChangeMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.error) setError(location.state.error);
    if (location.state?.success) setMessage(location.state.success);
    if (location.state?.message) setMessage(location.state.message);

    const timer = setTimeout(() => {
      setError('');
      setMessage('');
      navigate(location.pathname, { replace: true, state: {} });
    }, 5000);
    return () => clearTimeout(timer);
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const pendingLink = localStorage.getItem('pendingVerificationLink');
      navigate(pendingLink || '/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection');
      localStorage.removeItem('pendingVerificationLink');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setChangeError('');
    setChangeMessage('');
    if (!emailToChange || !newEmail || !confirmNewEmail) {
      setChangeError('Email of account to change, new email, and confirmation are required.');
      return;
    }
    if (newEmail !== confirmNewEmail) {
      setChangeError('New email and confirm email do not match.');
      return;
    }
    try {
      const response = await fetch('https://us-central1-wyenfos-b7b96.cloudfunctions.net/api/requestEmailChange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailToChange, newEmail }),
      });
      const text = await response.text();
      const data = JSON.parse(text);
      if (!response.ok) {
        throw new Error(data.error || 'Failed to request email change.');
      }
      setChangeMessage(data.message);
      setEmailToChange('');
      setNewEmail('');
      setConfirmNewEmail('');
      setShowChangeEmailModal(false);
    } catch (error) {
      setChangeError(`Failed to request email change: ${error.message}`);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setChangeError('');
    setChangeMessage('');

    // Validate inputs for the change request
    if (!emailToChange || !newPassword || !confirmNewPassword) {
      setChangeError('Email of account to change, new password, and confirmation are required.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setChangeError('New password and confirm password do not match.');
      return;
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setChangeError(
        'Password is not strong enough. It must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).'
      );
      return;
    }

    try {
      const response = await fetch('https://us-central1-wyenfos-b7b96.cloudfunctions.net/api/requestPasswordChange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailToChange, newPassword }),
      });
      const text = await response.text();
      const data = JSON.parse(text);
      if (!response.ok) {
        throw new Error(data.error || 'Failed to request password change.');
      }
      setChangeMessage(data.message);
      setEmailToChange('');
      setNewPassword('');
      setConfirmNewPassword('');
      setShowChangePasswordModal(false);
    } catch (error) {
      setChangeError(`Failed to request password change: ${error.message}`);
    }
  };

  const handleShowChangeEmailModal = () => setShowChangeEmailModal(true);
  const handleCloseChangeEmailModal = () => {
    setShowChangeEmailModal(false);
    setEmailToChange('');
    setNewEmail('');
    setConfirmNewEmail('');
    setChangeError('');
    setChangeMessage('');
  };
  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);
  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
    setEmailToChange('');
    setNewPassword('');
    setConfirmNewPassword('');
    setChangeError('');
    setChangeMessage('');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmNewPasswordVisibility = () => setShowConfirmNewPassword(!showConfirmNewPassword);

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="p-4 shadow-lg border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body>
          <h2
            className="text-center mb-4 fw-bold"
            style={{
              fontSize: '1.5rem',
              background: 'linear-gradient(90deg, #007bff, #6610f2, #6f42c1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shine 4s linear infinite',
              fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Admin Login
          </h2>
          <style>
            {`
@keyframes shine {
  0% {
    background-position: -500px;
  }
  100% {
    background-position: 500px;
  }
}
`}
          </style>
          {error && <Alert variant="danger" className="rounded-pill">{error}</Alert>}
          {message && <Alert variant="success" className="rounded-pill">{message}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-pill"
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-pill pe-4"
                  placeholder="Enter your password"
                />
                <i
                  className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y`}
                  style={{ cursor: 'pointer', right: '10px', fontSize: '1.1rem', color: '#6c757d' }}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </Form.Group>
            <Button type="submit" className="w-100 rounded-pill py-2 mb-3" variant="primary">
              Log In
            </Button>
          </Form>
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="outline-primary"
              className="rounded-pill flex-grow-1 me-2"
              onClick={handleShowChangeEmailModal}
            >
              Change Email
            </Button>
            <Button
              variant="outline-primary"
              className="rounded-pill flex-grow-1"
              onClick={handleShowChangePasswordModal}
            >
              Change Password
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Change Email Modal */}
      <Modal show={showChangeEmailModal} onHide={handleCloseChangeEmailModal} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-primary">Change Email</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          {changeError && <Alert variant="danger" className="rounded-pill">{changeError}</Alert>}
          {changeMessage && <Alert variant="success" className="rounded-pill">{changeMessage}</Alert>}
          <Form onSubmit={handleChangeEmail}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Current Email</Form.Label>
              <Form.Control
                type="email"
                value={emailToChange}
                onChange={(e) => setEmailToChange(e.target.value)}
                required
                className="rounded-pill"
                placeholder="Enter current email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">New Email</Form.Label>
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="rounded-pill"
                placeholder="Enter new email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Confirm New Email</Form.Label>
              <Form.Control
                type="email"
                value={confirmNewEmail}
                onChange={(e) => setConfirmNewEmail(e.target.value)}
                required
                className="rounded-pill"
                placeholder="Confirm new email"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 rounded-pill py-2">
              Request Change
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" className="rounded-pill" onClick={handleCloseChangeEmailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showChangePasswordModal} onHide={handleCloseChangePasswordModal} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-primary">Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          {changeError && <Alert variant="danger" className="rounded-pill">{changeError}</Alert>}
          {changeMessage && <Alert variant="success" className="rounded-pill">{changeMessage}</Alert>}
          <Form onSubmit={handleChangePassword}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Current Email</Form.Label>
              <Form.Control
                type="email"
                value={emailToChange}
                onChange={(e) => setEmailToChange(e.target.value)}
                required
                className="rounded-pill"
                placeholder="Enter current email"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">New Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="rounded-pill pe-4"
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
                <i
                  className={`bi ${showNewPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y`}
                  style={{ cursor: 'pointer', right: '10px', fontSize: '1.1rem', color: '#6c757d' }}
                  onClick={toggleNewPasswordVisibility}
                ></i>
              </div>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Confirm New Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="rounded-pill pe-4"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                />
                <i
                  className={`bi ${showConfirmNewPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute top-50 end-0 translate-middle-y`}
                  style={{ cursor: 'pointer', right: '10px', fontSize: '1.1rem', color: '#6c757d' }}
                  onClick={toggleConfirmNewPasswordVisibility}
                ></i>
              </div>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 rounded-pill py-2">
              Submit Change
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" className="rounded-pill" onClick={handleCloseChangePasswordModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;