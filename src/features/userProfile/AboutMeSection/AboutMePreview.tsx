import React from "react";

const AboutMePreview = ({
  tools,
  arrow,
  color,
}: {
  tools: string[];
  arrow: JSX.Element | null;
  color: string;
}) => {
  return (
    <div className=" flex flex-wrap gap-3">
      <h1 className="font-semibold">Preview:</h1>
      {tools.length
        ? tools.map((el, i) => (
            <div key={i} className="flex items-center gap-1">
              <span style={{ color: `rgb(${color})` }} className="mt-1 ">
                {" "}
                {arrow}
              </span>

              <span key={i}>{el}</span>
            </div>
          ))
        : null}
    </div>
  );
};

export default AboutMePreview;
