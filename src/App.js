// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Routes, Route, useLocation } from "react-router-dom";

// import NavigationBar from "./pages/user/components/NavigationBar";
// import Footer from "./pages/user/components/Footer";
// import Home from "./pages/user/components/Home";

// // Main sections as pages
// import AboutSection from "./pages/user/components/AboutSection";
// import ServicesSection from "./pages/user/components/ServicesSection";
// import ContactSection from "./pages/user/components/ContactSection";
// import AdvertisementSection from "./pages/user/components/AdvertisementSection";

// // Future Outlook components
// import OurAim from "./pages/user/components/FutureOutlook/OurAim";
// import OurVision from "./pages/user/components/FutureOutlook/OurVision";
// import InternshipOpportunity from "./pages/user/components/FutureOutlook/InternshipOpportunity";
// import OurTeam from "./pages/user/components/FutureOutlook/OurTeam";
// import Client from "./pages/user/components/FutureOutlook/Client";
// import InternshipApplication from "./pages/user/components/FutureOutlook/InternshipApplication";

// // Admin components
// import AdminDashboard from "./pages/admin/components/AdminDashboard";
// import Login from "./pages/admin/components/Login ";
// import VerifyChange from "./pages/admin/components/VerifyChange";

// // Staff components
// import StaffMembers from "./pages/staff/components/StaffMembers";
// import StaffMemberDetail from "./pages/staff/components/StaffMemberDetail";
// import StaffNavigationBar from "./pages/staff/components/StaffNavigationBar";

// // Firebase
// import { auth } from "./firebase";
// import { onAuthStateChanged } from "firebase/auth";

// const AppContent = () => {
//   const [user, setUser] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   const isAdminRoute = location.pathname.startsWith("/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection");
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
//         <Route path="/advertisements" element={<AdvertisementSection />} />
//         <Route path="/future/aim" element={<OurAim />} />
//         <Route path="/future/vision" element={<OurVision />} />
//         <Route path="/future/internship" element={<InternshipOpportunity />} />
//         <Route path="/internship/apply" element={<InternshipApplication />} />
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
//           path="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection"
//           element={user ? <AdminDashboard /> : <Login />}
//         />
//         <Route
//           path="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/login"
//           element={<Login />}
//         />
//         <Route
//           path="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/verify-email"
//           element={<VerifyChange type="email" />}
//         />
//         <Route
//           path="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/verify-password"
//           element={<VerifyChange type="password" />}
//         />
//       </Routes>
//       {!isAdminRoute && !isStaffRoute && <Footer />}
//     </>
//   );
// };

// function App() {
//   return <AppContent />;
// }

// export default App;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

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
import Client from "./pages/user/components/FutureOutlook/Client";
import InternshipApplication from "./pages/user/components/FutureOutlook/InternshipApplication";

// Admin components
import AdminDashboard from "./pages/admin/components/AdminDashboard";
import Login from "./pages/admin/components/Login ";
import VerifyChange from "./pages/admin/components/VerifyChange";

// Staff components
import StaffMembers from "./pages/staff/components/StaffMembers";
import StaffMemberDetail from "./pages/staff/components/StaffMemberDetail";
import StaffNavigationBar from "./pages/staff/components/StaffNavigationBar";

// Firebase
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const AppContent = () => {
  const [user, setUser] = useState(null); // null indicates loading state
  const [isLoading, setIsLoading] = useState(true); // Explicit loading state
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Authentication state resolved
    });
    return () => unsubscribe();
  }, []);

  const isAdminRoute = location.pathname.startsWith(
    "/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection"
  );
  const isStaffRoute = location.pathname.startsWith("/staff-panel");

  // Show a loading spinner while authentication state is being resolved
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      {!isAdminRoute && !isStaffRoute && <NavigationBar />}
      {isStaffRoute && user && <StaffNavigationBar />}
      <Routes>
        {/* Public Routes */}
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
        <Route path="/clients" element={<Client />} />
        <Route path="/staff/:id" element={<StaffMemberDetail />} />

        {/* Staff Routes (Protected) */}
        <Route
          path="/staff-panel"
          element={
            user ? (
              <StaffMembers />
            ) : (
              <Navigate
                to="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/login"
                replace
                state={{ from: location }}
              />
            )
          }
        />
        <Route
          path="/staff-panel/:id"
          element={
            user ? (
              <StaffMemberDetail />
            ) : (
              <Navigate
                to="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/login"
                replace
                state={{ from: location }}
              />
            )
          }
        />

        {/* Admin Routes (Protected) */}
        <Route
          path="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection"
          element={
            user ? (
              <AdminDashboard />
            ) : (
              <Navigate
                to="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/login"
                replace
                state={{ from: location }}
              />
            )
          }
        />
        <Route
          path="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/login"
          element={<Login />}
        />
        <Route
          path="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/verify-email"
          element={<VerifyChange type="email" />}
        />
        <Route
          path="/admin/x7kP9mQ2jL5vR8nT/adminpannel/x7kP9mQ2jL5vR8987/adminsection/verify-password"
          element={<VerifyChange type="password" />}
        />
      </Routes>
      {!isAdminRoute && !isStaffRoute && <Footer />}
    </>
  );
};

function App() {
  return <AppContent />;
}

export default App;