import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import ParticlesBackground from "./components/particles/ParticlesBackground";
import Header from "./components/header/Header";
import TechStack from "./components/techstack/TechStack";
import WorkSection from "./components/workSection/WorkSection";
import Experience from "./components/experience/Experience";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonials from "./components/testimonials/Testimonials";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import FloatingActionButtons from "./components/floatingActionButtons/FloatingActionButtons";
import useScrollReveal from "./hooks/useScrollReveal";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "light";
};

const App = () => {
  const [language, setLanguage] = useState("es");
  const [theme, setTheme] = useState(getInitialTheme);

  useScrollReveal();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <div className="app-bg" aria-hidden="true" />
      <ParticlesBackground />
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
      />
      <Header language={language} />
      <TechStack language={language} />
      <WorkSection language={language} />
      <Experience language={language} />
      <Portfolio language={language} />
      <Testimonials language={language} />
      <Contact language={language} />
      <Footer language={language} />
      <FloatingActionButtons language={language} />
    </>
  );
};

export default App;
