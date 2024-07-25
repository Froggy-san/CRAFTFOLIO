"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";
import { publicUser } from "@/types/types";
import { defaultProfilePicture } from "@/utils/constants";

export const AnimatedTooltip = ({
  imageSize,
  items,
}: {
  imageSize?: number;
  items: publicUser[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {items.map((item, idx) => {
        return (
          <div
            className={`-mr-4  relative group ${
              idx === items.length - 1 && "pr-4"
            }`}
            key={idx}
            onMouseEnter={() => setHoveredIndex(item.userId)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="popLayout">
              {hoveredIndex === item.userId && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-primary-foreground  z-50 shadow-xl px-4 py-2"
                >
                  {/* <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                    <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " /> */}
                  <div className="font-bold  relative z-30 text-base">
                    {item.username}
                  </div>
                  {/* <div className="text-white text-xs">{item.designation}</div> */}
                </motion.div>
              )}
            </AnimatePresence>
            <Link
              to={!item.userId?.includes("-any") ? `/user/${item.userId}` : ""}
            >
              <img
                onMouseMove={handleMouseMove}
                //   height={100}
                //   width={100}
                src={item.avatar || defaultProfilePicture}
                alt={item.username}
                className={`object-cover !m-0 !p-0 object-top rounded-full   border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500`}
                style={{
                  width: imageSize ? `${imageSize}px` : "40px",
                  height: imageSize ? `${imageSize}px` : "40px",
                }}
              />
            </Link>
          </div>
        );
      })}
    </>
  );
};
