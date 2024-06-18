import { getCurrentUser } from "@/services/authApi";
import { User } from "@/types/types";
import { format } from "date-fns";
import React, { createContext, useEffect, useState } from "react";

const initailUser = {
  aud: "",
  email: "",
  id: "",
  avatar: "",
  phone: "",
  socials: "",
  speciality: "",
  username: "",
  created_at: "",
  role: "",
  resumeUrl: "",
};

const INITIAL_STATE = {
  user: initailUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean, // check this line of code in the video again .
};

export type IContextType = {
  user: User | undefined;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthContextProvidor = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  const checkAuthUser = async () => {
    try {
      setIsloading(true);

      const currentUser = await getCurrentUser(); // getting the current user.

      console.log(currentUser, "user data.1!");
      if (currentUser) {
        setUser({
          aud: currentUser.aud,
          email: currentUser.email,
          id: currentUser.id,
          socials: currentUser.user_metadata.socials,
          avatar: currentUser.user_metadata.avatar,
          phone: currentUser.user_metadata.phone,
          speciality: currentUser.user_metadata.speciality,
          username: currentUser.user_metadata.username,
          role: currentUser.user_metadata.role,
          resumeUrl: currentUser.user_metadata.resumeUrl,
          created_at: currentUser.created_at,
        });
        setIsAuthenticated(true);
        return true;
      } else {
        setUser(undefined);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(undefined);
      return false;
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    // if (!localStorage.getItem("gameToken")) return;
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvidor;
