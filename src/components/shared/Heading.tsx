import { CSSProperties, ReactElement, ReactNode } from "react";

const Heading = ({
  children,
  className,
  style,
  ariaLabel,
  as: Componant = "h1",
  Text,
}: {
  children?: ReactNode | ReactElement | string;
  Text?: ReactNode | ReactElement | string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  return (
    <Componant aria-label={ariaLabel} className={className || ""} style={style}>
      {Text}
      {children}
    </Componant>
  );
};

export default Heading;
