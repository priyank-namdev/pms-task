import React from "react";
const Register = dynamic(
  () => import("@/components/pages/auth/Register")
);
import dynamic from "next/dynamic";

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
