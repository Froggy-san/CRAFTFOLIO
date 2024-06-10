import React from "react";

interface FormRowProps {
  className?: string;
  children?: React.ReactNode;
}

const FormRow = ({ className, children }: FormRowProps) => {
  return (
    <div
      className={` sm:form-row items-center justify-center gap-4 ${className}`}
    >
      {children}
    </div>
  );
};
export default FormRow;
