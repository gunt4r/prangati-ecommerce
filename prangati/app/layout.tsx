/* eslint-disable prettier/prettier */
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import dynamic from 'next/dynamic';

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { archivo} from "@/config/fonts.ts";

import "@theme-toggles/react/css/Around.css"
const CookieConsentModalWrapper = dynamic(() => import('@/components/CookieConsentModal/CookieConsentModalWrapper/CookieConsentModalWrapper'), { ssr: false });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="light" lang="en">
      <head />
      <body className={archivo.className}>
        <Providers>
          <main>{children}</main>
          <CookieConsentModalWrapper />
        </Providers>
      </body>
    </html>
  );
}
