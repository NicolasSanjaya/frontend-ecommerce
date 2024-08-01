import React, { useEffect, useRef, useState } from "react";
import styles from "./Input.module.scss";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

type PropTypes = {
  id: string;
  type: string;
  text: string;
  name: string;
  icon?: React.ReactNode;
  register?: any;
};

const Input = (props: PropTypes) => {
  const { type, text, name, icon, id, register, ...rest } = props;

  const [isPassword, setIsPassword] = useState(false);
  useEffect(() => {
    type === "password" && setIsPassword(true);
  }, [type]);

  return (
    <div className={styles.container}>
      <input
        className={styles.container__input}
        placeholder=""
        id={id}
        type={type === "password" ? (isPassword ? "password" : "text") : type}
        {...register(name)}
        {...rest}
      />
      <label htmlFor={id} className={styles.container__label}>
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
