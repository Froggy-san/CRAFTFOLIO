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
      className={`z-10 flex h-full max-w-[95%] flex-1 flex-col gap-6 overflow-hidden whitespace-pre-wrap text-center text-xl xs:gap-10 sm:text-left ${className}`}
    >
      {/* className="  text-xl  xs:text-1xl md:text-2xl lg:text-4xl 3xl:text-5xl " */}
      {landingPageText.primaryText && (
        <h1 className="break-all text-[clamp(1.25rem,3.3vw,2.7rem)] leading-[clamp(1.7rem,4vw,3rem)] 4xl:text-6xl">
          {landingPageText.primaryText}
        </h1>
      )}
      {/* text-xs xs:text-sm sm:text-xl  lg:text-2xl  */}
      {landingPageText.secondaryText && (
        <h2 className="text-[clamp(0.75rem,2.2vw,1.8rem)] leading-[clamp(1rem,3.5vw,2.2rem)] 3xl:text-3xl 4xl:text-4xl">
          {landingPageText.secondaryText}
        </h2>
      )}

      {landingPageText.tertiaryText && (
        <p className="hidden text-sm md:block 4xl:text-lg">
          {landingPageText.tertiaryText}
        </p>
      )}
    </div>
  );
};

export default LandingPageText;
// sm:pt-6  md:pt-16  lg:pt-24 styles from teh secondaryText
