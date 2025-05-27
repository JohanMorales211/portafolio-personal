import React, { useEffect, useState, useRef, useMemo } from "react";
import "./header.css";
import HeaderSocials from "./HeaderSocials";
import { useSprings, animated, easings } from "@react-spring/web";
import snapSoundSrc from '../../assets/sounds/snap.mp3';

import elevatorSoundSrc from '../../assets/sounds/elevator.mp3';


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
  const content = useMemo(() => {
    const rolesData = {
      en: ["Backend", "Frontend", "Full Stack"],
      es: ["Backend", "Frontend", "Full Stack"],
    };
    
    const currentRoles = rolesData[language] || rolesData.en;
    return {
      en: {
        logoName: "jmorales",
        name: "Johan Morales",
        titlePart1: "SOFTWARE ENGINEER, ",
        titlePart2Dynamic: rolesData.en,
        titlePart3: " DEVELOPER.",
        asFeaturedIn: "AS FEATURED IN",
        scrollDown: "Scroll Down",
      },
      es: {
        logoName: "jmorales",
        name: "Johan Morales",
        titlePart1: "INGENIERO DE SOFTWARE, DESARROLLADOR ",
        titlePart2Dynamic: rolesData.es,
        titlePart3: ".",
        asFeaturedIn: "PRESENTADO EN",
        scrollDown: "Desplázate hacia abajo",
      },
      currentDynamicRoles: currentRoles,
    };
  }, [language]);
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const playSnapSound = () => {
    const audio = new Audio(snapSoundSrc);
    audio.volume = 0.7; 
    audio.play().catch(error => {
      console.error("Error al reproducir el sonido:", error);
    });
  };

  const playElevatorSound = () => {
    const audio = new Audio(elevatorSoundSrc);
    audio.volume = 0.5;
    audio.play().catch(error => {
      console.error("Error al reproducir el sonido del elevador:", error);
    });
  };

  useEffect(() => {
    if (!language) {
      onLanguageChange("en"); 
    }
    setCurrentRoleIndex(0);
    setIsAnimatingOut(false);
  }, [language, onLanguageChange]);

  useEffect(() => {
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
  }, [content]); 

  const roleToDisplay = content.currentDynamicRoles[currentRoleIndex];
  
  const currentDisplayContent = content[language] || content.en;

  const handleLanguageButtonClick = (lang) => {
    if (language !== lang) { 
        playSnapSound();
    }
    onLanguageChange(lang);
  };

  return (
    <header id="home">
      <div className="header__app_logo">
        {currentDisplayContent.logoName}<span className="header__app_logo_accent">.</span><span className="header__app_logo_cursor">_</span>
      </div>
      <div className="header__top_actions">
        <div className="language-buttons">
          <button
            onClick={() => handleLanguageButtonClick("en")}
            className={`btn ${language === "en" ? "active" : ""} btn-english`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageButtonClick("es")}
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
            {roleToDisplay}
          </span>
          <span className="header__subtitle_static_part3">
            {currentDisplayContent.titlePart3}
          </span>
        </div>
        
        <div className="header__socials_container animate-on-load">
          <HeaderSocials />
        </div>
        <a 
          href="#about" 
          className="scroll__down_indicator" 
          aria-label={currentDisplayContent.scrollDown}
          onClick={playElevatorSound} 
        >
        </a>
      </div>
    </header>
  );
};

export default Header;