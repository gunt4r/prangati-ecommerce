import classNames from "classnames";

import style from "./styleLogInPage.module.css";
import LogInForm from "./LogInForm/LogInForm";
import LogInImage from "./LogInImage/LogInImage";
export default function LogInContent() {
  return (
    <section className={classNames(style["section-login"])}>
      <LogInImage />
      <LogInForm />
    </section>
  );
}
