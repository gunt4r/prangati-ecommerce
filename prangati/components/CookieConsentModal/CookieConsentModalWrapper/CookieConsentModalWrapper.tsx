"use client";

import CookieConsentModal from "../CookieConsentModal";

import { useCookieConsent } from "@/Hooks/useCookieConsent";
export default function CookieConsentModalWrapper() {
  const { hasConsented } = useCookieConsent();

  if (hasConsented == null) {
    return null;
  }

  return <CookieConsentModal />;
}
