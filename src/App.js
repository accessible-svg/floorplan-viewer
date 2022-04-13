import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import MapProvider from "./context/MapContext";
import QuestionnaireProvider from "./context/QuestionnaireContext";
import LayerProvider from "./context/LayerContext";

import Dashboard from "./Dashboard";

function App() {
  return (
    <MapProvider>
      <QuestionnaireProvider>
        <LayerProvider>
          <Dashboard />
        </LayerProvider>
      </QuestionnaireProvider>
    </MapProvider>
  );
}

export default App;
