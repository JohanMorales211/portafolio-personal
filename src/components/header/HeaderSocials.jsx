import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
const HeaderSocials = () => {
  return (
    <div className="header__socials">
      <a
        href="https://www.linkedin.com/in/johan-morales-b3809b206/"
        target="_blank"
        rel="noreferrer"
        aria-label="Mi perfil de LinkedIn"
      >
        <BsLinkedin />
      </a>
      <a
        href="https://github.com/JohanMorales211"
        target="_blank"
        rel="noreferrer"
        aria-label="Mi perfil de GitHub"
      >
        <FaGithub />
      </a>
    </div>
  );
};
export default HeaderSocials;