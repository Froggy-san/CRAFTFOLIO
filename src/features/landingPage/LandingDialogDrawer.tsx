import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import DialogComp from "@/components/shared/DialogComp";
import AlertDialogComp from "@/components/shared/AlertDialogComp";
import useDeleteUserPosts from "../projects/useDeleteUserPosts";
import useGetNumOfProjects from "../projects/useGetNumOfProjects";
import Loading from "@/components/shared/Loading";
import IconButton from "@/components/shared/IconButton";
import { TbPhotoEdit } from "react-icons/tb";
import LandingFormRewrite from "./LandingFromRewrite";
import { landingProps } from "@/types/types";
function LandingDialogDrawer({ landingPage }: { landingPage?: landingProps }) {
  const [open, setOpen] = useState(false);
  const [hasTheFormDataChanged, setHasTheFormDataChanged] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const dialogDescriptionText = `Talk about your self and what you do.`;
  const formRef = useRef<HTMLFormElement>(null);

  // Function to programmatically submit the form
  const submitForm = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-end">
          <Button
            className=" ml-auto gap-1  my-3"
            onClick={() => setOpen(true)}
            variant="ghost"
          >
            <span className=" text-xs font-semibold">
              Create/Edit your landing page.
            </span>
            <TbPhotoEdit className="h-4 w-4" />
          </Button>
        </div>
        {/* <DialogTrigger className=" ml-auto block my-3">
          <Button size="sm" variant="ghost" className="p-0 w-7 h-7">
            <TbPhotoEdit className="h-4 w-4" />
          </Button>
          <IconButton variant="ghost">
            <TbPhotoEdit className="h-4 w-4" />
          </IconButton>
          <button className="p-0 w-7 h-7">
            {" "}
            <TbPhotoEdit className="h-4 w-4" />
          </button>
        </DialogTrigger> */}
        <DialogContent className=" overflow-x-hidden overflow-y-scroll h-[80dvb] max-w-[800px] px-1 xs:px-6">
          <DialogHeader>
            <DialogTitle>Create Your landing page.</DialogTitle>
            <DialogDescription>
              Talk about your self and what you do.
            </DialogDescription>
          </DialogHeader>

          <LandingFormRewrite setOpen={setOpen} landingToEdit={landingPage} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-end">
          <Button
            className=" ml-auto gap-1  my-3"
            onClick={() => setOpen(true)}
            variant="ghost"
          >
            <span className=" text-xs font-semibold">
              Create/Edit your landing page.
            </span>
            <TbPhotoEdit className="h-4 w-4" />
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className=" h-[90dvh]">
        <DrawerHeader className="text-center sm:text-center">
          <DrawerTitle>Create Your landing page</DrawerTitle>
          <DrawerDescription>{dialogDescriptionText}</DrawerDescription>
        </DrawerHeader>
        <div className=" px-2  overflow-y-auto">
          <LandingFormRewrite
            setHasTheFormDataChanged={setHasTheFormDataChanged}
            setOpen={setOpen}
            ref={formRef}
            landingToEdit={landingPage}
          />
        </div>
        <DrawerFooter className="pt-2">
          <Button
            disabled={hasTheFormDataChanged}
            size="sm"
            onClick={submitForm}
            className=""
          >
            {landingPage ? "Edit" : "Create landing page"}
          </Button>
          <DrawerClose asChild>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default LandingDialogDrawer;
