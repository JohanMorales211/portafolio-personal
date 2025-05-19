import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MdOutlineEmail } from "react-icons/md";
import "./contact.css";

const Contact = ({ language }) => {
  const [message, setMessage] = useState(false);
  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
    emailjs
      .sendForm(
        "service_k2qawqh",
        "template_c6rkpn6",
        formRef.current,
        "X7K7ebhIeOy3YwHki"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  const content = {
    en: {
      getInTouch: "Get In Touch",
      contactMe: "Contact Me",
      email: "Email",
      sendMessage: "Send a message",
    },
    es: {
      getInTouch: "Ponte en contacto",
      contactMe: "Contáctame",
      email: "Correo electrónico",
      sendMessage: "Enviar un mensaje",
    },
  };

  return (
    <section id="contact" className="contact__section">
      <h5>{content[language].getInTouch}</h5>
      <h2>{content[language].contactMe}</h2>
      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className="contact__option-icon" />
            <h4>{content[language].email}</h4>
            <h5>johanmorales211@gmail.com</h5>
            <a href="mailto:johanmorales211@gmail.com">
              {content[language].sendMessage}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Contact;
