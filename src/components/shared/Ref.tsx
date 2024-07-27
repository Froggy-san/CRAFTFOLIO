import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

const TestingRef = () => {
  //   const ref = useRef<HTMLInputElement>(null);
  const value = useRef("");
  let valuesss = "";
  //   const [value, setValue] = useState("");
  //   const value = "";
  //   const inputValue = useRef("");
  //     useEffect(() => {
  //       console.log(ref, "REFFF");
  //       if (ref.current) console.log(ref.current, "REF currnet");
  //     }, [ref]);
  //   useEffect(() => {
  //     console.log(value, "VVVV");
  //   }, [value]);
  return (
    <div>
      <input
        value={value?.current}
        // ref={ref}
        type="text"
        onChange={(e) => {
          value.current = e.target.value;
        }}
      />
    </div>
  );
};

export default TestingRef;
