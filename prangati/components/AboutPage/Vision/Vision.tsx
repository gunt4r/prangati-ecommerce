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
        "Our vision is to revolutionize everyday life through cutting-edge technology, creating a world where innovation enhances every moment.",
      underline: true,
    },
    {
      title: "Innovation",
      image: <img alt="Wireless Headphone" src={imageInnovation.src} />,
      paragraph:
        "We are committed to exploring the latest advancements and bringing high-quality gadgets that exceed user expectations.",
      underline: true,
    },
    {
      title: "Connection",
      image: <img alt="Wireless Headphone" src={imageConnection.src} />,
      paragraph:
        "We believe in building a community around technology, encouraging users to share experiences and inspire each other.",
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
