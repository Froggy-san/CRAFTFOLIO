"use client";
import { CSSProperties, useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const SecondTextGenerateEffect = ({
  words,
  className,
  style,
  duration,
}: {
  words: string;
  secondaryText?: string;
  className?: string;
  duration?: number;
  style?: CSSProperties;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: duration || 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={` opacity-0 ${idx > 6 && idx < 11 && "text-lime-300"}`}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="  leading-snug tracking-wide" style={style}>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
