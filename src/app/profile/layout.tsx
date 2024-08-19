import Head from "next/head";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile Page",
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ProfileLayout;
