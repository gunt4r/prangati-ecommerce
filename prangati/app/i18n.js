/* eslint-disable prettier/prettier */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import ro from "./locales/ro/translation.json";
import ru from "./locales/ru/translation.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "En": { translation: en },
      "Ru": { translation: ru },
      "Ro": { translation: ro },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
