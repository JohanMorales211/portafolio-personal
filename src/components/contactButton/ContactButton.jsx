import React from "react";
import "./ContactButton.css";
import { FaTelegramPlane } from "react-icons/fa";

const ContactButton = ({ language }) => {
  const content = {
    en: {
      contactMe: "Contact Me",
    },
    es: {
      contactMe: "Contáctame",
    },
  };

  return (
    <a
      href="#contact"
      className="contact-button"
      aria-label={content[language].contactMe}
    >
      {/* Cambia el icono a FaTelegramPlane */}
      <FaTelegramPlane className="contact-button__icon" />
      <span className="contact-button__text">
        {content[language].contactMe}
      </span>
    </a>
  );
};

export default ContactButton;
