import { AnimatedTooltip } from "@/components/shared/AnimatedTooltops";
import { publicUser } from "@/types/types";
import React from "react";

const Contributors = ({
  contrbiutersTags,
}: {
  contrbiutersTags: publicUser[];
}) => {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={contrbiutersTags} />
    </div>
  );
};

export default Contributors;
