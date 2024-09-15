import { getIconForTool } from "@/components/shared/HandleIcons";
import Heading from "@/components/shared/Heading";
import TooltipComp from "@/components/shared/TooltipComp";
import React from "react";

const Tools = ({ toolsArr }: { toolsArr: string[] }) => {
  if (!toolsArr.filter((el) => el !== "").length)
    return (
      <span className="flex h-[25px] flex-wrap items-center overflow-hidden">
        Tools: ~
      </span>
    );

  return (
    <div>
      <Heading Text="Tools:" as="h3" className="text-lg font-semibold" />
      <div className="mt-5 flex flex-wrap items-center justify-center gap-y-1 overflow-hidden sm:justify-normal">
        <span className="pb-[2px] text-lg">[</span>{" "}
        {toolsArr.map((tool, i: number) => {
          const lastITem = i + 1 === toolsArr.length;
          const icon = getIconForTool(tool);
          const isReactNode = React.isValidElement(icon); // checking if the function return an icon which is a reactElement, or just text which isn't a react element.

          return (
            <React.Fragment key={i}>
              <TooltipComp toolTipText={tool}>
                <span
                  className={`flex h-full items-center justify-center ${
                    isReactNode ? "text-[20px]" : "text-sm"
                  }`}
                >
                  {icon}
                </span>
              </TooltipComp>
              {!lastITem && icon ? (
                <span className="mx-3 text-[12px] font-semibold"> , </span>
              ) : null}
            </React.Fragment>
          );
        })}
        <span className="pb-[2px] text-lg"> ]</span>
      </div>
    </div>
  );
};

export default Tools;
