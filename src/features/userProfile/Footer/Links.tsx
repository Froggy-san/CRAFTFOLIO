import HandleLinkIcons from "@/components/shared/HandleLinkIcons";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

const Links = () => {
  const { user } = useAuth();
  const links = user && JSON.parse(user.socials);

  return (
    <div className=" absolute w-full h-full  left-0 bottom-0  z-0">
      <div className=" relative h-full flex  items-end px-6 justify-between">
        <div className=" flex items-center justify-center flex-col space-y-10">
          <HandleLinkIcons links={links || []} className=" flex-col gap-6" />
          <div className=" h-[90px] w-[1px] bg-foreground rounded-2xl" />
        </div>
        {/* ----------------------------------------------- */}
        <div className=" flex items-center justify-center space-y-10 flex-col">
          <p
            className="  wrting"
            style={{
              writingMode: "vertical-rl",
              fontFamily: "monospace",
              lineHeight: "16px",
              letterSpacing: "0.1rem",
            }}
          >
            {user?.email}
          </p>
          <div className=" h-[90px] w-[1px] bg-foreground rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Links;
