"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";

import CardProduct from "../CardProduct/CardProduct";
import Preloader from "../ClientPreloader/Preloader";

import style from "./styleProducts.module.css";

import { ApiResponse, Category } from "@/config/interfaces";
import TitleHeader from "@/utils/TitleHeader/TitleHeader";
export default function ProductsBody() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [response, setResponse] = useState<ApiResponse>({
    data: [],
    meta: { total: 0, page: 1, limit: 10, totalPages: 1 },
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (
    page: number,
    limit: number,
    category: string,
  ) => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_SERVER}product`);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(category && { category }),
      });

      const res = await fetch(`${url}?${params}`);
      const data: ApiResponse = await res.json();

      console.log("Data:", data);
      const meta = data.meta || { total: 0, page: 1, limit: 10, totalPages: 1 };

      setResponse((prev) => ({
        data: page === 1 ? data.data : [...prev.data, ...data.data],
        meta,
      }));
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка категорий
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}categories`);
      const data = await res.json();

      setCategories(data);
    } catch (error) {
      console.error("Categories error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts(page, limit, selectedCategory);
  }, [page, limit, selectedCategory]);
  // Обработчики изменений
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setResponse((prev) => ({ ...prev, meta: { ...prev.meta, page: 1 } }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);

    setLimit(newLimit);
    setPage(1);
    setResponse((prev) => ({
      ...prev,
      data: [],
      meta: { ...prev.meta, limit: newLimit, page: 1 },
    }));
  };

  const loadMore = () => {
    if (response.meta && page < response.meta.totalPages) {
      setPage(page + 1);
    }
  };

  if (loading) return <Preloader />;

  return (
    <section className={classNames(style["section-products__wrapper"])}>
      {/* Фильтры */}
      <TitleHeader text="shoes" />
      <div className={style.filters}>
        <select
          className={style.filterSelect}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className={style.filterSelect}
          value={response.meta.limit}
          onChange={handleLimitChange}
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      {/* Список товаров */}
      <div className={style["section-products__cards"]}>
        {response.data.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>

      {/* Кнопка загрузки */}
      {response.meta.page < response.meta.totalPages && (
        <button className={style.loadMoreButton} onClick={loadMore}>
          Show More ({response.meta.total - response.data.length} left)
        </button>
      )}
    </section>
  );
}
