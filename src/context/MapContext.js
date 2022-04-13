import { createContext, useState, useRef } from "react";

//create a context, with createContext api
export const MapContext = createContext();

const MapProvider = (props) => {
  // this state will be shared with all components
  const [mapPanZoom, setMapPanZoom] = useState();
  const [svgPath, setSvgPath] = useState(
    `${process.env.PUBLIC_URL}/svg/retail_center.svg`
  );
  // TODO Move some state variables to LayerContext
  const rootFocus = useRef(null);
  const [patterns, setPatterns] = useState(false);

  const [mapTitle, setMapTitle] = useState("No map selected!");

  const focusRoot = () => {
    if (rootFocus.current) {
      rootFocus.current.focus();
    }
  };

  return (
    <MapContext.Provider
      value={{
        mapPanZoom,
        setMapPanZoom,
        rootFocus,
        focusRoot,
        svgPath,
        setSvgPath,
        patterns,
        setPatterns,
        mapTitle,
        setMapTitle,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export default MapProvider;
