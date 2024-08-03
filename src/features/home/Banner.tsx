import { SecondTextGenerateEffect } from "@/components/shared/GenerateSecondText";
import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradientAnimation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/GenerateText";
import { useTheme } from "@/context/ThemeProvidor";

import { IoIosBuild } from "react-icons/io";

const Banner = () => {
  const { theme } = useTheme();

  return (
    <Card className=" h-[500px] lg:h-[95vh] w-full  grainy overflow-hidden   mt-3 relative">
      <BackgroundGradientAnimation
        gradientBackgroundStart={
          theme === "dark" ? "rgb(108, 0, 162)" : "rgba(240,219,165,1)"
        }
        gradientBackgroundEnd={
          theme === "dark" ? "rgb(0, 17, 82)" : "rgba(240,219,165,1)"
        }
        firstColor={theme === "dark" ? "18, 113, 255" : "237,183,77"}
        secondColor={theme === "dark" ? "221, 74, 255" : "235,102,102"}
        thirdColor={theme === "dark" ? "100, 220, 255" : "111,177,138"}
        fourthColor={theme === "dark" ? "200, 50, 50" : "235,102,102"}
        fifthColor={theme === "dark" ? "180, 180, 50" : "154,63,251"}
        pointerColor={theme === "dark" ? "140, 100, 255" : "237,183,77"}
        className="  z-[10]"
      />
      <div className=" absolute inset-0 flex flex-col items-center justify-center w-full h-full z-50 text-center text-[25px] sm:text-3xl  md:text-4xl lg:text-4xl xl:text-[3.2rem] px-3  ">
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
