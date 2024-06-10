import { ReactNode } from "react";

const UnorderedListGrid = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="grid grid-cols-2 lg:px-20 xl:grid-cols-3 xl:px-0 gap-1 lg:gap-2  mb-7 ">
      {children}
    </ul>
  );
};

export default UnorderedListGrid;
