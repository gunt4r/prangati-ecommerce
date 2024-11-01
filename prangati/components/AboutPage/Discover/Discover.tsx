import classNames from "classnames";

import style from "./styleDiscover.module.css";
import SubtitleDiscover from "../SubtitleDiscover/SubtitleDiscover";

import imageDiscover from "@/public/aboutDiscover.png";
import { archivo } from "@/config/fonts";
export default function Discover() {
  return (
    <section className={classNames(style["section-discover"])}>
      <SubtitleDiscover text="ABOUT US" />
      <p
        className={classNames(
          style["section-discover__title"],
          archivo.className,
        )}
      >
        Discover our{" "}
        <span
          className={classNames(style["section-discover__title-underline"])}
        >
          world.
        </span>
      </p>
      <img alt="imag" className="grayscale" src={imageDiscover.src} />
    </section>
  );
}
