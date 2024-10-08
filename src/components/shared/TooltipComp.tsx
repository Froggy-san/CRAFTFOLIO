import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const TooltipComp = ({
  children,
  toolTipText,
  duration,
  className,
}: {
  className?: string;
  children: ReactNode;
  toolTipText: string;
  duration?: number;
}) => {
  return (
    <TooltipProvider delayDuration={duration || 500}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className || ""}>
          <p>{toolTipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComp;
