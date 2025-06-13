import { Button } from "@heroui/button";
import { ScaleLoader } from "react-spinners";

import { poppins } from "@/config/fonts";

export default function ButtonDark({
  onPress,
  type,
  size,
  classNames,
  isLoading = false,
}: {
  onPress?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  classNames?: string;
  isLoading?: boolean;
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
      Checkout
    </Button>
  );
}
