import classNames from "classnames";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import style from "./styleContactForm.module.css";

import { archivo, poppins } from "@/config/fonts";

interface fieldsContact {
  firstName: string;
  lastName: string;
  subject: string;
  body: string;
}

interface InputEmailProps {
  handleInputs: (
    data: fieldsContact | ((prev: fieldsContact) => fieldsContact),
  ) => void;
  handleSubmit: () => void;
}

export default function ContactForm({
  handleInputs,
  handleSubmit,
}: InputEmailProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    handleInputs((prev: fieldsContact) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className={classNames(style["section-contacts__form"])}>
      {" "}
      <section className={classNames(style["section-contacts__form-top"])}>
        {" "}
        <p
          className={classNames(
            style["section-contacts__form-top-title"],
            archivo.className,
          )}
        >
          say hello.{" "}
        </p>{" "}
        <p
          className={classNames(
            style["section-contacts__form-top-subtitle"],
            archivo.className,
          )}
        >
          Reach out and say hello—let&apos;s connect and explore how we can
          bring your ideas to life!{" "}
        </p>{" "}
      </section>{" "}
      <section className={classNames(style["section-contacts__form-body"])}>
        {" "}
        <section
          className={classNames(style["section-contacts__form-body-top"])}
        >
          {" "}
          <Input
            className="w-5/12 hover:duration-1000"
            classNames={{
              inputWrapper: "border-default-500 hover:border-default-300",
            }}
            label="FIRST NAME"
            name="firstName"
            type="text"
            variant="underlined"
            onChange={handleChange}
          />{" "}
          <Input
            className="w-5/12"
            classNames={{
              inputWrapper: "border-default-500 hover:border-default-300",
            }}
            label="LAST NAME"
            name="lastName"
            type="text"
            variant="underlined"
            onChange={handleChange}
          />{" "}
        </section>{" "}
        <Input
          className="mb-6"
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          label="MESSAGE SUBJECT"
          name="subject"
          type="text"
          variant="underlined"
          onChange={handleChange}
        />{" "}
        <Textarea
          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          classNames={{
            inputWrapper: "border-default-500 hover:border-default-300",
          }}
          label="MESSAGE"
          name="body"
          variant="underlined"
          onChange={handleChange}
        />{" "}
      </section>{" "}
      <Button
        className={`bg-default-900 mt-12 text-default-50 w-28 ${poppins.className}`}
        color="default"
        radius="full"
        size="md"
        variant="flat"
        onClick={handleSubmit}
      >
        Send{" "}
      </Button>{" "}
    </section>
  );
}
