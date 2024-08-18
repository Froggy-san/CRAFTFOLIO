import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { IoDownload } from "react-icons/io5";
import { BsFileEarmarkImage } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../../ui/button";
import { isEqual } from "lodash";
import ReactPlayer from "react-player";
import MediaItem from "./MediaItem";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import {
  AnimatePresence,
  motion,
  useAnimate,
  usePresence,
} from "framer-motion";
type AvatarProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl?: string[];
  handleDeleteImage: (link: string) => void;
  handleDeleteAllImages: () => void;
};

// interface fileUrlProps {
//   fileObj: string;
//   fileName: string;
// }

interface FileWithPreview extends File {
  preview: string;
}

interface RejectedFiles extends FileRejection {
  preview: string;
}

const MultipleFileUploader = ({
  fieldChange,
  mediaUrl,
  handleDeleteImage,
  handleDeleteAllImages,
}: AvatarProps) => {
  // const [fileUrls, setFileUrl] = useState<string[]>(mediaUrl || []);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<RejectedFiles[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      // Do something with the files

      if (rejectedFiles.length) {
        toast.dismiss();
        toast.error("File is too large.");

        setRejectedFiles((prev) => [
          ...prev,
          ...rejectedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file.file) }),
          ),
        ]);
      }

      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      ]);
    },
    [files],
  );

  function handleDelete(file: FileWithPreview) {
    setFiles((files) => files.filter((item) => item !== file));
    URL.revokeObjectURL(file.preview);
  }
  function handleDeleteRejceted(index: number) {
    const newArr = [...rejectedFiles];
    newArr.splice(index, 1);
    setRejectedFiles(newArr);
  }
  function handleClearRejected() {
    setRejectedFiles([]);
    rejectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }

  useEffect(() => {
    fieldChange(files);
  }, [files, fieldChange]);

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    console.log(files.filter((file) => !file.type.includes("video")));
    return () =>
      files
        .filter((file) => !file.type.includes("video"))
        .forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    maxSize: 6 * 1024 * 1024, // 6MB in bytes
  });

  return (
    <>
      <div
        {...getRootProps({
          className:
            " flex justify-center items-center  min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm   ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="flex flex-col items-center justify-center gap-3">
            {" "}
            <IoDownload size={30} />{" "}
            <span className="text-center font-semibold">
              Drop the files here ...
            </span>
          </p>
        ) : (
          <p className="flex flex-col items-center justify-center gap-3">
            {" "}
            <BsFileEarmarkImage size={30} />{" "}
            <span className="w-32 text-center font-semibold sm:w-[unset]">
              Drag 'n' drop some files here, or click to select files.
            </span>
          </p>
        )}
      </div>

      <MemoizedRejectedItems
        rejectedFiles={rejectedFiles}
        handleClearRejected={handleClearRejected}
        handleDeleteRejceted={handleDeleteRejceted}
      />

      <div className="rounded-lg px-3 py-5">
        {mediaUrl?.length || files.length ? (
          <div className="my-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              Images: {(mediaUrl?.length || 0) + files.length}
            </h1>
            <Button
              size="sm"
              type="button"
              variant="destructive"
              onClick={() => {
                setFiles([]);
                handleDeleteAllImages();
              }}
            >
              DELETE ALL
            </Button>
          </div>
        ) : null}
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-8">
          {mediaUrl?.map((link, index) => {
            if (link.includes("mp4")) {
              return (
                <li className="relative w-full sm:w-44" key={link}>
                  <Button
                    type="button"
                    onClick={() => handleDeleteImage(link)}
                    aria-label={`the remove button for the image number ${
                      index + 1
                    } and with the name of ${link}`}
                    variant="outline"
                    className="absolute right-0 top-0 z-10 h-5 w-5 p-0"
                  >
                    <IoIosClose size={20} />
                  </Button>
                  <video
                    autoPlay
                    loop
                    muted
                    aria-label={`image number: ${index + 1}, image name: ${link} `}
                    src={link}
                    className="h-full max-h-56 w-full object-contain sm:max-h-40"
                  />
                  <p
                    aria-label={`image number: ${index + 1} image name: ${link}`}
                    className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                  >
                    {link}
                  </p>
                </li>
              );
            } else {
              return (
                <li className="relative w-full sm:w-44" key={link}>
                  <Button
                    type="button"
                    onClick={() => handleDeleteImage(link)}
                    aria-label={`the remove button for the image number ${
                      index + 1
                    } and with the name of ${link}`}
                    variant="outline"
                    className="absolute right-0 top-0 z-10 h-5 w-5 p-0"
                  >
                    <IoIosClose size={20} />
                  </Button>
                  <img
                    aria-label={`image number: ${index + 1}, image name: ${link} `}
                    src={link}
                    alt="url"
                    className="h-full max-h-56 w-full object-contain sm:max-h-40"
                  />
                  <p
                    aria-label={`image number: ${index + 1} image name: ${link}`}
                    className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                  >
                    {link}
                  </p>
                </li>
              );
            }
          })}
          {files.length
            ? files.map((file, index) => {
                if (file.type.includes("video")) {
                  return (
                    <MediaItem
                      key={file.preview}
                      MediaType="video"
                      image={file.preview}
                      handleDeleteItem={() => handleDelete(file)}
                      index={index}
                    />
                  );
                } else {
                  return (
                    <MediaItem
                      key={file.preview}
                      MediaType="image"
                      image={file.preview}
                      handleDeleteItem={() => handleDelete(file)}
                      index={index}
                    />
                  );
                }
              })
            : null}
        </ul>
      </div>
    </>
  );
};

