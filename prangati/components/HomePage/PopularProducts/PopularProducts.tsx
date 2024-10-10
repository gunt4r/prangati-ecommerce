"use client";
import { useState } from "react";
import classNames from "classnames";
import { Link } from "@nextui-org/link";
import { FaArrowRightLong } from "react-icons/fa6";

import style from "./stylePopularProducts.module.css";

import { oswald, poppins } from "@/config/fonts";

export default function PopularProducts() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className={classNames(style["section-popular"])}>
      <section className={classNames(style["section-popular__content"])}>
        <div className={classNames(style["section-popular__header"])}>
          <h5
            className={classNames(
              style["section-popular__title"],
              oswald.className,
            )}
          >
            POPULAR PRODUCTS
          </h5>
          <Link
            className={classNames(
              style["section-popular__header-link__wrapper"],
            )}
            href="/"
          >
            <div
              className={classNames(
                style["section-popular__header-link"],
                poppins.className,
                isHovered ? style["hovered"] : style["unhovered"],
              )}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              See More{" "}
              <FaArrowRightLong
                className={classNames(
                  style["section-popular__header-link__arrow"],
                )}
              />
            </div>
          </Link>
        </div>
        <p
          className={classNames(
            style["section-popular__subtitle"],
            poppins.className,
          )}
        >
          This beloved product has become a favorite among our customers for its
          exceptional features and unparalleled performance
        </p>
      </section>
    </section>
  );
}
