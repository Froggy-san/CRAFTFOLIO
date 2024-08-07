import HandleLinkIcons from "@/components/shared/HandleLinkIcons";
import { useAuth } from "@/hooks/useAuth";
import { isValidUrl } from "@/utils/helper";
import React from "react";
import { createPortal } from "react-dom";

const Links = ({
  userSocials,
  userEmail,
  userPhone,
  resume,
}: {
  userPhone: string;
  userEmail: string;
  userSocials: string;
  resume: string;
}) => {
  const links = userSocials ? JSON.parse(userSocials) : [];

  const footerContainer = document.getElementById("footer-container");

  return (
    <>
      <div className=" absolute hidden md:block w-full h-full  left-0 bottom-0  z-0">
        <div className=" relative h-full flex  items-end px-6 justify-between">
          {links.length ? (
            <div className=" flex items-center justify-center flex-col space-y-10">
              <HandleLinkIcons links={links} className=" flex-col gap-6" />
              <div className=" h-[90px] w-[1px] bg-foreground rounded-2xl" />
            </div>
          ) : null}
          {/* ----------------------------------------------- */}
          {userEmail && (
            <div className=" flex items-center justify-center space-y-10 flex-col">
              <a
                href={`mailto:${userEmail}`}
                className="  text-foreground hover:text-foreground/60 hover:-translate-y-2 transition-all "
                style={{
                  writingMode: "vertical-rl",
                  fontFamily: "monospace",
                  lineHeight: "16px",
                  letterSpacing: "0.1rem",
                }}
              >
                {userEmail}
              </a>
              <div className=" h-[90px] w-[1px] bg-foreground rounded-2xl" />
            </div>
          )}
        </div>
        <p className=" text-xs text-center absolute left-1/2 -translate-x-1/2 bottom-7 text-foreground/70">
          Phone: {userPhone}
        </p>
        {resume && (
          <div className=" truncate w-full max-w-[350px] text-xs  bottom-2 text-center absolute left-1/2 -translate-x-1/2 ">
            <span>Resume: </span>
            {isValidUrl(resume) ? (
              <a className=" text-muted-foreground" href={resume}>
                {resume}
              </a>
            ) : (
              <p>{resume}</p>
            )}
          </div>
        )}
      </div>
      {footerContainer &&
        createPortal(
          <div className=" flex flex-col gap-y-3 items-center   md:hidden  justify-center  w-full">
            <HandleLinkIcons links={links} className="  flex-wrap" />
            <p className=" text-xs text-muted-foreground">Phone: {userPhone}</p>
            {resume && (
              <div className=" truncate w-full max-w-[350px] text-xs ">
                <span>Resume: </span>
                {isValidUrl(resume) ? (
                  <a className=" text-muted-foreground" href={resume}>
                    {resume}
                  </a>
                ) : (
                  <p>{resume}</p>
                )}
              </div>
            )}
          </div>,
          footerContainer
        )}
    </>
  );
};

export default Links;
