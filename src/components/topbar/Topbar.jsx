import React, { useState, useEffect, useRef } from "react";
import { AiOutlineHome, AiOutlineProfile } from "react-icons/ai";
import { BiBook, BiMessageSquareDetail } from "react-icons/bi";
import { RiBriefcase4Line, RiServiceLine, RiAwardLine } from "react-icons/ri";
import "./topbar.css";

const Topbar = ({ language }) => {
  const [activeNav, setActiveNav] = useState("#home");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      let currentActiveSectionId = null;
      if (window.scrollY === 0) {
        const homeSection = sections.find(s => s.id === 'home');
        if (homeSection) currentActiveSectionId = `#${homeSection.id}`;
      } else {
        let maxIntersectionRatio = -1;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio > maxIntersectionRatio) {
              maxIntersectionRatio = entry.intersectionRatio;
              currentActiveSectionId = `#${entry.target.id}`;
            }
          }
        });
      }

      if (currentActiveSectionId) {
        setActiveNav(currentActiveSectionId);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    const currentObserver = observerRef.current;
    sections.forEach(section => currentObserver.observe(section));

    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const scrollThresholdMobile = 100;
    const handleScroll = () => {
      if (window.innerWidth <= 600) {
        if (window.scrollY > scrollThresholdMobile) {
          setIsHeaderScrolled(true);
        } else {
          setIsHeaderScrolled(false);
        }
      } else {
        setIsHeaderScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navContent = {
    en: {
      home: "Home",
      specialization: "Specialization",
      work: "My Work",
      certificates: "Certificates",
      portfolio: "Portfolio",
      proExperience: "Experience",
      contact: "Contact",
    },
    es: {
      home: "Inicio",
      specialization: "Especialización",
      work: "Mi Trabajo",
      certificates: "Certificados",
      portfolio: "Portafolio",
      proExperience: "Experiencia",
      contact: "Contacto",
    },
  };

  const handleNavClick = (hash) => {
  };

  return (
    <nav className={`app_topbar ${isHeaderScrolled ? 'scrolled-past-header-mobile' : 'at-header-top-mobile'}`}>
      <a href="#home" onClick={() => handleNavClick("#home")} className={activeNav === "#home" ? "active" : ""} aria-label={navContent[language].home}><AiOutlineHome /></a>
      <a href="#experience" onClick={() => handleNavClick("#experience")} className={activeNav === "#experience" ? "active" : ""} aria-label={navContent[language].specialization}><BiBook /></a>
      <a href="#work" onClick={() => handleNavClick("#work")} className={activeNav === "#work" ? "active" : ""} aria-label={navContent[language].work}><RiBriefcase4Line /></a>
      <a href="#certificates" onClick={() => handleNavClick("#certificates")} className={activeNav === "#certificates" ? "active" : ""} aria-label={navContent[language].certificates}><RiAwardLine /></a>
      <a href="#portfolio" onClick={() => handleNavClick("#portfolio")} className={activeNav === "#portfolio" ? "active" : ""} aria-label={navContent[language].portfolio}><RiServiceLine /></a>
      <a href="#professional-experience" onClick={() => handleNavClick("#professional-experience")} className={activeNav === "#professional-experience" ? "active" : ""} aria-label={navContent[language].proExperience}><AiOutlineProfile /></a>
      <a href="#contact" onClick={() => handleNavClick("#contact")} className={activeNav === "#contact" ? "active" : ""} aria-label={navContent[language].contact}><BiMessageSquareDetail /></a>
    </nav>
  );
};

export default Topbar;