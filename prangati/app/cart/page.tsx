"use client";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

import Header from "@/components/Header/Headerpage";
import Footer from "@/components/Footer/Footer";
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
        <div key={product.id}>
          <p>{product.title}</p>
          <p>{product.price}</p>
          <p>{product.quantity}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default Cart;
