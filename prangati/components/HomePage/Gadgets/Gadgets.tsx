import classNames from "classnames";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import { cn } from "@nextui-org/react";

import style from "./styleGadgets.module.css";
import CardGadgets from "./CardGadgets/CardGadgets";

import { archivo, albertSans } from "@/config/fonts";
import imageCamera from "@/public/homeCameraGadgets.png";
import imageHeadphones from "@/public/homeHeadsetGadgets.png";
import imagePhone from "@/public/homePhoneGadgets.png";

export default function Gadgets() {
  const cardGadgets = [
    {
      title: "My New Wireless Headphone",
      image: <img alt="Wireless Headphone" src={imageHeadphones.src} />,
    },
    {
      title: "Most Viral Wireless Charger",
      image: <img alt="Wireless Headphone" src={imagePhone.src} />,
    },
  ];

  return (
    <section className={classNames(style["section-gadgets"])}>
      <section className={classNames(style["section-gadgets__wrapper"])}>
        <section className={classNames(style["section-gadgets__left"])}>
          <div className={classNames(style["section-gadgets__left-top"])}>
            <p
              className={classNames(
                style["section-gadgets__left-top-title"],
                archivo.className,
              )}
            >
              ONLY FINEST GADGETS
            </p>
            <p
              className={classNames(
                style["section-gadgets__left-top-subtitle"],
                albertSans.className,
              )}
            >
              We develop smart products in the areas of ingenuity.
            </p>
          </div>
          <div className={classNames(style["section-gadgets__left-middle"])}>
            <hr
              className={classNames(style["section-gadgets__left-middle-line"])}
            />
            <div
              className={classNames(
                style["section-gadgets__left-middle-circle"],
              )}
            />
          </div>
          <div className={classNames(style["section-gadgets__left-bottom"])}>
            <Button
              className={classNames(
                style["section-gadgets__bottom-left-button"],
                "bg-default-900 text-default-50 hover:bg-default-50 hover:border-2 hover:border-default-900 hover:text-default-900 duration-500 mr-4 w-28",
              )}
              radius="full"
              size="lg"
            >
              See more
            </Button>
            <Button
              className={classNames(
                style["section-gadgets__bottom-left-button"],
                "hover:bg-default-900 hover:text-default-50 bg-backgroundColor border-2 border-default-900 text-default-900 duration-500",
              )}
              radius="full"
              size="lg"
            >
              Subscribe
            </Button>
          </div>
        </section>
        <section className={classNames(style["section-gadgets__right"])}>
          <img
            alt=""
            className={classNames(style["section-gadgets__right-camera"])}
            src={imageCamera.src}
          />
          {cardGadgets.map((item, index) => {
            return <CardGadgets key={index} card={item} />;
          })}
        </section>
      </section>
      <section className={classNames(style["section-gadgets__switcher"])}>
        <Switch
          classNames={{
            wrapper: cn(
              "bg-transparent border-2 border-default-900",
              "group-data-[selected=true]:bg-default-900 group-data-[selected=true]:border-default-900",
            ),
            thumb: cn(
              "w-6 h-6 bg-default-900 shadow-lg border-default-900",
              "group-data-[selected=true]:ml-6 group-data-[selected=true]:bg-default-50",
            ),
          }}
          color="default"
          defaultSelected={false}
          size="lg"
        />
      </section>
    </section>
  );
}
