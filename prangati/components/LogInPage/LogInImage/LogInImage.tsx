import { Link } from "@nextui-org/link";
import classNames from "classnames";

import style from "./styleLogInImage.module.css";

import imageFigures from "@/public/imageLogIn.svg";
import { archivo } from "@/config/fonts";
export default function LogInImage() {
  return (
    <section className={classNames(style["section-login__image-wrapper"])}>
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
