import React from "react";
import { getIconForTool } from "../HandleIcons";
import TooltipComp from "../TooltipComp";

const ToolsUsed = ({ toolsArr }: { toolsArr: string[] }) => {
  if (!toolsArr.filter((el) => el !== "").length)
    return (
      <span className=" flex items-center flex-wrap  h-[25px] overflow-hidden">
        Tools: ~
      </span>
    );

  return (
    <div className=" flex items-center flex-wrap  h-[25px] overflow-hidden gap-y-36">
      Tools: <span className=" text-lg  pb-[2px]">[</span>{" "}
      {toolsArr.map((tool, i: number) => {
        const lastITem = i + 1 === toolsArr.length;
        const icon = getIconForTool(tool);
        const isReactNode = React.isValidElement(icon); // checking if the function return an icon which is a reactElement, or just text which isn't a react element.

        return (
          <React.Fragment key={i}>
            <TooltipComp toolTipText={tool}>
              <span
                className={`h-full flex justify-center items-center ${
                  isReactNode ? "text-[15px]" : "text-xs"
                }`}
              >
                {icon}
              </span>
            </TooltipComp>
            {!lastITem && icon ? (
              <span className=" font-semibold text-[12px] mx-1"> , </span>
            ) : null}
          </React.Fragment>
        );
      })}
      <span className=" text-lg  pb-[2px]"> ]</span>
    </div>
  );
};

export default ToolsUsed;
