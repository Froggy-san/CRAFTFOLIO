import { ReactNode } from "react";
import LinkBtn from "./LinkBtn";

interface ErrorProps {
  message?: string | ReactNode;
  className?: string;
}

const ErrorComp = ({ message, className }: ErrorProps) => {
  return (
    <div
      className={`my-11 flex h-56 flex-col items-center justify-center gap-5 sm:flex-row ${className}`}
    >
      {message || (
        <>
          Something went wrong!{" "}
          <LinkBtn size="sm" to="/">
            Go back{" "}
          </LinkBtn>
        </>
      )}
    </div>
  );
};

export default ErrorComp;
