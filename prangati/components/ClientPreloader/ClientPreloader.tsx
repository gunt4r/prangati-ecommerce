"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Preloader from "./Preloader";
const CookieConsentModalWrapper = dynamic(
  () =>
    import(
      "@/components/CookieConsentModal/CookieConsentModalWrapper/CookieConsentModalWrapper"
    ),
);

export default function ClientPreloader() {
  const [isLoading, setIsLoading] = useState(true);

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
