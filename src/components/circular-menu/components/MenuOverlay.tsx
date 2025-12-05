// MenuOverlay - Overlay background component
"use client";

import Script from "next/script";
import type { MenuOverlayProps } from "../CircularMenu.types";
import {
  SOCIAL_LINKS,
  FOOTER_LINKS,
  COPYRIGHT_TEXT,
} from "../constants/menu.constants";
import { IonIcon } from "./IonIcon";

export const MenuOverlay = ({
  isOpen,
  onClose,
  children,
  overlayRef,
  navRef,
  footerRef,
}: MenuOverlayProps) => {
  return (
    <div
      ref={overlayRef}
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      style={{
        opacity: 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      {/* Background com imagem */}
      <div className="menu-bg" aria-hidden="true" />

      {/* Navegação superior */}
      <nav ref={navRef} className="menu-overlay-nav" style={{ opacity: 0 }}>
        {/* Botão de fechar */}
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          <span className="close-btn-bar" aria-hidden="true" />
          <span className="close-btn-bar" aria-hidden="true" />
        </button>

        {/* Links sociais */}
        <div className="menu-overlay-items">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.icon}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IonIcon name={link.icon} />
            </a>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="menu-overlay-footer"
        style={{ opacity: 0 }}
      >
        <p>{COPYRIGHT_TEXT}</p>

        <div className="menu-overlay-items">
          {FOOTER_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </footer>

      {/* Conteúdo do menu (circular menu) */}
      {children}

      {/* Scripts do Ionicons */}
      <Script
        type="module"
        src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.1.0/ionicons/ionicons.esm.js"
        strategy="afterInteractive"
      />
      <Script
        noModule
        src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.1.0/ionicons/ionicons.js"
        strategy="afterInteractive"
      />
    </div>
  );
};
