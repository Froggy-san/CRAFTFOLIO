import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/shared/Logo";
import AuroraBgComp from "@/components/shared/AuroraBgComp";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace={true} />;
  return (
    <div className="flex   justify-between h-screen ">
      <Logo
        className=" absolute left-5
      top-5"
      />
      <div className="flex-1  flex justify-center items-center  min-h-full md:h-full h-fit ">
        <Outlet />
      </div>
      <AuroraBgComp />
    </div>
  );
};

export default AuthLayout;
