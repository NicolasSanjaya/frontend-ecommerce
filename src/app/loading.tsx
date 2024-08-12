import React, { useEffect } from "react";
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__loader}></div>
    </div>
  );
};

export default Loading;
