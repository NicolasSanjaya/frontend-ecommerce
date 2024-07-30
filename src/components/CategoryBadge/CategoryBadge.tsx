import React from "react";
import styles from "./CategoryBadge.module.scss";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";

type PropTypes = {
  icon: React.ReactNode;
  name: string;
  link: string;
  className?: string;
};

const CategoryBadge = (props: PropTypes) => {
  const { icon, name, link, className } = props;
  return (
    <div className={styles.container}>
      <Link href={link}>
        <div className={styles.container__image}>
          <div className={`${styles.container__image__icon} ${className}`}>
            {icon}
          </div>
        </div>
        <div className={styles.container__name}>
          <p className={styles.container__name__text}>{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryBadge;
