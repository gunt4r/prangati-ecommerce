/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import "@/app/i18n";
import { IoIosArrowDown } from "react-icons/io";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

function DropdownLanguage() {
  const { i18n } = useTranslation();
  const savedLanguage = (cookies.get("language") as string | undefined) || "en";
  const [currentLanguage, setCurrentLanguage] = useState(savedLanguage);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    cookies.set("language", language);
  };

  const languageOptions: { [key: string]: string } = {
    en: "English",
    ro: "Română",
    ru: "Русский",
  };

  return (
    isClient && (
      <>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">
            {languageOptions[currentLanguage]}{" "}
            <IoIosArrowDown style={{ color: "white" }} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Single selection example"
          selectionMode="single"
          variant="shadow"
        >
          {Object.keys(languageOptions)
            .filter((lang) => lang !== currentLanguage)
            .map((lang) => (
              <DropdownItem
                key={lang}
                variant="shadow"
                onClick={() => changeLanguage(lang)}
              >
                {languageOptions[lang]}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
      </> 
    )
  );
}
export default DropdownLanguage;