export default MultipleFileUploader;

const MemoizedRejectedItems = memo(
  ({
    rejectedFiles,
    handleDeleteRejceted,
    handleClearRejected,
  }: {
    rejectedFiles: RejectedFiles[];
    handleClearRejected: () => void;
    handleDeleteRejceted: (index: number) => void;
  }) => {
    useEffect(() => {
      return () => {
        rejectedFiles
          .filter((file) => !file.file.type.includes("video"))
          .forEach((file) => URL.revokeObjectURL(file.preview));
      };
    }, [rejectedFiles]);

    return (
      <div className="rounded-lg py-5 sm:px-3">
        <div className="my-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Rejected files: {rejectedFiles.length}
          </h1>
          <Button
            size="sm"
            type="button"
            disabled={!rejectedFiles.length}
            variant="destructive"
            onClick={handleClearRejected}
          >
            CLEAR
          </Button>
        </div>
        {/* Your component content here */}
        <ul className="flex max-h-[350px] flex-wrap items-center justify-center gap-x-3 gap-y-5 overflow-y-auto overflow-x-hidden px-1">
          {rejectedFiles.map((file, index) =>
            !file.file.type.includes("video") ? (
              <RejectedItem
                key={index}
                type="image"
                file={file}
                handleDeleteRejceted={() => handleDeleteRejceted(index)}
                index={index}
              />
            ) : (
              <RejectedItem
                key={index + 1}
                type="video"
                file={file}
                handleDeleteRejceted={() => handleDeleteRejceted(index)}
                index={index}
              />
            ),
          )}
        </ul>
      </div>
    );
  },
  (prevProps, nextProps) =>
    isEqual(prevProps.rejectedFiles, nextProps.rejectedFiles),
);

