import React, { useContext } from "react";
import Switch from "../../aria-components/Switch";
import { MapContext } from "../../../context/MapContext";
import "./OptionPattern.scss";

const OptionPattern = () => {
  const { patterns, setPatterns } = useContext(MapContext);
  return (
    <div className="options-pattern">
      <label className="input-group">
        <span className="u-margin-right-auto">Turn On Patterns</span>
        <Switch
          onChange={() => {
            setPatterns((foo) => !foo);
          }}
          isSelected={patterns}
        />
      </label>
    </div>
  );
};

export default OptionPattern;
