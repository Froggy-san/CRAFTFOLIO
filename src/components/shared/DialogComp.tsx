import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  cloneElement,
  useState,
} from "react";
// Interface for button props
interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
}
interface diaProps {
  children?: ReactNode;
  triggerBtnText?: string | ReactElement<ButtonProps>;
  diaTitle?: string | ReactNode | ReactElement;
  diaDescription?: string | ReactNode | ReactElement;
  dialogTriggerStyles?: string;
  dialogContentStyles?: string;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<SetStateAction<boolean>>;
  showOpenButton?: boolean;
}

const DialogComp = ({
  children,
  diaTitle,
  diaDescription,
  triggerBtnText,
  dialogTriggerStyles,
  dialogContentStyles,
  isOpen,

  showOpenButton = true,
  setIsOpen,
}: diaProps) => {
  const [open, setOpen] = useState(false);
  function handleOpen() {
    if (setIsOpen) {
      setIsOpen((open) => !open);
    } else setOpen((open) => !open);
  }
  return (
    <Dialog open={isOpen || open} onOpenChange={handleOpen}>
      {showOpenButton ? (
        triggerBtnText && React.isValidElement(triggerBtnText) ? (
          // Clone the element and add onClick
          cloneElement(triggerBtnText, { onClick: handleOpen })
        ) : (
          // If not an element, render DialogTrigger with onClick
          <DialogTrigger className={`${dialogTriggerStyles}`}>
            {triggerBtnText || "open"}
          </DialogTrigger>
        )
      ) : null}
      <DialogContent className={` ${dialogContentStyles}`}>
        <DialogHeader>
          <DialogTitle>{diaTitle || "Are you absolutely sure?"}</DialogTitle>
          <DialogDescription>
            {diaDescription ||
              " This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>{children}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComp;
