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

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
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
      console.log(data);
      if (data.statusCode === 200) {
        router.push("/login");
      }
    } catch (error: Error | any) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
    form.reset();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Register</h1>
      <div className={styles.container__content}>
        <form
          onSubmit={handleRegister}
          className={styles.container__content__form}
        >
          <Input text="Name" type="text" name="name" icon={<IoMdPerson />} />
          <Input text="Email" type="email" name="email" icon={<MdEmail />} />
          <Input
            text="Password"
            type="password"
            name="password"
            icon={<RiLockPasswordFill />}
          />
          <Input
            text="Confirm Password"
            type="password"
            name="confirm-password"
            icon={<RiLockPasswordFill />}
          />
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
