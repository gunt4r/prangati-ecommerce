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
export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const [productData, setProductData] = useState<Product | null>(null);
  const userUUID = useUUID();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}product/${id}`,
        );

        setProductData(response.data);
        console.log(response.data);
        addViewedProduct(userUUID, String(id));
      } catch (error) {
        toast.error("Ошибка при загрузке данных продукта:");
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

  <Head>
    <title>{productData.name}</title>
    <meta content={productData.description} name="description" />
  </Head>;

  return (
    <section>
      <Toaster position="bottom-right" />
      <Header />
      <main>
        <h1>{productData.name}</h1>
        <h2>Цена: {productData.price} USD</h2>
        <p>{productData.description}</p>
        {productData.images && (
          <img
            alt={productData.name}
            src={productData.images[0].path}
            style={{ maxWidth: "100%" }}
          />
        )}
      </main>
      <Footer />
    </section>
  );
}
