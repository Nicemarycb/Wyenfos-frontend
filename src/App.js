
// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation

// import NavigationBar from "./pages/user/components/NavigationBar";
// import Footer from "./pages/user/components/Footer";
// import Home from "./pages/user/components/Home";

// // Main sections as pages
// import AboutSection from "./pages/user/components/AboutSection";
// import ServicesSection from "./pages/user/components/ServicesSection";
// import ContactSection from "./pages/user/components/ContactSection";

// // Future Outlook components
// import OurAim from "./pages/user/components/FutureOutlook/OurAim";
// import OurVision from "./pages/user/components/FutureOutlook/OurVision";
// import InternshipOpportunity from "./pages/user/components/FutureOutlook/InternshipOpportunity";
// import OurTeam from "./pages/user/components/FutureOutlook/OurTeam";
// import OurCompany from "./pages/user/components/FutureOutlook/OurCompany";
// import Client from "./pages/user/components/FutureOutlook/Client";
// import InternshipApplication from "./pages/user/components/FutureOutlook/InternshipApplication";

// // Admin components
// import AdminDashboard from "./pages/admin/components/AdminDashboard";
// import Login from "./pages/admin/components/Login "; // Ensure this path and filename are correct as per previous error

// // Firebase
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";

// function App() {
//   const [user, setUser] = useState(null);
//   const location = useLocation(); // Get the current location object

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Determine if the current path is an admin page
//   const isAdminRoute = location.pathname.startsWith("/admin");

//   return (
//     // <Router> is handled by the parent component that renders App, typically index.js or main.jsx
//     // So you don't need to wrap <App/> in <Router> inside App.js itself.
//     // Assuming <BrowserRouter> wraps <App/> in your index.js:
//     <>
//       {!isAdminRoute && <NavigationBar />} {/* Conditionally render NavigationBar */}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutSection />} />
//         <Route path="/services" element={<ServicesSection />} />
//         <Route path="/team" element={<OurTeam />} />
//         <Route path="/contact" element={<ContactSection />} />
//         <Route path="/future/aim" element={<OurAim />} />
//         <Route path="/future/vision" element={<OurVision />} />
//         <Route path="/future/internship" element={<InternshipOpportunity />} />
//         <Route path="/internship/apply" element={<InternshipApplication />} />
//         <Route path="/future/company" element={<OurCompany />} />
//         <Route path="/clients" element={<Client />} />

//         {/* Admin Routes */}
//         <Route
//           path="/admin"
//           element={user ? <AdminDashboard /> : <Login />}
//         />
//         <Route path="/admin/login" element={<Login />} />
//       </Routes>

//       {!isAdminRoute && <Footer />} {/* Conditionally render Footer as well, if needed */}
//     </>
//   );
// }

// export default App; 


// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// import NavigationBar from "./pages/user/components/NavigationBar";
// import StaffNavigationBar from "./pages/staff/components/StaffNavigationBar";
// import Footer from "./pages/user/components/Footer";
// import Home from "./pages/user/components/Home";
// import AboutSection from "./pages/user/components/AboutSection";
// import ServicesSection from "./pages/user/components/ServicesSection";
// import ContactSection from "./pages/user/components/ContactSection";
// import OurAim from "./pages/user/components/FutureOutlook/OurAim";
// import OurVision from "./pages/user/components/FutureOutlook/OurVision";
// import InternshipOpportunity from "./pages/user/components/FutureOutlook/InternshipOpportunity";
// import OurTeam from "./pages/user/components/FutureOutlook/OurTeam";
// import OurCompany from "./pages/user/components/FutureOutlook/OurCompany";
// import Client from "./pages/user/components/FutureOutlook/Client";
// import InternshipApplication from "./pages/user/components/FutureOutlook/InternshipApplication";
// import StaffMembers from "./pages/staff/components/StaffMembers";
// import StaffMemberDetail from "./pages/staff/components/StaffMemberDetail";
// import AdminDashboard from "./pages/admin/components/AdminDashboard";
// import Login from "./pages/admin/components/Login "
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";

// function App() {
//   const [user, setUser] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   const isAdminRoute = location.pathname.startsWith("/admin");
//   const isStaffRoute = location.pathname.startsWith("/staff-panel");

