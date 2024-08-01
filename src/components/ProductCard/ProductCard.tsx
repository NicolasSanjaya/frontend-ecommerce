import React from "react";
import styles from "./ProductCard.module.scss";
import Image from "next/image";
import { convertIdr } from "@/utils/convertIdr";
import Button from "../Button/Button";

type PropTypes = {
  image: string;
  name: string;
  price: number;
  sold: number;
};

const ProductCard = (props: PropTypes) => {
  const {
    image = "/images/background.jpg",
    name = "Product Name",
    price = 10000,
    sold = 300,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.container__image}>
        <Image
          src={`http://localhost:4000/${image}`}
          alt={name}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.container__name}>
        <h3 className={styles.container__name__text}>{name}</h3>
      </div>
      <div className={styles.container__price}>
        <p className={styles.container__price__text}>{convertIdr(price)}</p>
        <p className={styles.container__price__sold}>{sold} Sold</p>
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
