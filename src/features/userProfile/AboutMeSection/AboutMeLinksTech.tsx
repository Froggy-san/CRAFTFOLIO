import { aboutMeFormProps } from "@/types/types";
import React, { useCallback, useState } from "react";
import AboutMeFrom, { options } from "./AboutMeFrom";
import HandleLinkIcons from "@/components/shared/HandleLinkIcons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { defaultTextColor } from "@/utils/constants";
import { getIconForTool } from "@/components/shared/HandleIcons";
import { cn } from "@/lib/utils";
interface AboutMeLinksTech {
  linksAndtech: aboutMeFormProps;
  userId: string | undefined;
  isAuthenticated: boolean;
}

const AboutMeLinksTech = ({
  linksAndtech,
  userId,
  isAuthenticated,
}: AboutMeLinksTech) => {
  const [isEditing, setIsEditing] = useState(false);
  const links =
    linksAndtech && linksAndtech.links ? JSON.parse(linksAndtech.links) : [];

  const tools =
    linksAndtech && linksAndtech.toolsAndTech
      ? JSON.parse(linksAndtech.toolsAndTech)
      : [];

  const arrowColor =
    linksAndtech && linksAndtech.arrowColor
      ? JSON.parse(linksAndtech.arrowColor)
      : defaultTextColor;

  const handleCloseForm = useCallback(function () {
    setIsEditing(false);
  }, []);

  return (
    <div className="relative mt-7 md:px-10">
      {!isEditing && (
        <ShowLinksAndTools
          isAuthenticated={isAuthenticated}
          links={links}
          tools={tools}
          arrowName={linksAndtech.arrowType}
          arrowColor={arrowColor}
        />
      )}

      {isEditing && (
        <AboutMeFrom
          handleCloseForm={handleCloseForm}
          linksAndTech={linksAndtech}
          userId={userId}
        />
      )}

      {!isEditing && (
        <Badge
          onClick={() => setIsEditing(true)}
          className="absolute bottom-[-50px] right-0 cursor-pointer"
        >
          {linksAndtech.links ? "Edit links" : "Add links"}
        </Badge>
      )}
    </div>
  );
};

export const ShowLinksAndTools = ({
  links,
  tools,
  arrowColor,
  arrowName,
  className,
  isAuthenticated,
}: {
  links: string[];
  tools: string[];
  arrowColor: string;
  arrowName: string | undefined;
  className?: string;
  isAuthenticated?: boolean;
}) => {
  const arrowShape =
    arrowName !== "none" && options.find((el) => el.value === arrowName)?.label;

  return (
    <div className={cn("show-tag mt-20 space-y-10", className)}>
      <div className="relative">
        {links.length ? (
          <HandleLinkIcons
            errorMessage={
              isAuthenticated ? "The links you have provided are invaild" : ""
            }
            className=""
            links={links}
          />
        ) : isAuthenticated ? (
          <h1 className="mt-24 rounded-md border py-3 text-center font-semibold">
            Add related links
          </h1>
        ) : null}
      </div>

      {/* -------------------- */}
      {tools.length ? (
        <div>
          <h1 className="mb-7 text-lg font-semibold">
            Some of the tools i can use:
          </h1>
          <div className="flex flex-wrap gap-2 sm:justify-center">
            {tools.map((tool: string, i) => {
              const icon = getIconForTool(tool, true);
              return (
                <Button
                  key={i}
                  variant="ghost"
                  className="h-fit w-fit max-w-[100%] gap-2"
                >
                  {" "}
                  <span
                    style={{
                      paddingTop: "3px",
                      color: `rgb(${Object.values(arrowColor).join(",")})`,
                    }}
                    className={`text-lg ${!icon && !arrowShape && "hidden"}`}
                  >
                    {" "}
                    {icon || arrowShape}
                  </span>{" "}
                  <span className="max-w-[100%] truncate"> {tool}</span>
                </Button>
              );
            })}
          </div>
        </div>
      ) : isAuthenticated ? (
        <h1 className="mt-24 rounded-md border py-3 text-center font-semibold">
          Add the tools you use in your work.
        </h1>
      ) : null}
    </div>
  );
};

export default AboutMeLinksTech;
{
  /* <Badge
          onClick={() => setIsEditing(true)}
          className=" cursor-pointer absolute right-0 bottom-[-50px]"
        >
          {linksAndtech.links ? "Edit links" : "Add links"}
        </Badge> */
}
