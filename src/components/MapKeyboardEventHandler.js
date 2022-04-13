import React from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";

const MapKeyboardEventHandler = ({ mapPanZoom }) => (
  /**
   * Could potentially implement key combinations to move diagnolally
   */
  <>
    <KeyboardEventHandler
      handleFocusableElements={true}
      //className={classes.map}
      handleKeys={["shift+="]}
      onKeyEvent={() => mapPanZoom.zoomIn()}
    />
    <KeyboardEventHandler
      handleFocusableElements={true}
      //className={classes.map}
      handleKeys={["shift+-"]}
      onKeyEvent={() => mapPanZoom.zoomOut()}
    />
    <KeyboardEventHandler
      handleFocusableElements={true}
      //className={classes.map}
      handleKeys={["r"]}
      onKeyEvent={() => {
        mapPanZoom.fit();
        mapPanZoom.center();
      }}
    />
    <KeyboardEventHandler
      handleFocusableElements={true}
      //className={classes.map}
      handleKeys={["shift+right"]}
      onKeyEvent={() => mapPanZoom.panBy({ x: -20, y: 0 })}
    />
    <KeyboardEventHandler
      handleFocusableElements={true}
      //className={classes.map}
      handleKeys={["shift+left"]}
      onKeyEvent={() => mapPanZoom.panBy({ x: 20, y: 0 })}
    />
    <KeyboardEventHandler
      handleFocusableElements={true}
      //className={classes.map}
      handleKeys={["shift+up"]}
      onKeyEvent={() => mapPanZoom.panBy({ x: 0, y: 20 })}
    />
    <KeyboardEventHandler
      handleFocusableElements={true}
      //className={classes.map}
      handleKeys={["shift+down"]}
      onKeyEvent={() => mapPanZoom.panBy({ x: 0, y: -20 })}
    />
  </>
);

export default MapKeyboardEventHandler;
