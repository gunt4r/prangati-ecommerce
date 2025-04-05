"use client";
import { Input } from "@heroui/react";
import classNames from "classnames";
import { useState, useMemo, ChangeEvent } from "react";

import style from "./styleInputEmailForgot.module.css";

interface InputEmailProps {
  handleValueInput: (value: string) => void;
}

export default function InputEmail({ handleValueInput }: InputEmailProps) {
  const [value, setValue] = useState("");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleValueInput(e.target.value);
  };

  return (
    <div className={classNames(style["section-news__input-wrapper"])}>
      <Input
        className={classNames(
          style["section-news__input"],
          "w-3/5 col-span-12 md:col-span-6 mb-6 md:mb-0",
        )}
        classNames={{
          inputWrapper: "border-default-500 hover:border-default-300",
        }}
        errorMessage="Please enter a valid email"
        isInvalid={isInvalid}
        label="Email"
        size="sm"
        type="email"
        value={value}
        variant="underlined"
        onChange={handleChange}
        onValueChange={setValue}
      />
    </div>
  );
}
