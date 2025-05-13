import "./styleProductInfo.scss";
import { Button, ButtonGroup } from "@heroui/button";
import { useEffect, useState } from "react";
import { NumberInput } from "@heroui/number-input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbTruckDelivery } from "react-icons/tb";
import { BsArrowRepeat } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

import ProductBenefit from "../ProductBenefit/ProductBenefit";

import { poppins, inter } from "@/config/fonts";
import LikeProduct from "@/components/CardProduct/LikeProduct/LikeProduct";
import { Product } from "@/config/interfaces";
export default function ProductInfo({ product }: { product: Product }) {
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
    if (product.colors && selectedColors.length === 0) {
      toast.error("Please select color(s)");

      return;
    }
    if (product.sizes && selectedSizes.length === 0) {
      toast.error("Please select size(s)");

      return;
    }
    toast.success(`You successfully added ${product.name} to the cart`);
    router.push(`/cart?product=${product.id}&quantity=${quantityValue}`);
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
            {product.colors.map((color, index) => {
              const isSelected = selectedColors.includes(color.color);

              return (
                <div
                  key={color.color}
                  className={`section-product__info--colors--container--color ${
                    isSelected ? "selected" : ""
                  }`}
                  role="button"
                  style={{ backgroundColor: color.color }}
                  tabIndex={index}
                  onClick={() => handleColorClick(color.color)}
                  onKeyDown={() => handleColorClick(color.color)}
                >
                  {isSelected && <div className="selected-indicator" />}
                </div>
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
        <ButtonGroup className="section-product__info--buttons__wrapper w-2/5">
          <Button
            className="section-product__info--buttons--decrement min-w-10"
            radius="sm"
            variant="light"
            onPress={decrementValue}
          >
            <FiMinus size={20} />
          </Button>
          <NumberInput
            hideStepper
            className={`${poppins.className}`}
            classNames={{
              inputWrapper: "section-product__info--buttons--input_wrapper",
              input: `section-product__info--buttons--input ${poppins.className}`,
            }}
            defaultValue={1}
            maxValue={product.stock}
            minValue={1}
            value={quantityValue}
            onValueChange={setQuantityValue}
          />
          <Button
            className="section-product__info--buttons--increment min-w-10"
            radius="sm"
            variant="light"
            onPress={incrementValue}
          >
            <GoPlus size={60} />
          </Button>
        </ButtonGroup>
        <Button
          className={`section-product__info--buttons--add ${poppins.className}`}
          radius="sm"
          onPress={handleSubmit}
        >
          Buy now
        </Button>
        <div className="section-product__info--buttons--like">
          <LikeProduct product={product} />
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
        <p className="section-product__info--delivery">
          Enter your postal code for Delivery Availability
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
          <Button
            onPress={() => {
              router.push("/return");
            }}
          >
            Details
          </Button>
        </p>{" "}
      </ProductBenefit>
    </article>
  );
}
