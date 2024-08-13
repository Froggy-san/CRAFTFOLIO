type MediaType = "image" | "video";

const ImagePortrait = ({
  image,
  handleViewImage,
  MediaType = "image",
}: {
  MediaType?: MediaType;
  image: string;
  handleViewImage?: (imageName: string) => void;
}) => {
  if (MediaType === "video") {
    return (
      <div className="relative hidden h-full w-full md:block">
        <video
          muted
          autoPlay
          loop
          src={image}
          className="absolute left-0 top-0 z-10 h-full w-full object-cover opacity-90 blur-md brightness-50"
        />

        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center">
          <video
            controls
            onClick={() => {
              if (!handleViewImage) return;
              handleViewImage(image);
            }}
            src={image}
            className="max-h-full max-w-full cursor-pointer object-contain"
          />
        </div>
      </div>
    );
  } else
    return (
      <div className="relative hidden h-full w-full md:block">
        <img
          src={image}
          className="absolute left-0 top-0 z-10 h-full w-full object-cover opacity-90 blur-md brightness-50"
        />

        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center">
          <img
            onClick={() => {
              if (!handleViewImage) return;
              handleViewImage(image);
            }}
            src={image}
            className="max-h-full max-w-full cursor-pointer object-contain"
          />
        </div>
      </div>
    );
};

export default ImagePortrait;
