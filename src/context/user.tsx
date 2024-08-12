"use client";
import { UserType } from "@/types/User";
import { createContext, FC, useEffect, useState } from "react";

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: {
    name: "",
    email: "",
    id: "",
    phone: "",
    address: "",
    createdAt: "",
    updatedAt: "",
  },
  setUser: () => {},
  loading: true,
});

const UserProvider: FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType | any>();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:4000/users", {
          credentials: "include",
        });
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
