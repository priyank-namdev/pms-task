"use client";

import React, {
  createContext,
  useContext,
  // useEffect,
  useMemo,
  useState,
} from "react";

import { AppContextType } from "@/utils/types";

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Constants

  // States
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Contexts

  // Functions

  // Hooks

  // We wrap it in a useMemo for performance reason
  const contextPayload = useMemo(
    () => ({
      // States
      isAuthenticated,
      setIsAuthenticated,

      // Functions
    }),
    [
      // States
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
