import React, { useContext } from "react";
import { MapContext } from "../../context/MapContext";
import "./Title.scss";

export const Title = ({ className }) => {
  const { mapTitle } = useContext(MapContext);
  return (
    <div className={`${className} title`}>
      <h1>{mapTitle}</h1>
    </div>
  );
};

export default Title;
