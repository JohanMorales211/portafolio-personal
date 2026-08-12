import React, { useEffect } from "react";
import "./workSection.css";
import { FiServer, FiLayout, FiCpu, FiCloud } from "react-icons/fi";

const AREAS = [
  {
    id: "backend",
    icon: FiServer,
    title: { en: "Backend Development", es: "Desarrollo Backend" },
    description: {
      en: "Robust, scalable APIs and server-side systems. The core logic that powers complex applications with performance and reliability.",
      es: "APIs y sistemas del lado del servidor robustos y escalables. La lógica central que impulsa aplicaciones complejas con rendimiento y fiabilidad.",
    },
    skills: ["Java", "Python", "SQL", "Docker", "REST APIs"],
  },
  {
    id: "frontend",
    icon: FiLayout,
    title: { en: "Frontend Development", es: "Desarrollo Frontend" },
    description: {
      en: "Intuitive, responsive user interfaces built with modern JavaScript frameworks that bring applications to life.",
      es: "Interfaces de usuario intuitivas y responsivas construidas con frameworks JavaScript modernos que dan vida a las aplicaciones.",
    },
    skills: ["React", "Angular", "TypeScript", "HTML", "CSS"],
  },
  {
    id: "ai",
    icon: FiCpu,
    title: { en: "AI Integrations", es: "Integraciones con IA" },
    description: {
      en: "Applications powered by AI: assistants, sentiment analysis, NLP and web scraping combined with modern AI APIs.",
      es: "Aplicaciones potenciadas con IA: asistentes, análisis de sentimientos, NLP y web scraping combinados con APIs modernas de IA.",
    },
    skills: ["Cerebras API", "NLP", "Selenium", "Flask"],
  },
  {
    id: "cloud",
    icon: FiCloud,
    title: { en: "Cloud & Practices", es: "Cloud y Buenas Prácticas" },
    description: {
      en: "AWS cloud foundations, observability and agile delivery — certified knowledge applied to the full development life cycle.",
      es: "Fundamentos de nube AWS, observabilidad y entrega ágil — conocimiento certificado aplicado al ciclo de vida completo del desarrollo.",
    },
    skills: ["AWS", "Observability", "Scrum", "Git"],
  },
];

const WorkSection = ({ language }) => {
  const content = {
    en: {
      kicker: "About me",
      title: "Software built for production",
      description:
        "As a Software Engineer, I am actively seeking new professional opportunities where I can apply my knowledge and contribute to impactful projects in the technology sector. My goal is to continue expanding my skills in application development and project management, leveraging my experience in the full software development life cycle to create and enhance innovative solutions.",
      areasTitle: "Areas I specialize in",
    },
    es: {
      kicker: "Sobre mí",
      title: "Software pensado para producción",
      description:
        "Como Ingeniero de Software, me encuentro en búsqueda activa de nuevas oportunidades profesionales donde pueda aplicar mis conocimientos y contribuir a proyectos de impacto en el sector tecnológico. Mi objetivo es seguir expandiendo mis habilidades en el desarrollo de aplicaciones y la gestión de proyectos, aprovechando mi experiencia en el ciclo de vida completo del desarrollo de software para crear y mejorar soluciones innovadoras.",
      areasTitle: "Áreas en las que me especializo",
    },
  };

  const t = content[language] || content.en;

  useEffect(() => {
    const cards = document.querySelectorAll(".area-card");
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [language]);

  return (
    <section id="sobre-mi" className="about">
      <div className="container">
        <div className="section-head">
          <span className="section-kicker">{t.kicker}</span>
          <h2>{t.title}</h2>
          <span className="gold-divider" />
          <p className="section-desc">{t.description}</p>
        </div>

        <h3 className="about__areas-title">{t.areasTitle}</h3>

        <div className="about__areas-grid">
          {AREAS.map((area, index) => {
            const Icon = area.icon;
            return (
              <article
                className="area-card dark-card reveal"
                key={area.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="area-card__top">
                  <span className="area-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="area-card__icon">
                    <Icon />
                  </span>
                </div>
                <h4 className="area-card__title">{area.title[language] || area.title.en}</h4>
                <p className="area-card__description">
                  {area.description[language] || area.description.en}
                </p>
                <div className="area-card__skills">
                  {area.skills.map((skill) => (
                    <span className="gold-pill" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
