"use client";
import { redirect, useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const handleGetUsers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/users", {
        credentials: "include",
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data.statusCode === 400) {
        // router.push("/login");W
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:4000/user/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <main className={styles.main}>
      <h1>Home</h1>

      <form onSubmit={handleLogout}>
        <button type="submit">Logout</button>
      </form>
      <form onSubmit={handleGetUsers}>
        <button type="submit">Get Users</button>
      </form>
    </main>
  );
}
