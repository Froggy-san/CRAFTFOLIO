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

const ProjectViewCaro = ({ imageObjs }: { imageObjs: imageObject[] }) => {
  const [viewedImage, setViewedImaged] = useState<null | string>(null);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const handleViewImage = useCallback(function (imageName: string) {
    setViewedImaged(imageName);
  }, []);
  const handleCloseView = useCallback(function () {
    setViewedImaged(null);
  }, []);

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
        <Carousel setApi={setApi} className=" w-full sm:w-[90%]  ">
          <CarouselContent className="">
            {imageObjs.map((imageObj, index) => (
              <CarouselItem key={index} className="">
                <Card className="">
                  <CardContent
                    className="flex 
             h-[350px] sm:h-[600px]  items-center justify-center p-0  rounded-lg overflow-hidden select-none"
                  >
                    {/* <ImagePortrait
                      handleViewImage={handleViewImage}
                      image={imageObj.imageUrl}
                    /> */}
                    <img
                      onClick={() => setViewedImaged(imageObj.imageUrl)}
                      src={imageObj.imageUrl}
                      alt="image"
                      className=" w-full h-full object-cover cursor-pointer"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" left-[-14px]" />
          <CarouselNext className=" right-[-14px]" />
        </Carousel>
      </div>
      <div className="py-2 text-right text-sm text-muted-foreground">
        Slide {current} of {imageObjs.length}
      </div>
      <ImageView handleClose={handleCloseView} image={viewedImage} />
    </div>
  );
};

export default ProjectViewCaro;
