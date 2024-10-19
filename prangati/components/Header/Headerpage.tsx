/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";
import classNames from "classnames";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  IoCartOutline,
  IoCloseOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { SlMenu } from "react-icons/sl";
import { IoMdHeartEmpty } from "react-icons/io";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { motion } from "framer-motion";
import { Around } from "@theme-toggles/react";

import Dropdownlanguage from "./dropdownLanguage/dropdownLanguage";
import style from "./styleHeader.module.css";
import SearchBar from "./SearchBar/SearchBar";
import DropdownUser from "./dropdownUser/dropdownUser";

import { poppins, archivo } from "@/config/fonts";

function Header() {
  const { t } = useTranslation();
  const API_PRODUCT = `${process.env.NEXT_PUBLIC_API_PRODUCT}`;
  const [showSearch, setShowSearch] = useState(false);
  const [inputDetails, setInputDetails] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const animateLink =
    "relative text-base w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-black after:w-full after:rounded-full after:transition-all after:duration-500  after:bottom-[-0.5rem] after:translate-y-[0.5rem] after:scale-x-0 hover:after:scale-x-100 hover:after:translate-y-[1.35rem]";
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setShowSearch(false);
    }
  };
  const handleInput = (value: string) => {
    setInputDetails(value);
  };

  useEffect(() => {
    HandleSearch();
  }, [inputDetails]);

  const HandleSearch = async () => {
    try {
      const response = await axios.get(API_PRODUCT, {
        params: {
          title: inputDetails,
        },
      });

      setShowSearch(true);
      setSearchResults(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  interface ListItems {
    id: string;
    title: string;
    price: number;
    images: string[];
  }
  const HandleMenu = () => {
    setShowMenuMobile(!showMenuMobile);
  };

  const motionWishIcon = {
    hover: {
      scale: 1.3,
      color: "#80171A",
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeIn",
      },
    },
  };

  const motionCartIcon = {
    hover: {
      scale: 1.3,
      color: "#10387A",
      transition: {
        duration: 0.5,
        type: "tween",
        ease: "easeIn",
      },
    },
  };

  return (
    <div
      ref={searchRef}
      className={classNames(style["section-nav__header"], poppins.className)}
    >
      {showMenuMobile && (
        <div className={classNames(style["section-nav__menu-medium"])}>
          <button
            className={classNames(style["section-nav__menu-medium__button"])}
            onClick={HandleMenu}
          >
            <IoCloseOutline
              className={classNames(
                style["section-nav__menu-medium__button-icon"],
              )}
            />
          </button>
        </div>
      )}

      <Link className={classNames(style["section-nav__logo"])} href="/">
        <div className={classNames(style["section-nav__logo-wrapper"])}>
          <p
            className={classNames(
              style["section-nav__logo-text"],
              archivo.className,
            )}
          >
            PRANGATI
          </p>
        </div>
      </Link>
      <section
        className={classNames(style["section-nav"])}
        color="backgroundColor"
      >
        <div className={classNames(style["section-nav__utils"])}>
          <Around duration={750} style={{ marginRight: "15px" }} />
          <Dropdownlanguage />
        </div>
        <ul className={classNames(style["section-nav__menu"])}>
          <li className={classNames(style["section-nav__menu-item"])}>
            <Link
              className={classNames(
                style["section-nav__menu-item-link"],
                animateLink,
              )}
              href="/"
            >
              {" "}
              Home
            </Link>
          </li>
          <li className={classNames(style["section-nav__menu-item"])}>
            <Link
              className={classNames(
                style["section-nav__menu-item-link"],
                animateLink,
              )}
              href="/about"
            >
              {" "}
              About
            </Link>
          </li>
          <li className={classNames(style["section-nav__menu-item"])}>
            <Link
              className={classNames(
                style["section-nav__menu-item-link"],
                animateLink,
              )}
              href="/"
            >
              {" "}
              Gadgets
            </Link>
          </li>
          <li className={classNames(style["section-nav__menu-item"])}>
            <Link
              className={classNames(
                style["section-nav__menu-item-link"],
                animateLink,
              )}
              href="/"
            >
              {" "}
              Contacts
            </Link>
          </li>
        </ul>
        <div
          className={classNames(
            style["section-nav__helpers-search"],
            style["section-nav__helpers-search-medium"],
          )}
        >
          <SearchBar handleSearch={handleInput} />
        </div>
        <section className={classNames(style["section-nav__helpers"])}>
          <motion.div
            className={classNames(style["section-nav__helpers-search-wrapper"])}
            whileHover={{
              x: 5,
              rotate: 0,
            }}
          >
            <label
              className={classNames(style["section-nav__helpers-search-label"])}
              htmlFor="search"
            >
              <IoSearchOutline className={classNames("text-black text-xl")} />
            </label>
            <div className={classNames(style["section-nav__helpers-search"])}>
              <input
                className={classNames(
                  style["section-nav__helpers-search-input"],
                )}
                id="search"
                name="search"
                placeholder={t("search")}
                type="text"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const { value } = e.currentTarget;

                  setInputDetails(value);
                }}
              />
            </div>
          </motion.div>
          <motion.div
            className={classNames(style["section-nav__helpers-icon"])}
            style={{ color: "#000" }}
            variants={motionWishIcon}
            whileHover="hover"
          >
            <Link href="/wishlist">
              <IoMdHeartEmpty
                className={classNames(
                  style["section-nav__helpers-desire-icon"],
                )}
                style={{ color: "inherit" }}
              />
            </Link>
          </motion.div>
          <motion.div
            className={classNames(style["section-nav__helpers-icon"])}
            style={{ color: "#000" }}
            variants={motionCartIcon}
            whileHover="hover"
          >
            <Link href="/cart">
              <IoCartOutline
                className={classNames(style["section-nav__helpers-cart-icon"])}
                style={{ color: "inherit" }}
              />
            </Link>
          </motion.div>
          <DropdownUser />
          <button onClick={HandleMenu}>
            {" "}
            <SlMenu
              className={classNames(
                style["section-nav__helpers-menu-icon"],
                "text-black",
              )}
            />
          </button>
        </section>
        {showSearch && (
          <div className={classNames(style["section-nav__search-results"])}>
            <ul className={classNames(style["section-nav__search-list"])}>
              <ScrollShadow className="w-[700px] h-[300px]">
                {searchResults.map((item: ListItems) => {
                  const { id, title, images, price } = item;

                  if (images.length === 0) return "";
                  if (inputDetails === "") {
                    setSearchResults([]);
                    setShowSearch(false);
                  }

                  return (
                    <li key={id}>
                      <img alt="" src={images[0]} />{" "}
                      <div
                        className={classNames(
                          style["section-nav__search-results-description"],
                        )}
                      >
                        <h5>{title}</h5> <p>{price}$</p>
                      </div>
                    </li>
                  );
                })}
              </ScrollShadow>
            </ul>
          </div>
        )}
      </section>
      <hr className={classNames(style["section-nav__underline"])} />
    </div>
  );
}

export default Header;
