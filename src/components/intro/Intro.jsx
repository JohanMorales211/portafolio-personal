import React from "react";
import { FaAward } from "react-icons/fa";
import { VscFolderLibrary } from "react-icons/vsc";
import CV from "../../assets/my_resume.pdf";
import "./intro.css";

function GradientText({
  children,
  className = "",
  colors = ["#00c3ff", "#800080"],
  animationSpeed = 5,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div className={`animated-gradient-text ${className}`}>
      {showBorder && (
        <div className="gradient-overlay" style={gradientStyle}></div>
      )}
      <div className="text-content" style={gradientStyle}>
        {children}
      </div>
    </div>
  );
}

const Intro = ({ language }) => {
  const content = {
    en: {
      getToKnow: "Get to know",
      aboutMe: "About Me",
      experience: "Experience",
      projects: "Projects",
      year: "year",
      completedProjects: "Completed Projects",
      description:
        "As a Software Engineer, I am actively seeking new professional opportunities where I can apply my knowledge and contribute to impactful projects in the technology sector. My goal is to continue expanding my skills in application development and project management, leveraging my experience in the full software development life cycle to create and enhance innovative solutions.",
      downloadCV: "Download CV",
    },
    es: {
      getToKnow: "Conóceme",
      aboutMe: "Sobre mí",
      experience: "Experiencia",
      projects: "Proyectos",
      year: "año",
      completedProjects: "Proyectos completados",
      description:
        "Como Ingeniero de Software, me encuentro en búsqueda activa de nuevas oportunidades profesionales donde pueda aplicar mis conocimientos y contribuir a proyectos de impacto en el sector tecnológico. Mi objetivo es seguir expandiendo mis habilidades en el desarrollo de aplicaciones y la gestión de proyectos, aprovechando mi experiencia en el ciclo de vida completo del desarrollo de software para crear y mejorar soluciones innovadoras.",
      downloadCV: "Descargar CV",
    },
  };

  return (
    <section id="about">
      <h5>{content[language].getToKnow}</h5>
      <h2>{content[language].aboutMe}</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src="https://i.postimg.cc/Kjx7YXWv/yo.webp" alt="me" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>{content[language].experience}</h5>
              <small>2+ {content[language].year}</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>{content[language].projects}</h5>
              <small>7+ {content[language].completedProjects}</small>
            </article>
          </div>
          <p>{content[language].description}</p>
          <a href={CV} download className="download-link">
            <GradientText
              showBorder={true}
              colors={["#00c3ff", "#800080"]}
              animationSpeed={5}
            >
              {content[language].downloadCV}
            </GradientText>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
