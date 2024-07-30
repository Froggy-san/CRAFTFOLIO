import Background from "@/components/shared/Background";
import ErrorComp from "@/components/shared/ErrorComp";
import FullSnLoading from "@/components/shared/FullSnLoading";
import Header from "@/components/shared/Header";
import LinkBtn from "@/components/shared/LinkBtn";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullSnLoading />;

  if (!isAuthenticated)
    return (
      <ErrorComp
        message={
          <div className=" flex flex-col sm:flex-row items-center gap-3">
            <p className=" text-center font-semibold ">
              You are not authrized to do this action, please login first{" "}
            </p>
            <LinkBtn size="sm" to="/login">
              Login
            </LinkBtn>
          </div>
        }
      />
    );

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoutes;
