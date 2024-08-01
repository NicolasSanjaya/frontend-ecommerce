"use client";
import { UserType } from "@/types/User";
import { createContext, FC, useEffect, useState } from "react";

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
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
});

const UserProvider: FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    id: "",
    phone: "",
    address: "",
    createdAt: "",
    updatedAt: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
