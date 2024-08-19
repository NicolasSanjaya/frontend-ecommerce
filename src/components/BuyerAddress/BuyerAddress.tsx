"use client";
import React, { useState } from "react";
import styles from "./BuyerAddress.module.scss";
import { CiLocationOn } from "react-icons/ci";
import Button from "../Button/Button";
import Sidebar from "../Sidebar/Sidebar";

const BuyerAddress = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={styles.container}>
      <Sidebar isOpen={isEdit} setIsOpen={setIsEdit} />
      <div>
        <CiLocationOn /> Address
      </div>
      <div> Jl. Cempedak No. 1, Jakarta, Indonesia</div>
      <Button
        type="submit"
        className={styles.container__button}
        onClick={() => setIsEdit(true)}
      >
        Edit
      </Button>
    </div>
  );
};

export default BuyerAddress;
