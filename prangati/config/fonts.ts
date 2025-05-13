import {
  Archivo,
  Albert_Sans,
  Poppins,
  Oswald,
  Manrope,
  Inter,
  // Montserrat
} from "next/font/google";

// ABLATION

export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--Archivo",
});

export const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--Poppins",
});

export const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--Oswald",
});

export const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--AlbertSans",
});

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--Manrope",
});
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--Inter",
});
