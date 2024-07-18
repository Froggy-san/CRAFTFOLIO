import React from "react";
import { AuroraBackground } from "../ui/AuroraBackground";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
const AuroraBgComp = () => {
  const location = useLocation();
  console.log(location, "Location");

  return (
    <AuroraBackground className=" ">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4  "
      >
        <div className="text-3xl  md:text-6xl lg:text-7xl font-bold dark:text-white text-center">
          {location.pathname === "/Login" ? (
            <div>
              <div className="-skew-x-2 pr-10">CRAFT</div>
              <div className=" -skew-x-2 pl-10">FOLIO</div>
            </div>
          ) : (
            <div> You are one step closer to a new beginning.</div>
          )}
        </div>
        <div className="font-extralight  text-3xl   dark:text-neutral-200 py-4">
          {location.pathname === "/Login"
            ? "Where careers start"
            : "Let's get you setup."}
        </div>
        {/* <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button> */}
      </motion.div>
    </AuroraBackground>
  );
};

export default AuroraBgComp;
