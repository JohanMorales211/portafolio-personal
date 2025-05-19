import React from "react";

const SkillIcon = ({ iconCode }) => (
  <svg
    viewBox="0 0 128 128"
    width="24"
    height="24"
    className="experience__details-icon"
    dangerouslySetInnerHTML={{ __html: iconCode }}
  />
);

export default SkillIcon;
