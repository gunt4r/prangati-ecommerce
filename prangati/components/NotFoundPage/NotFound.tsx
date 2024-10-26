"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import styles from "./styleNotFound.module.css";

import { manrope } from "@/config/fonts";

const NotFoundComponent = () => {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "auto",
          marginTop: ".7%",
        }}
      >
        <div className={styles.errorTextWrapper}>
          <div className={`${styles.errorTextTop} ${manrope.className}`}>
            404
          </div>
          <div className={`${styles.errorTextBottom} ${manrope.className}`}>
            404
          </div>
        </div>
        <p className={`${styles.notFoundText} ${manrope.className}`}>
          Not Found
        </p>
        <Link href="/">
          <Button
            className="bg-default-900 text-default-50 w-60 flex mx-auto"
            color="default"
            radius="full"
            size="lg"
            variant="flat"
          >
            Back To Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundComponent;
