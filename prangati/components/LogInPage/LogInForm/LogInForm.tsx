"use client";
import axios from "axios";
import classNames from "classnames";
import { Checkbox, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import style from "./styleLogInForm.module.css";

import { poppins } from "@/config/fonts";

export default function LogInForm() {
  const router = useRouter();
  const [valueEmail, setValueEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  const isInvalidEmail = useMemo(() => {
    return valueEmail !== "" && !validateEmail(valueEmail);
  }, [valueEmail]);

  const handleSubmit = async () => {
    if (!valueEmail || !password) {
      toast.error("All fields are required.");

      return;
    }

    if (isInvalidEmail) {
      toast.error("Please check your inputs.");

      return;
    }

    if (!isSelected) {
      toast.error("You have to check the privacy policy");

      return;
    }

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER + "auth/login",
        {
          email: valueEmail,
          password: password,
        },
        { withCredentials: true },
      );

      if (response.status == 201) {
        toast.success("Authentication is successful!");
        const { token } = response.data;

        localStorage.setItem("token", token);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <section className={classNames(style["section-login__form"])}>
      <Toaster position="bottom-right" />
      <p
        className={classNames(style["section-login__title"], poppins.className)}
      >
        Welcome back!
      </p>
      <p
        className={classNames(
          style["section-login__subtitle"],
          poppins.className,
        )}
      >
        Please enter your details
      </p>
      <Input
        className="w-10/12 mb-6 hover:duration-1000"
        classNames={{
          inputWrapper: "border-default-500 hover:border-default-300",
        }}
        errorMessage="Please enter a valid email"
        isInvalid={isInvalidEmail}
        label="Email"
        size="sm"
        type="email"
        value={valueEmail}
        variant="underlined"
        onChange={(e) => setValueEmail(e.target.value)}
        onValueChange={setValueEmail}
      />
      <Input
        className="w-10/12 mb-6 hover:duration-1000"
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
        errorMessage="Passwords do not match"
        isInvalid={isInvalidPassword}
        label="Password"
        type={isVisible ? "text" : "password"}
        value={password}
        variant="underlined"
        onChange={(e) => setPassword(e.target.value)}
        onValueChange={setPassword}
      />
      <section className="flex items-center justify-between w-10/12  mb-12">
        <Checkbox
          className="w-10/12"
          classNames={{
            wrapper: "mr-6",
          }}
          color="default"
          isSelected={isSelected}
          onValueChange={setIsSelected}
        >
          <p className="text-sm">I Agree to Privacy Policy</p>
        </Checkbox>
        <Link
          className={classNames(
            style["section-login__bottom-forgot"],
            poppins.className,
          )}
          href="/forgot-password"
        >
          Forgot password?
        </Link>
      </section>
      <Button
        className="bg-backgroundColorBlack text-textColorWhite w-6/12 text-lg mb-3"
        size="md"
        onClick={handleSubmit}
      >
        Log in
      </Button>
      <Button
        className="bg-textColorWhite text-lg mb-6"
        size="lg"
        variant="bordered"
      >
        <FaGoogle /> Sign up with Google
      </Button>
      <p className="mb-12">
        Don’t have an account?
        <Link
          className="ml-1 text-black font-bold cursor-pointer"
          href="/signIn"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
}
