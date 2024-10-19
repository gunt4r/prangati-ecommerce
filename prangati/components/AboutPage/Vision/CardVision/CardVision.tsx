import classNames from "classnames";

import style from "./styleCardVision.module.css";

import { archivo, poppins } from "@/config/fonts";

interface CardVision {
  title: string;
  image: JSX.Element;
  paragraph: string;
  underline: boolean;
}
export default function CardVision({ card }: { card: CardVision }) {
  return (
    <section className={classNames(style["section-vision__card"])}>
      <section className={classNames(style["section-vision__card-wrapper"])}>
        <section className={classNames(style["section-vision__card-left"])}>
          {card.image && (
            <div className={classNames(style["section-vision__card-image"])}>
              {card.image}
            </div>
          )}
        </section>
        <section className={classNames(style["section-vision__card-right"])}>
          <p
            className={classNames(
              style["section-vision__card-title"],
              archivo.className,
            )}
          >
            {card.title}
          </p>
          <p
            className={classNames(
              style["section-vision__card-text"],
              poppins.className,
            )}
          >
            {card.paragraph}
          </p>
        </section>
      </section>
      {card.underline && (
        <hr className={classNames(style["section-vision__card-underline"])} />
      )}
    </section>
  );
}
