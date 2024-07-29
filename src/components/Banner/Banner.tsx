import Image from "next/image";
import React from "react";
import styles from "./Banner.module.scss";

type PropTypes = {
  image: string;
  name: string;
};

const Banner = (props: PropTypes) => {
  const { image, name } = props;
  return (
    <div className={styles.container}>
      <Image
        src={image}
        alt={name}
        width={500}
        height={100}
        className={styles.container__image}
      />
    </div>
  );
};

export default Banner;
