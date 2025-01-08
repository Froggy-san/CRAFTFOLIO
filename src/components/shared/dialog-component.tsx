interface DialogContextProvidorProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}

// Use type assertion to extend the DialogComponent
// type DialogCompoundComponent = React.FC<DialogContextProvidorProps> & {
//   Trigger: typeof DialogTrigger;
//   Overlay: typeof DialogOverlay;
//   Header: typeof DialogHeader;
//   Content: typeof DialogContent;
//   Footer: typeof DialogFooter;
// };

// const Dialog: DialogCompoundComponent =
//   DialogComponent as DialogCompoundComponent;

("use client");
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import * as Portal from "@radix-ui/react-portal";
import { cn } from "@/lib/utils";
import { CrossIcon } from "lucide-react";

interface DialogContextProps {
  open: boolean;
  handleOpen: () => void;
}

const DialogContext = createContext<DialogContextProps>({
  open: false,
  handleOpen: () => {},
});

interface DialogContextProvidorProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}

function DialogComponent({
  children,
  open,
  onOpenChange,
}: DialogContextProvidorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isDialogOpen = open !== undefined ? open : isOpen;

  useEffect(() => {
    const body = document.querySelector("body");
    if (window !== undefined && body) {
      if (isDialogOpen) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "visible";
      }
    }

    return () => {
      if (body) body.style.overflow = "visible";
    };
  }, [isDialogOpen]);

  const handleOpenChange = () => {
    setIsOpen((is) => !is);
    if (open !== undefined) {
      onOpenChange?.(!open);
    }
  };

  return (
    <DialogContext.Provider
      value={{ open: isDialogOpen, handleOpen: handleOpenChange }}
    >
      {children}
    </DialogContext.Provider>
  );
}

interface DialogOverlayProps {
  className?: string;
}

const DialogTrigger = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ children, onClick, ...props }, ref) => {
  const { handleOpen } = useContext(DialogContext);
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        handleOpen();
      }}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});

DialogTrigger.displayName = "DialogTrigger";

const DialogClose = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ children, onClick, ...props }, ref) => {
  const { handleOpen } = useContext(DialogContext);
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        handleOpen();
      }}
      {...props}
      ref={ref}
    >
      {children}
    </button>
  );
});

DialogClose.displayName = "DialogClose";
const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
};

interface DialogContentProps {
  children?: React.ReactNode;
  className?: string;
}

DialogHeader.displayName = "DialogHeader";
const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => {
    const { open, handleOpen } = useContext(DialogContext);
    return (
      <div
        onClick={handleOpen}
        className={cn(
          "invisible fixed inset-0 z-50 bg-black/80 opacity-0 duration-75",

          className,
          { "visible opacity-100": open },
          // { block: open },
          // { hidden: !open }
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
DialogOverlay.displayName = "DialogOverlay";
const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className }, externalRef) => {
    const { open } = useContext(DialogContext);

    const internalRef = useRef<HTMLDivElement>(null);
    const ref = externalRef || internalRef;

    useEffect(() => {
      if (open && ref && "current" in ref && ref.current) {
        ref.current.scrollTo(0, 0); // Scroll to the top when the dialog opens
      }
    }, [open, ref]);

    return (
      <Portal.Root>
        {/* <AnimatePresence mode="popLayout">
          {open && ( */}
        <>
          <DialogOverlay />
          <div
            ref={ref}
            className={cn(
              "dialog z-50 grid w-full max-w-lg gap-4 bg-background p-6 antialiased shadow-lg sm:rounded-lg",
              className,
              {
                "dialog-open": open,
                "dialog-closed": !open,
              },
            )}
          >
            {children}
            <DialogComponent.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <CrossIcon className="h-4 w-4" />
              {/* <span className="sr-only">Close</span> */}
            </DialogComponent.Close>
          </div>
        </>
        {/* )}
        </AnimatePresence>
        , */}
      </Portal.Root>
    );
  },
);
DialogContent.displayName = "DialogContent";
const DialogTitle = React.forwardRef<
  React.ElementRef<"h1">,
  React.ComponentPropsWithoutRef<"h1">
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
});
DialogTitle.displayName = "DialogTitle";
const DialogDescription = React.forwardRef<
  React.ElementRef<"h2">,
  React.ComponentPropsWithoutRef<"h2">
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
DialogDescription.displayName = "DialogDescription";

const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";
// Attach subcomponents to the main DialogComponent

DialogComponent.Trigger = DialogTrigger;
DialogComponent.Close = DialogClose;
DialogComponent.Overlay = DialogOverlay;
DialogComponent.Header = DialogHeader;
DialogComponent.Title = DialogTitle;
DialogComponent.Description = DialogDescription;
DialogComponent.Content = DialogContent;
DialogComponent.Footer = DialogFooter;

// Use type assertion to extend the DialogComponent
// type DialogCompoundComponent = React.FC<DialogContextProvidorProps> & {
//   Trigger: typeof DialogTrigger;
//   Overlay: typeof DialogOverlay;
//   Header: typeof DialogHeader;
//   Content: typeof DialogContent;
//   Footer: typeof DialogFooter;
// };

// const Dialog: DialogCompoundComponent =
//   DialogComponent as DialogCompoundComponent;

export default DialogComponent;
