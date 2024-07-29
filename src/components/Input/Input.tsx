import React, { useEffect, useRef, useState } from "react";
import styles from "./Input.module.scss";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type PropTypes = {
  type: string;
  text: string;
  name: string;
  icon?: React.ReactNode;
};

const Input = (props: PropTypes) => {
  const { type, text, name, icon } = props;
  const [isPassword, setIsPassword] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    type === "password" && setIsPassword(true);
  }, [type]);
  return (
    <div className={styles.container}>
      <input
        name={name}
        type={type === "password" ? (isPassword ? "password" : "text") : type}
        className={styles.container__input}
        placeholder=""
        autoComplete="off"
        ref={ref}
      />
      <label
        htmlFor={name}
        className={styles.container__label}
        onClick={() => {
          ref?.current?.focus();
        }}
      >
        {text}
      </label>
      <div className={styles.container__icon}>{icon}</div>
      {type === "password" && (
        <div
          className={styles.container__visible}
          onClick={() => setIsPassword(!isPassword)}
        >
          {isPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}
    </div>
  );
};

export default Input;
