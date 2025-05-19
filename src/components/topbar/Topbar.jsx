import React, { useState, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { RiBriefcase4Line } from "react-icons/ri";
import { RiServiceLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import "./topbar.css";
const Topbar = ({ language }) => {
  const [activeNav, setActiveNav] = useState("#home");
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const navLinks = Array.from(document.querySelectorAll("nav.app_topbar a"));
    if (sections.length === 0) return;
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.55,
    };
    let lastActiveSectionId = activeNav;
    const observerCallback = (entries) => {
      let isAnySectionIntersecting = false;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isAnySectionIntersecting = true;
          const id = entry.target.getAttribute("id");
          if (id && `#${id}` !== lastActiveSectionId) {
            setActiveNav(`#${id}`);
            lastActiveSectionId = `#${id}`;
          }
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
      if (section) observer.observe(section);
    });
    return () => sections.forEach(section => {
      if (section) observer.unobserve(section);
    });
  }, [activeNav]);
  const navContent = {
    en: {
      home: "Home",
      specialization: "Specialization",
      work: "My Work",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    es: {
      home: "Inicio",
      specialization: "Especialización",
      work: "Mi Trabajo",
      portfolio: "Portafolio",
      contact: "Contacto",
    },
  };
  return (
    <nav className="app_topbar">
      <a
        href="#home"
        className={activeNav === "#home" ? "active" : ""}
        aria-label={navContent[language].home}
      >
        <AiOutlineHome />
      </a>
      <a
        href="#experience"
        className={activeNav === "#experience" ? "active" : ""}
        aria-label={navContent[language].specialization}
      >
        <BiBook />
      </a>
      <a
        href="#work"
        className={activeNav === "#work" ? "active" : ""}
        aria-label={navContent[language].work}
      >
        <RiBriefcase4Line />
      </a>
      <a
        href="#portfolio"
        className={activeNav === "#portfolio" ? "active" : ""}
        aria-label={navContent[language].portfolio}
      >
        <RiServiceLine />
      </a>
      <a
        href="#contact"
        className={activeNav === "#contact" ? "active" : ""}
        aria-label={navContent[language].contact}
      >
        <BiMessageSquareDetail />
      </a>
    </nav>
  );
};
export default Topbar;