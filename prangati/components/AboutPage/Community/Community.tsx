import classNames from "classnames";

import SubtitleDiscover from "../SubtitleDiscover/SubtitleDiscover";

import style from "./styleCommunity.module.css";
import CardCommunity from "./CardCommunity/CardCommunity";

import imageAboutAdidas from "@/public/imageAboutAdidas.svg";
import imageAboutNewBalance from "@/public/imageAboutNewBalance.svg";
import imageAboutNike from "@/public/imageAboutNike.svg";
import { archivo } from "@/config/fonts";
export default function CommunityAbout() {
  const cardCommunity = [
    {
      title: "NEW BALANCE",
      image: <img alt="Wireless Headphone" src={imageAboutNewBalance.src} />,
      paragraph:
        "We collaborated with New Balance to design shoes that integrate effortlessly with our tech, boosting comfort and performance while enhancing the user experience for athletes and everyday users alike.",
    },
    {
      title: "NIKE",
      image: <img alt="Wireless Headphone" src={imageAboutNike.src} />,
      paragraph:
        "We teamed up with Nike to create footwear that seamlessly integrates with our technology, elevating comfort and functionality to support athletes at every level.",
    },
    {
      title: "ADIDAS",
      image: <img alt="Wireless Headphone" src={imageAboutAdidas.src} />,
      paragraph:
        "In partnership with Adidas, we designed shoes that sync with our tech, enhancing durability, performance, and user experience across sports and daily wear.",
    },
  ];

  return (
    <section className={classNames(style["section-about__community"])}>
      <SubtitleDiscover text="COMMUNITY" />
      <section className={classNames(style["section-vision__wrapper"])}>
        <section className={classNames(style["section-vision__wrapper-left"])}>
          {" "}
          <p
            className={classNames(
              style["section-vision__left-title"],
              archivo.className,
            )}
          >
            Our vision is to connect with the world trough innovation.
          </p>{" "}
        </section>
        <section className={classNames(style["section-vision__wrapper-right"])}>
          {cardCommunity.map((item, index) => (
            <CardCommunity key={index} card={item} />
          ))}
        </section>
      </section>
    </section>
  );
}
