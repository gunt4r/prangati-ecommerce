import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

import CardProduct from "../CardProduct/CardProduct";

import style from "./styleViewedProducts.module.css";

import { getRecentViewedProducts } from "@/services/viewedProductsService";
import { useUUID } from "@/Hooks/useUUID";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function ViewedProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const userUUID = useUUID();

  useEffect(() => {
    if (userUUID) {
      const getRecentlyViewed = async () => {
        try {
          const response = await getRecentViewedProducts(userUUID);

          setData(response || []);
        } catch (error) {
          console.error("Error fetching recently viewed products:", error);
        } finally {
          setIsLoading(false);
        }
      };

      getRecentlyViewed();
    } else {
      setIsLoading(false);
    }
  }, [userUUID]);

  if (isLoading) {
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
    <section className={style.viewedProductsSection}>
      {data.length > 0 ? (
       (
        <>
            <h2 className={style['section-viewed-products__title']}>Recently Viewed Products</h2>
          {data.map((item) => (
            <CardProduct key={item.id} product={item} />
          ))}
        </>
      ) 
      ) : (
        <br />
      )}
    </section>
  );
}
