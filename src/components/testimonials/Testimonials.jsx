import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./testimonials.css";
const Testimonials = ({ language }) => {
  const testimonials = [
        {
      id: 5,
      link: "https://www.linkedin.com/in/ricardo-andres-parra-caballero-9835a1274/",
      name: "Ricardo Andres Parra",
      role: {
        en: "Development Engineer | Project Leader",
        es: "Ingeniero de Desarrollo | Líder de Proyecto",
      },
      test: {
        en: "Johan has demonstrated exceptional expertise in the field of web scraping. His technical prowess and innovative solutions to complex data extraction challenges have been invaluable to our team. He consistently delivers reliable, efficient systems that exceed expectations, truly establishing himself as an expert in this domain.",
        es: "Johan ha demostrado una experiencia excepcional en el campo del web scraping. Su destreza técnica y soluciones innovadoras para los desafíos de extracción de datos complejos han sido invaluables para nuestro equipo. Siempre entrega sistemas confiables y eficientes que superan las expectativas, estableciéndose verdaderamente como un experto en este campo.",
      },
    },
    {
      id: 6,
      link: "https://www.linkedin.com/in/solenka-saire/",
      name: "Solenka Saire",
      role: {
        en: "Development Engineer",
        es: "Ingeniero de Desarrollo",
      },
      test: {
        en: "As Johan's teammate in the web scraping team, I can attest to his exceptional technical mastery. His ability to design robust scraping architectures and solve complex data extraction challenges has been fundamental to our success. Johan combines deep technical expertise with remarkable teamwork skills, making him a true pillar in any project. His solutions are not only efficient but also innovative, setting new standards in our workflows.",
        es: "Como compañera de Johan en el equipo de web scraping, puedo dar fe de su dominio técnico excepcional. Su capacidad para diseñar arquitecturas de scraping robustas y resolver desafíos complejos de extracción de datos ha sido fundamental para nuestro éxito. Johan combina un profundo conocimiento técnico con habilidades destacadas de trabajo en equipo, convirtiéndose en un pilar imprescindible para cualquier proyecto. Sus soluciones no solo son eficientes sino también innovadoras, estableciendo nuevos estándares en nuestros flujos de trabajo.",
      },
    },
    {
      id: 1,
      link: "https://www.linkedin.com/in/z4nd3rx/",
      name: "Andrés Ocampo",
      role: {
        en: "Full-Stack Developer",
        es: "Desarrollador Full-Stack",
      },
      test: {
        en: "Working with Johan has been an excellent experience. His ability to tackle complex problems and his dedication to continuous learning set him apart. He consistently delivers high-quality work and collaborates effectively with the team. His positive attitude and commitment to improvement make him a valuable asset to any project.",
        es: "Trabajar con Johan ha sido una experiencia excelente. Su capacidad para abordar problemas complejos y su dedicación al aprendizaje continuo lo distinguen. Siempre entrega un trabajo de alta calidad y colabora eficazmente con el equipo. Su actitud positiva y su compromiso con la mejora lo convierten en un activo valioso para cualquier proyecto.",
      },
    },
    {
      id: 2,
      link: "https://www.linkedin.com/in/javier-rodriguez-marulanda-8b2725230/",
      name: "Javier Rodríguez",
      role: {
        en: "Technical Lead",
        es: "Líder Técnico",
      },
      test: {
        en: "Johan's skills in both frontend and backend development are impressive. He approaches challenges with a problem-solving mindset and is always willing to help others. His deep understanding of the development lifecycle and proactive approach to learning make him an exceptional team member.",
        es: "Las habilidades de Johan tanto en el desarrollo frontend como backend son impresionantes. Aborda los desafíos con una mentalidad de resolución de problemas y siempre está dispuesto a ayudar a los demás. Su profundo conocimiento del ciclo de vida del desarrollo y su enfoque proactivo hacia el aprendizaje lo convierten en un miembro excepcional del equipo.",
      },
    },
    {
      id: 3,
      link: "https://www.linkedin.com/in/elsantiagobernal/",
      name: "Santiago Bernal",
      role: {
        en: "Software Engineer",
        es: "Ingeniero de Software",
      },
      test: {
        en: "Johan is a talented developer with a keen eye for detail. His contributions to our projects were invaluable, and his ability to work collaboratively with diverse teams is commendable. He is proactive, communicates effectively, and consistently produces high-quality results.",
        es: "Johan es un desarrollador talentoso con un gran ojo para los detalles. Sus contribuciones a nuestros proyectos fueron invaluables, y su capacidad para trabajar en colaboración con equipos diversos es encomiable. Es proactivo, se comunica eficazmente y produce resultados de alta calidad de forma consistente.",
      },
    },
    {
      id: 4,
      link: "https://www.linkedin.com/in/luisa-fernanda-celis-gonz%C3%A1lez-75900427a/",
      name: "Luisa Fernanda",
      role: {
        en: "Full-Stack Web Developer",
        es: "Desarrolladora Web Full-Stack",
      },
      test: {
        en: "I had the pleasure of working with Johan on several projects. His dedication to his craft and enthusiasm for learning are truly inspiring. He is a reliable and skilled developer who adds significant value to any team. His problem-solving skills and team spirit make him stand out.",
        es: "Tuve el placer de trabajar con Johan en varios proyectos. Su dedicación a su oficio y su entusiasmo por el aprendizaje son realmente inspiradores. Es un desarrollador confiable y hábil que agrega un valor significativo a cualquier equipo. Sus habilidades para resolver problemas y su espíritu de equipo lo hacen destacar.",
      },
    },
  ];
  const content = {
    en: {
      sectionSubtitle: "What My Peers Say",
      sectionTitle: "Testimonials",
    },
    es: {
      sectionSubtitle: "Lo Que Dicen Mis Compañeros",
      sectionTitle: "Testimonios",
    },
  };
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container section-header testimonials-header-override">
        <h5 className="section-subtitle">
          {content[language].sectionSubtitle}
        </h5>
        <h2 className="section-title">
          {content[language].sectionTitle}
          <span className="title-dot testimonials-title-dot">.</span>
        </h2>
      </div>
      <div className="container testimonials__container_wrapper">
        <Swiper
          className="testimonials__swiper-container"
          modules={[Pagination, Navigation]}
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true, el: '.swiper-custom-pagination' }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          grabCursor={true}
          loop={true}
        >
          {testimonials.map((test) => (
            <SwiperSlide className="testimonial" key={test.id}>
              <div className="client__avatar">
                <a href={test.link} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${test.name}`}>
                  <BsLinkedin />
                </a>
              </div>
              <h5 className="client__name">{test.name}</h5>
              <small className="client__role">{test.role[language]}</small>
              <blockquote className="client__review">{test.test[language]}</blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-navigation-buttons">
          <div className="swiper-button-prev-custom">
            <FiChevronLeft />
          </div>
          <div className="swiper-button-next-custom">
            <FiChevronRight />
          </div>
        </div>
        <div className="swiper-custom-pagination"></div>
      </div>
    </section>
  );
};
export default Testimonials;