import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import OurAim from "../components/FutureOutlook/OurAim";
import OurVision from "../components/FutureOutlook/OurVision";
import InternshipOpportunity from "../components/FutureOutlook/InternshipOpportunity";
import OurTeam from "../components/FutureOutlook/OurTeam";
import Client from "../components/FutureOutlook/Client";
import ContactSection from "../components/ContactSection";
import AdvertisementSection from "../components/AdvertisementSection";

const Home = () => {
  return (
    <div>
      <HeroSection isPreview={true} />
      <AboutSection isPreview={true} />
      <ServicesSection isPreview={true} />
      <OurAim isPreview={true} />
      <OurVision isPreview={true} />
      <InternshipOpportunity isPreview={true} />
      <Client isPreview={true} />
      <OurTeam isPreview={true} />
      <AdvertisementSection isPreview={true} />
      <ContactSection isPreview={true} />
    </div>
  );
};

export default Home;