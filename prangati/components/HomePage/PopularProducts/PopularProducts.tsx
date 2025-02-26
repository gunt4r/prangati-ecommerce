"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

import HeadingSection from "../HeadingSection/HeadingSection";

import style from "./stylePopularProducts.module.css";

import { poppins } from "@/config/fonts";
import CardProduct from "@/components/CardProduct/CardProduct";
import { Product } from "@/config/interfaces";
export default function PopularProducts() {
  const [productsData, setProductsData] = useState<Product[]>([]);

  const handlerData = async () => {
    try {
      const response = await axios.get<Product[]>(
        `${process.env.NEXT_PUBLIC_SERVER}product`,
      );

      setProductsData(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handlerData();
  }, []);

  return (
    <section className={classNames(style["section-popular"])}>
      <section className={classNames(style["section-popular__content"])}>
        <HeadingSection textHeading="POPULAR PRODUCTS" />
        <p
          className={classNames(
            style["section-popular__subtitle"],
            poppins.className,
          )}
        >
          This beloved product has become a favorite among our customers for its
          exceptional features and unparalleled performance
        </p>
        <div className={classNames(style["section-popular__products"])}>
          {productsData.map((item) => (
            <CardProduct key={item.id} product={item} />
          ))}
        </div>
      </section>
    </section>
  );
}
