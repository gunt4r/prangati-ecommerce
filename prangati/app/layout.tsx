/* eslint-disable prettier/prettier */
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { archivo} from "@/config/fonts.ts";
import "@theme-toggles/react/css/Around.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ClientPreloader from "@/components/ClientPreloader/ClientPreloader";
import { siteConfig } from "@/config/site";
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
    <html suppressHydrationWarning lang="en" >
      <head />
      <body className={archivo.className}>
        <ClientPreloader />
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
