import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { LuImagePlus } from "react-icons/lu";
type AvatarProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl?: string;
  className?: string;
};

const ProfileImageUploader = ({
  fieldChange,
  mediaUrl,
  className,
}: AvatarProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles); // according to bing this calls the onChange function and sends the file array to the input.
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  /// the second parameter in the useDropzone hook is the accept object, you pust what can the from accept from the user .

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "item-center flex cursor-pointer flex-col  justify-center rounded-full items-center w-fit mx-auto",
      })}
    >
      <input {...getInputProps()} className="cursor-pointer " />
      {fileUrl ? (
        <>
          <div
            className={`w-[250px] h-[250px]  sm:w-[330px] sm:h-[330px]   p-1   ${className}`}
          >
            <img
              src={fileUrl}
              alt="image"
              className="h-full w-full object-cover  rounded-full"
            />
          </div>
          <p className="mx-auto">Click or drag photo to replace</p>
        </>
      ) : (
        <div className=" flex h-80 flex-col items-center  justify-center p-7 lg:h-[612px]">
          <LuImagePlus size={45} />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;
