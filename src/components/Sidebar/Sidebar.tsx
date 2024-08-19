import React, { Dispatch, useEffect, useRef } from "react";
import styles from "./Sidebar.module.scss";
import { IoClose } from "react-icons/io5";

type PropTypes = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = (props: PropTypes) => {
  const { isOpen, setIsOpen } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className={`${styles.container} ${
        isOpen ? styles.container__open : styles.container__close
      }`}
      ref={ref}
    >
      <div
        className={styles.container__button}
        onClick={() => setIsOpen(false)}
      >
        <IoClose />
      </div>
      <h1>Sidebar</h1>
    </div>
  );
};

export default Sidebar;
