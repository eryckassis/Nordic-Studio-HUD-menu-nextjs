import { ANIMATION_CONFIG } from "./../constants/menu.constants";
import { JoystickPosition } from "./../CircularMenu.types";
import React, { useCallback, useRef } from "react";
import { gsap } from "gsap";
import { ANIMATION_CONFIG } from "../constants/menu.constants";
import { playMenuOpenSound, playMenuCloseSound } from "../utils/audio";

interface UseMenuAnimationProps {
  // ref de overlay principcal
  overlayRef: React.RefObject<HTMLDivElement | null>;
  // ref de navegacao superiror
  navRef: React.RefObject<HTMLDivElement | null>;
  // ref de footer
  footerRef: React.RefObject<HTMLDivElement | null>;
  // ref do controle joystick
  joystickRef: React.RefObject<HTMLDivElement | null>;
  // ref de container do menu
  menuRef: React.RefObject<HTMLDivElement | null>;
  // desabilitar som
  disableSounds?: boolean;
}

interface UseMenuAnimationReturn {
  isOpen: boolean;
  isAnimating: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

export const useMenuAnimation = ({
  overlayRef,
  navRef,
  footerRef,
  JoystickRef,
  menuRef,
  disableSounds = false,
}: useMenuAnimationProps): useMenuAnimationReturn => {
  const isOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const openMenu = useCallback(() => {
    if (isAnimatingRef.current || isOpenRef.current) return;
    const overlay = overlayRef.current;
    const nav = navRef.current;
    const footer = footerRef.current;
    const joystick = JoystickRef.current;
    const menu = menuRef.current;

    if (!overlay || !nav || !footer || !joystick || !menu) return;

    isAnimatingRef.current = true;
    isOpenRef.current = true;

    if (!disableSounds) {
      playMenuOpenSound();
    }

    gsap.to(overlay, {
      opacity: 1,
      duration: ANIMATION_CONFIG.OVERLAY_DURATION,
      ease: "power2.out",
      onStart: () => {
        overlay.style.pointerEvents = "all";
      },
    });

    gsap.to(joystick, {
      scale: 1,
      duration: ANIMATION_CONFIG.JOYSTICK_DURATION,
      delay: ANIMATION_CONFIG.JOYSTICK_DELAY,
      ease: "back.out(1.7)",
    });
  });
};
