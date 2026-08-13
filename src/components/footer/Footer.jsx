import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import "./footer.css";

const Footer = ({ language }) => {
  const year = new Date().getFullYear();

  const content = {
    en: {
      home: "Home",
      tech: "Tech Stack",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      copyright: "All rights reserved.",
      built: "Built with React",
    },
    es: {
      home: "Inicio",
      tech: "Tecnologías",
      about: "Sobre mí",
      experience: "Experiencia",
      projects: "Proyectos",
      contact: "Contacto",
      copyright: "Todos los derechos reservados.",
      built: "Hecho con React",
    },
  };

  const t = content[language] || content.en;

  return (
    <footer className="footer">
      <div className="container footer__container">
        <a href="#inicio" className="footer__logo">
          jmorales<span>.</span>
        </a>

        <ul className="footer__links">
          <li><a href="#inicio">{t.home}</a></li>
          <li><a href="#tecnologias">{t.tech}</a></li>
          <li><a href="#sobre-mi">{t.about}</a></li>
          <li><a href="#experiencia">{t.experience}</a></li>
          <li><a href="#proyectos">{t.projects}</a></li>
          <li><a href="#contacto">{t.contact}</a></li>
        </ul>

        <div className="footer__socials">
          <a
            href="https://www.linkedin.com/in/johan-morales-b3809b206/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://github.com/JohanMorales211"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>

        <div className="footer__bottom">
          <small>
            © {year} Johan Morales. {t.copyright}
          </small>
          <small className="footer__built">{t.built}</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
