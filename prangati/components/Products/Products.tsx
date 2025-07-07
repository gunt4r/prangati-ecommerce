"use client";
import { useEffect } from "react";

import Container from "../Container/Container";
import "./styleProducts.scss";
import Preloader from "../ClientPreloader/Preloader";
import CardProduct from "../CardProduct/CardProduct";

import Filters from "./FiltersSorting";

import { useProductsAdvanced } from "@/api/products/useProducts";
import TitleHeader from "@/utils/TitleHeader/TitleHeader";
import { useProductsStore } from "@/store/useProductsStore";
import { PriceRange } from "@/config/interfaces";

export default function ProductsBody() {
  const filters = useProductsStore((state) => state.filterParams);
  const sortParams = useProductsStore((state) => state.sortParams);
  const queryParams = useProductsStore((state) => state.getQueryParams);

  useEffect(() => {
    queryParams();
  }, [filters, sortParams]);
  const { data, isLoading } = useProductsAdvanced(queryParams());
  const setPriceRange = useProductsStore((state) => state.setPriceRange);
  console.log(data);
  if (setPriceRange) setPriceRange(data?.priceRange as any);
  if (isLoading) return <Preloader />;

  return (
    <Container>
      <section className="section-products__wrapper">
        <TitleHeader text="shoes" />
        <div className="filters">
          <Filters />
        </div>

        <div className="section-products__cards">
          {data &&
            data?.data.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
        </div>
      </section>
    </Container>
  );
}
