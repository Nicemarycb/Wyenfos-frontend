// import React, { useState } from "react";
// import { Row, Col, Form, Button, Table, Image, Modal } from "react-bootstrap";
// import { auth } from "../../../firebase";

// const AlertModal = ({ show, onHide, title, message, variant, onConfirm }) => {
//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{title}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p className={variant === "success" ? "text-success" : "text-danger"}>{message}</p>
//       </Modal.Body>
//       <Modal.Footer>
//         {onConfirm ? (
//           <>
//             <Button variant="secondary" onClick={onHide}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={onConfirm}>
//               OK
//             </Button>
//           </>
//         ) : (
//           <Button variant="secondary" onClick={onHide}>
//             Close
//           </Button>
//         )}
//       </Modal.Footer>
//     </Modal>
//   );
// };

// const TeamManagement = ({ team, setTeam, fetchTeam, API_URL }) => {
//   const [newTeamMember, setNewTeamMember] = useState({
//     name: "",
//     role: "",
//     shortBio: "",
//     fullBio: "",
//     skills: "",
//     achievements: "",
//     video: "",
//     employeeId: "",
//     joiningDate: "",
//     bloodGroup: "",
//     profilePicture: "",
//     status: "Currently Working",
//     resignationReason: "",
//     terminationReason: "",
//     quotes: "",
//     emergencyPhone: "",
//   });
//   const [editingTeamMember, setEditingTeamMember] = useState(null);
//   const [file, setFile] = useState(null);
//   const [videoFile, setVideoFile] = useState(null); // For video file
//   const [showModal, setShowModal] = useState(false);
//   const [alertModal, setAlertModal] = useState({
//     show: false,
//     title: "",
//     message: "",
//     variant: "success",
//     onConfirm: null,
//   });

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setEditingTeamMember(null);
//     setNewTeamMember({
//       name: "",
//       role: "",
//       shortBio: "",
//       fullBio: "",
//       skills: "",
//       achievements: "",
//       video: "",
//       employeeId: "",
//       joiningDate: "",
//       bloodGroup: "",
//       profilePicture: "",
//       status: "Currently Working",
//       resignationReason: "",
//       terminationReason: "",
//       quotes: "",
//       emergencyPhone: "",
//     });
//     setFile(null);
//     setVideoFile(null);
//   };

//   const handleShowModal = (member = null) => {
//     if (member) {
//       setNewTeamMember({
//         name: member.name,
//         role: member.role,
//         shortBio: member.shortBio || "",
//         fullBio: member.fullBio || "",
//         skills: member.skills ? member.skills.join(", ") : "",
//         achievements: member.achievements || "",
//         video: member.video || "",
//         employeeId: member.employeeId,
//         joiningDate: member.joiningDate,
//         bloodGroup: member.bloodGroup,
//         profilePicture: member.profilePicture || "",
//         status: member.status || "Currently Working",
//         resignationReason: member.resignationReason || "",
//         terminationReason: member.terminationReason || "",
//         quotes: member.quotes || "",
//         emergencyPhone: member.emergencyPhone || "",
//       });
//       setEditingTeamMember(member.id);
//     } else {
//       setNewTeamMember({
//         name: "",
//         role: "",
//         shortBio: "",
//         fullBio: "",
//         skills: "",
//         achievements: "",
//         video: "",
//         employeeId: "",
//         joiningDate: "",
//         bloodGroup: "",
//         profilePicture: "",
//         status: "Currently Working",
//         resignationReason: "",
//         terminationReason: "",
//         quotes: "",
//         emergencyPhone: "",
//       });
//       setEditingTeamMember(null);
//     }
//     setShowModal(true);
//   };

//   const handleCloseAlertModal = () => {
//     setAlertModal({ show: false, title: "", message: "", variant: "success", onConfirm: null });
//   };

//   const showAlertModal = (title, message, variant = "success", onConfirm = null) => {
//     setAlertModal({ show: true, title, message, variant, onConfirm });
//   };