//   return (
//     <>
//       {!isAdminRoute && !isStaffRoute && <NavigationBar />}
//       {isStaffRoute && user && <StaffNavigationBar />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutSection />} />
//         <Route path="/services" element={<ServicesSection />} />
//         <Route path="/team" element={<OurTeam />} />
//         <Route path="/contact" element={<ContactSection />} />
//         <Route path="/future/aim" element={<OurAim />} />
//         <Route path="/future/vision" element={<OurVision />} />
//         <Route path="/future/internship" element={<InternshipOpportunity />} />
//         <Route path="/internship/apply" element={<InternshipApplication />} />
//         <Route path="/future/company" element={<OurCompany />} />
//         <Route path="/clients" element={<Client />} />
//         <Route
//           path="/staff-panel"
//           element={user ? <StaffMembers /> : <Login />}
//         />
//         <Route
//           path="/staff-panel/:id"
//           element={user ? <StaffMemberDetail /> : <Login />}
//         />
//         <Route
//           path="/admin"
//           element={user ? <AdminDashboard /> : <Login />}
//         />
//         <Route path="/admin/login" element={<Login />} />
//       </Routes>
//       {!isAdminRoute && !isStaffRoute && <Footer />}
//     </>
//   );
// }

// export default App;


// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// import NavigationBar from "./pages/user/components/NavigationBar";
// import StaffNavigationBar from "./pages/staff/components/StaffNavigationBar";
// import Footer from "./pages/user/components/Footer";
// import Home from "./pages/user/components/Home";
// import AboutSection from "./pages/user/components/AboutSection";
// import ServicesSection from "./pages/user/components/ServicesSection";
// import ContactSection from "./pages/user/components/ContactSection";
// import OurAim from "./pages/user/components/FutureOutlook/OurAim";
// import OurVision from "./pages/user/components/FutureOutlook/OurVision";
// import InternshipOpportunity from "./pages/user/components/FutureOutlook/InternshipOpportunity";
// import OurTeam from "./pages/user/components/FutureOutlook/OurTeam";
// import OurCompany from "./pages/user/components/FutureOutlook/OurCompany";
// import Client from "./pages/user/components/FutureOutlook/Client";
// import InternshipApplication from "./pages/user/components/FutureOutlook/InternshipApplication";
// import StaffMembers from "./pages/staff/components/StaffMembers";
// import StaffMemberDetail from "./pages/staff/components/StaffMemberDetail";
// import AdminDashboard from "./pages/admin/components/AdminDashboard";
// import Login from "./pages/admin/components/Login ";
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";

// function App() {
//   const [user, setUser] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   const isAdminRoute = location.pathname.startsWith("/admin");
//   const isStaffRoute = location.pathname.startsWith("/staff-panel");

//   return (
//     <>
//       {!isAdminRoute && !isStaffRoute && <NavigationBar />}
//       {isStaffRoute && user && <StaffNavigationBar />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutSection />} />
//         <Route path="/services" element={<ServicesSection />} />
//         <Route path="/team" element={<OurTeam />} />
//         <Route path="/contact" element={<ContactSection />} />
//         <Route path="/future/aim" element={<OurAim />} />
//         <Route path="/future/vision" element={<OurVision />} />
//         <Route path="/future/internship" element={<InternshipOpportunity />} />
//         <Route path="/internship/apply" element={<InternshipApplication />} />
//         <Route path="/future/company" element={<OurCompany />} />
//         <Route path="/clients" element={<Client />} />
//         <Route
//           path="/staff-panel"
//           element={user ? <StaffMembers /> : <Login />}
//         />
//         <Route
//           path="/staff-panel/:id"
//           element={user ? <StaffMemberDetail /> : <Login />}
//         />
//         <Route
//           path="/staff/:id"
//           element={<StaffMemberDetail />}
//         />
//         <Route
//           path="/admin"
//           element={user ? <AdminDashboard /> : <Login />}
//         />
//         <Route path="/admin/login" element={<Login />} />
//       </Routes>
//       {!isAdminRoute && !isStaffRoute && <Footer />}
//     </>
//   );
// }

// export default App;


// // App.js (No changes needed)
// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// import NavigationBar from "./pages/user/components/NavigationBar";
// import Footer from "./pages/user/components/Footer";
// import Home from "./pages/user/components/Home";

// // Main sections as pages
// import AboutSection from "./pages/user/components/AboutSection";
// import ServicesSection from "./pages/user/components/ServicesSection";
// import ContactSection from "./pages/user/components/ContactSection";

// // Future Outlook components
// import OurAim from "./pages/user/components/FutureOutlook/OurAim";
// import OurVision from "./pages/user/components/FutureOutlook/OurVision";
// import InternshipOpportunity from "./pages/user/components/FutureOutlook/InternshipOpportunity";
// import OurTeam from "./pages/user/components/FutureOutlook/OurTeam";
// import OurCompany from "./pages/user/components/FutureOutlook/OurCompany";
// import Client from "./pages/user/components/FutureOutlook/Client";
// import InternshipApplication from "./pages/user/components/FutureOutlook/InternshipApplication";

