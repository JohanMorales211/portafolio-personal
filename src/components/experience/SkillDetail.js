import React from "react";
import SkillIcon from "./SkillIcon";

const SkillDetail = ({
  skill,
  language,
  showFrontendExperience,
  showBackEndExperience,
  showFrameworksExperience,
  showOthersExperience,
}) => {
  const experienceData = {
    en: {
      frontEnd: {
        HTML: "+5 years",
        CSS: "+5 years",
        JavaScript: "+5 years",
        Java: "+5 years",
        Kotlin: "+1 years",
        Python: "+5 years",
      },
      backEnd: {
        Docker: "+3 year",
        Liquibase: "+2 year",
        PostgreSQL: "+5 years",
        MySql: "+4 years",
        Swagger: "+1 year",
        GitLab: "+5 years",
        "Git/GitHub": "+5 years",
        Java: "+4 year",
        Kotlin: "+1 year",
        Python: "+5 years",
      },
      frameworks: {
        Angular: "+3 years",
        "Spring Boot": "+5 years",
        Bootstrap: "+5 years",
        Tailwind: "+1 year",
        React: "+1 year",
        Thymeleaf: "+1 year",
      },
      others: {
        SCRUM: "+6 months",
        Query: "+2 years",
        Microservices: "+3 years",
        "Node.js": "+1 year",
        API: "+2 years",
        Pylint: "+1 year",
        Black: "+1 year",
      },
    },
    es: {
      frontEnd: {
        HTML: "+5 años",
        CSS: "+5 años",
        JavaScript: "+3 años",
        Java: "+5 años",
        Kotlin: "+1 años",
        Python: "+5 años",
      },
      backEnd: {
        Docker: "+3 año",
        Liquibase: "+2 año",
        PostgreSQL: "+5 años",
        MySql: "+2 años",
        Swagger: "+1 año",
        GitLab: "+5 años",
        "Git/GitHub": "+5 años",
        Java: "+4 años",
        Kotlin: "+1 años",
        Python: "+5 años",
      },
      frameworks: {
        Angular: "+3 años",
        "Spring Boot": "+3 años",
        Bootstrap: "+5 años",
        Tailwind: "+1 año",
        React: "+1 año",
        Thymeleaf: "+1 año",
      },
      others: {
        SCRUM: "+6 meses",
        Query: "+2 años",
        Microservices: "+3 años",
        "Node.js": "+1 año",
        API: "+2 años",
        Pylint: "+1 año",
        Black: "+1 año",
      },
    },
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <SkillIcon iconCode={skill.icon} />
      <span className="text-sm">{skill.name}</span>
      {showFrontendExperience &&
        experienceData[language].frontEnd[skill.name] && (
          <span className="text-xs text-gray-400 animate-fade-in">
            {experienceData[language].frontEnd[skill.name]}
          </span>
        )}
      {showBackEndExperience &&
        experienceData[language].backEnd[skill.name] && (
          <span className="text-xs text-gray-400 animate-fade-in">
            {experienceData[language].backEnd[skill.name]}
          </span>
        )}
      {showFrameworksExperience &&
        experienceData[language].frameworks[skill.name] && (
          <span className="text-xs text-gray-400 animate-fade-in">
            {experienceData[language].frameworks[skill.name]}
          </span>
        )}

      {showOthersExperience && experienceData[language].others[skill.name] && (
        <span className="text-xs text-gray-400 animate-fade-in">
          {experienceData[language].others[skill.name]}
        </span>
      )}
    </div>
  );
};

export default SkillDetail;
