//// !IMPORTANT react dropzone npm i react-dropzone // to be able to drag and drop files into an application . https://react-dropzone.js.org/

import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { LuImagePlus } from "react-icons/lu";

type AvatarProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl?: string;
};

const Avatar = ({ fieldChange, mediaUrl }: AvatarProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length) {
        toast.dismiss();
        toast.error(rejectedFiles[0].errors?.[0].code);
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
      {...getRootProps()}
      className="item-center flex cursor-pointer flex-col justify-center rounded-xl"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex h-[300px] w-full justify-center xs:h-[350px] xs:p-5 sm:h-[400px] md:h-[550px] lg:p-10">
            <img
              src={fileUrl}
              alt="image"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
          <p className="mx-auto">Click or drag phto to replace</p>
        </>
      ) : (
        <div className="flex h-80 flex-col items-center justify-center p-7 lg:h-[612px]">
          <LuImagePlus size={45} />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
