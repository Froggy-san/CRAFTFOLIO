import CopyClipboard from "@/components/shared/CopyClipboard";
import { extractDomain, icons } from "@/components/shared/HandleLinkIcons";
import Heading from "@/components/shared/Heading";
import React from "react";

const Links = ({ links }: { links: string | undefined }) => {
  const linksArr: { description: string; url: string }[] = links
    ? JSON.parse(links)
    : [];

  return (
    <div>
      <Heading Text="Links:" as="h3" className="font-semibold text-lg" />
      <div className=" flex flex-col mt-5 sm:flex-row gap-x-3 flex-wrap justify-center">
        {linksArr.map((link, i) => {
          const icon = icons[extractDomain(link.url, false) as string];

          return (
            <div
              key={i}
              className=" flex flex-col gap-1 my-4  flex-1 min-w-[48%]  max-w-[100%]"
            >
              <div className=" font-semibold flex items-center text-sm">
                {icon && <span className=" mr-2">{icon}</span>}{" "}
                {link.description}
              </div>
              <CopyClipboard
                className=" h-9 text-sm mt-5 w-full"
                text={link.url}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Links;
