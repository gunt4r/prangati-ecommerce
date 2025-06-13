"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Preloader from "./Preloader";

import { useUUID } from "@/Hooks/useUUID";
const CookieConsentModalWrapper = dynamic(
  () =>
    import(
      "@/components/CookieConsentModal/CookieConsentModalWrapper/CookieConsentModalWrapper"
    ),
);

export default function ClientPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userUUID = useUUID();

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      const handleLoad = () => setIsLoading(false);

      window.addEventListener("load", handleLoad);

      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {!isLoading && <CookieConsentModalWrapper />}
      {isLoading && <Preloader />}
    </>
  );
}
