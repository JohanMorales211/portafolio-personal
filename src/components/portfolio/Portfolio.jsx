import React, { useState } from "react";

import IMG_CHEFSITO from "../../assets/logo_chefsito.jpg";
import IMG_NU_CALCULATOR from "../../assets/imagen_nu.jpg";
import IMG_REAL_TIME_TWEET from "../../assets/tweets_x.jpg";
import IMG_FILE_EXPLORER from "../../assets/file_explorer.jpg";
import IMG_SPOTIFY_TIME_FREE from "../../assets/spotify_time_free.jpg";
import IMG_FILMIX from "../../assets/filmix.jpg";
import IMG_LINGUAI from "../../assets/logo_languAI.jpg";
import IMG_JOMAPS from "../../assets/foto_jomaps.jpeg";

import "./portfolio.css";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const IMG_KLIPER = `${process.env.PUBLIC_URL}/kliper.png`;
const IMG_GANEX = `${process.env.PUBLIC_URL}/ganex.jpeg`;

const PROJECTS = [
  {
    id: 11,
    title: { en: "Kliper", es: "Kliper" },
    img: IMG_KLIPER,
    badge: { en: "Founder · 800+ users", es: "Fundador · +800 usuarios" },
    description: {
      en: "Management platform for barbershops and beauty studios that I founded and lead. It centralizes the day-to-day operation of the business — appointments, clients, services and staff — and currently serves a community of more than 800 users.",
      es: "Plataforma de administración para barberías y sitios de estética que fundé y lidero. Centraliza la operación diaria del negocio — citas, clientes, servicios y personal — y actualmente cuenta con una comunidad de más de 800 usuarios."
    },
    technologies: {
      en: "SaaS | Business management | Bookings | 800+ users",
      es: "SaaS | Gestión de negocio | Reservas | +800 usuarios"
    },
  },
  {
    id: 10,
    title: { en: "Ganex", es: "Ganex" },
    img: IMG_GANEX,
    description: {
      en: "Livestock administration system: full CRUD for herd and animal records, user role and permission management, and centralized control of the ranch operation from a single panel.",
      es: "Sistema para la administración de ganadería: CRUD completo para el registro del hato y los animales, manejo de roles y permisos de usuario, y control centralizado de la operación desde un solo panel."
    },
    technologies: {
      en: "CRUD | Roles & permissions | Livestock management",
      es: "CRUD | Roles y permisos | Gestión ganadera"
    },
  },
  {
    id: 9,
    title: { en: "Jomaps", es: "Jomaps" },
    img: IMG_JOMAPS,
    description: {
      en: "An advanced mapping platform designed for visualization and route planning. It uses a powerful API to perform complex route calculations, considering not only latitude and longitude, but also terrain altitude for more accurate and efficient routing.",
      es: "Una plataforma de mapeo avanzada, diseñada para la visualización y la planificación de rutas. Utiliza una potente API para realizar cálculos de ruta complejos, considerando no solo la latitud y longitud, sino también la altitud del terreno para un trazado de rutas más preciso y eficiente."
    },
    technologies: {
      en: "React | JSX | Responsive Design | CSS Variables",
      es: "React | JSX | Diseño Responsivo | Variables CSS"
    },
    demoLink: "https://johanmorales211.github.io/jomaps/",
  },
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
    technologies: {
      en: "React | TypeScript | YouTube API | Tailwind CSS",
      es: "React | TypeScript | API de YouTube | Tailwind CSS"
    },
    demoLink: "https://4ky9lr.csb.app/",
  },
  {
    id: 3,
    title: { en: "File Explorer", es: "Explorador de Archivos" },
    img: IMG_FILE_EXPLORER,
    description: {
      en: "Visual folder structure explorer with file content analysis and interactive visualization capabilities.",
      es: "Explorador visual de estructuras de carpetas con análisis de contenido de archivos y capacidades de visualización interactiva.",
    },
    technologies: {
      en: "TypeScript | JavaScript | HTML | CSS",
      es: "TypeScript | JavaScript | HTML | CSS"
    },
    demoLink: "https://johanmorales211.github.io/folder-explorer/"
  },
  {
    id: 5,
    title: { en: "NU Compound Interest Calculator", es: "Calculadora de Interés Compuesto NU" },
    img: IMG_NU_CALCULATOR,
    description: {
      en: "Specialized financial calculator for NU Colombia products with compound interest calculations.",
      es: "Calculadora financiera especializada para productos NU Colombia con cálculos de interés compuesto.",
    },
    technologies: {
      en: "React | TypeScript | Tailwind",
      es: "React | TypeScript | Tailwind"
    },
    demoLink: "https://n4trp3.csb.app/",
  },
  {
    id: 2,
    title: { en: "Real-Time Tweet Analysis with AI", es: "Análisis de Tweets en Tiempo Real con IA" },
    img: IMG_REAL_TIME_TWEET,
    description: {
      en: "Advanced web scraping system combined with AI models for real-time Twitter/X analysis. Features sentiment analysis, word clouds, and AI-generated summaries using Cerebras technology.",
      es: "Sistema avanzado de scraping web combinado con modelos de IA para análisis en tiempo real de Twitter/X. Incluye análisis de sentimientos, nubes de palabras y resúmenes generados por IA usando tecnología Cerebras.",
    },
    technologies: {
      en: "Flask | Selenium | Cerebras SDK | NLP",
      es: "Flask | Selenium | Cerebras SDK | NLP"
    },
    githubLink: "https://github.com/JohanMorales211/ia-web-scraping",
  },
];

