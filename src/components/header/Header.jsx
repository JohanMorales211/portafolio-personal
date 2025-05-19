import React, { useEffect, useState, useRef } from "react";
import HeaderSocials from "./HeaderSocials";
import "./header.css";
import { useSprings, animated } from "@react-spring/web";
import { easings } from "@react-spring/web";

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
  onLetterAnimationComplete,
}) => {
  const words = text.split(" ").map((word) => word.split(""));

  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (next) => {
            await next(animationTo);
            animatedCount.current += 1;
            if (
              animatedCount.current === letters.length &&
              onLetterAnimationComplete
            ) {
              onLetterAnimationComplete();
            }
          }
        : animationFrom,
      delay: i * delay,
      config: { easing },
    }))
  );

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
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.map((letter, letterIndex) => {
            const index =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
              letterIndex;

            return (
              <animated.span
                key={index}
                style={{
                  ...springs[index],
                  display: "inline-block",
                  willChange: "transform, opacity",
                }}
              >
                {letter}
              </animated.span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.3em" }}> </span>
          )}
        </span>
      ))}
    </p>
  );
};

const Header = ({ language, onLanguageChange }) => {
  const content = {
    en: {
      greeting: "Hello I'm",
      name: "Johan Morales",
      title: "Full Stack Developer",
      scrollDown: "Scroll Down",
    },
    es: {
      greeting: "Hola, soy",
      name: "Johan Morales",
      title: "Desarrollador Full Stack",
      scrollDown: "Desplazarse hacia abajo",
    },
  };

  useEffect(() => {
    if (!language) {
      onLanguageChange("en");
    }
  }, [language, onLanguageChange]);

  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <header id="home">
      <div className="container header__container">
        <div className="language-buttons">
          <button
            onClick={() => onLanguageChange("en")}
            className={`btn ${language === "en" ? "active" : ""}`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange("es")}
            className={`btn ${language === "es" ? "active" : ""}`}
          >
            Español
          </button>
        </div>
        <h5>{content[language].greeting}</h5>
        <h1>
          <SplitText
            text={content[language].name}
            delay={50}
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </h1>
        <h5 className={`text-light ${animationComplete ? "show" : "hide"}`}>
          {content[language].title}
        </h5>
        <a href="#contact" className="scroll__down">
          {content[language].scrollDown}
        </a>
        <HeaderSocials language={language} />
      </div>
    </header>
  );
};

export default Header;
