"use client";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const Wishlist = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div>
      <h5>Wishlist</h5>
      {wishlist.map((product: Product) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
