import { Outlet } from "react-router-dom";
import Logo from "./Logo";

const AuthLayout = () => {
  return (
    <div className="flex   justify-between h-screen">
      <Logo
        className=" absolute left-5
      top-5"
      />
      <div className="w-full sm:w-[50%]  flex justify-center items-center h-full ">
        <Outlet />
      </div>
      <img
        src="https://ixzmsptjfugshygjmvmh.supabase.co/storage/v1/object/public/projects/036fec7f2e8606cbd4dc8539ae99c0e6.jpg"
        alt="image"
        className=" hidden sm:block w-[50%] h-full"
      />
    </div>
  );
};

export default AuthLayout;
