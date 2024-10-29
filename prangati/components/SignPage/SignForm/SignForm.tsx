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
import toast, { Toaster } from 'react-hot-toast';

import style from "./styleSignForm.module.css";

import { poppins } from "@/config/fonts";

export default function SignForm() {
  const router = useRouter();
  const [valueFullName, setValueFullname] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [isInvalidFullName, setIsInvalidFullName] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  const isInvalidEmail = useMemo(() => {
    return valueEmail !== "" && !validateEmail(valueEmail);
  }, [valueEmail]);

  const validateFullName = (value: string) => {
    return value.trim().split(" ").length === 2;
  };

  const handleSubmit = async () => {
    if (!valueFullName || !valueEmail || !password || !repeatedPassword) {
      toast.error("All fields are required.");

      return;
    }

    if (
      isInvalidEmail ||
      !validateFullName(valueFullName) ||
      password !== repeatedPassword
    ) {
      setIsInvalidFullName(!validateFullName(valueFullName));
      setIsInvalidPassword(password !== repeatedPassword);
      toast.error("Please check your inputs.");

      return;
    }

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER + "auth/register",
        {
          fullName: valueFullName,
          email: valueEmail,
          password: password,
        },
        { withCredentials: true },
      );

      if (response.status == 201) {
        toast.success("Registration successful!");
        router.push("/");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <section className={classNames(style["section-sign__form"])}>
      <Toaster position="bottom-right" />
      <p
        className={classNames(style["section-sign__title"], poppins.className)}
      >
        Sign Up
      </p>
      <p
        className={classNames(
          style["section-sign__subtitle"],
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
        errorMessage="Please enter your full name"
        isInvalid={isInvalidFullName}
        label="Full name"
        name="firstName"
        type="text"
        value={valueFullName}
        variant="underlined"
        onChange={(e) => setValueFullname(e.target.value)}
      />{" "}
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
        label="Re-enter password"
        type={isVisible ? "text" : "password"}
        value={repeatedPassword}
        variant="underlined"
        onChange={(e) => setRepeatedPassword(e.target.value)}
        onValueChange={setRepeatedPassword}
      />
      <Checkbox
        className="w-10/12 mb-12"
        classNames={{
          wrapper: "mr-6",
        }}
        color="default"
      >
        <p className="text-sm">
          I’ve read and agree with Terms of Service and our Privacy Policy
        </p>
      </Checkbox>
      <Button
        className="bg-backgroundColorBlack text-textColorWhite w-6/12 text-lg mb-6"
        size="md"
        onClick={handleSubmit}
      >
        Sign up
      </Button>
      <p className="text-xl mb-6">OR</p>
      <Button
        className="bg-textColorWhite text-lg mb-6"
        size="lg"
        variant="bordered"
      >
        <FaGoogle /> Sign up with Google
      </Button>
      <p className="mb-6">
        Already have an account?{" "}
        <Link
          className="ml-4 text-black font-bold cursor-pointer"
          href="/logIn"
        >
          Log in
        </Link>
      </p>
    </section>
  );
}
