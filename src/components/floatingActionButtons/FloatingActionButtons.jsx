import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import './floatingActionButtons.css';

import elevatorSoundSrc from '../../assets/sounds/elevator.mp3';

const FloatingActionButtons = ({ language }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const playElevatorSound = () => {
    const audio = new Audio(elevatorSoundSrc);
    audio.volume = 0.5;
    audio.play().catch(error => {
      console.error("Error al reproducir el sonido del elevador:", error);
    });
  };
  
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
        onClick={playElevatorSound}
      >
        <FaTelegramPlane />
      </a>
      {showBackToTop && (
        <a
          href="#home"
          className="fab fab-back-to-top"
          aria-label={content[language].backToTop}
          onClick={playElevatorSound}
        >
          <IoIosArrowUp />
        </a>
      )}
    </div>
  );
};
export default FloatingActionButtons;