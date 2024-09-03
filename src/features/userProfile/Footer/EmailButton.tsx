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
    <Button className="relative" onClick={handleCopy}>
      <div
        className={`pointer-events-none absolute -bottom-5 left-1/2 h-[300px] w-[300px] -translate-x-1/2`}
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
      {copied ? "Copied!" : text || "Copy email"}
    </Button>
  );
};

export default EmailButton;
