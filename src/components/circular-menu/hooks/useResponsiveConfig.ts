import { calculateSegmentGeometry } from "./../utils/geometry";
import { useState, useEffect, useCallback } from "react";
import type { ResponsiveConfig } from "../CircularMenu.types";
import { MENU_SIZE_CONFIG, RADIUS_RATIOS } from "../constants/menu.constants";

export const useResponsiveConfig = (): ResponsiveConfig => {
  const calculateConfig = useCallback((): ResponsiveConfig => {
    if (typeof window === "undefined") {
      const defaultSize = MENU_SIZE_CONFIG.DESKTOP_SIZE;
      return {};
    }
  });
};
