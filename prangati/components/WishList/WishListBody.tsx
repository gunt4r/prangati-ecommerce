"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";

import CardProduct from "../CardProduct/CardProduct";
import Container from "../Container/Container";

import "./styleWishListBody.scss";

import { poppins } from "@/config/fonts";
import TitleHeader from "@/utils/TitleHeader/TitleHeader";
import { Product } from "@/config/interfaces";
import { useProductsStore } from "@/store/useProductsStore";
import { useWishlist } from "@/api/wishlist/useWishlist";
import { useUUID } from "@/hooks/useUUID";
export default function WishlistBody() {
  const wishlistProducts = useProductsStore((state) => state.wishlistProducts);
  const userId = useUUID();
  const { data: wishlist } = useWishlist(userId);

  useEffect(() => {
    if (wishlistProducts.length != 0) return;
    if (!wishlist || wishlist.length == 0) return;
    useProductsStore.getState().setWishlistProducts(wishlist);
  }, [wishlist, wishlistProducts, useProductsStore]);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div className="section-wish__wrapper">
      <Container>
        <TitleHeader text="WishList" />
        {wishlistProducts.length === 0 ? (
          <div>
            <p className={`section-wish__subtitle ${poppins.className}`}>
              Explore the products you’ve added to your wishlist. Share them
              with friends, family, or even our experts to help you find the
              perfect match!
            </p>
            <hr className="section-wish__line" />
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
            <div className="grid-cards">
              {wishlistProducts.map((item: Product) => (
                <CardProduct key={item.id} product={item} />
              ))}
            </div>
            <Link className="flex mx-auto" href="/products">
              <Button
                className={` uppercase  flex mx-auto text-lg mt-12 ${poppins.className}`}
                isLoading={showMore}
                size="lg"
                variant="light"
                onPress={handleShowMore}
              >
                Show more <FaArrowRight className="text-lg" size={30} />
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
