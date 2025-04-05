import classNames from "classnames";
import { Link } from "@heroui/link";
import { SlArrowRight } from "react-icons/sl";

import style from "./styleCardBottomChoose.module.css";

import { oswald } from "@/config/fonts";
interface Text {
  title: string;
  description: string;
  link: string;
}
export default function CardBottomChoose({ text }: { text: Text }) {
  return (
    <div className={classNames(style["section-card__bottom-choose"])}>
      <p
        className={classNames(
          style["section-card__bottom-title"],
          oswald.className,
        )}
      >
        {text.title}
      </p>
      <p
        className={classNames(
          style["section-card__bottom-description"],
          oswald.className,
        )}
      >
        {text.description}
      </p>
      <Link
        className={classNames(
          style["section-popular__header-link"],
          oswald.className,
        )}
        href={text.link}
      >
        SEE MORE{" "}
        <SlArrowRight
          className={classNames(style["section-popular__header-link__arrow"])}
        />
      </Link>
    </div>
  );
}
