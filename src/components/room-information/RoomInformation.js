import React, { useContext, useState, useMemo, useCallback } from "react";
import "./RoomInformation.scss";
import { makeStyles } from "@material-ui/styles";
import SVG from "react-inlinesvg";
import { LayerContext } from "../../context/LayerContext";
import { DualColorLabel } from "../color/DualColorLabel";
import useLayerUtilities from "../../hooks/useLayerUtilities";

const RoomInformation = ({ className }) => {
  const { layerInfo, layerColors } = useContext(LayerContext);
  const { getTranslation } = useLayerUtilities();
  const [iconColor, setIconColor] = useState("blue");

  const useStyles = makeStyles((theme) => ({
    icon: {
      color: iconColor,
    },
  }));

  const classes = useStyles();

  return (
    <div className={`${className} room-information`}>
      <div className={`room-information-meta-data`}>
        <h3 className={"room-information-header"}>Name </h3>
        <span className={"room-information-text"}>
          {layerInfo.label || "Nothing Selected"}
        </span>
        <h3 className={"room-information-header"}>Description </h3>
        <span className={"room-information-text"}>
          {layerInfo.description || "Nothing Selected"}
        </span>
      </div>
      {layerInfo.class && (
        <div className={`room-information-icon`}>
          <SVG src={getTranslation(layerInfo.class).icon} />
          <DualColorLabel
            left={layerColors[layerInfo.class].primary}
            right={layerColors[layerInfo.class].secondary}
          >
            {getTranslation(layerInfo.class).fullName}
          </DualColorLabel>
        </div>
      )}
    </div>
  );
};

export default RoomInformation;
