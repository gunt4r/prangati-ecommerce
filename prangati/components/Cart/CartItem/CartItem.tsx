import "./styleCartItem.scss";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import { HttpStatusCode } from "axios";
import { Divider } from "@heroui/react";
import { Link } from "@heroui/react";

import { ProductCart } from "@/config/interfaces";
import QuantitySelector from "@/components/Product/ProductInfo/quantitySelector/QuantitySelector";
import PriceProduct from "@/components/CardProduct/PriceProduct/PriceProduct";
import {
  useDeleteProductFromCart,
  useDeleteProductAddToWishlist,
  useUpdateProductToCart,
} from "@/api/cart/useCart";
import { useUUID } from "@/Hooks/useUUID";
import { poppins } from "@/config/fonts";
export default function CartItem({
  product,
  quantity,
}: {
  product: ProductCart;
  quantity: number;
}) {
  const [quantityValue, setQuantityValue] = useState(quantity);
  const { mutate: deleteProductFromCart } = useDeleteProductFromCart();
  const { mutate: removeFromCartAndAddProductToWishlist } =
    useDeleteProductAddToWishlist();
  const { mutate: updateProductToCart } = useUpdateProductToCart();
  const userID = useUUID();
  const incrementValue = () =>
    setQuantityValue((prev: number) =>
      Math.min(product.stock as number, prev + 1),
    );
  const decrementValue = () =>
    setQuantityValue((prev: number) => Math.max(1, prev - 1));
  const handleRemove = () => {
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
      },
    );
  };
  const handleMoveFavorite = () => {
    removeFromCartAndAddProductToWishlist(
      {
        userId: userID,
        productId: product.id,
      },
      {
        onSuccess: (data: any) => {
          if (data.status == HttpStatusCode.Ok) {
            return toast.success(`You moved ${product.name} to the wishlist`);
          }
        },
        onError: (data: any) => {
          if (data.status == HttpStatusCode.Conflict) {
            return toast.error(data.response.data.message);
          }

          toast.error(`Error moving ${product.name} to the wishlist`);
        },
      },
    );
  };

  useEffect(() => {
    if (userID) {
      updateProductToCart(
        { userId: userID, productId: product.id, quantity: quantityValue },
        {
          onSuccess: () => {
            toast.success(`You updated ${product.name} quantity in the cart`);
          },
          onError: () => {
            toast.error(`Error updating ${product.name} quantity in the cart`);
          },
        },
      );
    }
  }, [quantityValue]);

  return (
    <section className="section-cart-item">
      <section className="section-cart-item__wrapper">
        <Link href={`/product/${product.id}`}>
          <img
            alt={product.name}
            className="section-cart-item__wrapper-image"
            src={product.images[0].path}
          />
        </Link>
        <section className="section-cart-item__wrapper-info">
          <Link href={`/product/${product.id}`}>
            <h4
              className={`section-cart-item__wrapper-info-name ${poppins.className}`}
            >
              {product.name}
            </h4>
          </Link>
          <Link href={`/product/${product.id}`}>
            <p
              className={`section-cart-item__wrapper-info-brand ${poppins.className}`}
            >
              brand: {product.category?.name ?? "???"}
            </p>
          </Link>
          <div className="section-cart-item__wrapper-info-quantity">
            <QuantitySelector
              addHoverToButtons={false}
              classNameWrapper="section-product__info--buttons__wrapper--cart"
              maxValue={product.stock}
              radiusButtons="none"
              sizeButtonGroup="w-1/4"
              value={quantityValue}
              onDecrement={decrementValue}
              onIncrement={incrementValue}
              onValueChange={setQuantityValue}
            />
            <PriceProduct
              className="section-card__wrapper-details__price--cart"
              link={product.id}
              price={Number(product.price)}
              quantity={quantityValue}
            />
          </div>
          <div className="section-cart-item__wrapper-info-actions">
            <button
              className={`underline section-cart-item__wrapper-info-actions--favorite ${poppins.className}`}
              onClick={handleMoveFavorite}
            >
              MOVE TO FAVORITE
            </button>
            <Button
              className={`underline ${poppins.className} section-cart-item__wrapper-info-actions--remove`}
              radius="sm"
              variant="light"
              onPress={handleRemove}
            >
              REMOVE
            </Button>
          </div>
        </section>
      </section>
      <Divider className="bg-backgroundColorButtonBlack" />
    </section>
  );
}
