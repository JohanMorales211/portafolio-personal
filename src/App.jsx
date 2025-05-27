import React, { useState } from "react";
import Header from "./components/header/Header";
import Experience from "./components/experience/Experience";
import WorkSection from "./components/workSection/WorkSection";
import CertificatesSection from "./components/certificatesSection/CertificatesSection";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonials from "./components/testimonials/Testimonials";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Topbar from "./components/topbar/Topbar";
import FloatingActionButtons from "./components/floatingActionButtons/FloatingActionButtons";

import videoBackground from "./assets/videos/header_background.mp4";

const App = () => {
  const [language, setLanguage] = useState("en");
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="app_background_video"
      >
        <source src={videoBackground} type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>

      <Topbar language={language} />
      <FloatingActionButtons language={language} />
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <Experience language={language} />
      <WorkSection language={language} />
      <CertificatesSection language={language} />
      <Portfolio language={language} />
      <Testimonials language={language} />
      <Contact language={language} />
      <Footer language={language} />
    </>
  );
};
export default App;