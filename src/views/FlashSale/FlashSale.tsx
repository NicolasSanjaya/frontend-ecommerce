"use client";
import React, { useEffect, useState } from "react";
import styles from "./FlashSale.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { convertIdr } from "@/utils/convertIdr";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const PrevArrow = (props: any) => {
  const { className, onClick, style } = props;
  return (
    <div className={styles.prev} onClick={onClick} style={{ ...style }}>
      <IoIosArrowBack />
    </div>
  );
};
const NextArrow = (props: any) => {
  const { className, onClick, style } = props;
  return (
    <div className={styles.next} onClick={onClick} style={{ ...style }}>
      <IoIosArrowForward />
    </div>
  );
};

const FlashSale = () => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 5,
    lazyload: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // const targetDate = Date.now() + 24 * 60 * 60 * 1000;
  const targetDate = new Date("August 1, 2024 00:00").getTime();

  // Set the initial state
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Update the countdown every second
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  console.log(seconds);

  return (
    <div className={styles.container}>
      <h2 className={styles.container__title}>FlashSale</h2>
      <div className={styles.container__countdown}>
        <span>{isClient ? days : "0"}d</span>
        <span>{isClient ? hours : "0"}h</span>
        <span>{isClient ? minutes : "0"}m</span>
        <span>{isClient ? seconds : "0"}s</span>
      </div>
      <div className={`slider-container ${styles.container__product}`}>
        <Slider {...settings}>
          <Link href={"/"} className={styles.container__product__item}>
            <Image
              src="/images/background.jpg"
              alt="hero"
              width={200}
              height={200}
            />
            <h3 className={styles.container__product__item__name}>
              Name Product
            </h3>
            <p className={styles.container__product__item__price}>
              {convertIdr(10000)}
            </p>
            <p className={styles.container__product__item__originalPrice}>
              {convertIdr(20000)}
            </p>
            <div className={styles.container__product__item__rating}>
              <p className={styles.container__product__item__rating__star}>
                <span
                  className={
                    styles.container__product__item__rating__star__icon
                  }
                >
                  <FaStar />
                </span>
                4.9/5
              </p>
              <p className={styles.container__product__item__rating__sold}>
                200 Sold
              </p>
            </div>
          </Link>
          <Link href={"/"} className={styles.container__product__item}>
            <Image
              src="/images/background.jpg"
              alt="hero"
              width={200}
              height={200}
            />
            <h3 className={styles.container__product__item__name}>
              Name Product
            </h3>
            <p className={styles.container__product__item__price}>
              {convertIdr(10000)}
            </p>
            <p className={styles.container__product__item__originalPrice}>
              {convertIdr(20000)}
            </p>
            <div className={styles.container__product__item__rating}>
              <p className={styles.container__product__item__rating__star}>
                <span
                  className={
                    styles.container__product__item__rating__star__icon
                  }
                >
                  <FaStar />
                </span>
                4.9/5
              </p>
              <p className={styles.container__product__item__rating__sold}>
                200 Sold
              </p>
            </div>
          </Link>
          <Link href={"/"} className={styles.container__product__item}>
            <Image
              src="/images/background.jpg"
              alt="hero"
              width={200}
              height={200}
            />
            <h3 className={styles.container__product__item__name}>
              Name Product
            </h3>
            <p className={styles.container__product__item__price}>
              {convertIdr(10000)}
            </p>
            <p className={styles.container__product__item__originalPrice}>
              {convertIdr(20000)}
            </p>
            <div className={styles.container__product__item__rating}>
              <p className={styles.container__product__item__rating__star}>
                <span
                  className={
                    styles.container__product__item__rating__star__icon
                  }
                >
                  <FaStar />
                </span>
                4.9/5
              </p>
              <p className={styles.container__product__item__rating__sold}>
                200 Sold
              </p>
            </div>
          </Link>
          <Link href={"/"} className={styles.container__product__item}>
            <Image
              src="/images/background.jpg"
              alt="hero"
              width={200}
              height={200}
            />
            <h3 className={styles.container__product__item__name}>
              Name Product
            </h3>
            <p className={styles.container__product__item__price}>
              {convertIdr(10000)}
            </p>
            <p className={styles.container__product__item__originalPrice}>
              {convertIdr(20000)}
            </p>
            <div className={styles.container__product__item__rating}>
              <p className={styles.container__product__item__rating__star}>
                <span
                  className={
                    styles.container__product__item__rating__star__icon
                  }
                >
                  <FaStar />
                </span>
                4.9/5
              </p>
              <p className={styles.container__product__item__rating__sold}>
                200 Sold
              </p>
            </div>
          </Link>
          <Link href={"/"} className={styles.container__product__item}>
            <Image
              src="/images/background.jpg"
              alt="hero"
              width={200}
              height={200}
            />
            <h3 className={styles.container__product__item__name}>
              Name Product
            </h3>
            <p className={styles.container__product__item__price}>
              {convertIdr(10000)}
            </p>
            <p className={styles.container__product__item__originalPrice}>
              {convertIdr(20000)}
            </p>
            <div className={styles.container__product__item__rating}>
              <p className={styles.container__product__item__rating__star}>
                <span
                  className={
                    styles.container__product__item__rating__star__icon
                  }
                >
                  <FaStar />
                </span>
                4.9/5
              </p>
              <p className={styles.container__product__item__rating__sold}>
                200 Sold
              </p>
            </div>
          </Link>
          <Link href={"/"} className={styles.container__product__item}>
            <Image
              src="/images/background.jpg"
              alt="hero"
              width={200}
              height={200}
            />
            <h3 className={styles.container__product__item__name}>
              Name Product
            </h3>
            <p className={styles.container__product__item__price}>
              {convertIdr(10000)}
            </p>
            <p className={styles.container__product__item__originalPrice}>
              {convertIdr(20000)}
            </p>
            <div className={styles.container__product__item__rating}>
              <p className={styles.container__product__item__rating__star}>
                <span
                  className={
                    styles.container__product__item__rating__star__icon
                  }
                >
                  <FaStar />
                </span>
                4.9/5
              </p>
              <p className={styles.container__product__item__rating__sold}>
                200 Sold
              </p>
            </div>
          </Link>
          <Link href={"/"} className={styles.container__product__item}>
            <Image
              src="/images/background.jpg"
              alt="hero"
              width={200}
              height={200}
            />
            <h3 className={styles.container__product__item__name}>
              Name Product
            </h3>
            <p className={styles.container__product__item__price}>
              {convertIdr(10000)}
            </p>
            <p className={styles.container__product__item__originalPrice}>
              {convertIdr(20000)}
            </p>
            <div className={styles.container__product__item__rating}>
              <p className={styles.container__product__item__rating__star}>
                <span
                  className={
                    styles.container__product__item__rating__star__icon
                  }
                >
                  <FaStar />
                </span>
                4.9/5
              </p>
              <p className={styles.container__product__item__rating__sold}>
                200 Sold
              </p>
            </div>
          </Link>
          <Link href={"/"} className={styles.container__product__item}>
            <Image
              src="/images/background.jpg"
              alt="hero"
              width={200}
              height={200}
            />
            <h3 className={styles.container__product__item__name}>
              Name Product
            </h3>
            <p className={styles.container__product__item__price}>
              {convertIdr(10000)}
            </p>
            <p className={styles.container__product__item__originalPrice}>
              {convertIdr(20000)}
            </p>
            <div className={styles.container__product__item__rating}>
              <p className={styles.container__product__item__rating__star}>
                <span
                  className={
                    styles.container__product__item__rating__star__icon
                  }
                >
                  <FaStar />
                </span>
                4.9/5
              </p>
              <p className={styles.container__product__item__rating__sold}>
                200 Sold
              </p>
            </div>
          </Link>
        </Slider>
      </div>
    </div>
  );
};

export default FlashSale;
