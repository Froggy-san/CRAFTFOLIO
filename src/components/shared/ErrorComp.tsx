import { ReactNode } from "react";
import LinkBtn from "./LinkBtn";

interface ErrorProps {
  message?: string | ReactNode;
  className?: string;
}

const ErrorComp = ({ message, className }: ErrorProps) => {
  return (
    <div
      className={` flex  flex-col sm:flex-row my-11 items-center justify-center h-56 gap-2 ${className}`}
    >
      {message || (
        <>
          Something went wrong.! <LinkBtn to="/">Go back </LinkBtn>
        </>
      )}
    </div>
  );
};

export default ErrorComp;
