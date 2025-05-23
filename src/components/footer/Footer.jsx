import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import "./footer.css";

const Footer = ({ language }) => {
  const getYear = () => {
    let currentYear = new Date().getFullYear();
    return currentYear;
  };
  const content = {
    en: {
      logoText: "J.M.",
      home: "Home",
      specialization: "Specialization",
      work: "About Me",
      portfolio: "Portfolio",
      proExperience: "Experience",
      contact: "Contact",
      copyright: "All rights reserved.",
    },
    es: {
      logoText: "J.M.",
      home: "Inicio",
      specialization: "Especialización",
      work: "Sobre Mí",
      portfolio: "Portafolio",
      proExperience: "Experiencia",
      contact: "Contacto",
      copyright: "Todos los derechos reservados.",
    },
  };
  return (
    <footer className="app-footer">
      <div className="container footer__container">
        <a href="#home" className="footer__logo">
          {content[language].logoText}
        </a>
        <ul className="footer__permalinks">
          <li><a href="#home">{content[language].home}</a></li>
          <li><a href="#experience">{content[language].specialization}</a></li>
          <li><a href="#work">{content[language].work}</a></li>
          <li><a href="#professional-experience">{content[language].proExperience}</a></li>
          <li><a href="#portfolio">{content[language].portfolio}</a></li>
          <li><a href="#contact">{content[language].contact}</a></li>
        </ul>
        <div className="footer__socials">
          <a
            href="https://www.linkedin.com/in/johan-morales-b3809b206/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="footer__social-link"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://github.com/JohanMorales211"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="footer__social-link"
          >
            <FaGithub />
          </a>
        </div>
        <div className="footer__copyright">
          <small>
            © {getYear()} Johan Morales. {content[language].copyright}
          </small>
        </div>
      </div>
    </footer>
  );
};
export default Footer;