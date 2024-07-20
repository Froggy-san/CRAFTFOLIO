import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(`you have used  the context out of it's providor`);
  return context;
}
