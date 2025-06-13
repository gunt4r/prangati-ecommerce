import classNames from "classnames";

import style from "./styleTitleHeader.module.css";

import { archivo } from "@/config/fonts";

interface Text {
  text: string;
  styles?: { [key: string]: string };
}
export default function TitleHeader({ text, styles }: Text) {
  return (
    <h5
      className={classNames(style["section-wish__title"], archivo.className)}
      style={{ ...styles }}
    >
      {text}
    </h5>
  );
}
