import { getIconForTool } from "../HandleIcons";
import TooltipComp from "../TooltipComp";

const ToolsUsed = ({ toolsArr }: { toolsArr: string[] }) => {
  if (!toolsArr.filter((el) => el !== "").length)
    return (
      <div className=" flex items-center flex-wrap  h-[25px] overflow-hidden">
        Tools: ~
      </div>
    );

  return (
    <div className=" flex items-center flex-wrap  h-[25px] overflow-hidden gap-y-36">
      Tools: <span className=" text-lg  pb-[2px]">[</span>{" "}
      {toolsArr.map((tool, i: number) => {
        const lastITem = i + 1 === toolsArr.length;
        const icon = getIconForTool(tool);

        return (
          <TooltipComp key={i} toolTipText={tool}>
            <span className=" h-full flex justify-center items-center  ">
              {icon}
              {!lastITem && icon ? (
                <span className=" font-semibold text-[12px] mx-1"> , </span>
              ) : null}
            </span>
          </TooltipComp>
        );
      })}
      <span className=" text-lg  pb-[2px]"> ]</span>
    </div>
  );
};

export default ToolsUsed;
