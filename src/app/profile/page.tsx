"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Page.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.scss";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { IoPersonSharp } from "react-icons/io5";
import Image from "next/image";
import { MdUpload } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Button from "@/components/Button/Button";
import BuyerAddress from "@/components/BuyerAddress/BuyerAddress";
import Sidebar from "@/components/Sidebar/Sidebar";
import { UserContext } from "@/context/user";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [newImage, setNewImage] = useState<File | null>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(newImage);
  }, [newImage]);
  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      const file = target.files[0];
      setNewImage(file);
    } else {
      toast.error("No file selected");
    }
  };

  const { register } = useForm();
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>ProfilePage</h1>
      <div className={styles.container}>
        <Tabs
          className={styles.container__tabs}
          selectedTabClassName={styles.container__tabs__selected}
        >
          <TabList>
            <Tab tabIndex="0" style={{ top: 0 }}>
              <h2 className={styles.tab}>Buyer Information</h2>
            </Tab>
            <Tab tabIndex="0" style={{ top: 0 }}>
              <h2 className={styles.tab}>Seller Information</h2>
            </Tab>
          </TabList>
          <TabPanel>
            <div className={styles.container__tabs__panel}>
              <div className={styles.container__tabs__panel__left}>
                <div className={styles.container__tabs__panel__left__container}>
                  {newImage?.name ? (
                    <Image
                      src={URL.createObjectURL(newImage)}
                      alt="User Profile Picture"
                      width={200}
                      height={200}
                      className={
                        styles.container__tabs__panel__left__container__image
                      }
                    />
                  ) : (
                    <Image
                      src={user.image ? user.image : "/images/user.png"}
                      alt="User Profile Picture"
                      width={200}
                      height={200}
                      className={
                        styles.container__tabs__panel__left__container__image
                      }
                    />
                  )}
                  <label
                    htmlFor="image"
                    className={
                      styles.container__tabs__panel__left__container__dots
                    }
                  >
                    <MdUpload />
                  </label>
                  <form>
                    <input
                      id="image"
                      type="file"
                      accept="images/"
                      className={
                        styles.container__tabs__panel__left__container__input
                      }
                      onChange={(e) => handleEdit(e)}
                    />
                  </form>
                </div>
                <p>Max Size is 1 MB</p>
              </div>
              <div className={styles.container__tabs__panel__right}>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  text="Name"
                  defaultValue={user.name}
                  icon={<IoPersonSharp />}
                  register={register}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  text="Email"
                  defaultValue={user.email}
                  icon={<MdOutlineEmail />}
                  register={register}
                />
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  text="Phone"
                  defaultValue={user.phone}
                  icon={<FaPhoneAlt />}
                  register={register}
                />
                <BuyerAddress />
                <Button
                  type="submit"
                  className={styles.container__tabs__panel__right__button}
                >
                  Update
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.container__tabs__panel}>
              <div className={styles.container__tabs__panel__left}>
                <h1>Profile Pic</h1>
              </div>
              <div className={styles.container__tabs__panel__right}>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  text="Name"
                  icon={<IoPersonSharp />}
                  register={register}
                />
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
