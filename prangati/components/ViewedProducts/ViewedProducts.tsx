import { useEffect, useState } from "react";
import { Link } from "@nextui-org/link";
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
  const userUUID = useUUID();

  useEffect(() => {
    if (userUUID) {
      const getRecentlyViewed = async () => {
        const response = await getRecentViewedProducts(userUUID);

        setData(response || []);
      };

      getRecentlyViewed();
    }
  }, [userUUID]);

  return (
    <section className={style.viewedProductsSection}>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Link key={index} href={`/product/${item.id}`}>
            <CardProduct product={item} />
          </Link>
        ))
      ) : (
        <HashLoader
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        />
      )}
    </section>
  );
}
