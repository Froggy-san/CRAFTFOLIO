import { ReactNode } from "react";

const Empty = ({
  message,
  className,
}: {
  message?: string | ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={className}>
      {message || "There is nothing to see here..."}
    </h1>
  );
};

export default Empty;
