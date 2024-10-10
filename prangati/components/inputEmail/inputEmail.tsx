/* eslint-disable prettier/prettier */
'use client';
import { Input, Button } from '@nextui-org/react';
import classNames from 'classnames';
import { useState, useMemo } from 'react';

import style from "./styleInputEmail.module.css"
export default function InputEmail({handleValueInput}:{ handleValueInput: (data: string) => void; }) {
  const [value, setValue] = useState('');

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === '') return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  const handleEmail = () => {
    handleValueInput(value)
  }

  return (
    <div className={classNames(style["section-news__input-wrapper"])}>
      <Input
        className={classNames(style["section-news__input"],"max-w-xs")}
        errorMessage="Please enter a valid email"
        isInvalid={isInvalid}
        label="Your Email Adress"
        size="sm"
        type="email"
        value={value}
        onValueChange={setValue}
      />
      <Button className={classNames(style["section-news__input-button"])} color="default"   radius='sm' size="lg" variant='flat' onClick={handleEmail} >Subscribe</Button>
    </div>
  );
}
