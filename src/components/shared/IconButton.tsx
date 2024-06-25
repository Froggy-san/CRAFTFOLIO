import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { buttonType, variant } from "@/types/types";

const IconButton = ({
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
  children?: ReactNode;
  onClick?: (e?: MouseEvent) => void;
  variant?: variant;
  className?: string;
  link?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: buttonType;
  style?: React.CSSProperties;
}) => {
  if (link)
    return (
      <Button
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
};

export default IconButton;
