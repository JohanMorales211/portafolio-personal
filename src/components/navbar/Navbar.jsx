import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import "./navbar.css";

const NAV_LINKS = [
  { id: "inicio", en: "Home", es: "Inicio" },
  { id: "tecnologias", en: "Tech Stack", es: "Tecnologías" },
  { id: "sobre-mi", en: "About", es: "Sobre mí" },
  { id: "experiencia", en: "Experience", es: "Experiencia" },
  { id: "proyectos", en: "Projects", es: "Proyectos" },
  { id: "contacto", en: "Contact", es: "Contacto" },
];

const Navbar = ({ language, onLanguageChange, theme, onThemeChange }) => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [language]);

  const closeMenu = () => setMenuOpen(false);
  const toggleTheme = () => onThemeChange(theme === "dark" ? "light" : "dark");

  const themeLabel =
    theme === "dark"
      ? language === "es" ? "Cambiar a tema claro" : "Switch to light theme"
      : language === "es" ? "Cambiar a tema oscuro" : "Switch to dark theme";

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <a href="#inicio" className="navbar__logo" onClick={closeMenu}>
          jmorales<span className="navbar__logo-accent">.</span>
        </a>

        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? "active" : ""}
                onClick={closeMenu}
              >
                {link[language] || link.en}
              </a>
            </li>
          ))}
          <li className="navbar__lang navbar__lang--mobile">
            <button
              className={language === "es" ? "active" : ""}
              onClick={() => onLanguageChange("es")}
            >
              ES
            </button>
            <span>/</span>
            <button
              className={language === "en" ? "active" : ""}
              onClick={() => onLanguageChange("en")}
            >
              EN
            </button>
          </li>
        </ul>

        <div className="navbar__actions">
          <button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <div className="navbar__lang">
            <button
              className={language === "es" ? "active" : ""}
              onClick={() => onLanguageChange("es")}
              aria-label="Español"
            >
              ES
            </button>
            <span>/</span>
            <button
              className={language === "en" ? "active" : ""}
              onClick={() => onLanguageChange("en")}
              aria-label="English"
            >
              EN
            </button>
          </div>
          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
