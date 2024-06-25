import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  buttonText?: string | ReactElement<ButtonProps>;
  diaTitle?: string;
  diaDescription?: string;
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
  buttonText,
  dialogTriggerStyles,
  dialogContentStyles,
  isOpen,
  showOpenButton = true,
  setIsOpen,
}: diaProps) => {
  // const location = useLocation();
  // console.log(location.pathname.includes("/"), "LONK");
  const [open, setOpen] = useState(false);
  function handleOpen() {
    if (setIsOpen) {
      setIsOpen((open) => !open);
    } else setOpen((open) => !open);
  }
  return (
    <Dialog open={isOpen || open} onOpenChange={handleOpen}>
      {showOpenButton ? (
        buttonText && React.isValidElement(buttonText) ? (
          // Clone the element and add onClick
          cloneElement(buttonText, { onClick: handleOpen })
        ) : (
          // If not an element, render DialogTrigger with onClick
          <DialogTrigger className={`${dialogTriggerStyles}`}>
            {buttonText || "open"}
          </DialogTrigger>
        )
      ) : null}
      <DialogContent className={` ${dialogContentStyles}`}>
        <DialogHeader>
          <DialogTitle>{diaTitle || "Are you absolutely sure?"}</DialogTitle>
          <DialogDescription>
            {diaDescription ||
              " This action cannot be undone. This will permanently delete youraccount and remove your data from our servers."}
          </DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComp;
