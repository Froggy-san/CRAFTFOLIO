import { ReactNode } from "react";
import { motion } from "framer-motion";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      // delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
};
const UnorderedListGrid = ({ children }: { children: ReactNode }) => {
  return (
    <motion.ul
      variants={container}
      // initial="hidden"
      animate="visible"
      exit={{ opacity: 1, scale: 0 }}
      className="grid grid-cols-2 lg:px-20 xl:grid-cols-3 xl:px-0 gap-1 lg:gap-2  mb-7 "
    >
      {children}
    </motion.ul>
  );
};

export default UnorderedListGrid;
