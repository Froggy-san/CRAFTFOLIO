import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "@/utils/confetti.json";
const EmailButton = ({
  text,
  copiableText,
}: {
  text?: string;
  copiableText?: string;
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(copiableText || "email");
    setCopied(true);
  };

  useEffect(() => {
    const setTime = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(setTime); // Use clearTimeout for setTimeout
  }, [copied]);
  return (
    <Button className=" relative" onClick={handleCopy}>
      <div
        className={` absolute -bottom-5 left-1/2 -translate-x-1/2 w-[300px] h-[300px] pointer-events-none`}
      >
        <Lottie
          options={{
            // loop: copied,
            autoplay: copied,
            animationData: copied ? animationData : "",
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
        />
      </div>
      {text ? text : copied ? "Email copied" : "Copy email"}
    </Button>
  );
};

export default EmailButton;
