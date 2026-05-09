// This component is a wrapper around the next-themes library, which provides a simple way to manage themes in a Next.js application. It allows you to easily switch between light and dark themes, and also supports custom themes.

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
