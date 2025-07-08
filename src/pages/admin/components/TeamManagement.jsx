
// import React, { useState } from "react";
// import { Row, Col, Form, Button, Table, Image } from "react-bootstrap";
// import { auth } from "../../../firebase";

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
//   });
//   const [editingTeamMember, setEditingTeamMember] = useState(null);
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       if (!selectedFile.type.startsWith("image/")) {
//         alert("Please upload an image file (e.g., JPEG, PNG).");
//         return;
//       }
//       if (selectedFile.size > 5 * 1024 * 1024) {
//         alert("Image size must be less than 5MB.");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewTeamMember({ ...newTeamMember, profilePicture: reader.result });
//       };
//       reader.readAsDataURL(selectedFile);
//       setFile(selectedFile);
//     }
//   };

//   const handleAddOrUpdateTeamMember = async (e) => {
//     e.preventDefault();
//     if (!auth.currentUser) {
//       alert("Please log in to add or update a team member.");
//       return;
//     }

//     const { name, role, employeeId, joiningDate, bloodGroup, status, resignationReason, terminationReason } = newTeamMember;
//     if (!name || !role || !employeeId || !joiningDate || !bloodGroup || !status) {
//       alert("Please fill in all required fields: Name, Role, Employee ID, Joining Date, Blood Group, Status");
//       return;
//     }
//     if (status === "Resigned" && !resignationReason) {
//       alert("Please provide a resignation reason for resigned status.");
//       return;
//     }
//     if (status === "Terminated" && !terminationReason) {
//       alert("Please provide a termination reason for terminated status.");
//       return;
//     }

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
//       });
//       setEditingTeamMember(null);
//       setFile(null);
//       alert(`Team member ${editingTeamMember ? "updated" : "added"} successfully!`);
//     } catch (error) {
//       console.error(`Failed to ${editingTeamMember ? "update" : "add"} team member:`, error.message);
//       alert(`Failed to ${editingTeamMember ? "update" : "add"} team member: ${error.message}`);
//     }
//   };

//   const handleEditTeamMember = (member) => {
//     setNewTeamMember({
//       name: member.name,
//       role: member.role,
//       shortBio: member.shortBio || "",
//       fullBio: member.fullBio || "",
//       skills: member.skills ? member.skills.join(", ") : "",
//       achievements: member.achievements || "",
//       video: member.video || "",
//       employeeId: member.employeeId,
//       joiningDate: member.joiningDate,
//       bloodGroup: member.bloodGroup,
//       profilePicture: member.profilePicture || "",
//       status: member.status || "Currently Working",
//       resignationReason: member.resignationReason || "",
//       terminationReason: member.terminationReason || "",
//     });
//     setEditingTeamMember(member.id);
//   };

//   const handleDeleteTeamMember = async (id) => {
//     if (!auth.currentUser) {
//       alert("Please log in to delete a team member.");
//       return;
//     }
//     try {
//       const idToken = await auth.currentUser.getIdToken(true);
//       const response = await fetch(`${API_URL}/team/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${idToken}`,
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
//       }
//       fetchTeam();
//       alert("Team member deleted successfully!");
//     } catch (error) {
//       console.error("Failed to delete team member:", error.message);
//       alert(`Failed to delete team member: ${error.message}`);
//     }
//   };

//   return (
//     <Row>
//       <Col md={6}>
//         <h4>{editingTeamMember ? "Edit Team Member" : "Add Team Member"}</h4>
//         <Form onSubmit={handleAddOrUpdateTeamMember}>
//           <Form.Group className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={newTeamMember.name}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, name: e.target.value })
//               }
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Role</Form.Label>
//             <Form.Control
//               type="text"
//               value={newTeamMember.role}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, role: e.target.value })
//               }
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Employee ID</Form.Label>
//             <Form.Control
//               type="text"
//               value={newTeamMember.employeeId}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, employeeId: e.target.value })
//               }
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Joining Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={newTeamMember.joiningDate}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, joiningDate: e.target.value })
//               }
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Blood Group</Form.Label>
//             <Form.Control
//               type="text"
//               value={newTeamMember.bloodGroup}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, bloodGroup: e.target.value })
//               }
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Status</Form.Label>
//             <Form.Select
//               value={newTeamMember.status}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, status: e.target.value })
//               }
//               required
//             >
//               <option value="Currently Working">Currently Working</option>
//               <option value="Resigned">Resigned</option>
//               <option value="Terminated">Terminated</option>
//             </Form.Select>
//           </Form.Group>
//           {newTeamMember.status === "Resigned" && (
//             <Form.Group className="mb-3">
//               <Form.Label>Resignation Reason</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 value={newTeamMember.resignationReason}
//                 onChange={(e) =>
//                   setNewTeamMember({ ...newTeamMember, resignationReason: e.target.value })
//                 }
//                 required
//               />
//             </Form.Group>
//           )}
//           {newTeamMember.status === "Terminated" && (
//             <Form.Group className="mb-3">
//               <Form.Label>Termination Reason</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 value={newTeamMember.terminationReason}
//                 onChange={(e) =>
//                   setNewTeamMember({ ...newTeamMember, terminationReason: e.target.value })
//                 }
//                 required
//               />
//             </Form.Group>
//           )}
//           <Form.Group className="mb-3">
//             <Form.Label>Profile Picture</Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//             {newTeamMember.profilePicture && (
//               <img
//                 src={newTeamMember.profilePicture}
//                 alt="Profile Preview"
//                 style={{ maxWidth: "100px", marginTop: "10px" }}
//               />
//             )}
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Short Bio</Form.Label>
//             <Form.Control
//               as="textarea"
//               value={newTeamMember.shortBio}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, shortBio: e.target.value })
//               }
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               as="textarea"
//               value={newTeamMember.fullBio}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, fullBio: e.target.value })
//               }
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Skills (comma-separated)</Form.Label>
//             <Form.Control
//               type="text"
//               value={newTeamMember.skills}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, skills: e.target.value })
//               }
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Achievements</Form.Label>
//             <Form.Control
//               as="textarea"
//               value={newTeamMember.achievements}
//               onChange={(e) =>
//                 setNewTeamMember({
//                   ...newTeamMember,
//                   achievements: e.target.value,
//                 })
//               }
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Video URL</Form.Label>
//             <Form.Control
//               type="text"
//               value={newTeamMember.video}
//               onChange={(e) =>
//                 setNewTeamMember({ ...newTeamMember, video: e.target.value })
//               }
//             />
//           </Form.Group>
//           <Button type="submit" variant="primary">
//             {editingTeamMember ? "Update Member" : "Add Member"}
//           </Button>
//           {editingTeamMember && (
//             <Button
//               variant="secondary"
//               onClick={() => {
//                 setEditingTeamMember(null);
//                 setNewTeamMember({
//                   name: "",
//                   role: "",
//                   shortBio: "",
//                   fullBio: "",
//                   skills: "",
//                   achievements: "",
//                   video: "",
//                   employeeId: "",
//                   joiningDate: "",
//                   bloodGroup: "",
//                   profilePicture: "",
//                   status: "Currently Working",
//                   resignationReason: "",
//                   terminationReason: "",
//                 });
//                 setFile(null);
//               }}
//               className="ms-2"
//             >
//               Cancel Edit
//             </Button>
//           )}
//         </Form>
//       </Col>
//       <Col md={6}>
//         <h4>Staff Members</h4>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Employee ID</th>
//               <th>Joining Date</th>
//               <th>Blood Group</th>
//               <th>Status</th>
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
//                   <Button
//                     variant="info"
//                     size="sm"
//                     onClick={() => handleEditTeamMember(member)}
//                     className="me-2"
//                   >
//                     Edit
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDeleteTeamMember(member.id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Col>
//     </Row>
//   );
// };

// export default TeamManagement;

import React, { useState } from "react";
import { Row, Col, Form, Button, Table, Image } from "react-bootstrap";
import { auth } from "../../../firebase";

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
  });
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please upload an image file (e.g., JPEG, PNG).");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTeamMember({ ...newTeamMember, profilePicture: reader.result });
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleAddOrUpdateTeamMember = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Please log in to add or update a team member.");
      return;
    }

    const { name, role, employeeId, joiningDate, bloodGroup, status, resignationReason, terminationReason } = newTeamMember;
    if (!name || !role || !employeeId || !joiningDate || !bloodGroup || !status) {
      alert("Please fill in all required fields: Name, Role, Employee ID, Joining Date, Blood Group, Status");
      return;
    }
    if (status === "Resigned" && !resignationReason) {
      alert("Please provide a resignation reason for resigned status.");
      return;
    }
    if (status === "Terminated" && !terminationReason) {
      alert("Please provide a termination reason for terminated status.");
      return;
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
          skills: newTeamMember.skills ? newTeamMember.skills.split(",").map((s) => s.trim()) : [],
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
      }
      await response.json();
      fetchTeam();
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
      });
      setEditingTeamMember(null);
      setFile(null);
      alert(`Team member ${editingTeamMember ? "updated" : "added"} successfully!`);
    } catch (error) {
      console.error(`Failed to ${editingTeamMember ? "update" : "add"} team member:`, error.message);
      alert(`Failed to ${editingTeamMember ? "update" : "add"} team member: ${error.message}`);
    }
  };

  const handleEditTeamMember = (member) => {
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
    });
    setEditingTeamMember(member.id);
  };

  const handleDeleteTeamMember = async (id) => {
    if (!auth.currentUser) {
      alert("Please log in to delete a team member.");
      return;
    }
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
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || "Unknown error"}`);
      }
      fetchTeam();
      alert("Team member deleted successfully!");
    } catch (error) {
      console.error("Failed to delete team member:", error.message);
      alert(`Failed to delete team member: ${error.message}`);
    }
  };

  const handleShareQRCode = async (qrCode, name) => {
    if (!qrCode) {
      alert("No QR code available to share.");
      return;
    }

    const shareData = {
      title: `QR Code for ${name}`,
      text: `Scan this QR code to view ${name}'s profile`,
      url: qrCode,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        alert("QR code shared successfully!");
      } else {
        await navigator.clipboard.writeText(qrCode);
        alert("QR code URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Failed to share QR code:", error.message);
      alert(`Failed to share QR code: ${error.message}`);
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h4>{editingTeamMember ? "Edit Team Member" : "Add Team Member"}</h4>
        <Form onSubmit={handleAddOrUpdateTeamMember}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newTeamMember.name}
              onChange={(e) =>
                setNewTeamMember({ ...newTeamMember, name: e.target.value })
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
                setNewTeamMember({ ...newTeamMember, role: e.target.value })
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
                setNewTeamMember({ ...newTeamMember, employeeId: e.target.value })
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
                setNewTeamMember({ ...newTeamMember, joiningDate: e.target.value })
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
                setNewTeamMember({ ...newTeamMember, bloodGroup: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={newTeamMember.status}
              onChange={(e) =>
                setNewTeamMember({ ...newTeamMember, status: e.target.value })
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
                  setNewTeamMember({ ...newTeamMember, resignationReason: e.target.value })
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
                  setNewTeamMember({ ...newTeamMember, terminationReason: e.target.value })
                }
                required
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
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
            <Form.Label>Short Bio</Form.Label>
            <Form.Control
              as="textarea"
              value={newTeamMember.shortBio}
              onChange={(e) =>
                setNewTeamMember({ ...newTeamMember, shortBio: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              value={newTeamMember.fullBio}
              onChange={(e) =>
                setNewTeamMember({ ...newTeamMember, fullBio: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Skills (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              value={newTeamMember.skills}
              onChange={(e) =>
                setNewTeamMember({ ...newTeamMember, skills: e.target.value })
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
            <Form.Label>Video URL</Form.Label>
            <Form.Control
              type="text"
              value={newTeamMember.video}
              onChange={(e) =>
                setNewTeamMember({ ...newTeamMember, video: e.target.value })
              }
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            {editingTeamMember ? "Update Member" : "Add Member"}
          </Button>
          {editingTeamMember && (
            <Button
              variant="secondary"
              onClick={() => {
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
                });
                setFile(null);
              }}
              className="ms-2"
            >
              Cancel Edit
            </Button>
          )}
        </Form>
      </Col>
      <Col md={6}>
        <h4>Staff Members</h4>
        <Table striped bordered hover>
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
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleEditTeamMember(member)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteTeamMember(member.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleShareQRCode(member.qrCode, member.name)}
                      disabled={!member.qrCode}
                    >
                      Share
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