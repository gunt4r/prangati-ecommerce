"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";
import Head from "next/head";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import Header from "@/components/Header/Headerpage";
import Footer from "@/components/Footer/Footer";
import { useUUID } from "@/Hooks/useUUID";
import { addViewedProduct } from "@/services/viewedProductsService";
import { Product } from "@/config/interfaces";
import ViewedProducts from "@/components/ViewedProducts/ViewedProducts";
import ProductGallery from "@/components/Product/ProductGallery/ProductGallery";
import "./styleProduct.scss";
import ProductInfo from "@/components/Product/ProductInfo/ProductInfo";
import ProductCategory from "@/components/Product/ProductCategory/ProductCategory";
export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const [productData, setProductData] = useState<Product | null>(null);
  const userUUID = useUUID();
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}product/${id}`,
        );

        setProductData(response.data);
        setCategory(response.data.category.name);
        console.log(response.data);
        addViewedProduct(userUUID, String(id));
      } catch (error) {
        toast.error("Error fetching product data:");
      }
    };

    fetchProductData();
  }, [id, userUUID]);

  if (!productData) {
    return (
      <HashLoader
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      />
    );
  }

  return (
    <section className="section-product">
      <Head>
        <title>{productData.name}</title>
        <meta content={productData.description} name="description" />
      </Head>
      <Toaster position="bottom-right" />
      <Header styleLine={{ width: "90%" }} styleNav={{ width: "90%" }} />
      <section className="section-product__category">
        <ProductCategory
          category={category.length == 0 ? "shoes" : category}
          productsName="shoes"
        />
      </section>
      <main className="section-product__main">
        <article className="section-product__main__wrapper">
          <ProductGallery
            images={productData.images.map((image) => ({
              path: image.path,
              entityTipe: "Product image",
            }))}
          />
          <ProductInfo product={productData} />
        </article>
      </main>
      <ViewedProducts />
      <Footer />
    </section>
  );
}
