import React from "react";
import styles from "./CategoryBadge.module.scss";
import Image from "next/image";
import Link from "next/link";

type PropTypes = {
  image: string;
  name: string;
  link: string;
};

const CategoryBadge = (props: PropTypes) => {
  const { image, name, link } = props;
  return (
    <div className={styles.container}>
      <Link href={link}>
        <div className={styles.container__image}>
          <Image src={image} alt={name} width={100} height={100} />
        </div>
        <div className={styles.container__name}>
          <p className={styles.container__name__text}>{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryBadge;
