import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AboutSection from './AboutSection';
import PricingSection from './PricingSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import Topbar from '../../layout/Topbar';
import TobBarLandingPage from './TopBarLandingPage';
import FaqSection from './FaqSection';
import VideoSection from './VideoSection';

const LandingPage = () => {
  return (
    <>
    <TobBarLandingPage/>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <VideoSection/>
      <PricingSection />
      <ContactSection />
      <FaqSection/>
      <Footer />
    </>
  );
};
export default LandingPage