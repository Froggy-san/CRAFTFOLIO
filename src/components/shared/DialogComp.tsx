import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
// import { useLocation } from "react-router-dom";

interface diaProps {
  children?: ReactNode;
  buttonText?: string | ReactNode;
  diaTitle?: string;
  diaDescription?: string;
  dialogTriggerStyles?: string;
  dialogContentStyles?: string;
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
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
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {showOpenButton ? (
        <DialogTrigger className={`${dialogTriggerStyles}`}>
          {buttonText || "open"}
        </DialogTrigger>
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
