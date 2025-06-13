"use client";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import "./styleCart.scss";

import Container from "@/components/Container/Container";
import CartItem from "@/components/Cart/CartItem/CartItem";
import Header from "@/components/Header/Headerpage";
import Footer from "@/components/Footer/Footer";
import ViewedProducts from "@/components/ViewedProducts/ViewedProducts";
import TitleHeader from "@/utils/TitleHeader/TitleHeader";
import { poppins } from "@/config/fonts";
import { useCartItems } from "@/api/cart/useCart";
import Preloader from "@/components/ClientPreloader/Preloader";
import CartInfo from "@/components/Cart/CartInfo/CartInfo";
import { useGetAuth } from "@/api/auth/useAuth";

const Cart = () => {
  const { isLoading, data } = useCartItems();
  const { data: auth, isLoading: authLoading } = useGetAuth();
  const isAuthenticated = Boolean(auth && auth.status === 200);

  if (isLoading || authLoading) {
    return <Preloader />;
  }

  return (
    <div>
      <Header />
      <Container>
        <TitleHeader styles={{ marginBottom: "0" }} text="Cart" />
        {!data || data.items.length == 0 ? (
          <div>
            <p
              className={`section-wish__title
                ${poppins.className}
              `}
            >
              Your cart is empty
            </p>
            {!isAuthenticated && (
              <p
                className={`section-wish__subtitle
                  ${poppins.className}`}
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
              className={`flex mx-auto ${poppins.className} section-cart__continue`}
              href="/category"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="section-cart">
            <div className={"section-cart__cards"}>
              {data.items.map((product: any) => {
                const images = product.images;

                product.product.images = images;
                product.product.quantity = product.quantity;

                return <CartItem key={product.id} product={product.product} />;
              })}
            </div>
            <CartInfo subtotal={data.subtotalPrice} />
          </div>
        )}
        <ViewedProducts />
      </Container>
      <Footer />
    </div>
  );
};

export default Cart;
