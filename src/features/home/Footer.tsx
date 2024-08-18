import { extractDomain, icons } from "@/components/shared/HandleLinkIcons";
import Logo from "@/components/shared/Logo";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const LINKS = [
  "https://github.com/Froggy-san",
  "https://x.com/home",
  "https://www.facebook.com/profile.php?id=100005639358193",
];

const Footer = () => {
  return (
    <div className="relative mt-28 flex h-[20vh] w-full rounded-lg border p-4">
      <Logo className="pl-3 pt-3 text-center text-[clamp(1.2rem,5vw,3.5rem)] leading-[clamp(1.7rem,4vw,3rem)] xs:text-left" />
      {/* <div className="ml-11 flex h-full items-end gap-3">
        {LINKS.map((link, index) => (
          <Link className="inline-block" to={link} key={index}>
            <Badge className="flex items-center gap-3">
              <span>{icons[extractDomain(link) as string]} </span>
              <span className="">{extractDomain(link)?.split(".")[0]}</span>
            </Badge>
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default Footer;
