import React, { useState } from "react";
import { Button } from "../ui/button";
import { ClickAwayListener } from "@mui/material";
import { SketchPicker } from "react-color";
import { AnimatePresence, motion } from "framer-motion";
interface colorProps {
  r: number;
  g: number;
  b: number;
  a: number | undefined;
}

const ColorPicker = ({
  color,
  onChange,
}: {
  color: colorProps;
  onChange: (colors: colorProps) => void;
}) => {
  const [showColorBoard, setShowColorBoard] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setShowColorBoard(false)}>
      <div>
        <Button
          onClick={() => setShowColorBoard((is) => !is)}
          type="button"
          className=" shadow-2xl border-spacing-2 border-2 border-dotted"
          style={{
            width: "40px",
            height: "25px",
            borderRadius: "3px",
            backgroundColor: `rgba(${Object.values(color).join(",")})`,
          }}
        ></Button>
        <AnimatePresence>
          {showColorBoard && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -20 }}
              className=" absolute right-0  top-[100%] text-black "
            >
              <SketchPicker
                color={color}
                // className={` absolute right-0 top-[100%]  duration-150   text-black ${
                //   showColorBoard ? "opacity-1 visible" : "opacity-0 invisible"
                // }`}
                onChange={(color) => {
                  // Create a color object that includes the alpha value
                  const colorWithAlpha = {
                    ...color.rgb,
                    a: color.rgb.a,
                  };

                  onChange(colorWithAlpha);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClickAwayListener>
  );
};

export default ColorPicker;
