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

