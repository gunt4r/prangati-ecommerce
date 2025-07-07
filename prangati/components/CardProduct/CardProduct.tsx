"use client";
import { Link } from "@heroui/link";

import CartProduct from "./CartProduct/CartProduct";
import "./styleCardProduct.scss";
import LikeProduct from "./LikeProduct/LikeProduct";
import PriceProduct from "./PriceProduct/PriceProduct";

import { oswald, poppins } from "@/config/fonts";
import { Product } from "@/config/interfaces";
export default function CardProduct({ product }: { product: Product }) {
  const descriptionProduct = product.description;

  return (
    <div className="section-card">
      <Link className="section-card__wrapper" href={`/product/${product.id}`}>
        <img
          alt=""
          className="section-card__image"
          src={
            product.images && product.images.length > 0
              ? product.images[0].path
              : "https://via.placeholder.com/150"
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
            {descriptionProduct}
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
      />
    </div>
  );
}
