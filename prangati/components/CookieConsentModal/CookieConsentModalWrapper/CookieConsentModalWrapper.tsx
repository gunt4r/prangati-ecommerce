"use client";

import { useEffect } from "react";

import CookieConsentModal from "../CookieConsentModal";

import { useUUID } from "@/Hooks/useUUID";
import { useCookieConsent } from "@/Hooks/useCookieConsent";
export default function CookieConsentModalWrapper() {
  const { hasConsented } = useCookieConsent();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userUUID = useUUID();

  useEffect(() => {
    window.addEventListener("load", () => {
      return;
    });

    return () =>
      window.removeEventListener("load", () => {
        return;
      });
  }, []);
  if (hasConsented == null) {
    return null;
  }

  return <CookieConsentModal />;
}
