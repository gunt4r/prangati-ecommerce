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
    Cookies.get('language') || 'En'
  );
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const savedLanguage = Cookies.get('language') || 'En';

      setSelectedKeys(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [isMounted, i18n]);

  useEffect(() => {
    if (isMounted && selectedKeys) {
      let temp = Array.from(selectedKeys);
      const language = temp.join('').replace("%2", "");

      Cookies.set('language', language);
      
      i18n.changeLanguage(language);
    }
  }, [selectedKeys, isMounted, i18n]);

  if (!isMounted) {
    return null; 
  }

  return (
    <Dropdown >
      <DropdownTrigger>
        <Button className="capitalize" size='lg' variant="light">
          {selectedKeys }
          <IoIosArrowDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys as (keys: SharedSelection) => void}
      >
        <DropdownItem key="En">English</DropdownItem>
        <DropdownItem key="Ro">Română</DropdownItem>
        <DropdownItem key="Ru">Русский</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Dropdownlanguage;
