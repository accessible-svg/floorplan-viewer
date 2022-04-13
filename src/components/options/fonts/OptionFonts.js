import React, { useContext } from "react";
import { LayerContext } from "../../../context/LayerContext";
import "./OptionFonts.scss";

const OptionFonts = () => {
  const {
    layerFontFamilies,
    selectedFontFamily,
    setSelectedFontFamily,
    layerFontWeights,
    selectedFontWeight,
    setSelectedFontWeight,
  } = useContext(LayerContext);

  const onFontFamilyChange = (e) => {
    setSelectedFontFamily(e.target.value);
  };

  const onFontWeightChange = (e) => {
    setSelectedFontWeight(e.target.value);
  };

  return (
    <div class="option-fonts">
      <label className="input-group">
        <span className="u-margin-right-auto">Font Family</span>
        <select name="font" onChange={onFontFamilyChange}>
          {layerFontFamilies.map((font) => (
            <option
              value={font}
              selected={font === selectedFontFamily}
              key={`fonts-${font}`}
            >
              {font}
            </option>
          ))}
        </select>
      </label>
      <label className="input-group">
        <span className="u-margin-right-auto">Font Weight</span>
        <select name="font" onChange={onFontWeightChange}>
          {layerFontWeights.map((weight) => (
            <option
              value={weight}
              selected={weight === selectedFontWeight}
              key={`weight-${weight}`}
            >
              {weight}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default OptionFonts;
