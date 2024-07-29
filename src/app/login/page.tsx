"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import styles from "./Login.module.scss";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { UserContext } from "@/context/user";
import { UserType } from "@/types/User";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser }: any = useContext(UserContext);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      setUser(data.data);
      setIsLoading(false);
      toast.success(data.message);

      console.log(data);
      if (data.statusCode === 200) {
        router.push("/");
      }
    } catch (error: Error | any) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Login</h1>
      <div className={styles.container__content}>
        <form
          onSubmit={handleLogin}
          className={styles.container__content__form}
        >
          <Input text="Email" type="email" name="email" icon={<MdEmail />} />
          <Input
            text="Password"
            type="password"
            name="password"
            icon={<RiLockPasswordFill />}
          />
          <p>
            Don&apos;t Have an Account?{" "}
            <Link
              href={"/register"}
              className={styles.container__content__link}
            >
              Sign Up Here
            </Link>
          </p>
          <Button
            type="submit"
            className={styles.container__content__button}
            disabled={isLoading}
          >
            Login
          </Button>
          <button
            type="button"
            className={styles.container__content__button__google}
            disabled={isLoading}
          >
            <FcGoogle
              className={styles.container__content__button__google__icon}
            />{" "}
            Login With Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
