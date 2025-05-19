import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import './floatingActionButtons.css';
const FloatingActionButtons = ({ language }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const content = {
    en: {
      contactMe: "Contact Me",
      backToTop: "Back to Top",
    },
    es: {
      contactMe: "Contáctame",
      backToTop: "Volver Arriba",
    },
  };
  return (
    <div className="floating-action-buttons-container">
      <a
        href="#contact"
        className="fab fab-contact"
        aria-label={content[language].contactMe}
      >
        <FaTelegramPlane />
      </a>
      {showBackToTop && (
        <a
          href="#home"
          className="fab fab-back-to-top"
          aria-label={content[language].backToTop}
        >
          <IoIosArrowUp />
        </a>
      )}
    </div>
  );
};
export default FloatingActionButtons;