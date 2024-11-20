"use client";
import classNames from "classnames";
import { useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";

import style from "./styleNewsLetter.module.css";

import { oswald, poppins } from "@/config/fonts";
import InputEmail from "@/components/HomePage/NewsLetter/inputEmail/inputEmail";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleEmail = (data: string) => {
    setEmail(data);
  };

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter a valid email");

      return;
    }

    let subject, body;

    if (Cookies.get("language") == "En") {
      subject = "Thank You for Subscribing to Our Newsletter!";
      body =
        "Get Ready! Exciting News, Exclusive Offers, and the Latest Updates Are Coming to Your Inbox!";
    } else if (Cookies.get("language") == "Ru") {
      subject = "Спасибо за подписку на нашу рассылку!";
      body =
        "Готовьтесь! Увлекательные новости, эксклюзивные предложения и свежие обновления ждут вас в почте!";
    } else {
      subject = "Mulțumim pentru abonarea la newsletter-ul nostru!";
      body =
        "Pregătește-te! Știri interesante, oferte exclusive și cele mai noi actualizări îți vor ajunge în inbox!";
    }

    const data = { email, subject, body };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}newsletter/send`,
        data,
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error sending data:", error);
    }
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
          <InputEmail
            handleSubmit={handleSubmit}
            handleValueInput={handleEmail}
          />
        </div>
      </div>
    </motion.div>
  );
}
