import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import HeaderSocials from "./HeaderSocials";
import { useSprings, animated, easings } from "@react-spring/web";

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
  const content = {
    en: {
      logoName: "jmorales",
      name: "Johan Morales",
      title: "SOFTWARE ENGINEER, FULL STACK DEVELOPER.",
      asFeaturedIn: "AS FEATURED IN",
      scrollDown: "Scroll Down",
    },
    es: {
      logoName: "jmorales",
      name: "Johan Morales",
      title: "INGENIERO DE SOFTWARE, DESARROLLADOR FULL STACK.",
      asFeaturedIn: "PRESENTADO EN",
      scrollDown: "Desplázate hacia abajo",
    },
  };
  
  useEffect(() => {
    if (!language) {
      onLanguageChange("en");
    }
  }, [language, onLanguageChange]);

  return (
    <header id="home">
      <div className="header__app_logo">
        {content[language].logoName}<span className="header__app_logo_accent">.</span><span className="header__app_logo_cursor">_</span>
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
              text={content[language].name}
              delay={30} 
              animationFrom={{ opacity: 0, transform: "translate3d(0,60px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            />
          </h1>
        </div>
        <p className="header__subtitle animate-on-load">
          {content[language].title}
        </p>
        <div className="header__socials_container animate-on-load">
          <HeaderSocials />
        </div>
        <a href="#about" className="scroll__down_indicator" aria-label={content[language].scrollDown}>
        </a>
      </div>
      <div className="header__abstract_bg"></div>
    </header>
  );
};
export default Header;