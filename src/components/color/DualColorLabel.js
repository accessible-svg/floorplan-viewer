import React from "react";
import "./DualColorLabel.scss";
import { makeStyles } from "@material-ui/styles";

export const DualColorLabel = ({ children, left, right, className }) => {
  // left => Left Left
  // right => Right Edge
  const edgeWidth = "1rem";
  const useStyles = makeStyles((theme) => ({
    label: {
      borderLeft: `${edgeWidth} solid ${left}`,
      borderRight: `${edgeWidth} solid ${right}`,
    },
  }));

  const classes = useStyles();

  return (
    <span tabIndex="0" class={`${classes.label} dual-color-label ${className}`}>
      {children}
    </span>
  );
};
