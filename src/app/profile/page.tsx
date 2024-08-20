"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
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
import Loading from "../loading";
import { z } from "zod";

const updateUser = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
});

type UpdateUserType = z.infer<typeof updateUser>;

const ProfilePage = () => {
  const [newImage, setNewImage] = useState<File | null>(null);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  console.log(user);

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

  const { register, handleSubmit } = useForm<UpdateUserType>();

  const handleUpdateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newImage === null) {
      toast.error("Please select image");
      return;
    }

    try {
      setImageLoading(true);
      const formData = new FormData();
      formData.append("image", newImage!);
      const response = await fetch("http://localhost:4000/user-image", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (data.status) {
        setUser(data.data);
        toast.success("Update Profile Image success");
      }
    } catch (error: Error | any) {
      toast.error(error.message);
    } finally {
      setNewImage(null);
      setImageLoading(false);
    }
  };

  const handleUpdate = handleSubmit(async (value) => {
    const { email, name, phone } = value;
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          name,
          phone,
        }),
      });

      const data = await response.json();
      console.log(data);
      setUser(data.data);

      if (data.status === true) {
        toast.success("Update Profile User success");
      }
    } catch (error: Error | any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  const regularImage = `http://localhost:4000/${user?.image}`;

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
                      src={
                        user?.image != null
                          ? user?.type === null
                            ? regularImage
                            : user?.image
                          : "/images/user.png"
                      }
                      alt="User Profile Picture"
                      width={200}
                      height={200}
                      className={
                        styles.container__tabs__panel__left__container__image
                      }
                    />
                  )}
                  <form onSubmit={handleUpdateImage}>
                    <div>
                      <label
                        htmlFor="image"
                        className={
                          styles.container__tabs__panel__left__container__dots
                        }
                      >
                        <MdUpload />
                      </label>
                      <input
                        id="image"
                        type="file"
                        accept="images/"
                        className={
                          styles.container__tabs__panel__left__container__input
                        }
                        onChange={(e) => handleEdit(e)}
                      />
                    </div>
                    <Button type="submit" disabled={imageLoading}>
                      Update Image
                    </Button>
                  </form>
                </div>
                <p>Max Size is 1 MB</p>
              </div>
              <div className={styles.container__tabs__panel__right}>
                <form onSubmit={handleUpdate}>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    text="Name"
                    defaultValue={user?.name}
                    icon={<IoPersonSharp />}
                    register={register}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    text="Email"
                    defaultValue={user?.email}
                    icon={<MdOutlineEmail />}
                    register={register}
                  />
                  <Input
                    id="phone"
                    name="phone"
                    type="number"
                    text="Phone"
                    defaultValue={user?.phone}
                    icon={<FaPhoneAlt />}
                    register={register}
                  />
                  <BuyerAddress />
                  <Button
                    type="submit"
                    className={styles.container__tabs__panel__right__button}
                    disabled={isLoading}
                  >
                    Update
                  </Button>
                </form>
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
