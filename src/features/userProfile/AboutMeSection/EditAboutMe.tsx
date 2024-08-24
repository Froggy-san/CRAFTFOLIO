import { useEffect, useRef, useState } from "react";
import Collapse from "@/components/shared/Collapse";
import { Textarea } from "@/components/ui/textarea";
// import useEditAboutMe from "./useEditAboutMe";
// import useAboutMe from "./useAboutMe";

const defaultText = `            Tech-savvy and eager, the Junior React Developer combines web
fundamentals with a love for React, a UI-building library. They
write clean code and navigate the web's blueprint. Their React
skills shine, crafting reusable components and managing data flow.
Always learning, they explore React's ecosystem. From
collaborating on projects to crafting UIs, each challenge paves
their path to becoming a web development force. Tech-savvy and
eager, the Junior React Developer combines web fundamentals with a
love for React, a UI-building library. They write clean code and
navigate the web's blueprint. Their React skills shine, crafting
reusable components and managing data flow. Always learning, they
explore React's ecosystem. From collaborating on projects to
crafting UIs, each challenge paves their path to becoming a web
development force.Tech-savvy and eager, the Junior React Developer
combines web fundamentals with a love for React, a UI-building
library. They write clean code and navigate the web's blueprint.
Their React skills shine, crafting reusable components and
managing data flow. Always learning, they explore React's
ecosystem. From collaborating on projects to crafting UIs, each
challenge paves their path to becoming a web development
force.Tech-savvy and eager, the Junior React Developer combines
web fundamentals with a love for React, a UI-building library.
They write clean code and navigate the web's blueprint. Their
React skills shine, crafting reusable components and managing data
flow. Always learning, they explore React's ecosystem. From
collaborating on projects to crafting UIs, each challenge paves
their path to becoming a web development force.Tech-savvy and
eager, the Junior React Developer combines web fundamentals with a
love for React, a UI-building library. They write clean code and
navigate the web's blueprint. Their React skills shine, crafting
reusable components and managing data flow. Always learning, they
explore React's ecosystem. From collaborating on projects to
crafting UIs, each challenge paves their path to becoming a web
development force. explore React's ecosystem. From collaborating
on projects to crafting UIs, each challenge paves their path to
becoming a web development force. explore React's ecosystem. From
collaborating on projects to crafting UIs, each challenge paves
their path to becoming a web development force. explore React's
ecosystem. From collaborating on projects to crafting UIs, each
challenge paves their path to becoming a web development force.`;

interface EditAboutMeProps {
  userId: string;
  aboutMeData: string;
  handleEditAboutMe: (value: string) => void;
}

const EditAboutMe = ({
  aboutMeData,
  // userId,
  handleEditAboutMe,
}: EditAboutMeProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [aboutMeValue, setAboutMeValue] = useState("");
  // const { editAboutMe } = useEditAboutMe();

  const text = useRef({ one: "" });
  function handleEditting() {
    if (clickCount === 2) return;
    setClickCount((count) => count + 1);
  }

  useEffect(() => {
    setAboutMeValue(aboutMeData);

    if (text.current) {
      text.current.one = aboutMeData || "";
    }
  }, [aboutMeData]);

  useEffect(() => {
    if (clickCount > 0 && clickCount < 2) {
      const resetCount = setTimeout(() => {
        setClickCount(0);
      }, 500);

      return () => clearTimeout(resetCount);
    }
  }, [clickCount]);
  return (
    <div>
      {clickCount === 2 ? (
        <div className="my-5 space-y-4">
          <h1 className="font-medium leading-none">About me</h1>
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
                text.current.one.length === aboutMeValue.length
              )
                return;
              handleEditAboutMe(aboutMeValue);
              // editAboutMe({ aboutMe: aboutMeValue, userId });
            }}
          />
        </div>
      ) : (
        <>
          <Collapse textLenght={1200}>
            <Collapse.CollapseContant
              onClick={handleEditting}
              className="mt-16 break-words text-lg md:px-10"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {aboutMeValue || defaultText}
            </Collapse.CollapseContant>
            <Collapse.CollapseButton arrowPositionX="right" />
          </Collapse>
        </>
      )}
    </div>
  );
};

export default EditAboutMe;
