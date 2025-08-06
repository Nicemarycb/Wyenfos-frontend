// import React from "react";
// import { Link } from "react-router-dom";
// import { ListGroup } from "react-bootstrap";
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaUserFriends,
//   FaEnvelope,
//   FaBriefcase,
//   FaAd,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import "../../admin/AdminDashboard.css";// Import the CSS file

// const Sidebar = ({ activeTab, onSelectTab, onLogout }) => {
//   const tabs = [
//     { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
//     { key: "team", label: "Staff Management", icon: <FaUsers /> },
//     { key: "clients", label: "Client Management", icon: <FaUserFriends /> },
//     { key: "contacts", label: "Contact Submissions", icon: <FaEnvelope /> },
//     { key: "internships", label: "Internship Inquiries", icon: <FaBriefcase /> },
//     { key: "advertisements", label: "Advertisement Management", icon: <FaAd /> },
//   ];

//   return (
//     <div className="sidebar-container">
//       <div className="sidebar-header">
//         <h3 className="logo-text">Admin Panel</h3>
//       </div>
//       <ListGroup variant="flush" className="sidebar-nav">
//         {tabs.map((tab) => (
//           <ListGroup.Item
//             key={tab.key}
//             action
//             onClick={() => onSelectTab(tab.key)}
//             className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
//           >
//             <span className="icon-wrapper">{tab.icon}</span>
//             {tab.label}
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//       <div className="sidebar-footer">
//         <ListGroup variant="flush">
//           <ListGroup.Item action onClick={onLogout} className="logout-link">
//             <span className="icon-wrapper">
//               <FaSignOutAlt />
//             </span>
//             Logout
//           </ListGroup.Item>
//         </ListGroup>
//          <ListGroup variant="flush">
//           <ListGroup.Item action as={Link}
//            to="/staff-panel" className="logout-link">
//             <span className="me-3 staff-panel-button">
//             </span>
//                 Staff Panel
//           </ListGroup.Item>
//         </ListGroup>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserFriends,
  FaEnvelope,
  FaBriefcase,
  FaAd,
  FaSignOutAlt,
  FaAddressBook,
} from "react-icons/fa";
import "../../admin/AdminDashboard.css";

const Sidebar = ({ activeTab, onSelectTab, onLogout, isSidebarOpen }) => {
  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { key: "team", label: "Staff Members", icon: <FaUsers /> },
    { key: "clients", label: "Client Management", icon: <FaUserFriends /> },
    { key: "contacts", label: "Contact Submissions", icon: <FaEnvelope /> },
    { key: "internships", label: "Internship Inquiries", icon: <FaBriefcase /> },
    { key: "advertisements", label: "Advertisement Management", icon: <FaAd /> },
  ];

  return (
    <div className={`sidebar-container ${isSidebarOpen ? "" : "sidebar-collapsed"}`}>
      <div className="sidebar-header">
        <h3 className="logo-text"></h3>
      </div>
      <ListGroup variant="flush" className="sidebar-nav">
        {tabs.map((tab) => (
          <ListGroup.Item
            key={tab.key}
            action
            onClick={() => onSelectTab(tab.key)}
            className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
          >
            <span className="icon-wrapper">{tab.icon}</span>
            {isSidebarOpen && <span>{tab.label}</span>}
          </ListGroup.Item>
        ))}
        {/* Correctly implement Staff Panel as a separate link outside of the dashboard tabs */}
        <ListGroup.Item 
          action
          as={Link}
          to="/staff-panel"
          className={`nav-link ${activeTab === "staff-panel" ? "active" : ""}`}
          onClick={() => onSelectTab("staff-panel")}
        >
          <span className="icon-wrapper">
            <FaAddressBook />
          </span>
          {isSidebarOpen && <span>Staff Panel</span>}
        </ListGroup.Item>
      </ListGroup>
      <div className="sidebar-footer">
        <ListGroup variant="flush">
          <ListGroup.Item action onClick={onLogout} className="logout-link">
            <span className="icon-wrapper">
              <FaSignOutAlt />
            </span>
            {isSidebarOpen && <span>Logout</span>}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default Sidebar;