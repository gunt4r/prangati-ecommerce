/* eslint-disable prettier/prettier */
import { Archivo,Poppins,Oswald } from "next/font/google";

export const archivo = Archivo({
  weight: "400",
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
