import React from "react";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="  w-full  flex flex-col h-[100vh]   items-center justify-center ">
      <UpdatePasswordForm className="   w-[95%]  mx-auto  md:w-[700px] md:max-w-none " />

      <Link
        className=" text-sm text-center w-full block mt-2 text-blue-500 hover:underline"
        to="/"
      >
        Proceed without updating the password.
      </Link>
    </div>
  );
};

export default ResetPassword;
