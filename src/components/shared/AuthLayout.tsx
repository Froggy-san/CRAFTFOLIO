import { Outlet } from "react-router-dom";
import Logo from "./Logo";

const AuthLayout = () => {
  return (
    <div className="flex   justify-between h-screen">
      <Logo
        className=" absolute left-5
      top-5"
      />
      <div className="w-full md:w-[50%]  flex justify-center items-center h-full ">
        <Outlet />
      </div>
      <img
        src="https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/defaultImages/OIG3.y7NUvx649P.jpg"
        alt="image"
        className=" hidden md:block w-[50%] h-full object-cover"
      />
    </div>
  );
};

export default AuthLayout;
