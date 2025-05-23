import React, { useState, useEffect, useRef } from "react";
import { AiOutlineHome, AiOutlineProfile } from "react-icons/ai";
import { BiBook, BiMessageSquareDetail } from "react-icons/bi";
import { RiBriefcase4Line, RiServiceLine, RiAwardLine } from "react-icons/ri";
import "./topbar.css";

const Topbar = ({ language }) => {
  const [activeNav, setActiveNav] = useState("#home");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const observerRef = useRef(null);
  const sectionRefs = useRef({});

  const registerRef = (id, el) => {
    if (el) {
      sectionRefs.current[id] = el;
    }
  };


  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const sections = Array.from(document.querySelectorAll("section[id]"));
    const homeHeader = document.getElementById('home');
    let allWatchableElements = sections;
    if (homeHeader && !sections.some(s => s.id === 'home')) {
        allWatchableElements = [homeHeader, ...sections];
    }


    if (allWatchableElements.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.01,
    };

    const observerCallback = (entries) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop < 50) {
        setActiveNav("#home");
        return;
      }

      let bestMatch = { id: null, ratio: -1, position: Infinity };

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > bestMatch.ratio) {
            bestMatch.ratio = entry.intersectionRatio;
            bestMatch.id = `#${entry.target.id}`;
            bestMatch.position = entry.boundingClientRect.top;
          }
          else if (entry.intersectionRatio === bestMatch.ratio) {
            if (entry.boundingClientRect.top < bestMatch.position) {
                bestMatch.id = `#${entry.target.id}`;
                bestMatch.position = entry.boundingClientRect.top;
            }
          }
        }
      });

      if (bestMatch.id) {
        setActiveNav(bestMatch.id);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    const currentObserver = observerRef.current;
    allWatchableElements.forEach(section => {
        registerRef(section.id, section);
        currentObserver.observe(section);
    });


    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [language]);

  useEffect(() => {
    const scrollThresholdMobile = 100;
    const handleScroll = () => {
      if (window.innerWidth <= 600) {
        setIsHeaderScrolled(window.scrollY > scrollThresholdMobile);
      } else {
        setIsHeaderScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navContent = {
    en: { home: "Home", specialization: "Specialization", work: "About Me", certificates: "Certificates", portfolio: "Portfolio", proExperience: "Experience", contact: "Contact" },
    es: { home: "Inicio", specialization: "Especialización", work: "Sobre Mí", certificates: "Certificados", portfolio: "Portafolio", proExperience: "Experiencia", contact: "Contacto" },
  };


  return (
    <nav className={`app_topbar ${isHeaderScrolled ? 'scrolled-past-header-mobile' : 'at-header-top-mobile'}`}>
      <a href="#home"  className={activeNav === "#home" ? "active" : ""} aria-label={navContent[language].home}><AiOutlineHome /></a>
      <a href="#experience"  className={activeNav === "#experience" ? "active" : ""} aria-label={navContent[language].specialization}><BiBook /></a>
      <a href="#work"  className={activeNav === "#work" ? "active" : ""} aria-label={navContent[language].work}><RiBriefcase4Line /></a>
      <a href="#certificates"  className={activeNav === "#certificates" ? "active" : ""} aria-label={navContent[language].certificates}><RiAwardLine /></a>
      <a href="#portfolio"  className={activeNav === "#portfolio" ? "active" : ""} aria-label={navContent[language].portfolio}><RiServiceLine /></a>
      <a href="#professional-experience"  className={activeNav === "#professional-experience" ? "active" : ""} aria-label={navContent[language].proExperience}><AiOutlineProfile /></a>
      <a href="#contact"  className={activeNav === "#contact" ? "active" : ""} aria-label={navContent[language].contact}><BiMessageSquareDetail /></a>
    </nav>
  );
};

export default Topbar;