"use client";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import styles from "./styleCart.module.css";

import { RootState } from "@/store";
import Header from "@/components/Header/Headerpage";
import Footer from "@/components/Footer/Footer";
import ViewedProducts from "@/components/ViewedProducts/ViewedProducts";
import CardProduct from "@/components/CardProduct/CardProduct";
import { ProductCart } from "@/config/interfaces";
import TitleHeader from "@/utils/TitleHeader/TitleHeader";
import { poppins } from "@/config/fonts";
const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <Header />
      <TitleHeader text="Cart" />
      {cart.length === 0 ? (
        <div>
          <p
            className={classNames(
              styles["section-wish__title"],
              poppins.className,
            )}
          >
            Your cart is empty
          </p>
          <p
            className={classNames(
              styles["section-wish__subtitle"],
              poppins.className,
            )}
          >
            Log in to see if you saved some products in cart
          </p>
          <Link className=" flex mx-auto mb-5" href="/logIn">
            <Button
              className={`bg-default-900 text-default-50 w-40 flex mx-auto text-lg ${poppins.className}`}
              color="default"
              radius="full"
              size="lg"
              variant="flat"
            >
              Log in
            </Button>
          </Link>
          <Link className={classNames(" flex mx-auto",poppins.className,styles["section-cart__continue"])} href="/category">Continue Shopping</Link>
        </div>
      ) : (
        <div className={classNames(styles["section-wish__cards"])}>
          {cart.map((product: ProductCart) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      )}
      <ViewedProducts />
      <Footer />
    </div>
  );
};

export default Cart;
