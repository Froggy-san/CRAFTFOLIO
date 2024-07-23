import { Outlet } from "react-router-dom";
import Background from "./Background";
import Header from "./Header";

// bg-[#111827]
const AppLayout = () => {
  return (
    <div
      vaul-drawer-wrapper=""
      className=" container bg-background pt-2   overflow-x-hidden "
    >
      <Background />
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
