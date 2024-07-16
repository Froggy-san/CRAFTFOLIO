import { ReactNode, useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
// const container = {
//   hidden: { opacity: 1, scale: 0 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       // delayChildren: 0.3,
//       staggerChildren: 0.05,
//     },
//   },
// };
const UnorderedListGrid = ({ children }: { children: ReactNode }) => {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      "li",
      {
        opacity: 1,
        y: 0,
      },
      {
        delay: stagger(0.04),
        type: "spring",
      }
    );
  }, [children]);
  return (
    <motion.ul
      id="posts-container"
      ref={scope}
      // variants={container}
      // // initial="hidden"
      // animate="visible"
      // exit={{ opacity: 1, scale: 0 }}
      //lg:px-20
      className="grid grid-cols-2  xl:grid-cols-3 xl:px-0 gap-2 lg:gap-3  mb-7 "
    >
      {children}
    </motion.ul>
  );
};

export default UnorderedListGrid;