function RejectedItem({
  type,
  index,
  file,
  handleDeleteRejceted,
}: {
  type: "video" | "image";
  index: number;
  file: RejectedFiles;
  handleDeleteRejceted: () => void;
}) {
  return (
    <li className="relative w-full">
      <Card className="flex w-full items-center gap-3 p-2">
        {type === "video" ? (
          <ReactPlayer
            url={file.preview}
            controls
            loop
            muted
            playing
            width="100%"
            height="auto"
            className="h-full w-full min-w-28 max-w-36 overflow-hidden rounded-md object-contain"
            onEnded={() => URL.revokeObjectURL(file.preview)}
          />
        ) : (
          <img
            onLoad={() => URL.revokeObjectURL(file.preview)}
            aria-label={` image number: ${index + 1}, image name: ${
              file.file.name
            }`}
            src={file.preview}
            alt="url"
            className="h-full w-full min-w-28 max-w-36 overflow-hidden rounded-md object-contain"
          />
        )}

        <div className="truncate">
          <p
            aria-label={`the name of the image is: ${file.file.name}`}
            className="w-full truncate"
          >
            {file.file.name}
          </p>
          <p
            aria-label={`the name of the image is: ${file.file.name}`}
            className="w-full truncate text-xs text-muted-foreground"
          >
            {file.errors[0].message}
          </p>
        </div>
        <Button
          aria-label={`the remove button for the image with the name of ${file.file.name}`}
          type="button"
          onClick={handleDeleteRejceted}
          variant="outline"
          className="absolute right-2 top-2 z-10 h-5 w-5 p-0 xs:hidden"
        >
          <IoIosClose size={20} />
        </Button>
        <Button
          aria-label={`the remove button for the image with the name of ${file.file.name}`}
          onClick={handleDeleteRejceted}
          type="button"
          variant="secondary"
          size="sm"
          className="z-10 ml-auto hidden xs:block sm:mr-2"
        >
          Remove
        </Button>
      </Card>
    </li>
  );
}
// <motion.li
//   initial={{ opacity: 0, y: 25 }}
//   animate={{ opacity: 1, y: 0 }}
//   exit={{ opacity: 0, y: 25 }}
//   layout
//   key={index}
//   className="relative w-full"
// >
//   <Card className="flex w-full items-center gap-3 p-2">
//     <ReactPlayer
//       url={file.preview}
//       controls
//       loop
//       muted
//       playing
//       width="100%"
//       height="auto"
//       className="h-full w-full min-w-28 max-w-36 overflow-hidden rounded-md object-contain"
//       onEnded={() => URL.revokeObjectURL(file.preview)}
//     />

//     <div className="truncate">
//       <p
//         aria-label={`the name of the image is: ${file.file.name}`}
//         className="w-full truncate"
//       >
//         {file.file.name}
//       </p>
//       <p
//         aria-label={`the name of the image is: ${file.file.name}`}
//         className="w-full truncate text-xs text-muted-foreground"
//       >
//         {file.errors[0].message}
//       </p>
//     </div>
//     <Button
//       aria-label={`the remove button for the image with the name of ${file.file.name}`}
//       type="button"
//       onClick={() => handleDeleteRejceted(index)}
//       variant="outline"
//       className="absolute right-2 top-2 z-10 h-5 w-5 p-0 xs:hidden"
//     >
//       <IoIosClose size={20} />
//     </Button>
//     <Button
//       aria-label={`the remove button for the image with the name of ${file.file.name}`}
//       onClick={() => handleDeleteRejceted(index)}
//       type="button"
//       variant="secondary"
//       size="sm"
//       className="z-10 ml-auto hidden xs:block sm:mr-2"
//     >
//       Remove
//       {/* <IoIosClose size={20} /> */}
//     </Button>
//   </Card>
// </motion.li>

// <li className="relative w-full sm:w-44" key={index}>
//   <Button
//     aria-label={`the remove button for the image with the name of ${file.file.name}`}
//     type="button"
//     onClick={() => handleDeleteRejceted(index)}
//     variant="outline"
//     className="absolute right-0 top-0 z-10 h-5 w-5 p-0"
//   >
//     <IoIosClose size={20} />
//   </Button>
//   <img
//     onLoad={() => URL.revokeObjectURL(file.preview)}
//     aria-label={` image number: ${index + 1}, image name: ${
//       file.file.name
//     }`}
//     src={file.preview}
//     alt="url"
//     className="h-full max-h-56 w-full object-contain sm:max-h-40"
//   />
//   <p
//     aria-label={`the name of the image is: ${file.file.name}`}
//     className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
//   >
//     {file.file.name}
//   </p>
