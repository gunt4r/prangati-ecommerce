import { Button } from "@heroui/button";
import classNames from "classnames";
import "./styleCartProduct.scss";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  useAddProductToCart,
  useDeleteProductFromCart,
} from "@/api/cart/useCart";
import { Product } from "@/config/interfaces";
import { useUUID } from "@/Hooks/useUUID";
export default function CartProduct({ product }: { product: Product }) {
  const { mutate: addProductToCart } = useAddProductToCart();
  const { mutate: deleteProductFromCart } = useDeleteProductFromCart();
  const [isAddedCart, setisAddedCart] = useState(false);
  const userID = useUUID();
  const router = useRouter();

  useEffect(() => {
    const isProductAddedToCart = async () => {
      if (userID) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER}cart/${userID}`,
          );

          if (res.data && Array.isArray(res.data.items)) {
            const existingItem = res.data.items.find(
              (item: any) => item.product.id === product.id,
            );

            if (existingItem) {
              setisAddedCart(true);
            }
          }
        } catch (error) {
          toast.error("Error checking product in cart");
        }
      }
    };

    isProductAddedToCart();
  });
  const handleToggleCart = () => {
    if (product.hasAttributes) {
      toast.success(`You're being redirected to the ${product.name} page`);
      setTimeout(() => {
        router.push(`/product/${product.id}`);
      }, 1000);

      return;
    }
    if (!isAddedCart) {
      addProductToCart(
        {
          userId: userID,
          productId: product.id,
          quantity: 1,
        },
        {
          onSuccess: () => {
            setisAddedCart(true);
            toast.success(
              `You successfully  added ${product.name} to the cart`,
            );
          },
          onError: () => {
            toast.error(`Error adding ${product.name} to the cart`);
          },
        },
      );
    } else {
      deleteProductFromCart(
        {
          userId: userID,
          productId: product.id,
        },
        {
          onSuccess: () => {
            setisAddedCart(false);
            toast.error(`You removed ${product.name} from the cart`);
          },
          onError: () => {
            toast.error(`Error removing ${product.name} from the cart`);
          },
        },
      );
    }
    setisAddedCart((prev) => !prev);
  };

  return (
    <Button
      className={classNames(
        "section-nav__helpers-cart",
        "text-slate-500 text-2xl",
      )}
      variant={isAddedCart ? "solid" : "ghost"}
      onPress={handleToggleCart}
    >
      <IoCartOutline
        className={classNames(
          "section-nav__helpers-cart-icon",
          "text-slate-500 text-2xl",
        )}
      />
    </Button>
  );
}
