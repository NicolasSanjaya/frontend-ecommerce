"use client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./Login.module.scss";

const LoginPage = () => {
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

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
    console.log(data);
    if (data.statusCode === 200) {
      router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__form}>
        <h1>Login Page</h1>
        <form onSubmit={handleLogin}>
          <input type="text" name="email" />
          <input type="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
