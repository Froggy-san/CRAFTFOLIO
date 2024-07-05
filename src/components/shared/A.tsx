import React from "react";

const A = () => {
  return (
    <div className=" fixed w-full ">
      <div className="jsx-6efe1310616122b3 relative h-[50px] w-[360px] overflow-hidden rounded-b-2xl lg:w-[600px] xl:w-full">
        <div className="jsx-6efe1310616122b3 pointer-events-none absolute bottom-0  z-10 h-full w-full overflow-hidden  rounded-b-2xl border border-[#f5f5f51a]">
          <div className="jsx-6efe1310616122b3 glass-effect h-full w-full"></div>
        </div>
        <svg className="jsx-6efe1310616122b3">
          <defs className="jsx-6efe1310616122b3">
            <filter id="fractal-noise-glass" className="jsx-6efe1310616122b3">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.12 0.12"
                numOctaves="1"
                result="warp"
                className="jsx-6efe1310616122b3"
              ></feTurbulence>
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="30"
                in="SourceGraphic"
                in2="warp"
                className="jsx-6efe1310616122b3"
              ></feDisplacementMap>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default A;
