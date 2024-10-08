import Collapse from "@/components/shared/Collapse";
import Heading from "@/components/shared/Heading";
import React from "react";
import { HiArrowCircleDown } from "react-icons/hi";

const Description = ({ Text }: { Text: string | undefined }) => {
  return (
    <div>
      <Heading Text="Description:" as="h3" className="text-lg font-semibold" />

      <Collapse textLenght={2000}>
        <Collapse.CollapseContant>{Text}</Collapse.CollapseContant>
        <Collapse.CollapseButton arrowPositionX="right" />
      </Collapse>
    </div>
  );
};

export default Description;
