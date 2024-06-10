// import ImageView from "@/components/shared/ImageView";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
const image =
  "https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/defaultImages/Capturefffffffffffasas.PNG";
const FormDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className=" text-red-700 text-xs w-fit h-fit   p-0"
        >
          Show me how.
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80dvb] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>How to upload links.</DialogTitle>
          <DialogDescription>
            How to enter any post-related links
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className=" whitespace-pre-wrap  font-semibold space-y-4 mb-6">
            {/* <h1>**How to Add Links:**</h1> */}
            <div className=" space-y-1  ">
              <h2 className=" text-red-600">
                1. **Separate multiple links with a comma**:
              </h2>
              {/* flex items-center flex-wrap justify-start */}
              <p className=" ">
                - Example: `https://example.com
                <span className=" text-green-500 font-semibold text-lg">
                  ,
                </span>{" "}
                https://anotherexample.com `
              </p>
            </div>

            <div className=" space-y-1  m">
              <h2 className=" text-red-600">2. **To add a preview link**</h2>
              <p className=" flex items-center flex-wrap justify-start">
                - Type `{" "}
                <span className=" text-green-500 font-semibold text-lg">
                  preview:
                </span>{" "}
                "https://example.com"` before the link.
              </p>
              <p className=" flex items-center flex-wrap justify-start">
                - Replace `https://example.com` with the link you want to
                preview.
              </p>
            </div>
          </div>

          <div className=" border-2 border-black rounded-md overflow-hidden h-[60dvb] sm:h-[70dvb]">
            <img
              src={image}
              alt={image}
              className=" object-contain w-full h-full"
            />
          </div>
        </div>

        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
