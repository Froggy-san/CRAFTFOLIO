import React, { SetStateAction, useCallback, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Loading from "./Loading";
import { variant } from "@/types/types";

interface alertDialogProps {
  open?: boolean;
  onOpenChange?: React.Dispatch<SetStateAction<boolean>>;
  triggerBtnText?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  cancelBtnOnClick?: () => void;
  continueBtnOnClick?: () => void;
  triggerBtnOnClick?: () => void;
  isLoading?: boolean;
  triggerVariant?: variant;
  triggerDisabled?: boolean;
  count?: number;
}

const AlertDialogComp = ({
  open,
  onOpenChange,
  triggerBtnText,
  dialogTitle,
  dialogDescription,
  cancelBtnOnClick,
  continueBtnOnClick,
  triggerBtnOnClick,
  isLoading,
  triggerVariant,
  triggerDisabled,
  count,
}: alertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    onOpenChange ? onOpenChange((open) => !open) : setIsOpen((open) => !open);
  }

  return (
    <AlertDialog onOpenChange={handleOpen} open={open || isOpen}>
      <AlertDialogTrigger onClick={triggerBtnOnClick} asChild>
        <Button disabled={triggerDisabled} variant={triggerVariant}>
          {" "}
          {!count ? "No posts to delete" : triggerBtnText || "Open"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {dialogTitle || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {dialogDescription ||
              "This action cannot be undone. This will permanently delete youraccount and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className=" flex flex-col pt-2 sm:py-0 sm:flex-row-reverse  justify-start items-center gap-2 sm:gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                continueBtnOnClick ? continueBtnOnClick() : handleOpen();
              }}
            >
              {isLoading ? <Loading /> : "Continue"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                cancelBtnOnClick ? cancelBtnOnClick() : handleOpen();
              }}
            >
              Cancel
            </Button>
          </div>
          {/* <AlertDialogCancel onClick={cancelBtnOnClick}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={continueBtnOnClick}>
            <Button variant="destructive"> Continue</Button>
          </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComp;
