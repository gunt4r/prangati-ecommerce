import "./styleCheckoutInfo.scss";
import { Divider } from "@heroui/react";

import CheckoutItem from "../CheckoutItem";
import CheckoutFormTitle from "../CheckoutForm/CheckoutFormTitle";

import { useCartItems } from "@/api/cart/useCart";
import Preloader from "@/components/ClientPreloader/Preloader";
import CartInfoDetails from "@/components/Cart/CartInfo/CartInfoDetails";
import { poppins } from "@/config/fonts";
export default function CheckoutInfo() {
  const { data, isLoading } = useCartItems();

  if (isLoading) return <Preloader />;
  if (!data) return null;

  return (
    <section className="section-checkout__info">
      <CheckoutFormTitle title="YOUR ORDER" />
      {data.items.map((product: any) => {
        const images = product.images;

        product.product.images = images;
        product.product.quantity = product.quantity;

        return <CheckoutItem key={product.id} product={product.product} />;
      })}
      <CartInfoDetails color="black" subtotal={data.subtotalPrice} />
      <Divider className="bg-backgroundColorButtonBlack mt-2 h-px" />
      <p className={`section-checkout__total mt-4 ${poppins.className}`}>
        <span> Total</span> $ {data.subtotalPrice + 10}
      </p>
    </section>
  );
}
