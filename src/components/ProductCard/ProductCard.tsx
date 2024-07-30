import React from "react";
import styles from "./ProductCard.module.scss";
import Image from "next/image";
import { convertIdr } from "@/utils/convertIdr";
import Button from "../Button/Button";

const ProductCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__image}>
        <Image
          src="/images/background.jpg"
          alt="hero"
          width={200}
          height={200}
        />
      </div>
      <div className={styles.container__name}>
        <h3 className={styles.container__name__text}>Product Name</h3>
      </div>
      <div className={styles.container__price}>
        <p className={styles.container__price__text}>{convertIdr(10000)}</p>
        <p className={styles.container__price__sold}>300 Sold</p>
      </div>
      <div>
        <Button type="button" className={styles.container__button}>
          Buy
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
