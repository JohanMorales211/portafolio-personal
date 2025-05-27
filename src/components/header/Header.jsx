import React, { useEffect, useState, useRef, useMemo } from "react";
import "./header.css";
import HeaderSocials from "./HeaderSocials";
import { useSprings, animated, easings } from "@react-spring/web";

// El componente SplitText permanece igual
const SplitText = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = easings.easeOutCubic,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
}) => {
  const words = text.split(" ").map((word) => word.split(""));
  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold, rootMargin }
    );
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [text, threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView ? animationTo : animationFrom,
      delay: i * delay,
      config: { easing, tension: 280, friction: 60 },
    }))
  );

  let letterIndex = 0;
  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: '0.3em' }}
        >
          {word.map((letter, charIdx) => {
            const currentSpring = springs[letterIndex++];
            return (
              <animated.span
                key={`${wordIdx}-${charIdx}`}
                style={{
                  ...currentSpring,
                  display: "inline-block",
                  willChange: "transform, opacity",
                }}
              >
                {letter}
              </animated.span>
            );
          })}
        </span>
      ))}
    </p>
  );
};


const Header = ({ language, onLanguageChange }) => {
  // rolesData se define fuera del componente o al inicio del cuerpo del componente.
  // Es constante y no cambia entre renders.
  const rolesData = {
    en: ["Backend", "Frontend", "Full Stack"],
    es: ["Backend", "Frontend", "Full Stack"],
  };

  // 'content' se memoriza y depende de 'language' y de 'rolesData' (indirectamente, a través de las referencias)
  // Para ser más explícitos y satisfacer a ESLint, podemos incluir rolesData directamente
  // o las partes específicas de rolesData que se usan.
  const content = useMemo(() => {
    const currentRoles = rolesData[language] || rolesData.en; // Obtener roles basados en el idioma
    return {
      en: {
        logoName: "jmorales",
        name: "Johan Morales",
        titlePart1: "SOFTWARE ENGINEER, ",
        titlePart2Dynamic: rolesData.en, // Siempre usar la referencia original para estabilidad
        titlePart3: " DEVELOPER.",
        asFeaturedIn: "AS FEATURED IN",
        scrollDown: "Scroll Down",
      },
      es: {
        logoName: "jmorales",
        name: "Johan Morales",
        titlePart1: "INGENIERO DE SOFTWARE, DESARROLLADOR ",
        titlePart2Dynamic: rolesData.es, // Siempre usar la referencia original para estabilidad
        titlePart3: ".",
        asFeaturedIn: "PRESENTADO EN",
        scrollDown: "Desplázate hacia abajo",
      },
      // Añadimos una propiedad para los roles dinámicos actuales basados en el idioma.
      // Esto simplifica el acceso en el useEffect y para `roleToDisplay`.
      currentDynamicRoles: currentRoles,
    };
  }, [language, rolesData]); // Dependencias: language y el objeto rolesData completo.
                                 // Si rolesData nunca cambia, `language` es la principal causa de recálculo.
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (!language) {
      onLanguageChange("en");
    }
    setCurrentRoleIndex(0);
    setIsAnimatingOut(false);
  }, [language, onLanguageChange]);

  useEffect(() => {
    // Ahora 'content.currentDynamicRoles' es la fuente de los roles para la animación
    const currentDynamicRoles = content.currentDynamicRoles;
    
    const animationDuration = 500;
    const displayDuration = 2500;

    const interval = setInterval(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % currentDynamicRoles.length);
        setIsAnimatingOut(false);
      }, animationDuration);
    }, displayDuration + animationDuration);

    return () => clearInterval(interval);
  // 'content' es la dependencia principal aquí. Como está memorizado y solo cambia
  // cuando 'language' (o 'rolesData') cambia, este efecto se ejecutará correctamente.
  }, [content]); 

  // El rol actual a mostrar, basado en el índice y los roles dinámicos actuales del content memorizado.
  const roleToDisplay = content.currentDynamicRoles[currentRoleIndex];
  
  // Contenido para la UI, específico del idioma actual.
  const currentDisplayContent = content[language] || content.en;


  return (
    <header id="home">
      <div className="header__app_logo">
        {currentDisplayContent.logoName}<span className="header__app_logo_accent">.</span><span className="header__app_logo_cursor">_</span>
      </div>
      <div className="header__top_actions">
        <div className="language-buttons">
          <button
            onClick={() => onLanguageChange("en")}
            className={`btn ${language === "en" ? "active" : ""} btn-english`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange("es")}
            className={`btn ${language === "es" ? "active" : ""} btn-spanish`}
          >
            Español
          </button>
        </div>
      </div>
      <div className="container header__container">
        <div className="header__main_name">
          <h1>
            <SplitText
              text={currentDisplayContent.name}
              delay={30}
              animationFrom={{ opacity: 0, transform: "translate3d(0,60px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            />
          </h1>
        </div>
        
        <div className="header__subtitle_container animate-on-load">
          <span className="header__subtitle_static_part1">
            {currentDisplayContent.titlePart1}
          </span>
          <span 
            className={`header__subtitle_dynamic_role ${isAnimatingOut ? 'animating-out' : 'animating-in'}`}
            key={language + '-' + roleToDisplay} 
          >
            {roleToDisplay} {/* Se muestra el rol dinámico calculado */}
          </span>
          <span className="header__subtitle_static_part3">
            {currentDisplayContent.titlePart3}
          </span>
        </div>
        
        <div className="header__socials_container animate-on-load">
          <HeaderSocials />
        </div>
        <a href="#about" className="scroll__down_indicator" aria-label={currentDisplayContent.scrollDown}>
        </a>
      </div>
    </header>
  );
};
export default Header;