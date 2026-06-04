"use client";

import { toggleThemeDef } from "@/tools/client/toggleTheme";
import { useTheme } from "next-themes";
import { clientTools } from "@tanstack/ai-client";

export function useClientTools() {
  const { setTheme } = useTheme();

  const toggleTheme = toggleThemeDef.client(async ({ theme }) => {
    setTheme(theme);

    return {
      theme,
      success: true,
    };
  });

  return clientTools(toggleTheme);
}
