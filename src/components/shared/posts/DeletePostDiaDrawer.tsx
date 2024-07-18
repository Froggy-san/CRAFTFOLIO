import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";

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
import React, {
  cloneElement,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import DialogComp from "@/components/shared/DialogComp";
import AlertDialogComp from "@/components/shared/AlertDialogComp";

import Loading from "@/components/shared/Loading";
interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
}
interface DeletePostDiaDrawerProp {
  title?: string | ReactNode;
  Description?: string | ReactNode;
  triggerBtnText?: string | ReactElement<ButtonProps>;
  triggerBtnStyle?: string;
  primaryTextBtn?: string | ReactNode;
  secondaryTextBtn?: string | ReactNode;
  showTriggerBtn?: boolean;
  onSubmit: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function DeletePostDiaDrawer({
  open,
  setOpen,
  title,
  Description,
  onSubmit,
  showTriggerBtn = true,
  primaryTextBtn,
  secondaryTextBtn,
  triggerBtnText,
  triggerBtnStyle,
}: DeletePostDiaDrawerProp) {
  //   const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleDelete() {
    setOpen(false);
    onSubmit();
  }

  if (isDesktop) {
    return (
      <DialogComp
        isOpen={open}
        setIsOpen={setOpen}
        diaTitle={title}
        diaDescription={Description}
        showOpenButton={showTriggerBtn}
        triggerBtnText={triggerBtnText}
      >
        <div className=" flex flex-col pt-2 sm:py-0 sm:flex-row-reverse  justify-start items-center gap-2 sm:gap-2">
          <Button
            className="  w-full sm:w-24 "
            onClick={() => {
              handleDelete();
              setOpen(false);
            }}
            variant="destructive"
          >
            {primaryTextBtn || "Delete"}
          </Button>
          <Button
            className="  w-full  sm:w-24"
            onClick={() => setOpen(false)}
            variant="outline"
          >
            {secondaryTextBtn || "Cancel"}
          </Button>
        </div>
      </DialogComp>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {showTriggerBtn ? (
        triggerBtnText && React.isValidElement(triggerBtnText) ? (
          // Clone the element and add onClick
          cloneElement(triggerBtnText, { onClick: () => setOpen(true) })
        ) : (
          // If not an element, render DialogTrigger with onClick
          <DrawerTrigger asChild>
            <Button
              //   disabled={ isDeletingPosts}
              variant="destructive"
              size="sm"
              className={triggerBtnStyle || ""}
            >
              {triggerBtnText || "Open"}
            </Button>
          </DrawerTrigger>
        )
      ) : null}
      {/* {showTriggerBtn ? (
        <DrawerTrigger asChild>
          <Button
            //   disabled={ isDeletingPosts}
            variant="destructive"
            size="sm"
            className={triggerBtnStyle || ""}
          >
            {triggerBtnText || "Open"}
          </Button>
        </DrawerTrigger>
      ) : null} */}
      <DrawerContent className=" ">
        <DrawerHeader className="">
          <DrawerTitle>{title || "Are you sure?"}</DrawerTitle>
          <DrawerDescription>
            {Description ||
              "This action cannot be undone. This will permanently delete this post from our servers."}
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="pt-2">
          <Button className="" variant="destructive" onClick={handleDelete}>
            {primaryTextBtn || "Continue"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">{secondaryTextBtn || "Cancel"}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DeletePostDiaDrawer;
