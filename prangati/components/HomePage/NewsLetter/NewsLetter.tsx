"use client";
import classNames from "classnames";
import { useState } from "react";
import { motion } from "framer-motion";

import style from "./styleNewsLetter.module.css";

import { oswald, poppins } from "@/config/fonts";
import InputEmail from "@/components/inputEmail/inputEmail";

export default function NewsLetter() {
  const [value, setValue] = useState("");
  const handleEmail = (data: string) => {
    setValue(data);
  };

  const motionBackground = {
    hover: {
      backgroundColor: "rgb(244, 244, 245)",
    },
  };
  const motionElements = {
    hover: {
      y: 10,
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
      className={classNames(style["section-news"])}
      initial={false}
      variants={motionBackground}
      whileHover="hover"
    >
      <div className={classNames(style["section-news__wrapper"])}>
        <motion.h5
          className={classNames(style["section-news__title"], oswald.className)}
          variants={motionElements}
        >
          GET IN THE KNOW
        </motion.h5>
        <motion.p
          className={classNames(
            style["section-news__subtitle"],
            poppins.className,
          )}
          variants={motionElements}
        >
          Enter your email address to receive the latest articles and promotions
          directly in your inbox.
        </motion.p>
        <div>
          <InputEmail handleValueInput={handleEmail} />
        </div>
      </div>
    </motion.div>
  );
}
