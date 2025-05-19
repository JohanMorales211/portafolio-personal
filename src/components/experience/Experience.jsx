import React, { useState, useEffect } from "react";
import { VscFolderLibrary } from "react-icons/vsc";
import "./experience.css";
import { skillsData } from "./skillsData";
import SkillDetail from "./SkillDetail";

const Experience = ({ language }) => {
  useEffect(() => {
    const cards = document.querySelectorAll(".experience__container > div");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const [showCertificates, setShowCertificates] = useState(false);
  const [showFrontendExperience, setShowFrontendExperience] = useState(false);
  const [showBackEndExperience, setShowBackEndExperience] = useState(false);
  const [showFrameworksExperience, setShowFrameworksExperience] =
    useState(false);
  const [showOthersExperience, setShowOthersExperience] = useState(false);

  const toggleCertificates = () => {
    setShowCertificates(!showCertificates);
  };

  const toggleFrontedExperience = () => {
    setShowFrontendExperience(!showFrontendExperience);
  };

  const toggleBackEndExperience = () => {
    setShowBackEndExperience(!showBackEndExperience);
  };

  const toggleFrameworksExperience = () => {
    setShowFrameworksExperience(!showFrameworksExperience);
  };

  const toggleOthersExperience = () => {
    setShowOthersExperience(!showOthersExperience);
  };

  return (
    <section id="experience">
      <h5>{skillsData[language].skillsIHave}</h5>
      <h2>{skillsData[language].skills}</h2>
      <div className="container experience__container">
        {/* Front-end Development */}
        <div className="experience__frontend experience__card">
          <h3 className="experience__card-title">
            {skillsData[language].frontEnd}
          </h3>
          <div className="experience__content grid grid-cols-3 gap-4 p-6">
            {skillsData[language].frontEndSkills.map((skill) => (
              <SkillDetail
                key={skill.name}
                skill={skill}
                language={language}
                showFrontendExperience={showFrontendExperience}
              />
            ))}
          </div>
          <span
            onClick={toggleFrontedExperience}
            className="experience__toggle-text cursor-pointer text-blue-500"
            aria-label="Toggle experience time"
          >
            {showFrontendExperience
              ? "Ocultar experiencia"
              : "Mostrar experiencia"}
          </span>
        </div>

        {/* Back-end Development */}
        <div className="experience__backend experience__card">
          <h3 className="experience__card-title">
            {skillsData[language].backEnd}
          </h3>
          <div className="experience__content grid grid-cols-3 gap-4 p-6">
            {skillsData[language].backEndSkills.map((skill) => (
              <SkillDetail
                key={skill.name}
                skill={skill}
                language={language}
                showBackEndExperience={showBackEndExperience}
              />
            ))}
          </div>
          <span
            onClick={toggleBackEndExperience}
            className="experience__toggle-text cursor-pointer text-blue-500"
            aria-label="Toggle experience time"
          >
            {showBackEndExperience
              ? "Ocultar experiencia"
              : "Mostrar experiencia"}
          </span>
        </div>

        {/* Frameworks */}
        <div className="experience__frameworks experience__card">
          <h3 className="experience__card-title">
            {skillsData[language].frameworks}
          </h3>
          <div className="experience__content grid grid-cols-3 gap-4 p-6">
            {skillsData[language].frameworksSkills.map((skill) => (
              <SkillDetail
                key={skill.name}
                skill={skill}
                language={language}
                showFrameworksExperience={showFrameworksExperience}
              />
            ))}
          </div>
          <span
            onClick={toggleFrameworksExperience}
            className="experience__toggle-text cursor-pointer text-blue-500"
            aria-label="Toggle experience time"
          >
            {showFrameworksExperience
              ? "Ocultar experiencia"
              : "Mostrar experiencia"}
          </span>
        </div>

        {/* Others */}
        <div className="experience__others experience__card">
          <h3 className="experience__card-title">
            {skillsData[language].others}
          </h3>
          <div className="experience__content grid grid-cols-3 gap-4 p-6">
            {skillsData[language].otherSkills.map((skill) => (
              <SkillDetail
                key={skill.name}
                skill={skill}
                language={language}
                showOthersExperience={showOthersExperience}
              />
            ))}
          </div>
          <span
            onClick={toggleOthersExperience}
            className="experience__toggle-text cursor-pointer text-blue-500" // Agrega estilos para que parezca un enlace
            aria-label="Toggle experience time"
          >
            {showOthersExperience
              ? "Ocultar experiencia"
              : "Mostrar experiencia"}
          </span>
        </div>
      </div>

      <div className="experience__certificates-button">
        <button
          onClick={toggleCertificates}
          className="btn btn-secondary neon-button"
        >
          {showCertificates
            ? skillsData[language].hideCertificates
            : skillsData[language].showCertificates}
        </button>
      </div>

      {/* Ejemplo de certificado (Software Engineer) */}
      {showCertificates && (
        <div className="experience__certificates">
          <article className="experience__card">
            <VscFolderLibrary className="experience__icon" />
            <h5>{skillsData[language].softwareEngineerCertificate}</h5>
            <small>
              <a
                href="https://www.hackerrank.com/certificates/c1ce3120f28a"
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillsData[language].viewCertificate}
              </a>
            </small>
          </article>

          <article className="experience__card">
            <VscFolderLibrary className="experience__icon" />
            <h5>{skillsData[language].frontendReactCertificate}</h5>
            <small>
              <a
                href="https://www.hackerrank.com/certificates/59900afd316e"
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillsData[language].viewCertificate}
              </a>
            </small>
          </article>

          <article className="experience__card">
            <VscFolderLibrary className="experience__icon" />
            <h5>{skillsData[language].angularCertificate}</h5>
            <small>
              <a
                href="https://www.hackerrank.com/certificates/f1287cbae472"
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillsData[language].viewCertificate}
              </a>
            </small>
          </article>

          <article className="experience__card">
            <VscFolderLibrary className="experience__icon" />
            <h5>{skillsData[language].sqlCertificate}</h5>
            <small>
              <a
                href="https://www.hackerrank.com/certificates/07877ed75494"
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillsData[language].viewCertificate}
              </a>
            </small>
          </article>

          <article className="experience__card">
            <VscFolderLibrary className="experience__icon" />
            <h5>{skillsData[language].restAPICertificate}</h5>
            <small>
              <a
                href="https://www.hackerrank.com/certificates/6f9c7aa851a9"
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillsData[language].viewCertificate}
              </a>
            </small>
          </article>

          <article className="experience__card">
            <VscFolderLibrary className="experience__icon" />
            <h5>{skillsData[language].javascriptCertificate}</h5>
            <small>
              <a
                href="https://www.hackerrank.com/certificates/bcd1918a93d0"
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillsData[language].viewCertificate}
              </a>
            </small>
          </article>

          <article className="experience__card">
            <VscFolderLibrary className="experience__icon" />
            <h5>{skillsData[language].scrumCertificate}</h5>
            <small>
              <a
                href="https://www.scrumstudy.com/certification/verify?type=SFC&number=978278"
                target="_blank"
                rel="noopener noreferrer"
              >
                {skillsData[language].viewCertificate}
              </a>
            </small>
          </article>
        </div>
      )}
    </section>
  );
};

export default Experience;
