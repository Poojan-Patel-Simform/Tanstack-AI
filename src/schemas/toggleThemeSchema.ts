import z from "zod";

export const toggleThemeInputSchema = z.object({
  theme: z
    .enum(["light", "dark", "system"])
    .describe('The theme to apply: "light", "dark", or "system"'),
});
export const toggleThemeOutputSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  success: z.boolean(),
});
