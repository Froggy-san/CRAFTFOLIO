const ImagePortrait = ({
  image,
  handleViewImage,
}: {
  image: string;
  handleViewImage?: (imageName: string) => void;
}) => {
  return (
    <div className=" relative w-full h-full hidden md:block">
      <img
        src={image}
        className=" w-full h-full object-cover absolute top-0 left-0 z-10 blur-md brightness-50 opacity-90  "
      />

      <div className=" w-full h-full  flex items-center justify-center absolute top-0 left-0 z-20 ">
        <img
          onClick={() => {
            if (!handleViewImage) return;
            handleViewImage(image);
          }}
          src={image}
          className=" max-w-full max-h-full  object-contain cursor-pointer "
        />
      </div>
    </div>
  );
};

export default ImagePortrait;
