import Heading from "@/components/shared/Heading";
import { FlipText } from "@/components/shared/Zoop";
import { Card } from "@/components/ui/card";
import React from "react";
import { SiApostrophe } from "react-icons/si";
import { TbEyeSearch } from "react-icons/tb";
import useGetNumOfProjects from "../projects/useGetNumOfProjects";
import { useAuth } from "@/hooks/useAuth";

const DashBaordStats = () => {
  const { user } = useAuth();
  const { count } = useGetNumOfProjects(user?.id || "");
  return (
    <div>
      <FlipText
        className=" text-[2.5rem] mt-2 mb-6"
        style={{ lineHeight: "1" }}
      >
        DASHBAORD
      </FlipText>
      <div className=" flex flex-col sm:flex-row juc gap-3 mt-2 ">
        <Card className="flex w-full p-3 items-center gap-5">
          <div className=" w-[80px] flex items-center justify-center  text-dashboard-text-blue   h-[80px] rounded-full bg-dashboard-blue">
            <SiApostrophe size={30} />
          </div>
          <div className=" ">
            <Heading Text="Posts" as="h2" />
            <Heading Text={count} as="h3" className=" font-semibold text-lg" />
          </div>
        </Card>

        <Card className="flex w-full p-3 items-center gap-5">
          <div className=" w-[80px] text-dashboard-text-orange flex items-center justify-center   h-[80px] rounded-full bg-dashboard-orange">
            <TbEyeSearch size={30} />
          </div>
          <div className=" ">
            <Heading Text="Visited" as="h2" />
            <Heading Text="5" as="h3" className=" font-semibold text-lg" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashBaordStats;
