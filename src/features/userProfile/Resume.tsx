import { Button } from "@/components/ui/button";
import { isValidUrl } from "@/utils/helper";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CiWarning } from "react-icons/ci";
import TooltipComp from "@/components/shared/TooltipComp";
import { TiWarning } from "react-icons/ti";

const Resume = ({
  link,
  isOwnerOfPage,
  asLink = true,
}: {
  link: string;
  asLink?: boolean;
  isOwnerOfPage: boolean;
}) => {
  const isValidLink = isValidUrl(link);

  if (!isOwnerOfPage && !isValidLink) return null;
  if (isOwnerOfPage && !link.length) return null;

  if (!isValidLink)
    return (
      <TooltipComp
        className="max-w-56"
        toolTipText="The resume URL you provided is invalid. Go to Settings to update it"
      >
        <button className="group pr-0">
          <TiWarning size={23} className="text-destructive" />
        </button>
      </TooltipComp>
    );

  return (
    <TooltipComp toolTipText="Resume">
      <Button size="sm" variant="link" className="group h-fit p-0" asChild>
        <Link target="_blank" to={link} className="p-1">
          {" "}
          <BsArrowUpRight
            className="transition-all group-hover:translate-x-[5px] group-hover:translate-y-[-5px]"
            size={13}
          />
        </Link>
      </Button>
    </TooltipComp>
  );
};

export default Resume;
