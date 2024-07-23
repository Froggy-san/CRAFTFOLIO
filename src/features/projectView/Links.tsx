import CopyClipboard from "@/components/shared/CopyClipboard";
import { extractDomain, icons } from "@/components/shared/HandleLinkIcons";
import React from "react";

const Links = ({ links }: { links: string | undefined }) => {
  const linksArr: { description: string; url: string }[] = links
    ? JSON.parse(links)
    : [];
  console.log(linksArr, "LINKSSS");
  return (
    <div>
      <div className=" flex flex-wrap justify-center gap-3 ">
        {linksArr.map((link, i) => (
          <div key={i} className=" flex flex-col gap-1 my-4   ">
            <div className=" font-semibold flex items-center text-sm">
              <span className=" mr-2">
                {icons[extractDomain(link.url, false) as string]}
              </span>{" "}
              {link.description}
            </div>
            <CopyClipboard
              className=" h-9 text-sm mt-5 w-full"
              text={link.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
