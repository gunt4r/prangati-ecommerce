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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

import style from "./styleLogInForm.module.css";

import { poppins } from "@/config/fonts";

export default function LogInForm() {
  const router = useRouter();
  const [valueEmail, setValueEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
          <p className="text-sm">
            I Agree to{" "}
            <Button
              className="bg-transparent border-none py-0 px-4 pl-3.5"
              onPress={onOpen}
            >
              <p className={style["section-login__privacy"]}>Privacy Policy</p>
            </Button>
          </p>
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
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="inside"
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  At Prangati, we value and respect the privacy of our visitors
                  and customers. This Privacy Policy explains how we collect,
                  use, and protect your personal information when you visit our
                  website and make purchases. 1. Information We Collect We
                  collect the following types of information when you visit our
                  website: Personal Information: This includes your name, email
                  address, shipping address, phone number, and payment
                  information. We collect this information when you make a
                  purchase, subscribe to our newsletter, or create an account.
                  Non-Personal Information: This includes data such as your IP
                  address, browser type, device type, and browsing behavior on
                  our website. We collect this automatically through cookies and
                  other tracking technologies. 2. How We Use Your Information We
                  use your information for the following purposes: To process
                  and fulfill orders, including shipping and customer support.
                  To send promotional emails, newsletters, or product updates,
                  if you have opted in. To improve our website, products, and
                  services by analyzing customer behavior and preferences. To
                  comply with legal obligations and resolve disputes. 3. Sharing
                  Your Information We do not sell, rent, or trade your personal
                  information to third parties. However, we may share your
                  information with trusted third-party service providers who
                  help us run our business, such as: Payment processors (e.g.,
                  credit card companies) Shipping companies (e.g., FedEx, UPS)
                  Email marketing providers Analytics services (e.g., Google
                  Analytics) These service providers have access to your
                  information only as needed to perform their services and are
                  obligated to protect your data. 4. Cookies and Tracking
                  Technologies We use cookies to enhance your browsing
                  experience, analyze website usage, and personalize content.
                  You can control cookie settings in your browser, but please
                  note that disabling cookies may affect your ability to use
                  some features of our website. 5. Data Security We implement
                  security measures to protect your personal information from
                  unauthorized access, alteration, or disclosure. However, no
                  data transmission over the internet is completely secure, so
                  we cannot guarantee 100% security. 6. Your Rights Depending on
                  your location and applicable laws, you may have the right to:
                  Access and correct your personal data. Request the deletion of
                  your personal data. Opt out of marketing communications. To
                  exercise these rights, please contact us at email. 7.
                  Third-Party Links Our website may contain links to external
                  websites that are not operated by us. We are not responsible
                  for the content or privacy practices of these third-party
                  sites. 8. Children&apos;s Privacy Our website is not intended
                  for children under the age of 13. We do not knowingly collect
                  personal information from children. If we become aware that we
                  have collected personal information from a child, we will take
                  steps to delete that information. 9. Changes to This Privacy
                  Policy We reserve the right to update or modify this Privacy
                  Policy at any time. Any changes will be posted on this page
                  with an updated effective date. We encourage you to review
                  this policy periodically to stay informed about how we protect
                  your information.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
