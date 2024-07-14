import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import AuroraBgComp from "./AuroraBgComp";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace={true} />;
  return (
    <div className="flex   justify-between h-screen">
      <Logo
        className=" absolute left-5
      top-5"
      />
      <div className="flex-1  flex justify-center items-center  min-h-full md:h-full h-fit ">
        <Outlet />
      </div>
      <AuroraBgComp />
      {/* <img
        src="https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/defaultImages/OIG3.y7NUvx649P.jpg"
        alt="image"
        className=" hidden md:block w-[50%] h-full object-cover"
      /> */}
    </div>
  );
};

export default AuthLayout;
