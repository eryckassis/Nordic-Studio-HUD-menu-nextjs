// CircularMenu - Main component
"use client";

// CircularMenu - Main component

import { useRef, useCallback } from "react";
import type { CircularMenuProps } from "./CircularMenu.types";
import { DEFAULT_MENU_ITEMS } from "./constants/menu.constants";
import { useResponsiveConfig } from "./hooks/useResponsiveConfig";
import { useMenuAnimation } from "./hooks/useMenuAnimation";
import { useJoystickDrag } from "./hooks/useJoystickDrag";
import { MenuToggle } from "./components/MenuToggle";
import { MenuOverlay } from "./components/MenuOverlay";
import { MenuSegment } from "./components/MenuSegment";
import { Joystick } from "./components/Joystick";
import { playMenuSelectSound } from "./utils/audio";

/**
 * CircularMenu - Menu de navegação circular futurista
 *
 * @example
 * // Uso básico (com itens padrão)
 * <CircularMenu />
 *
 * @example
 * // Com itens customizados
 * <CircularMenu
 *   items={[
 *     { label: "Home", icon: "home-sharp", href: "/" },
 *     { label: "About", icon: "person-sharp", href: "/about" },
 *   ]}
 *   onOpen={() => console.log("Menu aberto")}
 *   onClose={() => console.log("Menu fechado")}
 * />
 */
export const CircularMenu = ({
  items = DEFAULT_MENU_ITEMS,
  className,
  onItemSelect,
  onOpen,
  onClose,
  disableSounds = false,
}: CircularMenuProps) => {
  // Refs para elementos do DOM
  const menuRef = useRef<HTMLDivElement>(null);
  const joystickRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Hook de configuração responsiva
  const config = useResponsiveConfig();

  // Hook de animações
  const { isOpen, toggleMenu } = useMenuAnimation({
    overlayRef,
    navRef,
    footerRef,
    joystickRef,
    menuRef,
    disableSounds,
  });

  // Hook de drag do joystick
  useJoystickDrag({
    joystickRef,
    menuRef,
    totalSegments: items.length,
    isMenuOpen: isOpen,
    disableSounds,
    onSegmentSelect: (index) => {
      onItemSelect?.(items[index], index);
    },
  });

  /**
   * Handler para abrir o menu
   */
  const handleOpen = useCallback(() => {
    toggleMenu();
    onOpen?.();
  }, [toggleMenu, onOpen]);

  /**
   * Handler para fechar o menu
   */
  const handleClose = useCallback(() => {
    toggleMenu();
    onClose?.();
  }, [toggleMenu, onClose]);

  /**
   * Handler de hover em um segmento
   */
  const handleSegmentHover = useCallback(
    (index: number) => {
      if (isOpen && !disableSounds) {
        playMenuSelectSound();
      }
      onItemSelect?.(items[index], index);
    },
    [isOpen, disableSounds, items, onItemSelect]
  );

  return (
    <>
      {/* Botão de toggle (hamburguer) */}
      <MenuToggle onClick={handleOpen} />

      {/* Overlay com o menu */}
      <MenuOverlay
        isOpen={isOpen}
        onClose={handleClose}
        overlayRef={overlayRef}
        navRef={navRef}
        footerRef={footerRef}
      >
        {/* Container do menu circular */}
        <div
          ref={menuRef}
          className={`circular-menu ${className ?? ""}`}
          style={{
            width: `${config.menuSize}px`,
            height: `${config.menuSize}px`,
          }}
        >
          {/* Segmentos do menu */}
          {items.map((item, index) => (
            <MenuSegment
              key={item.id ?? item.label}
              item={item}
              index={index}
              total={items.length}
              config={config}
              onHover={() => handleSegmentHover(index)}
            />
          ))}

          {/* Joystick central */}
          <Joystick joystickRef={joystickRef} isOpen={isOpen} />
        </div>
      </MenuOverlay>
    </>
  );
};
