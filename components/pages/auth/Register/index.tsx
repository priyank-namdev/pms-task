"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { signUpFormValidation } from "@/utils/validations/auth";
import { appRoutes } from "@/utils/globalConstant";
import Loader from "@/components/parts/Loader";
import { useApp } from "@/contexts/AppContext";

type RegisterFormInputs = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  // Contexts
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(signUpFormValidation),
  });
  const { setIsAuthenticated } = useApp();
  const router = useRouter();

  // States
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Functions
  const onSignUpSubmit: SubmitHandler<RegisterFormInputs> = async (
    formData
  ) => {
    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to register");
      } else {
        // ✅ Store token in sessionStorage
        sessionStorage.setItem("token", data.token);
        setIsAuthenticated(true);

        // ✅ Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          {/* Header */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Create an Account
          </h2>
          <p className="mt-2 text-sm sm:text-base text-center text-gray-600">
            Fill in the details to get started
          </p>

          {/* Form */}
          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit(onSignUpSubmit)}
          >
            {/* First & Last Name */}
            <TextField
              id="displayName"
              label="Full Name"
              fullWidth
              {...register("displayName")}
              size="medium"
              variant="outlined"
              error={errors.displayName ? true : false}
              helperText={errors.displayName?.message}
            />

            {/* Email */}
            <TextField
              id="email"
              label="Email"
              {...register("email")}
              type="email"
              fullWidth
              size="medium"
              variant="outlined"
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />

            {/* Password */}
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

            {/* Confirm Password */}
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              {...register("confirmPassword")}
              fullWidth
              size="medium"
              variant="outlined"
              type={showConfirm ? "text" : "password"}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm((prev) => !prev)}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className="mt-2 !rounded-xl normal-case"
            >
              Sign Up
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href={appRoutes.LOGIN}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
