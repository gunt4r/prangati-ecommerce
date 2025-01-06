"use client";
import React from "react";
import classNames from "classnames";
import { useTranslation, Trans } from "react-i18next";
import { Button } from "@nextui-org/button";

import styles from "./styleCookieConsent.module.css";

import { useCookieConsent } from "@/Hooks/useCookieConsent";
import { archivo, poppins } from "@/config/fonts";
const CookieConsentModal: React.FC = () => {
  const { t } = useTranslation();
  const { hasConsented, acceptCookies, declineCookies } = useCookieConsent();

  if (hasConsented) return null;

  return (
    <div
      className={classNames(styles["section-modal__backdrop"], styles.active)}
    >
      <div className={classNames(styles.modal, styles.active)}>
        <div className={styles.content}>
          <p
            className={classNames(
              styles["section-modal__title"],
              archivo.className,
            )}
          >
            {t("cookieConsentTitle")}
          </p>
          <p
            className={classNames(
              styles["section-modal__subtitle"],
              poppins.className,
              "mt-3",
            )}
          >
            <Trans
              components={{
                linkToServices: (
                  // eslint-disable-next-line jsx-a11y/anchor-has-content
                  <a
                    href="/services"
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                ),
                underline: <u />,
              }}
              i18nKey="cookieConsentSubtitle"
            />
          </p>
          <div
            className={classNames(
              styles["section-gadgets__left-bottom"],
              " mt-5",
            )}
          >
            <Button
              className={classNames(
                styles["section-gadgets__bottom-left-button"],
                "hover:bg-backgroundColorBlack hover:text-default-50 hover:border-2 bg-backgroundColor border-2 border-default-900 text-default-900 duration-500 mr-4",
              )}
              radius="sm"
              size="lg"
              onClick={acceptCookies}
            >
              Accept all cookies
            </Button>
            <Button
              className={classNames(
                styles["section-gadgets__bottom-left-button"],
                "bg-default-900 text-default-50 hover:bg-default-50 hover:border-2 hover:border-default-900 hover:text-default-900 duration-500 ml-4  w-37",
              )}
              radius="sm"
              size="lg"
              onClick={declineCookies}
            >
              Manage Preferences{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentModal;
