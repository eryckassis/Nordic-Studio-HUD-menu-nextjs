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
