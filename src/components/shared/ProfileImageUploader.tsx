import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
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
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length) {
        toast.error(rejectedFiles[0].errors[0].code);
      }
      if (acceptedFiles.length) {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      }
    },
    [file],
  );

  /// the second parameter in the useDropzone hook is the accept object, you pust what can the from accept from the user .

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    maxSize: 6 * 1024 * 1024, // 6MB in bytes
  });

  return (
    <div
      {...getRootProps({
        className:
          "item-center flex cursor-pointer flex-col  justify-center rounded-full items-center w-fit mx-auto",
      })}
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div
            className={`z-0 h-[250px] w-[250px] p-1 sm:h-[330px] sm:w-[330px] ${className}`}
          >
            <img
              src={fileUrl}
              alt="image"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <p className="z-0 mx-auto">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="z-0 flex h-80 flex-col items-center justify-center p-7">
          <LuImagePlus size={45} />
          <h3 className="base-medium text-light-2 z-0 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular z-0 mb-6">SVG, PNG, JPG</p>
          <Button type="button" className="shad-button_dark_4 z-0">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileImageUploader;
