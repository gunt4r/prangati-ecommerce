/* eslint-disable no-console */
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
import { ScrollShadow } from "@heroui/scroll-shadow";
import { motion, Variants } from "framer-motion";
import { Around } from "@theme-toggles/react";

import Container from "../Container/Container";

import Dropdownlanguage from "./dropdownLanguage/dropdownLanguage";
import SearchBar from "./SearchBar/SearchBar";
import DropdownUser from "./dropdownUser/dropdownUser";

// import { animateLink } from "@/utils/animateLink";
import { Product } from "@/config/interfaces";
import { poppins, archivo } from "@/config/fonts";

function Header({
  styleNav,
  styleLine,
}: {
  styleNav?: { [key: string]: string };
  styleLine?: { [key: string]: string };
}) {
  const { t } = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const [inputDetails, setInputDetails] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
    if (inputDetails === "") {
      setSearchResults([]);
      setShowSearch(false);
    } else {
      handleSearch();
    }
  }, [inputDetails]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}product/search`,
        {
          params: {
            query: inputDetails,
          },
        },
      );

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

  const HandleMenu = () => {
    setShowMenuMobile(!showMenuMobile);
  };

  const motionWishIcon: Variants = {
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

  const motionCartIcon: Variants = {
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
  const animateLink =
    "relative text-base w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-black after:w-full after:rounded-full after:transition-all after:duration-500  after:bottom-[-0.5rem] after:translate-y-[0.5rem] after:scale-x-0 hover:after:scale-x-100 hover:after:translate-y-[1.35rem]";

  return (
    <header ref={searchRef} className={`section-nav__header ${poppins.className}`}>
      <Container>
        {showMenuMobile && (
          <div className="section-nav__menu-medium">
            <button
              className="section-nav__menu-medium__button"
              onClick={HandleMenu}
            >
              <IoCloseOutline className="section-nav__menu-medium__button-icon" />
            </button>
          </div>
        )}

        <Link className="section-nav__logo" href="/">
          <div className="section-nav__logo-wrapper">
            <p
              className={`section-nav__logo-text
             ${archivo.className}
              `}
            >
              PRANGATI
            </p>
          </div>
        </Link>
        <section
          className="section-nav"
          color="backgroundColor"
          style={{ ...styleNav }}
        >
          <div className="section-nav__utils">
            <Around
              duration={750}
              placeholder={undefined}
              style={{ marginRight: "15px" }}
              // onPointerEnterCapture={() => console.log("entered")}
              // onPointerLeaveCapture={() => console.log("left")}
            />
            <Dropdownlanguage />
          </div>
          <ul className="section-nav__menu">
            <li className="section-nav__menu-item">
              <Link
                className={`section-nav__menu-item-link 
                  ${animateLink}
                `}
                href="/"
              >
                {" "}
                Home
              </Link>
            </li>
            <li className="section-nav__menu-item">
              <Link
                className={`section-nav__menu-item-link
                  ${animateLink}
                `}
                href="/about"
              >
                {" "}
                About
              </Link>
            </li>
            <li className="section-nav__menu-item">
              <Link
                className={`section-nav__menu-item-link
                  ${animateLink}
                `}
                href="/products"
              >
                {" "}
                Shoes
              </Link>
            </li>
            <li className="section-nav__menu-item">
              <Link
                className={`section-nav__menu-item-link
                  ${animateLink}
                `}
                href="/contacts"
              >
                {" "}
                Contacts
              </Link>
            </li>
          </ul>
          <div className="section-nav__helpers-search section-nav__helpers-search-medium">
            <SearchBar handleSearch={handleInput} />
          </div>
          <section className="section-nav__helpers">
            <motion.div
              className="section-nav__helpers-search-wrapper"
              whileHover={{
                x: 5,
                rotate: 0,
              }}
            >
              <label
                className={`section-nav__helpers-search-label
                `}
                htmlFor="search"
              >
                <IoSearchOutline className={classNames("text-black text-xl")} />
              </label>
              <div className="section-nav__helpers-search">
                <input
                  className="section-nav__helpers-search-input"
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
              className="section-nav__helpers-icon"
              style={{ color: "#000" }}
              variants={motionWishIcon}
              whileHover="hover"
            >
              <Link href="/wishlist">
                <IoMdHeartEmpty
                  className="section-nav__helpers-desire-icon"
                  style={{ color: "inherit" }}
                />
              </Link>
            </motion.div>
            <motion.div
              className="section-nav__helpers-icon"
              style={{ color: "#000" }}
              variants={motionCartIcon}
              whileHover="hover"
            >
              <Link href="/cart">
                <IoCartOutline
                  className="section-nav__helpers-cart-icon"
                  style={{ color: "inherit" }}
                />
              </Link>
            </motion.div>
            <DropdownUser />
            <button onClick={HandleMenu}>
              {" "}
              <SlMenu className={`section-nav__helpers-menu-icon text-black`} />
            </button>
          </section>
          {showSearch && (
            <div className="section-nav__search-results">
              <ul className="section-nav__search-list">
                <ScrollShadow className="w-[700px] h-[300px]">
                  {searchResults.length > 0 &&
                    searchResults.map((item: Product) => {
                      const { id, name, price } = item;

                      return (
                        <li key={id}>
                          {/* <img alt="" src={images[0]} />{" "} */}
                          <div className="section-nav__search-results-description">
                            <h5>{name}</h5> <p>{price}$</p>
                          </div>
                        </li>
                      );
                    })}
                </ScrollShadow>
              </ul>
            </div>
          )}
        </section>
        <hr className="section-nav__underline" style={{ ...styleLine }} />
      </Container>
    </header>
  );
}

export default Header;
