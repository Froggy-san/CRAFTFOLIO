import { Outlet } from "react-router-dom";
import Header from "./Header";
import Background from "./Background";
// bg-[#111827]
const AppLayout = () => {
  return (
    <div vaul-drawer-wrapper="" className=" container bg-background pt-2   ">
      <Background />
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
