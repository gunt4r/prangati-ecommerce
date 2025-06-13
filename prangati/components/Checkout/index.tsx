import "./styleCheckoutBody.scss";
import Container from "../Container/Container";

import CheckoutForm from "./CheckoutForm";
import CheckoutInfo from "./CheckoutInfo";

import TitleHeader from "@/utils/TitleHeader/TitleHeader";
export default function CheckoutBody({ classNames }: { classNames?: string }) {
  return (
    <div className={`${classNames}`}>
      <Container>
        <TitleHeader text="Checkout" />
        <div className="checkout__body">
          <CheckoutForm />
          <CheckoutInfo />
        </div>
      </Container>
    </div>
  );
}
