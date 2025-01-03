import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaSquareXTwitter,
} from "react-icons/fa6";
import {
  FaFacebookF,
  FaYoutube,
  FaCodepen,
  FaRedditAlien,
  FaYahoo,
} from "react-icons/fa";
import { SiIndeed, SiGlassdoor, SiCodesandbox, SiGmail } from "react-icons/si";
import { PiOfficeChairFill, PiMicrosoftOutlookLogo } from "react-icons/pi";
import { BiLogoDiscord } from "react-icons/bi";
import { LuCodesandbox } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";
import { isNull, isUndefined } from "lodash";
import { CiInstagram } from "react-icons/ci";

const wuzzuf =
  "https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/defaultImages/17177931064d0fb05e3afb.png";
const iconSize = 20;

export const icons: { [key: string]: JSX.Element } = {
  "github.com": <FaGithub size={iconSize} />,
  "yahoo.com": <FaYahoo size={iconSize} color="5f00d1" />,
  "mail.yahoo.com": <FaYahoo size={iconSize} color="5f00d1" />,
  "outlook.com": <PiMicrosoftOutlookLogo size={iconSize} />,
  "outlook.live": <PiMicrosoftOutlookLogo size={iconSize} />,
  "mail.google.com": <SiGmail size={iconSize} color="darkred" />,
  "google.com": <FcGoogle size={iconSize} />,
  "github.co": <FaGithub size={iconSize} />,
  "github.net": <FaGithub size={iconSize} />,
  "linkedin.com": <FaLinkedin size={iconSize} />,
  "linkedin.co": <FaLinkedin size={iconSize} />,
  "linkedin.net": <FaLinkedin size={iconSize} />,
  "facebook.com": <FaFacebookF size={iconSize} />,
  "facebook.co": <FaFacebookF size={iconSize} />,
  "facebook.net": <FaFacebookF size={iconSize} />,
  "instagram.com": <CiInstagram size={iconSize} />,
  "codesandbox.io": <SiCodesandbox size={iconSize} />,
  "x.com": <FaSquareXTwitter size={iconSize} />,
  "twitter.com": <FaTwitter size={iconSize} />,
  "twitter.co": <FaTwitter size={iconSize} />,
  "twitter.net": <FaTwitter size={iconSize} />,
  "reddit.com": <FaRedditAlien size={iconSize} />,
  "reddit.co": <FaRedditAlien size={iconSize} />,
  "reddit.net": <FaRedditAlien size={iconSize} />,
  "glassdoor.com": <SiGlassdoor size={iconSize} />,
  "glassdoor.co": <SiGlassdoor size={iconSize} />,
  "glassdoor.net": <SiGlassdoor size={iconSize} />,
  "indeed.com": <SiIndeed size={iconSize} />,
  "indeed.co": <SiIndeed size={iconSize} />,
  "indeed.cnet": <SiIndeed size={iconSize} />,
  "ziprecruiter.com": <PiOfficeChairFill size={iconSize} />,
  "ziprecruiter.co": <PiOfficeChairFill size={iconSize} />,
  "ziprecruiter.net": <PiOfficeChairFill size={iconSize} />,
  "wuzzuf.net": (
    <img src={wuzzuf} alt="wuzzuf image" className="h-[20px] w-[20px]" />
  ),
  "wuzzuf.co": (
    <img src={wuzzuf} alt="wuzzuf image" className="h-[20px] w-[20px]" />
  ),
  "wuzzuf.com": (
    <img src={wuzzuf} alt="wuzzuf image" className="h-[20px] w-[20px]" />
  ),
  "youtube.com": <FaYoutube size={iconSize} />,
  "youtube.co": <FaYoutube size={iconSize} />,
  "youtube.net": <FaYoutube size={iconSize} />,
  "discord.com": <BiLogoDiscord size={iconSize} />,
  "discord.co": <BiLogoDiscord size={iconSize} />,
  "discord.net": <BiLogoDiscord size={iconSize} />,
};

export const extractDomain = (url: string, showError = true) => {
  try {
    // Create a URL object from the input URL
    const parsedUrl = new URL(url);
    // Return the hostname (domain) from the URL object
    return parsedUrl.hostname.startsWith("www.")
      ? parsedUrl.hostname.split("w.")[1]
      : parsedUrl.hostname;
  } catch (error) {
    // Handle any errors that might occur during parsing
    showError && console.warn("Invalid URL:", url);
    return null;
  }
};
const HandleLinkIcons = ({
  links,
  className,
  errorMessage,
}: {
  links: string[];
  className?: string;
  errorMessage?: string;
}) => {
  const urls = links && links.filter((el) => el !== ""); // we are filtering it because the links we are getting always has an empty string which gives us an error every time this function is called.

  const linkDomains = urls.length
    ? urls.map((url) => extractDomain(url)).filter((el) => !isNull(el))
    : [];

  const iconLinks = linkDomains
    .map((link) => icons[link as string])
    .filter((el) => !isUndefined(el));

  return (
    <div className={`item-center flex gap-3 ${className}`}>
      {iconLinks.length ? (
        iconLinks.map((link, i: number) => {
          return (
            <Link
              key={i}
              target="_blank"
              to={links[i]}
              className="transition-all hover:opacity-80"
            >
              {link}
            </Link>
          );
        })
      ) : errorMessage ? (
        <p className="w-full text-center">{errorMessage}</p>
      ) : null}
    </div>
  );
};
export default HandleLinkIcons;
