/* eslint-disable prettier/prettier */
import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        backgroundColor: "#EAEBED",
        backgroundColorBlack:"#201F2F",
        textColorWhite: "#FDFDFD"
      }
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#EAEBED",
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
            focus: "#BEF264",
            backgroundColorButtonBlack: "#1e1e1e",
          },
        },
      },
    }),
  ],
};
