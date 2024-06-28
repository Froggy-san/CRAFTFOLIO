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
    <Carousel id="carousel" className="w-full    rounded-lg ">
      {isDeleting && (
        <Loading className=" center-abslute z-20 text-black" size={30} />
      )}
      <Link to={`/project/${postId}`}>
        <CarouselContent id="carousel-Content" className=" p-0 bg-transparent">
          {postImages.map((image, index) => (
            <CarouselItem id="carousel item" key={index} className=" ">
              <div id="carousel div" className=" ">
                <Card
                  id="carousel card"
                  className=" w-full border-none bg-[transparent] overflow-hidden rounded-lg"
                >
                  {/* xs:h-[23rem] */}
                  <CardContent
                    id="carousel card content"
                    className="flex  h-[200px] xs:h-[250px] sm:h-[350px]   items-center justify-center p-0 "
                  >
                    {/* <ImagePortrait image={imageObj.imageUrl} /> */}

                    <img
                      src={image}
                      alt={image}
                      className=" w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Link>
      <CarouselPrevious className=" left-2   w-6 h-6 disabled:z-20" />
      <CarouselNext className="  right-2  w-6 h-6  disabled:z-20" />
    </Carousel>
  );
};

export default PostCardCarousel;
