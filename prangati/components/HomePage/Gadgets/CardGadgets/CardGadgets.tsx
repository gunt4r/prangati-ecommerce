"use client";
import classNames from "classnames";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

import styles from "./styleCardGadgets.module.css";

import { poppins, archivo } from "@/config/fonts";

interface PropsCard {
  title: string;
  image?: JSX.Element;
}
export default function CardGadgets({ card }: { card: PropsCard }) {
  return (
    <section className={classNames(styles["section-gadgets__card"])}>
      <p
        className={classNames(
          styles["section-gadgets__card-title"],
          poppins.className,
        )}
      >
        {card.title}
      </p>
      <Link
        className={classNames(
          styles["section-gadgets__card-link"],
          archivo.className,
        )}
      >
        READ MORE
      </Link>
      {card.image && (
        <motion.div
          className={styles["image-container"]}
          transition={{ type: "spring", stiffness: 100 }}
          whileHover={{ y: -15 }}
        >
          {card.image}
        </motion.div>
      )}
    </section>
  );
}
