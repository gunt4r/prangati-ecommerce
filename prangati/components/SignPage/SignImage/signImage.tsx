import { Link } from "@nextui-org/link";
import classNames from "classnames";

import style from "./styleSignImage.module.css";

import imageFigures from "@/public/authImage.svg";
import { archivo } from "@/config/fonts";
export default function SignImage() {
  return (
    <section className={classNames(style["section-sign__image-wrapper"])}>
      <Link className={classNames(style["section-nav__logo"])} href="/">
        <p
          className={classNames(
            style["section-nav__logo-text"],
            archivo.className,
            "text-black",
          )}
        >
          PRANGATI
        </p>
      </Link>
      <img alt="Figures" src={imageFigures.src} />
    </section>
  );
}
