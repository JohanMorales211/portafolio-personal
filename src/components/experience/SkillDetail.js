import React from "react";
import SkillIcon from "./SkillIcon";
import './experience.css';
const SkillDetail = ({
  skill,
  showExperienceTime,
  experienceYears,
}) => {
  return (
    <div className="skill_detail_item">
      <SkillIcon iconCode={skill.icon} />
      <span className="skill_detail_name">{skill.name}</span>
      {showExperienceTime && experienceYears && (
        <span className="skill_detail_experience_time">
          {experienceYears}
        </span>
      )}
    </div>
  );
};
export default SkillDetail;