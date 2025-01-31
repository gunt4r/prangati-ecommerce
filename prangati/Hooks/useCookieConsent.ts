"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useCookieConsent = () => {
  const [hasConsented, setHasConsented] = useState<boolean>(false);

  useEffect(() => {
    const consent = Cookies.get("user_consent_cookie");

    setHasConsented(consent === "true");
  }, []);

  const acceptCookies = () => {
    Cookies.set("user_consent_cookie", "true", { expires: 365 });
    setHasConsented(true);
  };

  const declineCookies = () => {
    Cookies.set("user_consent_cookie", "false", { expires: 365 });
    setHasConsented(true);
  };

  return { hasConsented, acceptCookies, declineCookies };
};
