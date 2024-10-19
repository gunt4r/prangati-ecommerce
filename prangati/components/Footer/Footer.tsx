import classNames from "classnames";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { Link } from "@nextui-org/link";

import style from "./styleFooter.module.css";

import { poppins, archivo } from "@/config/fonts";

export default function Footer() {
  return (
    <footer className={style["footer"]}>
      <hr className={classNames(style["section-nav__underline"])} />
      <div className={classNames(style["section-footer__wrapper"])}>
        <div className={style["footer-top"]}>
          <div className={style["footer-column"]}>
            <Link href="/">
              {" "}
              <h4
                className={classNames(
                  style["section-footer__heading-columns"],
                  poppins.className,
                )}
              >
                Home
              </h4>
            </Link>{" "}
            <ul>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>
                  Popular Products
                </li>
              </Link>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>Why Us</li>
              </Link>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>Promotions</li>
              </Link>{" "}
            </ul>
          </div>

          <div className={style["footer-column"]}>
            <Link href="/">
              {" "}
              <h4
                className={classNames(
                  style["section-footer__heading-columns"],
                  poppins.className,
                )}
              >
                About
              </h4>
            </Link>{" "}
            <ul>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>Our Vision</li>
              </Link>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>Our Team</li>
              </Link>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>Community</li>
              </Link>{" "}
            </ul>
          </div>

          <div className={style["footer-column"]}>
            <Link href="/">
              {" "}
              <h4
                className={classNames(
                  style["section-footer__heading-columns"],
                  poppins.className,
                )}
              >
                Gadgets
              </h4>
            </Link>{" "}
            <ul>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>All</li>
              </Link>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>Laptops</li>
              </Link>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>Phones</li>
              </Link>{" "}
            </ul>
          </div>

          <div className={style["footer-column"]}>
            <Link href="/">
              {" "}
              <h4
                className={classNames(
                  style["section-footer__heading-columns"],
                  poppins.className,
                )}
              >
                Contacts
              </h4>
            </Link>{" "}
            <ul>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>Call Us</li>
              </Link>
              <Link href="/">
                {" "}
                <li className={classNames(poppins.className)}>Visit Us</li>
              </Link>{" "}
            </ul>
          </div>
        </div>
        <div className={classNames(style["section-footer__logo-wrapper"])}>
          <Link href="/">
            <h4
              className={classNames(
                style["section-footer__logo"],
                archivo.className,
              )}
            >
              Prangati
            </h4>
          </Link>
          <p
            className={classNames(
              style["section-footer__logo-text"],
              poppins.className,
            )}
          >
            Innovation at a click away
          </p>
          <div className={classNames(style["footer-icons"])}>
            <Link
              className={classNames(style["section-footer__icon-wrapper"])}
              href="/"
            >
              {" "}
              <FaTelegramPlane
                className={classNames(style["section-footer__icon"])}
              />
            </Link>
            <Link
              className={classNames(style["section-footer__icon-wrapper"])}
              href="/"
            >
              {" "}
              <FaFacebookF
                className={classNames(style["section-footer__icon"])}
              />
            </Link>
            <Link
              className={classNames(style["section-footer__icon-wrapper"])}
              href="/"
            >
              {" "}
              <FaInstagram
                className={classNames(style["section-footer__icon"])}
              />
            </Link>{" "}
          </div>
        </div>
      </div>
      <hr className={classNames(style["section-footer__underline-bottom"])} />
      <div className={classNames(style["section-footer__bottom"])}>
        <p
          className={classNames(
            style["section-footer__bottom-text"],
            poppins.className,
          )}
        >
          With love for Prangati
        </p>
        <p
          className={classNames(
            style["section-footer__bottom-text"],
            poppins.className,
          )}
        >
          ©2024 HiTech
        </p>
      </div>
    </footer>
  );
}
