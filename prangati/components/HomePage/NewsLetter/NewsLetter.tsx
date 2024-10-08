/* eslint-disable prettier/prettier */
"use client";
import classNames from 'classnames';
import { useState } from 'react';

import style from './styleNewsLetter.module.css';


import { oswald, poppins } from '@/config/fonts';
import InputEmail from '@/components/inputEmail/inputEmail';

export default function NewsLetter() {
  const [value,setValue] = useState("");
  const handleEmail = (data:string) => {
    setValue(data)
  };

  return (
    <div className={classNames(style['section-news'])}>
      <h5
        className={classNames(style['section-news__title'], oswald.className)}
      >
        GET IN THE KNOW
      </h5>
      <p
        className={classNames(
          style['section-news__subtitle'],
          poppins.className
        )}
      >
        Enter your email address to receive the latest articles and promotions
        directly in your inbox.
      </p>
      <div>
        <InputEmail handleValueInput={handleEmail} />
      </div>
    </div>
  );
}
