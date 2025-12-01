// useMenuAnimation - GSAP animation logic hook

import { useCallback, useRef } from "react";
import { gsap } from "gsap";
import { ANIMATION_CONFIG } from "../constants/menu.constants";
import { playMenuOpenSound, playMenuCloseSound } from "../utils/audio";

interface UseMenuAnimationProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;

  navRef: React.RefObject<HTMLDivElement | null>;

  footerRef: React.RefObject<HTMLDivElement | null>;

  joystickRef: React.RefObject<HTMLDivElement | null>;

  menuRef: React.RefObject<HTMLDivElement | null>;

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
  joystickRef,
  menuRef,
  disableSounds = false,
}: UseMenuAnimationProps): UseMenuAnimationReturn => {
  // Usamos refs para estado que não precisa causar re-render
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
    const joystick = joystickRef.current;
    const menu = menuRef.current;

    if (!overlay || !nav || !footer || !joystick || !menu) return;

    isAnimatingRef.current = true;
    isOpenRef.current = true;

    // Toca som de abertura
    if (!disableSounds) {
      playMenuOpenSound();
    }

    // Fade in do overlay
    gsap.to(overlay, {
      opacity: 1,
      duration: ANIMATION_CONFIG.OVERLAY_DURATION,
      ease: "power2.out",
      onStart: () => {
        overlay.style.pointerEvents = "all";
      },
    });

    // Scale in do joystick
    gsap.to(joystick, {
      scale: 1,
      duration: ANIMATION_CONFIG.JOYSTICK_DURATION,
      delay: ANIMATION_CONFIG.JOYSTICK_DELAY,
      ease: "back.out(1.7)",
    });

    // Flicker da nav e footer
    gsap.set([nav, footer], { opacity: 0 });
    gsap.to([nav, footer], {
      opacity: 1,
      duration: ANIMATION_CONFIG.SEGMENT_FLICKER_DURATION,
      delay: ANIMATION_CONFIG.OVERLAY_DURATION,
      repeat: ANIMATION_CONFIG.FLICKER_REPEATS,
      yoyo: true,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set([nav, footer], { opacity: 1 });
      },
    });

    // Anima segmentos em ordem aleatória
    const segments = menu.querySelectorAll(".menu-segment");
    const indices = shuffleArray([...Array(segments.length).keys()]);

    indices.forEach((originalIndex, shuffledPosition) => {
      const segment = segments[originalIndex];
      gsap.set(segment, { opacity: 0 });
      gsap.to(segment, {
        opacity: 1,
        duration: ANIMATION_CONFIG.SEGMENT_FLICKER_DURATION,
        delay: shuffledPosition * ANIMATION_CONFIG.SEGMENT_STAGGER,
        repeat: ANIMATION_CONFIG.FLICKER_REPEATS,
        yoyo: true,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(segment, { opacity: 1 });

          if (shuffledPosition === segments.length - 1) {
            isAnimatingRef.current = false;
          }
        },
      });
    });
  }, [overlayRef, navRef, footerRef, joystickRef, menuRef, disableSounds]);

  const closeMenu = useCallback(() => {
    if (isAnimatingRef.current || !isOpenRef.current) return;

    const overlay = overlayRef.current;
    const nav = navRef.current;
    const footer = footerRef.current;
    const joystick = joystickRef.current;
    const menu = menuRef.current;

    if (!overlay || !nav || !footer || !joystick || !menu) return;

    isAnimatingRef.current = true;
    isOpenRef.current = false;

    if (!disableSounds) {
      playMenuCloseSound();
    }

    gsap.to([nav, footer], {
      opacity: 0,
      duration: 0.05,
      repeat: 2,
      yoyo: true,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set([nav, footer], { opacity: 0 });
      },
    });

    gsap.to(joystick, {
      scale: 0,
      duration: ANIMATION_CONFIG.OVERLAY_DURATION,
      delay: ANIMATION_CONFIG.JOYSTICK_DELAY,
      ease: "back.in(1.7)",
    });

    const segments = menu.querySelectorAll(".menu-segment");
    const indices = shuffleArray([...Array(segments.length).keys()]);

    indices.forEach((originalIndex, shuffledPosition) => {
      const segment = segments[originalIndex];
      gsap.to(segment, {
        opacity: 0,
        duration: 0.05,
        delay: shuffledPosition * 0.05,
        repeat: 2,
        yoyo: true,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(segment, { opacity: 0 });
        },
      });
    });

    // Fade out do overlay
    gsap.to(overlay, {
      opacity: 0,
      duration: ANIMATION_CONFIG.OVERLAY_DURATION,
      delay: 0.6,
      ease: "power2.out",
      onComplete: () => {
        overlay.style.pointerEvents = "none";
        isAnimatingRef.current = false;
      },
    });
  }, [overlayRef, navRef, footerRef, joystickRef, menuRef, disableSounds]);

  const toggleMenu = useCallback(() => {
    if (isOpenRef.current) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [openMenu, closeMenu]);

  return {
    isOpen: isOpenRef.current,
    isAnimating: isAnimatingRef.current,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};
