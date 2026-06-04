"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type PropsType = React.ComponentProps<typeof NextThemesProvider>;

const ThemeProvider = ({ children, ...props }: PropsType) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