//   const handleMediaFileChange = (e, type) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       // Validate file type
//       const validImageTypes = ["image/jpeg", "image/png"];
//       const validVideoTypes = ["video/mp4", "video/webm"];
//       const isImage = type === "image";
//       const validTypes = isImage ? validImageTypes : validVideoTypes;
//       if (!validTypes.includes(selectedFile.type)) {
//         showAlertModal(
//           "Invalid File",
//           `Please upload a ${isImage ? "image" : "video"} file (e.g., ${isImage ? "JPEG, PNG" : "MP4, WebM"}).`,
//           "danger"
//         );
//         return;
//       }
//       // Validate file size (5MB for images, 50MB for videos)
//       const maxSize = isImage ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
//       if (selectedFile.size > maxSize) {
//         showAlertModal(
//           "File Too Large",
//           `${isImage ? "Image" : "Video"} size must be less than ${isImage ? "5MB" : "50MB"}.`,
//           "danger"
//         );
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (isImage) {
//           setNewTeamMember({ ...newTeamMember, profilePicture: reader.result });
//           setFile(selectedFile);
//         } else {
//           setNewTeamMember({ ...newTeamMember, video: reader.result });
//           setVideoFile(selectedFile);
//         }
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//    const validatePhoneNumber = (phone) => {
//     const phoneRegex = /^\+?[1-9]\d{1,14}$/;
//     return phone === "" || phoneRegex.test(phone);
//   };

//   const handleAddOrUpdateTeamMember = async (e) => {
//     e.preventDefault();
//     if (!auth.currentUser) {
//       showAlertModal("Authentication Error", "Please log in to add or update a team member.");
//       return;
//     }

//     const { name, role, employeeId, joiningDate, bloodGroup, status, resignationReason, terminationReason ,emergencyPhone } = newTeamMember;
//     if (!name || !role || !employeeId || !joiningDate || !bloodGroup || !status) {
//       showAlertModal("Missing Fields", "Please fill in all required fields: Name, Role, Employee ID, Joining Date, Blood Group, Status");
//       return;
//     }
//     if (status === "Resigned" && !resignationReason) {
//       showAlertModal("Missing Reason", "Please provide a resignation reason for resigned status.");
//       return;
//     }
//     if (status === "Terminated" && !terminationReason) {
//       showAlertModal("Missing Reason", "Please provide a termination reason for terminated status.");
//       return;
//     }
//     if (!validatePhoneNumber(emergencyPhone)) {
//       showAlertModal("Invalid Phone Number", "Please enter a valid emergency phone number (e.g., +1234567890) or leave it blank.");
//       return;
//     }

//     // --- Duplicate Check Logic ---
//     if (!editingTeamMember) {
//       const isDuplicate = team.some(member => member.employeeId === employeeId);
//       if (isDuplicate) {
//         showAlertModal("Duplicate Employee ID", "A team member with this Employee ID already exists. Please use a unique Employee ID.");
//         return;
//       }
//     }
//     // --- End Duplicate Check Logic ---

//     const method = editingTeamMember ? "PUT" : "POST";
//     const url = editingTeamMember
//       ? `${API_URL}/team/${editingTeamMember}`
//       : `${API_URL}/team`;
//     try {
//       const idToken = await auth.currentUser.getIdToken(true);
//       const response = await fetch(url, {
//         method: method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${idToken}`,
//         },
//         body: JSON.stringify({
//           ...newTeamMember,
//           skills: newTeamMember.skills ? newTeamMember.skills.split(",").map((s) => s.trim()) : [],
//         }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
//       }
//       await response.json();
//       fetchTeam();
//       handleCloseModal();
//       showAlertModal(
//         "Success",
//         `Team member ${editingTeamMember ? "updated" : "added"} successfully!`,
//         "success"
//       );
//     } catch (error) {
//       console.error(`Failed to ${editingTeamMember ? "update" : "add"} team member:`, error.message);
//       showAlertModal(
//         "Error",
//         `Failed to ${editingTeamMember ? "update" : "add"} team member: ${error.message}`,
//         "danger"
//       );
//     }
//   };

//   const handleDeleteTeamMember = async (id) => {
//     if (!auth.currentUser) {
//       showAlertModal("Authentication Error", "Please log in to delete a team member.", "danger");
//       return;
//     }
//     showAlertModal(
//       "Confirm Delete",
//       "Are you sure you want to delete this team member?",
//       "danger",
//       async () => {
//         try {
//           const idToken = await auth.currentUser.getIdToken(true);
//           const response = await fetch(`${API_URL}/team/${id}`, {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           });
//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
//           }
//           fetchTeam();
//           showAlertModal("Success", "Team member deleted successfully!", "success");
//         } catch (error) {
//           console.error("Failed to delete team member:", error.message);
//           showAlertModal("Error", `Failed to delete team member: ${error.message}`, "danger");
//         }
//         handleCloseAlertModal();
//       }
//     );
//   };

//   const handleShareQRCode = async (qrCode, name) => {
//     if (!qrCode) {
//       showAlertModal("No QR Code", "No QR code available to share.", "danger");
//       return;
//     }

//     const shareData = {
//       title: `QR Code for ${name}`,
//       text: `Scan this QR code to view ${name}'s profile`,
//       url: qrCode,
//     };

//     try {
//       if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
//         await navigator.share(shareData);
//         showAlertModal("Success", "QR code shared successfully!", "success");
//       } else {
//         await navigator.clipboard.writeText(qrCode);
//         showAlertModal("Success", "QR code URL copied to clipboard!", "success");
//       }
//     } catch (error) {
//       if (error.name === "AbortError") {
//       } else {
//         console.error("Failed to share QR code:", error.message);
//         showAlertModal("Error", `Failed to share QR code: ${error.message}`, "danger");
//       }
//     }
//   };

//   return (
//     <Row>
//       <Col xs={12}>
//         <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
//           Add Staff Member
//         </Button>
//       </Col>

//       <Modal show={showModal} onHide={handleCloseModal} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editingTeamMember ? "Edit Staff Member" : "Add Staff Member"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleAddOrUpdateTeamMember}>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={newTeamMember.name}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, name: e.target.value })
//                     }
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Role</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={newTeamMember.role}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, role: e.target.value })
//                     }
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Employee ID</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={newTeamMember.employeeId}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, employeeId: e.target.value })
//                     }
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Joining Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={newTeamMember.joiningDate}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, joiningDate: e.target.value })
//                     }
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Blood Group</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={newTeamMember.bloodGroup}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, bloodGroup: e.target.value })
//                     }
//                     required
//                   />
//                 </Form.Group>
//                  <Form.Group className="mb-3">
//                   <Form.Label>Emergency Phone</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     value={newTeamMember.emergencyPhone}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, emergencyPhone: e.target.value })
//                     }
//                     placeholder="+1234567890"
//                     isInvalid={newTeamMember.emergencyPhone && !validatePhoneNumber(newTeamMember.emergencyPhone)}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please enter a valid phone number (e.g., +1234567890) or leave blank.
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Select
//                     value={newTeamMember.status}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, status: e.target.value })
//                     }
//                     required
//                   >
//                     <option value="Currently Working">Currently Working</option>
//                     <option value="Resigned">Resigned</option>
//                     <option value="Terminated">Terminated</option>
//                   </Form.Select>
//                 </Form.Group>
//                 {newTeamMember.status === "Resigned" && (
//                   <Form.Group className="mb-3">
//                     <Form.Label>Resignation Reason</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       value={newTeamMember.resignationReason}
//                       onChange={(e) =>
//                         setNewTeamMember({ ...newTeamMember, resignationReason: e.target.value })
//                       }
//                       required
//                     />
//                   </Form.Group>
//                 )}
//                 {newTeamMember.status === "Terminated" && (
//                   <Form.Group className="mb-3">
//                     <Form.Label>Termination Reason</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       value={newTeamMember.terminationReason}
//                       onChange={(e) =>
//                         setNewTeamMember({ ...newTeamMember, terminationReason: e.target.value })
//                       }
//                       required
//                     />
//                   </Form.Group>
//                 )}
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Profile Picture</Form.Label>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleMediaFileChange(e, "image")}
//                   />
//                   {newTeamMember.profilePicture && (
//                     <img
//                       src={newTeamMember.profilePicture}
//                       alt="Profile Preview"
//                       style={{ maxWidth: "100px", marginTop: "10px" }}
//                     />
//                   )}
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Video</Form.Label>
//                   <Form.Control
//                     type="file"
//                     accept="video/mp4,video/webm"
//                     onChange={(e) => handleMediaFileChange(e, "video")}
//                   />
//                   {newTeamMember.video && (
//                     <video
//                       src={newTeamMember.video}
//                       controls
//                       style={{ maxWidth: "200px", marginTop: "10px" }}
//                     />
//                   )}
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Education</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     value={newTeamMember.shortBio}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, shortBio: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     value={newTeamMember.fullBio}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, fullBio: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Skills (comma-separated)</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={newTeamMember.skills}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, skills: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Achievements</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     value={newTeamMember.achievements}
//                     onChange={(e) =>
//                       setNewTeamMember({
//                         ...newTeamMember,
//                         achievements: e.target.value,
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Quotes</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     value={newTeamMember.quotes}
//                     onChange={(e) =>
//                       setNewTeamMember({ ...newTeamMember, quotes: e.target.value })
//                     }
//                   />
//                 </Form.Group>

