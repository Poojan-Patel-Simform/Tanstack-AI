import { TOGGLE_THEME_DESCRIPTION } from "@/constant/tool";
import {
  toggleThemeInputSchema,
  toggleThemeOutputSchema,
} from "@/schemas/toggleThemeSchema";
import { ToolNameEnum } from "@/types/tool";
import { toolDefinition } from "@tanstack/ai";

export const toggleThemeDef = toolDefinition({
  name: ToolNameEnum.TOGGLE_THEME,
  description: TOGGLE_THEME_DESCRIPTION,
  inputSchema: toggleThemeInputSchema,
  outputSchema: toggleThemeOutputSchema,
});
