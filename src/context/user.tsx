"use client";
import { UserType } from "@/types/User";
import { useRouter } from "next/navigation";
import { createContext, FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  loading: boolean;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: {
    name: "",
    email: "",
    id: "",
    image: "",
    phone: "",
    address: "",
    createdAt: "",
    updatedAt: "",
  },
  setUser: () => {},
  loading: true,
  logout: () => {},
});

const UserProvider: FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUser = window?.localStorage?.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
  });
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  if (localStorage.getItem("user") == "undefined") {
    localStorage.removeItem("user");
  }

  console.log(localStorage.getItem("user"));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user);

    if (localStorage.getItem("user") == "undefined") {
      localStorage.removeItem("user");
    }
    window.scrollTo(0, 0);
  }, [user]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:4000/user", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        setUser(data.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    try {
      const response = await fetch("http://localhost:4000/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      router.replace("/");
      localStorage.removeItem("user");
      setUser({} as UserType);
      toast.success(data.message);
    } catch (error: Error | any) {
      toast.error(error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
