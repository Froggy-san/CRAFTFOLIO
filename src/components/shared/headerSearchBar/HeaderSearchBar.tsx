import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { createPortal } from "react-dom";

import SearchPopover from "./SearchPopover";
import SearchPopoverRewrite from "./SearchPopoverRewrite";

const HeaderSearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-between text-xs tracking-wider sm:w-[250px]"
        onClick={() => setIsOpen((is) => !is)}
      >
        Search...{" "}
        <div className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
          {/* <span className=" text-[10px] ">K</span> */}
        </div>
      </Button>
      {createPortal(
        // <SearchPopover open={isOpen} onOpenChange={setIsOpen} />
        <SearchPopoverRewrite open={isOpen} setOpen={setIsOpen} />,
        document.body,
      )}
    </>
  );
};

export default HeaderSearchBar;
