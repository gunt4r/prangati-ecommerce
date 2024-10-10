/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  IoCartOutline,
  IoCloseOutline,
  IoSearchOutline,
} from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';
import { SlMenu } from 'react-icons/sl';
import { IoMdHeartEmpty } from 'react-icons/io';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { motion } from 'framer-motion';
import { Around } from '@theme-toggles/react';

import Dropdownlanguage from './dropdownLanguage/dropdownLanguage';
import style from './styleHeader.module.css';
import SearchBar from './SearchBar/SearchBar';

import animateLink from '@/utils/animateLink.ts';
import { poppins } from '@/config/fonts';

function Header() {
  const { t } = useTranslation();
  const API_PRODUCT = `${process.env.NEXT_PUBLIC_API_PRODUCT}`;
  const [showSearch, setShowSearch] = useState(false);
  const [inputDetails, setInputDetails] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  return (
    <div
      ref={searchRef}
      className={classNames(style['section-nav__header'], poppins.className)}
    >
      {showMenuMobile && (
        <div className={classNames(style['section-nav__menu-medium'])}>
          <button
            className={classNames(style['section-nav__menu-medium__button'])}
            onClick={HandleMenu}
          >
            <IoCloseOutline
              className={classNames(
                style['section-nav__menu-medium__button-icon']
              )}
            />
          </button>
        </div>
      )}

      <Link className={classNames(style['section-nav__logo'])} href="/">
        <div className={classNames(style['section-nav__logo-wrapper'])}>
          <p className={classNames(style['section-nav__logo-text'])}>
            PRANGATI
          </p>
        </div>
      </Link>
      <section
        className={classNames(style['section-nav'])}
        color="backgroundColor"
      >
        <div className={classNames(style['section-nav__utils'])}>
          <Around duration={750} style={{marginRight:"15px"}} />
          <Dropdownlanguage />
        </div>
        <ul className={classNames(style['section-nav__menu'])}>
          <li className={classNames(style['section-nav__menu-item'])}>
            <Link
              className={classNames(
                style['section-nav__menu-item-link'],
                animateLink
              )}
              href="/"
            >
              {' '}
              Home
            </Link>
          </li>
          <li className={classNames(style['section-nav__menu-item'])}>
            <Link
              className={classNames(
                style['section-nav__menu-item-link'],
                animateLink
              )}
              href="/about"
            >
              {' '}
              About
            </Link>
          </li>
          <li className={classNames(style['section-nav__menu-item'])}>
            <Link
              className={classNames(
                style['section-nav__menu-item-link'],
                animateLink
              )}
              href="/"
            >
              {' '}
              Gadgets
            </Link>
          </li>
          <li className={classNames(style['section-nav__menu-item'])}>
            <Link
              className={classNames(
                style['section-nav__menu-item-link'],
                animateLink
              )}
              href="/"
            >
              {' '}
              Contacts
            </Link>
          </li>
        </ul>
        <div
          className={classNames(
            style['section-nav__helpers-search'],
            style['section-nav__helpers-search-medium']
          )}
        >
          <SearchBar handleSearch={handleInput} />
        </div>
        <section className={classNames(style['section-nav__helpers'])}>
          <motion.div
            className={classNames(style['section-nav__helpers-search-wrapper'])}
            whileHover={{
              x: 5,
              rotate: 0,
            }}
          >
            <label
              className={classNames(style['section-nav__helpers-search-label'])}
              htmlFor="search"
            >
              <IoSearchOutline className={classNames('text-black text-xl')} />
            </label>
            <div className={classNames(style['section-nav__helpers-search'])}>
              <input
                className={classNames(
                  style['section-nav__helpers-search-input']
                )}
                id="search"
                name="search"
                placeholder={t('search')}
                type="text"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const { value } = e.currentTarget;

                  setInputDetails(value);
                }}
              />
            </div>
          </motion.div>
          <Link
            className={classNames(style['section-nav__helpers-icon'])}
            href="/"
          >
            <IoMdHeartEmpty
              className={classNames(
                style['section-nav__helpers-desire-icon'],
                'text-black'
              )}
            />
          </Link>
          <Link
            className={classNames(style['section-nav__helpers-icon'])}
            href="/"
          >
            <IoCartOutline
              className={classNames(
                style['section-nav__helpers-cart-icon'],
                'text-black'
              )}
            />
          </Link>
          <Link
            className={classNames(style['section-nav__helpers-icon'])}
            href=""
          >
            {' '}
            <BiUser className="text-2xl" />
          </Link>
          <button onClick={HandleMenu}>
            {' '}
            <SlMenu
              className={classNames(
                style['section-nav__helpers-menu-icon'],
                'text-black'
              )}
            />
          </button>
        </section>
        {showSearch && (
          <div className={classNames(style['section-nav__search-results'])}>
            <ul className={classNames(style['section-nav__search-list'])}>
              <ScrollShadow className="w-[700px] h-[300px]">
                {searchResults.map((item: ListItems) => {
                  const { id, title, images, price } = item;

                  if (images.length === 0) return '';
                  if (inputDetails === '') {
                    setSearchResults([]);
                    setShowSearch(false);
                  }

                  return (
                    <li key={id}>
                      <img alt="" src={images[0]} />{' '}
                      <div
                        className={classNames(
                          style['section-nav__search-results-description']
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
      <hr className={classNames(style['section-nav__underline'])} />
    </div>
  );
}

export default Header;
