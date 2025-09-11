export type Task = {
  id: number;
  title: string;
  status: "Todo" | "In Progress" | "Done";
};

export type Project = { id: number; name: string; tasks: Task[] };

export type AppContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (userDetails: boolean) => void;
  // Function
};
