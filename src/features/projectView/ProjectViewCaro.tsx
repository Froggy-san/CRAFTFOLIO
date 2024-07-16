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

const ProjectViewCaro = ({ images }: { images: string[] }) => {
  // const [viewedImage, setViewedImaged] = useState<null | string>(null);
  const [viewedIndex, setViewedIndex] = useState<number | undefined>(undefined);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  // const handleViewImage = useCallback(function (imageName: string) {
  //   setViewedImaged(imageName);
  // }, []);
  // const handleCloseView = useCallback(function () {
  //   setViewedImaged(null);
  // }, []);

  console.log(viewedIndex, "index");
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
  return (
    <div>
      <div className=" flex justify-center items-center">
        <Carousel setApi={setApi} className=" w-full   ">
          <CarouselContent className="">
            {images.map((image, index) => (
              <CarouselItem key={index} className="">
                <Card className="">
                  <CardContent
                    className="flex 
             h-[350px] xs:h-[450px] md:h-[80dvb]  items-center justify-center p-0  rounded-lg overflow-hidden select-none"
                  >
                    <ImagePortrait
                      handleViewImage={() => setViewedIndex(index)}
                      image={image}
                    />
                    <img
                      // onClick={() => setViewedImaged(image)}
                      onClick={() => setViewedIndex(index)}
                      src={image}
                      alt="image"
                      className=" w-full h-full object-cover cursor-pointer md:hidden"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" left-[-14px] sm:left-10" />
          <CarouselNext className=" right-[-14px] sm:right-10" />
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
