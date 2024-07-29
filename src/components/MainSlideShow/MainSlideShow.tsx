"use client";
import React from "react";
import styles from "./MainSlideShow.module.scss";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Banner from "../Banner/Banner";

const PrevArrow = (props: any) => {
  const { className, onClick, style } = props;
  return (
    <div className={styles.prev} onClick={onClick} style={{ ...style }}>
      <div>
        <IoIosArrowBack />
      </div>
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

const MainSlideShow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyload: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: any) => (
      <div style={{ marginBottom: "30px" }}>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (dots: any) => <div className="dots"></div>,
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__slider}>
        <Slider {...settings}>
          <div>
            <Image
              src="/images/background.jpg"
              alt="hero"
              className={styles.container__image}
              width={500}
              height={500}
            />
          </div>
          <div>
            <Image
              src="/images/background2.jpg"
              className={styles.container__image}
              alt="hero"
              width={500}
              height={500}
            />
          </div>
        </Slider>
      </div>
      <div className={styles.container__banner}>
        <Banner image="/images/background.jpg" name="hero" />
        <Banner image="/images/background.jpg" name="hero" />
      </div>
    </div>
  );
};

export default MainSlideShow;
