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
  return (
    <Card className="  relative    px-5 py-6 flex flex-col items-center justify-center  w-fit gap-3 max-w-[700px]">
      <Badge className=" absolute left-1/2 -translate-x-1/2 -top-2 whitespace-nowrap">
        contributors:
      </Badge>
      <div className="flex flex-row  flex-wrap items-center  w-[109%] ">
        <AnimatedTooltip items={contrbiutersTags} />
      </div>
    </Card>
  );
};

export default Contributors;
