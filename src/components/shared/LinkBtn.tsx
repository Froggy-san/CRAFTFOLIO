import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

type Size = "default" | "sm" | "lg" | "icon" | null | undefined;

interface LinkBtn {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: string | ReactNode;
}

const LinkBtn = ({ to, size, variant, className, children }: LinkBtn) => {
  return (
    <Button className={className} size={size} variant={variant} asChild>
      <Link to={to}>{children}</Link>
    </Button>
  );
};

export default LinkBtn;
