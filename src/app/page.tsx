"use client";
import { redirect, useRouter } from "next/navigation";
import styles from "./Page.module.scss";
import Navbar from "@/components/Navbar/Navbar";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/context/user";
import MainSlideShow from "@/components/MainSlideShow/MainSlideShow";
import Banner from "@/components/Banner/Banner";
import CategoryBadge from "@/components/CategoryBadge/CategoryBadge";
import FlashSale from "@/views/FlashSale/FlashSale";
import Recommendation from "@/views/Recommendation/Recommendation";
import { IoMdPhonePortrait } from "react-icons/io";
import { FaTshirt } from "react-icons/fa";
import { BsSunglasses } from "react-icons/bs";
import { CiMedicalMask } from "react-icons/ci";
import { MdOutlineKitchen } from "react-icons/md";
import { GiConverseShoe } from "react-icons/gi";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { IoMdRocket } from "react-icons/io";

export default function Home() {
  const router = useRouter();
  const { user, setUser }: any = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);
  const scroll = useRef<HTMLDivElement>(null);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

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
            icon={<IoMdPhonePortrait />}
            name="Electronics"
            link="/"
          />
          <CategoryBadge icon={<FaTshirt />} name="Men's Clothes" link="/" />
          <CategoryBadge
            icon={<BsSunglasses />}
            name="Fashion & Accessories"
            link="/"
          />
          <CategoryBadge icon={<CiMedicalMask />} name="Health" link="/" />
          <CategoryBadge
            icon={<MdOutlineKitchen />}
            name="Home Appliances"
            link="/"
          />
          <CategoryBadge
            icon={<GiConverseShoe />}
            name="Men's Shoes"
            link="/"
          />
          <CategoryBadge
            icon={<GiFullMotorcycleHelmet />}
            name="Automotive"
            link="/"
          />
        </div>
        <div className={styles.main__content__flashsale}>
          <FlashSale />
        </div>
        <div className={styles.main__content__recommendation}>
          <Recommendation />
        </div>
      </div>
      <div
        className={isVisible ? styles.main__arrow : styles.main__arrowHidden}
        onClick={handleScrollToTop}
        ref={scroll}
      >
        <IoMdRocket />
      </div>
    </main>
  );
}
