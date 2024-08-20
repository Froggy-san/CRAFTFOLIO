import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/shared/Logo";
import AuroraBgComp from "@/components/shared/AuroraBgComp";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace={true} />;
  return (
    <div className="flex h-screen justify-between">
      <Logo className="absolute left-5 top-5 z-40" />
      <div className="flex h-fit min-h-full flex-1 items-center justify-center md:h-full">
        <Outlet />
      </div>
      <AuroraBgComp />
    </div>
  );
};

export default AuthLayout;
