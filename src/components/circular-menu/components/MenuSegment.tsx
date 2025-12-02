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

  const segmentStyle = useMemo(
    () => ({
      clipPath: `path('${geometry.pathData}')`,
      width: `${config.menuSize}px`,
      heigth: `${config.menuSize}px`,
    }),
    [geometry.pathData, config.menuSize]
  );

  const contentStyle = useMemo(
    () => ({
      left: `${geometry.contentX}px`,
      top: `${geometry.contentY}px`,
      transform: "translate(-50%, -50%)",
    }),
    [geometry.contentX, geometry.contentY]
  );

  return (
    <a
      href={item.href}
      className="menu-segment"
      style={segmentStyle}
      onMouseEnter={onHover}
      data-active={isActive}
      data-index={index}
    >
      <div className="segment-content" style={contentStyle}>
        <ion-icon name={item.icon} />
        <div className="label">{item.label}</div>
      </div>
    </a>
  );
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          size?: string;
        },
        HTMLElement
      >;
    }
  }
}
