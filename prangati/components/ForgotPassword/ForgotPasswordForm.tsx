/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { FaArrowLeft } from "react-icons/fa6";
import classNames from "classnames";

import styles from "./styleForgotPassword.module.css";
import InputEmailForgot from "./InputEmailForgot/InputEmailForgot";

import { api } from "@/api/api";
import { archivo, poppins } from "@/config/fonts";
import imageKey from "@/public/keyForgotPassword.svg";
const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const handleEmail = (data: string) => {
    setEmail(data);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    if (!email) {
      toast.error("Please enter a valid email");

      return;
    }

    e.preventDefault();

    try {
      const response = await api.post(`/password-reset/forgot-password`, {
        email,
      });

      toast.success(response.data.message || "Link has been sent to your emal");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div
      className={classNames(
        styles["section-forgotPassword"],
        "bg-backgroundColor",
      )}
    >
      <Link className={classNames(styles["section-nav__logo"])} href="/">
        <p
          className={classNames(
            styles["section-nav__logo-text"],
            archivo.className,
            "text-black",
          )}
        >
          PRANGATI
        </p>
      </Link>
      <main
        className={classNames(
          styles["section-forgotPassword__wrapper"],
          "bg-backgroundColorWhite",
        )}
      >
        <img
          alt="Key"
          className={classNames(styles["section-forgotPassword__image"])}
          src={imageKey.src}
        />
        <h2
          className={classNames(
            styles["section-forgotPassword__wrapper-title"],
            poppins.className,
          )}
        >
          Forgot Password
        </h2>
        <p
          className={classNames(
            styles["section-forgotPassword__wrapper-subtitle"],
            poppins.className,
          )}
        >
          No worries, we’ll send you reset instructions.
        </p>

        <InputEmailForgot handleValueInput={handleEmail} />
        <Button
          className="bg-backgroundColorBlack text-textColorWhite w-5/12 text-md mb-6 mx-auto"
          size="md"
          onPress={() => handleSubmit}
        >
          Reset password
        </Button>
        <Link className="text-black mt-12 mx-auto mb-6" href="/logIn">
          <FaArrowLeft className="mr-3" /> Back to Log in
        </Link>
      </main>
    </div>
  );
};

export default ForgotPasswordForm;
