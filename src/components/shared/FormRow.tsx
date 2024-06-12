import React from "react";

interface FormRowProps {
  className?: string;
  children?: React.ReactNode;
}

const FormRow = ({ className, children }: FormRowProps) => {
  return (
    <div
      className={` flex flex-col w-full lg:flex-row lg:form-row items-center justify-center  gap-y-2   gap-x-5 ${className}`}
    >
      {children}
    </div>
  );
};
export default FormRow;
