import { Link } from "@heroui/link";
import "./stylePriceProduct.scss";

export default function PriceProduct({
  price,
  link,
  className,
  addZeroes,
}: {
  price: number;
  link: string;
  className?: string;
  addZeroes?: boolean;
}) {
  return (
    <Link className={"section-card__wrapper-details"} href={`/product/${link}`}>
      <p className={`section-card__wrapper-details__price ${className}`}>
        ${price}
        {addZeroes ? ".00" : ""}
      </p>
    </Link>
  );
}
