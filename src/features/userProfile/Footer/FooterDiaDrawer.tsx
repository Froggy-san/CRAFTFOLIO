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

import { UserFooterProps } from "@/types/types";
import FooterForm from "./FooterForm";
function FooterDiaDrawer({ footerData }: { footerData?: UserFooterProps }) {
  const [open, setOpen] = useState(false);
  const [hasTheFormDataChanged, setHasTheFormDataChanged] = useState(false); // To prevent the drawer from moving while the user is scrolling inside the drawr content.
  const [disableDrag, selectDisabled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const title = "Create a footer section for your portfolio.";
  const dialogDescriptionText = `Connect with the creative world around you by including your email and socials.`;
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
              Create/Edit your footer section.
            </span>
            <TbPhotoEdit className="h-4 w-4" />
          </Button>
        </div>

        <DialogContent
          style={{ borderRadius: "1rem" }}
          className=" overflow-x-hidden overflow-y-scroll scroll-gutter-both scroll h-[80dvb] max-w-[950px] px-1 xs:px-6   "
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{dialogDescriptionText}</DialogDescription>
          </DialogHeader>

          <FooterForm setOpen={setOpen} footerData={footerData} />
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
      <DrawerContent className=" h-[85vh]">
        <DrawerHeader className="text-center sm:text-center">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{dialogDescriptionText}</DrawerDescription>
        </DrawerHeader>
        {/* The div i am talking about */}
        <div
          onTouchStart={() => selectDisabled(true)}
          onTouchEnd={() => selectDisabled(false)}
          className=" px-2  mb-10 overflow-y-auto"
        >
          <FooterForm
            setHasTheFormDataChanged={setHasTheFormDataChanged}
            setOpen={setOpen}
            ref={formRef}
            footerData={footerData}
          />
        </div>
        {/* The div i am talking about */}

        <DrawerFooter className="pt-2">
          <Button
            disabled={hasTheFormDataChanged}
            size="sm"
            onClick={() => {
              setOpen(false);
              submitForm();
            }}
            className=""
          >
            {/* Create landing page */}
            {footerData ? "Edit" : "Create"}
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

export default FooterDiaDrawer;
