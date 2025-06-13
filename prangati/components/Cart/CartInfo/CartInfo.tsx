import "./styleCartInfo.scss";
import { Divider } from "@heroui/react";
import { Link } from "@heroui/react";

import ButtonDark from "./ButtonDark";
import CartInfoDetails from "./CartInfoDetails";

import { archivo } from "@/config/fonts";
export default function CartInfo({ subtotal }: { subtotal: string }) {
  return (
    <div className="section-cart__info">
      <h4 className={`section-cart__info-title ${archivo.className}`}>Total</h4>
      <CartInfoDetails subtotal={subtotal} />
      <Divider className="mt-8 mb-4" />
      <p className={`section-cart__info-total ${archivo.className}`}>
        <span>order Total</span> {subtotal + 10} $
      </p>
      <Divider className="mb-8 mt-4" />
      <Link className=" flex mx-auto mb-5" href="/checkout">
        <ButtonDark />
      </Link>
    </div>
  );
}
