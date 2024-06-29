import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getIconForTool } from "@/components/shared/HandleIcons";
import { Button } from "@/components/ui/button";
import { options } from "./AboutMeFrom";
function ToolsCarousel({
  tools,
  arrowColor,
  arrowName,
}: {
  tools: string[];
  arrowColor: string;
  arrowName: string | undefined;
}) {
  const arrowShape =
    arrowName !== "none" && options.find((el) => el.value === arrowName)?.label;
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {tools.map((tool, i) => {
          const icon = getIconForTool(tool, true);
          return (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Button
                      key={i}
                      variant="secondary"
                      className=" gap-2    h-fit  w-fit  max-w-[100%]"
                    >
                      {" "}
                      <span
                        style={{
                          paddingTop: "3px",
                          color: `rgb(${Object.values(arrowColor).join(",")})`,
                        }}
                        className={`${!icon && !arrowShape && "hidden"}`}
                      >
                        {" "}
                        {icon || arrowShape}
                      </span>{" "}
                      <span className="max-w-[100%]  truncate"> {tool}</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ToolsCarousel;
