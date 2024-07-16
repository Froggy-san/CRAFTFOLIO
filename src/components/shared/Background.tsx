import React from "react";
import { BackgroundGradientAnimation } from "../ui/BackgroundGradientAnimation";

const Background = () => {
  return (
    // <div className="fixed top-0 -z-10 inset-0 size-full bg-white">
    //   <BackgroundGradientAnimation
    //     gradientBackgroundStart="rgba(255,255,255,0)"
    //     gradientBackgroundEnd="rgba(255,255,255,0)"
    //     firstColor="237,183,77"
    //     secondColor="235,102,102"
    //     thirdColor="111,177,138"
    //     fourthColor="235,102,102"
    //     fifthColor="154,63,251"
    //     pointerColor="237,183,77"
    //     className="  z-[10]"
    //   />
    // </div>

    <div className="fixed top-0  left-0 w-full h-full-z-10  bg-white">
      <div className="absolute bottom-auto left-auto right-0 top-0 size-[500px] translate-x-[-30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]" />
    </div>

    // <div className="fixed inset-0 -z-10 size-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
    //   <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]" />
    // </div>
  );
};

export default Background;
