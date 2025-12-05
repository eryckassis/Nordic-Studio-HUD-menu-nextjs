export interface MenuItem {
  label: string;
  icon: string;
  href: string;
  id?: string;
}

export interface ResponsiveConfig {
  menuSize: number;
  center: number;
  innerRadius: number;
  outerRadius: number;
  contentRadius: number;
}

export interface SegmentGeometry {
  pathData: string;
  contentX: number;
  contentY: number;
}

export interface CircularMenuProps {
  items?: MenuItem[];
  className?: string;
  onItemSelect?: (item: MenuItem, index: number) => void;
  onOpen?: () => void;
  onClose?: () => void;
  disableSounds?: boolean;
}

export interface MenuSegmentProps {
  item: MenuItem;
  index: number;
  total: number;
  config: ResponsiveConfig;
  isActive?: boolean;
  onHover?: () => void;
}

export interface JoystickProps {
  joystickRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
}

export interface MenuToggleProps {
  onClick: () => void;
}

export interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  navRef: React.RefObject<HTMLDivElement | null>;
  footerRef: React.RefObject<HTMLDivElement | null>;
}

export interface MenuState {
  isOpen: boolean;
  isAnimating: boolean;
  activeSegmentIndex: number;
}

export interface JoystickPosition {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  isDragging: boolean;
}
