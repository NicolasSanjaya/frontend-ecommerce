import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { UserContext } from "@/context/user";
import { UserType } from "@/types/User";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrLanguage } from "react-icons/gr";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
];

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const [isShowLanguage, setIsShowLanguage] = useState<boolean>(false);
  const languageRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (isShowLanguage === true) {
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        languageRef.current.style.display = "none";
      }
    }
    e.stopPropagation();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [languageRef, isShowLanguage]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/user/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    setUser({} as UserType);
    toast.success(data.message);
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__logo}>Logo</div>
      <div className={styles.container__links}>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={styles.container__links__item}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className={styles.container__profile}>
        {user.email ? (
          <>
            <p>{(user as UserType).name}</p>
            <div className={styles.container__profile__icon}>
              {" "}
              <IoIosArrowDown />
              <div className={styles.container__profile__icon__items}>
                <Link
                  href={"/profile"}
                  className={styles.container__profile__icon__items__profile}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={styles.container__profile__icon__items__logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.container__profile__info}>
              <div className={styles.container__profile__info__cart}>
                <FiShoppingCart />
                <div className={styles.container__profile__info__cart__count}>
                  0
                </div>
              </div>
              <div className={styles.container__profile__info__notification}>
                <IoMdNotificationsOutline />
                <div className={styles.container__profile__info__cart__count}>
                  0
                </div>
              </div>
              <div
                className={styles.container__profile__info__language}
                onClick={(e) => {
                  setIsShowLanguage(!isShowLanguage);
                  handleClickOutside(e);
                }}
              >
                <GrLanguage />
                {isShowLanguage && (
                  <div
                    ref={languageRef}
                    className={styles.container__profile__info__language__items}
                  >
                    <div
                      className={
                        styles.container__profile__info__language__items__item
                      }
                    >
                      Indonesia
                    </div>
                    <div
                      className={
                        styles.container__profile__info__language__items__item
                      }
                    >
                      English
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Link href="/login" className={styles.container__profile__login}>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
