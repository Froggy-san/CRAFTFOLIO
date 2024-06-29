import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSpacing() {
  const tags = [
    { id: 1, label: "Music" },
    { id: 2, label: "Gaming" },
    { id: 3, label: "Food & Cooking" },
    { id: 4, label: "Travel" },
    { id: 5, label: "Fitness & Health" },
  ];

  return (
    <Carousel className="w-full max-w-screen-lg mx-auto">
      <CarouselContent className="flex">
        {tags.map((tag) => (
          <CarouselItem key={tag.id} className="flex-shrink-0">
            <div className="p-2">
              <Card>
                <CardContent className="flex items-center justify-center p-4">
                  <span className="text-lg font-semibold">{tag.label}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
