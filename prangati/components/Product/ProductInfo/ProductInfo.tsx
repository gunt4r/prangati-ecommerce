import "./styleProductInfo.scss";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbTruckDelivery } from "react-icons/tb";
import { BsArrowRepeat } from "react-icons/bs";

import ProductBenefit from "../ProductBenefit/ProductBenefit";

import QuantitySelector from "./quantitySelector/QuantitySelector";
import ProductColors from "./ProductColors";

import { useUUID } from "@/hooks/useUUID";
import { useAddProductToCart } from "@/api/cart/useCart";
import { poppins, inter } from "@/config/fonts";
import LikeProduct from "@/components/CardProduct/LikeProduct/LikeProduct";
import { ProductDetailed } from "@/config/interfaces";
export default function ProductInfo({ product }: { product: ProductDetailed }) {
  const { mutate: addProductToCart } = useAddProductToCart();
  const userID = useUUID();
  const [quantityValue, setQuantityValue] = useState(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setSelectedColors((prev) => prev.slice(0, quantityValue));
    setSelectedSizes((prev) => prev.slice(0, quantityValue));
  }, [quantityValue]);

  const handleColorClick = (color: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color);
      }

      if (prev.length < quantityValue) {
        return [...prev, color];
      }

      return [...prev.slice(0, -1), color];
    });
  };

  const handleSizeClick = (size: string) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      }

      if (prev.length < quantityValue) {
        return [...prev, size];
      }

      return [...prev.slice(0, -1), size];
    });
  };

  const handleSubmit = () => {
    if (
      !selectedColors.length ||
      !selectedSizes.length ||
      (!product.colors && !product.sizes)
    ) {
      toast.error(`Please select colors and sizes`);

      return;
    }
    const items = Array.from({ length: quantityValue }, (_, index) => ({
      color: product.colors ? selectedColors[index] : undefined,
      size: product.sizes ? selectedSizes[index] : undefined,
    }));

    addProductToCart(
      {
        userId: userID,
        productId: product.id,
        quantity: quantityValue,
        attributes: items,
      },
      {
        onSuccess: () => {
          router.push("/cart");
        },
        onError: () => {
          toast.error(`Error adding ${product.name} to the cart`);
        },
      }
    );
    toast.success(`You successfully added ${product.name} to the cart`);
  };
  const incrementValue = () =>
    setQuantityValue((prev) => Math.min(product.stock as number, prev + 1));
  const decrementValue = () =>
    setQuantityValue((prev) => Math.max(1, prev - 1));

  return (
    <article className="section-product__info">
      <h5 className={`section-product__info--name ${inter.className}`}>
        {product.name}
      </h5>
      {product.stock && (
        <p
          className={`section-product__info--stock ${product.stock > 0 ? "section-product__info--stock__true" : "section-product__info--stock__false"} ${poppins.className}`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
      )}
      <p className={`section-product__info--price ${inter.className}`}>
        ${product.price}
      </p>
      <p className={`section-product__info--description ${poppins.className}`}>
        {product.description}
      </p>
      <hr className="section-product__info--line" />
      {product.colors && (
        <div className="section-product__info--colors">
          <p
            className={`section-product__info--colors--title ${inter.className}`}
          >
            Colors:
          </p>
          <div className="section-product__info--colors--container">
            {product.colors.map((color) => {
              const isSelected = selectedColors.includes(color.name);

              return (
                <ProductColors
                  key={color.id}
                  color={color}
                  handleClick={handleColorClick}
                  isSelected={isSelected}
                />
              );
            })}
          </div>
        </div>
      )}

      {product.sizes && (
        <div className="section-product__info--sizes">
          <p className="section-product__info--sizes--title">Sizes:</p>
          <div className="section-product__info--sizes--container">
            {product.sizes.map((size, index) => {
              const isSelected = selectedSizes.includes(size.size);

              return (
                <div
                  key={size.size}
                  className={`section-product__info--sizes--container--size ${
                    isSelected ? "selected" : ""
                  }`}
                  role="button"
                  tabIndex={index}
                  onClick={() => handleSizeClick(size.size)}
                  onKeyDown={() => handleSizeClick(size.size)}
                >
                  {size.size}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="section-product__info--buttons">
        <QuantitySelector
          maxValue={product.stock}
          value={quantityValue}
          onDecrement={decrementValue}
          onIncrement={incrementValue}
          onValueChange={setQuantityValue}
        />
        <Button
          className={`section-product__info--buttons--add ${poppins.className}`}
          radius="sm"
          onPress={handleSubmit}
        >
          Buy now
        </Button>
        <div className="section-product__info--buttons--like">
          <LikeProduct productID={product.id} userID={userID} />
        </div>
      </div>
      <ProductBenefit
        icon={<TbTruckDelivery size={40} style={{ marginRight: "10px" }} />}
        style={{
          borderTopRightRadius: "4px",
          borderTopLeftRadius: "4px",
          borderBottom: "none",
        }}
        title={"Free Delivery"}
      >
        {" "}
        <p className="section-product__info--delivery underline">
          You may be eligible for free delivery.
        </p>{" "}
      </ProductBenefit>
      <ProductBenefit
        icon={<BsArrowRepeat size={40} style={{ marginRight: "10px" }} />}
        style={{
          borderBottomRightRadius: "4px",
          borderBottomLeftRadius: "4px",
        }}
        title={"Return Delivery"}
      >
        {" "}
        <p className="section-product__info--delivery">
          Free 30 Days Delivery Returns.{" "}
          <button
            className="underline hover:cursor-pointer hover:opacity-70"
            onClick={() => {
              router.push("/return");
            }}
          >
            Details
          </button>
        </p>{" "}
      </ProductBenefit>
    </article>
  );
}
