"use client";
import classNames from "classnames";

import style from "./styleCategories.module.css";
import CategoriesBody from "./CategoriesBody/CategoriesBody";

import HeadingSection from "@/components/HomePage/HeadingSection/HeadingSection";
export default function Categories() {
  return (
    <section className={classNames(style["section-categories"])}>
      <HeadingSection textHeading="SHOP BY CATEGORIES" />
      <CategoriesBody />
    </section>
  );
}
