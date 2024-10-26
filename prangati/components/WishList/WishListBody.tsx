"use client";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

import CardProduct from "../CardProduct/CardProduct";

import style from "./styleWishListBody.module.css";

import { RootState } from "@/store";
import { poppins } from "@/config/fonts";
import TitleHeader from "@/utils/TitleHeader/TitleHeader";

const WishListBody = () => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className={classNames(style["section-wish__wrapper"])}>
      <TitleHeader text="WishList" />
      {wishlist.length === 0 ? (
        <div>
          <p
            className={classNames(
              style["section-wish__subtitle"],
              poppins.className,
            )}
          >
            Explore the products you’ve added to your wishlist. Share them with
            friends, family, or even our experts to help you find the perfect
            match!
          </p>
          <hr className={classNames(style["section-wish__line"])} />
          <Link className=" flex mx-auto" href="/gadgets">
            <Button
              className={`bg-default-900 text-default-50 w-40 flex mx-auto text-lg ${poppins.className}`}
              color="default"
              radius="full"
              size="lg"
              variant="flat"
            >
              Explore
            </Button>
          </Link>
        </div>
      ) : (
        <div className={classNames(style["section-wish__cards"])}>
          {wishlist.map((item, index) => (
            <CardProduct key={index} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListBody;
