import classNames from "classnames";

import "./styleHeadingSectionTitle.scss";
import { archivo } from "@/config/fonts";
export default function HeadingSectionTitle({
  textHeading,
  style,
}: {
  textHeading: string;
  style?: { [key: string]: string };
}) {
  return (
    <h5
      className={classNames("section-popular__title", archivo.className)}
      style={{ ...style }}
    >
      {textHeading}
    </h5>
  );
}
