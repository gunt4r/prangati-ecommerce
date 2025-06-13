/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import classNames from "classnames";
import { Link } from "@heroui/link";

import CartProduct from "./CartProduct/CartProduct";
import style from "./styleCardProduct.module.css";
import LikeProduct from "./LikeProduct/LikeProduct";
import PriceProduct from "./PriceProduct/PriceProduct";

import { oswald, poppins } from "@/config/fonts";
import { Product } from "@/config/interfaces";
export default function CardProduct({ product }: { product: Product }) {
  const descriptionProduct = product.description;

  return (
    <div className={classNames(style["section-card"])}>
      <Link
        className={classNames(style["section-card__wrapper"])}
        href={`/product/${product.id}`}
      >
        <img
          alt=""
          className={classNames(style["section-card__image"])}
          src={
            product.images && product.images.length > 0
              ? product.images[0].path
              : "https://via.placeholder.com/150"
          }
        />
      </Link>
      <hr className={classNames(style["section-card__line"])} />
      <Link
        className={classNames(style["section-card__wrapper"])}
        href={`/product/${product.id}`}
      >
        <p
          className={classNames(
            style["section-card__title"],
            poppins.className,
          )}
        >
          {product.name}
        </p>
      </Link>
      <div className={classNames(style["section-card__wrapper-details"])}>
        <Link
          className={classNames(style["section-card__wrapper"])}
          href={`/product/${product.id}`}
        >
          <p
            className={classNames(
              style["section-card__wrapper-details__description"],
              poppins.className,
            )}
          >
            {descriptionProduct}
          </p>
        </Link>
        <PriceProduct link={product.id} price={product.price} />
      </div>
      <div className={classNames(style["section-card__bottom"])}>
        <Link
          className={classNames(style["section-card__link"], oswald.className)}
          href={`/product/${product.id}`}
        >
          READ MORE
        </Link>
        <CartProduct product={product} />
      </div>
      <LikeProduct
        product={product}
        style={{
          position: "absolute",
          top: "8%",
          right: "9%",
          zIndex: "10",
        }}
      />
    </div>
  );
}
