import React, { ReactElement, ReactNode, Ref } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { buttonType, variant } from "@/types/types";

const IconButton = React.forwardRef(
  (
    {
      children,
      onClick,
      variant,
      className,
      link,
      disabled,
      ariaLabel,
      type,
      style,
    }: {
      children?: ReactNode | ReactElement;
      onClick?: (e?: MouseEvent) => void;
      variant?: variant;
      className?: string;
      link?: string;
      disabled?: boolean;
      ariaLabel?: string;
      type?: buttonType;
      style?: React.CSSProperties;
    },
    ref?: Ref<HTMLButtonElement>
  ) => {
    if (link)
      return (
        <Button
          ref={ref}
          type={type ? type : "button"}
          aria-label={ariaLabel}
          onClick={() => onClick?.()}
          size="sm"
          variant={variant || "default"}
          className={`p-0 w-7 h-7 ${className}`}
          disabled={disabled}
          style={style}
          asChild
        >
          <Link to={link}>{children}</Link>
        </Button>
      );
    else
      return (
        <Button
          ref={ref}
          type={type ? type : "button"}
          aria-label={ariaLabel}
          onClick={() => onClick?.()}
          size="sm"
          disabled={disabled}
          variant={variant || "default"}
          className={`p-0 w-7 h-7 ${className}`}
          style={style}
        >
          {children}
        </Button>
      );
  }
);

export default IconButton;
