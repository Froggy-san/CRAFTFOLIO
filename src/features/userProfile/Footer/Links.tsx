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
      <div className="absolute bottom-0 left-0 z-0 hidden h-full w-full md:block">
        <div className="relative flex h-full items-end justify-between px-6">
          {links.length ? (
            <div className="flex flex-col items-center justify-center space-y-10">
              <HandleLinkIcons links={links} className="flex-col gap-6" />
              <div className="h-[90px] w-[1px] rounded-2xl bg-foreground" />
            </div>
          ) : (
            <div />
          )}
          {/* ----------------------------------------------- */}
          {userEmail && (
            <div className="flex flex-col items-center justify-center space-y-10">
              <a
                href={`mailto:${userEmail}`}
                className="text-foreground transition-all hover:-translate-y-2 hover:text-foreground/60"
                style={{
                  writingMode: "vertical-rl",
                  fontFamily: "monospace",
                  lineHeight: "16px",
                  letterSpacing: "0.1rem",
                }}
              >
                {userEmail}
              </a>
              <div className="h-[90px] w-[1px] rounded-2xl bg-foreground" />
            </div>
          )}
        </div>
        <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center text-xs text-foreground/70">
          Phone: {userPhone}
        </p>
        {resume && (
          <div className="absolute bottom-2 left-1/2 w-full max-w-[350px] -translate-x-1/2 truncate text-center text-xs">
            <span>Resume: </span>
            {isValidUrl(resume) ? (
              <a className="text-muted-foreground" href={resume}>
                {resume}
              </a>
            ) : (
              <p className="inline-block text-muted-foreground">{resume}</p>
            )}
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-y-3 md:hidden">
        <HandleLinkIcons links={links} className="mb-7 flex-wrap" />
        <p className="text-xs text-muted-foreground">Phone: {userPhone}</p>
        {resume && (
          <div className="w-full max-w-[350px] truncate text-xs">
            <span>Resume: </span>
            {isValidUrl(resume) ? (
              <a className="text-muted-foreground" href={resume}>
                {resume}
              </a>
            ) : (
              <p className="inline-block text-muted-foreground">{resume}</p>
            )}
          </div>
        )}
      </div>

      {/* {footerContainer &&
        createPortal(
          <div className="flex w-full flex-col items-center justify-center gap-y-3 md:hidden">
            <p className="text-xs text-muted-foreground">Phone: {userPhone}</p>
            {resume && (
              <div className="w-full max-w-[350px] truncate text-xs">
                <span>Resume: </span>
                {isValidUrl(resume) ? (
                  <a className="text-muted-foreground" href={resume}>
                    {resume}
                  </a>
                ) : (
                  <p className="inline-block text-muted-foreground">{resume}</p>
                )}
              </div>
            )}
            <HandleLinkIcons links={links} className="flex-wrap" />
          </div>,
          footerContainer,
        )} */}
    </>
  );
};

export default Links;
