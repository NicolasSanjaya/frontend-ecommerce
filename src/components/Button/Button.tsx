import React from "react";
import styles from "./Button.module.scss";

type PropTypes = {
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  children: string;
  className?: string;
  disabled?: boolean;
};

const Button = (props: PropTypes) => {
  const { children, type, onClick, className, disabled } = props;
  return (
    <div className={styles.container}>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.container__button} ${className}`}
        disabled={disabled}
      >
        {disabled ? (
          <div className={styles.container__button__disabled}>{children}</div>
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default Button;
