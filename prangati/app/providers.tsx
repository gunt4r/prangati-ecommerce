"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from "react-redux";

import store from "@/store/index";
import "./i18n.js";
export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={true}
      >
        <Provider store={store}>{children}</Provider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
