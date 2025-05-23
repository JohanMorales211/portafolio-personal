import React, { useEffect } from "react";
import { expertiseData } from "./skillsData";
import "./experience.css";
import { FiServer, FiCpu, FiDatabase } from "react-icons/fi";
import { FaReact } from "react-icons/fa";
import { BsTools, BsClipboardData } from "react-icons/bs";

const expertiseIconComponents = {
  FiServer: FiServer,
  FiCpu: FiCpu,
  FiDatabase: FiDatabase,
  FaReact: FaReact,
  BsTools: BsTools,
  BsClipboardData: BsClipboardData,
};

const Experience = ({ language }) => {
  const currentExpertiseData = expertiseData[language] || expertiseData.en;

  useEffect(() => {
    const elementsToObserve = document.querySelectorAll(".expertise__card"); 
    
    if (elementsToObserve.length === 0) return;

    const observerCallback = (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observerInstance.unobserve(entry.target);
        }
      });
    };
    const observerOptions = {
      threshold: 0.05,
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elementsToObserve.forEach((el) => observer.observe(el));
    
    return () => {
      elementsToObserve.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [currentExpertiseData, language]);

  return (
    <section id="experience">
      <div className="expertise__title_container container">
        <h2 className="expertise__section_title">
          {currentExpertiseData.sectionTitle}
          <span className="expertise__section_title_dot">.</span>
        </h2>
      </div>
      <div className="expertise__container container">
        {currentExpertiseData.cards.map((card, index) => {
          const IconComponent = expertiseIconComponents[card.icon] || FiServer;
          return (
            <article
              className="expertise__card"
              key={card.id || index}
              style={{
                '--accent-color': card.accentColor,
                '--card-index': index
              }}
            >
              {IconComponent && <IconComponent className="expertise__card_icon" />}
              <div className="expertise__card_title_wrapper">
                <h3 className="expertise__card_title">{card.title}</h3>
                {card.subtitle && (
                  <p className="expertise__card_subtitle">{card.subtitle}</p>
                )}
              </div>
              <div className="expertise__card_description">
                <p className="expertise_general_desc">{card.description}</p>
                {card.specificSkills && card.specificSkills.length > 0 && (
                  <ul className="expertise_skills_list">
                    {card.specificSkills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="skill_logo_item" title={skill.name}>
                        <img 
                          src={skill.logo} 
                          alt={`${skill.name} logo`} 
                          className="skill_logo_image"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
export default Experience;