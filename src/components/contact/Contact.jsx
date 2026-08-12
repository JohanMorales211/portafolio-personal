import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BsLinkedin, BsCheckCircleFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import "./contact.css";

const MY_EMAIL = "johanmorales211@gmail.com";

const Contact = ({ language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard
      .writeText(MY_EMAIL)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      })
      .catch((err) => {
        console.error("Error al copiar el correo: ", err);
      });
  };

  const content = {
    en: {
      kicker: "Contact",
      title: "Have an idea, a project or a challenge to solve?",
      description:
        "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let's talk!",
      copyEmail: "Copy email",
      copied: "Copied!",
      writeMe: "Write me",
      connectLinkedIn: "LinkedIn",
      github: "GitHub",
    },
    es: {
      kicker: "Contacto",
      title: "¿Tienes una idea, un proyecto o un reto por resolver?",
      description:
        "Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tus visiones. ¡Hablemos!",
      copyEmail: "Copiar correo",
      copied: "¡Copiado!",
      writeMe: "Escríbeme",
      connectLinkedIn: "LinkedIn",
      github: "GitHub",
    },
  };

  const t = content[language] || content.en;

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <div className="contact__card">
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="contact__title">{t.title}</h2>
          <span className="gold-divider" />
          <p className="contact__description">{t.description}</p>

          <div className="contact__email-row">
            <span className="contact__email">{MY_EMAIL}</span>
            <button
              onClick={copyEmailToClipboard}
              className={`contact__copy-btn ${isCopied ? "copied" : ""}`}
              aria-label={isCopied ? t.copied : t.copyEmail}
              title={isCopied ? t.copied : t.copyEmail}
            >
              {isCopied ? <BsCheckCircleFill /> : <FiCopy />}
              <span>{isCopied ? t.copied : t.copyEmail}</span>
            </button>
          </div>

          <div className="contact__actions">
            <a href={`mailto:${MY_EMAIL}`} className="btn btn-gold">
              <MdOutlineEmail /> {t.writeMe}
            </a>
            <a
              href="https://www.linkedin.com/in/johan-morales-b3809b206/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <BsLinkedin /> {t.connectLinkedIn}
            </a>
            <a
              href="https://github.com/JohanMorales211"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <FaGithub /> {t.github}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
