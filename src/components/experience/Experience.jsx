import React, { useCallback, useEffect, useRef, useState } from "react";
import "./experience.css";
import {
  FiZap,
  FiCode,
  FiBarChart2,
  FiLayers,
  FiCalendar,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

const CAREER_START = "2023-03";

const EXPERIENCES = [
  {
    id: "betmarketer",
    icon: FiZap,
    monogram: "BM",
    company: "Betmarketer SAS",
    start: "2026-01",
    end: null,
    location: "Armenia, Quindío, Colombia",
    mode: { es: "Presencial", en: "On-site" },
    role: {
      es: "Ingeniero de Desarrollo y Automatización · Analista de Riesgos",
      en: "Development & Automation Engineer · Risk Analyst",
    },
    description: {
      es: "Responsable del desarrollo de soluciones internas, análisis de riesgos y liderazgo de iniciativas de automatización para optimizar procesos operativos y apoyar la toma de decisiones en la empresa.",
      en: "Responsible for building internal solutions, risk analysis and leading automation initiatives to optimize operational processes and support company decision-making.",
    },
    skills: {
      es: ["Desarrollo de software", "Operaciones de Riesgo", "Automatización"],
      en: ["Software development", "Risk operations", "Automation"],
    },
  },
  {
    id: "kliper",
    icon: FaCrown,
    monogram: "KL",
    company: "Kliper Company",
    start: "2025-05",
    end: null,
    location: "Colombia",
    mode: { es: "En remoto", en: "Remote" },
    highlight: true,
    role: { es: "Fundador & CEO", en: "Founder & CEO" },
    description: {
      es: "La industria de la barbería está llena de talento, pero carecía de las herramientas digitales correctas para competir en el mercado actual. Por eso fundé Kliper, hoy con una comunidad de más de 800 usuarios.",
      en: "The barbershop industry is full of talent, but lacked the right digital tools to compete in today's market. That's why I founded Kliper, today with a community of over 800 users.",
    },
    skills: {
      es: ["Liderazgo", "Visión empresarial", "Producto", "+800 usuarios"],
      en: ["Leadership", "Business vision", "Product", "800+ users"],
    },
  },
  {
    id: "celuweb",
    icon: FiCode,
    monogram: "CW",
    company: "Celuweb",
    start: "2024-10",
    end: "2025-04",
    location: "Armenia, Quindío, Colombia",
    mode: { es: "Híbrido", en: "Hybrid" },
    role: { es: "Ingeniero de Desarrollo", en: "Development Engineer" },
    skills: {
      es: ["Scrum", "Diseño de software"],
      en: ["Scrum", "Software design"],
    },
  },
  {
    id: "tecnodiesel",
    icon: FiBarChart2,
    monogram: "TD",
    company: "Tecnodiesel SAS",
    start: "2024-03",
    end: "2024-10",
    location: "Dosquebradas, Risaralda, Colombia",
    mode: { es: "En remoto", en: "Remote" },
    role: { es: "Analista de Datos Predictivo", en: "Predictive Data Analyst" },
    skills: {
      es: ["Scrum", "Obtención de requisitos"],
      en: ["Scrum", "Requirements gathering"],
    },
  },
  {
    id: "safe-society",
    icon: FiLayers,
    monogram: "SS",
    company: "Safe Society",
    start: "2023-03",
    end: "2024-02",
    location: "Armenia, Quindío, Colombia",
    mode: { es: "Presencial", en: "On-site" },
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    skills: {
      es: ["Diseño de software", "Java"],
      en: ["Software design", "Java"],
    },
  },
];

const parseMonth = (iso) => {
  const [year, month] = iso.split("-").map(Number);
  return { year, month };
};

const monthLabel = (iso, language) => {
  const { year, month } = parseMonth(iso);
  return new Intl.DateTimeFormat(language === "es" ? "es-ES" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
};

/** Meses transcurridos, contando ambos extremos (misma convención que LinkedIn). */
const monthsBetween = (startIso, endIso) => {
  const start = parseMonth(startIso);
  const now = new Date();
  const end = endIso
    ? parseMonth(endIso)
    : { year: now.getFullYear(), month: now.getMonth() + 1 };
  return (end.year - start.year) * 12 + (end.month - start.month) + 1;
};

const formatDuration = (months, language) => {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];

  if (language === "es") {
    if (years) parts.push(`${years} ${years === 1 ? "año" : "años"}`);
    if (rest) parts.push(`${rest} ${rest === 1 ? "mes" : "meses"}`);
  } else {
    if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
    if (rest) parts.push(`${rest} ${rest === 1 ? "mo" : "mos"}`);
  }
  return parts.join(" ");
};

const Experience = ({ language }) => {
  const viewportRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const content = {
    en: {
      kicker: "Career path",
      title: "Work experience",
      description:
        "From my first full stack role to founding my own company — each step added a new layer: code, data, risk and leadership.",
      present: "Present",
      current: "Current",
      today: "Today",
      statYears: "Years of experience",
      statCompanies: "Companies",
      statUsers: "Users on Kliper",
      prev: "Previous",
      next: "Next",
      hint: "Drag or use the arrows to browse the timeline",
    },
    es: {
      kicker: "Trayectoria",
      title: "Experiencia laboral",
      description:
        "Desde mi primer rol full stack hasta fundar mi propia empresa — cada paso sumó una capa nueva: código, datos, riesgo y liderazgo.",
      present: "actualidad",
      current: "Actual",
      today: "Hoy",
      statYears: "Años de experiencia",
      statCompanies: "Empresas",
      statUsers: "Usuarios en Kliper",
      prev: "Anterior",
      next: "Siguiente",
      hint: "Desliza o usa las flechas para recorrer la línea de tiempo",
    },
  };

  const t = content[language] || content.en;
  const totalYears = Math.floor(monthsBetween(CAREER_START, null) / 12);
  const startYear = parseMonth(CAREER_START).year;

  // El riel dorado se llena según el desplazamiento horizontal del carrusel.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let rafId = 0;
    const update = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const max = el.scrollWidth - el.clientWidth;
        const ratio = max > 0 ? el.scrollLeft / max : 1;
        setProgress(ratio);
        setAtStart(el.scrollLeft <= 4);
        setAtEnd(max <= 0 || el.scrollLeft >= max - 4);
      });
    };

    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollByCard = useCallback((direction) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.querySelector(".timeline__item");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  const stats = [
    { value: `${totalYears}+`, label: t.statYears },
    { value: EXPERIENCES.length, label: t.statCompanies },
    { value: "+800", label: t.statUsers },
  ];

  return (
    <section id="experiencia" className="experience">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-kicker">{t.kicker}</span>
          <h2>{t.title}</h2>
          <span className="gold-divider" />
          <p className="section-desc">{t.description}</p>
        </div>

        <div className="experience__stats reveal">
          {stats.map((stat) => (
            <div className="experience__stat" key={stat.label}>
              <span className="experience__stat-value">{stat.value}</span>
              <span className="experience__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="timeline">
        <div className="timeline__viewport" ref={viewportRef}>
          <div className="timeline__track">
            <div className="timeline__rail" aria-hidden="true">
              <span
                className="timeline__rail-fill"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>

            <span className="timeline__cap">{t.today}</span>

            {EXPERIENCES.map((job, index) => {
              const Icon = job.icon;
              const months = monthsBetween(job.start, job.end);
              const period = `${monthLabel(job.start, language)} — ${
                job.end ? monthLabel(job.end, language) : t.present
              }`;

              return (
                <article
                  className={`timeline__item reveal ${
                    job.highlight ? "timeline__item--highlight" : ""
                  }`}
                  key={job.id}
                  style={{ "--reveal-delay": `${index * 70}ms` }}
                >
                  <div className="timeline__card dark-card">
                    <header className="timeline__card-head">
                      <span className="timeline__monogram">{job.monogram}</span>
                      <div className="timeline__identity">
                        <h3 className="timeline__role">
                          {job.role[language] || job.role.en}
                        </h3>
                        <p className="timeline__company">
                          {job.company}
                          {!job.end && (
                            <span className="timeline__current">
                              <span className="timeline__current-dot" />
                              {t.current}
                            </span>
                          )}
                        </p>
                      </div>
                    </header>

                    <div className="timeline__meta">
                      <span>
                        <FiCalendar />
                        {period} · {formatDuration(months, language)}
                      </span>
                      <span>
                        <FiMapPin />
                        {job.location} · {job.mode[language] || job.mode.en}
                      </span>
                    </div>

                    {job.description && (
                      <p className="timeline__description">
                        {job.description[language] || job.description.en}
                      </p>
                    )}

                    <div className="timeline__skills">
                      {(job.skills[language] || job.skills.en).map((skill) => (
                        <span className="gold-pill" key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="timeline__node">
                    <Icon />
                  </span>

                  <span className="timeline__year">
                    {parseMonth(job.start).year}
                  </span>
                </article>
              );
            })}

            <span className="timeline__cap">{startYear}</span>
          </div>
        </div>

        <div className="container timeline__controls">
          <p className="timeline__hint">{t.hint}</p>
          <div className="timeline__arrows">
            <button
              className="timeline__arrow"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label={t.prev}
            >
              <FiChevronLeft />
            </button>
            <button
              className="timeline__arrow"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label={t.next}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
