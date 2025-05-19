import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import "./footer.css";

const Footer = ({ language }) => {
  let getYear = () => {
    let currentYear = new Date().getFullYear();
    return currentYear;
  };

  const content = {
    en: {
      thatsAll: "That's it!",
      home: "Home",
      about: "About",
      skills: "Skills",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      contact: "Contact",
      copyright: "All rights reserved.",
    },
    es: {
      thatsAll: "¡Eso es todo!",
      home: "Inicio",
      about: "Sobre mí",
      skills: "Habilidades",
      portfolio: "Portafolio",
      testimonials: "Testimonios",
      contact: "Contacto",
      copyright: "Todos los derechos reservados.",
    },
  };

  return (
    <footer>
      <a href="#home" className="footer__logo">
        {content[language].thatsAll}
      </a>
      <ul className="permalinks">
        <li>
          <a href="#home">{content[language].home}</a>
        </li>
        <li>
          <a href="#about">{content[language].about}</a>
        </li>
        <li>
          <a href="#experience">{content[language].skills}</a>
        </li>
        <li>
          <a href="#portfolio">{content[language].portfolio}</a>
        </li>
        <li>
          <a href="#testimonials">{content[language].testimonials}</a>
        </li>
        <li>
          <a href="#contact">{content[language].contact}</a>
        </li>
      </ul>
      <div className="footer__socials">
        <a
          href="https://www.linkedin.com/in/johan-morales-b3809b206/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin />
        </a>
        <a
          href="https://github.com/JohanMorales211"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </div>
      <div className="footer__copyright">
        <small>
          © ET {getYear()}. {content[language].copyright}
        </small>
      </div>
    </footer>
  );
};

export default Footer;
