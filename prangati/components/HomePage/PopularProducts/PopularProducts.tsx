"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";

import HeadingSection from "../HeadingSection/HeadingSection";

import style from "./stylePopularProducts.module.css";

import { api } from "@/api/api";
import { poppins } from "@/config/fonts";
import CardProduct from "@/components/CardProduct/CardProduct";
import { Product } from "@/config/interfaces";
export default function PopularProducts() {
  const [productsData, setProductsData] = useState<Product[]>([]);

  const handlerData = async () => {
    try {
      const response = await api.get(`/product`, {
        params: {
          limit: 3,
        },
      });

      setProductsData(response.data.data);
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
          {Array.isArray(productsData) &&
            productsData.length > 0 &&
            productsData.map((item) => (
              <CardProduct key={item.id} product={item} />
            ))}
        </div>
      </section>
    </section>
  );
}
