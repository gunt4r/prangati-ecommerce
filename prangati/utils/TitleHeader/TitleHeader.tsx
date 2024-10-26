import classNames from "classnames";

import style from "./styleTitleHeader.module.css";

import { archivo } from "@/config/fonts";

interface Text {
  text: string;
}
export default function TitleHeader({ text }: Text) {
  return (
    <h5 className={classNames(style["section-wish__title"], archivo.className)}>
      {text}
    </h5>
  );
}
