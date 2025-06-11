import React, { useState, useEffect } from "react";
import IMG_CHEFSITO from "../../assets/logo_chefsito.png";
import IMG_NU_CALCULATOR from "../../assets/imagen_nu.jpg";
import IMG_REAL_TIME_TWEET from "../../assets/tweets_x.png";
import IMG_FILE_EXPLORER from "../../assets/file_explorer.jpg";
import IMG_SPOTIFY_TIME_FREE from "../../assets/spotify_time_free.png";
import IMG_FILMIX from "../../assets/filmix.png";
import IMG_LINGUAI from "../../assets/logo_languAI.png";
import "./portfolio.css";
import { FiGithub, FiExternalLink } from 'react-icons/fi';

import showMoreSoundSrc from '../../assets/sounds/mouse_click.mp3';

const Portfolio = ({ language }) => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);

  const playShowMoreSound = () => {
    const audio = new Audio(showMoreSoundSrc);
    audio.volume = 0.7;
    audio.play().catch(error => {
      console.error("Error al reproducir el sonido 'show more':", error);
    });
  };

  const soloProjectsData = [
    {
      id: 8,
      title: { en: "Chefsito", es: "Chefsito" },
      img: IMG_CHEFSITO,
      description: {
        en: "Recipe application with an integrated AI assistant. It allows users to resolve questions about ingredients and preparation in real-time. Built with Angular, it is fully responsive and focuses on a fluid user experience.",
        es: "Aplicación de recetas con un asistente de IA integrado. Permite a los usuarios resolver dudas sobre ingredientes y preparación en tiempo real. Construido con Angular, es totalmente responsivo y se enfoca en una experiencia de usuario fluida."
      },
      technologies: {
        en: "Angular | TypeScript | Cerebras API | Tailwind CSS",
        es: "Angular | TypeScript | API de Cerebras | Tailwind CSS"
      },
      demoLink: "https://johanmorales211.github.io/recipes/home",
    },
    {
      id: 7,
      title: { en: "LinguAI", es: "LinguAI" },
      img: IMG_LINGUAI,
      description: {
        en: "An intelligent language learning tool powered by AI. It provides not just direct translations but also contextual alternatives and usage examples, using the Cerebras API for advanced language processing.",
        es: "Una herramienta inteligente para el aprendizaje de idiomas impulsada por IA. No solo ofrece traducciones directas, sino también alternativas contextuales y ejemplos de uso, utilizando la API de Cerebras para un procesamiento avanzado del lenguaje."
      },
      technologies: {
        en: "Angular | TypeScript | Cerebras API | Tailwind CSS",
        es: "Angular | TypeScript | API de Cerebras | Tailwind CSS"
      },
      demoLink: "https://johanmorales211.github.io/language-ai/",
    },
    {
      id: 6,
      title: { en: "Filmix", es: "Filmix" },
      img: IMG_FILMIX,
      description: {
        en: "Filmix is a web application made with Angular where you can explore a catalog of movies and series, discover details, watch trailers, and much more. This project is a key piece of my portfolio to demonstrate my front-end development skills.",
        es: "Filmix es una aplicación web hecha con Angular donde puedes explorar un catálogo de películas y series, descubrir detalles, ver tráilers y mucho más. Este proyecto es una pieza clave de mi portafolio para demostrar mis habilidades en desarrollo front-end."
      },
      technologies: {
        en: "Angular | TypeScript | HTML | CSS | API Integration",
        es: "Angular | TypeScript | HTML | CSS | Integración API"
      },
      demoLink: "https://johanmorales211.github.io/my-platform-cinema/home",
    },
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
      demoLink: "https://rshvwf.csb.app/"
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
      demo: "Live Demo",
      technologiesLabel: "Technologies:",
    },
    es: {
      sectionSubtitle: "Un Vistazo A Mis",
      sectionTitle: "Últimos Proyectos Personales",
      showAll: "Mostrar Más",
      showLess: "Mostrar Menos",
      githubRepo: "GitHub",
      demo: "Demo en Vivo",
      technologiesLabel: "Tecnologías:",
    },
  };

  const projectsToDisplayCount = 4;
  const projectsToShow = showAllProjects
    ? soloProjectsData
    : soloProjectsData.slice(0, projectsToDisplayCount);

  const handleClickShowMore = () => {
    playShowMoreSound();
    setShowAllProjects(!showAllProjects);
    setUpdateKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    const portfolioItems = document.querySelectorAll(".portfolio__item_card");
    if (portfolioItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
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
          <article
            className="portfolio__item_card"
            key={pro.id}
            style={{ '--card-index': index }}
          >
            <div className="portfolio__item_image_wrapper">
              <img
                src={pro.img}
                alt={pro.title[language]}
                className="portfolio__item_bg_image"
              />
            </div>
            <div className="portfolio__item_content_wrapper">
              <h3 className="portfolio__item_title">{pro.title[language]}</h3>
              <p className="portfolio__item_description">{pro.description[language]}</p>
              <div className="portfolio__item_technologies">
                <strong>{sectionContent[language].technologiesLabel}</strong>
                <div className="portfolio__tech_tags_container">
                  {pro.technologies[language].split(' | ').map((tech) => (
                    <span key={tech} className="tech_tag_portfolio">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="portfolio__item_cta">
                {pro.githubLink && (
                  <a
                    href={pro.githubLink}
                    className="btn btn-secondary btn-pink-outline"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sectionContent[language].githubRepo} - ${pro.title[language]}`}
                  >
                    <FiGithub style={{ marginRight: "0.5em" }} /> {sectionContent[language].githubRepo}
                  </a>
                )}
                {pro.demoLink && (
                  <a
                    href={pro.demoLink}
                    className="btn btn-primary btn-pink-solid"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sectionContent[language].demo} - ${pro.title[language]}`}
                  >
                    <FiExternalLink style={{ marginRight: "0.5em" }} /> {sectionContent[language].demo}
                  </a>
                )}
              </div>
            </div>
          </article>
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
  );
};

export default Portfolio;