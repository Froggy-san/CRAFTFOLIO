import { AnimatedTooltip } from "@/components/shared/AnimatedTooltops";
import { Badge } from "@/components/ui/badge";

import { userEssentialData } from "@/types/types";

const Contributors = ({
  contrbiutersTags,
}: {
  contrbiutersTags: userEssentialData[];
}) => {
  if (!contrbiutersTags.length) return null;
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-3 px-10 py-6">
      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
        contributors:
      </Badge>
      <div className="flex w-[109%] flex-row flex-wrap items-center justify-center">
        <AnimatedTooltip items={contrbiutersTags} />
      </div>
    </div>
  );
};

export default Contributors;
