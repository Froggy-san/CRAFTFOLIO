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
import { motion } from "framer-motion";
import { ClickAwayListener } from "@mui/material";
import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";
import { Scale } from "lucide-react";
interface ViewCarouselProps {
  images: string[];
  index?: number;
  closeFunction: () => void;
}

const ViewCarousel = ({ images, index, closeFunction }: ViewCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    if (index) api.scrollTo(index, true);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, index]);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: "spring" }}
      key="container"
      className="fixed w-full h-full inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm backdrop-brightness-50  z-10"
    >
      <Carousel id="carousel" setApi={setApi}>
        <Button
          variant="secondary"
          className="absolute right-5 top-10 rounded-full  cursor-pointer z-50 w-7 h-7 p-0 text-gray-800 hover:text-black"
          onClick={closeFunction} // Ensure this button calls the handleClose function
        >
          <IoIosClose size={50} />
        </Button>
        <CarouselContent id="carousel-content">
          {images.map((image, i) => (
            <CarouselItem id="carousel-item" key={i}>
              <div
                key="container"
                className="flex items-center justify-center  w-full h-[100dvh]  select-none z-50"
              >
                <motion.img
                  src={image}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.2, type: "spring" }}
                  alt="Enlarged view"
                  className="max-w-[100%] max-h-[90%] sm:max-h-[100%] object-contain "
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" left-2" />
        <CarouselNext className=" right-2" />
        <div className="absolute bottom-0 font-semibold left-1/2 translate-x-[-50%] z-50 py-2 text-center bg-primary-foreground p-2 rounded-tr-lg rounded-tl-lg text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </Carousel>
    </motion.div>
  );
};

export default ViewCarousel;
