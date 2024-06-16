import React, { useState } from "react";
import { Button } from "../ui/button";
import { ClickAwayListener } from "@mui/material";
import { SketchPicker } from "react-color";

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
        <SketchPicker
          color={color}
          className={` absolute right-0 top-[100%]  duration-150  ${
            showColorBoard ? "opacity-1 visible" : "opacity-0 invisible"
          }`}
          onChange={(color) => {
            // Create a color object that includes the alpha value
            const colorWithAlpha = {
              ...color.rgb,
              a: color.rgb.a,
            };
            console.log(colorWithAlpha, "color with alpha");

            onChange(colorWithAlpha);
          }}
        />
      </div>
    </ClickAwayListener>
  );
};

export default ColorPicker;
