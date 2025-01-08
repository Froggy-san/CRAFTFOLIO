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
      className="container overflow-x-hidden bg-background px-2 pt-2 sm:px-[1rem]"
    >
      <GrainyImg className="inset-0 max-w-full" />
      {/* {createPortal(<GrainyImg />, document.body)} */}
      <Background />
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
