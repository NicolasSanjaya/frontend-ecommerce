"use client";
import { redirect, useRouter } from "next/navigation";
import styles from "./Page.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user";
import MainSlideShow from "@/components/MainSlideShow/MainSlideShow";
import Banner from "@/components/Banner/Banner";
import CategoryBadge from "@/components/CategoryBadge/CategoryBadge";

export default function Home() {
  const router = useRouter();
  const { user, setUser }: any = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <main className={styles.main}>
      <div className={styles.main__navbar}>
        <Navbar />
      </div>
      <div className={styles.main__content}>
        <div className={styles.main__content__banner}>
          <MainSlideShow />
        </div>
        <div className={styles.main__content__category}>
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
          <CategoryBadge
            image="/images/background2.jpg"
            name="Category 1"
            link="/"
          />
        </div>
      </div>
    </main>
  );
}
