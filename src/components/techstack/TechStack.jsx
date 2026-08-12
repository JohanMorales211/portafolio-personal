import React from "react";
import "./techstack.css";

import java_logo from "../../assets/logos/java_logo.png";
import python_logo from "../../assets/logos/python_logo.png";
import git_logo from "../../assets/logos/git_logo.png";
import sql_logo from "../../assets/logos/sql_logo.png";
import docker_logo from "../../assets/logos/docker_logo.png";
import react_logo from "../../assets/logos/react_logo.png";
import angular_logo from "../../assets/logos/angular_logo.png";
import html_logo from "../../assets/logos/html_logo.png";
import css_logo from "../../assets/logos/css_logo.png";

const TECHNOLOGIES = [
  { name: "Java", logo: java_logo },
  { name: "Python", logo: python_logo },
  { name: "SQL", logo: sql_logo },
  { name: "Docker", logo: docker_logo },
  { name: "Git", logo: git_logo },
  { name: "React", logo: react_logo },
  { name: "Angular", logo: angular_logo },
  { name: "HTML", logo: html_logo },
  { name: "CSS", logo: css_logo },
];

const TechStack = ({ language }) => {
  const content = {
    en: {
      title: "Technologies I work with",
      subtitle: "Modern tools for modern solutions",
    },
    es: {
      title: "Tecnologías con las que trabajo",
      subtitle: "Herramientas modernas para soluciones modernas",
    },
  };

  const t = content[language] || content.en;

  // Se duplica la lista para lograr el bucle infinito del marquee
  const marqueeItems = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section id="tecnologias" className="techstack">
      <div className="container">
        <div className="section-head techstack__head">
          <h2>{t.title}</h2>
          <span className="gold-divider" />
          <p className="section-desc">{t.subtitle}</p>
        </div>
      </div>

      <div className="techstack__marquee" aria-label={t.title}>
        <div className="techstack__track">
          {marqueeItems.map((tech, index) => (
            <div
              className="techstack__card"
              key={`${tech.name}-${index}`}
              aria-hidden={index >= TECHNOLOGIES.length}
            >
              <div className="techstack__logo-box">
                <img src={tech.logo} alt={index < TECHNOLOGIES.length ? `${tech.name} logo` : ""} loading="lazy" />
              </div>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
