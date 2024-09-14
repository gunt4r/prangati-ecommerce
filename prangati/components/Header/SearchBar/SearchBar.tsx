/* eslint-disable jsx-a11y/label-has-associated-control *//* eslint-disable prettier/prettier */
import classNames from "classnames";
import { IoSearchOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

import style from "../styleHeader.module.css";

const SearchBar = ({
  handleSearch,
}: {
  handleSearch: (searchValue: string) => void;
}) => {
  const { t } = useTranslation();
  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    handleSearch(e.currentTarget.value);
  };

  return (
    <>
      <input
        className={classNames(style["section-nav__helpers-search-input"])}
        id="search"
        name="search"
        placeholder={t("search")}
        type="text"
        onInput={(e) => {
          handleChangeSearch(e);
        }}
      />{" "}
      <label
        className={classNames(
          style["section-nav__helpers-search-label"],
          "w-4",
        )}
        htmlFor="search"
      >
        <IoSearchOutline
          className={classNames("text-black")}
          size={16}
          style={{ fill: "black" }}
        />
      </label>
    </>
  );
};

export default SearchBar;
