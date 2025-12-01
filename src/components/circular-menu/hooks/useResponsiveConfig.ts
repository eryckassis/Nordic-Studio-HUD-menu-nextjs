import { useState, useEffect, useCallback } from "react";
import type { ResponsiveConfig } from "../CircularMenu.types";
import { MENU_SIZE_CONFIG, RADIUS_RATIOS } from "../constants/menu.constants";

export const useResponsiveConfig = (): ResponsiveConfig => {
  const calculateConfig = useCallback((): ResponsiveConfig => {
    if (typeof window === "undefined") {
      const defaultSize = MENU_SIZE_CONFIG.DESKTOP_SIZE;
      return {
        menuSize: defaultSize,
        center: defaultSize / 2,
        innerRadius: defaultSize * RADIUS_RATIOS.INNER,
        outerRadius: defaultSize * RADIUS_RATIOS.OUTER,
        contentRadius: defaultSize * RADIUS_RATIOS.CONTENT,
      };
    }

    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
    const {
      MOBILE_BREAKPOINT,
      DESKTOP_SIZE,
      MOBILE_MAX_SIZE,
      VIEWPORT_PERCENTAGE,
    } = MENU_SIZE_CONFIG;

    const isMobile = viewportWidth < MOBILE_BREAKPOINT;

    const maxViewportSize = Math.min(
      viewportWidth * VIEWPORT_PERCENTAGE,
      viewportHeight * VIEWPORT_PERCENTAGE
    );

    const menuSize = isMobile
      ? Math.min(maxViewportSize, MOBILE_MAX_SIZE)
      : DESKTOP_SIZE;

    return {
      menuSize,
      center: menuSize / 2,
      innerRadius: menuSize * RADIUS_RATIOS.INNER,
      outerRadius: menuSize * RADIUS_RATIOS.OUTER,
      contentRadius: menuSize * RADIUS_RATIOS.CONTENT,
    };
  }, []);

  const [config, setConfig] = useState<ResponsiveConfig>(calculateConfig);

  useEffect(() => {
    setConfig(calculateConfig());

    const handleResize = () => {
      setConfig(calculateConfig());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateConfig]);

  return config;
};
