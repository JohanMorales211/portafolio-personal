import React, { useState, useEffect } from 'react';
import { FiMapPin, FiLink, FiPlus, FiMinus, FiBriefcase } from 'react-icons/fi';
import './professionalExperience.css';
const getMonthsFromString = (monthName, year) => {
  const monthMap = {
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11,
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  };
  const normalizedMonthName = monthName.toLowerCase().trim().substring(0, 3);
  for (const key in monthMap) {
    if (key.startsWith(normalizedMonthName)) {
      return new Date(year, monthMap[key]);
    }
  }
  console.warn("Mes no reconocido en getMonthsFromString:", monthName, "Año:", year);
  return new Date(year, 0);
};
const calculateTotalExperience = (experienceItems, language) => {
  let totalMonthsDuration = 0;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const intervals = [];
  experienceItems.forEach(item => {
    const parts = item.dates.split(' - ');
    if (parts.length !== 2) {
      console.warn("Formato de fecha no válido para cálculo:", item.dates);
      return;
    }
    const [startDateStr, endDateStr] = parts;
    const startDetails = startDateStr.split(' ');
    if (startDetails.length !== 2) {
      console.warn("Formato de fecha de inicio no válido para cálculo:", startDateStr);
      return;
    }
    const [startMonthName, startYearStr] = startDetails;
    const startYear = parseInt(startYearStr);
    if (isNaN(startYear)) {
      console.warn("Año de inicio no válido para cálculo:", startYearStr);
      return;
    }
    let startDate = getMonthsFromString(startMonthName, startYear);
    let endDate;
    if (endDateStr.toLowerCase().includes('present') || endDateStr.toLowerCase().includes('actualidad')) {
      endDate = today;
    } else {
      const endDetails = endDateStr.split(' ');
      if (endDetails.length !== 2) {
        console.warn("Formato de fecha de fin no válido para cálculo:", endDateStr);
        return;
      }
      const [endMonthName, endYearStr] = endDetails;
      const endYear = parseInt(endYearStr);
      if (isNaN(endYear)) {
        console.warn("Año de fin no válido para cálculo:", endYearStr);
        return;
      }
      endDate = getMonthsFromString(endMonthName, endYear);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(1);
      endDate.setDate(endDate.getDate() -1);
    }
    if (startDate <= today && endDate >= startDate) {
      intervals.push({ start: startDate, end: endDate > today ? today : endDate });
    }
  });
  if (intervals.length === 0) {
    return language === 'es' ? 'Calculando experiencia...' : 'Calculating experience...';
  }
  intervals.sort((a, b) => a.start - b.start);
  const mergedIntervals = [];
  if (intervals.length > 0) {
    mergedIntervals.push({ ...intervals[0] });
    for (let i = 1; i < intervals.length; i++) {
      const current = intervals[i];
      const lastMerged = mergedIntervals[mergedIntervals.length - 1];
      if (current.start <= lastMerged.end) {
        lastMerged.end = new Date(Math.max(lastMerged.end, current.end));
      } else {
        mergedIntervals.push({ ...current });
      }
    }
  }
  mergedIntervals.forEach(interval => {
    let months = (interval.end.getFullYear() - interval.start.getFullYear()) * 12;
    months -= interval.start.getMonth();
    months += interval.end.getMonth();
    totalMonthsDuration += (months + 1);
  });
  if (totalMonthsDuration <= 0 && experienceItems.length > 0) {
    return language === 'es' ? 'Próximamente' : 'Upcoming';
  }
  if (totalMonthsDuration <= 0) {
    return language === 'es' ? 'Sin experiencia laboral registrada' : 'No work experience recorded';
  }
  const years = Math.floor(totalMonthsDuration / 12);
  const months = totalMonthsDuration % 12;
  let experienceString = "";
  if (language === 'es') {
    if (years > 0) {
      experienceString += `${years} año${years !== 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (years > 0) experienceString += " y ";
      experienceString += `${months} mes${months !== 1 ? 'es' : ''}`;
    }
    return experienceString ? `${experienceString} de experiencia` : 'Menos de un mes de experiencia';
  } else {
    if (years > 0) {
      experienceString += `${years} year${years !== 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (years > 0) experienceString += " and ";
      experienceString += `${months} month${months !== 1 ? 's' : ''}`;
    }
    return experienceString ? `${experienceString} of experience` : 'Less than a month of experience';
  }
};
const experienceData = {
  en: [
    {
      id: 1,
      jobTitle: 'Development Engineer',
      company: 'Celuweb',
      companyLink: null,
      location: 'Armenia, Quindío',
      dates: 'October 2022 - April 2023',
      descriptionPoints: [
        'Participated in the maintenance and supervision of servers on AWS and Azure, using Docker and Kubernetes for container orchestration.',
        'Worked on a large-scale web scraping service to extract and process e-commerce data.',
        'Implemented scalable and fault-tolerant storage solutions using NoSQL and distributed databases.',
        'Architected and developed RESTful APIs for integration with internal and client systems, optimizing performance.',
      ],
      technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Web Scraping', 'NoSQL', 'REST APIs', 'Java'],
    },
    {
      id: 2,
      jobTitle: 'Predictive Data Analyst',
      company: 'Tecnodiesel S.A.S',
      companyLink: null,
      location: 'Pereira, Risaralda',
      dates: 'March 2022 - October 2022',
      descriptionPoints: [
        'Developed predictive models with machine learning to optimize spare parts inventory management, preventive machinery maintenance, and energy demand.',
        'Integrated machinery telemetry data, ERP/CRM systems, and market sources for a comprehensive operational performance analysis.',
        'Provided data-driven recommendations to optimize equipment turnover, pricing strategies, and supply chain management.',
      ],
      technologies: ['Machine Learning', 'Python', 'Data Analysis', 'ERP/CRM Integration'],
    },
    {
      id: 3,
      jobTitle: 'Full-Stack Developer',
      company: 'Safe Society',
      companyLink: null,
      location: 'Armenia, Quindío',
      dates: 'March 2021 - February 2022',
      descriptionPoints: [
        'Participated in all phases of complex web application development, including testing and deployment.',
        'Led the management of relational database migrations with Liquibase, ensuring data integrity.',
        'Developed key backend components with Java and Spring, implementing business logic and optimizing performance.',
      ],
      technologies: ['Java', 'Spring Boot', 'Liquibase', 'SQL', 'Full-Stack Development'],
    },
  ],
  es: [
    {
      id: 1,
      jobTitle: 'Ingeniero de Desarrollo',
      company: 'Celuweb',
      companyLink: null,
      location: 'Armenia, Quindío',
      dates: 'Octubre 2022 - Abril 2023',
      descriptionPoints: [
        'Participé en el mantenimiento y supervisión de los servidores en AWS y Azure, utilizando Docker y Kubernetes para la orquestación de contenedores.',
        'Trabajé en un servicio de web scraping a gran escala para extraer y procesar datos de e-commerce.',
        'Implementé soluciones de almacenamiento escalables y tolerantes a fallos usando bases de datos NoSQL y distribuidas.',
        'Arquitecté y desarrollé APIs RESTful para la integración con sistemas internos y de clientes, optimizando rendimiento.',
      ],
      technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Web Scraping', 'NoSQL', 'APIs RESTful', 'Java'],
    },
    {
      id: 2,
      jobTitle: 'Analista de Datos Predictivo',
      company: 'Tecnodiesel S.A.S',
      companyLink: null,
      location: 'Pereira, Risaralda',
      dates: 'Marzo 2022 - Octubre 2022',
      descriptionPoints: [
        'Desarrollé modelos predictivos con machine learning para optimizar la gestión de inventario de repuestos, el mantenimiento preventivo de maquinaria y la demanda energética.',
        'Integré datos de telemetría de maquinaria, sistemas ERP/CRM y fuentes de mercado para un análisis completo del rendimiento operativo.',
        'Proporcioné recomendaciones basadas en datos para optimizar la rotación de equipos, estrategias de precios y gestión de la cadena de suministro.',
      ],
      technologies: ['Machine Learning', 'Python', 'Análisis de Datos', 'Integración ERP/CRM'],
    },
    {
      id: 3,
      jobTitle: 'Desarrollador Full-Stack',
      company: 'Safe Society',
      companyLink: null,
      location: 'Armenia, Quindío',
      dates: 'Marzo 2021 - Febrero 2022',
      descriptionPoints: [
        'Participé en todas las fases del desarrollo de una aplicación web compleja, incluyendo pruebas y despliegue.',
        'Lideré la gestión de migraciones de bases de datos relacionales con Liquibase, asegurando la integridad de los datos.',
        'Desarrollé componentes clave del backend con Java y Spring, implementando lógica de negocio y optimizando rendimiento.',
      ],
      technologies: ['Java', 'Spring Boot', 'Liquibase', 'SQL', 'Desarrollo Full-Stack'],
    },
  ],
};
const AccordionItem = ({ item, isOpen, onClick, language }) => {
  let displayDates = item.dates;
  if (item.dates.toLowerCase().includes("present") || item.dates.toLowerCase().includes("actualidad")) {
      displayDates = language === 'es' ? 'Actualidad' : 'Present';
  }
  return (
    <div className="experience-item">
      <button
        className={`experience-item-header ${isOpen ? 'open' : ''}`}
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`content-${item.id}`}
      >
        <div className="job-title-company">
          <FiBriefcase className="header-icon" />
          {item.jobTitle} @ {item.company}
        </div>
        <div className="dates">{displayDates}</div>
        {isOpen ? <FiMinus className="toggle-icon" /> : <FiPlus className="toggle-icon" />}
      </button>
      {isOpen && (
        <div id={`content-${item.id}`} className="experience-item-content">
          <div className="content-details">
            <div className="location-website">
              {item.location && (
                <span className="detail-item">
                  <FiMapPin /> {item.location}
                </span>
              )}
              {item.companyLink && (
                <a href={item.companyLink} target="_blank" rel="noopener noreferrer" className="detail-item company-link">
                  <FiLink /> {item.company} Website
                </a>
              )}
            </div>
            <ul className="description-list">
              {item.descriptionPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            {item.technologies && item.technologies.length > 0 && (
              <div className="technologies-used">
                {item.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
          {item.logo && (
            <div className="company-logo-container">
              <img src={item.logo} alt={`${item.company} logo`} className="company-logo" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const ProfessionalExperience = ({ language }) => {
  const [openItemId, setOpenItemId] = useState(
    experienceData[language] && experienceData[language].length > 0 ? experienceData[language][0].id : null
  );
  const [totalExperience, setTotalExperience] = useState('');
  useEffect(() => {
    const currentExperienceItems = experienceData[language];
    if (currentExperienceItems && currentExperienceItems.length > 0) {
      const expStr = calculateTotalExperience(currentExperienceItems, language);
      setTotalExperience(expStr);
    } else {
      setTotalExperience(language === 'es' ? 'Sin experiencia laboral registrada' : 'No work experience recorded');
    }
  }, [language]);
  const handleToggle = (id) => {
    setOpenItemId(openItemId === id ? null : id);
  };
  const currentDisplayData = experienceData[language] || [];
  const sectionContent = {
    en: {
      title: "Professional Experience",
      subtitle: "My Career Journey So Far",
    },
    es: {
      title: "Experiencia Profesional",
      subtitle: "Mi Trayectoria Profesional Hasta Ahora",
    }
  };
  return (
    <section id="professional-experience" className="professional-experience-section">
      <div className="container">
        <div className="section-header">
          <h5 className="section-subtitle">{sectionContent[language].subtitle}</h5>
          <div className="section-title-container">
            <h2 className="section-title">
              {sectionContent[language].title}
              <span className="title-dot">.</span>
            </h2>
            {totalExperience && (
              <p className="total-experience-text">{totalExperience}</p>
            )}
          </div>
        </div>
        <div className="experience-accordion">
          {currentDisplayData.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openItemId === item.id}
              onClick={() => handleToggle(item.id)}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProfessionalExperience;