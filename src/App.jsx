import React, { useState } from "react";
import Contact from "./components/contact/Contact";
import Experience from "./components/experience/Experience";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Intro from "./components/intro/Intro";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonials from "./components/testimonials/Testimonials";
import Topbar from "./components/topbar/Topbar";
import ContactButton from "./components/contactButton/ContactButton";

const App = () => {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <>
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <Topbar language={language} />
      <ContactButton language={language} />
      <Intro language={language} />
      <Experience language={language} />
      <Portfolio language={language} />
      <Testimonials language={language} />
      <Contact language={language} />
      <Footer language={language} />
    </>
  );
};

export default App;
