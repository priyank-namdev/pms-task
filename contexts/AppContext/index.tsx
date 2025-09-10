"use client";

import React, {
  createContext,
  useContext,
  // useEffect,
  useMemo,
  useState,
} from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AppContextType } from "@/utils/types";

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Constants
  // const token = sessionStorage.getItem("token");

  // States
  // const [isLoading, setIsLoading] = useState(false);
  // const [userDetails, setUserDetails] = useState<userDetailType>({
  //   userId: "",
  //   email: "",
  // });

  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isMobileView, setIsMobileView] = useState<boolean>(false);

  // Contexts
  // const router = useRouter();

  // Functions

  // Hooks

  // useEffect(() => {
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, [token]);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, [userDetails]);

  // useEffect(() => {
  //   if (alert.length > 0) {
  //     const timer = setTimeout(
  //       () => setAlert((extAlerts: any) => extAlerts.slice(1)),
  //       alert?.timeOut ?? 5000
  //     );
  //     // End RRWEB-1174 @dt 14th April 2025 by Priyank
  //     return () => clearTimeout(timer);
  //   }
  // }, [alert]);

  // useEffect(() => {
  //   setIsMobileView(screenSize <= 1023); // Set isMobileView based on screenSize <= 1023
  //   // setIsMobileView(screenSize <= 1199); // Set isMobileView based on screenSize <= 1199
  // }, [screenSize]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setScreenSize(window.innerWidth);
  //     window.addEventListener("resize", () => {
  //       setScreenSize(window.innerWidth);
  //     });
  //   }
  // }, []);

  // We wrap it in a useMemo for performance reason
  const contextPayload = useMemo(
    () => ({
      // States
      // userDetails,
      // setUserDetails,
      isAuthenticated,
      setIsAuthenticated,

      // Functions
    }),
    [
      // States
      // userDetails,
      // setUserDetails,
      isAuthenticated,
      setIsAuthenticated,

      // Functions
    ]
  );

  // We expose the context's value down to our components, while
  // also making sure to render the proper content to the screen
  return (
    <AppContext.Provider value={contextPayload}>{children}</AppContext.Provider>
  );
};
// A custom hook to quickly read the context's value. It's
// only here to allow quick imports
export const useApp = () => useContext(AppContext) as AppContextType;

export default AppContext;
