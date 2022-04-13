import { useState, useRef, useEffect } from "react";

const layerClassTranslator = {
  obstacle: {
    fullName: "Obstacle",
    gradientKey: "gradient--obstacle",
    icon: `${process.env.PUBLIC_URL}/icons/obstacle.svg`,
  },
  tactile: {
    fullName: "Tactile Flooring",
    gradientKey: "gradient--tactile",
    icon: `${process.env.PUBLIC_URL}/icons/tactile.svg`,
  },
  entry: {
    fullName: "Accesible Entry",
    gradientKey: "gradient--entry",
    icon: `${process.env.PUBLIC_URL}/icons/entry.svg`,
  },
  stairs: {
    fullName: "Stairs",
    gradientKey: "gradient--stairs",
    icon: `${process.env.PUBLIC_URL}/icons/stairs.svg`,
  },
  lift: {
    fullName: "Lift",
    gradientKey: "gradient--lift",
    icon: `${process.env.PUBLIC_URL}/icons/lift.svg`,
  },
  "support-center": {
    fullName: "Support Center",
    gradientKey: "gradient--support-center",
    icon: `${process.env.PUBLIC_URL}/icons/support-center.svg`,
  },
  toilet: {
    fullName: "Toilet",
    gradientKey: "gradient--toilet",
    icon: `${process.env.PUBLIC_URL}/icons/toilet.svg`,
  },
  "accessible-toilet": {
    fullName: "Accessible Toilet",
    gradientKey: "gradient--accessible-toilet",
    icon: `${process.env.PUBLIC_URL}/icons/accessible-toilet.svg`,
  },
  unlisted: {
    fullName: "Unlisted",
    gradientKey: "gradient--unlisted",
    icon: `${process.env.PUBLIC_URL}/icons/unlisted.svg`,
  },
  inactive: {
    fullName: "Point of Interest",
    gradientKey: "gradient--inactive",
    icon: `${process.env.PUBLIC_URL}/icons/poi.svg`,
  },
  passage: {
    fullName: "Passage",
    gradientKey: "gradient--passage",
    icon: `${process.env.PUBLIC_URL}/icons/passage.svg`,
  },
};

const useLayerUtilities = () => {
  const getTranslation = (key) => {
    return layerClassTranslator[key];
  };

  const getClassKeys = () => {
    return Object.keys(layerClassTranslator);
  };

  const getLayerClassIterator = (callback) => {
    Object.entries(layerClassTranslator).forEach(([key, value]) => {
      callback(key, value);
    });
  };

  return {
    getTranslation,
    getClassKeys,
    getLayerClassIterator,
  };
};

export default useLayerUtilities;
