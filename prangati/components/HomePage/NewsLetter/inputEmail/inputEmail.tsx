"use client";
import { Input, Button } from "@heroui/react";
import classNames from "classnames";
import { useState, useMemo, ChangeEvent } from "react";

interface InputEmailProps {
  handleValueInput: (value: string) => void;
  handleSubmit: () => void;
}

import style from "./styleInputEmail.module.css";
export default function InputEmail({
  handleValueInput,
  handleSubmit,
}: InputEmailProps) {
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

  const handleClick = () => {
    handleSubmit();
  };

  return (
    <div className={classNames(style["section-news__input-wrapper"])}>
      <Input
        className={classNames(style["section-news__input"], "max-w-xs")}
        errorMessage="Please enter a valid email"
        isInvalid={isInvalid}
        label="Your Email Adress"
        size="sm"
        type="email"
        value={value}
        onChange={handleChange}
        onValueChange={setValue}
      />
      <Button
        className={classNames(style["section-news__input-button"])}
        color="default"
        radius="sm"
        size="lg"
        variant="flat"
        onPress={handleClick}
      >
        Subscribe
      </Button>
    </div>
  );
}
