"use client";

import { useEffect, useState } from "react";

type ThemeColors = { [key: string]: string };

const KEYS = [
  "--primary",
  "--primary-foreground",
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--accent",
  "--accent-foreground",
  "--border",
  "--input",
];

export default function useThemeColors() {
  const [colors, setColors] = useState<ThemeColors>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const read = () => {
      const style = getComputedStyle(document.documentElement);
      const map: ThemeColors = {};
      KEYS.forEach((k) => {
        const v = style.getPropertyValue(k).trim();
        if (v) map[k.replace("--", "")] = v;
      });
      setColors(map);
    };

    read();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (
          m.type === "attributes" &&
          (m.attributeName === "class" || m.attributeName === "data-theme")
        ) {
          read();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return colors;
}
