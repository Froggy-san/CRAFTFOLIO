import { AnimatedTooltip } from "@/components/shared/AnimatedTooltops";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { publicUser } from "@/types/types";
import React from "react";

const Contributors = ({
  contrbiutersTags,
}: {
  contrbiutersTags: publicUser[];
}) => {
  if (!contrbiutersTags.length) return null;
  return (
    <div className="  relative   px-10    py-6 flex flex-col items-center justify-center   gap-3 w-full">
      <Badge className=" absolute left-1/2 -translate-x-1/2 -top-3 whitespace-nowrap">
        contributors:
      </Badge>
      <div className="flex flex-row  flex-wrap items-center  justify-center w-[109%] ">
        <AnimatedTooltip items={contrbiutersTags} />
      </div>
    </div>
  );
};

export default Contributors;
