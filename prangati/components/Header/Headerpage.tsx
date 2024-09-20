/* eslint-disable prettier/prettier */
'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  IoCartOutline,
  IoCloseOutline,
  IoSearchOutline,
} from 'react-icons/io5';
import { TiUserOutline } from "react-icons/ti";
import { SlMenu } from 'react-icons/sl';
import { IoMdHeartEmpty } from 'react-icons/io';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Button } from '@nextui-org/button';

import Dropdownlanguage from './dropdownLanguage/dropdownLanguage';
import style from './styleHeader.module.css';
import SearchBar from './SearchBar/SearchBar';

import animateLink from '@/utils/animateLink.ts';

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
    <div ref={searchRef} className={classNames(style['section-nav__header'])}>
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
      <section
        className={classNames(style['section-nav'])}
        color="backgroundColor"
      >
        <Link className={classNames(style['section-nav__logo-link'])} href="/">
          <div className={classNames(style['section-nav__logo'])}>
            <p className={classNames(style['section-nav__logo-text'])}>
              PRANGATI
            </p>
          </div>
        </Link>
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
              href="/"
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
            <Dropdownlanguage />
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
          <div className={classNames(style['section-nav__helpers-search'])}>
            <input
              className={classNames(style['section-nav__helpers-search-input'])}
              id="search"
              name="search"
              placeholder={t('search')}
              type="text"
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const { value } = e.currentTarget;

                setInputDetails(value);
              }}
            />

            <div
              className={classNames(style['section-nav__helpers-search-label'])}
            >
              <IoSearchOutline className={classNames('text-black text-xl')} />
            </div>
          </div>
            <Link href="/">
              <Button className='bg-[#1e1e1e] p-0 text-white text-sm w-8' radius='lg' size='sm'>Log in</Button>
            </Link>
          <Link
            className={classNames(style['section-nav__helpers-desire'])}
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
            className={classNames(style['section-nav__helpers-cart'])}
            href="/"
          >
            <IoCartOutline
              className={classNames(
                style['section-nav__helpers-cart-icon'],
                'text-black'
              )}
            />
          </Link>
          <Link href="" > <TiUserOutline className="text-2xl"/></Link>
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
      <hr />
    </div>
  );
}

export default Header;
