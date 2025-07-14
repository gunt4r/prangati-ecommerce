import { Button, ButtonGroup } from "@heroui/button";
import { NumberInput } from "@heroui/number-input";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

import "./styleQuantitySelector.scss";
import { poppins } from "@/config/fonts";

interface QuantitySelectorProps {
  value: number;
  maxValue: number | undefined;
  onIncrement: () => void;
  onDecrement: () => void;
  onValueChange: (value: number) => void;
  classNameWrapper?: string;
  radiusButtons?: "sm" | "md" | "lg" | "none" | "full";
  sizeButtonGroup?: string;
  addHoverToButtons?: boolean;
}

export default function QuantitySelector({
  value,
  maxValue,
  onIncrement,
  onDecrement,
  onValueChange,
  classNameWrapper,
  radiusButtons = "sm",
  sizeButtonGroup,
  addHoverToButtons = true,
}: QuantitySelectorProps) {
  return (
    <ButtonGroup
      className={`section-product__info--buttons__wrapper ${!sizeButtonGroup ? "w-2/5" : sizeButtonGroup} ${classNameWrapper}`}
    >
      <Button
        className={`${addHoverToButtons ? "section-product__info--buttons--decrement" : ""} min-w-10`}
        radius={radiusButtons}
        variant="light"
        onPress={onDecrement}
      >
        <FiMinus size={20} />
      </Button>
      <NumberInput
        hideStepper
        aria-label="Quantity"
        className={`${poppins.className}`}
        classNames={{
          inputWrapper: "section-product__info--buttons--input_wrapper",
          input: `section-product__info--buttons--input min-w-[25px] ${poppins.className}`,
        }}
        maxValue={maxValue ? maxValue : 0}
        minValue={1}
        value={value}
        onValueChange={onValueChange}
      />
      <Button
        className={`${addHoverToButtons ? "section-product__info--buttons--increment" : ""} min-w-10`}
        radius={radiusButtons}
        variant="light"
        onPress={onIncrement}
      >
        <GoPlus size={60} />
      </Button>
    </ButtonGroup>
  );
}
