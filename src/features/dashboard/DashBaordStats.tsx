import Heading from "@/components/shared/Heading";
import { FlipText } from "@/components/shared/Zoop";
import { Card } from "@/components/ui/card";
import { SiApostrophe } from "react-icons/si";
import { TbEyeSearch } from "react-icons/tb";

import { useAuth } from "@/hooks/useAuth";
import useGetStats from "../projects/useGetStats";
import TooltipComp from "@/components/shared/TooltipComp";

const DashBaordStats = () => {
  const { user } = useAuth();

  const { count, visted } = useGetStats(user?.id || "");
  console.log(visted, "VISTED");
  return (
    <div>
      <FlipText className="mb-6 mt-2 text-[2.5rem]" style={{ lineHeight: "1" }}>
        DASHBAORD
      </FlipText>
      <div className="juc mt-2 flex flex-col gap-3 sm:flex-row">
        <Card className="flex w-full items-center gap-5 p-3">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-dashboard-blue text-dashboard-text-blue">
            <SiApostrophe size={30} />
          </div>
          <div className=" ">
            <Heading Text="Posts" as="h2" />
            <Heading Text={count} as="h3" className="text-lg font-semibold" />
          </div>
        </Card>

        <TooltipComp toolTipText="Number of people visited your profile.">
          <Card className="flex w-full items-center gap-5 p-3">
            <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-dashboard-orange text-dashboard-text-orange">
              <TbEyeSearch size={30} />
            </div>
            <div className=" ">
              <Heading Text="Visited" as="h2" />
              <Heading as="h3" className="text-lg font-semibold">
                {visted?.[0].visted}
              </Heading>
            </div>
          </Card>
        </TooltipComp>
      </div>
    </div>
  );
};

export default DashBaordStats;
