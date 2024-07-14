import { BackgroundGradientAnimation } from "../ui/BackgroundGradientAnimation";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { TextGenerateEffect } from "../ui/GenerateText";
import { SecondTextGenerateEffect } from "./GenerateSecondText";
import GrainyImg from "./GrainyImg";
import { IoIosBuild } from "react-icons/io";

const Banner = () => {
  return (
    <Card className=" h-[500px] lg:h-[95vh] w-full  grany overflow-hidden   mt-3 relative">
      <GrainyImg className=" " />
      <BackgroundGradientAnimation
        gradientBackgroundStart="  rgba(240,219,165,1)"
        gradientBackgroundEnd=" rgba(240,219,165,1)"
        firstColor="237,183,77"
        secondColor="235,102,102"
        thirdColor="111,177,138"
        fourthColor="235,102,102"
        fifthColor="154,63,251"
        pointerColor="237,183,77"
        className="  z-[10]"
      />
      <div className=" absolute inset-0 flex flex-col items-center justify-center w-full h-full z-50 text-center text-[25px] sm:text-3xl  md:text-4xl lg:text-5xl xl:text-6xl px-3  ">
        <TextGenerateEffect
          className=" text-center mb-3  w-full   leading-10 "
          words="Craftfolio is where your career starts."
        />

        <SecondTextGenerateEffect
          className=" text-center w-full  md:max-w-[65vw]  "
          words="Empower your career journey. Start with Craftfolio. Build a stellar portfolio and connect with the creative world."
        />
        <div className=" w-full flex items-center justify-center gap-3 xs:gap-6 mt-10 ">
          <Button className=" gap-2 text-base md:text-md">
            <IoIosBuild size={20} /> Start building...
          </Button>
          <Button
            variant="secondary"
            className=" font-semibold text-base md:text-md"
          >
            Learn more
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
