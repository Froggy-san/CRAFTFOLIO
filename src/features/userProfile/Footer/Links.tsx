import HandleLinkIcons from "@/components/shared/HandleLinkIcons";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

const Links = () => {
  const { user } = useAuth();
  const links = user && user.socials ? JSON.parse(user.socials) : [];

  return (
    <>
      <div className=" absolute hidden md:block w-full h-full  left-0 bottom-0  z-0">
        <div className=" relative h-full flex  items-end px-6 justify-between">
          <div className=" flex items-center justify-center flex-col space-y-10">
            <HandleLinkIcons links={links} className=" flex-col gap-6" />
            <div className=" h-[90px] w-[1px] bg-foreground rounded-2xl" />
          </div>
          {/* ----------------------------------------------- */}
          <div className=" flex items-center justify-center space-y-10 flex-col">
            <a
              href={`mailto:${user?.email}`}
              className="  text-foreground hover:text-foreground/60 hover:-translate-y-2 transition-all "
              style={{
                writingMode: "vertical-rl",
                fontFamily: "monospace",
                lineHeight: "16px",
                letterSpacing: "0.1rem",
              }}
            >
              {user?.email}
            </a>
            <div className=" h-[90px] w-[1px] bg-foreground rounded-2xl" />
          </div>
        </div>
      </div>
      <HandleLinkIcons
        links={links}
        className=" absolute bottom-5 right-5 md:hidden flex-wrap"
      />
    </>
  );
};

export default Links;
