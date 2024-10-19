"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import classNames from "classnames";
import { GoPlus } from "react-icons/go";
import { useState } from "react";

import CardBottomChoose from "./CardBottomChoose/CardBottomChoose";
import style from "./styleChoose.module.css";

import { oswald, poppins } from "@/config/fonts";

export default function ChooseSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const bodyCard = [
    {
      title: "High-quality products",
      description:
        "We offer a wide range of electronics from top brands, ensuring the quality and reliability of every item..",
      link: "/",
    },
    {
      title: "Fast & Secure Delivery",
      description:
        "We provide swift and secure delivery services to ensure your electronics arrive safely and on time, with real-time tracking available for all orders.",
      link: "/",
    },
    {
      title: "Customer Support",
      description:
        "Our dedicated support team is always here to assist you with any questions or issues, offering friendly and professional help 24/7.",
      link: "/",
    },
    {
      title: "Affordable Prices",
      description:
        "Enjoy competitive prices on all our products, with special discounts and promotions available year-round, making top-tier electronics accessible for everyone.",
      link: "/",
    },
  ];
  const handleAccordionChange = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <section className={classNames(style["section-choose"])}>
      <main className={classNames(style["section-choose__wrapper"])}>
        <div className={classNames(style["section-choose__wrapper-left"])}>
          <p
            className={classNames(
              style["section-choose__left-text"],
              oswald.className,
            )}
          >
            WE UNDERSTAND THAT THE WAY YOU SIT CAN SIGNIFICANTLY IMPACT your
            daily life.{" "}
          </p>
        </div>
        <div className={classNames(style["section-choose__wrapper-right"])}>
          <p
            className={classNames(
              style["section-choose__right-title"],
              oswald.className,
            )}
          >
            Why choose us
          </p>
          <p
            className={classNames(
              style["section-choose__right-subtitle"],
              poppins.className,
            )}
          >
            This beloved product has become a favorite among our customers for
            its exceptional features and unparalleled performance.
          </p>
          <Accordion>
            <AccordionItem
              key="first"
              aria-label="first"
              indicator={
                <GoPlus
                  className={classNames({
                    [style["rotate-45"]]: openItem === "first",
                  })}
                />
              }
              title="WHAT IS YOUR RETURN POLICY?"
              onPress={() => handleAccordionChange("first")}
            >
              You can return items within 30 days, as long as they are in
              original condition and you have the receipt.
            </AccordionItem>

            <AccordionItem
              key="second"
              aria-label="Second"
              indicator={
                <GoPlus
                  className={classNames({
                    [style["rotate-45"]]: openItem === "second",
                  })}
                />
              }
              title="HOW LONG DOES SHIPPING TAKE?"
              onPress={() => handleAccordionChange("second")}
            >
              You can return items within 30 days, as long as they are in
              original condition and you have the receipt.
            </AccordionItem>

            <AccordionItem
              key="third"
              aria-label="Third"
              indicator={
                <GoPlus
                  className={classNames({
                    [style["rotate-45"]]: openItem === "third",
                  })}
                />
              }
              title="DO YOU OFFER WARRANTIES ON YOUR PRODUCT?"
              onPress={() => handleAccordionChange("third")}
            >
              You can return items within 30 days, as long as they are in
              original condition and you have the receipt.
            </AccordionItem>

            <AccordionItem
              key="last"
              aria-label="Last"
              indicator={
                <GoPlus
                  className={classNames({
                    [style["rotate-45"]]: openItem === "last",
                  })}
                />
              }
              title="HOW CAN I TRACK MY ORDER?"
              onPress={() => handleAccordionChange("last")}
            >
              You can return items within 30 days, as long as they are in
              original condition and you have the receipt.
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <div className={classNames(style["section-choose__bottom-cards"])}>
        {bodyCard.map((item, index) => (
          <CardBottomChoose key={index} text={item} />
        ))}
      </div>
    </section>
  );
}