//               </Col>
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button type="submit" variant="primary" onClick={handleAddOrUpdateTeamMember}>
//             {editingTeamMember ? "Update Member" : "Add Member"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <AlertModal
//         show={alertModal.show}
//         onHide={handleCloseAlertModal}
//         title={alertModal.title}
//         message={alertModal.message}
//         variant={alertModal.variant}
//         onConfirm={alertModal.onConfirm}
//       />

//       <Col md={12}>
//         <h4>Staff Members</h4>
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Employee ID</th>
//               <th>Joining Date</th>
//               <th>Blood Group</th>
//               <th>Status</th>
//               {/* <th>Quotes</th> */}
//               <th>QR Code</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {team.map((member) => (
//               <tr key={member.id}>
//                 <td>{member.name}</td>
//                 <td>{member.role}</td>
//                 <td>{member.employeeId}</td>
//                 <td>{member.joiningDate}</td>
//                 <td>{member.bloodGroup}</td>
//                 <td>{member.status}</td>
//                 {/* <td>{member.quotes}</td> */}
//                 <td>
//                   {member.qrCode ? (
//                     <Image
//                       src={member.qrCode}
//                       alt={`QR Code for ${member.name}`}
//                       style={{ maxWidth: "50px" }}
//                     />
//                   ) : (
//                     "No QR Code"
//                   )}
//                 </td>
//                 <td>
//                   <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
//                     <Button
//                       variant="info"
//                       size="sm"
//                       onClick={() => handleShowModal(member)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="secondary"
//                       size="sm"
//                       onClick={() => handleDeleteTeamMember(member.id)}
//                     >
//                       Delete
//                     </Button>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => handleShareQRCode(member.qrCode, member.name)}
//                       disabled={!member.qrCode}
//                     >
//                       Share
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Col>
//     </Row>
//   );
// };
import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Table,
  Image,
  Modal,
  Spinner,
} from "react-bootstrap";
import { auth } from "../../../firebase";

