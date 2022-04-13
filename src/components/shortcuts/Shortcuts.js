import React from "react";
import "./Shortcuts.scss";
import Questionnaire from "../Questionnaire";
import KeyboardShortcuts from "../KeyboardShortcuts";

const Shortcuts = ({ className }) => {
  return (
    <div className={`${className} shortcuts`}>
      <Questionnaire />
      <KeyboardShortcuts />
    </div>
  );
};

export default Shortcuts;
