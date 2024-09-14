/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import "./styleTheme.module.css";

const ThemeToggleButton = ({
  isDark,
  onChange,
  invertedIconLogic = false,
}): JSX.Element => (
  <label
    className={`wrapper-button ${isDark ? "IsDark" : "IsLight"}`}
    htmlFor="theme-toggle"
  >
    <input
    id="theme-toggle"
      defaultChecked={invertedIconLogic ? !isDark : isDark}
      type="checkbox"
      onChange={onChange}
    />
    <div />
  </label>
);

export default ThemeToggleButton;
