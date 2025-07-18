/* eslint-disable prettier/prettier */
import "@/styles/globals.scss";
import { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";

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
        <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "15px",
          },
        }}
      />
        <Providers>
        <ClientPreloader />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
