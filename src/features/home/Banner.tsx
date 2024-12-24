import { SecondTextGenerateEffect } from "@/components/shared/GenerateSecondText";
import { BackgroundGradientAnimation } from "@/components/ui/BackgroundGradientAnimation";

import { Card } from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/GenerateText";
import { useTheme } from "@/context/ThemeProvidor";

import BannerBtns from "./BannerBtns";

const Banner = () => {
  const { theme } = useTheme();

  const prefered = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const chosenTheme = theme === "system" ? prefered : theme;
  return (
    <Card className="grainy relative mt-3 h-[470px] w-full overflow-hidden lg:h-[95vh]">
      <BackgroundGradientAnimation
        gradientBackgroundStart={
          chosenTheme === "dark" ? "rgb(108, 0, 162)" : "rgba(240,219,165,1)"
        }
        gradientBackgroundEnd={
          chosenTheme === "dark" ? "rgb(0, 17, 82)" : "rgba(240,219,165,1)"
        }
        firstColor={chosenTheme === "dark" ? "18, 113, 255" : "237,183,77"}
        secondColor={chosenTheme === "dark" ? "221, 74, 255" : "235,102,102"}
        thirdColor={chosenTheme === "dark" ? "100, 220, 255" : "111,177,138"}
        fourthColor={chosenTheme === "dark" ? "200, 50, 50" : "235,102,102"}
        fifthColor={chosenTheme === "dark" ? "180, 180, 50" : "154,63,251"}
        pointerColor={chosenTheme === "dark" ? "140, 100, 255" : "237,183,77"}
        className="z-[10]"
      />
      {/*  text-[clamp(1.25rem,3.3vw,2.7rem)] leading-[clamp(1.7rem,4vw,3rem)] text-[25px] sm:text-3xl md:text-4xl lg:text-4xl xl:text-[3.2rem] */}
      <div className="absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center px-3 text-center text-[clamp(1.2rem,3.3vw,2.7rem)]">
        <TextGenerateEffect
          className="mb-3 w-full text-center leading-10"
          words="Craftfolio is where your career starts."
        />

        <SecondTextGenerateEffect
          className="w-full text-center md:max-w-[65vw]"
          words="Empower your career journey. Start with Craftfolio. Build a stellar portfolio and connect with the creative world."
        />
        <BannerBtns />
      </div>
    </Card>
  );
};

export default Banner;
