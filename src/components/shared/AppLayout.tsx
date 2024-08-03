import { Outlet } from "react-router-dom";
import Background from "./Background";
import Header from "./Header";
import GrainyImg from "./GrainyImg";
import { createPortal } from "react-dom";

// bg-[#111827]
const AppLayout = () => {
  return (
    <div
      id="home"
      vaul-drawer-wrapper=""
      className=" container bg-background pt-2   overflow-x-hidden "
    >
      <GrainyImg />
      {/* {createPortal(<GrainyImg />, document.body)} */}
      <Background />
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
