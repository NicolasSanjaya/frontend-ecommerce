import React, { useEffect, useState } from "react";
import styles from "./Recommendation.module.scss";
import ProductCard from "@/components/ProductCard/ProductCard";
import { toast } from "react-toastify";

const Recommendation = () => {
  const [data, setData] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/products");
      const data = await response.json();
      setData(data);
    } catch (error: Error | any) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className={styles.container}>
      <h3 className={styles.container__title}>Recommendation</h3>
      <div className={styles.container__card}>
        {data?.map((item: any) => (
          <div key={item.id}>
            <ProductCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
