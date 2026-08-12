import React, { useState, useEffect, useRef, useMemo } from "react";
import "./header.css";
import { FiMapPin } from "react-icons/fi";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
const MyPhoto = `${process.env.PUBLIC_URL}/foto_mia.jpeg`;

const TYPED_WORDS = {
  en: ["Full Stack", "Backend", "Frontend", "Remote"],
  es: ["Full Stack", "Backend", "Frontend", "Remoto"],
};

const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const HOLD_TIME = 1800;

const Header = ({ language }) => {
  const [typedText, setTypedText] = useState("");
  const contentRef = useRef(null);

  const content = useMemo(
    () => ({
      en: {
        available: "AVAILABLE",
        greeting: "Hi, I'm",
        firstName: "Johan",
        lastName: "Morales",
        location: "Colombia · Remote",
        pitch:
          "I build software solutions for national and international businesses. Available for remote projects with companies and clients.",
        photoAlt: "Photo of Johan Morales",
      },
      es: {
        available: "DISPONIBLE",
        greeting: "Hola, soy",
        firstName: "Johan",
        lastName: "Morales",
        location: "Colombia · Remoto",
        pitch:
          "Desarrollo soluciones de software para negocios nacionales e internacionales. Disponible para proyectos remotos con empresas y clientes.",
        photoAlt: "Foto de Johan Morales",
      },
    }),
    []
  );

  const t = content[language] || content.en;
  const words = TYPED_WORDS[language] || TYPED_WORDS.en;

  // ==== Animación de escritura (typing) ====
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const word = words[wordIndex % words.length];

      if (!deleting) {
        charIndex++;
        setTypedText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timeoutId = setTimeout(tick, HOLD_TIME);
          return;
        }
        timeoutId = setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex--;
        setTypedText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex++;
          timeoutId = setTimeout(tick, 350);
          return;
        }
        timeoutId = setTimeout(tick, DELETE_SPEED);
      }
    };

    setTypedText("");
    timeoutId = setTimeout(tick, 400);
    return () => clearTimeout(timeoutId);
  }, [language, words]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let rafId = 0;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const limit = window.innerHeight * 0.9;
        const progress = Math.min(y / limit, 1);
        el.style.transform = `translateY(${y * 0.25}px)`;
        el.style.opacity = `${1 - progress * 1.1}`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header id="inicio" className="hero">
      <div className="container hero__container" ref={contentRef}>
        <div className="hero__photo-column">
          <div className="hero__photo-card">
            <img
              src={MyPhoto}
              alt={t.photoAlt}
              className="hero__photo"
              fetchpriority="high"
            />
          </div>
          <span className="hero__available-badge">
            <span className="hero__available-dot" />
            {t.available}
          </span>
        </div>

        <div className="hero__text-column">
          <h1 className="hero__title">
            {t.greeting}
            <br />
            {t.firstName} <span className="hero__title-gold">{t.lastName}</span>
          </h1>

          <p className="hero__typed" aria-live="polite">
            <span className="hero__typed-text">{typedText}</span>
            <span className="hero__typed-cursor" aria-hidden="true" />
          </p>

          <p className="hero__location">
            <FiMapPin /> {t.location}
          </p>

          <p className="hero__pitch">{t.pitch}</p>

          <div className="hero__actions">
            <a
              href="https://github.com/JohanMorales211"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-btn"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/johan-morales-b3809b206/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-btn"
              aria-label="LinkedIn"
            >
              <BsLinkedin />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
