import { poppins } from "@/config/fonts";
import "./styleCartInfoDetails.scss";
export default function CartInfoDetails({
  subtotal,
  color,
}: {
  subtotal: string;
  color?: string;
}) {
  return (
    <>
      <p
        className={`section-cart__info-subtitle mt-8  ${color === "black" ? "!text-black" : ""} ${poppins.className}`}
      >
        <span>Subtotal:</span>$ {subtotal}
      </p>
      <p
        className={`section-cart__info-subtitle ${color === "black" ? "!text-black" : ""} ${poppins.className}`}
      >
        <span>Estimated shipping</span>$ 10
      </p>
    </>
  );
}
