"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import axios from "axios";

import HeadingSection from "../HeadingSection/HeadingSection";

import style from "./stylePromotions.module.css";

import CardProduct from "@/components/CardProduct/CardProduct";
import { Product } from "@/config/interfaces";
const Promotions = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}product`,
          {
            params: {
              limit: 9,
            },
          },
        );

        setProducts(response.data.data);
      } catch (error) {
        throw error;
      }
    };

    fetchProducts();
  }, []);

  const itemsPerPage = 3;

  const handleSwipe = (direction: number) => {
    let newIndex = activeIndex + direction;

    if (newIndex < 0) newIndex = Math.ceil(products.length / itemsPerPage) - 1;
    if (newIndex >= Math.ceil(products.length / itemsPerPage)) newIndex = 0;

    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
    trackMouse: true,
  });

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleDragEnd = (event: any, info: any) => {
    const dragOffset = info.offset.x;

    if (dragOffset < -100) {
      handleSwipe(1);
    } else if (dragOffset > 100) {
      handleSwipe(-1);
    }
  };

  const paginatedProducts = products.slice(
    activeIndex * itemsPerPage,
    activeIndex * itemsPerPage + itemsPerPage,
  );

  return (
    <div className={style["carousel-container"]}>
      <div className={style["section-carousel__wrapper"]}>
        <HeadingSection textHeading="PROMOTIONS" />
        <motion.div
          {...handlers}
          className={style["carousel-content"]}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ display: "flex" }}
          onDragEnd={handleDragEnd}
        >
          {paginatedProducts.map((product) => (
            <motion.div
              key={product.id}
              animate={{ opacity: 1, x: 0 }}
              className={style["carousel-item"]}
              exit={{ opacity: 0, x: -100 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{
                ease: "easeInOut",
                duration: 0.6,
              }}
            >
              <CardProduct product={product} />{" "}
            </motion.div>
          ))}
        </motion.div>

        <div className={style["pagination-dots"]}>
          {Array.from({
            length: Math.ceil(products.length / itemsPerPage),
          }).map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: activeIndex === index ? "45px" : "18px",
                backgroundColor: activeIndex === index ? "#000" : "#ccc",
              }}
              className={style["pagination-dot"]}
              initial={false}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
