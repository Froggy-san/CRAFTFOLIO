import { landingPageTextProps } from "@/types/types";
import React from "react";

const LandingPageText = ({
  landingPageText,
  className,
  style,
}: {
  style?: React.CSSProperties;
  landingPageText: landingPageTextProps;
  className?: string;
}) => {
  return (
    <div
      style={style}
      className={`z-10 h-full flex flex-col  gap-6 xs:gap-10   flex-1 max-w-[1200px] text-center sm:text-left  whitespace-pre-wrap  text-xl  ${className}`}
    >
      {/* className="  text-xl  xs:text-1xl md:text-2xl lg:text-4xl 3xl:text-5xl " */}
      <h1 className=" text-[clamp(1.25rem,3.3vw,2.7rem)] leading-[clamp(1.7rem,4vw,3rem)]">
        {landingPageText.primaryText}
      </h1>
      {/* text-xs xs:text-sm sm:text-xl  lg:text-2xl  */}
      <h2 className=" 3xl:text-3xl  text-[clamp(0.75rem,2.2vw,1.8rem)] leading-[clamp(1rem,3.5vw,2.2rem)]">
        {landingPageText.secondaryText}
      </h2>

      <p className=" hidden md:block text-sm">{landingPageText.tertiaryText}</p>
    </div>
  );
};

export default LandingPageText;
// sm:pt-6  md:pt-16  lg:pt-24 styles from teh secondaryText
