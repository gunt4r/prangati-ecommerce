"use client";
import "./styleCheckout.scss";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Header from "@/components/Header/Headerpage";
import Footer from "@/components/Footer/Footer";
import CheckoutBody from "@/components/Checkout";
import { useUUID } from "@/hooks/useUUID";
import { CartResponse } from "@/config/interfaces";

export default function Checkout() {
  const userID = useUUID();
  const router = useRouter();

  useEffect(() => {
    const handler = async () => {
      try {
        const data = await axios.get<CartResponse>(
          `${process.env.NEXT_PUBLIC_SERVER}cart/${userID}`,
        );

        if ((data as any).data.items.length == 0) {
          router.push("/cart");
        }
      } catch (error) {
        toast.error(`Error checking cart`);
        router.push("/cart");
      }
    };

    if (userID) {
      handler();
    }
  }, [userID, router]);

  return (
    <>
      <Header />
      <CheckoutBody classNames="mb-12" />
      <Footer />
    </>
  );
}
