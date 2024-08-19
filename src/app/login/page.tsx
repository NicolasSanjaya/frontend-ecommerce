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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginType = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser }: any = useContext(UserContext);

  const { register, handleSubmit, formState, reset } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const email = values.email;
    const password = values.password;

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
      // localStorage.setItem("user", JSON.stringify(data.data));

      if (data.statusCode === 200) {
        router.replace("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error: Error | any) {
      setIsLoading(false);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      reset();
    }
  });

  const loginWithGoogle = async () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Login</h1>
      <div className={styles.container__content}>
        <form onSubmit={onSubmit} className={styles.container__content__form}>
          <Input
            id="email"
            text="Email"
            type="email"
            icon={<MdEmail />}
            name="email"
            register={register}
          />
          {formState.errors.email && (
            <p className={styles.error}>{formState.errors.email.message}</p>
          )}
          <Input
            id="password"
            text="Password"
            type="password"
            name="password"
            icon={<RiLockPasswordFill />}
            register={register}
          />
          {formState.errors.password && (
            <p className={styles.error}>{formState.errors.password.message}</p>
          )}
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
            onClick={loginWithGoogle}
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
