import Logo from "@/components/shared/Logo";
import React from "react";

const Footer = () => {
  return (
    <div className="relative mt-28 h-[60vh] w-full rounded-lg border">
      <Logo className="pl-3 pt-3 text-center text-[clamp(1.2rem,5vw,3.5rem)] leading-[clamp(1.7rem,4vw,3rem)] xs:text-left" />
    </div>
  );
};

export default Footer;
