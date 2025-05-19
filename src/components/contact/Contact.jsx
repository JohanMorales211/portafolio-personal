import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import "./contact.css";
const Contact = ({ language }) => {
  const myEmail = "johanmorales211@gmail.com";
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(myEmail).then(() => {
      alert(language === 'es' ? '¡Correo copiado al portapapeles!' : 'Email copied to clipboard!');
    }).catch(err => {
      console.error('Error al copiar el correo: ', err);
      alert(language === 'es' ? 'Error al copiar el correo.' : 'Failed to copy email.');
    });
  };
  const content = {
    en: {
      sectionSubtitle: "Let's Connect",
      sectionTitle: "Contact Me",
      introText: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!",
      contactOptionEmail: "My Email",
      emailInstruction: "Feel free to send me an email. You can copy my address below:",
      emailAddressLabel: "Email:",
      copyEmailTooltip: "Copy Email",
      contactOptionLinkedIn: "LinkedIn",
      linkedInDescription: "Connect with me on LinkedIn for professional networking and discussions.",
      connectOnLinkedIn: "Connect on LinkedIn",
    },
    es: {
      sectionSubtitle: "Conectemos",
      sectionTitle: "Contáctame",
      introText: "Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tus visiones. ¡No dudes en contactarme!",
      contactOptionEmail: "Mi Correo",
      emailInstruction: "No dudes en enviarme un correo. Puedes copiar mi dirección a continuación:",
      emailAddressLabel: "Correo:",
      copyEmailTooltip: "Copiar Correo",
      contactOptionLinkedIn: "LinkedIn",
      linkedInDescription: "Conéctate conmigo en LinkedIn para networking profesional y discusiones.",
      connectOnLinkedIn: "Conectar en LinkedIn",
    },
  };
  return (
    <section id="contact" className="contact-section">
      <div className="container section-header contact-header-override">
        <h5 className="section-subtitle">
          {content[language].sectionSubtitle}
        </h5>
        <h2 className="section-title">
          {content[language].sectionTitle}
          <span className="title-dot contact-title-dot">.</span>
        </h2>
      </div>
      <div className="container contact__container">
        <p className="contact__intro-text">{content[language].introText}</p>
        <div className="contact__options-grid">
          <article className="contact__option_card email-card">
            <div className="contact__option_icon-wrapper">
              <MdOutlineEmail className="contact__option_icon" />
            </div>
            <h4 className="contact__option_title">{content[language].contactOptionEmail}</h4>
            <p className="contact__option_description email-instruction">{content[language].emailInstruction}</p>
            <div className="email-address-container">
              <span className="email-address-text" title={content[language].copyEmailTooltip + " (Click para intentar copiar)"}>{myEmail}</span>
              <button
                onClick={copyEmailToClipboard}
                className="copy-email-button"
                aria-label={content[language].copyEmailTooltip}
                title={content[language].copyEmailTooltip}
              >
                <FiCopy />
              </button>
            </div>
            <p className="contact__final-text-email">
              {language === 'es' ? "Espero tu mensaje." : "Looking forward to your message."}
            </p>
          </article>
          <article className="contact__option_card">
            <div className="contact__option_icon-wrapper">
              <BsLinkedin className="contact__option_icon" />
            </div>
            <h4 className="contact__option_title">{content[language].contactOptionLinkedIn}</h4>
            <p className="contact__option_description">{content[language].linkedInDescription}</p>
            <a
              href="https://www.linkedin.com/in/johan-morales-b3809b206/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary contact__option_btn linkedin-btn"
            >
              <BsLinkedin style={{ marginRight: "0.5em" }} />
              {content[language].connectOnLinkedIn}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};
export default Contact;