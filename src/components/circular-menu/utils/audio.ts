// Audio utilities for sound playback
import { AUDIO_PATHS } from "../constants/menu.constants";

const audioCache = new Map<string, HTMLAudioElement>();

export const playSound = (src: string): void => {
  if (typeof window === "undefined") return;

  try {
    let audio = audioCache.get(src);
    if (!audio) {
      audio = new Audio(src);
      audioCache.set(src, audio);
    }

    audio.currentTime = 0;

    audio.play().catch(() => {});
  } catch {}
};

export const playMenuOpenSound = (): void => {
  playSound(AUDIO_PATHS.MENU_OPEN);
};

export const playMenuCloseSound = (): void => {
  playSound(AUDIO_PATHS.MENU_CLOSE);
};

export const preloadMenuSounds = (): void => {
  if (typeof window === "undefined") return;
  Object.values(AUDIO_PATHS).forEach((src) => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audioCache.set(src, audio);
  });
};

export const clearAudioCache = (): void => {
  audioCache.forEach((audio) => {
    audio.pause();
    audio.src = "";
  });
  audioCache.clear();
};
