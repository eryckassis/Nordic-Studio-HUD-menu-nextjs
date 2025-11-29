import type { MenuItem } from "../CircularMenu.types";

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { label: "Vision", icon: "scan-sharp", href: "/vision" },
  { label: "Portfolio", icon: "layers-sharp", href: "/portfolio" },
  { label: "People", icon: "person-sharp", href: "/people" },
  { label: "Insights", icon: "person-sharp", href: "/insights" },
  { label: "Careers", icon: "stats-chart-sharp", href: "/careers" },
  { label: "About Us", icon: "reader-sharp", href: "/about" },
];

export const MENU_SIZE_CONFIG = {
  MOBILE_BREAKPOINT: 1000,
  DESKTOP_SIZE: 700,
  MOBILE_MAX_SIZE: 480,
  VIEWPORT_PERCENTAGE: 0.9,
} as const;

export const RADIUS_RATIOS = {
  INNER: 0.08,
  OUTER: 0.42,
  CONTENT: 0.28,
} as const;

export const JOYSTICK_CONFIG = {
  SIZE: 100,
  DEAD_ZONE: 20,
  SMOOTHING: 0.15,
  MAX_DRAG_RATIO: 0.25,
} as const;

export const ANIMATION_CONFIG = {
  OVERLAY_DURATION: 0.3,
  JOYSTICK_DURATION: 0.4,
  JOYSTICK_DELAY: 0.2,
  SEGMENT_FLICKER_DURATION: 0.075,
  FLICKER_REPEATS: 3,
  SEGMENT_STAGGER: 0.075,
} as const;

export const SEGMENT_GAP = 0.19;

export const AUDIO_PATHS = {
  MENU_OPEN: "/menu-open.mp3",
  MENU_CLOSE: "/menu-close.mp3",
  MENU_SELECT: "/menu-select.mp3",
} as const;

export const SOCIAL_LINKS = [
  { icon: "logo-google", href: "#", label: "Behance" },
  { icon: "logo-gitHub", href: "#", label: "GitHub" },
  { icon: "logo-vercel", href: "#", label: "Vercel" },
] as const;

export const FOOTER_LINKS = [
  { label: "Cookie Settings", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Legal Disclaimer", href: "#" },
] as const;

export const COPYRIGHT_TEXT = "Copyright © 2025 All Rights Reserved";
