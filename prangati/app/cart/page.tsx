"use client";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import Header from "@/components/Header/Headerpage";
import Footer from "@/components/Footer/Footer";
import ViewedProducts from "@/components/ViewedProducts/ViewedProducts";
import CardProduct from "@/components/CardProduct/CardProduct";
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  quantity: number;
}

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <Header />
      {cart.map((product: Product) => (
        <CardProduct key={product.id} product={product} />
      ))}
      <ViewedProducts />
      <Footer />
    </div>
  );
};

export default Cart;
