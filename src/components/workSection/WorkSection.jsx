import React, { useEffect } from "react";
import "./workSection.css";
import MyPhoto from "../../assets/foto_mia.png";

const WorkSection = ({ language }) => {
  const content = {
    en: {
      sectionTitle: "About Me",
      description:
        "As a Software Engineer, I am actively seeking new professional opportunities where I can apply my knowledge and contribute to impactful projects in the technology sector. My goal is to continue expanding my skills in application development and project management, leveraging my experience in the full software development life cycle to create and enhance innovative solutions.",
      myPhotoAlt: "Photo of Johan Morales"
    },
    es: {
      sectionTitle: "Sobre Mí",
      description:
        "Como Ingeniero de Software, me encuentro en búsqueda activa de nuevas oportunidades profesionales donde pueda aplicar mis conocimientos y contribuir a proyectos de impacto en el sector tecnológico. Mi objetivo es seguir expandiendo mis habilidades en el desarrollo de aplicaciones y la gestión de proyectos, aprovechando mi experiencia en el ciclo de vida completo del desarrollo de software para crear y mejorar soluciones innovadoras.",
      myPhotoAlt: "Foto de Johan Morales"
    },
  };

  useEffect(() => {
    const section = document.querySelector(".work_section_container");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="work" className="work_section">
      <div className="container work_section_container">
        <div className="work_section_text_content">
          <h2 className="work_section_title">
            {content[language].sectionTitle}
            <span className="section_title_dot">.</span>
          </h2>
          <p className="work_section_description">
            {content[language].description}
          </p>
        </div>
        <div className="work_section_image_display">
          <div className="about_me_image_container">
            <img src={MyPhoto} alt={content[language].myPhotoAlt} className="my_photo_image" />
          </div>
        </div>
      </div>
      <div className="work_section_decorative_dots">
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
      </div>
    </section>
  );
};

export default WorkSection;