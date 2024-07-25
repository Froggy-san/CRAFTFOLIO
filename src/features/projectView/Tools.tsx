import { getIconForTool } from "@/components/shared/HandleIcons";
import Heading from "@/components/shared/Heading";
import TooltipComp from "@/components/shared/TooltipComp";
import React from "react";

const Tools = ({ toolsArr }: { toolsArr: string[] }) => {
  if (!toolsArr.filter((el) => el !== "").length)
    return (
      <span className=" flex items-center flex-wrap  h-[25px] overflow-hidden">
        Tools: ~
      </span>
    );

  return (
    <div>
      <Heading Text="Tools:" as="h3" className="font-semibold text-lg" />
      <div className=" flex items-center justify-center sm:justify-normal flex-wrap mt-5  overflow-hidden ">
        <span className=" text-lg  pb-[2px]">[</span>{" "}
        {toolsArr.map((tool, i: number) => {
          const lastITem = i + 1 === toolsArr.length;
          const icon = getIconForTool(tool);
          const isReactNode = React.isValidElement(icon); // checking if the function return an icon which is a reactElement, or just text which isn't a react element.

          return (
            <React.Fragment key={i}>
              <TooltipComp toolTipText={tool}>
                <span
                  className={`h-full flex justify-center items-center ${
                    isReactNode ? "text-[20px]" : "text-sm"
                  }`}
                >
                  {icon}
                </span>
              </TooltipComp>
              {!lastITem && icon ? (
                <span className=" font-semibold text-[12px] mx-3"> , </span>
              ) : null}
            </React.Fragment>
          );
        })}
        <span className=" text-lg  pb-[2px]"> ]</span>
      </div>
    </div>
  );
};

export default Tools;
