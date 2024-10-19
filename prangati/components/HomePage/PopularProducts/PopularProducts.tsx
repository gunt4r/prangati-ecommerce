"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

import HeadingSection from "../HeadingSection/HeadingSection";

import style from "./stylePopularProducts.module.css";

import { poppins } from "@/config/fonts";
import CardProduct from "@/components/CardProduct/CardProduct";
export default function PopularProducts() {
  const [productsData, setProductsData] = useState<Product[]>([]);

  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
  }
  const handlerData = async () => {
    try {
      const response = await axios.get<Product[]>(
        `${process.env.NEXT_PUBLIC_API_PRODUCT}?offset=0&limit=3`,
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
