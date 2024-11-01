import classNames from "classnames";

import SubtitleDiscover from "../SubtitleDiscover/SubtitleDiscover";

import style from "./styleVision.module.css";
import CardVision from "./CardVision/CardVision";

import { archivo } from "@/config/fonts";
import imageVision from "@/public/aboutVisionIcon.svg";
import imageInnovation from "@/public/aboutInnovationIcon.svg";
import imageConnection from "@/public/aboutConnectionIcon.svg";
export default function Vision() {
  const cardVision = [
    {
      title: "Vision",
      image: <img alt="Wireless Headphone" src={imageVision.src} />,
      paragraph:
        "To redefine the future of footwear by merging style, comfort, and cutting-edge technology, empowering individuals to perform at their best in every step they take.",
      underline: true,
    },
    {
      title: "Innovation",
      image: <img alt="Wireless Headphone" src={imageInnovation.src} />,
      paragraph:
        "Driven by a passion for excellence, we integrate advanced materials and smart design into every shoe, pushing the boundaries of performance and comfort for athletes and trendsetters alike.",
      underline: true,
    },
    {
      title: "Connection",
      image: <img alt="Wireless Headphone" src={imageConnection.src} />,
      paragraph:
        "We are dedicated to connecting people through their shared passion for movement, creating a community where performance meets lifestyle in every pair.",
      underline: false,
    },
  ];

  return (
    <section className={classNames(style["section-vision"])}>
      <SubtitleDiscover text="OUR VISION" />
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
          {cardVision.map((item, index) => (
            <CardVision key={index} card={item} />
          ))}
        </section>
      </section>
    </section>
  );
}
