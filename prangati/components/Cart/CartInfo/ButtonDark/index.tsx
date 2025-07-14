import { Button } from "@heroui/button";
import { ScaleLoader } from "react-spinners";

import { poppins } from "@/config/fonts";

export default function ButtonDark({
  onPress,
  type = "button",
  size = "lg",
  classNames,
  isLoading = false,
  text = "Checkout",
}: {
  onPress?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  classNames?: string;
  isLoading?: boolean;
  text?: string;
}) {
  return (
    <Button
      className={`bg-default-900 uppercase text-default-50 w-full text-lg ${poppins.className} ${classNames}`}
      color="default"
      isLoading={isLoading}
      radius="md"
      size={size || undefined}
      spinner={<ScaleLoader color="white" height={30} />}
      type={type || undefined}
      variant="flat"
      onPress={onPress}
    >
      {text}
    </Button>
  );
}
