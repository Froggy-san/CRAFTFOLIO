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

import { useRef, useState } from "react";

import { TbPhotoEdit } from "react-icons/tb";
import LandingFormRewrite from "./LandingFromRewrite";
import { landingProps } from "@/types/types";
function LandingDialogDrawer({
  relatedUserAvatar,
  landingPage,
}: {
  relatedUserAvatar?: string;
  landingPage?: landingProps;
}) {
  const [open, setOpen] = useState(false);
  const [hasTheFormDataChanged, setHasTheFormDataChanged] = useState(false); // To prevent the drawer from moving while the user is scrolling inside the drawr content.
  const [disableDrag, selectDisabled] = useState(false);
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

        <DialogContent
          style={{ borderRadius: "1rem" }}
          className=" overflow-x-hidden overflow-y-scroll scroll-gutter-both scroll h-[80dvb] max-w-[950px]  !rounded-none lg:!rounded-[1rem]  px-1 xs:px-6   "
        >
          <DialogHeader>
            <DialogTitle>Create Your landing page.</DialogTitle>
            <DialogDescription>
              Talk about your self and what you do.
            </DialogDescription>
          </DialogHeader>

          <LandingFormRewrite
            relatedUserAvatar={relatedUserAvatar}
            setOpen={setOpen}
            landingToEdit={landingPage}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer handleOnly={disableDrag} open={open} onOpenChange={setOpen}>
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
      <DrawerContent className=" h-[95dvh]">
        <DrawerHeader className="text-center sm:text-center">
          <DrawerTitle>Create Your landing page</DrawerTitle>
          <DrawerDescription>{dialogDescriptionText}</DrawerDescription>
        </DrawerHeader>
        {/* The div i am talking about */}
        <div
          onTouchStart={() => selectDisabled(true)}
          onTouchEnd={() => selectDisabled(false)}
          className=" px-2  overflow-y-auto"
        >
          <LandingFormRewrite
            setHasTheFormDataChanged={setHasTheFormDataChanged}
            setOpen={setOpen}
            relatedUserAvatar={relatedUserAvatar}
            ref={formRef}
            landingToEdit={landingPage}
          />
        </div>
        {/* The div i am talking about */}

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
