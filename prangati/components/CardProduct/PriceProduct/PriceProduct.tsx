import { Link } from "@heroui/link";
import "./stylePriceProduct.scss";

export default function PriceProduct({
  price,
  link,
  className,
  quantity,
}: {
  price: number;
  link: string;
  className?: string;
  quantity?: number;
}) {
  const finalPrice = price * (quantity ? quantity : 1);

  return (
    <Link className={"section-card__wrapper-details"} href={`/product/${link}`}>
      <p className={`section-card__wrapper-details__price ${className}`}>
        ${finalPrice.toFixed(2)}
        {String(price).includes(".") ? "" : ".00"}
      </p>
    </Link>
  );
}
