"use client";
import React, { isValidElement, ReactNode, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-scroll";

const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string | ReactNode;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-16 z-40 mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-lg border bg-muted/50 px-4 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] backdrop-blur-xl",
          className,
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          if (isValidElement(navItem.name) && !navItem.link) {
            return <React.Fragment key={idx}>{navItem.name}</React.Fragment>;
          } else {
            return (
              <Link
                smooth
                duration={200}
                offset={-40}
                key={`link=${idx}`}
                to={navItem.link}
                className={cn(
                  "relative flex cursor-pointer items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
                )}
              >
                <span className="">{navItem.icon}</span>
                <span className="text-sm">{navItem.name}</span>
              </Link>
            );
          }
        })}
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;
