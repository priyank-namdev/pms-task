import dynamic from "next/dynamic";
import React from "react";
const Login = dynamic(() => import("@/components/pages/auth/Login"));

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
