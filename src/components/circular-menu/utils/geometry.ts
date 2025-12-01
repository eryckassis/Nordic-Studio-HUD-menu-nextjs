import type { ResponsiveConfig, SegmentGeometry } from "../CircularMenu.types";
import { SEGMENT_GAP } from "../constants/menu.constants";

export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const getCircleX = (
  center: number,
  radius: number,
  angleDegrees: number
): number => {
  return center + radius * Math.cos(degreesToRadians(angleDegrees - 90));
};

export const getCircleY = (
  center: number,
  radius: number,
  angleDegrees: number
): number => {
  return center + radius * Math.sin(degreesToRadians(angleDegrees - 90));
};

export const calculateSegmentGeometry = (
  index: number,
  total: number,
  config: ResponsiveConfig
): SegmentGeometry => {
  const { center, innerRadius, outerRadius, contentRadius } = config;
  const anglePerSegment = 360 / total;
  const baseStartAngle = anglePerSegment * index;

  const centerAngle = baseStartAngle + anglePerSegment / 2;

  const startAngle = baseStartAngle + SEGMENT_GAP;
  const endAngle = baseStartAngle + anglePerSegment - SEGMENT_GAP;

  const innerStartX = getCircleX(center, innerRadius, startAngle);
  const innerStartY = getCircleY(center, innerRadius, startAngle);

  const outerStartX = getCircleX(center, outerRadius, startAngle);
  const outerStartY = getCircleY(center, outerRadius, startAngle);

  const outerEndX = getCircleX(center, outerRadius, endAngle);
  const outerEndY = getCircleY(center, outerRadius, endAngle);

  const innerEndX = getCircleX(center, innerRadius, endAngle);
  const innerEndY = getCircleY(center, innerRadius, endAngle);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  const pathData = [
    `M ${innerStartX} ${innerStartY}`,
    `L ${outerStartX} ${outerStartY}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
    `L ${innerEndX} ${innerEndY}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
    "Z",
  ].join(" ");

  const contentX = getCircleX(center, contentRadius, centerAngle);
  const contentY = getCircleY(center, contentRadius, centerAngle);

  return {
    pathData,
    contentX,
    contentY,
  };
};

export const getSegmentIndexFromPosition = (
  x: number,
  y: number,
  totalSegments: number
): number => {
  const angleDegrees = Math.atan2(y, x) * (180 / Math.PI);
  const normalizeAngle = (angleDegrees + 90 + 360) % 360;
  const segmentIndex = Math.floor(normalizeAngle / (360 / totalSegments));
  return segmentIndex % totalSegments;
};

export const getDistance = (x: number, y: number): number => {
  return Math.sqrt(x * x + y * y);
};
