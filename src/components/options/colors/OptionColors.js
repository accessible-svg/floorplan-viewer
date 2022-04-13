import React, { useContext, useRef, useEffect } from "react";
import { LayerContext } from "../../../context/LayerContext";
import { Button, makeStyles } from "@material-ui/core";

// Change Per Second Limiter (cps)
// Limits the number of color changes that can be made per second. Prevents
// overloading the React Update Queue with too many color change requests
const _cpsLimiter = 45;
// Calculates the length of the change window to facilitate the cps, in milliseconds
const cpsLimiterMs = (1 / _cpsLimiter) * 1000;

const useStyles = makeStyles((theme) => ({
  header: { fontFamily: theme.fontFamily },
}));

const OptionColors = () => {
  const classes = useStyles();
  const { colorPalette, setColorPallete, resetColorPalette } =
    useContext(LayerContext);
  const colorChangeTimeout = useRef(null);

  const onChange = (e, i) => {
    if (!colorChangeTimeout.current) {
      colorChangeTimeout.current = setTimeout(() => {
        colorChangeTimeout.current = null;
      }, cpsLimiterMs);

      setColorPallete((foo) => {
        return foo.map((bar, j) => {
          if (i == j) {
            return e.target.value;
          } else {
            return bar;
          }
        });
      });
    }
  };

  useEffect(() => {
    return () => {
      if (colorChangeTimeout.current) {
        clearTimeout(colorChangeTimeout.current);
        colorChangeTimeout.current = null;
      }
    };
  }, []);

  return (
    <div>
      {colorPalette && (
        <>
          {colorPalette.map((color, i) => (
            <label className="input-group" key={`color-options-${i}`}>
              <span className={`u-margin-right-auto ${classes}`}>
                Color #{i}
              </span>
              <input
                type="color"
                value={color}
                onChange={(e) => {
                  onChange(e, i);
                }}
              ></input>
            </label>
          ))}
          <Button variant="contained" onClick={resetColorPalette}>
            Reset Colors
          </Button>
        </>
      )}
    </div>
  );
};

export default OptionColors;
