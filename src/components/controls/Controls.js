import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MapContext } from "../../context/MapContext";
import FileUploader from "../FileUploader";
import "./Controls.scss";
import Button from "../aria-components/Button";
import {
  ArrowUpward,
  Add,
  Remove,
  ArrowBack,
  ArrowDownward,
  ArrowForward,
  RotateLeft,
} from "@material-ui/icons";

const Controls = ({ className }) => {
  const { mapPanZoom, rootFocus } = useContext(MapContext);
  console.log(rootFocus);

  return (
    <div className={`${className} controls`}>
      <h1 tabIndex="0" ref={rootFocus}>
        Controls
      </h1>
      {mapPanZoom && (
        <div className="controls-buttons">
          <Button
            // Root Focus Defines What Element We Automatically Tab To When ESC is pressed
            onPress={() => mapPanZoom.panBy({ x: 20, y: 0 })}
            aria-label="Pan Map Left"
          >
            <ArrowBack />
          </Button>
          <Button
            onPress={() => mapPanZoom.panBy({ x: 0, y: 20 })}
            aria-label="Pan Map Up"
          >
            <ArrowUpward />
          </Button>
          <Button
            onPress={() => mapPanZoom.panBy({ x: 0, y: -20 })}
            aria-label="Pan Map Down"
          >
            <ArrowDownward />
          </Button>
          <Button
            onPress={() => mapPanZoom.panBy({ x: -20, y: 0 })}
            aria-label="Pan Map Right"
          >
            <ArrowForward />
          </Button>
          <Button
            onPress={() => mapPanZoom.zoomIn()}
            aria-label="Zoom In on Map"
          >
            <Add />
          </Button>
          <Button
            onPress={() => mapPanZoom.zoomOut()}
            aria-label="Zoom Out on Map"
          >
            <Remove />
          </Button>
          <Button
            onPress={() => {
              mapPanZoom.fit();
              mapPanZoom.center();
            }}
            aria-label="Restore Map Zoom"
          >
            <RotateLeft />
          </Button>
        </div>
      )}
      <h1 class="u-margin-left-auto u-margin-right-md">Change Floor Plan</h1>
      <FileUploader className={"controls-file-uploader"} />
    </div>
  );
};

export default Controls;
