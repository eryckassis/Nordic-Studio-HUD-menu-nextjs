// MenuToggle - Toggle button component

"use client";

import type { MenuToggleProps } from "../CircularMenu.types";

export const MenuToggle = ({ onClick }: MenuToggleProps) => {
  return (
    <button
      type="button"
      className="menu-toggle-btn"
      onClick={onClick}
      aria-label="Abrir menu de navegação"
      aria-expanded="false"
    >
      <span className="hamburger-bar" aria-hidden="true" />
      <span className="hamburger-bar" aria-hidden="true" />
    </button>
  );
};
