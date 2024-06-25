import { variant } from "@/types/types";
import React from "react";
import { Button } from "../ui/button";

interface FormButtonProps {
  cancelButtonVariant?: variant;
  cancelButtonOnClick?: () => void;
  cancelDisabled?: boolean;
  submitButtonVariant?: variant;
  submitButtonOnClick?: () => void;
  submitDisabled?: boolean;
  className?: string;
}

const FormButtons = ({
  cancelButtonOnClick,
  cancelButtonVariant,
  cancelDisabled,
  submitButtonOnClick,
  submitButtonVariant,
  submitDisabled,
  className,
}: FormButtonProps) => {
  return (
    <div
      className={`flex flex-col-reverse  sm:flex-row items-center justify-end gap-4 pb-10 ${
        className || ""
      }`}
    >
      <Button
        variant={cancelButtonVariant || "secondary"}
        size="sm"
        className=" w-full sm:w-[120px]"
        onClick={() => cancelButtonOnClick?.()}
        disabled={cancelDisabled}
        type="button"
      >
        Cancel
      </Button>
      <Button
        variant={submitButtonVariant}
        onClick={() => submitButtonOnClick?.()}
        size="sm"
        disabled={submitDisabled}
        type="submit"
        className=" w-full sm:w-[120px]"
      >
        Submit
      </Button>
    </div>
  );
};

export default FormButtons;
