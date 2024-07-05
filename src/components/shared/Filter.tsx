import React from "react";

const Filter = () => {
  // width="0" height="0"
  return (
    <svg className=" absolute inset-0 w-full h-full z-[99]">
      <filter id="displacementFilter">
        <feTurbulence
          type="turbulence"
          baseFrequency="0.05"
          numOctaves="4"
          result="turbulence"
        />
        <feDisplacementMap
          in2="turbulence"
          in="SourceGraphic"
          scale="10"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
};

export default Filter;
