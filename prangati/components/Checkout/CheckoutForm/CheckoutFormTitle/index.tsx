import "./styleCheckoutFormTitle.scss";
import { poppins } from "@/config/fonts";
export default function CheckoutFormTitle({ title }: { title: string }) {
  return (
    <h3 className={`checkout-form-title mb-6 ${poppins.className}`}>{title}</h3>
  );
}
