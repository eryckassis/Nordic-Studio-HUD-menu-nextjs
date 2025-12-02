"use client";

import { useMemo } from "react";
import type { MenuSegmentProps } from "../CircularMenu.types";
import { calculateSegmentGeometry } from "../utils/geometry";

export const MenuSegment = ({
  item,
  index,
  total,
  config,
  isActive = false,
  onHover,
}: MenuSegmentProps) => {
  const geometry = useMemo(() => {
    return calculateSegmentGeometry(index, total, config);
  }, [index, total, config]);
};
