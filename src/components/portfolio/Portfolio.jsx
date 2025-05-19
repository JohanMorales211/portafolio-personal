import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import IMG_NU_CALCULATOR from "../../assets/imagen_nu.jpg";
import IMG_REAL_TIME_TWEET from "../../assets/tweets_x.png";
import IMG_FILE_EXPLORER from "../../assets/file_explorer.jpg";
import IMG_SPOTIFY_TIME_FREE from "../../assets/spotify_time_free.png";
import "./portfolio.css";
import { FiGithub, FiExternalLink } from 'react-icons/fi';
const Portfolio = ({ language }) => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const soloProjectsData = [
    {
      id: 1,
      title: { en: "Spotify Clone - Time Free", es: "Clon de Spotify - Time Free" },
      img: IMG_SPOTIFY_TIME_FREE,
      description: {
        en: "A personal project replicating the core features of Spotify, showcasing my public playlist. It allows users to browse songs, play them using the YouTube API, control playback, and enjoy a seamless music streaming experience.",
        es: "Un proyecto personal que replica las funciones principales de Spotify, mostrando mi playlist pública. Permite a los usuarios navegar por las canciones, reproducirlas usando la API de YouTube, controlar la reproducción y disfrutar de una experiencia de transmisión de música sin interrupciones.",
      },
      technologies: { en: "React | TypeScript | YouTube API | Tailwind CSS", es: "React | TypeScript | API de YouTube | Tailwind CSS" },
      demoLink: "https://4ky9lr.csb.app/",
    },
    {
      id: 2,
      title: { en: "Real-Time Tweet Analysis with AI", es: "Análisis de Tweets en Tiempo Real con IA" },
      img: IMG_REAL_TIME_TWEET,
      description: {
        en: "Advanced web scraping system combined with AI models for real-time Twitter/X analysis. Features sentiment analysis, word clouds, and AI-generated summaries using Cerebras technology.",
        es: "Sistema avanzado de scraping web combinado con modelos de IA para análisis en tiempo real de Twitter/X. Incluye análisis de sentimientos, nubes de palabras y resúmenes generados por IA usando tecnología Cerebras.",
      },
      technologies: { en: "Flask | Selenium | Cerebras SDK | NLP", es: "Flask | Selenium | Cerebras SDK | NLP" },
      githubLink: "https://github.com/JohanMorales211/ia-web-scraping",
    },
    {
      id: 3,
      title: { en: "File Explorer", es: "Explorador de Archivos" },
      img: IMG_FILE_EXPLORER,
      description: {
        en: "Visual folder structure explorer with file content analysis and interactive visualization capabilities.",
        es: "Explorador visual de estructuras de carpetas con análisis de contenido de archivos y capacidades de visualización interactiva.",
      },
      technologies: { en: "TypeScript | JavaScript | HTML | CSS", es: "TypeScript | JavaScript | HTML | CSS" },
      demoLink: "https://rshvwf.csb.app/",
      githubLink: "https://github.com/JohanMorales211/folder-explorer",
    },
    {
      id: 5,
      title: { en: "NU Compound Interest Calculator", es: "Calculadora de Interés Compuesto NU" },
      img: IMG_NU_CALCULATOR,
      description: {
        en: "Specialized financial calculator for NU Colombia products with compound interest calculations.",
        es: "Calculadora financiera especializada para productos NU Colombia con cálculos de interés compuesto.",
      },
      technologies: { en: "React | TypeScript | Tailwind", es: "React | TypeScript | Tailwind" },
      githubLink: "https://github.com/JohanMorales211/calculadora-interes-nu",
      demoLink: "https://n4trp3.csb.app/",
    },
  ];
  const sectionContent = {
    en: {
      sectionSubtitle: "A Glimpse Into My",
      sectionTitle: "Latest Personal Projects",
      showAll: "Show More",
      showLess: "Show Less",
      githubRepo: "GitHub",
      demo: "Live Demo"
    },
    es: {
      sectionSubtitle: "Un Vistazo A Mis",
      sectionTitle: "Últimos Proyectos Personales",
      showAll: "Mostrar Más",
      showLess: "Mostrar Menos",
      githubRepo: "GitHub",
      demo: "Demo en Vivo"
    },
  };
  const projectsToDisplayCount = 4;
  const projectsToShow = showAllProjects
    ? soloProjectsData
    : soloProjectsData.slice(0, projectsToDisplayCount);
  const handleClickShowMore = () => {
    setShowAllProjects(!showAllProjects);
    setUpdateKey(prevKey => prevKey + 1);
  };
  const openModalWithProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  useEffect(() => {
    const portfolioItems = document.querySelectorAll(".portfolio__item_clickable_area");
    if (portfolioItems.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
          }
        });
      },
      { threshold: 0.1 }
    );
    portfolioItems.forEach((item) => observer.observe(item));
    return () => portfolioItems.forEach((item) => {
        if(item) observer.unobserve(item);
    });
  }, [updateKey, projectsToShow]);
  return (
    <>
      <section id="portfolio" className="portfolio_section">
        <div className="container portfolio_section_header">
          {sectionContent[language].sectionSubtitle && (
              <h5 className="portfolio_section_subtitle">
                  {sectionContent[language].sectionSubtitle}
              </h5>
          )}
          <h2 className="portfolio_section_title">
            {sectionContent[language].sectionTitle}
            <span className="section_title_dot">.</span>
          </h2>
        </div>
        <div className="container portfolio__container" key={updateKey}>
          {projectsToShow.map((pro, index) => (
            <div
              className="portfolio__item_clickable_area"
              key={pro.id}
              style={{ '--card-index': index }}
              onClick={() => openModalWithProject(pro)}
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') openModalWithProject(pro);}}
              role="button"
              aria-label={`View details for ${pro.title[language]}`}
            >
              <div className="portfolio__item-image_wrapper">
                <img src={pro.img} alt={pro.title[language]} className="portfolio__item_bg_image"/>
                <div className="portfolio__item_title_overlay">
                  <h3 className="portfolio__item_image_title">{pro.title[language]}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        {soloProjectsData.length > projectsToDisplayCount && (
          <div className="portfolio__button_container">
            <button className="btn btn-secondary btn-pink-outline" onClick={handleClickShowMore}>
              {showAllProjects
                ? sectionContent[language].showLess
                : sectionContent[language].showAll}
            </button>
          </div>
        )}
      </section>
      {selectedProject && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="modal_project_image_container">
            <img src={selectedProject.img} alt={selectedProject.title[language]} />
          </div>
          <h3 className="modal_project_title">{selectedProject.title[language]}</h3>
          <p className="modal_project_description">{selectedProject.description[language]}</p>
          <p className="modal_project_technologies">
            <strong>{language === 'es' ? 'Tecnologías:' : 'Technologies:'}</strong> {selectedProject.technologies[language]}
          </p>
          <div className="modal_project_cta">
            {selectedProject.githubLink && (
              <a
                href={selectedProject.githubLink}
                className="btn btn-secondary btn-pink-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub style={{ marginRight: "0.5em" }} /> {sectionContent[language].githubRepo}
              </a>
            )}
            {selectedProject.demoLink && (
              <a
                href={selectedProject.demoLink}
                className="btn btn-primary btn-pink-solid"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink style={{ marginRight: "0.5em" }} /> {sectionContent[language].demo}
              </a>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
export default Portfolio;