import classNames from "classnames";

import style from "./styleContactCard.module.css";

import { archivo, poppins } from "@/config/fonts";
interface ContactCard {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  details: string;
}
export default function ContactCard({ props }: { props: ContactCard }) {
  return (
    <section className={classNames(style["section-contact__card"])}>
      <p
        className={classNames(
          style["section-contact__card-title"],
          archivo.className,
        )}
      >
        {props.title}
      </p>
      <p
        className={classNames(
          style["section-contact__card-subtitle"],
          poppins.className,
        )}
      >
        {props.subtitle}
      </p>
      <div
        className={classNames(style["section-contact__card-details-wrapper"])}
      >
        <div className={classNames(style["section-contact__card-icon"])}>
          {props.icon}
        </div>
        <p
          className={classNames(
            style["section-contact__card-details"],
            archivo.className,
          )}
        >
          {props.details}
        </p>
      </div>
    </section>
  );
}
