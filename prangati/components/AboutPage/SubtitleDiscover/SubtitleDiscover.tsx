import classNames from "classnames";

import style from "./styleSubtitleDiscover.module.css";

import { archivo } from "@/config/fonts";
interface subtitle {
  text: string;
}
export default function SubtitleDiscover({ text }: subtitle) {
  return (
    <p
      className={classNames(
        style["section-discover__subtitle"],
        archivo.className,
      )}
    >
      {text}
    </p>
  );
}
