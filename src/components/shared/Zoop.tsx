import React, { CSSProperties } from "react";
import { motion } from "framer-motion";
const DURATION = 0.15;
const STAGGER = 0.025;
const Zoop = () => {
  return (
    <div>
      <FlipText>SOMETHING</FlipText>
      <FlipText>SOMETHING</FlipText>
      <FlipText>SOMETHING</FlipText>
      <FlipText>SOMETHING</FlipText>
      <FlipText>SOMETHING</FlipText>
    </div>
  );
};

export default Zoop;

export function FlipText({
  children,
  className,
  style,
}: {
  children: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative  overflow-hidden truncate  font-semibold  ${
        className || ""
      }`}
      style={style}
    >
      <p>
        {children.split("").map((letter, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            key={i}
            className=" inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </p>
      <p className=" absolute inset-0">
        {" "}
        {children.split("").map((letter, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            key={i}
            className=" inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}
/*
    <motion.div
      initial="initial"
      whileHover="hovered"
      className=" relative  overflow-hidden truncate text-[3rem] font-semibold "
    >
      <motion.p
        variants={{
          initial: { y: 0 },
          hovered: { y: "-100%" },
        }}
      >
        {children}
      </motion.p>
      <motion.p
        className=" absolute inset-0"
        variants={{
          initial: { y: "100%" },
          hovered: { y: 0 },
        }}
      >
        {children}
      </motion.p>
    </motion.div>
*/
