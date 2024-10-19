"use client";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

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
      {cart.map((product: Product) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>{product.price}</p>
          <p>{product.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