const AlertModal = ({ show, onHide, title, message, variant, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={variant === "success" ? "text-success" : "text-danger"}>
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {onConfirm ? (
          <>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm}>
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

const TeamManagement = ({ team, setTeam, fetchTeam, API_URL }) => {
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    shortBio: "",
    fullBio: "",
    skills: "",
    achievements: "",
    video: "",
    employeeId: "",
    joiningDate: "",
    bloodGroup: "",
    profilePicture: "",
    status: "Currently Working",
    resignationReason: "",
    terminationReason: "",
    quotes: "",
    emergencyPhone: "",
  });
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alertModal, setAlertModal] = useState({
    show: false,
    title: "",
    message: "",
    variant: "success",
    onConfirm: null,
  });
  const [isSharing, setIsSharing] = useState(false); // New state for sharing status

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTeamMember(null);
    setNewTeamMember({
      name: "",
      role: "",
      shortBio: "",
      fullBio: "",
      skills: "",
      achievements: "",
      video: "",
      employeeId: "",
      joiningDate: "",
      bloodGroup: "",
      profilePicture: "",
      status: "Currently Working",
      resignationReason: "",
      terminationReason: "",
      quotes: "",
      emergencyPhone: "",
    });
    setFile(null);
    setVideoFile(null);
  };

  const handleShowModal = (member = null) => {
    if (member) {
      setNewTeamMember({
        name: member.name,
        role: member.role,
        shortBio: member.shortBio || "",
        fullBio: member.fullBio || "",
        skills: member.skills ? member.skills.join(", ") : "",
        achievements: member.achievements || "",
        video: member.video || "",
        employeeId: member.employeeId,
        joiningDate: member.joiningDate,
        bloodGroup: member.bloodGroup,
        profilePicture: member.profilePicture || "",
        status: member.status || "Currently Working",
        resignationReason: member.resignationReason || "",
        terminationReason: member.terminationReason || "",
        quotes: member.quotes || "",
        emergencyPhone: member.emergencyPhone || "",
      });
      setEditingTeamMember(member.id);
    } else {
      setNewTeamMember({
        name: "",
        role: "",
        shortBio: "",
        fullBio: "",
        skills: "",
        achievements: "",
        video: "",
        employeeId: "",
        joiningDate: "",
        bloodGroup: "",
        profilePicture: "",
        status: "Currently Working",
        resignationReason: "",
        terminationReason: "",
        quotes: "",
        emergencyPhone: "",
      });
      setEditingTeamMember(null);
    }
    setShowModal(true);
  };

  const handleCloseAlertModal = () => {
    setAlertModal({
      show: false,
      title: "",
      message: "",
      variant: "success",
      onConfirm: null,
    });
  };

  const showAlertModal = (
    title,
    message,
    variant = "success",
    onConfirm = null
  ) => {
    setAlertModal({ show: true, title, message, variant, onConfirm });
  };

  const handleMediaFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validImageTypes = ["image/jpeg", "image/png"];
      const validVideoTypes = ["video/mp4", "video/webm"];
      const isImage = type === "image";
      const validTypes = isImage ? validImageTypes : validVideoTypes;
      if (!validTypes.includes(selectedFile.type)) {
        showAlertModal(
          "Invalid File",
          `Please upload a ${isImage ? "image" : "video"} file (e.g., ${
            isImage ? "JPEG, PNG" : "MP4, WebM"
          }).`,
          "danger"
        );
        return;
      }
      const maxSize = isImage ? 5 * 1024 * 1024 : 50 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        showAlertModal(
          "File Too Large",
          `${isImage ? "Image" : "Video"} size must be less than ${
            isImage ? "5MB" : "50MB"
          }.`,
          "danger"
        );
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isImage) {
          setNewTeamMember({ ...newTeamMember, profilePicture: reader.result });
          setFile(selectedFile);
        } else {
          setNewTeamMember({ ...newTeamMember, video: reader.result });
          setVideoFile(selectedFile);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phone === "" || phoneRegex.test(phone);
  };

  const handleAddOrUpdateTeamMember = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      showAlertModal(
        "Authentication Error",
        "Please log in to add or update a team member."
      );
      return;
    }

    const {
      name,
      role,
      employeeId,
      joiningDate,
      bloodGroup,
      status,
      resignationReason,
      terminationReason,
      emergencyPhone,
    } = newTeamMember;
    if (
      !name ||
      !role ||
      !employeeId ||
      !joiningDate ||
      !bloodGroup ||
      !status
    ) {
      showAlertModal(
        "Missing Fields",
        "Please fill in all required fields: Name, Role, Employee ID, Joining Date, Blood Group, Status"
      );
      return;
    }
    if (status === "Resigned" && !resignationReason) {
      showAlertModal(
        "Missing Reason",
        "Please provide a resignation reason for resigned status."
      );
      return;
    }
    if (status === "Terminated" && !terminationReason) {
      showAlertModal(
        "Missing Reason",
        "Please provide a termination reason for terminated status."
      );
      return;
    }
    if (!validatePhoneNumber(emergencyPhone)) {
      showAlertModal(
        "Invalid Phone Number",
        "Please enter a valid emergency phone number (e.g., +1234567890) or leave it blank."
      );
      return;
    }

    if (!editingTeamMember) {
      const isDuplicate = team.some(
        (member) => member.employeeId === employeeId
      );
      if (isDuplicate) {
        showAlertModal(
          "Duplicate Employee ID",
          "A team member with this Employee ID already exists. Please use a unique Employee ID."
        );
        return;
      }
    }

    const method = editingTeamMember ? "PUT" : "POST";
    const url = editingTeamMember
      ? `${API_URL}/team/${editingTeamMember}`
      : `${API_URL}/team`;
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          ...newTeamMember,
          skills: newTeamMember.skills
            ? newTeamMember.skills.split(",").map((s) => s.trim())
            : [],
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorData.error || "Unknown error"
          }`
        );
      }
      await response.json();
      fetchTeam();
      handleCloseModal();
      showAlertModal(
        "Success",
        `Team member ${editingTeamMember ? "updated" : "added"} successfully!`,
        "success"
      );
    } catch (error) {
      console.error(
        `Failed to ${editingTeamMember ? "update" : "add"} team member:`,
        error.message
      );
      showAlertModal(
        "Error",
        `Failed to ${editingTeamMember ? "update" : "add"} team member: ${
          error.message
        }`,
        "danger"
      );
    }
  };

  const handleDeleteTeamMember = async (id) => {
    if (!auth.currentUser) {
      showAlertModal(
        "Authentication Error",
        "Please log in to delete a team member.",
        "danger"
      );
      return;
    }
    showAlertModal(
      "Confirm Delete",
      "Are you sure you want to delete this team member?",
      "danger",
      async () => {
        try {
          const idToken = await auth.currentUser.getIdToken(true);
          const response = await fetch(`${API_URL}/team/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `HTTP error! Status: ${response.status}, Message: ${
                errorData.error || "Unknown error"
              }`
            );
          }
          fetchTeam();
          showAlertModal(
            "Success",
            "Team member deleted successfully!",
            "success"
          );
        } catch (error) {
          console.error("Failed to delete team member:", error.message);
          showAlertModal(
            "Error",
            `Failed to delete team member: ${error.message}`,
            "danger"
          );
        }
        handleCloseAlertModal();
      }
    );
  };

  // const handleShareQRCode = async (qrCode, name) => {
  //   if (!qrCode) {
  //     showAlertModal("No QR Code", "No QR code available to share.", "danger");
  //     return;
  //   }

  //   const shareData = {
  //     title: `QR Code for ${name}`,
  //     text: `Scan this QR code to view ${name}'s profile`,
  //     url: qrCode,
  //   };

  //   setIsSharing(true);

  //   try {
  //     if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
  //       await navigator.share(shareData);
  //       showAlertModal("Success", "QR code shared successfully!", "success");
  //     } else {
  //       await navigator.clipboard.writeText(qrCode);
  //       showAlertModal("Success", "QR code URL copied to clipboard!", "success");
  //     }
  //   } catch (error) {
  //     if (error.name === "AbortError") {
  //       // User cancelled, do nothing
  //     } else {
  //       console.error("Failed to share QR code:", error.message);
  //       showAlertModal("Error", `Failed to share QR code: ${error.message}`, "danger");
  //     }
  //   } finally {
  //     setIsSharing(false);
  //   }
  // };
  const handleShareQRCode = async (qrCode, name) => {
    if (!qrCode) {
      showAlertModal("No QR Code", "No QR code available to share.", "danger");
      return;
    }

    const shareData = {
      title: `QR Code for ${name}`,
      text: `Scan this QR code to view ${name}'s profile`,
      url: qrCode,
    };

    try {
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
        // showAlertModal("Success", "QR code shared successfully!", "success");
      } else {
        await navigator.clipboard.writeText(qrCode);
        showAlertModal(
          "Success",
          "QR code URL copied to clipboard!",
          "success"
        );
      }
    } catch (error) {
      if (error.name === "AbortError") {
      } else {
        console.error("Failed to share QR code:", error.message);
        showAlertModal(
          "Error",
          `Failed to share QR code: ${error.message}`,
          "danger"
        );
      }
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => handleShowModal()}
        >
          Add Staff Member
        </Button>
      </Col>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTeamMember ? "Edit Staff Member" : "Add Staff Member"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddOrUpdateTeamMember}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTeamMember.name}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTeamMember.role}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        role: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTeamMember.employeeId}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        employeeId: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={newTeamMember.joiningDate}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        joiningDate: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTeamMember.bloodGroup}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        bloodGroup: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Emergency Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={newTeamMember.emergencyPhone}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        emergencyPhone: e.target.value,
                      })
                    }
                    placeholder="+1234567890"
                    isInvalid={
                      newTeamMember.emergencyPhone &&
                      !validatePhoneNumber(newTeamMember.emergencyPhone)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid phone number (e.g., +1234567890) or
                    leave blank.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={newTeamMember.status}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        status: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="Currently Working">Currently Working</option>
                    <option value="Resigned">Resigned</option>
                    <option value="Terminated">Terminated</option>
                  </Form.Select>
                </Form.Group>
                {newTeamMember.status === "Resigned" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Resignation Reason</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={newTeamMember.resignationReason}
                      onChange={(e) =>
                        setNewTeamMember({
                          ...newTeamMember,
                          resignationReason: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>
                )}
                {newTeamMember.status === "Terminated" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Termination Reason</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={newTeamMember.terminationReason}
                      onChange={(e) =>
                        setNewTeamMember({
                          ...newTeamMember,
                          terminationReason: e.target.value,
                        })
                      }
                      required
                    />
                  </Form.Group>
                )}
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMediaFileChange(e, "image")}
                  />
                  {newTeamMember.profilePicture && (
                    <img
                      src={newTeamMember.profilePicture}
                      alt="Profile Preview"
                      style={{ maxWidth: "100px", marginTop: "10px" }}
                    />
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Video</Form.Label>
                  <Form.Control
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={(e) => handleMediaFileChange(e, "video")}
                  />
                  {newTeamMember.video && (
                    <video
                      src={newTeamMember.video}
                      controls
                      style={{ maxWidth: "200px", marginTop: "10px" }}
                    />
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Education</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={newTeamMember.shortBio}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        shortBio: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={newTeamMember.fullBio}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        fullBio: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Skills (comma-separated)</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTeamMember.skills}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        skills: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Achievements</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={newTeamMember.achievements}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        achievements: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quotes</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={newTeamMember.quotes}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        quotes: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={handleAddOrUpdateTeamMember}
          >
            {editingTeamMember ? "Update Member" : "Add Member"}
          </Button>
        </Modal.Footer>
      </Modal>

      <AlertModal
        show={alertModal.show}
        onHide={handleCloseAlertModal}
        title={alertModal.title}
        message={alertModal.message}
        variant={alertModal.variant}
        onConfirm={alertModal.onConfirm}
      />

      <Col md={12}>
        {/* <h4>Staff Members</h4> */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Employee ID</th>
              <th>Joining Date</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>QR Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {team.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.employeeId}</td>
                <td>{member.joiningDate}</td>
                <td>{member.bloodGroup}</td>
                <td>{member.status}</td>
                <td>
                  {member.qrCode ? (
                    <Image
                      src={member.qrCode}
                      alt={`QR Code for ${member.name}`}
                      style={{ maxWidth: "50px" }}
                    />
                  ) : (
                    "No QR Code"
                  )}
                </td>
                <td>
                  <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShowModal(member)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDeleteTeamMember(member.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        handleShareQRCode(member.qrCode, member.name)
                      }
                      disabled={!member.qrCode || isSharing}
                    >
                      {isSharing ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span className="visually-hidden">Sharing...</span>
                        </>
                      ) : (
                        "Share"
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default TeamManagement;
