import { useEffect, useState } from "react";

import CardProduct from "../CardProduct/CardProduct";
import HeadingSectionTitle from "../HomePage/HeadingSection/HeadingSectionTitle/HeadingSectionTitle";
import Preloader from "../ClientPreloader/Preloader";
import Container from "../Container/Container";

import styles from "./styleViewedProducts.module.css";

import { getRecentViewedProducts } from "@/services/viewedProductsService";
import { useUUID } from "@/hooks/useUUID";
import { Product } from "@/config/interfaces";
export default function ViewedProducts({
  style,
}: {
  style?: { [key: string]: string };
}) {
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
          // eslint-disable-next-line no-console
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
    return <Preloader />;
  }

  return (
    <section className={styles["section-viewed-products"]} style={{ ...style }}>
      {data.length > 0 ? (
        <Container>
          <HeadingSectionTitle
            style={{ textTransform: "uppercase" }}
            textHeading=" Recently View"
          />
          <article className={styles["section-viewed-products__wrapper"]}>
            {data.map((item) => (
              <CardProduct key={item.id} product={item} />
            ))}
          </article>
        </Container>
      ) : (
        <br />
      )}
    </section>
  );
}
