"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/button";
import classNames from "classnames";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import styles from "./styleResetPassword.module.css";

import imageKey from "@/public/keyForgotPassword.svg";
import { archivo, poppins } from "@/config/fonts";

const PasswordResetPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRepeated, setIsVisibleRepeated] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidPasswordMatch, setIsInvalidPasswordMatch] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityRepeated = () =>
    setIsVisibleRepeated(!isVisibleRepeated);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const validatePassword = (value: string) => {
    const hasValidLength = value.length >= 8 && value.length <= 30;
    const hasNumber = /\d/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);

    return hasValidLength && hasNumber && hasUpperCase;
  };
  const isInvalidPasswordCriteria = useMemo(() => {
    return password !== "" && !validatePassword(password);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !repeatedPassword) {
      toast.error("All fields are required.");

      return;
    }

    if (password !== repeatedPassword || isInvalidPasswordCriteria) {
      setIsInvalidPassword(
        password !== repeatedPassword || isInvalidPasswordCriteria,
      );
      toast.error("Please check your inputs.");

      return;
    }

    setIsInvalidPassword(!validatePassword(password));
    setIsInvalidPasswordMatch(password !== repeatedPassword);

    if (isInvalidPassword || isInvalidPasswordMatch) {
      toast.error("Please check your password requirements.");

      return;
    }

    if (!token) {
      toast.error("Invalid or missing token.");

      return;
    }

    if (password !== repeatedPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}password-reset/reset-password`,
        {
          token,
          newPassword: password,
        },
      );

      toast.success("Password has been reset");
      toast.success(response.data.message);
      router.push("/logIn");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
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
          Reset Your Password
        </h2>
        <p
          className={classNames(
            styles["section-forgotPassword__wrapper-subtitle"],
            poppins.className,
          )}
        >
          Enter your new password below to reset your account.{" "}
        </p>
        <Input
          className="w-8/12 mb-6 hover:duration-1000 mx-auto"
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          errorMessage="Password must be 8-30 characters long, contain a number, and an uppercase letter"
          isInvalid={isInvalidPasswordCriteria}
          label="New password"
          type={isVisible ? "text" : "password"}
          value={password}
          variant="underlined"
          onChange={(e) => setPassword(e.target.value)}
          onValueChange={setPassword}
        />
        <Input
          className="w-8/12 mb-6 hover:duration-1000 mx-auto"
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibilityRepeated}
            >
              {isVisibleRepeated ? (
                <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          errorMessage="Passwords do not match"
          isInvalid={isInvalidPasswordMatch}
          label="Confirm New Password"
          type={isVisibleRepeated ? "text" : "password"}
          value={repeatedPassword}
          variant="underlined"
          onChange={(e) => {
            const value = e.target.value;

            setRepeatedPassword(value);
            setIsInvalidPasswordMatch(password !== value);
          }}
        />
        <Button
          className="bg-backgroundColorBlack text-textColorWhite w-5/12 text-md mb-6 mx-auto"
          size="md"
          onClick={handleSubmit}
        >
          Reset password
        </Button>
      </main>
    </div>
  );
};

export default PasswordResetPage;
