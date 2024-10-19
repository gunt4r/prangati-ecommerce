import { useState } from "react";
import classNames from "classnames";
import { Link } from "@nextui-org/link";
import { MdKeyboardArrowRight } from "react-icons/md";

import style from "./styleHeadingSection.module.css";

import { oswald, poppins } from "@/config/fonts";

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
      <h5
        className={classNames(
          style["section-popular__title"],
          oswald.className,
        )}
      >
        {textHeading}
      </h5>
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
