"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";

import Header from "@/components/Header/Headerpage";
import Footer from "@/components/Footer/Footer";
import { useUUID } from "@/Hooks/useUUID";
import { addViewedProduct } from "@/services/viewedProductsService";
// import Head from "next/head";

interface ProductData {
  title: string;
  price: number;
  description: string;
  images: string[];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [productData, setProductData] = useState<ProductData | null>(null);
  const userUUID = useUUID();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`,
        );

        setProductData(response.data);
        addViewedProduct(userUUID, id);
      } catch (error) {
        console.error("Ошибка при загрузке данных продукта:", error);
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

  // <Head>
  //   <title>{productData.title} - Мой магазин</title>
  //   <meta name="description" content={productData.description} />
  // </Head>
  return (
    <section>
      <Header />
      <main>
        <h1>{productData.title}</h1>
        <h2>Цена: {productData.price} USD</h2>
        <p>{productData.description}</p>
        {productData.images && (
          <img
            alt={productData.title}
            src={productData.images[0]}
            style={{ maxWidth: "100%" }}
          />
        )}
      </main>
      <Footer />
    </section>
  );
}
