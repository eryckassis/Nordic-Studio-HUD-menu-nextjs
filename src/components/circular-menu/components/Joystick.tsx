"use client";

// Joystick - Central control component

import type { JoystickProps } from "../CircularMenu.types";
import { IonIcon } from "./IonIcon";

export const Joystick = ({ joystickRef, isOpen }: JoystickProps) => {
  return (
    <div
      ref={joystickRef}
      className="joystick"
      style={{
        // Inicia escondido, será animado via GSAP
        transform: isOpen ? undefined : "translate(-50%, -50%) scale(0)",
      }}
    >
      {/* Ícone central principal */}
      <IonIcon name="grid-sharp" className="center-icon center-main" />

      {/* Setas direcionais */}
      <IonIcon name="chevron-up-sharp" className="center-icon center-up" />
      <IonIcon name="chevron-down-sharp" className="center-icon center-down" />
      <IonIcon name="chevron-back-sharp" className="center-icon center-left" />
      <IonIcon
        name="chevron-forward-sharp"
        className="center-icon center-right"
      />
    </div>
  );
};
