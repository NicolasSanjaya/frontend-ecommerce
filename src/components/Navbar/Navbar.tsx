import React, { useContext, useEffect } from "react";
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
  useEffect(() => {
    console.log(user);
  }, [user]);
  const handleLogout = async () => {
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
                  onClick={() => handleLogout()}
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
              <FiShoppingCart />
              <IoMdNotificationsOutline />
              <GrLanguage />
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
