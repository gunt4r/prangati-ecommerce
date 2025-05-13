import { useState } from "react";
import classNames from "classnames";
import { Link } from "@heroui/link";
import { MdKeyboardArrowRight } from "react-icons/md";

import style from "./styleHeadingSection.module.css";
import HeadingSectionTitle from "./HeadingSectionTitle/HeadingSectionTitle";

import { poppins } from "@/config/fonts";
export default function HeadingSection({
  textHeading,
}: {
  textHeading: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={classNames(style["section-popular__header"])}>
      <HeadingSectionTitle textHeading={textHeading} />
      <Link
        className={classNames(style["section-popular__header-link__wrapper"])}
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
          <MdKeyboardArrowRight
            className={classNames(style["section-popular__header-link__arrow"])}
          />
        </div>
      </Link>
    </div>
  );
}
