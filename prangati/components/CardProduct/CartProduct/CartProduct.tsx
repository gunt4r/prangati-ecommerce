"use client";
import { Button } from "@heroui/button";
import classNames from "classnames";
import "./styleCartProduct.scss";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

import {
  useAddProductToCart,
  useDeleteProductFromCart,
} from "@/api/cart/useCart";
import { ProductDetailed } from "@/config/interfaces";
import { useUUID } from "@/hooks/useUUID";
import { IsProductInCart } from "@/services/productInCart";
export default function CartProduct({ product }: { product: ProductDetailed }) {
  const { mutate: addProductToCart } = useAddProductToCart();
  const { mutate: deleteProductFromCart } = useDeleteProductFromCart();
  const isAddedCart = IsProductInCart(product.id);
  const userID = useUUID();
  const router = useRouter();
  const hasAttributes = [product?.sizes || product?.colors].length > 0;
  const handleToggleCart = () => {
    if (hasAttributes) {
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
            toast.success(
              `You successfully  added ${product.name} to the cart`
            );
          },
          onError: () => {
            toast.error(`Error adding ${product.name} to the cart`);
          },
        }
      );
    } else {
      deleteProductFromCart(
        {
          userId: userID,
          productId: product.id,
        },
        {
          onSuccess: () => {
            toast.error(`You removed ${product.name} from the cart`);
          },
          onError: () => {
            toast.error(`Error removing ${product.name} from the cart`);
          },
        }
      );
    }
  };

  return (
    <Button
      className={classNames(
        "section-nav__helpers-cart",
        "text-slate-500 text-2xl"
      )}
      variant={isAddedCart ? "solid" : "ghost"}
      onPress={handleToggleCart}
    >
      <IoCartOutline
        className={classNames(
          "section-nav__helpers-cart-icon",
          "text-slate-500 text-2xl"
        )}
      />
    </Button>
  );
}
