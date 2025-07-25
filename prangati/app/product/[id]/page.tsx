"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { api } from "@/api/api";
import Preloader from "@/components/ClientPreloader/Preloader";
import Header from "@/components/Header/Headerpage";
import Footer from "@/components/Footer/Footer";
import { useUUID } from "@/hooks/useUUID";
import { addViewedProduct } from "@/services/viewedProductsService";
import { ProductDetailed } from "@/config/interfaces";
import ViewedProducts from "@/components/ViewedProducts/ViewedProducts";
import ProductGallery from "@/components/Product/ProductGallery/ProductGallery";
import "./styleProduct.scss";
import ProductInfo from "@/components/Product/ProductInfo/ProductInfo";
import ProductCategory from "@/components/Product/ProductCategory/ProductCategory";
import Container from "@/components/Container/Container";
import { Category } from "@/types/categories";
export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const [productData, setProductData] = useState<ProductDetailed | null>(null);
  const userUUID = useUUID();
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await api.get(`/product/${id}`);

        setProductData(response.data);
        setCategory(response.data.category);
        addViewedProduct(userUUID, String(id));
      } catch (error) {
        toast.error("Error fetching product data:");
      }
    };

    fetchProductData();
  }, [id, userUUID]);

  if (!productData) {
    return <Preloader />;
  }

  return (
    <section className="section-product">
      <Head>
        <title>{productData.name}</title>
        <meta content={productData.description} name="description" />
      </Head>
      <Header />
      <section className="section-product__category">
        {category && (
          <ProductCategory category={category} productsName="shoes" />
        )}
      </section>
      <main className="section-product__main">
        <Container>
          <article className="section-product__main__wrapper">
            <ProductGallery
              images={productData.images.map((image) => ({
                path: image.path,
                entityTipe: "Product image",
              }))}
            />
            <ProductInfo product={productData} />
          </article>
        </Container>
      </main>
      <ViewedProducts />
      <Footer />
    </section>
  );
}
