import { Outlet } from "react-router-dom";
import Header from "./Header";
// bg-[#111827]
const AppLayout = () => {
  return (
    <div className=" container">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
