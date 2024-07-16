import Collapse from "@/components/shared/Collapse";
import React from "react";
import { HiArrowCircleDown } from "react-icons/hi";

const Description = ({ Text }: { Text: string | undefined }) => {
  return (
    <Collapse>
      <Collapse.CollapseContent>{Text}</Collapse.CollapseContent>
      <Collapse.CollapseButton arrowPositionX="right" />
    </Collapse>
  );
};

export default Description;