// // Admin components
// import AdminDashboard from "./pages/admin/components/AdminDashboard";
// import Login from "./pages/admin/components/Login ";

// // Staff components
// import StaffMembers from "./pages/staff/components/StaffMembers";
// import StaffMemberDetail from "./pages/staff/components/StaffMemberDetail"; // Correct path to StaffMemberDetail
// import StaffNavigationBar from "./pages/staff/components/StaffNavigationBar";

// // Firebase
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";

// function App() {
//   const [user, setUser] = useState(null);
//   const location = useLocation(); // Use useLocation hook to get current location

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Determine if the current route is an admin route
//   const isAdminRoute = location.pathname.startsWith("/admin");
//   const isStaffRoute = location.pathname.startsWith("/staff-panel"); // Check for staff panel routes

//   return (
//     <>
//       {!isAdminRoute && !isStaffRoute && <NavigationBar />}
//       {isStaffRoute && user && <StaffNavigationBar />} {/* Conditionally render StaffNavigationBar */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<AboutSection />} />
//         <Route path="/services" element={<ServicesSection />} />
//         <Route path="/team" element={<OurTeam />} />
//         <Route path="/contact" element={<ContactSection />} />
//         <Route path="/future/aim" element={<OurAim />} />
//         <Route path="/future/vision" element={<OurVision />} />
//         <Route path="/future/internship" element={<InternshipOpportunity />} />
//         <Route path="/internship/apply" element={<InternshipApplication />} />
//         <Route path="/future/company" element={<OurCompany />} />
//         <Route path="/clients" element={<Client />} />
//         <Route
//           path="/staff-panel"
//           element={user ? <StaffMembers /> : <Login />}
//         />
//         <Route
//           path="/staff-panel/:id"
//           element={user ? <StaffMemberDetail /> : <Login />}
//         />
//         <Route
//           path="/staff/:id"
//           element={<StaffMemberDetail />}
//         />
//         <Route
//           path="/admin"
//           element={user ? <AdminDashboard /> : <Login />}
//         />
//         <Route path="/admin/login" element={<Login />} />
//       </Routes>
//       {!isAdminRoute && !isStaffRoute && <Footer />}
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavigationBar from "./pages/user/components/NavigationBar";
import Footer from "./pages/user/components/Footer";
import Home from "./pages/user/components/Home";

// Main sections as pages
import AboutSection from "./pages/user/components/AboutSection";
import ServicesSection from "./pages/user/components/ServicesSection";
import ContactSection from "./pages/user/components/ContactSection";
import AdvertisementSection from "./pages/user/components/AdvertisementSection";

// Future Outlook components
import OurAim from "./pages/user/components/FutureOutlook/OurAim";
import OurVision from "./pages/user/components/FutureOutlook/OurVision";
import InternshipOpportunity from "./pages/user/components/FutureOutlook/InternshipOpportunity";
import OurTeam from "./pages/user/components/FutureOutlook/OurTeam";
import OurCompany from "./pages/user/components/FutureOutlook/OurCompany";
import Client from "./pages/user/components/FutureOutlook/Client";
import InternshipApplication from "./pages/user/components/FutureOutlook/InternshipApplication";

// Admin components
import AdminDashboard from "./pages/admin/components/AdminDashboard";
import Login from "./pages/admin/components/Login ";

// Staff components
import StaffMembers from "./pages/staff/components/StaffMembers";
import StaffMemberDetail from "./pages/staff/components/StaffMemberDetail";
import StaffNavigationBar from "./pages/staff/components/StaffNavigationBar";

// Firebase
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isStaffRoute = location.pathname.startsWith("/staff-panel");

  return (
    <>
      {!isAdminRoute && !isStaffRoute && <NavigationBar />}
      {isStaffRoute && user && <StaffNavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/advertisements" element={<AdvertisementSection />} />
        <Route path="/future/aim" element={<OurAim />} />
        <Route path="/future/vision" element={<OurVision />} />
        <Route path="/future/internship" element={<InternshipOpportunity />} />
        <Route path="/internship/apply" element={<InternshipApplication />} />
        <Route path="/future/company" element={<OurCompany />} />
        <Route path="/clients" element={<Client />} />
        <Route
          path="/staff-panel"
          element={user ? <StaffMembers /> : <Login />}
        />
        <Route
          path="/staff-panel/:id"
          element={user ? <StaffMemberDetail /> : <Login />}
        />
        <Route
          path="/staff/:id"
          element={<StaffMemberDetail />}
        />
        <Route
          path="/admin"
          element={user ? <AdminDashboard /> : <Login />}
        />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
      {!isAdminRoute && !isStaffRoute && <Footer />}
    </>
  );
}

export default App;

