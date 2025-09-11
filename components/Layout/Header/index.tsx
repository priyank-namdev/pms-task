"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/contexts/AppContext";
import { appRoutes } from "@/utils/globalConstant";
import { logoutUser } from "@/lib/firebase";

type HeaderProps = {
  isLoggedIn: boolean;
};

const Header = ({ isLoggedIn }: HeaderProps) => {
  const { isAuthenticated, setIsAuthenticated } = useApp();

  // Functions
  const handleLogout = async () => {
    try {
      await logoutUser();
      // alert("Logged out successfully");
      // optionally redirect to login page
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Failed to log out");
    }
  };

  useEffect(() => {
    if (isLoggedIn) setIsAuthenticated(true);

    return () => {
      setIsAuthenticated(false);
    };
  }, [isLoggedIn, setIsAuthenticated]);

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Logo + Nav */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold text-blue-600">
          PMS Tech
        </Link>
        {isAuthenticated && (
          <nav className="flex space-x-4">
            <Link href="/dashboard" className="text-blue-600 font-medium">
              Dashboard
            </Link>
          </nav>
        )}
      </div>

      {/* Right: Auth buttons */}
      <div>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href={appRoutes.LOGIN}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href={appRoutes.REGISTER}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