const Portfolio = ({ language }) => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);

  const sectionContent = {
    en: {
      kicker: "Portfolio",
      sectionTitle: "Featured Projects",
      sectionDesc: "A selection of personal projects — from AI-powered tools to full web applications.",
      showAll: "Show More",
      showLess: "Show Less",
      githubRepo: "GitHub",
      demo: "Live Demo",
    },
    es: {
      kicker: "Portafolio",
      sectionTitle: "Proyectos Destacados",
      sectionDesc: "Una selección de proyectos personales — desde herramientas con IA hasta aplicaciones web completas.",
      showAll: "Mostrar Más",
      showLess: "Mostrar Menos",
      githubRepo: "GitHub",
      demo: "Demo en Vivo",
    },
  };

  const t = sectionContent[language] || sectionContent.en;

  const projectsToDisplayCount = 4;
  const projectsToShow = showAllProjects
    ? PROJECTS
    : PROJECTS.slice(0, projectsToDisplayCount);

  const handleClickShowMore = () => {
    setShowAllProjects(!showAllProjects);
    setUpdateKey((prevKey) => prevKey + 1);
  };

  return (
    <section id="proyectos" className="projects">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-kicker">{t.kicker}</span>
          <h2>{t.sectionTitle}</h2>
          <span className="gold-divider" />
          <p className="section-desc">{t.sectionDesc}</p>
        </div>

        <div className="projects__grid" key={updateKey}>
          {projectsToShow.map((pro, index) => (
            <article
              className="project-card dark-card reveal"
              key={pro.id}
              style={{ "--reveal-delay": `${(index % 2) * 100}ms` }}
            >
              <div className="project-card__image-wrapper">
                <img
                  src={pro.img}
                  alt={pro.title[language]}
                  className="project-card__image"
                  loading="lazy"
                />
                {pro.badge && (
                  <span className="project-card__badge">
                    {pro.badge[language] || pro.badge.en}
                  </span>
                )}
              </div>
              <div className="project-card__body">
                <h3 className="project-card__title">{pro.title[language]}</h3>
                <p className="project-card__description">{pro.description[language]}</p>
                <div className="project-card__tags">
                  {pro.technologies[language].split(" | ").map((tech) => (
                    <span key={tech} className="gold-pill">{tech}</span>
                  ))}
                </div>
                <div className="project-card__cta">
                  {pro.githubLink && (
                    <a
                      href={pro.githubLink}
                      className="btn btn-outline"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.githubRepo} - ${pro.title[language]}`}
                    >
                      <FiGithub /> {t.githubRepo}
                    </a>
                  )}
                  {pro.demoLink && (
                    <a
                      href={pro.demoLink}
                      className="btn btn-gold"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.demo} - ${pro.title[language]}`}
                    >
                      <FiExternalLink /> {t.demo}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {PROJECTS.length > projectsToDisplayCount && (
          <div className="projects__more reveal">
            <button className="btn btn-outline" onClick={handleClickShowMore}>
              {showAllProjects ? t.showLess : t.showAll}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
