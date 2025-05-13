"use client";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.items);
  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER + "auth/check",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
          {!isAuthenticated && (
            <p
              className={classNames(
                styles["section-wish__subtitle"],
                poppins.className,
              )}
            >
              Log in to see if you saved some products in cart
            </p>
          )}
          <Link className=" mt-20 flex mx-auto mb-5" href="/logIn">
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
          <Link
            className={classNames(
              " flex mx-auto",
              poppins.className,
              styles["section-cart__continue"],
            )}
            href="/category"
          >
            Continue Shopping
          </Link>
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
