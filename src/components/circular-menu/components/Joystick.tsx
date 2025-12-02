// Joystick - Central control component
"use client";

import type { JoystickProps } from "../CircularMenu.types";

export const JoyStick = ({ joystickRef, isOpen}: JoyStickProps) => {
    return (
        <div
        ref={joystickRef}
        className="joystick"
        style={{
            transform: isOpen ? undefined : "translate(-50%, -50%) scale(0)",
        }}
        >
            <ion-icon name="grid-sharp" class="center-icon center-main" />
    )
}