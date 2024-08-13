import React, { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { imageObject } from "@/types/types";
import ImagePortrait from "@/components/shared/ImagePortrait";
import ImageView from "@/components/shared/ImageView";

import { AnimatePresence } from "framer-motion";
import ViewCarousel from "../projects/ViewCarousel";
import { isUndefined } from "lodash";

const ProjectViewCaro = ({ images }: { images: string[] }) => {
  // const [viewedImage, setViewedImaged] = useState<null | string>(null);
  const [viewedIndex, setViewedIndex] = useState<number | undefined>(undefined);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const resetBodyStyle = () => {
    const body = document.querySelector("body");
    if (body) {
      body.style.height = "unset";
      body.style.overflow = "unset";
    }
  };

  React.useEffect(() => {
    const body = document.querySelector("body");

    // Set the style when the image is open
    if (!isUndefined(viewedIndex) && body) {
      body.style.height = "100%"; // Corrected to "100vh"
      body.style.overflow = "hidden";
    }

    // Add event listener for browser navigation
    window.addEventListener("popstate", resetBodyStyle);

    // Clean up the event listener and reset styles when the component unmounts or image changes
    return () => {
      window.removeEventListener("popstate", resetBodyStyle);
      resetBodyStyle(); // Reset styles on unmount or image change
    };
  }, [viewedIndex]);
  return (
    <div>
      <div className="flex items-center justify-center">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="">
            {images.map((image, index) => {
              if (image.includes("mp4")) {
                return (
                  <CarouselItem key={index} className="">
                    <Card className="">
                      <CardContent className="flex h-[350px] select-none items-center justify-center overflow-hidden rounded-lg p-0 xs:h-[450px] md:h-[80dvb]">
                        <ImagePortrait
                          MediaType="video"
                          // handleViewImage={() => setViewedIndex(index)}
                          image={image}
                        />
                        <video
                          // onClick={() => setViewedImaged(image)}
                          // onClick={() => setViewedIndex(index)}
                          src={image}
                          className="h-full w-full cursor-pointer object-cover md:hidden"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              } else {
                return (
                  <CarouselItem key={index} className="">
                    <Card className="">
                      <CardContent className="flex h-[350px] select-none items-center justify-center overflow-hidden rounded-lg p-0 xs:h-[450px] md:h-[80dvb]">
                        <ImagePortrait
                          handleViewImage={() => setViewedIndex(index)}
                          image={image}
                        />
                        <img
                          // onClick={() => setViewedImaged(image)}
                          onClick={() => setViewedIndex(index)}
                          src={image}
                          alt="image"
                          className="h-full w-full cursor-pointer object-cover md:hidden"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              }
            })}
          </CarouselContent>
          <CarouselPrevious className="left-[-14px] sm:left-10" />
          <CarouselNext className="right-[-14px] sm:right-10" />
        </Carousel>
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {images.length}
      </div>
      <AnimatePresence>
        {viewedIndex !== undefined && (
          <ViewCarousel
            closeFunction={() => setViewedIndex(undefined)}
            images={images}
            index={viewedIndex}
          />
        )}
      </AnimatePresence>
      {/* <ImageView handleClose={handleCloseView} image={viewedImage} /> */}
    </div>
  );
};

export default ProjectViewCaro;
