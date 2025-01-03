import React from "react";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

import Collapse from "@/components/shared/Collapse";
import useAboutMe from "./useAboutMe";
import useEditAboutMe from "./useEditAboutMe";
import FullSnLoading from "@/components/shared/FullSnLoading";
// import { Link } from "react-router-dom";
// import EditAboutMe from "./EditAboutMe";
import HandleLinkIcons from "@/components/shared/HandleLinkIcons";
import { Badge } from "@/components/ui/badge";
// import { FaLink } from "react-icons/fa6";
import { handleText } from "@/utils/helper";
import { defaultAboutMeText } from "@/utils/constants";
import Heading from "@/components/shared/Heading";
import { HiCursorClick } from "react-icons/hi";

const AboutMeText = ({
  aboutText,
  userId,
}: {
  aboutText: string | undefined;
  userId: string;
}) => {
  const [clickCount, setClickCount] = useState(0);
  const { editAboutMe } = useEditAboutMe();
  const [aboutMeValue, setAboutMeValue] = useState(aboutText || "");
  const text = useRef({ text: aboutText || "" });
  function handleEditting() {
    if (clickCount === 2) return;
    setClickCount((count) => count + 1);
  }
  useEffect(() => {
    if (clickCount > 0 && clickCount < 2) {
      const resetCount = setTimeout(() => {
        setClickCount(0);
      }, 500);

      return () => clearTimeout(resetCount);
    }
  }, [clickCount]);

  useEffect(() => {
    if (text.current) text.current.text = aboutText || "";
  }, [aboutText]);

  return (
    <div className="">
      <Heading>About me</Heading>
      {clickCount === 2 ? (
        <div className="my-5 space-y-4">
          <h1 className="font-medium leading-none">Edit about me</h1>
          <Textarea
            value={aboutMeValue}
            className="h-48"
            autoFocus
            onChange={(e) => {
              setAboutMeValue(e.target.value);
            }}
            onBlur={() => {
              setClickCount(0);
              if (
                text.current &&
                text.current.text.length === aboutMeValue.length
              )
                return;
              editAboutMe({ aboutMe: aboutMeValue, userId });
            }}
          />
        </div>
      ) : (
        <div className="relative">
          <Collapse textLenght={1200}>
            <Collapse.CollapseContant
              onClick={handleEditting}
              className="mt-16 break-words pb-7 text-lg md:px-10"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {aboutMeValue || defaultAboutMeText}
            </Collapse.CollapseContant>
            <Collapse.CollapseButton arrowPositionX="right" />
          </Collapse>
          <div className="absolute bottom-0 right-[120px] z-[2] flex items-center gap-3 text-sm font-semibold">
            <HiCursorClick size={20} className="animate-pulse" />

            <p className="text-red-400">Double tap to edit.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMeText;
