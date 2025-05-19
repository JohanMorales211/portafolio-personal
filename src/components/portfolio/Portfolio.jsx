import React, { useState, useEffect } from "react";
import IMG6 from "../../assets/imagen_nu.jpg";
import "./portfolio.css";

const Portfolio = ({ language }) => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);

  const soloProjects = [
    {
      id: 1,
      title: {
        en: "Spotify Clone - Time Free",
        es: "Clon de Spotify - Time Free",
      },
      img: "https://dplnews.com/wp-content/uploads/2023/01/dplnews_spotify_mc31123.png",
      description: {
        en: "A personal project replicating the core features of Spotify, showcasing my public playlist. It allows users to browse songs, play them using the YouTube API, control playback, and enjoy a seamless music streaming experience.",
        es: "Un proyecto personal que replica las funciones principales de Spotify, mostrando mi playlist pública. Permite a los usuarios navegar por las canciones, reproducirlas usando la API de YouTube, controlar la reproducción y disfrutar de una experiencia de transmisión de música sin interrupciones.",
      },
      technologies: {
        en: "React | TypeScript | YouTube API | Tailwind CSS",
        es: "React | TypeScript | API de YouTube | Tailwind CSS",
      },
      demoLink: "https://4ky9lr.csb.app/",
    },
    {
      id: 2,
      title: {
        en: "Real-Time Tweet Analysis with AI",
        es: "Análisis de Tweets en Tiempo Real con IA",
      },
      img: "https://img.freepik.com/fotos-premium/estamos-buscando-crear-imagen-realista-letra-x-efectos-luz-sombras-representar_693504-2031.jpg",
      description: {
        en: "Advanced web scraping system combined with AI models for real-time Twitter/X analysis. Features sentiment analysis, word clouds, and AI-generated summaries using Cerebras technology.",
        es: "Sistema avanzado de scraping web combinado con modelos de IA para análisis en tiempo real de Twitter/X. Incluye análisis de sentimientos, nubes de palabras y resúmenes generados por IA usando tecnología Cerebras.",
      },
      technologies: {
        en: "Flask | Selenium | Cerebras SDK | NLP",
        es: "Flask | Selenium | Cerebras SDK | NLP",
      },
      githubLink: "https://github.com/JohanMorales211/ia-web-scraping",
    },
    {
      id: 3,
      title: {
        en: "File Explorer",
        es: "Explorador de Archivos",
      },
      img: "https://i.postimg.cc/4xMsSRW9/foto-carpetas.jpg",
      description: {
        en: "Visual folder structure explorer with file content analysis and interactive visualization capabilities.",
        es: "Explorador visual de estructuras de carpetas con análisis de contenido de archivos y capacidades de visualización interactiva.",
      },
      technologies: {
        en: "TypeScript | JavaScript | HTML | CSS",
        es: "TypeScript | JavaScript | HTML | CSS",
      },
      demoLink: "https://rshvwf.csb.app/",
      githubLink: "https://github.com/JohanMorales211/folder-explorer",
    },
    {
      id: 5,
      title: {
        en: "NU Compound Interest Calculator",
        es: "Calculadora de Interés Compuesto NU",
      },
      img: IMG6,
      description: {
        en: "Specialized financial calculator for NU Colombia products with compound interest calculations.",
        es: "Calculadora financiera especializada para productos NU Colombia con cálculos de interés compuesto.",
      },
      technologies: {
        en: "React | TypeScript | Tailwind",
        es: "React | TypeScript | Tailwind",
      },
      githubLink: "https://github.com/JohanMorales211/calculadora-interes-nu",
      demoLink: "https://n4trp3.csb.app/",
    },
  ];

  const projectsToShow = showAllProjects
    ? soloProjects
    : soloProjects.slice(0, 6);

  const handleClick = () => {
    setShowAllProjects((prevShowAllProjects) => !prevShowAllProjects);
    setUpdateKey(updateKey + 1);
  };

  useEffect(() => {
    const portfolioItems = document.querySelectorAll(".portfolio__item");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    portfolioItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [updateKey]);

  const content = {
    en: {
      myRecentWork: "My Recent Work",
      portfolio: "Portfolio",
      showAll: "Show More",
      showLess: "Show Less",
      githubRepo: "GitHub Repo",
      demo: "Demo",
    },
    es: {
      myRecentWork: "Mi trabajo reciente",
      portfolio: "Portafolio",
      showAll: "Mostrar más",
      showLess: "Mostrar menos",
      githubRepo: "Repositorio GitHub",
      demo: "Demo",
    },
  };

  return (
    <section id="portfolio">
      <h5>{content[language].myRecentWork}</h5>
      <h2>{content[language].portfolio}</h2>

      <div className="container portfolio__container" key={updateKey}>
        {projectsToShow.map((pro) => (
          <article
            className={`portfolio__item ${pro.id === 1 ? "premium-card" : ""}`}
            key={pro.id}
          >
            <div className="portfolio__item-image">
              <img src={pro.img} alt={pro.title[language]} />
            </div>
            <div className="portfolio__item-content">
              <h3>{pro.title[language]}</h3>
              <p>{pro.description[language]}</p>
              <p className="technologies">{pro.technologies[language]}</p>
              <div className="portfolio__item-cta">
                {pro.githubLink && (
                  <a
                    href={pro.githubLink}
                    className="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content[language].githubRepo}
                  </a>
                )}
                {pro.demoLink && (
                  <a
                    href={pro.demoLink}
                    className={`btn ${
                      pro.id === 1 ? "btn-premium" : "btn-primary"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content[language].demo}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {soloProjects.length > 6 && (
        <div className="portfolio__button-container">
          <button className="btn" onClick={handleClick}>
            {showAllProjects
              ? content[language].showLess
              : content[language].showAll}
          </button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
