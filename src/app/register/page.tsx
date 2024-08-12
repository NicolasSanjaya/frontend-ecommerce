"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./Register.module.scss";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import { toast } from "react-toastify";
import { IoMdPerson } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

type RegisterType = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const { name, email, password, confirmPassword } = values;
    if (confirmPassword !== password) {
      toast.error("Password does not match");
      reset();
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          phone: "",
          address: "",
        }),
      });
      const data = await response.json();
      setIsLoading(false);
      toast.success("success");
      if (data.statusCode === 200) {
        router.push("/login");
      }
    } catch (error: Error | any) {
      setIsLoading(false);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      reset();
    }
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (confirmPassword !== password) {
      toast.error("Password does not match");
      form.reset();
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          phone: "",
          address: "",
        }),
      });
      const data = await response.json();
      setIsLoading(false);
      toast.success("success");

      if (data.statusCode === 200) {
        router.push("/login");
      }
    } catch (error: Error | any) {
      setIsLoading(false);
      toast.error(error.message);
    }
    form.reset();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Register</h1>
      <div className={styles.container__content}>
        <form onSubmit={onSubmit} className={styles.container__content__form}>
          <Input
            id="name"
            text="Name"
            type="text"
            name="name"
            icon={<IoMdPerson />}
            register={register}
          />
          {formState.errors.name && (
            <p className={styles.error}>{formState.errors.name.message}</p>
          )}
          <Input
            id="email"
            text="Email"
            type="email"
            name="email"
            icon={<MdEmail />}
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
          <Input
            id="confirmPassword"
            text="Confirm Password"
            type="password"
            name="confirmPassword"
            icon={<RiLockPasswordFill />}
            register={register}
          />
          {formState.errors.confirmPassword && (
            <p className={styles.error}>
              {formState.errors.confirmPassword.message}
            </p>
          )}
          <p>
            Already Have an Account?{" "}
            <Link href={"/login"} className={styles.container__content__link}>
              Login Here
            </Link>
          </p>
          <Button
            type="submit"
            className={styles.container__content__button}
            disabled={isLoading}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
