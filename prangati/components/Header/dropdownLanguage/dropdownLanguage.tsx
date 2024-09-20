/* eslint-disable prettier/prettier */
'use client';
import { useState, useEffect } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { SharedSelection } from '@nextui-org/system';
import { IoIosArrowDown } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
const Dropdownlanguage = () => {
  const { i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string>(
    Cookies.get('language') || 'en'
  );

  useEffect(() => {
    setIsMounted(true);
    if (!Cookies.get('language')) {
      setSelectedKeys(Cookies.get('language') || 'en');
    } else {
      Cookies.set('language', i18n.language);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      selectedKeys?.valueOf() === undefined ? "en" : selectedKeys;
      Cookies.set('language', selectedKeys.currentKey);
      i18n.changeLanguage(selectedKeys as string);
    }
  }, [selectedKeys, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <Dropdown >
      <DropdownTrigger>
        <Button className="capitalize" variant="light">
          {selectedKeys}
          <IoIosArrowDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys as (keys: SharedSelection) => void}
      >
        <DropdownItem key="en">En</DropdownItem>
        <DropdownItem key="ro">Ro</DropdownItem>
        <DropdownItem key="ru">Ru</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Dropdownlanguage;
