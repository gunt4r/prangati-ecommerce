"use client";
import { Link } from "@heroui/link";
import { useEffect } from "react";

import CartProduct from "./CartProduct/CartProduct";
import "./styleCardProduct.scss";
import LikeProduct from "./LikeProduct/LikeProduct";
import PriceProduct from "./PriceProduct/PriceProduct";

import { oswald, poppins } from "@/config/fonts";
import { Product } from "@/config/interfaces";
import { placeholderImage } from "@/config/const";
import { useWishlist } from "@/api/wishlist/useWishlist";
import { useProductsStore } from "@/store/useProductsStore";
import { useUUID } from "@/hooks/useUUID";
import { useCartItems } from "@/api/cart/useCart";
export default function CardProduct({ product }: { product: Product }) {
  const userId = useUUID();
  const setWishlistProducts = useProductsStore(
    (state) => state.setWishlistProducts
  );
  const setCardProducts = useProductsStore((state) => state.setCartProducts);
  const { data: wishlistProducts, isLoading } = useWishlist(userId);
  const { data: cartProducts, isLoading: isLoadingCart } = useCartItems();

  useEffect(() => {
    if (!isLoading && wishlistProducts) {
      setWishlistProducts(wishlistProducts);
    }
    if (!isLoadingCart && cartProducts) {
      setCardProducts(cartProducts.items);
    }
  }, [isLoading, wishlistProducts, setWishlistProducts]);

  return (
    <div className="section-card">
      <Link className="section-card__wrapper" href={`/product/${product.id}`}>
        <img
          alt=""
          className="section-card__image"
          src={
            product.images && product.images.length > 0
              ? product.images[0].path
              : placeholderImage
          }
        />
      </Link>
      <hr className="section-card__line" />
      <Link
        className="section-card__wrapper w-full"
        href={`/product/${product.id}`}
      >
        <p
          className={`section-card__title size-full
            ${poppins.className}`}
        >
          {product.name}
        </p>
      </Link>
      <div className="section-card__wrapper-details">
        <Link className="section-card__wrapper" href={`/product/${product.id}`}>
          <p
            className={`section-card__wrapper-details__description ${poppins.className}`}
          >
            {product.description}
          </p>
        </Link>
        <PriceProduct link={product.id} price={product.price} />
      </div>
      <div className="section-card__bottom">
        <Link
          className={`section-card__link ${oswald.className}`}
          href={`/product/${product.id}`}
        >
          READ MORE
        </Link>
        <CartProduct product={product} />
      </div>
      <LikeProduct
        productID={product.id}
        style={{
          position: "absolute",
          top: "8%",
          right: "9%",
          zIndex: "10",
        }}
        userID={userId}
      />
    </div>
  );
}
