"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { loginFormValidation } from "@/utils/validations/auth";
import { appRoutes } from "@/utils/globalConstant";
import Loader from "@/components/parts/Loader";
import { useApp } from "@/contexts/AppContext";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const Login = () => {
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Contexts
  const { setIsAuthenticated } = useApp();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginFormValidation),
  });

  // Functions
  const onSubmitLogin: SubmitHandler<LoginFormInputs> = async (formData) => {
    try {
      const params = {
        email: formData.email,
        password: formData.password,
      };
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store token in sessionStorage
        sessionStorage.setItem("token", data.token);
        setIsAuthenticated(true);

        // ✅ Redirect to dashboard
        router.push("/dashboard");
      }
      console.log(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  // Hooks

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          {/* Header */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm sm:text-base text-center text-gray-600">
            Please sign in to your account
          </p>

          {/* Form */}
          <form className="" onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="mt-6 space-y-4">
              <div className="form-control py-2">
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  placeholder="Enter your email"
                  {...register("email")}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                />
              </div>
              <div className="form-control py-2">
                <TextField
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...register("password")}
                  size="medium"
                  variant="outlined"
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="button">
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                  className="!mt-2 !rounded-xl normal-case"
                  disabled={loading}
                >
                  Login
                </Button>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href={appRoutes.REGISTER}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
