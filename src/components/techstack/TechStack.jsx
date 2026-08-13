import React from "react";
import "./techstack.css";
import { FaAws, FaJava, FaDocker, FaReact } from "react-icons/fa";
import { SiKubernetes } from "react-icons/si";

import python_logo from "../../assets/logos/python_logo.png";
import git_logo from "../../assets/logos/git_logo.png";
import sql_logo from "../../assets/logos/sql_logo.png";
import angular_logo from "../../assets/logos/angular_logo.png";

const TECHNOLOGIES = [
  { name: "Java", icon: FaJava, color: "#E76F00" },
  { name: "Python", logo: python_logo },
  { name: "SQL", logo: sql_logo },
  { name: "AWS", icon: FaAws, color: "#E88A00", colorDark: "#FF9900" },
  { name: "Docker", icon: FaDocker, color: "#1D7FD1", colorDark: "#2496ED" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5", colorDark: "#4C87F5" },
  { name: "Git", logo: git_logo },
  { name: "React", icon: FaReact, color: "#0B8FAC", colorDark: "#61DAFB" },
  { name: "Angular", logo: angular_logo },
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

  const marqueeItems = [
    ...TECHNOLOGIES,
    ...TECHNOLOGIES,
    ...TECHNOLOGIES,
    ...TECHNOLOGIES,
  ];

  return (
    <section id="tecnologias" className="techstack">
      <div className="container">
        <div className="section-head techstack__head reveal">
          <h2>{t.title}</h2>
          <span className="gold-divider" />
          <p className="section-desc">{t.subtitle}</p>
        </div>
      </div>

      <div className="techstack__marquee reveal" aria-label={t.title}>
        <div className="techstack__track">
          {marqueeItems.map((tech, index) => (
            <div
              className="techstack__card"
              key={`${tech.name}-${index}`}
              aria-hidden={index >= TECHNOLOGIES.length}
            >
              <div className="techstack__logo-box">
                {tech.icon ? (
                  <tech.icon
                    className="techstack__icon"
                    style={{
                      "--icon-color": tech.color,
                      "--icon-color-dark": tech.colorDark || tech.color,
                    }}
                    aria-label={index < TECHNOLOGIES.length ? `${tech.name} logo` : undefined}
                  />
                ) : (
                  <img src={tech.logo} alt={index < TECHNOLOGIES.length ? `${tech.name} logo` : ""} loading="lazy" />
                )}
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
