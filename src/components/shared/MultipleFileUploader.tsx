import { useCallback, useEffect, useState } from "react";
// import { BsFillImageFill } from "react-icons/bs";
import { IoDownload } from "react-icons/io5";
import { BsFileEarmarkImage } from "react-icons/bs";
// import { BiSolidImageAdd } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

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

const MultipleFileUploader = ({
  fieldChange,
  mediaUrl,
  handleDeleteImage,
  handleDeleteAllImages,
}: AvatarProps) => {
  // const [fileUrls, setFileUrl] = useState<string[]>(mediaUrl || []);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  console.log(mediaUrl, "MEDIA");
  // const urls = files.map((file: File) => {
  //   return { fileObj: URL.createObjectURL(file), fileName: file.name };
  // });

  // console.log(files, "files");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      // console.log(typeof URL.createObjectURL(acceptedFiles[0]));

      // console.log(acceptedFiles);

      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
      // setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

      // const urls = acceptedFiles.map((file: File) => {
      //   return { fileObj: URL.createObjectURL(file), fileName: file.name };
      // });

      // console.log(urls);

      // setFileUrl((prevUrls) => [...prevUrls, ...urls]);

      // setFileUrl((prevUrl) => [
      //   ...prevUrl,
      //   ...acceptedFiles.map((file: File) => {file :  URL.createObjectURL(file) , fileName : file.name}),
      // ]);
    },
    [files]
  );

  function handleDelete(file: FileWithPreview) {
    setFiles((files) => files.filter((item) => item !== file));
  }

  useEffect(() => {
    fieldChange(files);
  }, [files, fieldChange]);

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          <p className=" flex flex-col items-center justify-center gap-3">
            {" "}
            <IoDownload size={30} />{" "}
            <span className=" font-semibold text-center">
              Drop the files here ...
            </span>
          </p>
        ) : (
          <p className=" flex flex-col  items-center justify-center gap-3">
            {" "}
            <BsFileEarmarkImage size={30} />{" "}
            <span className=" w-32 sm:w-[unset] font-semibold text-center">
              Drag 'n' drop some files here, or click to select files.
            </span>
          </p>
        )}
      </div>

      <div className=" rounded-lg py-5 px-3    ">
        {mediaUrl?.length || files.length ? (
          <div className=" flex items-center justify-between my-6">
            <h1 className="    font-semibold text-2xl">
              Images:{mediaUrl?.length || 0 + files.length}
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
        <ul className=" flex items-center justify-center gap-x-3 gap-y-8 flex-wrap">
          {mediaUrl?.map((link, index) => (
            <li className="  w-full  sm:w-44   relative" key={link}>
              <Button
                type="button"
                onClick={() => handleDeleteImage(link)}
                aria-label={`the remove button for the image number ${
                  index + 1
                } and with the name of ${link}`}
                variant="outline"
                className=" absolute right-0 top-0 p-0 w-5 h-5 z-10"
              >
                <IoIosClose size={20} />
              </Button>
              <img
                aria-label={`image number: ${index + 1}, image name: ${link} `}
                src={link}
                alt="url"
                className="  max-h-56   sm:max-h-40 h-full w-full object-contain"
              />
              <p
                aria-label={`image number: ${index + 1} image name: ${link}`}
                className="w-full  overflow-hidden whitespace-nowrap overflow-ellipsis"
              >
                {link}
              </p>
            </li>
          ))}
          {files.length
            ? files.map((file, index) => (
                <li className="  w-full  sm:w-44   relative" key={file.preview}>
                  <Button
                    aria-label={`the remove button for the image with the name of ${file.name}`}
                    type="button"
                    onClick={() => handleDelete(file)}
                    variant="outline"
                    className=" absolute right-0 top-0 p-0 w-5 h-5 z-10"
                  >
                    <IoIosClose size={20} />
                  </Button>
                  <img
                    aria-label={` image number: ${index + 1}, image name: ${
                      file.name
                    }`}
                    src={file.preview}
                    alt="url"
                    className="  max-h-56   sm:max-h-40 h-full w-full object-contain"
                  />
                  <p
                    aria-label={`the name of the image is: ${file.name}`}
                    className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis"
                  >
                    {file.name}
                  </p>
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
};

export default MultipleFileUploader;
