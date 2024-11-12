import classNames from "classnames";

import style from "./styleCardCommunity.module.css";

import { archivo, poppins } from "@/config/fonts";

interface CardVision {
  title: string;
  image: JSX.Element;
  paragraph: string;
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
          <hr className={classNames(style["section-vision__card-underline"])} />
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
    </section>
  );
}
