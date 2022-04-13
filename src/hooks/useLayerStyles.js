import { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core";

const layerFontFamilies = ["Arial", "Atkinson Hyperlegible", "OpenDyslexic"];
const layerFontWeights = ["bold", "normal"];

const useLayerStyles = () => {
  const [selectedFontFamily, setSelectedFontFamily] = useState(
    layerFontFamilies[0]
  );
  const [selectedFontWeight, setSelectedFontWeight] = useState(
    layerFontWeights[0]
  );

  return {
    selectedFontFamily,
    setSelectedFontFamily,
    layerFontFamilies,
    selectedFontWeight,
    setSelectedFontWeight,
    layerFontWeights,
  };
};

export default useLayerStyles;
