import React from "react";

const LandingPageImage = ({
  landingImage,
  imageEffects,
}: {
  landingImage: string;
  imageEffects: boolean;
}) => {
  return (
    <img
      src={landingImage}
      alt="asa"
      className={`absolute w-full h-full inset-0 object-cover    ${
        imageEffects && "blur-[3px]"
      } `}
    />
  );
};

export default LandingPageImage;
