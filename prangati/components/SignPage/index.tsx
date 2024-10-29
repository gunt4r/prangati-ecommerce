import classNames from "classnames";

import style from "./styleSignPage.module.css";
import SignForm from "./SignForm/SignForm";
import SignImage from "./SignImage/signImage";
export default function SignInContent() {
  return (
    <section className={classNames(style["section-sign"])}>
      <SignForm />
      <SignImage />
    </section>
  );
}
