import React, { useContext } from "react";
import "./Dashboard.scss";

import Map from "./components/map/Map";
import Controls from "./components/controls/Controls";
import RoomInformation from "./components/room-information/RoomInformation";
import Options from "./components/options/Options";
import Shortcuts from "./components/shortcuts/Shortcuts";
import Title from "./components/title/Title";
import { LayerContext } from "./context/LayerContext";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const Dashboard = () => {
  const { selectedFontFamily } = useContext(LayerContext);
  const THEME = createTheme({
    typography: {
      fontFamily: selectedFontFamily,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  return (
    <MuiThemeProvider theme={THEME}>
      <div className="dashboard" style={{ fontFamily: selectedFontFamily }}>
        <Title className="dashboard-title"></Title>
        <Map className="dashboard-map"></Map>
        <Controls className="dashboard-controls"></Controls>
        <RoomInformation className="dashboard-description"></RoomInformation>
        <Shortcuts className="dashboard-shortcuts"></Shortcuts>
        <Options className="dashboard-options"></Options>
      </div>
    </MuiThemeProvider>
  );
};

export default Dashboard;
