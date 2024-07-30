import React from "react";
import styles from "./Recommendation.module.scss";
import ProductCard from "@/components/ProductCard/ProductCard";

const Recommendation = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.container__title}>Recommendation</h3>
      <div className={styles.container__card}>
        <ProductCard />
      </div>
    </div>
  );
};

export default Recommendation;
