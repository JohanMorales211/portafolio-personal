import React, { useEffect } from "react";
import "./workSection.css";
import CV_File from "../../assets/my_resume.pdf";
import { FiDownload, FiFileText } from "react-icons/fi";
const GradientButton = ({ href, download, children, className }) => {
  return (
    <a href={href} download={download} className={`gradient_button_cv ${className || ''}`}>
      {children}
    </a>
  );
};
const WorkSection = ({ language }) => {
  const content = {
    en: {
      sectionTitle: "My Work",
      description:
        "Deployed scalable web applications and project management, always focused on learning and providing collaborative value. Ready to join teams where we can grow together! My experience includes building innovative solutions and optimizing performance.",
      featuredProjectTitle: "My Resume",
      projectDescription: "Take a look at my professional background and detailed experience.",
      viewProjectButton: "View / Download CV",
    },
    es: {
      sectionTitle: "Mi Trabajo",
      description:
        "Desarrollé aplicaciones web escalables y participé en la gestión de proyectos, siempre enfocado en aprender y aportar valor colaborativo. ¡Listo para sumar a equipos donde crecer juntos! Mi experiencia incluye construir soluciones innovadoras y optimizar el rendimiento.",
      featuredProjectTitle: "Mi Currículum",
      projectDescription: "Echa un vistazo a mi trayectoria profesional y experiencia detallada.",
      viewProjectButton: "Ver / Descargar CV",
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
        <div className="work_section_featured_cv">
          <div className="cv_preview_area">
            <FiFileText className="cv_icon_placeholder" />
          </div>
          <div className="featured_cv_details">
            <p className="featured_cv_label">{language === 'es' ? "Documento Destacado" : "Featured Document"}</p>
            <h3 className="featured_cv_title">{content[language].featuredProjectTitle}</h3>
            <p className="featured_cv_description">{content[language].projectDescription}</p>
            <GradientButton href={CV_File} download="Johan_Morales_CV.pdf">
              <FiDownload style={{ marginRight: "0.5rem" }} />
              {content[language].viewProjectButton}
            </GradientButton>
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