"use client";

import classNames from "classnames";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { FaArrowRight } from "react-icons/fa6";

import CardProduct from "../CardProduct/CardProduct";
import Container from "../Container/Container";

import style from "./styleWishListBody.module.css";

import { poppins } from "@/config/fonts";
import TitleHeader from "@/utils/TitleHeader/TitleHeader";
import { Product } from "@/config/interfaces";
import { useUUID } from "@/Hooks/useUUID";

export default function WishlistBody() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useUUID();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function getWishlist() {
      if (!userId) {
        setLoading(false);

        return;
      }
      try {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_SERVER}wishlist/getAllWishlist/${userId}`,
        );

        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        setWishlist(Array.from(result));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getWishlist();
  }, [userId]);

  if (loading)
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
  const formattedWishlist =
    wishlist?.map((item) => ({
      ...item,
      images:
        item.images?.map((img) =>
          typeof img === "string" ? { path: img } : img,
        ) || [],
    })) || [];
  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div className={classNames(style["section-wish__wrapper"])}>
      <Container>
        <TitleHeader text="WishList" />
        {wishlist.length === 0 ? (
          <div>
            <p
              className={classNames(
                style["section-wish__subtitle"],
                poppins.className,
              )}
            >
              Explore the products you’ve added to your wishlist. Share them
              with friends, family, or even our experts to help you find the
              perfect match!
            </p>
            <hr className={classNames(style["section-wish__line"])} />
            <Link className=" flex mx-auto" href="/products">
              <Button
                className={`bg-default-900 text-default-50 w-40 flex mx-auto text-lg ${poppins.className}`}
                color="default"
                radius="full"
                size="lg"
                variant="flat"
              >
                Explore
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className={classNames(style["section-wish__cards"])}>
              {formattedWishlist.map((item: Product) => (
                <CardProduct key={item.id} product={item} />
              ))}
            </div>
            <Link className=" flex mx-auto" href="/products">
              <Button
                className={` uppercase  flex mx-auto text-lg mt-12 ${poppins.className}`}
                isLoading={showMore}
                size="lg"
                variant="light"
                onPress={handleShowMore}
              >
                Show more <FaArrowRight className="text-lg" size={60} />
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
