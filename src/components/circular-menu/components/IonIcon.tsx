"use client";

// IonIcon - Wrapper component for ion-icon Web Component

import { useEffect, useRef } from "react";

interface IonIconProps {
  name: string;
  className?: string;
  size?: string;
}

/**
 * Componente wrapper para o Web Component ion-icon
 * Resolve problemas de tipagem do TypeScript
 */
export const IonIcon = ({ name, className, size }: IonIconProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      // Cria o ion-icon apenas no cliente
      spanRef.current.innerHTML = `<ion-icon name="${name}" ${
        className ? `class="${className}"` : ""
      } ${size ? `size="${size}"` : ""}></ion-icon>`;
    }
  }, [name, className, size]);

  return (
    <span
      ref={spanRef}
      style={{ display: "contents" }}
      suppressHydrationWarning
    />
  );
};
