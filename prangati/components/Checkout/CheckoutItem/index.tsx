import "./styleCheckoutItem.scss";
import { Divider } from "@heroui/react";
import { Link } from "@heroui/react";

import { ProductCart } from "@/config/interfaces";
import PriceProduct from "@/components/CardProduct/PriceProduct/PriceProduct";
import { poppins } from "@/config/fonts";

export default function CheckoutItem({ product }: { product: ProductCart }) {
  return (
    <section className="section-checkout__item-wrapper">
      <Divider className="bg-backgroundColorButtonBlack mb-4 h-px" />
      <section className="section-checkout__item">
        <Link href={`/product/${product.id}`}>
          <img
            alt={product.name}
            className="section-checkout__item-image"
            src={product.images[0].path}
          />
        </Link>
        <section className="section-checkout__item-info">
          <Link className="mb-8" href={`/product/${product.id}`}>
            <h4 className={`section-checkout__item-name ${poppins.className}`}>
              {product.name}
            </h4>
          </Link>
          <div className="section-checkout__item-info-quantity">
            <Link href={`/product/${product.id}`} className="text-backgroundColorButtonBlack">
              <p
                className={`section-checkout__item-info-quantity__text ${poppins.className}`}
              >
                QTY: {product.quantity}
              </p>
            </Link>
            <PriceProduct
              addZeroes={true}
              className={`section-card__wrapper-details__price--checkout ${poppins.className}`}
              link={product.id}
              price={product.price * product.quantity}
            />
          </div>
        </section>
      </section>
      <Divider className="bg-backgroundColorButtonBlack mt-4 h-px" />
    </section>
  );
}
