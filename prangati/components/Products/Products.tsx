"use client";
import Cookies from "js-cookie";

import Container from "../Container/Container";
import "./styleProducts.scss";
import Preloader from "../ClientPreloader/Preloader";
import CardProduct from "../CardProduct/CardProduct";
import ButtonDark from "../Cart/CartInfo/ButtonDark";

import Filters from "./FiltersSorting";

import { useProductsAdvanced } from "@/api/products/useProducts";
import TitleHeader from "@/utils/TitleHeader/TitleHeader";
import { useProductsStore } from "@/store/useProductsStore";
import { COOKIE_PRODUCT_KEY } from "@/config/const";
export default function ProductsBody() {
  const { data, isLoading } = useProductsAdvanced();
  const setFilterParams = useProductsStore((state) => state.setFilterParams);

  if (isLoading) return <Preloader />;

  const deleteFilters = () => {
    setFilterParams({});
    Cookies.remove(COOKIE_PRODUCT_KEY);
  };

  if (!data || !data.data || data.data.length === 0) {
    return (
      <Container>
        <section className="section-products__none">
          <div className="text-center">No products found</div>
          <div className="text-center">
            <ButtonDark text="Delete filters" onPress={deleteFilters} />
          </div>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="section-products__wrapper">
        <TitleHeader text="shoes" />
        <div className="filters">
          <Filters />
        </div>

        {data.data.length > 0 ? (
          <div className="grid-cards">
            {data &&
              data?.data.map((product: any) => (
                <CardProduct key={product.id} product={product} />
              ))}
          </div>
        ) : (
          <section className="section-products__none">
            <div className="text-center">No products found</div>
            <div className="text-center">
              <ButtonDark text="Delete filters" onPress={deleteFilters} />
            </div>
          </section>
        )}
      </section>
    </Container>
  );
}
