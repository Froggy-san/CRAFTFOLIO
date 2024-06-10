import { ReactNode } from "react";

const Heading = ({
  children,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) => {
  return (
    <h1
      aria-label={ariaLabel}
      className={`font-semibold text-2xl sm:text-3xl ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
