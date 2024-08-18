import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "../Loading";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface PostCardCarouselProps {
  isDeleting: boolean;
  postId: number;
  postImages: string[];
}

const PostCardCarousel = ({
  isDeleting,
  postId,
  postImages,
}: PostCardCarouselProps) => {
  return (
    <Carousel id="carousel" className="w-full rounded-lg">
      {isDeleting && (
        <Loading className="center-abslute z-30 !opacity-100" size={30} />
      )}
      <Link to={`/project/${postId}`}>
        <CarouselContent id="carousel-Content" className="bg-transparent p-0">
          {postImages.map((image, index) => {
            if (image.includes("mp4")) {
              return (
                <CarouselItem id="carousel item" key={index} className=" ">
                  <div id="carousel div" className=" ">
                    <Card
                      id="carousel card"
                      className="w-full overflow-hidden rounded-lg border-none bg-[transparent]"
                    >
                      {/* xs:h-[23rem] */}
                      <CardContent
                        id="carousel card content"
                        className="flex h-[200px] items-center justify-center p-0 xs:h-[250px] sm:h-[350px]"
                      >
                        {/* <ImagePortrait image={imageObj.imageUrl} /> */}

                        <video
                          onMouseDown={(e) => e.preventDefault()}
                          autoPlay
                          muted
                          loop
                          src={image}
                          className="h-full w-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            } else {
              return (
                <CarouselItem id="carousel item" key={index} className=" ">
                  <div id="carousel div" className=" ">
                    <Card
                      id="carousel card"
                      className="w-full overflow-hidden rounded-lg border-none bg-[transparent]"
                    >
                      {/* xs:h-[23rem] */}
                      <CardContent
                        id="carousel card content"
                        className="flex h-[200px] items-center justify-center p-0 xs:h-[250px] sm:h-[350px]"
                      >
                        {/* <ImagePortrait image={imageObj.imageUrl} /> */}

                        <img
                          src={image}
                          alt={image}
                          className="h-full w-full object-cover"
                          onMouseDown={(e) => e.preventDefault()}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            }
          })}
        </CarouselContent>
      </Link>
      <CarouselPrevious className="left-2 h-6 w-6 disabled:pointer-events-auto disabled:cursor-not-allowed" />
      <CarouselNext className="right-2 h-6 w-6 disabled:pointer-events-auto disabled:cursor-not-allowed" />
    </Carousel>
  );
};

export default PostCardCarousel;
