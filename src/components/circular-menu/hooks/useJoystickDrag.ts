// useJoystickDrag - Drag interaction logic hook

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { JOYSTICK_CONFIG } from "../constants/menu.constants";
import { getSegmentIndexFromPosition, getDistance } from "../utils/geometry";
import { playMenuSelectSound } from "../utils/audio";

interface UseJoystickDragProps {
  joystickRef: React.RefObject<HTMLDivElement | null>;

  menuRef: React.RefObject<HTMLDivElement | null>;

  totalSegments: number;

  isMenuOpen: boolean;

  disableSounds?: boolean;

  onSegmentSelect?: (index: number) => void;
}

export const useJoystickDrag = ({
  joystickRef,
  menuRef,
  totalSegments,
  isMenuOpen,
  disableSounds = false,
  onSegmentSelect,
}: UseJoystickDragProps): void => {
  const isDraggingRef = useRef(false);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const activeSegmentRef = useRef<Element | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const clearSegmentHover = useCallback((segment: Element | null) => {
    if (!segment) return;

    const htmlSegment = segment as HTMLElement;
    const content = segment.querySelector(".segment-content") as HTMLElement;

    htmlSegment.style.animation = "";
    htmlSegment.style.zIndex = "";
    if (content) {
      content.style.animation = "";
    }
  }, []);

  const applySegmentHover = useCallback((segment: Element) => {
    const htmlSegment = segment as HTMLElement;
    const content = segment.querySelector(".segment-content") as HTMLElement;

    htmlSegment.style.animation = "flickerHover 350ms ease-in-out forwards";
    htmlSegment.style.zIndex = "10";
    if (content) {
      content.style.animation =
        "contentFlickerHover 350ms ease-in-out forwards";
    }
  }, []);

  const animate = useCallback(() => {
    const joystick = joystickRef.current;
    const menu = menuRef.current;

    if (!joystick || !menu) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    // Interpolação suave (easing) para o movimento
    currentXRef.current +=
      (targetXRef.current - currentXRef.current) * JOYSTICK_CONFIG.SMOOTHING;
    currentYRef.current +=
      (targetYRef.current - currentYRef.current) * JOYSTICK_CONFIG.SMOOTHING;

    gsap.set(joystick, {
      x: currentXRef.current,
      y: currentYRef.current,
    });

    const distance = getDistance(currentXRef.current, currentYRef.current);

    if (isDraggingRef.current && distance > JOYSTICK_CONFIG.DEAD_ZONE) {
      const segmentIndex = getSegmentIndexFromPosition(
        currentXRef.current,
        currentYRef.current,
        totalSegments
      );

      const segments = menu.querySelectorAll(".menu-segment");
      const segment = segments[segmentIndex];

      // Se mudou de segmento, atualiza os estilos
      if (segment && segment !== activeSegmentRef.current) {
        // Remove hover do segmento anterior
        clearSegmentHover(activeSegmentRef.current);

        // Aplica hover no novo segmento
        activeSegmentRef.current = segment;
        applySegmentHover(segment);

        // Toca som e dispara callback
        if (isMenuOpen) {
          if (!disableSounds) {
            playMenuSelectSound();
          }
          onSegmentSelect?.(segmentIndex);
        }
      }
    } else {
      // Fora do drag ou dentro da dead zone - limpa hover
      if (activeSegmentRef.current) {
        clearSegmentHover(activeSegmentRef.current);
        activeSegmentRef.current = null;
      }
    }

    // Continua o loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [
    joystickRef,
    menuRef,
    totalSegments,
    isMenuOpen,
    disableSounds,
    onSegmentSelect,
    clearSegmentHover,
    applySegmentHover,
  ]);

  useEffect(() => {
    const joystick = joystickRef.current;
    if (!joystick) return;

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;

      const rect = joystick.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
        if (!isDraggingRef.current) return;

        // Pega a posição do mouse/touch
        const clientX =
          "touches" in moveEvent
            ? moveEvent.touches[0]?.clientX ?? 0
            : moveEvent.clientX;
        const clientY =
          "touches" in moveEvent
            ? moveEvent.touches[0]?.clientY ?? 0
            : moveEvent.clientY;

        // Calcula o delta em relação ao centro
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = getDistance(deltaX, deltaY);

        // Limita a distância máxima de arrasto
        const maxDrag = JOYSTICK_CONFIG.SIZE * JOYSTICK_CONFIG.MAX_DRAG_RATIO;

        if (distance <= JOYSTICK_CONFIG.DEAD_ZONE) {
          // Dentro da dead zone - volta ao centro
          targetXRef.current = 0;
          targetYRef.current = 0;
        } else if (distance > maxDrag) {
          // Além do máximo - limita proporcionalmente
          const ratio = maxDrag / distance;
          targetXRef.current = deltaX * ratio;
          targetYRef.current = deltaY * ratio;
        } else {
          // Dentro do range normal
          targetXRef.current = deltaX;
          targetYRef.current = deltaY;
        }

        moveEvent.preventDefault();
      };

      const handleEnd = () => {
        isDraggingRef.current = false;
        targetXRef.current = 0;
        targetYRef.current = 0;

        // Remove listeners
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };

      // Adiciona listeners para movimento e fim
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);

      e.preventDefault();
    };

    // Adiciona listeners para início do drag
    joystick.addEventListener("mousedown", handleStart);
    joystick.addEventListener("touchstart", handleStart, { passive: false });

    // Inicia o loop de animação
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      joystick.removeEventListener("mousedown", handleStart);
      joystick.removeEventListener("touchstart", handleStart);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [joystickRef, animate]);
};
