import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register Page",
};

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default RegisterLayout;
