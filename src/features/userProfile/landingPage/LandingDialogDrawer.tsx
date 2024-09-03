import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  const [hasTheFormDataChanged, setHasTheFormDataChanged] = useState(false);
  const [disableDrag, selectDisabled] = useState(false); // To prevent the drawer from moving while the user is scrolling inside the drawr content.
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dialogHeadingText = `${landingPage ? "Edit" : "Create"} Your landing page.`;
  const dialogDescriptionText = `Share your skills, experiences, and any relevant accomplishments.`;
  const formRef = useRef<HTMLFormElement>(null);

  // Function to programmatically submit the form
  const submitForm = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-end">
          <Button
            className="my-3 ml-auto gap-1"
            onClick={() => setOpen(true)}
            variant="ghost"
          >
            <span className="text-xs font-semibold">
              Create/Edit your landing page.
            </span>
            <TbPhotoEdit className="h-4 w-4" />
          </Button>
        </div>

        <DialogContent
          style={{ borderRadius: "1rem" }}
          className="scroll-gutter-both scroll h-[80dvb] max-w-[950px] overflow-x-hidden overflow-y-scroll !rounded-none px-1 xs:px-6 lg:!rounded-[1rem]"
        >
          <DialogHeader>
            <DialogTitle>{dialogHeadingText}</DialogTitle>
            <DialogDescription>{dialogDescriptionText}</DialogDescription>
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
            className="my-3 ml-auto gap-1"
            onClick={() => setOpen(true)}
            variant="ghost"
          >
            <span className="text-xs font-semibold">
              Create/Edit your landing page.
            </span>
            <TbPhotoEdit className="h-4 w-4" />
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[95dvh]">
        <DrawerHeader className="text-center sm:text-center">
          <DrawerTitle>
            {" "}
            {landingPage ? "Edit" : "Create"} Your landing page.
          </DrawerTitle>
          <DrawerDescription>{dialogDescriptionText}</DrawerDescription>
        </DrawerHeader>
        {/* The div i am talking about */}
        <div
          onTouchStart={() => selectDisabled(true)}
          onTouchEnd={() => selectDisabled(false)}
          className="overflow-y-auto px-2"
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
            {dialogHeadingText}
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
