import React, {
  useRef,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import "./Map.scss";

import { MapContext } from "../../context/MapContext";
import { QuestionnaireContext } from "../../context/QuestionnaireContext";
import { LayerContext } from "../../context/LayerContext";
import SVG from "react-inlinesvg";
import MapKeyboardEventHandler from "../MapKeyboardEventHandler";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { makeStyles } from "@material-ui/core";
const svgPanZoom = require("svg-pan-zoom");

const Map = ({ className }) => {
  // useRef References
  const svgEl = useRef(null);
  const rootGroupEl = useRef(null);
  const {
    mapPanZoom,
    setMapPanZoom,
    focusRoot,
    svgPath,
    patterns,
    setMapTitle,
  } = useContext(MapContext);
  const { questBitField } = useContext(QuestionnaireContext);
  const {
    setLayerInfo,
    layerColors,
    pullLayerStylesFromSVG,
    pushLayerStylesToSVG,
    selectedFontWeight,
  } = useContext(LayerContext);

  useEffect(() => {
    iterateLayers((layer) => {
      updateLayer(questBitField, layer);
    });
  }, [questBitField]);

  useEffect(() => {
    updatePatterns();
  }, [patterns]);

  useEffect(() => {
    if (svgEl.current && layerColors) {
      pushLayerStylesToSVG(svgEl.current, layerColors);
    }
  }, [layerColors]);

  // CSS
  const useStyles = makeStyles((theme) => {
    return {
      font: {
        "& [data-layer-type='txt']": {
          fontFamily: theme.typography.fontFamily,
          fontWeight: selectedFontWeight,
        },
      },
    };
  });

  const layerStyleSheet = useStyles();

  // Layer Iterator
  // Includes a guard clause to prevent iterating through layers if they are not set
  const iterateLayers = (callback) => {
    if (!svgEl.current) {
      return;
    }
    svgEl.current
      .querySelectorAll("[data-layer-type='layer']")
      .forEach((layer) => {
        callback(layer);
      });
  };

  // Update Patterns
  const updatePatterns = () => {
    if (rootGroupEl.current) {
      rootGroupEl.current.dataset.layerPattern = patterns ? "1" : "0";
    }
  };

  // According to W3C draft, the focus event is fired AFTER the previous element has fired the blur event
  // ****** Focus + Blur Fuctions (START) ******
  const onLayerFocus = (e) => {
    const layer = e.target;
    const { layerBitField } = layer.dataset;
    const roomLabelledBy = layer.getAttribute("aria-labelledby");
    const roomDescribedBy = layer.getAttribute("aria-describedby");
    const roomTitle = svgEl.current.getElementById(roomLabelledBy);
    const roomDesc = svgEl.current.getElementById(roomDescribedBy);

    setLayerInfo({
      label: roomTitle ? roomTitle.textContent : null,
      description: roomDesc ? roomDesc.textContent : null,
      class: layer.classList.length === 1 ? layer.classList[0] : null,
    });
  };

  const onLayerBlur = (e) => {
    setLayerInfo({
      label: null,
      description: null,
      class: null,
    });
  };
  // ****** Focus + Blur Fuctions (END) ******
  // Placeholder
  const onError = (e) => {};

  // Placeholder
  const onLoad = (e) => {
    setMapTitle(
      svgEl.current.getElementById("svg--title")
        ? svgEl.current.getElementById("svg--title").textContent
        : "Untitled"
    );
    // Initialize SVG Pan Zoom
    // Set a reference to the root group so that we can interact with it to affect global properties
    rootGroupEl.current = svgEl.current.querySelector(
      "[data-layer-type='root']"
    );
    const foo = svgPanZoom(svgEl.current, {
      zoomEnabled: true,
      dblClickZoomEnabled: false,
      preventMouseEventsDefault: false,
      // controlIconsEnabled: false,
    });
    foo.zoomAtPoint(1, { x: 447, y: 183 });
    setMapPanZoom(foo);

    // Pull SVG Color Information
    pullLayerStylesFromSVG(svgEl.current);
    // pushLayerStyles(svgEl.current);
    // Set Layer Event Listeners
    iterateLayers((layer) => {
      layer.addEventListener("focus", onLayerFocus);
      layer.addEventListener("blur", onLayerBlur);
      updateLayer(questBitField, layer);
    });

    // Update Global
    updatePatterns();
  };

  // Tabbing Order
  // Activated Layers -> Neutral Layers -> Inactive Layers
  const updateLayer = (questBitField, layer) => {
    let { layerBitField, layerState } = layer.dataset;
    layerBitField = parseInt(layerBitField);
    layerState = parseInt(layerState);

    // Handling .passage edge case
    if (layer.classList.contains("passage")) {
      layer.tabIndex = "-1";
      layer.dataset.layerState = "1";
      return;
    }

    if (layerState > -1) {
      // We can dynamically set the tab index to prioritise the tabbing of activated layers
      // A tabbIndex of 1 will be higher on the tabbing priority compared to a tabIndex of 2
      let isActive = false;
      if (layerBitField) {
        isActive = (questBitField & layerBitField) > 0;
      }

      layer.tabIndex = isActive ? "1" : "2";
      layer.dataset.layerState = isActive ? "1" : "0";
    } else {
      // A tabbIndex of 3 will be lower on the tabbing priority compared to a tabIndex of 2
      layer.tabIndex = "-1";
      layer.dataset.layerState = "-1";
    }
  };

  return (
    <div className={`${className} map`}>
      <MapKeyboardEventHandler mapPanZoom={mapPanZoom} />
      <KeyboardEventHandler handleKeys={["esc"]} onKeyEvent={focusRoot}>
        <SVG
          className={`map-svg ${layerStyleSheet.font}`}
          src={svgPath}
          onError={onError}
          onLoad={onLoad}
          innerRef={svgEl}
        />
      </KeyboardEventHandler>
    </div>
  );
};

export default Map;
